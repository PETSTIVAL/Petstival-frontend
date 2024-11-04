import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DetailBar from '../../stories/DetailBar';
import Navbar from '../../components/Navbar/Navbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import supabase from '../../services/supabaseClient';
import noImage from '../../assets/images/no-image.jpg';
import { LinearProgress } from '@mui/material';
import formatDate from '../../utils/formatDate';
import ButtonSmall from '../../components/Common/Button/ButtonSmall';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
`;

const ImageListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 32px 20px;
  padding-bottom: 180px;
  overflow-y: auto;
`;

export default function PetstivalListPage() {
  const [data, setData] = useState([]);
  const [participationStatus, setParticipationStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인된 사용자 ID 가져오기
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id); // 실제 user_id 설정
      } else {
        console.error('User is not logged in');
        navigate('/login'); // 로그인 페이지로 리디렉션
      }
    };
    fetchUser();
  }, []);

  // 펫스티벌 데이터 가져오기 및 날짜별 정렬
  const getData = async () => {
    try {
      const { data, error } = await supabase.from('festivals').select();
      if (error) throw error;

      const sortedData = data.sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
      setData(sortedData);

      // 참여 상태 확인
      const status = {};
      for (const festival of data) {
        const { data: participationData } = await supabase
          .from('user_festival')
          .select('verified')
          .eq('user_id', userId)
          .eq('fetstivals_id', festival.id)
          .maybeSingle();

        status[festival.id] = participationData ? { isParticipating: true, verified: participationData.verified } : { isParticipating: false, verified: false };
      }
      setParticipationStatus(status);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getData();
    }
  }, [userId]);

  const today = new Date();

  const getStatus = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > today) {
      return { label: '진행예정', color: '#FF866B' };
    } else if (start <= today && end >= today) {
      return { label: '진행중', color: 'primary' };
    } else {
      return { label: '진행완료', color: '#838283' };
    }
  };

  // 페스티벌 참여 및 취소 함수
  const handleParticipation = async (festivalId) => {
    const currentStatus = participationStatus[festivalId] || { isParticipating: false, verified: false };

    try {
      if (currentStatus.isParticipating) {
        // 참여 취소
        const { error } = await supabase.from('user_festival').delete().eq('user_id', userId).eq('fetstivals_id', festivalId);

        if (error) throw error;
        setParticipationStatus((prev) => ({
          ...prev,
          [festivalId]: { isParticipating: false, verified: false },
        }));
      } else {
        // 참여 신청
        const { error } = await supabase.from('user_festival').insert({
          user_id: userId,
          fetstivals_id: festivalId,
          verified: false,
          verified_at: new Date().toISOString(),
        });

        if (error) throw error;
        setParticipationStatus((prev) => ({
          ...prev,
          [festivalId]: { isParticipating: true, verified: false },
        }));
      }
    } catch (error) {
      console.error('참여 신청 중 오류 발생:', error);
    }
  };

  return (
    <Container>
      <DetailBar title="펫스티벌 모아보기" />
      <Wrapper>
        {error && <p style={{ color: 'red' }}>오류: {error}</p>}
        {loading ? (
          <LinearProgress /> // 로딩 중일 때 Progress Bar 표시
        ) : (
          <ImageListWrapper>
            {data.map((item) => {
              const { label, color } = getStatus(item.startdate, item.enddate);
              const imageSrc = item.firstimage || noImage;
              const participation = participationStatus[item.id] || {};
              const buttonLabel = participation.verified ? '참여 완료' : participation.isParticipating ? '신청 취소' : '참여 신청';

              return (
                <Paper
                  key={item.id}
                  sx={{
                    p: 2,
                    flexGrow: 1,
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
                  }}
                >
                  <ImageListItem onClick={() => navigate(`/petstival/${item.id}`)} style={{ cursor: 'pointer' }}>
                    <img
                      srcSet={`${imageSrc}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${imageSrc}?w=248&fit=crop&auto=format`}
                      alt={item.title || 'No image available'}
                      style={{ borderRadius: '8px', border: '1px solid var(--gray-20)', marginBottom: '8px' }}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                          <h3 style={{ marginRight: '8px' }}>{item.title}</h3>
                          <Chip
                            label={label}
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              lineHeight: 'normal',
                              paddingTop: '1px',
                              maxWidth: '68px',
                              height: '24px',
                              fontSize: '11px',
                              fontWeight: 700,
                              backgroundColor: color === '#FF866B' ? '#fff0ec' : 'var(--gray-10)',
                              color: color === '#FF866B' ? '#FF866B' : 'var(--gray-60)',
                              borderWidth: '2px',
                              borderColor: color === '#FF866B' ? '#FF866B' : 'var(--gray-60)',
                            }}
                            variant="outlined"
                          />
                        </div>
                      }
                      subtitle={
                        <div style={{ fontSize: '14px', color: 'var(--gray-60)', margin: '8px 0 8px 0', fontFamily: 'Pretendard' }}>
                          {formatDate(item.startdate)} ~ {formatDate(item.enddate)}
                        </div>
                      }
                      position="below"
                    />
                  </ImageListItem>
                  {(label !== '진행완료' || participation.verified) && (
                    <ButtonSmall children={buttonLabel} onClick={() => handleParticipation(item.id)} sub="primary" disabled={participation.verified} />
                  )}
                </Paper>
              );
            })}
          </ImageListWrapper>
        )}
      </Wrapper>
      <Navbar selectedMenu="Home" />
    </Container>
  );
}
