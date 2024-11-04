import HomePage from '../pages/HomePage/HomePage';
import PetstivalListPage from '../pages/PetstivalListPage/PetstivalListPage';
import PetstivalDetailPage from '../pages/PetstivalListPage/PetstivalDetailPage/PetstivalDetailPage';
import LoginPage from '../pages/login/LoginPage';
import CheckoutPage from '../pages/PaymentsPage/CheckoutPage';
import SuccessPage from '../pages/PaymentsPage/SuccessPage';
import FailPage from '../pages/PaymentsPage/FailPage';
import MyPage from '../pages/MyPage/MyPage';
import OrderPage from '../pages/MyPage/OrderPage/OrderPage';
import OrderDetailPage from '../pages/MyPage/OrderDetailPage/OrderDetailPage';
import PaymentsPage from '../pages/PaymentsPage/PaymentsPage';
import PetProfileSurveyPage from '../pages/PetProfileSurveyPage/PetProfileSurveyPage';
import OauthPage from '../pages/Oauth/OauthPage';
import PetPage from '../pages/PetPage/PetPage';
import PetProfilePage from '../pages/PetPage/PetProfilePage/PetProfilePage';
import EditPetProfilePage from '../pages/PetPage/EditPetProfilePage/EditPetProfilePage';
import ProductListPage from '../pages/ShopPage/ProductListPage';
import ProductDetailPage from '../pages/ShopPage/ProductDetailPage';
import PetstivalShopPage from '../pages/PetstivalShopPage/PetstivalShopPage';
import { element } from 'prop-types';
import CartPage from '../pages/ShopPage/CartPage';

// 페이지 URL 및 렌더링할 페이지 컴포넌트 정보를 저장하는 객체
export const Screens = {
  Login: {
    path: '/login',
    element: <LoginPage />,
  },
  Home: {
    path: '/',
    element: <HomePage />,
  },
  PetstivalList: {
    path: '/petstival',
    element: <PetstivalListPage />,
  },
  PetstivalDetail: {
    path: '/petstival/:id',
    element: <PetstivalDetailPage />,
  },
  Checkout: {
    path: '/payment',
    element: <CheckoutPage />,
  },
  Success: {
    path: '/success',
    element: <SuccessPage />,
  },
  Fail: {
    path: '/fail',
    element: <FailPage />,
  },
  MyPage: {
    path: '/mypage',
    element: <MyPage />,
  },
  Order: {
    path: '/mypage/order', // url 경로 지정
    element: <OrderPage />, // 렌더링할 페이지 컴포넌트 지정
  },
  OrderDetail: {
    path: '/mypage/order/detail',
    element: <OrderDetailPage />,
  },
  PetProfileSurvey: {
    path: '/survey',
    element: <PetProfileSurveyPage />,
  },
  Oauth: {
    path: '/oauth',
    element: <OauthPage />,
  },
  Pet: {
    path: '/pet',
    element: <PetPage />,
  },
  PetProfile: {
    path: '/pet/:petId',
    element: <PetProfilePage />,
  },
  EditPetProfile: {
    path: '/pet/:petId/edit',
    element: <EditPetProfilePage />,
  },
  Products: {
    path: '/products',
    element: <ProductListPage />,
  },
  Detail: {
    path: '/products/:id',
    element: <ProductDetailPage />,
  },
  Payments: {
    path: '/order',
    element: <PaymentsPage />,
  },
  PetstivalProducts: {
    path: '/products/petstival',
    element: <PetstivalShopPage />,
  },
  cart: {
    path: '/cart',
    element: <CartPage />,
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
