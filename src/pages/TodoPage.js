import Nav from "../components/Nav";
import TodoList from "../components/TodoList";
import style from "./TodoPage.module.css";
import SpaceList from "../components/SpaceList";
import { useEffect, useState } from "react";
import { getSpace, getTodo } from "../api";

function TodoPage() {
  const [todoItems, setTodoItems] = useState([]);
  const [spaceName, setSpaceName] = useState("");

  const setItems = async () => {
    const todo = await getTodo();
    setTodoItems(todo);
    const spaceName = (await getSpace()).spaceName;
    setSpaceName(spaceName);
  };

  useEffect(() => {
    setItems();
  }, [todoItems, spaceName]);
  return (
    <div className={style.container}>
      <SpaceList spaceName={spaceName} />
      <TodoList todoItems={todoItems} />
      <Nav currentPage={"TodoPage"} />
    </div>
  );
}

export default TodoPage;
