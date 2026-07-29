Bash
# 1. Prisma 라이브러리 설치
npm install prisma --save-dev
npm install @prisma/client

# 2. Prisma 초기화 (prisma 폴더와 .env 파일이 생성됩니다)
npx prisma init


좋습니다! Banner 모델 설계가 아주 깔끔하고 표준적입니다. 정렬 순서(sortOrder)와 활성화 여부(isActive)까지 챙기셨으니, 나중에 관리자 페이지에서 배너를 끄고 켜거나 순서를 바꾸는 기능까지 완벽하게 대응할 수 있겠네요.

이제 DB에 있는 배너 정보를 가져와서 메인 화면의 슬라이더에 뿌려주는 과정을 진행해 보겠습니다.

🚀 1단계: 마이그레이션 적용
먼저 작성하신 모델을 MySQL DB에 반영해야 합니다. 터미널에 입력하세요.

Bash
npx prisma migrate dev --name create_banner_table


사용 중인 Prisma 버전이 최신(Prisma 6 이상)으로 업데이트되면서, schema.prisma 파일에서 직접 url = env("DATABASE_URL")을 선언하는 방식이 Deprecated(지원 중단)되었기 때문에 발생하는 에러입니다.

최신 Prisma 환경에서는 데이터베이스 연결 정보를 prisma.config.ts 파일로 분리하거나, 환경 변수 로드 방식을 변경해야 합니다. 가장 빠르고 표준적인 해결책을 적용해 보겠습니다.

🛠️ 해결 방법: schema.prisma 수정 및 설정 변경
1. schema.prisma 파일 수정
schema.prisma 파일의 datasource 블록에서 url 라인을 제거하고, 데이터베이스 연결 방식을 명시적으로 선언합니다.

코드 스니펫
datasource db {
  provider = "mysql"
  // url 라인을 삭제합니다.
}
2. prisma.config.ts 파일 생성 (프로젝트 루트 경로)
프로젝트 최상위 경로에 prisma.config.ts 파일을 생성하고 아래 내용을 입력하여 환경 변수를 연결합니다.

TypeScript
// prisma.config.ts
import { defineConfig } from 'prisma';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
3. (중요) 환경 변수 확인
.env 파일에 DATABASE_URL이 제대로 설정되어 있는지 다시 한번 확인하세요.

코드 스니펫
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
⚠️ 왜 이런 이슈가 발생했나요?
최신 Prisma는 보안과 구성의 유연성을 위해 DB 연결 URL을 schema.prisma 파일 안에서 직접 관리하는 것을 지양하도록 정책이 변경되었습니다.

만약 위 설정으로도 해결되지 않고 기존 방식이 꼭 필요하다면, 현재 설치된 prisma 라이브러리의 버전을 잠시 낮추어(v5.x) 사용하는 방법도 있지만, 위와 같이 최신 설정 방식을 따르는 것이 향후 유지보수에 훨씬 유리합니다.

이렇게 설정 파일을 분리한 뒤, 터미널에서 다시 npx prisma generate를 실행해 보세요. 에러가 사라지고 정상적으로 클라이언트가 생성될 것입니다! 잘 해결되는지 바로 알려주세요.


1. 수정된 .env 파일
코드 스니펫
DATABASE_URL="mysql://root:@localhost:3306/eum_telecom_db"
(보시면 root: 뒤에 아무것도 없고 바로 @가 오죠? 이게 "비밀번호 없음"을 의미합니다.)

2. 바로 다음 단계: 데이터베이스 연결 테스트
이제 터미널에서 아래 명령어를 실행해 보세요. 아까 우리가 설정한 schema.prisma와 이 .env 정보를 기반으로 Prisma가 DB를 찾아 테이블을 생성할 것입니다.

Bash
# 1. 스키마를 DB에 적용 (테이블 banners가 생성됩니다)
npx prisma migrate dev --name init

# 2. 코드에서 DB를 사용할 수 있도록 클라이언트 생성
npx prisma generate


데이터베이스와 Next.js 코드를 연결하는 가장 중요한 두 단계를 완료하신 겁니다! 명령어가 정확히 어떤 일을 하는지 아주 쉽게 설명해 드릴게요.

1. npx prisma migrate dev --name init
이 명령어는 "내가 설정한 DB 구조(스키마)를 실제 데이터베이스에 현실로 만들어라"라는 뜻입니다.

npx: 내 컴퓨터에 설치된(로컬) Prisma 도구를 실행하라는 명령어입니다.

prisma migrate dev: 개발 환경에서 데이터베이스 구조를 변경할 때 사용하는 명령어입니다.

--name init: 이 변경 사항에 'init'(초기 설정)이라는 이름을 붙여 기록으로 남깁니다. 나중에 이 기록을 보고 다른 개발자나 실 서버에 똑같은 DB 구조를 복구할 수 있게 됩니다.

하는 일: schema.prisma 파일에 적어둔 Banner 모델 정보를 읽어서, phpMyAdmin의 eum_telecom_db 안에 banners라는 실제 테이블(표)을 생성합니다.

2. npx prisma generate
이 명령어는 "내 코드에서 DB를 쉽게 쓸 수 있도록 '번역기'를 만들어라"라는 뜻입니다.

prisma generate: schema.prisma 파일을 분석해서, 그 구조에 딱 맞는 Prisma Client(DB와 소통하는 자바스크립트/타입스크립트 라이브러리)를 자동으로 생성합니다.

하는 일: 이 명령어를 실행하고 나면, 코드에서 prisma.banner.findMany()처럼 아주 편하게 데이터베이스를 다룰 수 있게 됩니다. 이 과정이 없으면 코드가 DB 테이블 정보를 전혀 이해하지 못합니다.