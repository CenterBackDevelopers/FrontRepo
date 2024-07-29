import { managementOption } from "../darkStyles";
import { useTheme } from "../MainContext";
import style from "../styles/Management.module.css";

function Management() {
  // 다크 테마(active는 inline style로 적용이 불가능해 스타일명을 통해 css 파일로 지정함)
  const theme = useTheme();

  return (
    <div className={style.managementContainer}>
      <h1 className={style.title}>스페이스 관리</h1>
      <div className={style.optionContainer}>
        <button className={`${style.option} ${style[theme]}`}>
          투두리스트 관리
        </button>
        <button className={`${style.option} ${style[theme]}`}>
          캘린더 관리
        </button>
        <button className={`${style.option} ${style[theme]}`}>
          다른 사용자 초대
        </button>
      </div>
    </div>
  );
}

export default Management;
