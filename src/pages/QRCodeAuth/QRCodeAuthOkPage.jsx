import styles from './QRCodeAuthOkPage.module.css';
import QRCodeOkLogo from '../../assets/icons/QR_ok_logo.svg?react';
import { useNavigate } from 'react-router-dom';
const QRCodeAuthOkPage = () =>{
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/'); // This will navigate back to the previous page
      };
    return (

        <div className={styles.container}>
            <div className={styles.logoLayout}>
             <QRCodeOkLogo/>
             <h1>참여 인증이 완료되었어요.</h1>
             <p>참여 인증 뱃지를 발급했어요!<br/>펫스티벌 페이지에서 확인할 수 있어요.</p>
            </div>
        
            <button className={styles.returnButton} onClick={handleGoBack}>
                돌아가기
            </button>
        </div>
    )
}
export default QRCodeAuthOkPage;