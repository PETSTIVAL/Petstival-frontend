import CheckoutPage from '../src/pages/PaymentsPage/CheckoutPage.jsx';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { v4 as uuidv4 } from 'uuid';

// loadTossPayments 함수를 모킹하여 결제 위젯을 반환
vi.mock('@tosspayments/tosspayments-sdk', () => ({
  loadTossPayments: vi.fn(),
}));

// uuidv4()를 모킹하여 테스트용 고정 customerKey('test-customer-key')를 반환
vi.mock('uuid', () => ({
  v4: vi.fn(),
}));

describe('결제 세션 초기화', () => {
  it('토스 페이먼츠 위젯과 함께 결제 세션이 초기화된다.', async () => {
    // UUID 생성 및 TossPayments 동작 Mock
    uuidv4.mockReturnValue('test-customer-key');
    const mockWidgets = {
      setAmount: vi.fn(),
      renderPaymentMethods: vi.fn(),
      renderAgreement: vi.fn(),
    };

    // TossPayments API 호출을 모킹하여 모킹 위젯을 반환
    loadTossPayments.mockResolvedValue({
      widgets: () => mockWidgets,
    });

    // CheckoutPage 컴포넌트 렌더링되는지 확인
    const { getByText } = render(<CheckoutPage />);

    // "결제하기" 버튼 클릭되었는지 확인
    const payButton = getByText('결제하기');
    fireEvent.click(payButton);

    // 비동기 위젯 렌더링 대기
    await waitFor(() => {
      expect(mockWidgets.setAmount).toHaveBeenCalledWith({ currency: 'KRW', value: 50000 });
      expect(mockWidgets.renderPaymentMethods).toHaveBeenCalledWith({
        selector: '#payment-method',
        variantKey: 'DEFAULT',
      });
      expect(mockWidgets.renderAgreement).toHaveBeenCalledWith({
        selector: '#agreement',
        variantKey: 'AGREEMENT',
      });
    });

    // TossPayments가 올바른 clientKey로 초기화되었는지 확인
    expect(loadTossPayments).toHaveBeenCalledWith(expect.any(String)); // clientKey 인수를 받아서 호출되고 있는지 확인
    expect(uuidv4).toHaveBeenCalled(); // Customer key가 생성되었는지 확인
  });
});

describe('결제 세부정보', () => {
  it('결제 요청 시 올바른 결제 세부 정보를 보내야 합니다. (주문Id, 주문이름, 주문자이름, 주문자이메일, 주문자휴대폰번호, 성공시 url, 실패시 url)', async () => {
    const mockRequestPayment = vi.fn();
    const mockWidgets = {
      requestPayment: mockRequestPayment,
      setAmount: vi.fn(),
      renderPaymentMethods: vi.fn(),
      renderAgreement: vi.fn(),
    };

    // TossPayments API 호출을 모킹하여 모킹 위젯을 반환
    loadTossPayments.mockResolvedValue({
      widgets: () => mockWidgets,
    });

    // CheckoutPage 컴포넌트 렌더링되는지 확인
    const { getByText } = render(<CheckoutPage />);


    await waitFor(() => {
      expect(mockWidgets.setAmount).toHaveBeenCalled();
      expect(mockWidgets.renderPaymentMethods).toHaveBeenCalled();
      expect(mockWidgets.renderAgreement).toHaveBeenCalled();
    });
    
    // "결제하기" 버튼 클릭되었는지 확인
    const payButton = getByText('결제하기');
    fireEvent.click(payButton);

    // 결제 요청이 정확한 세부 정보와 함께 비동기 호출되었는지 확인
    await waitFor(() => {
      expect(mockRequestPayment).toHaveBeenCalledWith({
        orderId: expect.any(String),
        orderName: '토스 티셔츠 외 2건',
        customerName: '김토스',
        customerEmail: 'customer123@gmail.com',
        customerMobilePhone: '01012341234',
        successUrl: expect.stringContaining('/success'),
        failUrl: expect.stringContaining('/fail'),
      });
    });
  });
});
