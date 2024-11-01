import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import supabase from '../../services/supabaseClient';

function SuccessPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const order_id = searchParams.get('order_id');

  async function confirmPayment() {
    // TODO: API를 호출해서 서버에게 paymentKey, orderId, amount를 넘겨주세요.
    // 서버에선 해당 데이터를 가지고 승인 API를 호출하면 결제가 완료됩니다.
    // https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8
    const response = await fetch('https://hfnchwvpqruwmlehusbs.supabase.co/functions/v1/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    if (response.ok) {
      const json = await response.json(); // 응답 본문을 JSON으로 파싱
      if (json.code && json.message) {
        // 결제 실패 비즈니스 로직을 구현
        window.location.href = `/fail?message=${json.message}&code=${json.code}&orderId=${orderId}`; // 실패 페이지로 이동
      } else {
        // 결제 성공 비즈니스 로직을 구현
        setIsConfirmed(true);
        // payment table에 payment_state 정보를 success로 업데이트
        const { data, error } = await supabase.from('payment').update({ payment_state: 'success' }).eq('orderId', orderId);

        if (error) {
          console.error('Error posting data:', error);
          return;
        }
      }
    }
  }

  return (
    <div className="wrapper w-100">
      {isConfirmed ? (
        <div
          className="flex-column align-center confirm-success w-100 max-w-540"
          style={{
            display: 'flex',
          }}
        >
          <img src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" width="120" height="120" />
          <h2 className="title">결제를 완료했어요</h2>
          <div className="response-section w-100">
            <div className="flex justify-between">
              <span className="response-label">결제 금액</span>
              <span id="amount" className="response-text">
                {amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="response-label">주문번호</span>
              <span id="orderId" className="response-text">
                {orderId}
              </span>
            </div>
          </div>

          <div className="w-100 button-group">
            <div className="flex" style={{ gap: '16px' }}>
              <Link to={`/`} className="btn w-100">
                홈으로 가기
              </Link>
              <Link to={`/mypage/order/detail?order_id=${order_id}`} className="btn primary w-100">
                주문 상세 페이지로 가기
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-column align-center confirm-loading w-100 max-w-540">
          <div className="flex-column align-center">
            <img src="https://static.toss.im/lotties/loading-spot-apng.png" width="120" height="120" />
            <h2 className="title text-center">결제 요청까지 성공했어요.</h2>
            <h4 className="text-center description">결제 승인하고 완료해보세요.</h4>
          </div>
          <div className="w-100">
            <button className="btn primary w-100" onClick={confirmPayment}>
              결제 승인하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuccessPage;
