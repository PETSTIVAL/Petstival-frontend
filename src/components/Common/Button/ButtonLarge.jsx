import styled from 'styled-components';

const Button = styled.button`
  width: calc(100% - 64px);
  height: 64px;
  margin: 0 32px;
  position: absolute;
  bottom: 48px;
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

function ButtonLarge({ children, onClick, disabled }) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
}

export default ButtonLarge;
