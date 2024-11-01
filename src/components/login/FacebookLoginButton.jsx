import FacebookLoginBtn from '../../assets/images/login-button/facebook.svg';
import { signInWithProvider } from '../../hooks/useAuth';
import './LoginButtons.css';
const FacebookLoginButton = () => {
    const handleFacebookLogin = async() =>{
      try {
        await signInWithProvider('facebook');
    } catch (error) {
        console.error('카카오 로그인 실패:', error.message);
    }
    };
    return (
        <button className="login-button" onClick={handleFacebookLogin}>
            <FacebookLoginBtn />
        </button>
    )
}
export default FacebookLoginButton;