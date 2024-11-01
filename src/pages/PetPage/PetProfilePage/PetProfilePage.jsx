import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './PetProfilePage.module.css';
import DetailBar from '../../../stories/DetailBar';
import PetProfileDetailCard from '../../../components/Pet/PetProfileDetailCard';
import usePetProfileSurvey from '../../../hooks/usePetProfileSurvey';
import deletePetProfile from '../../../services/deletePetProfile';
import DefaultModal from '../../../components/Common/Modal/DefaultModal';
import YesNoModal from '../../../components/Common/Modal/YesNoModal';
import NavBar from '../../../components/Navbar/Navbar';

function PetProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { petId } = useParams();
  const { petData } = location.state || {};
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isDeleteFailed, setIsDeleteFailed] = useState(false);

  function handleClickEditProfile() {
    navigate(`/pet/${petId}/edit`, { state: { petData: petData } });
  }

  // 반려견 프로필 데이터 삭제 함수
  async function handleDeletePetProfile() {
    try {
      await deletePetProfile(petId); // petId에 해당하는 반려견 프로필 데이터 삭제
      setIsDeleteSuccess(true); // 삭제에 성공한 경우 성공 알림 모달 띄움
    } catch (error) {
      setIsDeleteFailed(true); // 삭제에 실패한 경우 실패 알림 모달 띄움
    }
  }

  return (
    <div className={`${styles.container}`}>
      <DetailBar title={'프로필 상세보기'} />
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.headerWrapper}`}>
          <div className={`${styles.title}`}>{`${petData.pet_name}의 프로필`}</div>
          <div className={`${styles.addProfileButton}`} onClick={handleClickEditProfile}>
            프로필 수정하기
          </div>
        </div>
        <div className={`${styles.cardWrapper}`}>
          <PetProfileDetailCard
            petData={petData}
            onDeleteClick={() => {
              setIsConfirmModalOpen(true);
            }}
          />
        </div>
      </div>
      <YesNoModal
        title={'반려견 프로필 삭제'}
        content={'정말 반려견 프로필을 삭제하시겠어요?'}
        isOpen={isConfirmModalOpen}
        setIsOpen={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
        onYesClick={handleDeletePetProfile}
      />
      <DefaultModal
        title={'삭제 완료'}
        content={'반려견 프로필 삭제가 완료되었어요.'}
        isOpen={isDeleteSuccess}
        setIsOpen={() => setIsDeleteSuccess(!isDeleteSuccess)}
        onYesClick={() => {
          window.location.href = '/pet';
        }}
      />
      <DefaultModal
        title={'삭제 실패'}
        content={'반려견 프로필 삭제에 실패했어요.\n다시 시도해주세요.'}
        isOpen={isDeleteFailed}
        setIsOpen={() => setIsDeleteFailed(!isDeleteFailed)}
        onYesClick={() => setIsDeleteFailed(!isDeleteFailed)}
      />
      <NavBar selectedMenu={'Pet'} />
    </div>
  );
}

export default PetProfilePage;
