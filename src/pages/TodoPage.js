import Nav from "../components/Nav";
import TodoList from "../components/TodoList";
import style from "./SpacePage.module.css";
import SpaceList from "../components/SpaceList";
import { useState } from "react";

// 테스트용 스페이스 정보
const mock = {
  spaceName: "MySpace",
  todoItems: ["React 공부하기", "스터디 준비하기", "Spring 공부하기"],
};

const pages = [<SpaceList />];

function TodoPage() {
  const [showPage, setShowPage] = useState(pages[0]);
  return (
    <div className={style.container}>
      <SpaceList spaceName={mock.spaceName} />
      <TodoList todoItems={mock.todoItems} />
      <Nav currentPage={"TodoPage"} />
    </div>
  );
}

export default TodoPage;
