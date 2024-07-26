import style from "./Menu.module.css";

// 촤측 하단 메뉴 버튼을 누르면 호출될 컴포넌트
function Menu({ onDelete }) {
  const handleThemeClick = () => {};
  const handleLanguageClick = () => {};
  const handleLogoutClick = () => {};
  const handleExitClick = (e) => {
    onDelete(e);
  };
  return (
    <div className={style.menuContainer}>
      <div className={style.menu}>
        <h1 className={style.title}>Menu</h1>
        <ul>
          <li onClick={handleThemeClick}>테마</li>
          <li onClick={handleLanguageClick}>언어</li>
          <li onClick={handleLogoutClick}>로그아웃</li>
        </ul>
        <div className={style.exit} onClick={handleExitClick}>
          닫기
        </div>
      </div>
      <div className={style.another} onClick={handleExitClick}></div>
    </div>
  );
}

export default Menu;
