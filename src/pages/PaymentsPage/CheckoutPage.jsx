import { useEffect, useRef, useState } from 'react';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { v4 as uuidv4 } from 'uuid';
import './style.css';
import { createClient } from '@supabase/supabase-js';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import useTotalStore from '../../stores/useTotalStore';
import supabase from '../../services/supabaseClient';
import { useOrderItemStore } from '../../stores/useOrderItemStore';

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
const clientKey = import.meta.env.VITE_CLIENT_SECRET_KEY;

// const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_API_KEY);

function CheckoutPage() {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  const [searchParams] = useSearchParams();
  const order_id = searchParams.get('order_id');
  const location = useLocation();
  const { orderName, customerName, customerEmail, customerNumber } = location.state || {};

  // const { totalPrice } = useTotalStore(); // Zustand 스토어에서 total 가져오기
  const { orderTotal } = useOrderItemStore(); // orderTotalStore에서 total 가져오기

  // ------ 주문의 결제 금액 설정 ------
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value: orderTotal || 50000, // total 값이 없으면 기본값 설정
  });

  useEffect(() => {
    setAmount((prevAmount) => ({
      ...prevAmount,
      value: orderTotal, // total 값을 value에 적용
    }));
  }, [orderTotal]); // total이 변경될 때마다 실행

  // supabase POST
  const postTestData = async (orderId, amountValue) => {
    const dataToPost = {
      orderId: orderId,
      amount: amountValue,
      order_id: order_id,
    };
    // payment_info table에 결제 정보를 삽입
    const { data, error } = await supabase.from('payment').insert([dataToPost]);

    if (error) {
      console.error('Error posting data:', error);
      return;
    }
  };

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const customerKey = uuidv4();
        const widgets = tossPayments.widgets({ customerKey: customerKey });
        setWidgets(widgets);
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    }

    fetchPaymentWidgets();
  }, [clientKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      await widgets.setAmount(amount);

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  return (
    <div className="wrapper w-100">
      <div className="max-w-540 w-100">
        <div id="payment-method" className="w-100" />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
          <button
            className="btn primary w-100"
            onClick={async () => {
              try {
                const orderId = generateRandomString();
                await postTestData(orderId, amount.value);

                await widgets?.requestPayment({
                  orderId: orderId,
                  orderName: orderName, // 주문 정보
                  customerName: customerName, // 주문자 배송지 이름
                  customerEmail: customerEmail, // 사용자 이메일
                  customerMobilePhone: customerNumber, // 주문자 배송지 전화번호
                  successUrl: window.location.origin + '/success' + window.location.search,
                  failUrl: window.location.origin + '/fail' + window.location.search,
                });
              } catch (error) {
                // TODO: 에러 처리
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
