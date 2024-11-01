import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore'; // useAuthStore import
import supabase from '../../services/supabaseClient'; // Supabase 클라이언트 import
import DefaultModal from '../../components/Common/Modal/DefaultModal';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import styles from '../../pages/Oauth/OauthPage.module.css';

const OAuthContainer = styled`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function OauthPage() {
  const location = useLocation();
  const { setUser } = useAuthStore(); // useAuthStore에서 setUser 가져오기
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [nextPage, setNextPage] = useState('/mypage');

  const params = new URLSearchParams(location.hash.slice(1));
  const accessToken = params.get('access_token');

  // 최초 로그인 여부를 받아와 분기 처리
  const getIsFirstLogin = async (user_id) => {
    try {
      // user.id로 DB에서 사용자 정보 조회
      const { data, error } = await supabase.from('user').select().eq('user_id', `${user_id}`);
      const user = data[0];

      if (error) {
        console.error(error);
        setIsFailedModalOpen(true);
        throw error;
      }

      console.table(user);
      console.log('최초 로그인 여부 =', user.is_first_login);
      if (user.is_first_login) {
        // 최초 로그인인 경우 최초 로그인 여부를 DB에 업데이트하고 설문 페이지로 이동
        setNextPage('/survey');
        await updateFirstLogin(user_id);
        setIsSuccessModalOpen(true);
        return;
      } else {
        // 최초 로그인이 아닌 경우 홈 페이지로 이동
        setNextPage('/');
        setIsSuccessModalOpen(true);
        return;
      }
    } catch (error) {
      console.error(error);
      setIsFailedModalOpen(true);
      throw error;
    }
  };

  // 최초 로그인 여부를 DB에 업데이트
  const updateFirstLogin = async (user_id) => {
    try {
      // 로그인한 유저의 최초 로그인 여부를 false로 변경
      const { data, error } = await supabase.from('user').update({ is_first_login: false }).eq('user_id', `${user_id}`);

      if (error) {
        console.error(error);
        setIsFailedModalOpen(true);
        throw error;
      }
    } catch (error) {
      console.error(error);
      setIsFailedModalOpen(true);
      throw error;
    }
  };

  React.useEffect(() => {
    const exchangeTokenForUser = async () => {
      try {
        if (accessToken) {
          // Supabase API를 사용하여 사용자 정보 가져오기
          const { data, error } = await supabase.auth.getUser(accessToken);

          if (error) {
            console.error('Error fetching user:', error.message);

            setIsFailedModalOpen(true);
            // navigate('/login');
            return;
          }

          const userData = data.user;

          // 로그인에 성공한 경우 user data를 AuthStore에 저장
          if (userData) {
            setUser({
              id: userData.id,
              email: userData.email,
              name: userData.user_metadata.full_name || '', // 사용자 이름
              sub: userData.user_metadata.sub,
              avatarUrl: userData.user_metadata.avatar_url,
            });

            // 최초 로그인 여부에 따라 분기
            getIsFirstLogin(userData.id);
            return;
          } else {
            console.error('no User Data');
            setIsFailedModalOpen(true);
          }
        } else {
          console.error('no access token');
          setIsFailedModalOpen(true);
          console.error(error.message);
        }
      } catch (error) {
        console.error(error);
        setIsFailedModalOpen(true);
      }
    };

    exchangeTokenForUser();
  }, []);

  return (
    <div className={styles.container}>
      <CircularProgress />
      <DefaultModal
        title={'로그인 성공'}
        content={'로그인에 성공했어요.'}
        isOpen={isSuccessModalOpen}
        setIsOpen={() => setIsSuccessModalOpen(false)}
        onYesClick={() => {
          window.location.href = `${nextPage}`;
        }}
      />
      <DefaultModal
        title={'로그인 실패'}
        content={'로그인에 실패했어요.\n다시 시도해주세요.'}
        isOpen={isFailedModalOpen}
        setIsOpen={() => setIsFailedModalOpen(false)}
        onYesClick={() => {
          window.location.href = '/login';
        }}
      />
    </div>
  );
}

export default OauthPage;
