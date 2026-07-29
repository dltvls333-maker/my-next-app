1. import mysql from 'mysql2/promise';
역할: Node.js 환경에서 MySQL 데이터베이스에 접속할 수 있게 해주는 라이브러리(mysql2)를 불러옵니다.

참고: promise 버전을 사용하는 이유는 코드가 순서대로 깔끔하게 실행되도록(비동기 처리) 하기 위해서입니다.

2. export const query = async (sql: string) => { ... }
export: 이 함수를 다른 파일(예: layout.tsx)에서 불러다 쓸 수 있게 공개합니다.

async: 데이터베이스 접속은 시간이 걸리는 작업이므로, 기다려야 한다는 의미입니다.

3. 데이터베이스 접속 설정 (mysql.createConnection)
여기가 핵심입니다. PHPMyAdmin에서 접속할 때 사용하는 정보와 똑같아야 합니다.

host: 데이터베이스가 어디에 있는가? (내 컴퓨터면 localhost)

user & password: 데이터베이스에 들어갈 아이디와 비밀번호.

database: PHPMyAdmin 왼쪽에 보이는 실제 데이터베이스 이름을 입력해야 합니다.

4. await connection.execute(sql);
sql: SELECT * FROM site_settings와 같은 SQL 문장을 전달받습니다.

execute: 실제로 데이터베이스에 질문을 던지는 명령입니다. 결과(results)를 받아옵니다.

5. await connection.end();
역할: 일을 마쳤으니 데이터베이스와의 연결을 끊습니다.

중요성: 연결을 계속 열어두면 서버 자원이 낭비되므로, 질문하고 답을 받으면 바로 닫아주는 것이 좋습니다.

💡 실제로 적용할 때 주의할 점
.env 파일 사용: 위 코드처럼 아이디와 비밀번호를 코드에 직접 쓰면 보안에 매우 취약합니다. 나중에 프로젝트를 배포할 때는 반드시 .env 파일에 저장해서 사용하세요.

데이터베이스 이름 확인: 위 코드의 your_db_name 부분을 PHPMyAdmin에서 확인하신 실제 데이터베이스 이름(스키마명)으로 바꿔주세요.

패키지 설치: 터미널에서 npm install mysql2 명령어가 실행되어 있어야 이 코드가 정상 작동합니다.

이 코드를 lib/db.ts라는 파일로 저장해 두셨나요? 이제 이 파일을 layout.tsx에서 불러와서 데이터를 조회하기만 하면 됩니다! 혹시 DB 접속 정보(비밀번호 등)를 넣고 난 뒤에 발생하는 다른 에러가 있나요?