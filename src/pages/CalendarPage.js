import { useCallback, useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import Nav from "../components/Nav";
import SpaceList from "../components/SpaceList";
import style from "../styles/CalendarPage.module.css";
import { getCalendar, getSpace } from "../api";
import { useTheme } from "../MainContext";
import { base } from "../darkStyles";

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

  // 다크모드 스타일
  const theme = useTheme();
  const isDark = theme === "dark";
  const baseStyle = isDark ? base : undefined;

  return (
    <div style={baseStyle} className={style.container}>
      <SpaceList spaceName={spaceName} />
      <Calendar items={calendarItems} />
      <Nav currentPage={"CalendarPage"} />
    </div>
  );
}

export default CalendarPage;
