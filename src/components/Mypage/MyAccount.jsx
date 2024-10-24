import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

export default function MyAccount() {
  return (
    <>
      <h3>계정 관리</h3>

      <Paper
        sx={(theme) => ({
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '5px',
          maxWidth: 600,
          flexGrow: 1,
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        })}
      >
        <Grid item sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="body2" component="div" sx={{ margin: '15px', cursor: "pointer" }}>
                로그아웃
              </Typography>
              <Typography gutterBottom variant="body2" component="div" sx={{ margin: '15px', cursor: "pointer" }}>
                탈퇴하기
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
