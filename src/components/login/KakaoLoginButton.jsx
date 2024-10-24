import KakaoLoginBtn from '../../assets/images/login-button/kakaotalk.svg?react';
import { signInWithProvider } from '../../hooks/useLogin.js';
import './LoginButtons.css';

const KakaoLoginButton = () => {
    
    const handleKakaoLogin = async() =>{
      try {
        await signInWithProvider('kakao');
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