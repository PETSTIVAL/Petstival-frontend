import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  background-color: var(--white);
  border-radius: 8px;
  gap: 2px;
  margin-bottom: 32px;
`;

export default function DeliveryInfo(props) {
  return (
    <>
      <h2 style={{ marginBottom: '8px' }}>배송지 정보</h2>
      <Container className="drop-shadow-default">
        <div style={{ fontSize: '16px', fontWeight: '500' }}>{props.delivery_name}</div>
        <div style={{ fontSize: '14px', fontWeight: '400', color: 'var(--gray-60)' }}>
          {props.delivery_addr} {props.delivery_addr_detail}
        </div>
        <div style={{ fontSize: '14px', fontWeight: '400', color: 'var(--gray-60)' }}>{props.delivery_tel}</div>
      </Container>
    </>
  );
}
