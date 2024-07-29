import style from "./Nav.module.css";
import plusImg from "../assets/plus.png";
import menuWhiteImg from "../assets/menu.png";
import menuDarkImg from "../assets/menuWhite.png";
import todoWhiteImg from "../assets/todo.png";
import todoDarkImg from "../assets/todoWhite.png";
import calendarWhiteImg from "../assets/calendar.png";
import calendarDarkImg from "../assets/calendarWhite.png";
import manageWhiteImg from "../assets/manage.png";
import manageDarkImg from "../assets/menuWhite.png";
import Menu from "./Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  addItemButtonContainer,
  addItemButtonImg,
  base,
  navButton,
  navCurrentPage,
} from "../darkStyles";
import { useTheme } from "../MainContext";

// 네비게이션 컴포넌트
function Nav({ currentPage = "TodoPage" }) {
  // 다크 모드 스타일
  const theme = useTheme();
  const isDark = theme === "dark";
  const baseStyle = isDark ? base : undefined;

  // 테마에 따른 이미지 선택
  const todoImg = isDark ? todoDarkImg : todoWhiteImg;
  const menuImg = isDark ? menuDarkImg : menuWhiteImg;
  const calendarImg = isDark ? calendarDarkImg : calendarWhiteImg;
  const manageImg = isDark ? manageDarkImg : manageWhiteImg;

  const [showMenu, setShowMenu] = useState(false);
  const handleMenuClick = () => {
    setShowMenu(true);
  };
  const isCurrent = {
    todo: false,
    calendar: false,
    management: false,
  };
  switch (currentPage) {
    case "TodoPage":
      isCurrent.todo = true;
      break;
    case "CalendarPage":
      isCurrent.calendar = true;
      break;
    case "ManagementPage":
      isCurrent.management = true;
      break;
  }

  return (
    <section style={baseStyle} className={style.container}>
      {currentPage === "ManagementPage" || <AddItemButton />}
      <div className={style.nav}>
        <NavButton
          showMenu={showMenu}
          onClick={handleMenuClick}
          onDelete={(e) => {
            e.stopPropagation();
            setShowMenu(false);
          }}
          img={menuImg}
        >
          메뉴
        </NavButton>
        <Link to="/todo">
          <NavButton isCurrent={isCurrent.todo} img={todoImg}>
            투두
          </NavButton>
        </Link>
        <Link to="/calendar">
          <NavButton isCurrent={isCurrent.calendar} img={calendarImg}>
            캘린더
          </NavButton>
        </Link>
        <Link to="/management">
          <NavButton isCurrent={isCurrent.management} img={manageImg}>
            관리
          </NavButton>
        </Link>
      </div>
    </section>
  );
}

// 네비게이션 아이템 컴포넌트
function NavButton({
  children,
  img,
  onClick = () => {},
  showMenu = false,
  onDelete = () => {},
  isCurrent = false,
}) {
  let currentStyle = isCurrent && "currentPage";

  // 다크 모드 스타일
  const theme = useTheme();
  const isDark = theme === "dark";
  const darkCurrentPage = isCurrent && isDark ? navCurrentPage : undefined;
  const darkButton = isDark ? navButton : undefined;

  return (
    <div
      className={`${style.navButtonContainer} ${style[currentStyle]}`}
      style={darkCurrentPage}
      onClick={onClick}
    >
      {showMenu && <Menu onDelete={onDelete} />}
      <img src={img} />
      <button style={darkButton}>{children}</button>
    </div>
  );
}

// 아이템 추가 버튼
function AddItemButton() {
  return (
    <div
      style={addItemButtonContainer}
      className={style.addItemButtonContainer}
    >
      <p>추가하기</p>
      <img style={addItemButtonImg} src={plusImg} />
    </div>
  );
}

export default Nav;
