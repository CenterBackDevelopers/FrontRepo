import { useEffect, useState } from "react";
import { getSpaces } from "../api";
import style from "../styles/SpaceListPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import arrowWhiteImg from "../assets/arrow.png";
import arrowDarkImg from "../assets/arrowWhite.png";
import { useTheme } from "../MainContext";
import { base, borderBottom } from "../darkStyles";

function SpaceListPage() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const setData = async () => {
      const response = await getSpaces();
      setSpaces(response);
    };
    setData();
  }, [spaces]);

  // 다크 테마
  const theme = useTheme();
  const isDark = theme === "dark";
  const baseStyle = isDark ? base : undefined;
  const borderStyle = isDark ? borderBottom : undefined;

  return (
    <div style={baseStyle} className={style.container}>
      <h1 style={borderStyle} className={style.title}>
        Space List
      </h1>
      <ul className={style.itemContainer}>
        {spaces.map((item) => {
          return <SpaceListItem key={item.spaceId} spaceData={item} />;
        })}
      </ul>
      <div className={style.create}>
        <button style={baseStyle}>새 스페이스 만들기</button>
      </div>
    </div>
  );
}

function SpaceListItem({ spaceData }) {
  const name = spaceData.spaceName;
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate("/todo");
  };

  // 다크 테마
  const theme = useTheme();
  const isDark = theme === "dark";
  const arrowImg = isDark ? arrowDarkImg : arrowWhiteImg;
  const baseStyle = isDark ? base : undefined;

  return (
    <li className={style.item}>
      <div className={style.itemButtonContainer}>
        <button style={baseStyle} onClick={handleItemClick}>
          <div>{name}</div>
          <img src={arrowImg} />
        </button>
      </div>
    </li>
  );
}
export default SpaceListPage;
