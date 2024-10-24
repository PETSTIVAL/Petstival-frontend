import LoginPage from '../pages/login/LoginPage';
import CheckoutPage from "../pages/PaymentsPage/CheckoutPage";
import SuccessPage from "../pages/PaymentsPage/SuccessPage";
import FailPage from "../pages/PaymentsPage/FailPage";
import MyPage from "../pages/MyPage/MyPage";
import OrderPage from "../pages/MyPage/OrderPage/OrderPage";
import OrderDetailPage from "../pages/MyPage/OrderDetailPage/OrderDetailPage";
import PaymentsPage from "../pages/PaymentsPage/PaymentsPage";

// 페이지 URL 및 렌더링할 페이지 컴포넌트 정보를 저장하는 객체
export const Screens = {
  Login: {
    path: '/login', // url 경로 지정
    element: <LoginPage />, // 렌더링할 페이지 컴포넌트 지정
  },
  Checkout: {
    path: '/payment', // url 경로 지정
    element: <CheckoutPage />, // 렌더링할 페이지 컴포넌트 지정
  },
  Success: {
    path: '/success', // url 경로 지정
    element: <SuccessPage />, // 렌더링할 페이지 컴포넌트 지정
  },
  Fail: {
    path: '/fail', // url 경로 지정
    element: <FailPage />, // 렌더링할 페이지 컴포넌트 지정
  },
  MyPage: {
    path: '/mypage', // url 경로 지정
    element: <MyPage />, // 렌더링할 페이지 컴포넌트 지정
  },
  MyOrder: {
    path: '/mypage/order', // url 경로 지정
    element: <OrderPage />, // 렌더링할 페이지 컴포넌트 지정 
  },
  OrderDetail: {
    path: '/mypage/order/detail', // url 경로 지정
    element: <OrderDetailPage />, // 렌더링할 페이지 컴포넌트 지정 
  },

  Order: {
    path: '/shop/detail/order', // url 경로 지정
    element: <PaymentsPage />, // 렌더링할 페이지 컴포넌트 지정 
  },
  // 페이지를 추가 시 아래에 새로운 페이지 객체 작성
  // Survey: {
  //   path: '/survey',
  //   element: null,
  // },
};

export const RouteDef = {
  ...Screens,
};
