// src/hooks/useAuth.js
import supabase from '../services/supabaseClient';
import supabaseAdmin from '../services/supabaseAdminClient';
import { useAuthStore } from '../stores/useAuthStore';
import { useCartStore } from '../stores/useCartStore';

/**
 * 소셜 로그인 함수
 * @param {string} provider - 소셜 로그인 공급자 (google, facebook, kakao 등)
 * @returns {Promise<void>}
 */
export const signInWithProvider = async (provider) => {
  const { setUser } = useAuthStore.getState();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: 'https://localhost:5173/oauth',
    },
  });

  if (error) {
    console.error('로그인 오류:', error.message);
    throw error;
  }

  const userData = data;
  //   console.log("사용자 데이터:", JSON.stringify(userData, null, 2)); // 사용자 데이터 출력
  if (userData) {
    console.log('띠용?', data.auth_event);
  }
  console.log('로그인 성공:', userData);
};

/**
 * 로그아웃 함수
 * @returns {Promise<void>}
 */
export const logout = async () => {
  const { clearUser } = useAuthStore.getState();
  const { clearCart } = useCartStore.getState();

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('로그아웃 오류:', error.message);
    throw error;
  }

  clearUser(); // 유저 정보 초기화
  clearCart(); // 장바구니 정보 초기화
  console.log('로그아웃 성공');
};

/**
 * 회원 탈퇴 함수
 * @returns {Promise<void>}
 */
export const deleteAccount = async (user) => {
  const { clearUser } = useAuthStore.getState();
  const { clearCart } = useCartStore.getState();

  //   const { user, error } = await supabase.auth.getUser();
  //   console.log("탈퇴 버튼 유저 정보 : ",useUserAuthInfo);
  //   if (error) {
  //     console.error('유저 정보 가져오기 오류:', error.message);
  //     return;
  //   }

  if (!user) {
    console.error('유저가 로그인되지 않았습니다.');
    return;
  }
  console.log('유저 정보! : ', user);
  console.log('유저 아이디! : ', user.id);
  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
  if (error) {
    console.error('회원 탈퇴 오류:', error.message);
    return;
  }

  clearUser(); // 유저 정보 초기화
  clearCart(); // 장바구니 정보 초기화

  console.log('회원 탈퇴 성공');
  await supabase.auth.signOut();
};
