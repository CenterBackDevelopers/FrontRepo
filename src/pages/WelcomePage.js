import { Link } from "react-router-dom";
import style from "../styles/WelcomePage.module.css";
import join from "../assets/join.png";
import create from "../assets/create.png";

function WelcomePage() {
  return (
    <div className={style.container}>
      <Link to="/space">
        <div className={`${style.board} ${style.create}`}>
          <img src={create} />
          <h1>나의 스페이스 만들기</h1>
          <p>나만의 투두리스트를 만들어 사용해 보세요!</p>
        </div>
      </Link>
      <Link to="/join">
        <div className={`${style.board} ${style.join}`}>
          <img src={join} />
          <h1>다른 스페이스 참여하기</h1>
          <p>다른 사람의 스페이스에 참여해 같이 사용해 보세요!</p>
        </div>
      </Link>
    </div>
  );
}

export default WelcomePage;
