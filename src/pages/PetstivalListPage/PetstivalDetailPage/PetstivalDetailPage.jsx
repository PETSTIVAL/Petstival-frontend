import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import DetailBar from '../../../stories/DetailBar';
import Navbar from '../../../components/Navbar/Navbar';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import supabase from '../../../services/supabaseClient';
import noImage from '../../../assets/images/no-image.jpg';
import { LinearProgress } from '@mui/material';
import ShowMoreButton from '../../../components/Common/Button/ShowMoreButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import formatDate from '../../../utils/formatDate';
import YesNoModal from '../../../components/Common/Modal/YesNoModal';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 8px;
  margin-top: 16px;
`;

const RecommendationsContainer = styled.div`
  margin-top: 48px;
  overflow: visible;
`;

const RecommendationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  margin-bottom: 8px;
`;

const RecommendationItem = styled.div`
  width: calc(100% - 48px);
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 24px;
  padding: 20px;
  background-color: var(--white);
  border-radius: 8px;
  gap: 20px;
  cursor: pointer;
  box-shadow: 0px 0px 8px rgba(51, 51, 51, 0.08);
`;

const RecommendationImage = styled.img`
  width: 28%;
  height: 28%;
  max-width: 100px;
  border-radius: 8px;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 172px;
  max-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleText = styled.div`
  font-size: 16px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ContentText = styled.div`
  height: 40px;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--gray-60);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
`;

const PriceText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--secondary-orange-default);
`;

const Button = styled.button`
  width: 100%;
  height: 64px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  background-color: var(--primary-default);
  color: var(--white);

  &:active {
    background-color: var(--primary-darken);
  }

  &:disabled {
    background-color: var(--gray-20);
    color: var(--gray-60);
  }
