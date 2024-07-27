import { useState } from "react";
import Nav from "../components/Nav";
import SpaceList from "../components/SpaceList";
import TodoList from "../components/TodoList";
import style from "./management.module.css";

function ManagementPage() {
  const [spaceName, setSpaceName] = useState("");

  return (
    <div className={style.container}>
      <SpaceList spaceName={spaceName} />
      <Nav currentPage={"TodoPage"} />
    </div>
  );
}

export default ManagementPage;
