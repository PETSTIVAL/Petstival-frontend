import styles from './MainPopup.module.css';

export default function MainPopup({ setShowMainPop }) {
  const closePop = () => {
    setShowMainPop(false);
  };

  const closeTodayPop = () => {
    let expires = new Date();
    expires = expires.setHours(expires.getHours() + 24);
    localStorage.setItem('homeVisited', expires);
    setShowMainPop(false);
  };

  // 팝업창 이외 공간 클릭 시 팝업 닫기
  const handleClickOutside = (e) => {
    if (e.target.classList.contains(styles.popupWrapper)) {
      closePop();
    }
  };

  return (
    <div className={styles.popupWrapper} onClick={handleClickOutside}>
      {/* 팝업 내부 클릭이 래퍼로 버블링되는 것을 방지하여 팝업이 내부를 클릭할 때 열린 상태를 유지 */}
      <div className={styles.mainPopup} onClick={(e) => e.stopPropagation()}>
        <h1>팝업입니다.</h1>
        <button onClick={closeTodayPop}>오늘 하루 열지 않기</button>
        <button onClick={closePop}>닫기</button>
      </div>
    </div>
  );
}
