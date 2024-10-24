import { initializePaymentSession } from '../../src/pages/PaymentsPage/PaymentService.jsx';

describe('Payment Service', () => {
  it('유효한 사용자와 장바구니로 결제 세션을 초기화해야 한다.', () => {
    const userId = 'user123';
    const cart = [{ productId: 'prod001', quantity: 1 }];

    const session = initializePaymentSession(userId, cart);

    expect(session).toHaveProperty('sessionId');
    expect(session).toHaveProperty('status', 'initialized');
  });
});
