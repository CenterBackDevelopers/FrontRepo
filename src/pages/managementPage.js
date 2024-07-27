import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SpaceList from "../components/SpaceList";
import style from "./Management.module.css";
import { getSpace } from "../api";
import Management from "../components/Management";

function ManagementPage() {
  const [spaceName, setSpaceName] = useState("");

  const getData = async () => {
    const space = await getSpace();
    setSpaceName(space.spaceName);
  };

  useEffect(() => {
    getData();
  }, [spaceName]);

  return (
    <div className={style.container}>
      <SpaceList spaceName={spaceName} />
      <Management />
      <Nav currentPage={"ManagementPage"} />
    </div>
  );
}

export default ManagementPage;
