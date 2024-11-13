import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useAuthStore } from '../../stores/useAuthStore';
import styled from 'styled-components';

// [x] 마이페이지 CSS 수정
// [ ] 주문 내역 페이지 CSS 수정
// [x] 주문 상세 페이지 CSS 수정
// [ ] 펫스티벌 추천 상품 페이지 CSS 수정
// [ ] QR 인증 완료 페이지 CSS 수정

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 24px;
  gap: 20px;
  background-color: #fff;
  border-radius: 8px;
`;

export default function MyProfile() {
  const { user } = useAuthStore();
  return (
    <div>
      <h1 style={{ marginBottom: '12px' }}>나의 프로필</h1>
      <Wrapper className="drop-shadow-default">
        <img
          src={user.avatarUrl} // 사용자 avatarUrl을 src로 설정
          alt="User Avatar"
          style={{ width: '80px', height: '80px', borderRadius: '50%' }} // 동그란 모양으로 만들기
        />

        <div>
          <div style={{ fontSize: '16px', fontWeight: '600' }}>{user.name}</div>
          <div style={{ fontSize: '14px', fontWeight: '400', color: 'var(--gray-60)' }}>{user.email}</div>
        </div>
      </Wrapper>
    </div>
  );
}
