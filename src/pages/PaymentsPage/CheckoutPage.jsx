import { useEffect, useState } from 'react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { v4 as uuidv4 } from 'uuid';
import './style.css';

const clientKey = import.meta.env.VITE_CLIENT_SECRET_KEY;

function CheckoutPage() {
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const customerKey = uuidv4();
        const widgets = tossPayments.widgets({ customerKey });

        // 리팩토링
        widgets.setAmount({ currency: 'KRW', value: 50000 }); // 초기값
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        });
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        });

        setWidgets(widgets);
      } catch (error) {
        console.error('Error initializing payment session:', error);
      }
    }

    fetchPaymentWidgets();
  }, []);

  return (
    <div>
      <div id="payment-method" />
      <div id="agreement" />
      <button
        className="btn primary w-100"
        onClick={async () => {
          const orderId = uuidv4();
          await widgets?.requestPayment({
            orderId: orderId,
            orderName: '토스 티셔츠 외 2건',
            customerName: '김토스',
            customerEmail: 'customer123@gmail.com',
            customerMobilePhone: '01012341234',
            successUrl: window.location.origin + '/success',
            failUrl: window.location.origin + '/fail',
          });
        }}
      >
        결제하기
      </button>
    </div>
  );
}

export default CheckoutPage;
