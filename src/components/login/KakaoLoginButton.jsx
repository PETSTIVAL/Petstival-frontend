import KakaoLoginBtn from '../../assets/images/login-button/kakaotalk.svg?react';
import { signInWithProvider } from '../../hooks/useAuth';
import './LoginButtons.css';
import { useAuthStore } from '../../stores/useAuthStore';
const KakaoLoginButton = () => {
    
    const handleKakaoLogin = async() =>{
      try {
        console.log('로그인 요청 중...');
        const response = await signInWithProvider('kakao');
       // 유저 정보를 상태에 저장
       const user = useAuthStore.getState().user;
       console.log("wpqkf~~~제발",user);
       if (user) {
         console.log('로그인한 유저:', user);
        }
    } catch (error) {
        console.error('카카오 로그인 실패:', error.message);
    }
    };
   
    
   
    return (
        <button className="login-button" onClick={handleKakaoLogin}>
            <KakaoLoginBtn />
        </button>
    )
}

export default KakaoLoginButton;