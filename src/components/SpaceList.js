import style from "./SpaceList.module.css";

// 스페이스 리스트의 상위 컴포넌트
function SpaceList({ spaceName }) {
  return <SpaceListButton>{spaceName}</SpaceListButton>;
}

// 누르면 스페이스 리스트로 연결할 버튼
function SpaceListButton({ children }) {
  return <h1 className={style.spaceListButton}>{children}</h1>;
}

export default SpaceList;
