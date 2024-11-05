import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  display: flex;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: ${({ $sub }) => ($sub === 'secondary' ? '500' : '700')};
  background-color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--primary-light)' : 'var(--primary-default)')};
  color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--gray-100)' : 'var(--white)')};

  &:active {
    background-color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--primary-medium)' : 'var(--primary-darken)')};
  }

  &:disabled {
    background-color: var(--gray-20);
    color: var(--gray-60);
  }
`;

function ButtonSmall({ children, sub, disabled, onClick }) {
  return (
    <Button onClick={onClick} disabled={disabled} $sub={sub}>
      <div>{children}</div>
    </Button>
  );
}

// PropTypes 정의
ButtonSmall.propTypes = {
  children: PropTypes.string.isRequired,
  sub: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonSmall;
