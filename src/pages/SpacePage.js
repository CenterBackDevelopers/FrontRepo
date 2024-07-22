import Nav from "../components/Nav";
import TodoList from "../components/TodoList";
import style from "./SpacePage.module.css";
import SpaceList from "../components/SpaceList";

// 테스트용 스페이스 정보
const mock = {
  spaceName: "MySpace",
  todoItems: ["React 공부하기", "스터디 준비하기", "Spring 공부하기"],
};

function SpacePage() {
  return (
    <div className={style.container}>
      <SpaceList spaceName={mock.spaceName} />
      <TodoList data={mock} />
      <Nav />
    </div>
  );
}

export default SpacePage;
