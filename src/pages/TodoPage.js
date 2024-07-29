import Nav from "../components/Nav";
import TodoList from "../components/TodoList";
import style from "../styles/TodoPage.module.css";
import SpaceList from "../components/SpaceList";
import { useEffect, useState } from "react";
import { getSpace, getTodo } from "../api";
import { base } from "../darkStyles";
import { useTheme } from "../MainContext";

function TodoPage() {
  const [todoItems, setTodoItems] = useState([]);
  const [spaceName, setSpaceName] = useState("");

  // 다크모드 스타일
  const theme = useTheme();
  const isDark = theme === "dark";
  const baseStyle = isDark ? base : undefined;

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
    <div style={baseStyle} className={style.container}>
      <SpaceList spaceName={spaceName} />
      <TodoList todoItems={todoItems} />
      <Nav currentPage={"TodoPage"} />
    </div>
  );
}

export default TodoPage;
