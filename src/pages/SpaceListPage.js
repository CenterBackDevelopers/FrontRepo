import { useEffect, useState } from "react";
import { getSpaces } from "../api";
import style from "../styles/SpaceListPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import arrowWhiteImg from "../assets/arrow.png";

function SpaceListPage() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const setData = async () => {
      const response = await getSpaces();
      setSpaces(response);
    };
    setData();
  }, [spaces]);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Space List</h1>
      <ul className={style.itemContainer}>
        {spaces.map((item) => {
          return <SpaceListItem key={item.spaceId} spaceData={item} />;
        })}
      </ul>
      <div>
        <button>새 스페이스 만들기</button>
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

  return (
    <li className={style.item}>
      <button onClick={handleItemClick}>
        <div>{name}</div>
        <img src={arrowWhiteImg} />
      </button>
    </li>
  );
}
export default SpaceListPage;
