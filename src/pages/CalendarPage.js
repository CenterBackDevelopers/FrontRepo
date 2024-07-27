import { useCallback, useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import Nav from "../components/Nav";
import SpaceList from "../components/SpaceList";
import style from "./CalendarPage.module.css";
import { getCalendar, getSpace } from "../api";

function CalendarPage() {
  const [spaceName, setSpaceName] = useState("");
  const [calendarItems, setCalendarItmes] = useState([{}]);

  const getItems = useCallback(async () => {
    const space = await getSpace();
    setSpaceName(space.spaceName);
    const items = await getCalendar();
    setCalendarItmes(items);
  }, [getSpace, getCalendar]);

  useEffect(() => {
    getItems();
  }, [spaceName, calendarItems]);

  return (
    <div className={style.container}>
      <SpaceList spaceName={spaceName} />
      <Calendar items={calendarItems} />
      <Nav currentPage={"CalendarPage"} />
    </div>
  );
}

export default CalendarPage;
