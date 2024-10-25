import { CheckoutPage } from '../src/pages/PaymentsPage/CheckoutPage.jsx';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { v4 as uuidv4 } from 'uuid';

// loadTossPayments 함수를 모킹하여 결제 위젯을 반환
jest.mock('@tosspayments/tosspayments-sdk', () => ({
  loadTossPayments: jest.fn(),
}));

// uuidv4()를 모킹하여 테스트용 고정 customerKey('test-customer-key')를 반환
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('결제 세션 초기화', () => {
  it('토스 페이먼츠 위젯과 함께 결제 세션이 초기화된다.', async () => {
    // UUID 생성 및 TossPayments 동작 Mock
    uuidv4.mockReturnValue('test-customer-key');
    const mockWidgets = {
      setAmount: jest.fn(),
      renderPaymentMethods: jest.fn(),
      renderAgreement: jest.fn(),
    };

    // TossPayments API 호출을 모킹하여 모킹 위젯을 반환
    loadTossPayments.mockResolvedValue({
      widgets: () => mockWidgets,
    });
  });
});
