2번 prisma 스키마 업데이트는 왜 해주는거야?

Prisma 스키마(schema.prisma)를 업데이트하는 이유는 "우리가 만든 데이터베이스 테이블과, 우리 프로젝트의 코드가 서로 대화할 수 있게 다리를 놓아주는 작업"이기 때문입니다.

구체적으로 왜 필요한지 3가지 이유로 설명해 드릴게요.

1. 타입 안정성 (TypeScript의 강력한 기능)
우리가 companyInfo라는 테이블을 DB에 만들었더라도, 코드(Next.js)는 그 테이블이 존재하는지 모릅니다. 스키마에 내용을 추가하고 npx prisma generate를 하면, Prisma가 DB 구조를 읽어서 "아, companyInfo 테이블에는 company_name이라는 문자열(String)이 있구나!"라고 코드가 이해할 수 있는 타입 정보를 생성해 줍니다.

덕분에 코드를 짤 때 info.company_name이라고 입력하면 자동 완성이 되고, 실수로 이름을 틀리게 입력하면 빨간 줄로 경고를 띄워줍니다.

2. 코드와 DB의 동기화
Next.js의 Prisma 클라이언트는 우리가 작성한 schema.prisma를 기반으로 동작합니다. 스키마를 업데이트하지 않으면 Prisma는 "나는 그런 companyInfo라는 테이블을 본 적이 없는데?"라고 반응합니다. 스키마를 업데이트해야만 우리가 만든 API 코드(prisma.companyInfo.findUnique)가 실제로 동작할 수 있습니다.

3. 데이터 모델 관리 (설계도)
Prisma 스키마는 데이터베이스의 설계도(Blueprint) 역할을 합니다.

설계도: 나중에 프로젝트 규모가 커져서 테이블이 10개, 20개가 되었을 때, DB에 접속하지 않고도 schema.prisma 파일만 보면 우리 프로젝트가 어떤 데이터를 어떤 구조로 저장하고 있는지 한눈에 파악할 수 있습니다.

💡 요약하자면:
DB에는 테이블 생성: 데이터를 실제로 저장할 공간을 만듭니다.

Prisma 스키마 업데이트: "DB에 이런 공간이 생겼으니, 코드에서도 이 이름을 사용할 수 있게 해 줘!"라고 Prisma에게 알려주는 과정입니다.

결론: 이 과정을 거치지 않으면 DB는 멀쩡한데 코드에서는 자꾸 "그런 이름의 테이블을 찾을 수 없다(companyInfo does not exist)"는 에러가 발생하게 됩니다. 그러니 꼭 해주셔야 합니다!

이제 schema.prisma 파일 수정하고 npx prisma generate까지 완료하셨나요?




1. 역할 분담: "누가 무엇을 하는가?"
page.tsx (서버 컴포넌트 - 관리자 및 감독):

사용자가 처음 페이지에 들어올 때, DB에서 배너 목록을 직접 조회해 옵니다(prisma.banners.findMany).

조회된 배너 데이터를 바탕으로 BannerCard들을 화면에 깔아줍니다.

배너 추가 버튼을 관리하며, 클릭 시 DB에 데이터를 넣는 임무를 수행합니다.

BannerCard.tsx (클라이언트 컴포넌트 - 실무자):

"use client"가 명시되어 있어 사용자의 클릭, 수정, 파일 선택 같은 입력을 직접 받습니다.

상태 관리(useState)를 통해 일반 보기 모드와 수정 입력창 모드를 자유롭게 전환합니다.

데이터 변경이 필요할 때 actions.ts에게 "이 ID의 배너를 이렇게 바꿔줘!"라고 요청합니다.

actions.ts (서버 액션 - 주방장):

브라우저에서 보낸 요청을 받아 데이터베이스를 직접 수정합니다.

fs 모듈을 이용해 이미지를 서버 폴더에 저장하고, DB에는 그 경로를 기록합니다.

핵심: 작업이 끝나면 revalidatePath('/admin')을 호출하여, Next.js에게 "이제 화면의 배너 목록이 바뀌었으니, page.tsx를 다시 실행해서 화면을 갱신해!"라고 알립니다.

2. 데이터 흐름도: "주문부터 요리까지"
조회(Initial Load): page.tsx가 DB에서 데이터를 가져와 브라우저로 보냅니다.

상호작용(Action Trigger): BannerCard에서 저장 버튼을 누르면 actions.ts의 updateBannerWithFile 함수가 호출됩니다.

데이터 변경(Mutation): actions.ts가 DB를 수정합니다.

갱신(Revalidation): revalidatePath가 실행되면, Next.js는 page.tsx를 다시 렌더링하고, 새롭게 바뀐 데이터를 BannerCard에 다시 전달하여 화면이 자동으로 최신화됩니다.

3. 코드의 포인트
action={async (formData) => ...}: 이 부분은 전통적인 onSubmit 함수 없이도 서버 액션을 호출하는 아주 간편한 방법입니다. formData 안에 input 태그들의 내용(제목, 파일 등)이 자동으로 들어있어 편리합니다.

