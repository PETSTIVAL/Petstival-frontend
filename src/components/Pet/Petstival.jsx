import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonSmall from '../../components/Common/Button/ButtonSmall';
import styles from './PestivalItem.module.css';
import BadgeUnverified from '../../assets/icons/petstival_nonauth.svg?react';
import BadgeVerified from '../../assets/icons/petstival_auth.svg?react';

function PetstivalItem({ id, title, isVerified, verifiedAt }) {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/petstival/${id}`);
  };
  const handleQRAuth = () => {
    navigate('/qrscanner');
  };

  return (
    <div className={styles.festivalItem}>
      <div className={styles.rowWrapper} onClick={handleTitleClick}>
        {isVerified ? <BadgeVerified className={styles.verifiedBadge} alt="인증 완료 뱃지" /> : <BadgeUnverified className={styles.badge} alt="인증 전 뱃지" />}
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div className={styles.dateText}>{isVerified ? `${verifiedAt}` : '참여 인증 전이에요.'}</div>{' '}
        </div>
      </div>
      <div className={styles.verification}>
        {isVerified ? <ButtonSmall children="인증완료" disabled={true} /> : <ButtonSmall children="인증하기" onClick={handleQRAuth} />}
      </div>
    </div>
  );
}
export default PetstivalItem;
