import data from "./mock.json";

// SignInPage의 로그인 버튼 함수
export async function signIn({ id, password }) {
  // 서버와의 작업은 mock 데이터로 대체함
  for (const user of data) {
    if (user.userId === id && user.uesrPassword === password) {
      // 아이디/비밀번호가 올바르면 Response를 리턴함
      const response = {
        userName: user.userName,
        userId: user.userId,
        userPassword: user.userPassword,
      };
      return response;
    }
  }

  // 아이디/비밀번호가 틀리면 undefined를 리턴함
  return undefined;
}

// SignUpPage의 아이디 중복 확인 버튼 함수
export async function getIsDuplicate(id) {
  // 서버와의 작업은 mock 데이터로 대체함
  for (const user of data) {
    if (user.userId === id) {
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

// 특정 유저의 전체 데이터 요청 함수
export async function getUserData(userId) {
  // 서버와의 작업은 mock 데이터로 대체함
  for (const user of data) {
    if (user.userId === userId) {
      return user;
    }
  }
}

// 한 유저의 모든 스페이스 데이터 요청 함수
export async function getSpaces(userId = "testid1") {
  const user = await getUserData(userId);
  return user.spaces;
}

// 한 유저의 특정 스페이스 데이터 요청 함수
export async function getSpace(userId = "testid1", spaceId = 1) {
  const userData = await getUserData(userId);
  const spaces = userData.spaces;
  for (const space of spaces) {
    if (space.spaceId == spaceId) {
      return space;
    }
  }
}

// 특정 유저의 투두 데이터 요청 함수
export async function getTodo(userId = "testid1", spaceId = 1) {
  const space = await getSpace(userId, spaceId);
  return space.todoItems;
}

// 특정 유저의 캘린더 데이터 요청 함수
export async function getCalendar(userId = "testid1", spaceId = 1) {
  const space = await getSpace(userId, spaceId);
  return space.calendarItems;
}
