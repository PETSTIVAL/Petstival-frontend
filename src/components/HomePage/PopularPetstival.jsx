import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';
import Paper from '@mui/material/Paper';
import supabase from '../../services/supabaseClient';
import { LinearProgress } from '@mui/material';
import ShowMoreButton from '../Common/Button/ShowMoreButton';
import formatDate from '../../utils/formatDate';

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 28px 4px 8px 4px;
`;

export default function PopularPetstival() {
  const [topData, setTopData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

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

  const fetchData = async () => {
    setLoading(true);
    await getData();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Info>
            <h1>최근 인기 있는 펫스티벌</h1>
            <ShowMoreButton title="자세히 보기" onClick={() => navigate('/petstival')} />
          </Info>
          <Carousel>
            {topData.map((item) => {
              const imageSrc = item.firstimage || noImage;

              return (
                <Paper
                  key={item.id}
                  sx={{
                    p: 2,
                    flexGrow: 1,
                    margin: '0 4px',
                    padding: '16px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 0px 8px 0px rgba(36, 32, 32, 0.08)',
                  }}
                >
                  <div onClick={() => navigate(`/petstival/${item.id}`)} style={{ cursor: 'pointer' }}>
                    <img
                      src={imageSrc}
                      alt={item.title || 'No image available'}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '8px',
                        border: '1px solid var(--gray-20)',
                      }}
                    />
                    <h2>{item.title}</h2>
                    <div style={{ color: 'var(--gray-60)' }}>
                      {formatDate(item.startdate)} ~ {formatDate(item.enddate)}
                    </div>
                  </div>
                </Paper>
              );
            })}
          </Carousel>
        </>
      )}
    </>
  );
}
