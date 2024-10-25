import { CheckoutPage } from '../src/pages/PaymentsPage/CheckoutPage.jsx';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { v4 as uuidv4 } from 'uuid';

// loadTossPayments 함수를 모킹하여 결제 위젯을 반환
jest.mock('@tosspayments/tosspayments-sdk', () => ({
  loadTossPayments: jest.fn(),
}));

// uuidv4()를 모킹하여 테스트용 고정 customerKey('test-customer-key')를 반환
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));
