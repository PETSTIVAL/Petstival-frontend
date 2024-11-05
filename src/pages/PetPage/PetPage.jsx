import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './PetPage.module.css';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import PetProfileCard from '../../components/Pet/PetProfileCard';
import PlusIcon from '../../assets/icons/plus.svg?react';
import CircularProgress from '@mui/material/CircularProgress';
import fetchPetProfile from '../../services/fetchPetProfile';
import supabase from '../../services/supabaseClient';
import PetProfileGray from '../../assets/icons/profile-pet-gray.svg?react';
import NoPetsCard from '../../components/Pet/NoPetsCard';
import { useNavigate } from 'react-router-dom';
import TabBar from '../../components/Pet/TabBar';
import PetstivalItem from '../../components/Pet/Petstival';

function PetPage() {
  const [petsData, setPetsData] = useState(null);
  const [userFestivals, setUserFestivals] = useState([]); // 참여한 펫스티벌 상태 추가
  const userName = useAuthStore((state) => state.user?.name);
  const userId = useAuthStore((state) => state.user?.id);
  const [activeTab, setActiveTab] = useState('반려견'); // 초기 탭을 '반려견'으로 설정

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

  // 탭 변경 핸들러
  function handleTabChange(tab) {
    setActiveTab(tab);
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

  // 참여한 펫스티벌 정보를 불러오는 함수
  async function loadUserFestivals(userId) {
    try {
      const { data, error } = await supabase.from('user_festival').select('*, festivals(*)').eq('user_id', userId);

      // if (error) throw error;
      // setUserFestivals(data.map((item) => item.festivals));
      if (error) throw error;
      setUserFestivals(
        data.map((item) => ({
          id: item.festivals.id,
          title: item.festivals.title,
          startdate: item.festivals.startdate,
          isVerified: item.verified,
        }))
      );
    } catch (error) {
      console.error('오류 발생:', error);
    }
  }

  // 페이지 첫 로드 시에만 반려견 데이터를 불러옴
  useEffect(() => {
    loadPetsData();
  }, []);

  // 탭 변경 시 데이터를 불러옴
  useEffect(() => {
    if (activeTab === '반려견') {
      loadPetsData();
    } else if (activeTab === '펫스티벌' && userId) {
      loadUserFestivals(userId);
    }
  }, [activeTab, userId]);

  // 인증 버튼 클릭 핸들러
  const handleVerify = (festivalId) => {
    // 인증 로직을 구현하면 수정할 부분
    console.log(`페스티벌 ${festivalId} 인증 요청`);
  };

  return (
    <div className={`${styles.container}`}>
      <Header />
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className={`${styles.wrapper}`}>
        {activeTab === '반려견' && (
          <>
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
          </>
        )}
        {activeTab === '펫스티벌' && (
          <div className={`${styles.cardWrapper}`}>
            <div className={`${styles.title}`}>내가 참여한 펫스티벌</div>
            {userFestivals.length === 0 ? (
              <p>참여한 펫스티벌이 없습니다.</p>
            ) : (
              userFestivals.map((festival) => (
                <PetstivalItem
                  key={festival.id}
                  id={festival.id}
                  title={festival.title}
                  startdate={festival.startdate}
                  isVerified={festival.isVerified}
                  onVerify={() => handleVerify(festival.id)}
                />
              ))
            )}
          </div>
        )}
      </div>
      <Navbar selectedMenu="Pet" />
    </div>
  );
}

export default PetPage;
