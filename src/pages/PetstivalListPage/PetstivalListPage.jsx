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

const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;

export default function PetstivalListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 펫스티벌 데이터 가져오기 및 날짜별 정렬
  const getData = async () => {
    try {
      const { data, error } = await supabase.from('festivals').select();
      if (error) throw error;

      const sortedData = data.sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

  return (
    <div>
      <DetailBar title="펫스티벌 모아보기" />
      <Wrapper>
        {error && <p style={{ color: 'red' }}>오류: {error}</p>}
        {loading ? (
          '로딩 중...'
        ) : (
          <ImageList cols={1}>
            {data.map((item) => {
              const { label, color } = getStatus(item.startdate, item.enddate);
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
                  <ImageListItem onClick={() => navigate(`/petstival/${item.id}`)} style={{ cursor: 'pointer' }}>
                    <img
                      srcSet={`${imageSrc}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${imageSrc}?w=248&fit=crop&auto=format`}
                      alt={item.title || 'No image available'}
                      loading="lazy"
                      //  style={{ width: '420px', height: '150px', objectFit: 'cover' }}
                    />
                    <ImageListItemBar
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                          <Typography variant="h6" sx={{ marginRight: '8px' }}>
                            {item.title}
                          </Typography>
                          <Chip
                            label={label}
                            sx={{
                              color: color === '#FF866B' ? '#FF866B' : undefined,
                              borderColor: color === '#FF866B' ? '#FF866B' : undefined,
                            }}
                            variant="outlined"
                          />
                        </div>
                      }
                      subtitle={
                        <Typography sx={{ marginTop: '4px' }}>
                          {item.startdate} ~ {item.enddate}
                        </Typography>
                      }
                      position="below"
                    />
                  </ImageListItem>
                </Paper>
              );
            })}
          </ImageList>
        )}
      </Wrapper>
      <Navbar selectedMenu="Home" />
    </div>
  );
}
