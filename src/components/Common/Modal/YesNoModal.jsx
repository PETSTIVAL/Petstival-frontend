import Modal from 'react-modal';
import styled from 'styled-components';
import Close from '../../../assets/icons/cancel.svg?react';
import ButtonMedium from '../Button/ButtonMedium';

/** [ YesNoModal - 취소/확인 버튼이 들어간 모달입니다. ]
 *
 * 아래 param과 사용 예시 확인해서 모달이 필요한 페이지에서 사용해주세요.
 * 사용 예시 - src/pages/PetPage/PetProfilePage/PetProfilePage.jsx 참조
 *
 * @param {string} title - 모달의 헤더에 들어가는 텍스트입니다. (ex. 프로필 삭제)
 * @param {string} content - 모달의 본문에 들어가는 텍스트입니다. (ex. 정말 프로필을 삭제하시겠어요?)
 * @param {boolean} isOpen - 모달의 열림/닫힘 상태입니다.
 * @param {function} setIsOpen - 모달의 열림/닫힘 상태를 변경하는 함수입니다.
 * @param {onYesClick} boolean - 모달의 확인 버튼을 클릭 시 실행되는 함수입니다.
 * @returns {JSX.Element} YesNoModal - 취소/확인 버튼이 들어간 모달입니다.
 */

function YesNoModal({ title, content, isOpen, setIsOpen, onYesClick }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={ModalStyles} ariaHideApp={false}>
      <Header>
        {title}
        <CloseBtn onClick={() => setIsOpen(false)}>
          <Close />
        </CloseBtn>
      </Header>
      <Content>{content || ''}</Content>
      <BtnWrapper>
        <ButtonMedium children="취소" sub="secondary" onClick={() => setIsOpen(false)} />
        <ButtonMedium
          children="확인"
          sub="primary"
          // 확인 버튼을 클릭하면 YesNoModal을 끄고 onYesClick 함수를 실행합니다.
          onClick={() => {
            setIsOpen(false);
            onYesClick();
          }}
        />
      </BtnWrapper>
    </Modal>
  );
}

export default YesNoModal;

const ModalStyles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '20',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    width: 'calc(100% - 64px)',
    maxWidth: '360px',
    height: 'max-content',
    padding: '20px 24px',
    zIndex: '11',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '16px',
    backgroundColor: 'white',
  },
};

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4px 24px 16px 24px;
  color: var(--gray-100);
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid var(--gray-10);
`;

const CloseBtn = styled.div`
  position: absolute;
  right: 0px;
  top: 2px;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`;

const Content = styled.div`
  padding: 32px 0px;
  white-space: pre-wrap;
  text-align: center;
  font-size: 14px;

  color: var(--gray-100);
`;
