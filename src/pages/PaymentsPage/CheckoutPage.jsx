import { useEffect, useState } from 'react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { v4 as uuidv4 } from 'uuid';

const clientKey = import.meta.env.VITE_CLIENT_SECRET_KEY;

function CheckoutPage() {
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const customerKey = uuidv4();
        const widgets = tossPayments.widgets({ customerKey });
        setWidgets(widgets);
      } catch (error) {
        console.error('Error initializing payment session:', error);
      }
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    if (widgets) {
      widgets.setAmount({ currency: 'KRW', value: 50000 }); // 초기값
      widgets.renderPaymentMethods({
        selector: '#payment-method',
        variantKey: 'DEFAULT',
      });
      widgets.renderAgreement({
        selector: '#agreement',
        variantKey: 'AGREEMENT',
      });
    }
  }, [widgets]);

  return (
    <div>
      <div id="payment-method" />
      <div id="agreement" />
      <button onClick={() => console.log('결제하기 clicked')}>결제하기</button>
    </div>
  );
}

export default CheckoutPage;