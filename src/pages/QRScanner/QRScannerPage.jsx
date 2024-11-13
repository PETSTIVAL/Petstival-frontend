import QRScanner from '../../components/QRScanner/QRScanner';
import { useAuthStore } from '../../stores/useAuthStore';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const QRScannerPage = () => {
    const {user} = useAuthStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
          navigate('/login'); // user가 없는 경우 login 페이지로 리디렉션
        }
      }, [user]); // user 또는 navigate가 변경될 때만 실행
    
      if (!user) return null; // user가 없을 때는 null을 반환하여 컴포넌트 렌더링을 막음
    return (
        <QRScanner/>
    )
}
export default QRScannerPage;