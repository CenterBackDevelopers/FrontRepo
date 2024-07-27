import style from "./Nav.module.css";
import plusImg from "../assets/plus.png";
import menuImg from "../assets/menu.png";
import todoImg from "../assets/todo.png";
import calendarImg from "../assets/calendar.png";
import manageImg from "../assets/manage.png";
import Menu from "./Menu";
import { useState } from "react";
import { Link } from "react-router-dom";

// 네비게이션 컴포넌트
function Nav({ currentPage = "TodoPage" }) {
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
    <section className={style.container}>
      <div className={style.borderContainer}>
        <hr />
      </div>
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
  const opacityStyle = isCurrent && "currentPage";

  return (
    <div
      className={`${style.navButtonContainer} ${style[opacityStyle]}`}
      onClick={onClick}
    >
      {showMenu && <Menu onDelete={onDelete} />}
      <img src={img} />
      <button>{children}</button>
    </div>
  );
}

// 아이템 추가 버튼
function AddItemButton() {
  return (
    <div className={style.addItemButtonContainer}>
      <p>추가하기</p>
      <img src={plusImg} />
    </div>
  );
}

export default Nav;
