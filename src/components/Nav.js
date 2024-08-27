import style from "../styles/Nav.module.css";
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

  // 메뉴 버튼을 클릭하면, 메뉴바 컴포넌트를 렌더링함
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuClick = () => {
    setShowMenu(true);
  };

  // 추가하기 버튼을 누르면 컴포넌트를 렌더링함
  // 닫기 버튼을 누르면 컴포넌트를 닫음
  const [isVisibleTodo, setIsVibleTodo] = useState(false);
  const [isVisibleCalendar, setIsVisibleCalendar] = useState(false);
  const handleAddComponent = (e) => {
    switch (currentPage) {
      case "TodoPage":
        setIsVibleTodo(!isVisibleTodo);
        break;
      case "CalendarPage":
        setIsVisibleCalendar(!isVisibleCalendar);
        break;
    }
  };

  // 현재 페이지의 버튼을 강조하는데 사용할 변수
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
      <AddItemButton currentPage={currentPage} onClick={handleAddComponent} />
      {isVisibleTodo && <AddTodoController onDelete={handleAddComponent} />}
      {isVisibleCalendar && (
        <AddCalendarController onDelete={handleAddComponent} />
      )}
      <div className={style.nav}>
        <NavButton showMenu={showMenu} onClick={handleMenuClick} img={menuImg}>
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
      {showMenu && (
        <Menu
          onDelete={() => {
            setShowMenu(false);
          }}
        />
      )}
    </section>
  );
}

// 네비게이션 아이템 컴포넌트
function NavButton({ children, img, onClick = () => {}, isCurrent = false }) {
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
      <img src={img} />
      <button style={darkButton}>{children}</button>
    </div>
  );
}

// 아이템 추가 버튼
function AddItemButton({ currentPage, onClick }) {
  // 관리 페이지에서는 렌더링하지 않음
  if (currentPage === "ManagementPage") {
    return;
  }
  return (
    <div
      style={addItemButtonContainer}
      className={style.addItemButtonContainer}
      onClick={onClick}
    >
      <p>추가하기</p>
      <img style={addItemButtonImg} src={plusImg} />
    </div>
  );
}

// Todo 페이지에서 추가하기 버튼을 누르면 렌더링될 컴포넌트
function AddTodoController({ onDelete }) {
  // Theme
  const theme = useTheme();
  const isDark = theme === "dark";
  const baseStyle = isDark ? base : undefined;

  // true면 날짜기준, false면 요일기준 초기화
  const [isDate, setIsDate] = useState(true);
  const [isFirst, setIsFirst] = useState(true);

  const handleSelect = (e) => {
    setIsFirst(false);
    const value = e.target.value;

    if (value === "date") {
      setIsDate(true);
    } else {
      setIsDate(false);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  const showInput = () => {
    if (isFirst) return <div>옵션을 선택해 주세요</div>;
    if (isDate) return <DateInput />;
    else return <DayInput />;
  };

  const preventBubbling = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={style.addContainer} onClick={handleDelete}>
      <div
        className={style.fixedBox}
        style={baseStyle}
        onClick={preventBubbling}
      >
        <h1 className={style.title}>추가하기</h1>
        <label className={style.name}>
          <div>이름</div>
          <input type="text" />
        </label>
        <div className={style.resetContainer}>
          <h1>초기화 방법 설정</h1>
          <div className={style.resetMethod}>
            <label>
              <div>며칠마다</div>
              <input
                type="radio"
                onChange={handleSelect}
                value="date"
                name="reset"
              />
            </label>
            <label>
              <div>요일마다</div>
              <input
                type="radio"
                onChange={handleSelect}
                value="day"
                name="reset"
              />
            </label>
          </div>
          <div>
            <h1 className={style.description}>초기화 주기 설정</h1>
            <div className={style.dueContainer}>{showInput()}</div>
          </div>
          <div className={style.closeButton}>
            <button onClick={handleDelete}>닫기</button>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

// 투두 초기화 주기를 날짜로 설정하면 렌더링될 컴포넌트
function DateInput() {
  return (
    <div className={style.dateContainer}>
      <label>
        <input type="number" />
        <div>일</div>
      </label>
    </div>
  );
}

// 투두 초기화 주기를 요일로 설정하면 렌더링될 컴포넌트
function DayInput() {
  return (
    <div className={style.dayContainer}>
      <label>
        <input type="checkbox" />
        <div>월</div>
      </label>
      <label>
        <input type="checkbox" />
        <div>화</div>
      </label>
      <label>
        <input type="checkbox" />
        <div>수</div>
      </label>
      <label>
        <input type="checkbox" />
        <div>목</div>
      </label>
      <label>
        <input type="checkbox" />
        <div>금</div>
      </label>
      <label>
        <input type="checkbox" />
        <div>토</div>
      </label>
      <label>
        <input type="checkbox" />
        <div>일</div>
      </label>
    </div>
  );
}

// Calendar 페이지에서 추가하기 버튼을 누르면 렌더링될 컴포넌트
function AddCalendarController({ onDelete }) {
  // Theme
  const theme = useTheme();
  const isDark = theme === "dark";
  const baseStyle = isDark ? base : undefined;

  const preventBubbling = (e) => {
    e.stopPropagation();
  };
  const handleDelete = () => {
    onDelete();
  };
  return (
    <div className={style.addContainer}>
      <div
        className={style.fixedBox}
        style={baseStyle}
        onClick={preventBubbling}
      >
        <h1 className={style.title}>추가하기</h1>
        <label className={style.name}>
          <div>이름</div>
          <input type="text" />
        </label>
        <h1 className={style.title}>날짜 지정</h1>
        <div className={style.dateInputContainer}>
          <label className={style.year}>
            <input type="number" />
            <div>년</div>
          </label>
          <label className={style.month}>
            <input type="number" />
            <div>월</div>
          </label>
          <label className={style.date}>
            <input type="number" />
            <div>일</div>
          </label>
        </div>
        <div className={style.closeButton}>
          <button onClick={handleDelete}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
