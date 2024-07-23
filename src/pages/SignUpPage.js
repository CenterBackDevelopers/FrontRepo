import { useState, useEffect, useRef } from "react";
import style from "./SignUpPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getIsDuplicate, postSignUp } from "../api";
import warningImg from "../assets/warning.png";
/* 회원가입 페이지 */

// inputs의 초깃값
const initialInputs = {
  name: "",
  id: "",
  password: "",
  passwordChecking: "",
};
// TSV의 초깃값
const initialTSVType = null;
const initialPhone = {
  data: "",
  certified: "",
  isCertified: null,
};
const initialEmail = {
  data: "",
  certified: "",
  isCertified: null,
};

function SignUpPage() {
  const navigate = useNavigate();
  // input들의 value를 담을 State
  const [inputs, setInputs] = useState(initialInputs);
  const [TSVType, setTSVType] = useState(initialTSVType);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);

  // 아이디, 비밀번호 input의 value가 변경되면 State에 반영할 핸들러
  const hadnleInputsChange = (e) => {
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [e.target.name]: e.target.value,
      };
    });
  };

  // 2차 인증 관련 input의 value가 변경되면 State에 반영할 핸들러
  const handleTypeChange = (e) => {
    const type = e.target.value;
    setTSVType(type);
  };
  const handlePhoneChange = (e) => {
    setPhone((prevPhone) => {
      return {
        ...prevPhone,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleEmailChange = (e) => {
    setEmail((prevEmail) => {
      return {
        ...prevEmail,
        [e.target.name]: e.target.value,
      };
    });
  };

  // 아이디 조건 확인 관련 State, Ref(중복 확인만 구현함)
  const duplicateAlertRef = useRef();
  const [isDuplicate, setIsDuplicate] = useState(null);
  const [duplicateAlert, setDuplicateAlert] = useState("");
  // id 중복 확인 결과를 출력할 alert 설정
  useEffect(() => {
    const alert = duplicateAlertRef.current;
    if (isDuplicate === null) {
      setDuplicateAlert("");
      return;
    }
    if (isDuplicate) {
      alert.classList.add(style.wrong);
      alert.classList.remove(style.correct);
      setDuplicateAlert("이미 존재하는 아이디입니다");
      return;
    } else {
      alert.classList.add(style.correct);
      alert.classList.remove(style.wrong);
      setDuplicateAlert("사용 가능한 아이디입니다");
      return;
    }
  }, [isDuplicate]);
  useEffect(() => {
    setIsDuplicate(null);
  }, [inputs.id]);
  // 중복 확인 버튼이 클릭되면 id가 중복되는지를 isDuplicate에 담는 핸들러
  const handleDuplicate = async () => {
    const result = await getIsDuplicate(inputs.id);
    if (result) setIsDuplicate(true);
    else setIsDuplicate(false);
  };

  // 비밀번호 조건 확인 관련 코드(미구현)
  const [isCorrectPassword, setIsCorrectPassword] = useState(null);
  const [passwordAlert, setPasswordAlert] = useState("");

  // 비밀번호 2차 확인 관련 State, Ref
  const passwordCheckingAlertRef = useRef();
  const [isCorrectPasswordChecking, setIsCorrectPasswordChecking] =
    useState(null);
  const [passwordCheckingAlert, setPasswordCheckingAlert] = useState("");
  // 확인 결과에 따라서 alert을 출력
  useEffect(() => {
    const alert = passwordCheckingAlertRef.current;
    if (isCorrectPasswordChecking === null) {
      setPasswordCheckingAlert("");
      return;
    }
    if (isCorrectPasswordChecking) {
      alert.classList.add(style.correct);
      alert.classList.remove(style.wrong);
      setPasswordCheckingAlert("비밀번호와 일치합니다");
    } else {
      alert.classList.remove(style.correct);
      alert.classList.add(style.wrong);
      setPasswordCheckingAlert("비밀번호와 일치하지 않습니다");
    }
  }, [isCorrectPasswordChecking]);
  // 비밀번호와 비밀번호 2차 확인이 일치하는지 검사
  useEffect(() => {
    if (!inputs.passwordChecking) {
      setIsCorrectPasswordChecking(null);
      return;
    }
    if (inputs.password === inputs.passwordChecking) {
      setIsCorrectPasswordChecking(true);
      return;
    } else {
      setIsCorrectPasswordChecking(false);
      return;
    }
  }, [inputs]);

  // 선택한 2차 인증만 입력할 수 있게 하는 코드
  // 관련 State와 Ref
  const [isPhoneSelected, setIsPhoneSelected] = useState();
  const [isEmailSelected, setIsEmailSelected] = useState();
  const phoneBoxRef = useRef();
  const emailBoxRef = useRef();
  // TSVType이 변경될 때마다 isSelected State에 반영함
  useEffect(() => {
    if (TSVType === null) {
      setIsPhoneSelected(false);
      setIsEmailSelected(false);
    }
    if (TSVType === "phone") {
      setIsPhoneSelected(true);
      setIsEmailSelected(false);
    }
    if (TSVType === "email") {
      setIsPhoneSelected(false);
      setIsEmailSelected(true);
    }
  }, [TSVType]);
  // isSelected State의 상태에 따라 비활성화 스타일을 적용함
  useEffect(() => {
    const phone = phoneBoxRef.current;
    if (isPhoneSelected) phone.classList.remove(style.disabled);
    else phone.classList.add(style.disabled);
  }, [isPhoneSelected]);
  useEffect(() => {
    const email = emailBoxRef.current;
    if (isEmailSelected) email.classList.remove(style.disabled);
    else email.classList.add(style.disabled);
  }, [isEmailSelected]);

  // 인증 번호 관련 코드
  // State, Ref
  const [phoneAlert, setPhoneAlert] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const phoneAlertRef = useRef();
  const emailAlertRef = useRef();
  // 확인 버튼을 누르면 실행할 핸들러
  const handleCertifiedCheck = () => {
    if (TSVType === "phone") {
      // 테스트를 위해 인증번호를 123456으로 설정함
      if (phone.certified === "123456") {
        setPhone((prevPhone) => {
          return {
            ...prevPhone,
            isCertified: true,
          };
        });
      } else {
        setPhone((prevPhone) => {
          return {
            ...prevPhone,
            isCertified: false,
          };
        });
      }
    } else if (TSVType === "email") {
      if (email.certified === "123456") {
        setEmail((prevEmail) => {
          return {
            ...prevEmail,
            isCertified: true,
          };
        });
      } else {
        setEmail((prevEmail) => {
          return {
            ...prevEmail,
            isCertified: false,
          };
        });
      }
    }
  };
  // isCertified 프로퍼티의 값에 따라서 Alert을 출력함
  useEffect(() => {
    const alert = phoneAlertRef.current;
    if (phone.isCertified === null) {
      setPhoneAlert("");
      return;
    }
    if (phone.isCertified) {
      alert.classList.add(style.correct);
      alert.classList.remove(style.wrong);
      setPhoneAlert("인증이 완료되었습니다");
    } else {
      alert.classList.remove(style.correct);
      alert.classList.add(style.wrong);
      setPhoneAlert("인증번호가 다릅니다");
    }
  }, [phone.isCertified]);
  useEffect(() => {
    const alert = emailAlertRef.current;
    if (email.isCertified === null) {
      setEmailAlert("");
      return;
    }
    if (email.isCertified) {
      alert.classList.add(style.correct);
      alert.classList.remove(style.wrong);
      setEmailAlert("인증이 완료되었습니다");
    } else {
      alert.classList.remove(style.correct);
      alert.classList.add(style.wrong);
      setEmailAlert("인증번호가 다릅니다");
    }
  }, [email.isCertified]);

  // 회원 가입 버튼 관련 코드
  // State
  const [isLoading, setIsLoading] = useState(false);
  // 회원 가입 버튼이 눌리면 동작할 핸들러
  const handleSignUp = async () => {
    // 모든 조건이 충족해야 회원가입 요청을 보냄
    // 이름, 아이디, 비밀번호의 특수문자/자릿수 조건은 구현하지 않음
    // 2차 인증 조건은 구현하지 않음
    if (isDuplicate == null || isDuplicate) {
      alert("아이디가 올바르지 않습니다");
      return;
    }
    if (!isCorrectPasswordChecking) {
      alert("비밀번호가 올바르지 않습니다");
      return;
    }

    // 모든 조건이 충족됐다면 API에 회원가입 리퀘스트를 보냄
    const TSVData = TSVType === "phone" ? phone.data : email.data;
    const member = {
      id: inputs.id,
      name: inputs.name,
      password: inputs.password,
      TSV: {
        type: TSVType,
        data: TSVData,
      },
    };
    const result = await postSignUp(member);
    if (result) {
      navigate("/space");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <form>
          <div className={style.top}>
            <h1 className={style.title}>Sign Up</h1>
            <h6 className={style.signIn}>
              이미 계정이 있으신가요? <Link to="/">로그인 하기</Link>
            </h6>
          </div>

          <div className={style.data}>
            <div className={style.name}>
              <div className={style.boldText}>이름</div>
              <div>
                <input
                  placeholder="name"
                  name="name"
                  value={inputs.name}
                  onChange={hadnleInputsChange}
                />
              </div>
            </div>
            <div className={style.id}>
              <div>
                <span className={style.boldText}>아이디</span>
                <button type="button" onClick={handleDuplicate}>
                  중복 확인
                </button>
              </div>
              <div className={style.idInputContainer}>
                <input
                  placeholder="id"
                  name="id"
                  value={inputs.id}
                  onChange={hadnleInputsChange}
                />
                <p className={style.alert} ref={duplicateAlertRef}>
                  {duplicateAlert}
                </p>
              </div>
            </div>
            <div className={style.password}>
              <div className={style.boldText}>비밀번호</div>
              <div className={style.passwordInputContainer}>
                <input
                  placeholder="password"
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={hadnleInputsChange}
                />
                <p className={style.alert}>{passwordAlert}</p>
              </div>
            </div>
            <div className={style.passwordChecking}>
              <div className={style.boldText}>비밀번호 확인</div>
              <div className={style.passwordCheckingInputContainer}>
                <input
                  placeholder="password checking"
                  type="password"
                  name="passwordChecking"
                  value={inputs.passwordChecking}
                  onChange={hadnleInputsChange}
                />
                <p className={style.alert} ref={passwordCheckingAlertRef}>
                  {passwordCheckingAlert}
                </p>
              </div>
            </div>
          </div>

          <div className={style.TSV}>
            <div className={style.select}>
              <h2>2차인증</h2>
              <h5>아이디 비밀번호 분실시 활용됩니다</h5>
              <div className={style.temporary}>
                <img src={warningImg} />
                <p>아직 구현되지 않은 기능입니다</p>
              </div>
              <div className={style.selectBox}>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="phone"
                    // 임시 비활성화
                    disabled={true}
                    onChange={handleTypeChange}
                  />
                  휴대전화
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="email"
                    // 임시 비활성화
                    disabled={true}
                    onChange={handleTypeChange}
                  />
                  이메일
                </label>
              </div>
            </div>
            <div className={`${style.box} ${style.phone}`} ref={phoneBoxRef}>
              <div className={style.TSVInput}>
                <div className={style.boldText}>전화번호</div>
                <div>
                  <input
                    type="number"
                    placeholder="phone number"
                    name="data"
                    value={phone.data}
                    disabled={!isPhoneSelected}
                    onChange={handlePhoneChange}
                  />
                </div>
                <div>
                  <button type="button">인증번호 보내기</button>
                </div>
              </div>
              <div className={style.certNumber}>
                <div className={style.boldText}>인증번호 입력</div>
                <div>
                  <input
                    type="number"
                    placeholder="000000"
                    name="certified"
                    value={phone.certified}
                    disabled={!isPhoneSelected || phone.isCertified}
                    onChange={handlePhoneChange}
                  />
                </div>
                <div className={style.TSVBtnContainer}>
                  <button
                    disabled={!isPhoneSelected || phone.isCertified}
                    type="button"
                    onClick={handleCertifiedCheck}
                  >
                    확인
                  </button>
                  <p className={style.alert} ref={phoneAlertRef}>
                    {phoneAlert}
                  </p>
                </div>
              </div>
            </div>
            <div className={`${style.box} ${style.email}`} ref={emailBoxRef}>
              <div className={style.TSVInput}>
                <div className={style.boldText}>이메일 주소</div>
                <div>
                  <input
                    type="email"
                    name="data"
                    placeholder="email address"
                    value={email.data}
                    disabled={!isEmailSelected}
                    onChange={handleEmailChange}
                  />
                </div>
                <button type="button">인증번호 보내기</button>
              </div>
              <div className={style.certNumber}>
                <div className={style.boldText}>인증번호 입력</div>
                <div>
                  <input
                    type="number"
                    name="certified"
                    placeholder="000000"
                    value={email.certified}
                    disabled={!isEmailSelected || email.isCertified}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className={style.TSVBtnContainer}>
                  <button
                    disabled={!isEmailSelected || email.isCertified}
                    type="button"
                    onClick={handleCertifiedCheck}
                  >
                    확인
                  </button>
                  <p className={style.alert} ref={emailAlertRef}>
                    {emailAlert}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={style.signUpButtonContainer}>
            <button type="button" onClick={handleSignUp} disabled={isLoading}>
              회원 가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
