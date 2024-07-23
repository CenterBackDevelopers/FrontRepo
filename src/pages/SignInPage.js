import { Link, useNavigate } from "react-router-dom";
import style from "./SignInPage.module.css";
import { useRef, useState, useEffect } from "react";
import { signIn } from "../api";
import showPassword from "../assets/showPassword.png";
import hidePasword from "../assets/hidePassword.png";

// 아이디/비밀번호 State의 초깃값
const initialInputs = {
  id: "",
  password: "",
};

function SignInPage() {
  const navigate = useNavigate();

  // 아이디와 비밀번호를 객체로 저장하는 State
  const [inputs, setInputs] = useState(initialInputs);
  // 아이디/비밀번호가 틀렸는지를 저장하는 State
  const [isCorrect, setIsCorrect] = useState(true);
  // 비밀번호를 보이게 할지를 저장하는 State
  const [isHide, setIsHide] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState(showPassword);

  // id input, password input의 Ref
  const idRef = useRef();
  const passwordRef = useRef();

  // <input>에 입력되면 State에 반영시킬 핸들러
  const handleChange = () => {
    const idNode = idRef.current;
    const passwordNode = passwordRef.current;
    setInputs({
      [idNode.name]: idNode.value,
      [passwordNode.name]: passwordNode.value,
    });
  };

  // 로그인 버튼을 누르면 작동할 핸들러
  const handleSignIn = async () => {
    const result = await signIn(inputs);
    setIsCorrect(result);
    // 아이디 비밀번호를 올바르게 입력했으면 SpacePage로 이동
    if (result) {
      navigate("/space");
    }
  };

  // 비밀번호를 볼 수 있게 만드는 버튼의 핸들러
  // 누를때마다 비밀번호를 보이게 할지 말지 변경함
  const handleShowPassword = (e) => {
    if (isHide) setIsHide(false);
    else setIsHide(true);
  };
  useEffect(() => {
    if (isHide) {
      setPasswordIcon(showPassword);
      passwordRef.current.type = "password";
    } else {
      setPasswordIcon(hidePasword);
      passwordRef.current.type = "text";
    }
  }, [isHide]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.top}>
          <h1 className={style.title}>TodoList</h1>
          <h6 className={style.signUp}>
            아직 계정이 없으신가요? <Link to="/signup">계정 생성하기</Link>
          </h6>
        </div>

        <div className={style.middle}>
          <div className={style.id}>
            <div className={style.alert}>
              {isCorrect || "아이디 혹은 비밀번호가 올바르지 않습니다"}
            </div>
            <input
              value={inputs.id}
              onChange={handleChange}
              name="id"
              placeholder="아이디"
              ref={idRef}
            />
          </div>
          <div className={style.password}>
            <div className={style.showPassword}>
              <button onClick={handleShowPassword}>
                <img src={passwordIcon} />
              </button>
            </div>
            <input
              value={inputs.password}
              onChange={handleChange}
              name="password"
              placeholder="비밀번호"
              ref={passwordRef}
              type="password"
            />
          </div>

          <div className={style.options}>
            <label className={style.autoSignIn}>
              <input type="checkbox" />
              자동 로그인
            </label>
            <div className={style.find}>
              <Link to="/find">아이디/비밀번호 찾기</Link>
            </div>
          </div>

          <div className={style.btn}>
            <button onClick={handleSignIn}>로그인 하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
