import { useState, useEffect } from 'react';
import useDeliveryStore from '../../stores/useDeliveryStore';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Plus from '../../assets/icons/plus_info.svg?react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styled from 'styled-components';
import ButtonSmall from '../../components/Common/Button/ButtonSmall';

const Container = styled.div`
  width: 100%;
  padding: 32px;
  background-color: #fff;
  margin: 24px 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Button = styled.button`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  font-size: 16px;
  font-weight: ${({ $sub }) => ($sub === 'secondary' ? '500' : '700')};
  background-color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--primary-bright)' : 'var(--primary-default)')};
  color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--gray-100)' : 'var(--white)')};
  border: ${({ $sub }) => ($sub === 'secondary' ? '1px solid var(--primary-light)' : '')};
  &:active {
    background-color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--primary-light)' : 'var(--primary-darken)')};
  }

  &:disabled {
    background-color: var(--gray-20);
    color: var(--gray-60);
  }
`;

export default function DeliveryInfo() {
  const [save, setSave] = useState(true);
  const { name, number, address, detailAddress, setName, setNumber, setAddress, setDetailAddress } = useDeliveryStore();
  const [errors, setErrors] = useState({
    name: '',
    number: '',
    detailAddress: '',
  });

  const isFormComplete = name && number && address && detailAddress;

  // 전화번호 형식 검증을 포함한 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {
      name: name ? '' : '이름을 입력해주세요.',
      detailAddress: detailAddress ? '' : '세부주소를 입력해주세요.',
      number: /^010\d{7,8}$/.test(number) ? '' : '전화번호는 010으로 시작하는 10~11자리 숫자로 입력해주세요.',
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((msg) => msg === '');
  };

  const handleInfo = () => {
    if (validateForm()) {
      setSave(false); // 폼을 닫고 배송지 정보만 표시
    }
  };

  const handleEditInfo = () => {
    setSave(true); // 폼을 다시 열기
  };

  const handleAccordionToggle = () => {
    setSave((prevSave) => !prevSave);
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ` (${extraAddr})`;
          }
        }

        setAddress(`${addr} ${extraAddr}`);
      },
    }).open();
  };

  // 전화번호 입력 핸들러
  const handleNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // 숫자 이외의 문자 제거
    setNumber(input.slice(0, 11)); // 최대 11자리로 제한
  };

  // 초기 로딩 시 번호가 없을 때 기본값을 '010'으로 설정
  useEffect(() => {
    if (!number) {
      setNumber('');
    }
  }, [number, setNumber]);

  return (
    <Container className="drop-shadow-default">
      <h2 style={{ marginBottom: '24px' }}>배송지 정보</h2>
      {save ? (
        <Wrapper>
          <TextField
            sx={{
              width: '100%',
              height: '56px',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f5f5f5', // 원하는 배경색 설정
                '& fieldset': {
                  border: 'none', // outline 제거
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputLabel-root': {
                position: 'relative', // label이 위로 올라가지 않도록 설정
                transform: 'none',
                '&.Mui-focused': {
                  transform: 'none',
                },
              },
            }}
            InputProps={{
              sx: {
                fontFamily: 'Pretendard', // 내부 input 요소에 Pretendard 폰트 적용
              },
            }}
            fullWidth
            required
            id="outlined-required"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            sx={{
              width: '100%',
              height: '56px',
              borderRadius: '8px',
              fontFamily: 'Pretendard',
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f5f5f5', // 원하는 배경색 설정
                '& fieldset': {
                  border: 'none', // outline 제거
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputLabel-root': {
                position: 'relative', // label이 위로 올라가지 않도록 설정
                transform: 'none',
                '&.Mui-focused': {
                  transform: 'none',
                },
              },
            }}
            InputProps={{
              sx: {
                fontFamily: 'Pretendard', // 내부 input 요소에 Pretendard 폰트 적용
              },
            }}
            fullWidth
            required
            id="outlined-required"
            value={number}
            onChange={handleNumberChange} // 숫자만 입력 가능
            // error={Boolean(errors.number)}
            // helperText={errors.number}
            placeholder="휴대폰 번호를 입력해주세요"
          />
          {errors.number && <div style={{ fontSize: '12px', fontWeight: '500', color: '#EA4646', margin: '0 0 4px 4px' }}>{errors.number}</div>}
          <Grid container spacing={1} alignItems="center" sx={{ minHeight: '56px' }}>
            <Grid item xs={9}>
              <TextField
                sx={{
                  width: '100%',
                  height: '56px',
                  borderRadius: '8px',
                  fontFamily: 'Pretendard',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f5f5f5', // 원하는 배경색 설정
                    '& fieldset': {
                      border: 'none', // outline 제거
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    position: 'relative', // label이 위로 올라가지 않도록 설정
                    transform: 'none',
                    '&.Mui-focused': {
                      transform: 'none',
                    },
                  },
                }}
                fullWidth
                required
                id="outlined-read-only-input"
                placeholder="도로명 주소를 입력해주세요"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                  sx: {
                    fontFamily: 'Pretendard', // 내부 input 요소에 Pretendard 폰트 적용
                  },
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={3} display="flex" justifyContent="center" alignItems="center">
              <ButtonSmall children="주소 검색" onClick={handleAddressSearch} />
            </Grid>
          </Grid>
          <TextField
            sx={{
              width: '100%',
              height: '56px',
              borderRadius: '8px',
              marginBottom: '24px',
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f5f5f5', // 원하는 배경색 설정
                '& fieldset': {
                  border: 'none', // outline 제거
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputLabel-root': {
                position: 'relative', // label이 위로 올라가지 않도록 설정
                transform: 'none',
                '&.Mui-focused': {
                  transform: 'none',
                },
              },
            }}
            InputProps={{
              sx: {
                fontFamily: 'Pretendard', // 내부 input 요소에 Pretendard 폰트 적용
              },
            }}
            fullWidth
            required
            id="outlined-required"
            placeholder="세부 주소를 입력해주세요"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            error={Boolean(errors.detailAddress)}
            helperText={errors.detailAddress}
          />

          <Button
            onClick={handleInfo}
            disabled={!isFormComplete}
            variant="contained"
            size="large"
            sx={{ width: '100%', borderRadius: '8px', backgroundColor: 'var(--primary-default)' }}
          >
            확인
          </Button>
        </Wrapper>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>{name}</div>

          <div style={{ fontSize: '14px', fontWeight: '400', color: 'var(--gray-60)' }}>{number}</div>
          <div style={{ fontSize: '14px', fontWeight: '400', color: 'var(--gray-60)', marginBottom: '24px' }}>
            {address} {detailAddress}
          </div>

          <Button onClick={handleEditInfo} $sub={'secondary'}>
            <Plus />
            배송지 변경하기
          </Button>
        </div>
      )}
    </Container>
  );
}
