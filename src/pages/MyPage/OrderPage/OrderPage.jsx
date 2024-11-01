import { useEffect, useState } from 'react';
import styled from 'styled-components';
import OrderList from '../../../components/Mypage/OrderPage/OrderList';
import Navbar from '../../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import DetailBar from '../../../stories/DetailBar';
import supabase from '../../../services/supabaseClient';
import { useAuthStore } from '../../../stores/useAuthStore';

const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;

function OrderPage() {
  const navigate = useNavigate();
  const [successProduct, setSuccessProduct] = useState(null);
  const user = useAuthStore((state) => state.user);

  const getSuccessData = async () => {
    // payment 테이블에서 payment_state가 success인 데이터만 order 테이블의 정보를 가져옴
    const { data, error } = await supabase.from('payment').select('order_id, order(*)').eq('payment_state', 'success');

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    const filteredData = data?.filter((item) => item.order.user_id === user.id);

    if (filteredData) {
      setSuccessProduct(filteredData);
    }
  };

  useEffect(() => {
    getSuccessData();
  }, []);

  // 위치가 중요함...
  if (!successProduct) {
    return <p>Loading product data...</p>;
  }

  // 아이템 데이터를 날짜별로 그룹화하는 함수
  const groupItemsByDate = (items) => {
    return items.reduce((acc, item) => {
      const date = new Date(item.order.created_at)
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\.$/, ''); // 날짜만 추출
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  let groupedItems = {};
  if (successProduct[successProduct.length - 1].order !== null && successProduct.length > 0) {
    groupedItems = groupItemsByDate(successProduct);
  }

  return (
    <>
      {successProduct && successProduct.length > 0 && (
        <>
          <DetailBar title="주문 내역" />

          <Wrapper>
            {Object.keys(groupedItems).map((date) => (
              <div key={date}>
                <h3>{date}</h3>
                {groupedItems[date].map((item, index) => (
                  <OrderList key={index} item={item} />
                ))}
              </div>
            ))}
          </Wrapper>
          <Navbar selectedMenu="MyPage" />
        </>
      )}
    </>
  );
}

export default OrderPage;
