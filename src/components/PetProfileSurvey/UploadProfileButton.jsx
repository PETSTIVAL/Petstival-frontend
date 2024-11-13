import PetProfileIcon from '../../assets/icons/profile-pet.svg?react';
import CameraIcon from '../../assets/icons/camera.svg?react';
import styles from './UploadProfileButton.module.css';
import { useRef } from 'react';
import uploadProfileImg from '../../services/uploadProfileImg';
import { useState } from 'react';
import DefaultModal from '../Common/Modal/DefaultModal';

// Create Supabase client
function UploadProfileButton({ petName, profileUrl, setData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  // 사진 파일 선택 창 표시
  function handleFileButtonClick() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  // 첨부된 사진을 Storage에 업로드 후 URL을 상태에 업데이트
  async function fileInputSubmit(event) {
    // 파일이 존재하지 않을 경우 return
    const targetFile = event.target.files?.[0];
    if (!targetFile) return;

    // 파일을 업로드하고 URL을 받아와 상태에 저장
    try {
      const profileImgUrl = await uploadProfileImg(targetFile);
      setData(profileImgUrl);
    } catch (error) {
      // 파일 업로드에 실패한 경우 모달 띄움
      console.log(error);
      setIsModalOpen(true);
    }
  }

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.petProfileIcon}`} onClick={handleFileButtonClick}>
        {profileUrl === '' ? <PetProfileIcon width="200px" height="200px" /> : <img className={`${styles.profileImg}`} src={`${profileUrl}`}></img>}
        <input ref={fileInputRef} type="file" accept=".jpg .png" onChange={fileInputSubmit} style={{ width: '200px', height: '200px', display: 'none' }} />
        <CameraIcon className={`${styles.cameraIcon}`} />
      </div>
      <DefaultModal
        title={'업로드 실패'}
        content={'사진 업로드에 실패했어요.\n다시 시도해주세요.'}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onYesClick={null}
      />
    </div>
  );
}

export default UploadProfileButton;
