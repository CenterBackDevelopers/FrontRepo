# 📃 Todolist

## 구현할 기능 목록
### 1. 💻 회원 관리
#### 이름 조건
  1. 1자리 ~ 15자리로 구성될 것
#### 아이디 조건
  1. 이미 DB에 존재하는 아이디와 중복되지 않을 것
  2. 4자리 ~ 20자리로 구성될 것
  3. 특수문자 금지
#### 비밀번호 조건
  1. 6자리 ~ 20자리로 구성될 것
  2. 특수문자 금지
#### 비밀번호 확인
  1. 사용자가 입력한 비밀번호와 일치하는지, 일치하지 않는지에 따라 문구 출력
  2. 비밀번호 확인 인풋이 비어 있을 경우 문구를 출력하지 않음
#### 2차 인증(구현할지 확정되지 않음)
  1. 휴대전화 번호와 이메일 번호중 하나를 선택해 2차 인증 가능
#### 회원 가입 버튼 조건
  1. 이름 조건(자릿수)을 만족할 것
  2. 아이디 조건(중복, 자릿수, 특수문자)을 만족할 것
  3. 비밀번호 조건(자릿수, 특수문자)을 만족할 것
  4. 비밀번호와 비밀번호 확인 입력값이 일치할 것
  5. 2차 인증이 성공할 것(미구현)

### 2. 🔓 로그인
아이디 비밀번호를 제대로 입력시, 해당 사용자의 Default Space 페이지로 이동시킴  
아이디 혹은 비밀번호가 올바르지 않다면 안내 문구 생성

### 3. 📃 투두리스트
#### 일정 주기마다 해야할 일의 목록
  - 며칠 주기 혹은 어떤 요일마다 초기화될지, 아이템별로 지정할 수 있음

### 4. 📅 캘린더
#### 특정 날짜까지 해야할 일의 목록
  - 처음 캘린더로 들어가면, 존재하는 모든 아이템들이 출력됨
  - 위의 달력에서 특정 날짜를 클릭하면, 해당 날짜의 아이템들만 출력됨

### 5. 🎪 스페이스
- 스페이스가 없는 사용자는 웰컴 페이지로 이동
    - 내 투두리스트 만들기, 다른 사람의 투두리스트 참여하기 중 선택하게 함
- 탭을 통해 메뉴/투두리스트/캘린더/관리로 이동할 수 있게 함
    1. 메뉴
      - 자주 사용하지 않을 기능들을 모아놓음
        1. 다른 사람의 스페이스 참여하기
    3. 투두리스트
      - 투두리스트로 이동함
    4. 캘린더
      - 캘린더로 이동함
    5. 관리
      - 현재 스페이스와 관련된 설정들을 관리함
        1. 현재 스페이스를 다른 사람과 공유하기(초대 코드 생성)
- 스페이스별로 투두리스트/캘린더/관리 구성 가능
