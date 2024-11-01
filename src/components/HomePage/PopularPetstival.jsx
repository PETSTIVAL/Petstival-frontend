import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import supabase from '../../services/supabaseClient';

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Detail = styled.div`
  color: var(--gray-gray-60, #838283);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  cursor: pointer;
`;

export default function PopularPetstival() {
  const [topData, setTopData] = useState([]);
  const navigate = useNavigate();

  // 최근 인기있는 펫스티벌 데이터 가져오기 및 날짜별 정렬
  const getData = async () => {
    try {
      const { data, error } = await supabase.from('festivals').select();
      if (error) throw error;

      const sortedData = data.sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
      const topData = sortedData.slice(0, 3);
      setTopData(topData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Info>
        <h3>최근 인기 있는 펫스티벌</h3>
        <Detail onClick={() => navigate('/petstival')}>자세히 보기 &gt;</Detail>
      </Info>
      <Carousel>
        {topData.map((item) => {
          const imageSrc = item.firstimage || noImage;

          return (
            <Paper
              key={item.id}
              sx={{
                p: 2,
                marginBottom: '15px',
                flexGrow: 1,
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
              }}
            >
              <div onClick={() => navigate(`/petstival/${item.id}`)} style={{ cursor: 'pointer' }}>
                <img src={imageSrc} alt={item.title || 'No image available'} loading="lazy" style={{ width: '420px', height: '150px', objectFit: 'cover' }} />
                <Typography variant="h6" sx={{ marginRight: '8px' }}>
                  {item.title}
                </Typography>
                <Typography sx={{ marginTop: '4px' }}>
                  {item.startdate} ~ {item.enddate}
                </Typography>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </>
  );
}
