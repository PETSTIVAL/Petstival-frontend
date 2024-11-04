import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import OrderItem from './OrderItem';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useDeliveryStore from '../../stores/useDeliveryStore';
import { useProductStore } from '../../stores/useProductStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { useOrderItemStore } from '../../stores/useOrderItemStore';
import { Button } from '@mui/material';
import supabase from '../../services/supabaseClient';

export default function OrderInfo() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState(null);
  const { user } = useAuthStore();
  const { fetchProducts, getProductById } = useProductStore();
  const { name, number, address, detailAddress } = useDeliveryStore();
  const orderItems = useOrderItemStore((state) => state.orderItems);
  const orderTotal = useOrderItemStore((state) => state.orderTotal);
  const [isLoaded, setIsLoaded] = useState(false);
  /**
   * [ ] useTotalStore 파일 및 관련 코드 삭제
   */

  // 모든 필드가 채워졌는지 확인
  const isFormComplete = name && number && address && detailAddress;

  const loadProduct = async () => {
    await fetchProducts();
    const orderItemProducts = orderItems.map((item) => {
      return {
        info: getProductById(item.productId),
        item: item,
      };
    });
    setProductList(orderItemProducts);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    if (productList) setIsLoaded(true);
  }, [productList]);

  const handlePayment = async () => {
    const orderTitle = `${productList[0].info.product_name}${productList.length > 1 ? ` 외 ${productList.length - 1}건` : ''}`;

    // order table에 주문 데이터 삽입
    const dataToPost = {
      user_id: user.id,
      delivery_name: name,
      delivery_tel: number,
      delivery_addr: address,
      delivery_addr_detail: detailAddress,
      total_price: orderTotal, // totalPrice -> orderTotal(useOrderItemStore)로 변경
      total_count: orderItems.length, // quantity -> orderItems.length(주문한 항목 수)로 변경
      order_title: orderTitle,
      img_url_1: productList[0].info.image_url_1,
    };

    const { data: insertData, error: insertError } = await supabase.from('order').insert([dataToPost]).select();

    if (insertError) {
      console.error('Error posting data:', insertError);
      return;
    }

    // insertData에서 order_id 가져오기
    const newOrderId = insertData[0].order_id;

    // order_detail table에 주문 상세 데이터 삽입 -> 배열로 변경
    const orderDetailPost = productList.map((product) => {
      return {
        order_id: newOrderId,
        product_id: product.item.productId,
        count: product.item.quantity,
        price: product.item.totalPrice,
      };
    });

    const { data: detailData, error: detailError } = await supabase.from('order_detail').insert(orderDetailPost);

    if (detailError) {
      console.error('Error posting data:', detailError);
      return;
    }

    navigate(`/payment?order_id=${newOrderId}`, {
      // CheckoutPage로 주문 정보 전달
      state: { orderName: orderTitle, customerName: name, customerEmail: user.email, customerNumber: number },
    });
  };

  const { orderName, customerName, customerEmail } = location.state || {};

  // 위치가 중요함...
  if (!productList) {
    return <p>Loading product data...</p>;
  }

  return (
    <div>
      <h3>주문 상품</h3>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '5px',
          maxWidth: 600,
          flexGrow: 1,
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        }}
      >
        {isLoaded ? productList.map((product, index) => <OrderItem key={index} product={product} totalPrice={orderTotal} />) : <div>Loading</div>}
        <Grid item container spacing={2} sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item xs={3}>
            <Typography variant="body2" component="div">
              총 주문 금액
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" alignItems="center" sx={{ color: 'var(--secondary-orange-default)', fontWeight: 'bold' }}>
            {orderTotal.toLocaleString()}원
          </Grid>
        </Grid>
        <Button
          onClick={handlePayment}
          variant="contained"
          disabled={!isFormComplete}
          size="large"
          sx={{ width: '100%', borderRadius: '8px', backgroundColor: 'var(--primary-default)' }}
        >
          {isFormComplete ? '결제하기' : '배송지를 입력해주세요'}
        </Button>
      </Paper>
    </div>
  );
}
