import style from "./Nav.module.css";
import plusImg from "../assets/plus.png";
import menuImg from "../assets/menu.png";
import todoImg from "../assets/todo.png";
import calendarImg from "../assets/calendar.png";
import manageImg from "../assets/manage.png";

// 네비게이션 컴포넌트
function Nav({ hasAddButton = true }) {
  return (
    <section className={style.container}>
      <div className={style.addItemButton}>
        {hasAddButton && <AddItemButton />}
      </div>
      <div className={style.nav}>
        <NavButton img={menuImg}>메뉴</NavButton>
        <NavBorder />
        <NavButton img={todoImg}>투두</NavButton>
        <NavBorder />
        <NavButton img={calendarImg}>캘린더</NavButton>
        <NavBorder />
        <NavButton img={manageImg}>관리</NavButton>
      </div>
    </section>
  );
}

// 네비게이션 아이템 컴포넌트
function NavButton({ children, img }) {
  return (
    <div className={style.navButtonContainer}>
      <img src={img} />
      <button>{children}</button>
    </div>
  );
}

// 아이템 추가 버튼
function AddItemButton() {
  return <img src={plusImg} />;
}

// 네비게이션 사이 구분선
function NavBorder() {
  return <div className={style.navBorder} />;
}

export default Nav;
