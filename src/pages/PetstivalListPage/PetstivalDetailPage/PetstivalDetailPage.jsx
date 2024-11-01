import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Slider from "react-slick";
import DetailBar from '../../../stories/DetailBar';
import Navbar from '../../../components/Navbar/Navbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import supabase from '../../../services/supabaseClient';
import noImage from '../../../assets/images/no-image.jpg';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const PageContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.section`
  margin: 24px;
  padding-bottom: 80px;
  flex-grow: 1;
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
  margin-top: 24px;
`;

const RecommendationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const RecommendationItem = styled(Paper)`
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(51, 51, 51, 0.08);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

const RecommendationImage = styled.img`
  width: 150 px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #f0f0f0;
  margin-right: 16px;
  margin-left: 125px;
`;

export default function PetstivalDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [festival, setFestival] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchFestival = async () => {
      try {
        const { data, error } = await supabase.from('festivals').select('*, category_id, homepage_url').eq('id', id).single();
        if (error) throw error;
        if (!data) throw new Error("Festival data not found.");
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
      } catch (error) {
        console.error('Error fetching festival or product data:', error);
        setError('축제 데이터를 가져오는 중 오류 발생');
      } finally {
        setLoading(false);
      }
    };
    fetchFestival();
  }, [id]);

  const getStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > today) return { label: '진행예정', color: '#FF866B', borderColor: '#FF866B' };
    else if (start <= today && end >= today) return { label: '진행중', color: '#FFFFFF', borderColor: '#1976d2', backgroundColor: '#1976d2' };
    else return { label: '진행완료', color: '#838283', borderColor: '#838283' };
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p style={{ color: 'red' }}>오류: {error}</p>;

  const { title, startdate, enddate, location, tel, firstimage, mapx, mapy, homepage_url } = festival;
  const { label, color, borderColor, backgroundColor } = getStatus(startdate, enddate);

  const mapContainerStyle = {
    width: '100%',
    height: '250px',
  };

  const center = {
    lat: parseFloat(mapy),
    lng: parseFloat(mapx),
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // 화살표 제거
    centerMode: false, // 양옆 회색 제거
  };

  return (
    <PageContainer>
      <DetailBar title= "펫스티벌 상세보기" />
      <Wrapper>
        <Paper
          sx={{
            p: 2,
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
          }}
        >
          {/* 이미지 클릭 시 홈페이지 이동 */}
          <Image src={firstimage || noImage} alt={title || 'Festival Image'} onClick={() => homepage_url && window.open(homepage_url, '_blank')} />
          <Typography variant="h5" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            {title}
            <Chip 
              label={label} 
              sx={{ 
                ml: 2, 
                color, 
                borderColor, 
                backgroundColor: backgroundColor || 'transparent',
                borderWidth: '1px',
                borderStyle: 'solid',
                fontWeight: 'bold',
              }} 
              variant={backgroundColor ? 'filled' : 'outlined'} 
            />
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{startdate} - {enddate}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>위치: {location}</Typography>
          <MapContainer>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
              <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </MapContainer>
          <Typography variant="body1" sx={{ mt: 2 }}>
            전화번호: <a href={`tel:${tel}`}>{tel}</a>
          </Typography>
          {homepage_url && (
            <Typography variant="body1" sx={{ mt: 1 }}>
              홈페이지: <a href={homepage_url} target="_blank" rel="noopener noreferrer">{homepage_url}</a>
            </Typography>
          )}
        </Paper>

        {/* 추천 상품 영역 */}
        <RecommendationsContainer>
          <RecommendationsHeader>
            <Typography variant="h6">추천 상품</Typography>
            <Typography
              variant="body2"
              color="primary"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/products/petstival')}
            >
              추천 상품 더 보기 &gt;
            </Typography>
          </RecommendationsHeader>
          <Slider {...sliderSettings}>
            {recommendations.map((item) => (
              <RecommendationItem key={item.product_id} onClick={() => navigate(`/products/${item.product_id}`)}>
                <RecommendationImage src={item.image_url_1 || noImage} alt={item.product_name} />
                <Typography variant="subtitle1" sx={{ mt: 1 }}>{item.product_name}</Typography>
                <Typography variant="body2" color="textSecondary">{item.contents}</Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mt: 1, 
                    color: '#FF6B6B', 
                    fontWeight: 'bold', 
                    fontSize: '1.2rem' 
                  }}
                >
                  {item.price.toLocaleString()} 원
                </Typography>
              </RecommendationItem>
            ))}
          </Slider>
        </RecommendationsContainer>
      </Wrapper>
      <Navbar selectedMenu="Home" />
    </PageContainer>
  );
}