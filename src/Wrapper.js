import { Outlet } from "react-router-dom";
import style from "./styles/Wrapper.module.css";

function Wrapper() {
  return (
    <div className={style.wrappers}>
      <div className={style.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default Wrapper;
