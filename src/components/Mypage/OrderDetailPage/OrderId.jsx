import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  padding: 24px 32px;
  gap: 2px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 40px;
`;

export default function OrderId(props) {
  return (
    <div>
      <h2 style={{ marginBottom: '8px' }}>주문 정보</h2>
      <Container className="drop-shadow-default">
        <div style={{ fontSize: '16px', fontWeight: '500' }}>{props.order_id}</div>
        <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--gray-60)' }}>
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
      </Container>
    </div>
  );
}
