import { useEffect, useState } from "react";
import style from "./Calendar.module.css";
import { getCalendar } from "../api";
import notFoundImage from "../assets/notFound.png";

// 캘린더 최상위 컴포넌트
function Calendar() {
  const [items, setItems] = useState([{}]);
  const getItems = async () => {
    const calendar = await getCalendar();
    setItems(calendar);
  };

  useEffect(() => {
    getItems();
  }, [items]);

  return (
    <div className={style.calendarContainer}>
      <div className={style.calendar}>
        <img src={notFoundImage} />
        <p>달력은 아직 구현되지 않았습니다</p>
      </div>
      <div className={style.itemsContainer}>
        {items?.map((item) => {
          console.log(item.calendarId);
          return <CalendarItem key={item.calendarId} item={item} />;
        })}
      </div>
    </div>
  );
}

// 캘린더 개별 아이템 컴포넌트
function CalendarItem({ item }) {
  const { title } = item;
  const date = new Date(item.date);
  const dDay = getD_Day(date);

  return (
    <li className={style.calendarItem}>
      <h3>{title}</h3>
      <div>D - {dDay}</div>
    </li>
  );
}

// D-Day 계산 함수
const getD_Day = (date) => {
  const now = new Date();
  const diff = date - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export default Calendar;
