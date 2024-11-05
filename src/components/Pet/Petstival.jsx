import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './PestivalItem.module.css';
import badgeUnverified from '../../assets/icons/petstival_nonauth.svg';
import badgeVerified from '../../assets/icons/petstival_auth.svg';

function PetstivalItem({ id, title, startdate, isVerified, onVerify }) {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/petstival/${id}`);
  };

  return (
    <div className={styles.festivalItem}>
      <div className={styles.info}>
        <img src={isVerified ? badgeVerified : badgeUnverified} alt={isVerified ? '인증 완료 뱃지' : '인증 전 뱃지'} className={styles.badge} />
        <h3 onClick={handleTitleClick} className={styles.title}>
          {title}
        </h3>
        <p>{isVerified ? startdate : '아직 참여 인증 전이에요.'}</p>
      </div>
      <div className={styles.verification}>
        {isVerified ? (
          <Button variant="contained" color="success" disabled>
            인증 완료
          </Button>
        ) : (
          <Button variant="outlined" color="primary" onClick={onVerify}>
            인증하기
          </Button>
        )}
      </div>
    </div>
  );
}
export default PetstivalItem;
