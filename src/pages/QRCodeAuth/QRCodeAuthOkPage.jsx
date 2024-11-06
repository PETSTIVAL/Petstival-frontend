import React, { useEffect, useState } from 'react';
import styles from './QRCodeAuthOkPage.module.css';
import QRCodeOkLogo from '../../assets/icons/QR_ok_logo.svg?react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import ButtonLarge from '../../components/Common/Button/ButtonLarge';

const QRCodeAuthOkPage = () => {
  const user = useAuthStore();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/'); // This will navigate back to the previous page
  };
  useEffect(() => {
    if (!user.user) {
      navigate('/login');
    }
  }, [user]);
  if (!user) return null;

  return (
    <div className={styles.container}>
      <QRCodeOkLogo />
      <h2 style={{ marginTop: '24px', marginBottom: '8px' }}>참여 인증이 완료되었어요.</h2>
      <div style={{ fontSize: '16px', color: 'var(--gray-60)' }}>
        참여 인증 뱃지를 발급했어요!
        <br />
        펫스티벌 페이지에서 확인할 수 있어요.
      </div>

      <ButtonLarge children="돌아가기" onClick={handleGoBack} />
    </div>
  );
};
export default QRCodeAuthOkPage;
