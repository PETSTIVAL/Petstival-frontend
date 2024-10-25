import { useEffect, useState } from 'react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';
import { useTotalStore } from "../../store/useTotalStore";

import './style.css';

const clientKey = import.meta.env.VITE_CLIENT_SECRET_KEY;
const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_API_KEY);

function CheckoutPage() {
  const [widgets, setWidgets] = useState(null);

  const { total } = useTotalStore(); // Zustand 스토어에서 total 가져오기

  // ------ 주문의 결제 금액 설정 ------
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value: total || 50000, // total 값이 없으면 기본값 설정
  });

  useEffect(() => {
    setAmount(prevAmount => ({
      ...prevAmount,
      value: total, // total 값을 value에 적용
    }));
    console.log(total)
  }, [total]); // total이 변경될 때마다 실행

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const customerKey = uuidv4();
        const widgets = tossPayments.widgets({ customerKey });

        // 리팩토링
        widgets.setAmount(amount); // 초기값
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

  // supabase DB에 저장
  const postTestData = async (orderId, amountValue) => {
    const dataToPost = {
      orderId: orderId,
      amount: amountValue,
      order_id: 'd4c8b0f7-62f4-4a63-90e7-5af0a5d9e4c6',
    };
    // payment table에 정보를 업데이트
    const { data, error } = await supabase.from('payment').upsert([dataToPost]);

    if (error) {
      console.error('Error posting data:', error);
      return;
    }
  };

  return (
    <div>
      <div id="payment-method" />
      <div id="agreement" />
      <button
        className="btn primary w-100"
        onClick={async () => {
          const orderId = uuidv4();
          await postTestData(orderId, amount.value);

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