input type="hidden": 사용자가 수정 화면에서 무엇을 선택하든, 현재 배너의 ID나 이미지 경로를 서버로 몰래 전달하기 위해 사용했습니다.

파일 처리: 브라우저에서 file 타입의 input을 통해 전달받은 데이터는 formData를 통해 ArrayBuffer 형태로 서버에 안전하게 넘겨집니다.

요약하자면
이 코드는 "화면(클라이언트) - 로직(서버 액션) - 데이터(DB)"가 revalidatePath라는 연결 고리를 통해 아주 긴밀하게 움직이도록 설계되었습니다. 사용자는 새로고침을 하지 않아도 배너가 등록, 수정, 삭제되는 과정을 실시간으로 체감할 수 있습니다.

이 구조는 유지보수가 매우 쉽습니다. 만약 새로운 기능을 추가하고 싶다면 actions.ts에 함수만 추가하면 되고, 화면 디자인을 바꾸고 싶다면 BannerCard.tsx만 건드리면 되니까요! 궁금한 점이 더 있으신가요?


 if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // public/images 폴더에 저장 (파일 이름은 예시로 id를 사용)
    const fileName = `${id}.png`;
    const filePath = path.join(process.cwd(), 'public/images', fileName);
    
    await fs.writeFile(filePath, buffer);
    imageUrl = `/images/${fileName}`; // DB에 저장될 경로
  }

  await prisma.banners.update({
    where: { id },
    data: { 
      title: title, 
      image_url: imageUrl 
    }
  });


  1. 파일 데이터 추출 및 변환
TypeScript
if (file && file.size > 0) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
if (file && file.size > 0): 사용자가 파일을 선택했는지, 그리고 선택한 파일이 비어있지 않은지 검사합니다.

file.arrayBuffer(): 브라우저에서 날아온 파일(Blob) 데이터를 메모리에 올릴 수 있는 이진 데이터(ArrayBuffer) 형태로 변환합니다.

Buffer.from(bytes): Node.js 환경에서 파일을 처리하기 위해 이진 데이터를 Node.js의 Buffer 객체로 감쌉니다. 이렇게 해야 서버 파일 시스템에 쓸 수 있습니다.

2. 저장 경로 설정
TypeScript
const fileName = `${id}.png`;
const filePath = path.join(process.cwd(), 'public/images', fileName);
fileName = ${id}.png: 파일 이름을 현재 배너의 id를 따서 정합니다(예: 1.png). 나중에 이미지를 찾을 때 이 id만 알면 쉽게 찾을 수 있습니다.

process.cwd(): 프로젝트의 최상위 루트 경로를 가져옵니다.

path.join(...): 운영체제(Windows/Linux)마다 경로 구분자(\ 또는 /)가 다른데, 이를 자동으로 맞춰서 프로젝트/public/images/1.png라는 완성된 경로를 만듭니다.

3. 서버에 실제 파일 저장
TypeScript
await fs.writeFile(filePath, buffer);
imageUrl = `/images/${fileName}`;
fs.writeFile(filePath, buffer): 서버의 실제 하드디스크(public/images/)에 위에서 준비한 파일을 생성하고 내용을 씁니다.

imageUrl = ...: 이제 웹 브라우저에서 이 이미지에 접근할 수 있는 경로(http://localhost:3000/images/1.png)를 변수에 담습니다. 이 경로가 나중에 DB에 저장됩니다.

4. 데이터베이스 업데이트
TypeScript
await prisma.banners.update({
  where: { id },
  data: { 
    title: title, 
    image_url: imageUrl 
  }
});
prisma.banners.update: 데이터베이스의 banners 테이블에서 해당 id를 가진 행을 찾습니다.

data: { ... }: 수정할 내용을 입력합니다.

title: 사용자가 입력한 새로운 제목으로 교체합니다.

image_url: 방금 저장한 실제 파일 경로(/images/1.png)로 교체합니다.

이렇게 함으로써 다음번 페이지 새로고침 때 <img> 태그가 이 새로운 경로를 읽어와 이미지를 보여주게 됩니다.

핵심 요약: 왜 이렇게 복잡해 보일까?
이 과정이 필요한 이유는 데이터베이스와 파일 저장소는 별개의 공간이기 때문입니다.

DB(Prisma)는 데이터(글자, 숫자, 경로)만 관리합니다. 파일 자체를 DB에 직접 넣으면 DB가 너무 무거워지고 느려지기 때문입니다.

그래서 파일은 하드디스크(public/)에 저장하고, DB에는 그 파일이 어디 있는지(경로)만 기록하는 '링크' 방식을 사용하는 것입니다.

이제 왜 파일 저장과 DB 업데이트가 한 세트로 움직여야 하는지 이해가 되시나요? 혹시 public/images 폴더가 실제로 생성되는 과정에서 궁금한 점이 더 있으신가요?