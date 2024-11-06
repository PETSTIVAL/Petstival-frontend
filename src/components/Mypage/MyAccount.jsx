import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { logout, deleteAccount } from '../../hooks/useAuth';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import YesNoModal from '../../components/Common/Modal/YesNoModal';
import DefaultModal from '../../components/Common/Modal/DefaultModal';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  padding: 24px 32px;
  gap: 20px;
  background-color: #fff;
  border-radius: 8px;
`;

const TextButton = styled.div`
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

export default function MyAccount() {
  const navigate = useNavigate();
  const { user, clearUser } = useAuthStore(); // setUser 추가
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleLogout = async () => {
    try {
      await logout(); // 로그아웃 함수 호출
      // setUser(null); // 로그아웃 후 사용자 상태를 null로 설정
      clearUser();
      // 로그아웃 성공 시 로그아웃 성공 모달 열기
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error(error);
      setIsFailedModalOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount(user); // 회원 탈퇴 함수 호출
      clearUser(); // 유저 정보 초기화

      // 회원 탈퇴 성공 시 회원 탈퇴 모달 열기
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('회원 탈퇴 실패: ' + error);
      setIsFailedModalOpen(true);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '12px' }}>계정 관리</h1>
      <Container className="drop-shadow-default">
        <TextButton onClick={handleLogout}>로그아웃</TextButton>
        <TextButton onClick={handleDelete}>회원탈퇴</TextButton>
      </Container>
      <YesNoModal
        title={`${modalType} 확인`}
        content={`정말 ${modalType}하시겠어요?`}
        isOpen={isConfirmModalOpen}
        setIsOpen={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
        onYesClick={modalType === '로그아웃' ? handleLogout : handleDelete}
      />
      <DefaultModal
        title={`${modalType} 완료`}
        content={`${modalType}이 완료되었어요.`}
        isOpen={isSuccessModalOpen}
        setIsOpen={() => setIsSuccessModalOpen(!isSuccessModalOpen)}
        onYesClick={() => {
          window.location.href = '/login';
        }}
      />
      <DefaultModal
        title={`${modalType} 실패`}
        content={`${modalType}에 실패했어요.\n다시 시도해주세요.`}
        isOpen={isFailedModalOpen}
        setIsOpen={() => setIsFailedModalOpen(!isFailedModalOpen)}
        onYesClick={() => setIsFailedModalOpen(!isFailedModalOpen)}
      />
    </div>
  );
}
