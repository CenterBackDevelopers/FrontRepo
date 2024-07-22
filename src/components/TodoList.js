import style from "./TodoList.module.css";

// 투두리스트 탭이 눌리면 호출될 상위 컴포넌트
function TodoList({ data }) {
  const { spaceName, todoItems } = data;
  return (
    <section className={style.container}>
      <h2 className={style.title}>TodoList</h2>
      <ItemList items={todoItems} />
    </section>
  );
}

// 아이템을 모은 리스트 컴포넌트
function ItemList({ items }) {
  return (
    <ul className={style.todoContainer}>
      {items.map((item, idx) => {
        return <Item key={idx} item={item} />;
      })}
    </ul>
  );
}

// 각각의 아이템 컴포넌트
function Item({ item }) {
  return (
    <li className={style.item}>
      <input type="checkbox" />
      {item}
    </li>
  );
}

export default TodoList;