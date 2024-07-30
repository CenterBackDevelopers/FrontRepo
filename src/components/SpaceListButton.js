import { Link } from "react-router-dom";
import { base, borderBottom } from "../darkStyles";
import { useTheme } from "../MainContext";
import style from "../styles/SpaceListButton.module.css";

// 누르면 스페이스 리스트로 연결할 버튼
function SpaceListButton({ spaceName }) {
  // 다크 테마
  const theme = useTheme();
  const isDark = theme === "dark";
  const titleStyle = isDark ? { ...borderBottom, ...base } : undefined;
  return (
    <div className={style.container}>
      <Link to="/spaces">
        <h1 style={titleStyle} className={style.spaceListButton}>
          {spaceName}
        </h1>
      </Link>
    </div>
  );
}

export default SpaceListButton;
