import KakaoLoginButton from '../../components/login/KakaoLoginButton';
import GoogleLoginButton from '../../components/login/GoogleLoginButton';
import FacebookLoginButton from '../../components/login/FacebookLoginButton';
import PetstivalLogo from '../../assets/logo/logo-wrapper.svg?react';
import styles from './Login.module.css';
const LoginPage = () => {
  return (
    <>
     <div className={styles.loginContainer}>
     <div className={styles.logo}>
          <PetstivalLogo />
        </div>
      <KakaoLoginButton/>
      <GoogleLoginButton/>
      {/* <FacebookLoginButton/> */}
      </div>
    </>
   
  );
};

export default LoginPage;