`;

export default function PetstivalDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [festival, setFestival] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isParticipating, setIsParticipating] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // getStatus 함수 정의
  const getStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > today) return { label: '진행예정', color: '#FF866B', borderColor: '#FF866B', backgroundColor: '#ffece8' };
    else if (start <= today && end >= today) return { label: '진행중', color: '#2B91FF', borderColor: '#2B91FF', backgroundColor: '#EEF6FF' };
    else return { label: '진행완료', color: '#838283', borderColor: '#838283', backgroundColor: '#F5F5F5' };
  };

  useEffect(() => {
    const fetchFestival = async () => {
      try {
        const { data, error } = await supabase.from('festivals').select('*, category_id, homepage_url').eq('id', id).single();
        if (error) throw error;
        if (!data) throw new Error('Festival data not found.');
        setFestival(data);

        if (data?.category_id) {
          const { data: products, error: productsError } = await supabase
            .from('product')
            .select('product_id, product_name, price, image_url_1, contents')
            .eq('category_id', data.category_id)
            .limit(3);

          if (productsError) throw productsError;
          setRecommendations(products);
        }

        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          setUserId(userData.user.id);

          const { data: participationData, error: participationError } = await supabase
            .from('user_festival')
            .select('verified')
            .eq('user_id', userData.user.id)
            .eq('fetstivals_id', parseInt(id))
            .maybeSingle();

          if (participationError) {
            console.error('Error checking participation status:', participationError);
          } else if (participationData) {
            setIsParticipating(true);
            setIsVerified(participationData.verified);
          }
        }
      } catch (fetchError) {
        console.error('Error fetching festival or product data:', fetchError);
        setError('축제 데이터를 가져오는 중 오류 발생');
      } finally {
        setLoading(false);
      }
    };

    fetchFestival();
  }, [id]);

  const handleParticipation = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
      return;
    }
    setUserId(user.id);
    setIsConfirmationModalOpen(true);
  };

  const confirmParticipationChange = async () => {
    try {
      if (isParticipating) {
        const { error } = await supabase
          .from('user_festival')
          .delete()
          .eq('user_id', userId)
          .eq('fetstivals_id', parseInt(id));
        if (error) throw error;
        setIsParticipating(false);
        setModalMessage('신청이 취소되었습니다. 페스티벌 페이지로 이동하여 확인해보시겠어요?');
      } else {
        const { error } = await supabase.from('user_festival').insert({
          user_id: userId,
          fetstivals_id: parseInt(id),
          verified: false,
          verified_at: new Date().toISOString(),
        });
        if (error) throw error;
        setIsParticipating(true);
        setModalMessage('참여 신청이 완료되었습니다. 페스티벌 페이지로 이동하여 확인해보시겠어요?');
      }
      setIsResultModalOpen(true);
    } catch (error) {
      console.error('참여 상태 변경 중 오류 발생:', error);
    }
    setIsConfirmationModalOpen(false);
  };

  const handleResultModalConfirm = () => {
    localStorage.setItem('activeTab', '펫스티벌');
    navigate('/pet');
  };

  const handleResultModalClose = () => {
    setIsResultModalOpen(false);
  };

  if (loading) return <LinearProgress />;
  if (error) return <p style={{ color: 'red' }}>오류: {error}</p>;

  const { title, startdate, enddate, location, tel, firstimage, mapx, mapy, homepage_url } = festival;
  const { label, color, borderColor, backgroundColor } = getStatus(startdate, enddate);

  const mapContainerStyle = { width: '100%', height: '250px' };
  const center = { lat: parseFloat(mapy), lng: parseFloat(mapx) };
  const sliderSettings = { dots: true, infinite: false, speed: 500, slidesToShow: 1, slidesToScroll: 1, arrows: false, centerMode: false };

  return (
    <PageContainer>
      <DetailBar title="펫스티벌 상세보기" />
      <Wrapper>
        <Image
          src={firstimage || noImage}
          alt={title || 'Festival Image'}
          style={{ width: 'calc(100% - 48px)', border: '1px solid var(--gray-20)', margin: '24px' }}
          onClick={() => homepage_url && window.open(homepage_url, '_blank')}
        />
        <Paper
          sx={{
            p: 2,
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
            margin: '0 24px',
            padding: '26px 24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <h1>{title}</h1>
            <Chip
              label={label}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                lineHeight: 'normal',
                paddingTop: '2px',
                maxWidth: '68px',
                height: '24px',
                fontSize: '11px',
                fontWeight: 700,
                color,
                borderColor,
                backgroundColor: backgroundColor || 'transparent',
                borderWidth: '2px',
                borderStyle: 'solid',
              }}
              variant={backgroundColor ? 'filled' : 'outlined'}
            />
          </div>
          <div style={{ color: 'var(--gray-60)', fontSize: '16px' }}>
            {formatDate(startdate)} - {formatDate(enddate)}
          </div>
          <MapContainer>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
              <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </MapContainer>
          <div style={{ marginTop: '16px', fontSize: '16px', color: 'var(--gray-100)', fontWeight: 500 }}>{festival.addr1}</div>
          <div style={{ marginTop: '10px', fontSize: '16px', color: 'var(--gray-60)' }}>
            전화번호
            <a style={{ marginLeft: '8px', color: '#0E8EFF' }} href={`tel:${tel}`}>
              {tel}
            </a>
          </div>
          <div style={{ margin: '4px 0 24px 0', fontSize: '16px', color: 'var(--gray-60)' }}>
            홈페이지
            <a style={{ marginLeft: '8px', color: '#0E8EFF' }} title="바로가기" href={homepage_url} target="_blank" rel="noopener noreferrer">
              {homepage_url ? '바로가기' : '제공된 링크가 없어요.'}
            </a>
          </div>
          {label !== '진행완료' && (
            <Button onClick={handleParticipation} disabled={isVerified}>
              {isVerified ? '참여 완료' : isParticipating ? '신청 취소' : '참여 신청'}
            </Button>
          )}
        </Paper>

        <RecommendationsContainer>
          <RecommendationsHeader>
            <h1>추천 상품</h1>
            <ShowMoreButton title="추천 상품 더보기" onClick={() => navigate('/products/petstival')} />
          </RecommendationsHeader>
          <Slider {...sliderSettings}>
            {recommendations.map((item) => (
              <RecommendationItem key={item.product_id} onClick={() => navigate(`/products/${item.product_id}`)}>
                <RecommendationImage src={item.image_url_1 || noImage} alt={item.product_name} />
                <ContentWrapper>
                  <TitleText>{item.product_name}</TitleText>
                  <ContentText>{item.contents}</ContentText>
                  <PriceText>{item.price.toLocaleString()} 원</PriceText>
                </ContentWrapper>
              </RecommendationItem>
            ))}
          </Slider>
        </RecommendationsContainer>
      </Wrapper>
      <Navbar selectedMenu="Home" />

      <YesNoModal
        title={isParticipating ? '신청을 취소하시겠습니까?' : '정말 신청하시겠습니까?'}
        content={isParticipating ? '신청을 취소하시겠습니까?' : '정말 신청하시겠습니까?'}
        isOpen={isConfirmationModalOpen}
        setIsOpen={setIsConfirmationModalOpen}
        onYesClick={confirmParticipationChange}
      />

      <YesNoModal
        title="알림"
        content={modalMessage}
        isOpen={isResultModalOpen}
        setIsOpen={setIsResultModalOpen}
        onYesClick={handleResultModalConfirm}
        onNoClick={handleResultModalClose}
      />
    </PageContainer>
  );
}