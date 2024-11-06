import styles from './ProfileSurvey.module.css';
import Input from '../Common/Input/Input';
import RadioGroup from './RadioGroup';
import RadioButton from './RadioButton';
import UploadProfileButton from './UploadProfileButton';
import InputNumber from '../Common/Input/InputNumber';
import { useEffect, useState, useRef } from 'react';
import supabase from '../../services/supabaseClient';

function ProfileSurvey({ step, petProfileData, setPetProfileData, validateStep, setIsNextButtonEnabled }) {
  const [suggestions, setSuggestions] = useState([]); // 자동완성 견종 추천 목록
  const [inputValue, setInputValue] = useState(''); // 사용자가 입력하는 텍스트
  const [isAutoSearch, setIsAutoSearch] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const listRef = useRef(null);
  const focusRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false); // 사용자가 입력 중인지 추적

  useEffect(() => {
    const isStepValid = validateStep();
    setIsNextButtonEnabled(isStepValid);
  }, [step, petProfileData, setIsNextButtonEnabled]);

  const fetchBreeds = async (query) => {
    // Supabase에서 견종을 검색하여 자동완성 추천 목록으로 설정
    const { data, error } = await supabase.from('breeds').select('name').ilike('name', `%${query}%`);

    if (error) {
      console.error('견종을 가져오는 중 오류 발생:', error);
    } else {
      setSuggestions(data.map((breed) => breed.name));
    }
  };

  // 디바운싱을 사용해 Supabase에서 견종 목록을 가져오는 useEffect
  useEffect(() => {
    if (!isTyping || inputValue.trim() === '') {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchBreeds(inputValue);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, isTyping]);


  // 키보드 이벤트 처리
  const handleKeyUp = (e) => {
    const KeyEvent = {
      Enter: () => {
        if (focusIndex >= 0 && suggestions[focusIndex]) {
          setPetProfileData((prev) => ({
            ...prev,
            breed: suggestions[focusIndex],
          }));
          setIsAutoSearch(false);
          setFocusIndex(-1);
          setSuggestions([]);
          setIsTyping(false); // 입력 중지
        }
      },
      ArrowDown: () => {
        if (suggestions.length === 0) return;
        setFocusIndex((prevIndex) => (prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1));
        setIsAutoSearch(true);
      },
      ArrowUp: () => {
        if (suggestions.length === 0) return;
        setFocusIndex((prevIndex) => (prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1));
      },
      Escape: () => {
        setSuggestions([]);
        setIsAutoSearch(false);
        setFocusIndex(-1);
      },
    };

    if (KeyEvent[e.key]) KeyEvent[e.key]();
  };

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsTyping(true); // 입력 시작
    setPetProfileData((prev) => ({
      ...prev,
      breed: newValue,
    }));
  };

  return (
    <>
      {/* 1. 반려견 이름 입력 */}
      {step === 1 && (
        <Input
          type="text"
          value={petProfileData.pet_name}
          placeholder="반려견의 이름을 입력하세요"
          setData={(event) =>
            setPetProfileData((prev) => {
              return { ...prev, pet_name: event.target.value };
            })
          }
        />
      )}
      {/* 2. 반려견 생년월일 숙지 여부 */}
      {step === 2 && (
        <RadioGroup
          title={['생년월일을 알고 있어요.', '대략적인 나이만 알아요.']}
          value={[true, false]}
          selected={petProfileData.know_birth}
          setData={(data) =>
            setPetProfileData((prev) => {
              return { ...prev, know_birth: data };
            })
          }
          size="Large"
        />
      )}
      {/* 3. 반려견 나이 */}
      {step === 3 && (
        <>
          {petProfileData.know_birth ? (
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
          ) : (
            <div className={`${styles.inputWrapper}`}>
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
            </div>
          )}
        </>
      )}
      {/* 견종 입력 및 자동완성 */}
      {step === 4 && (
        <div className={`${styles.autoCompleteWrapper}`}>
          <Input
            type="text"
            value={isAutoSearch && focusIndex >= 0 ? suggestions[focusIndex] : petProfileData.breed}
            placeholder="견종을 입력해주세요"
            setData={handleInputChange}
            onKeyUp={handleKeyUp}
          />
          {suggestions.length > 0 && (
            <ul className={`${styles.suggestionsList} drop-shadow-default`} ref={listRef}>
              {suggestions.map((breed, index) => (
                <li
                  key={index}
                  ref={index === focusIndex ? focusRef : null}
                  onClick={() => {
                    setPetProfileData((prev) => ({
                      ...prev,
                      breed,
                    }));
                    setInputValue(breed);
                    setSuggestions([]);
                    setFocusIndex(-1);
                    setIsTyping(false); // 입력 중지
                  }}
                  className={`${styles.suggestionItem} ${index === focusIndex ? styles.active : ''}`}
                >
                  {breed}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* 다른 항목들 */}
      {/* 5. 반려견 성별 */}
      {step === 5 && (
        <div className={`${styles.genderRadioWrapper}`}>
          <RadioGroup
            title={['남아', '여아']}
            value={['male', 'female']}
            selected={petProfileData.gender}
            setData={(data) => {
              setPetProfileData((prev) => {
                return { ...prev, gender: data };
              });
            }}
            size="Medium"
          />
          <RadioButton
            title="중성화 했어요."
            value={petProfileData.neutered}
            selected={petProfileData.neutered}
            setData={() =>
              setPetProfileData((prev) => {
                return { ...prev, neutered: !prev.neutered };
              })
            }
          />
        </div>
      )}
      {/* 6. 몸무게 입력 */}
      {step === 6 && (
        <InputNumber
          type="number"
          value={petProfileData.weight}
          numType="decimal"
          adornment="Kg"
          placeholder="0"
          setData={(data) =>
            setPetProfileData((prev) => {
              return { ...prev, weight: data };
            })
          }
        />
      )}
      {/* 7. 프로필 사진 등록 */}
      {step === 7 && (
        <UploadProfileButton
          petName={petProfileData.pet_name}
          profileUrl={petProfileData.profile_img_url}
          setData={(data) =>
            setPetProfileData((prev) => {
              return { ...prev, profile_img_url: data };
            })
          }
        />
      )}
    </>
  );
}

export default ProfileSurvey;
