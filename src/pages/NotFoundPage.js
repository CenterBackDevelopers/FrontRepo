import { Link } from "react-router-dom";
import style from "../styles/NotFoundPage.module.css";
import img from "../assets/notFound.png";
function NotFoundPage() {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h1 className={style.title}>404 Not Found</h1>
        <div className={style.imgContainer}>
          <img src={img} />
        </div>
        <p className={style.comment}>
          해당 경로는 잘못된 경로거나, 아직 구현되지 않은 페이지의 경로입니다.
        </p>
        <div className={style.buttonContainer}>
          <Link to="/">
            <button>돌아가기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
