import { useEffect, useState } from 'react';
import styled from 'styled-components';
import OrderList from '../../../components/Mypage/OrderPage/OrderList';
import Navbar from '../../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import DetailBar from '../../../stories/DetailBar';
import supabase from '../../../services/supabaseClient';
import { useAuthStore } from '../../../stores/useAuthStore';
import { LinearProgress } from '@mui/material';

const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;

const OrderCard = styled.div`
  position: relative;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 0px rgba(51, 51, 51, 0.08);
  margin-bottom: 20px;
`;

function OrderPage() {
  const navigate = useNavigate();
  const [successProduct, setSuccessProduct] = useState(null);
  const user = useAuthStore((state) => state.user);

  const getSuccessData = async () => {
    try {
      const { data, error } = await supabase
        .from('payment')
        .select(
          `
          order_id,
          order (
            order_id,
            total_price,
            total_count,
            delivery_addr,
            delivery_name,
            created_at,
            user_id,
            delivery_tel,
            delivery_addr_detail,
            order_title,
            img_url_1,
            order_status,
            order_detail (product_id)
          )
        `
        )
        .eq('payment_state', 'success')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const filteredData = data?.filter((item) => item.order.user_id === user.id);

      if (filteredData) {
        setSuccessProduct(filteredData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getSuccessData();
  }, []);

  if (!successProduct) {
    return <LinearProgress />;
  }

  const groupItemsByDate = (items) => {
    return items.reduce((acc, item) => {
      const date = new Date(item.order.created_at)
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\.$/, '');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  let groupedItems = {};
  if (successProduct[successProduct.length - 1]?.order !== null && successProduct.length > 0) {
    groupedItems = groupItemsByDate(successProduct);
  }

  return (
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
  );
}

export default OrderPage;