import { CheckoutPage } from '../src/pages/PaymentsPage/CheckoutPage.jsx';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { v4 as uuidv4 } from 'uuid';
