import styles from './PetProfileDetailCard.module.css';
import PetProfileIcon from '../../assets/icons/profile-pet.svg?react';
import formatDate from '../../utils/formatDate';
import CancelIcon from '../../assets/icons/cancel.svg?react';

function PetProfileCard({ petData, onDeleteClick }) {
  const birth_date_calc = petData.birth_date ? formatDate(petData.birth_date) : '';
  const birth_year_calc = Math.floor(petData.birth_month / 12);
  const birth_month_calc = petData.birth_month % 12;

  return (
    <div className={`${styles.container} drop-shadow-default`}>
      <div className={`${styles.cancelButtonContainer}`} onClick={onDeleteClick}>
        <CancelIcon />
      </div>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.profileImgContainer}`}>
          {petData.profile_url ? <img className={`${styles.profileImg}`} src={petData.profile_url} /> : <PetProfileIcon width="72%" height="72%" />}
        </div>

        <div>
          <div className={`${styles.nameText}`}>{petData.pet_name}</div>
          <div className={`${styles.birthText}`}>{petData.birth_date ? birth_date_calc : `${birth_year_calc}년 ${birth_month_calc}개월`}</div>
        </div>
        <div className={`${styles.contentWrapper}`}>
          <div className={`${styles.contentRowWrapper}`}>
            <div className={`${styles.labelText}`}>{`견종`}</div>
            <div className={`${styles.contentText}`}>{petData.breed}</div>
          </div>
          <div className={`${styles.contentRowWrapper}`}>
            <div className={`${styles.labelText}`}>{`성별`}</div>
            <div className={`${styles.contentText}`}>{petData.gender === 'male' ? '남아' : '여아'}</div>
          </div>
          <div className={`${styles.contentRowWrapper}`}>
            <div className={`${styles.labelText}`}>{`몸무게`}</div>
            <div className={`${styles.contentText}`}>{petData.weight}kg</div>
          </div>
          <div className={`${styles.contentRowWrapper}`}>
            <div className={`${styles.labelText}`}>{`중성화`}</div>
            <div className={`${styles.contentText}`}>{petData.neutered ? '중성화 했어요.' : '중성화 안 했어요.'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetProfileCard;
