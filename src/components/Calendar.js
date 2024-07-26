import { useEffect, useState } from "react";
import style from "./Calendar.module.css";
import { getCalendar } from "../api";

// 캘린더 최상위 컴포넌트
function Calendar() {
  const [items, setItems] = useState([{}]);
  const getItems = async () => {
    setItems(await getCalendar());
  };

  useEffect(() => {
    getItems();
  }, [items]);

  return (
    <div className={style.calendarContainer}>
      {items.map((item) => {
        return <CalendarItem key={item.id} item={item} />;
      })}
    </div>
  );
}

// 캘린더 개별 아이템 컴포넌트
function CalendarItem({ item }) {
  const { title } = item;
  const date = new Date(item.date);
  const now = new Date();
  const dateDiff = date - now;
  const D_Day = Math.ceil(dateDiff / (1000 * 3600 * 24));
  console.log(D_Day);

  return (
    <li className={style.calendarItem}>
      <h3>{title}</h3>
      <div>{D_Day}</div>
    </li>
  );
}

export default Calendar;
