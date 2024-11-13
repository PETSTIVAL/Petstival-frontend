import { useState } from 'react';

/* 반려견 프로필 생성 */
function usePetProfileSurvey() {
  const [petProfileData, setPetProfileData] = useState();
  const [step, setStep] = useState(1);

  /* 반려견 프로필 등록 설문 유효성 검사 */
  function validateStep() {
    switch (step) {
      case 1:
        return petProfileData.pet_name !== '';
      case 2:
        return petProfileData.know_birth !== undefined;
      case 3:
        if (petProfileData.know_birth) {
          return petProfileData.birth_date !== '';
        } else {
          return petProfileData.birth_month < 12 && (petProfileData.birth_month > 0 || petProfileData.birth_year > 0);
        }
      case 4:
        return petProfileData.breed !== '';
      case 5:
        return petProfileData.gender !== '';
      case 6:
        return petProfileData.weight > 0;
      case 7:
        return true;
      default:
        return false;
    }
  }

  return {
    step, // 설문 진행도
    setStep, // 설문 진행도 변경 함수
    petProfileData, // 설문 데이터
    setPetProfileData, // 설문 데이터 상태 변경 함수
    validateStep, // 설문 단계별 유효성 검사
  };
}
export default usePetProfileSurvey;
