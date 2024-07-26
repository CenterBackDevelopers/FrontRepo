import Calendar from "../components/Calendar";
import Nav from "../components/Nav";
import SpaceList from "../components/SpaceList";
import style from "./CalendarPage.module.css";

const mock = {
  spaceName: "mySpace",
};
function CalendarPage() {
  return (
    <div className={style.container}>
      <SpaceList spaceName={mock.spaceName} />
      <Calendar />
      <Nav currentPage={"CalendarPage"} />
    </div>
  );
}

export default CalendarPage;
