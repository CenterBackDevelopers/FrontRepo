import signInData from "./signin-mock.json";

// SignInPage의 로그인 버튼 함수
export async function signIn({ id, password }) {
  // 서버와의 작업은 signin-mock으로 대체함
  for (let data of signInData) {
    if (data.id === id && data.password === password) {
      // 아이디/비밀번호가 올바르면 true를 리턴함
      return true;
    }
  }

  // 아이디/비밀번호가 틀리면 false를 리턴함
  return false;
}

// SignUpPage의 아이디 중복 확인 버튼 함수
export async function getIsDuplicate(id) {
  // 서버와의 작업은 signin-mock으로 대체함
  for (let data of signInData) {
    if (data.id === id) {
      console.log("id 중복");
      // 아이디가 중복되면 true를 리턴함
      return true;
    }
  }

  // 중복되지 않으면 false를 리턴함
  return false;
}

// SignUpPage의 회원 가입 함수
export async function postSignUp(member) {
  // 회원 가입이 완료되면 response를 반환함
  // 임시로 true로 함
  console.log("회원 가입이 완료됨");
  console.log(member);
  return true;
}
