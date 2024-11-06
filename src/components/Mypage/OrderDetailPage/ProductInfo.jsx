import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 20px;
  background-color: var(--white);
  border-radius: 8px;
  gap: 8px;
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 20px;
`;

export default function ProductInfo(props) {
  return (
    <Container className="drop-shadow-default">
      <RowWrapper>
        <div style={{ fontSize: '13px', fontWeight: '400', color: 'var(--gray-40)' }}>
          {new Date(props.created_at)
            .toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })
            .replace(/\.$/, '')}
          &nbsp; 결제 완료
        </div>
      </RowWrapper>
      <RowWrapper>
        <img src={props.img_url_1} alt={props.product_name} style={{ width: '80px', height: '80px', borderRadius: '8px' }} />
        <div>
          <div style={{ width: '100%', fontSize: '16px', fontWeight: '500' }}>{props.product_name}</div>
          <div style={{ fontSize: '14px', fontWeight: '400', color: 'var(--gray-60)' }}>{props.total_count}개</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--gray-100)' }}>{props.total_price.toLocaleString()}원</div>
        </div>
      </RowWrapper>
    </Container>
  );
}
