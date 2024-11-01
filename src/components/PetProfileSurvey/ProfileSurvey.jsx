import styles from './ProfileSurvey.module.css';
import Input from '../Common/Input/Input';
import RadioGroup from './RadioGroup';
import RadioButton from './RadioButton';
import UploadProfileButton from './UploadProfileButton';
import InputNumber from '../Common/Input/InputNumber';
import { useEffect } from 'react';

function ProfileSurvey({ step, petProfileData, setPetProfileData, validateStep, setIsNextButtonEnabled }) {
  // step이 변경되거나 petProfileData가 업데이트될 때마다 유효성 검사
  useEffect(() => {
    const isStepValid = validateStep();
    setIsNextButtonEnabled(isStepValid); // 부모 컴포넌트에 유효성 검사 결과 전달
  }, [step, petProfileData, setIsNextButtonEnabled]);

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
        ></Input>
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
        ></RadioGroup>
      )}
      {/* 3. 반려견 나이 */}
      {step === 3 && (
        <>
          {/* 3-1. 생년월일을 정확히 알고 있는 경우 */}
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
            ></Input>
          ) : (
            <div className={`${styles.inputWrapper}`}>
              {/* 3-2. 대략적인 개월수만 알고 있는 경우 */}
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
      {/* 4. 반려견 견종 */}
      {step === 4 && (
        <Input
          type="text"
          value={petProfileData.breed}
          placeholder="견종을 입력해주세요"
          setData={(event) =>
            setPetProfileData((prev) => {
              return { ...prev, breed: event.target.value };
            })
          }
        />
      )}
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
