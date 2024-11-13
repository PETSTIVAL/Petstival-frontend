import { useState } from 'react';

function usePetProfileForm() {
  const [petProfileData, setPetProfileData] = useState({
    pet_name: '',
    know_birth: true,
    birth_date: '',
    birth_year: '',
    birth_month: '',
    breed: '',
    gender: '',
    neutered: true,
    weight: '',
    profile_url: '',
  });
  const [errorMsg, setErrorMsg] = useState({
    name: '', // 이름 에러 메시지
    date: '', // 생년월일 에러 메시지
    month: '', // 개월수 에러 메시지
    breed: '', // 견종 에러 메시지
    weight: '', // 몸무게 에러 메시지
  });

  /* 반려견 프로필 수정 폼 에러 메시지 설정 */
  function validatePetProfile() {
    // 에러 메시지 설정
    const errors = {
      name: petProfileData.pet_name === '' ? '이름을 입력해주세요.' : '',
      date: petProfileData.know_birth && petProfileData.birth_date === '' ? '생년월일을 입력해주세요.' : '',
      month: !petProfileData.know_birth && +petProfileData.birth_year + +petProfileData.birth_month === 0 ? '최소 1개월 이상의 나이를 입력해주세요.' : '',
      breed: petProfileData.breed === '' ? '견종을 입력해주세요.' : '',
      weight: Number(petProfileData.weight) === 0 ? '몸무게는 0으로 설정할 수 없어요.' : '',
    };

    // 에러 메시지 업데이트
    setErrorMsg(errors);

    // 모든 에러 메시지가 없는 경우 true 반환
    return Object.values(errors).every((msg) => msg === '');
  }

  return { petProfileData, setPetProfileData, errorMsg, validatePetProfile };
}

export default usePetProfileForm;
