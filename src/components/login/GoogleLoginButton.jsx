import GoogleLoginBtn from '../../assets/images/login-button/google.svg?react'
import { signInWithProvider } from '../../hooks/useLogin.js';
import './LoginButtons.css';
const GoogleLoginButton = () => {
    const handleGoogleLogin = async() =>{
      try {
        await signInWithProvider('google');
    } catch (error) {
        console.error('카카오 로그인 실패:', error.message);
    }
    };
    return (
       
            <button className="login-button" onClick={handleGoogleLogin}>
                <GoogleLoginBtn />
            </button>
        
    )
}
export default GoogleLoginButton;