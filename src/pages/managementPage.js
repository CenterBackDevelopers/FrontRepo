import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SpaceList from "../components/SpaceList";
import style from "../styles/ManagementPage.module.css";
import { getSpace } from "../api";
import Management from "../components/Management";
import { useTheme } from "../MainContext";
import { base } from "../darkStyles";

function ManagementPage() {
  const [spaceName, setSpaceName] = useState("");

  const getData = async () => {
    const space = await getSpace();
    setSpaceName(space.spaceName);
  };

  useEffect(() => {
    getData();
  }, [spaceName]);

  // 다크 테마
  const theme = useTheme();
  const isDark = theme === "dark";
  const baseStyle = isDark ? base : undefined;

  return (
    <div style={baseStyle} className={style.container}>
      <SpaceList spaceName={spaceName} />
      <Management />
      <Nav currentPage={"ManagementPage"} />
    </div>
  );
}

export default ManagementPage;
