import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function OrderId(props) {
  return (
    <>
      <h3>주문 정보</h3>
      <Paper
        sx={(theme) => ({
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '15px',
          maxWidth: 600,
          flexGrow: 1,
          backgroundColor: '#fff',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        })}
      >
        <Typography gutterBottom variant="subtitle3" component="div" sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '20px' }}>
          {props.order_id}
        </Typography>
        <Grid item container spacing={2} sx={{ color: 'text.secondary', marginLeft: '10px' }}>
          <Typography variant="body2" component="div">
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
          </Typography>
        </Grid>
      </Paper>
    </>
  );
}
