import style from "./Management.module.css";

function Management() {
  return (
    <div className={style.managementContainer}>
      <h1 className={style.title}>스페이스 관리</h1>
      <div className={style.optionContainer}>
        <button className={style.option}>투두리스트 관리</button>
        <button className={style.option}>캘린더 관리</button>
        <button className={style.option}>다른 사용자 초대</button>
      </div>
    </div>
  );
}

export default Management;
