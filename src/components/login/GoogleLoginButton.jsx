import GoogleLoginBtn from '../../assets/images/login-button/google.svg?react'
import { signInWithProvider } from '../../hooks/useAuth';
import './LoginButtons.css';
import { useAuthStore } from '../../stores/useAuthStore';

const GoogleLoginButton = () => {
  const setUser = useAuthStore(state => state.setUser); // Zustand 스토어에서 setUser 가져오기

    const handleGoogleLogin = async() =>{
      try {
        console.log('로그인 요청 중...');
        const response = await signInWithProvider('google');
       // 유저 정보를 상태에 저장
       const user = useAuthStore.getState().user;
       console.log("wpqkf~~~제발",user);
       if (user) {
         console.log('로그인한 유저:', user);
         navigate('/mypage'); // 로그인 성공 후 페이지 이동
       }
    } catch (error) {
        console.error('구글 로그인 실패:', error.message);
    }
    };
    return (
       
            <button className="login-button" onClick={handleGoogleLogin}>
                <GoogleLoginBtn />
            </button>
        
    )
}
export default GoogleLoginButton;