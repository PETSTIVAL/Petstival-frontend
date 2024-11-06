import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './EditPetProfilePage.module.css';
import DetailBar from '../../../stories/DetailBar';
import Input from '../../../components/Common/Input/Input';
import InputNumber from '../../../components/Common/Input/InputNumber';
import RadioGroup from '../../../components/PetProfileSurvey/RadioGroup';
import RadioButton from '../../../components/PetProfileSurvey/RadioButton';
import UploadProfileButton from '../../../components/PetProfileSurvey/UploadProfileButton';
import ButtonMedium from '../../../components/Common/Button/ButtonMedium';
import { CircularProgress } from '@mui/material';
import DefaultModal from '../../../components/Common/Modal/DefaultModal';
import YesNoModal from '../../../components/Common/Modal/YesNoModal';
import deletePetProfile from '../../../services/deletePetProfile';
import updatePetProfile from '../../../services/updatePetProfile';
import usePetProfileForm from '../../../hooks/usePetProfileForm';
import supabase from '../../../services/supabaseClient';

function EditPetProfilePage() {
  const location = useLocation();
  const { petId } = useParams();
  const { petData } = location.state || {};

  const {
    petProfileData,
    setPetProfileData,
    validatePetProfile,
    errorMsg,
  } = usePetProfileForm();

  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(petData.breed || "");
  const [focusIndex, setFocusIndex] = useState(-1);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isTyping, setIsTyping] = useState(false); // New state to track typing

  useEffect(() => {
    setPetProfileData({
      pet_name: petData.pet_name,
      know_birth: petData.know_birth,
      birth_date: petData.birth_date || '',
      birth_year: Math.floor(petData.birth_month / 12),
      birth_month: petData.birth_month % 12,
      breed: petData.breed,
      gender: petData.gender,
      neutered: petData.neutered,
      weight: petData.weight,
      profile_url: petData.profile_url,
      user_id: petData.user_id,
    });
  }, []);

  useEffect(() => {
    const isValid = validatePetProfile();
    setIsButtonDisabled(!isValid);
  }, [petProfileData]);

  const fetchBreeds = async (query) => {
    if (!query) return;
    const { data, error } = await supabase
      .from('breeds')
      .select('name')
      .ilike('name', `%${query}%`);

    if (error) {
      console.error("Error fetching breeds:", error);
    } else {
      setSuggestions(data.map(breed => breed.name));
      const matchedIndex = data.findIndex((breed) => breed.name === inputValue);
      if (matchedIndex !== -1) {
        setFocusIndex(matchedIndex);
      }
    }
  };

  useEffect(() => {
    if (!isTyping || inputValue.trim() === "") {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchBreeds(inputValue);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, isTyping]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsTyping(true); // Start typing
    setPetProfileData((prev) => ({
      ...prev,
      breed: newValue,
    }));
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowDown") {
      setFocusIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setFocusIndex((prev) => (prev === 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === "Enter" && focusIndex >= 0) {
      setPetProfileData((prev) => ({
        ...prev,
        breed: suggestions[focusIndex],
      }));
      setInputValue(suggestions[focusIndex]);
      setSuggestions([]);
      setFocusIndex(-1);
      setIsTyping(false); // Stop typing
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setFocusIndex(-1);
    }
  };

  // 프로필 삭제 처리
  async function handleDeletePetProfile() {
    try {
      await deletePetProfile(petId);
      setModalType('삭제');
      setIsSuccessModalOpen(true);
    } catch (error) {
      setModalType('삭제');
      setIsFailedModalOpen(true);
    }
  }

  // 프로필 수정 처리
  async function handleUpdatePetProfile() {
    try {
      await updatePetProfile(petId, petProfileData);
      setModalType('수정');
      setIsSuccessModalOpen(true);
    } catch (error) {
      setModalType('수정');
      setIsFailedModalOpen(true);
    }
  }

  return (
    <>
      {petProfileData ? (
        <div className={styles.container}>
          <DetailBar title="프로필 정보 수정하기" />
          <div className={styles.wrapper}>
            <div className={styles.form}>
              {/* 프로필 사진 */}
              <div className={styles.fieldContainer}>
                <div className={styles.label}>프로필 사진</div>
                <UploadProfileButton
                  petName={petProfileData.pet_name}
                  profileUrl={petProfileData.profile_url}
                  setData={(data) =>
                    setPetProfileData((prev) => ({ ...prev, profile_url: data }))
                  }
                />
              </div>
              {/* 이름 */}
              <div className={styles.fieldContainer}>
                <div className={styles.label}>이름</div>
                <Input
                  type="text"
                  value={petProfileData.pet_name}
                  placeholder="이름을 입력하세요"
                  setData={(event) =>
                    setPetProfileData((prev) => ({
                      ...prev,
                      pet_name: event.target.value,
                    }))
                  }
                />
                <div className={styles.errorMsg}>{errorMsg.name}</div>
              </div>
              {/* 나이 */}
              <div className={styles.fieldContainer}>
                <div className={styles.label}>나이</div>
                <RadioGroup
                  title={['생년월일', '개월수']}
                  value={[true, false]}
                  selected={petProfileData.know_birth}
                  setData={(data) =>
                    setPetProfileData((prev) => {
                      return { ...prev, know_birth: data };
                    })
                  }
                />
                {petProfileData.know_birth ? (
                  <>
                    <Input
                      type="date"
                      value={petProfileData.birth_date}
                      placeholder="생년월일을 입력하세요"
                      setData={(event) =>
                        setPetProfileData((prev) => {
                          return { ...prev, birth_date: event.target.value };
                        })
                      }
                    />
                    <div className={styles.errorMsg}>{errorMsg.date}</div>
                  </>
                ) : (
                  <>
                    <InputNumber
                      type="number"
                      value={petProfileData.birth_year}
                      numType="numeric"
                      adornment="년"
                      placeholder="0"
                      setData={(data) =>
                        setPetProfileData((prev) => {
                          return { ...prev, birth_year: data };
                        })
                      }
                    />
                    <InputNumber
                      type="number"
                      value={petProfileData.birth_month}
                      numType="numeric"
                      adornment="개월"
                      placeholder="0"
                      setData={(data) =>
                        setPetProfileData((prev) => {
                          return { ...prev, birth_month: data };
                        })
                      }
                    />
                    <div className={styles.errorMsg}>{errorMsg.month}</div>
                  </>
                )}
              </div>
              {/* 견종 */}
              <div className={styles.fieldContainer}>
      <div className={styles.label}>견종</div>
      <Input
        type="text"
        value={inputValue}
        placeholder="견종을 입력하세요"
        setData={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((breed, index) => (
            <li
              key={index}
              onClick={() => {
                setPetProfileData((prev) => ({
                  ...prev,
                  breed,
                }));
                setInputValue(breed);
                setSuggestions([]);
                setIsTyping(false); // Stop typing
              }}
              className={`${styles.suggestionItem} ${
                index === focusIndex ? styles.active : ''
              }`}
            >
              {breed}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.errorMsg}>{errorMsg.breed}</div>
    </div>
              {/* 성별 */}
              <div className={styles.fieldContainer}>
                <div className={styles.label}>성별</div>
                <RadioGroup
                  title={['남아', '여아']}
                  value={['male', 'female']}
                  selected={petProfileData.gender}
                  setData={(data) => {
                    setPetProfileData((prev) => {
                      return { ...prev, gender: data };
                    });
                  }}
                />
                <RadioButton
                  title="중성화 했어요."
                  value={petProfileData.neutered}
                  selected={petProfileData.neutered}
                  setData={() => {
                    setPetProfileData((prev) => {
                      return { ...prev, neutered: !prev.neutered };
                    });
                  }}
                />
              </div>
              {/* 6. 몸무게 */}
              <div className={`${styles.fieldContainer}`}>
                <div className={`${styles.label}`}>몸무게</div>
                <InputNumber
                  value={petProfileData.weight}
                  numType="decimal"
                  adornment="kg"
                  placeholder="0"
                  setData={(data) =>
                    setPetProfileData((prev) => {
                      return { ...prev, weight: data };
                    })
                  }
                />
                <div className={`${styles.errorMsg}`}>{errorMsg.weight}</div>
              </div>
              <div className={styles.buttonWrapper}>
                <ButtonMedium children={'삭제하기'} sub={'secondary'} onClick={() => setIsConfirmModalOpen(true)} />
                <ButtonMedium children={'정보 저장하기'} sub={'primary'} disabled={isButtonDisabled} onClick={() => handleUpdatePetProfile()} />
              </div>
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
            title={`프로필 ${modalType} 완료`}
            content={`반려견 프로필이 ${modalType}되었어요.`}
            isOpen={isSuccessModalOpen}
            setIsOpen={() => setIsSuccessModalOpen(!isSuccessModalOpen)}
            onYesClick={() => {
              window.location.href = '/pet';
            }}
          />
          <DefaultModal
            title={`프로필 ${modalType} 실패`}
            content={`반려견 프로필 ${modalType}에 실패했어요.\n다시 시도해주세요.`}
            isOpen={isFailedModalOpen}
            setIsOpen={() => setIsFailedModalOpen(!isFailedModalOpen)}
            onYesClick={() => setIsFailedModalOpen(!isFailedModalOpen)}
          />
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default EditPetProfilePage;
