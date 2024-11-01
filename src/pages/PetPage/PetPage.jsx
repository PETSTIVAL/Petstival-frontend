import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './PetPage.module.css';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import PetProfileCard from '../../components/Pet/PetProfileCard';
import PlusIcon from '../../assets/icons/plus.svg?react';
import CircularProgress from '@mui/material/CircularProgress';
import fetchPetProfile from '../../services/fetchPetProfile';
import PetProfileGray from '../../assets/icons/profile-pet-gray.svg?react';
import NoPetsCard from '../../components/Pet/NoPetsCard';
import {useNavigate} from 'react-router-dom';
function PetPage() {
  const [petsData, setPetsData] = useState(null);
  const userName = useAuthStore((state) => state.user?.name);


    const navigate = useNavigate();
    useEffect(() => {
      if (!userName) {
        navigate('/login'); // user가 없는 경우 login 페이지로 리디렉션
      }
    }, [userName, navigate]); // user 또는 navigate가 변경될 때만 실행
  
    if (!userName) return null; // user가 없을 때는 null을 반환하여 컴포넌트 렌더링을 막음

  // 프로필 추가하기 버튼을 클릭할 경우 반려견 프로필 설문 페이지로 이동
  function handleClickAddProfile() {
    window.location.href = '/survey';
  }

  // fetchPetProfile 함수로 반려견 정보를 불러옴
  async function loadPetsData() {
    try {
      const data = await fetchPetProfile();
      setPetsData(data);
    } catch (error) {
      console.log(error);
    }
  }

  // 페이지 진입 시 반려견 프로필 정보를 DB로부터 불러옴
  useEffect(() => {
    loadPetsData();
  }, []);

  return (
    <div className={`${styles.container}`}>
      <Header />
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.headerWrapper}`}>
          <div className={`${styles.title}`}>{`${userName}님의 반려견`}</div>
          <div className={`${styles.addProfileButton}`} onClick={handleClickAddProfile}>
            <PlusIcon />
            프로필 추가하기
          </div>
        </div>
        <div className={`${styles.cardWrapper}`}>
          {petsData === null ? (
            <CircularProgress />
          ) : petsData.length === 0 ? (
            <NoPetsCard />
          ) : (
            petsData.map((pet, index) => <PetProfileCard key={index} petData={pet} />)
          )}
        </div>
      </div>
      <Navbar selectedMenu="Pet" />
    </div>
  );
}

export default PetPage;
