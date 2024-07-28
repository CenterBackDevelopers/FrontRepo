import { useState } from "react";
import style from "./Menu.module.css";
import { useSetTheme, useTheme } from "../MainContext";

// 촤측 하단 메뉴 버튼을 누르면 호출될 컴포넌트
function Menu({ onDelete }) {
  const [isVisibleTheme, setIsShowTheme] = useState(false);
  const handleThemeClick = () => {
    setIsShowTheme(true);
  };
  const handleCloseTheme = () => {
    setIsShowTheme(false);
  };
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
      <ThemeController isVisible={isVisibleTheme} onDelete={handleCloseTheme} />
    </div>
  );
}

function ThemeController({ isVisible, onDelete }) {
  const setTheme = useSetTheme();
  const theme = useTheme();

  const preventBubbling = (e) => {
    e.stopPropagation();
  };
  const handleWhiteClick = () => {
    setTheme("white");
  };
  const handleDarkClick = () => {
    setTheme("dark");
  };

  if (!isVisible) return;
  return (
    <div className={style.themeContainer} onClick={onDelete}>
      <div className={style.themeBox} onClick={preventBubbling}>
        <h2 className={style.themeTitle}>테마 설정</h2>
        <div className={style.optionContainer}>
          <button
            className={`${style.themeOption} ${style.white}`}
            onClick={handleWhiteClick}
          >
            밝은 테마
          </button>
          <button
            className={`${style.themeOption} ${style.black}`}
            onClick={handleDarkClick}
          >
            어두운 테마
          </button>
        </div>
        <div className={style.closeContainer}>
          <button className={style.close}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
