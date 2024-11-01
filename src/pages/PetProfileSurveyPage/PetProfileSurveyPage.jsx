import { useEffect, useState } from 'react';
import styles from './PetProfileSurveyPage.module.css';
import usePetProfileSurvey from '../../hooks/usePetProfileSurvey';
import AngleLeftIcon from '../../assets/icons/angle-left.svg?react';
import ProfileSurvey from '../../components/PetProfileSurvey/ProfileSurvey';
import ButtonLarge from '../../components/Common/Button/ButtonLarge';
import DefaultModal from '../../components/Common/Modal/DefaultModal';
import insertPetProfile from '../../services/insertPetProfile';

function PetProfileSurveyPage() {
  const { step, setStep, petProfileData, setPetProfileData, validateStep } = usePetProfileSurvey();
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

  // 새로운 반려견 프로필 데이터를 DB에 저장
  async function handleInsertPetProfile() {
    try {
      await insertPetProfile(petProfileData);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.log(error);
      setIsFailedModalOpen(true);
      return;
    }
  }

  /* 프로필 설문 단계 hanlder */
  function handleSurveyStep() {
    if (step < 7) {
      setStep(step + 1);
      return;
    }
    if (step === 7) {
      handleInsertPetProfile();
    }
  }

  // 화면 렌더링 시 프로필 정보 및 설문 단계 초기화
  useEffect(() => {
    setPetProfileData({
      pet_name: '',
      know_birth: true,
      birth_date: '',
      birth_year: '',
      birth_month: '',
      breed: '',
      gender: '',
      neutered: true,
      weight: '',
      profile_img_url: '',
    });
    setStep(1); // 새로고침 시 단계를 1로 초기화
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <AngleLeftIcon onClick={() => (step === 1 ? window.history.back() : setStep(step - 1))}></AngleLeftIcon>
        </div>
        <div>반려견 프로필 등록하기</div>
        <div className={styles.progressIndicator}>
          <div className={styles.progressCount}>{step}</div>
          <div>/7</div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.title}>{surveyTitle[step - 1].title}</div>
        <div className={styles.subTitle}>{surveyTitle[step - 1].subtitle}</div>
        <div className={styles.surveyContentContainer}>
          {petProfileData ? (
            <ProfileSurvey
              step={step} // 설문 단계 상태
              petProfileData={petProfileData} // 반려견 프로필 상태
              setPetProfileData={setPetProfileData} // 반려견 프로필 상태 변경 함수
              validateStep={validateStep} // 설문 항목별 유효성 검사
              setIsNextButtonEnabled={setIsNextButtonEnabled} // 다음 버튼 활성화 함수
            ></ProfileSurvey>
          ) : (
            <></>
          )}
        </div>
      </div>
      <ButtonLarge children={step === 7 ? '프로필 생성하기' : '다음으로'} disabled={!isNextButtonEnabled} onClick={handleSurveyStep}></ButtonLarge>
      <DefaultModal
        title={`프로필 생성 완료`}
        content={`반려견 프로필이 생성되었어요.`}
        isOpen={isSuccessModalOpen}
        setIsOpen={() => setIsSuccessModalOpen(!isSuccessModalOpen)}
        onYesClick={() => {
          window.location.href = '/';
        }}
      />
      <DefaultModal
        title={`프로필 생성 실패`}
        content={`반려견 프로필 생성에 실패했어요.\n다시 시도해주세요.`}
        isOpen={isFailedModalOpen}
        setIsOpen={() => setIsFailedModalOpen(!isFailedModalOpen)}
        onYesClick={() => setIsFailedModalOpen(!isFailedModalOpen)}
      />
    </div>
  );
}

export default PetProfileSurveyPage;

// 타이틀 텍스트
const surveyTitle = [
  {
    title: `반려견의 이름을\n입력해주세요.`,
    subtitle: `프로필 입력 후에도 수정할 수 있어요.`,
  },
  {
    title: `반려견의 나이를\n알고 있나요?`,
    subtitle: `생년월일을 몰라도 괜찮아요.`,
  },
  {
    title: `반려견의 나이를\n입력해주세요.`,
    subtitle: `프로필 입력 후에도 수정할 수 있어요.`,
  },
  {
    title: `어떤 아이인가요?`,
    subtitle: `견종을 입력해주세요.`,
  },
  {
    title: `어떤 성별인가요?`,
    subtitle: `성별과 중성화 여부를 선택해주세요.`,
  },
  {
    title: `몸무게를 입력해주세요.`,
    subtitle: `프로필 입력 후에도 수정할 수 있어요.`,
  },
  {
    title: `프로필 사진을\n등록해주세요.`,
    subtitle: `등록하지 않으면 기본 프로필이 지정돼요.`,
  },
  {
    title: `프로필 정보를\n생성하고 있어요.`,
    subtitle: `잠시만 기다려주세요!`,
  },
];
