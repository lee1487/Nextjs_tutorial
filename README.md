## nextjs tutorial

```
nextjs를 학습하는 이유는 node로 구축되어있는 webrtc를 react로 바꾸고 싶어서
리액트 훅을 공부하였으나 서버 코드를 또 express로 따로 구축해야되서 nextjs는 SSR까지
지원하기 때문에 학습하게 되었다.
이 학습으로 얻고자 하는 것은 기존 리액트 훅 방식을 nextjs와 같이 접목해서 webRTC를 react로 구축하는
방법의 실마리를 얻고자 하는 것이다.

BUT 학습하면 할 수록 Backend는 따로 구축 해야할 필요를 느낌
nextjs는 SSR과 CSR 관점에서 frontend 구축 framework 인것 같다.

youtube의 코딩앙마 강의를 학습한 내용이다.
https://www.youtube.com/channel/UCxft4RZ8lrK_BdPNz8NOP7Q
```

## chapter1 환경설정

```
npx create-next-app nextjs-tutorial

create-next-app 으로 설치하면
1. 컴파일과 번들링이 자동으로 된다 (webpack과 babel)
2. 자동 리프레쉬 기능으로 수정하면 화면에 바로 반영된다.
3. 서버사이드 렌더링(SSR)이 지원된다.
4. 스태틱 파일을 지원한다.

react css 라이브러리
yarn add semantic-ui-react semantic-ui-css
semantic css는 _app.js에 import해서 사용하면 된다.

이미지 unsplash 사이트 이용
```

## pages

```
1. pages폴더 안에 각 페이지를 만들면 별도의 라우팅 처리없이 라우팅이 지원된다.
2. Dynamic 라우팅도 지원
    ex) pages밑에 view 폴더 만들고 [id].js 파일을 만들면
    https://localhost:3000/view/:id

```

## \_app.js

```
_document.js보다 먼저 실행된다.

import "semantic-ui-css/semantic.min.css";
1. 레이아웃을 만들기 위해서는 _app.js 파일을 사용
2. 모든 페이지는 이곳을 통한다.
_app.js를 이용시
3. 페이지 전환시 레이아웃을 유지할 수 있다
4. 페이지 전환시 상태값을 유지할 수 있다.
5. componentDidCatch를 이용해서 커스텀 에러 핸들링을 할 수 있다.
6. 추가적인 데이터를 페이지로 주입시키는게 가능하다.
7. 글로벌 CSS를 이곳에 선언한다. -> 전페이지에서 작동하는 css를 여기서 선언할 수 있다.
  -> 이방식 말고도 모듈css 선언 및 인라인 방식이 있다 (추가 검색 필요)

Component는 현재 페이지를 의미한다. 페이지 전환시에 이 Component 가 변경된다.
pageProps는 dataFetchingMethod를 통해 미리 가져온 초기 객체이다. 이메소드를 사용하지 않으면 빈 객체를 전달한다.
  -> 이부분은 SSR 진행시 자세하게 다룰 예정
```

## \_document.js

```
_document.js는 static html를 구성하기위한 _app.js에서 구성한 Html body가 어떤 형태로 들어갈지 구성하는 곳이다.
Content들을 브라우저가 html로 이해하도록 구조화 시켜주는 곳이라고 이해하면 쉽다.

1. 서버에서만 작동하므로 onClick 이벤트 같은것은 먹히지 않음
2. css도 먹히지 않는다.
3. _app.js에서 사용하는 Head와 _document.js에서 사용하는 Head의 쓰임이 다르다
    meta, title 같은 경우 _app.js나 각 component에서 사용해야 한다
```

## public

```
1. 정적인 파일 관리 가능
2. pages 밑에 같은 이름의 파일이 존재하면 에러가 발생하기 때문에 주의 필요
```

## 추가 지식

```
- Next js는 기본적으로 모든 페이지를 사전 렌더링한다. (Pre-rendering) 즉, 미리 html 파일을 만들어 두는것
- Pre-rendering은 더 좋은 퍼포먼스를 내고 검색엔진 최적화(SEO)에도 좋다.
- 프리랜더링의 형태에는 2가지 형태가 있다.
  - 정적생성
  - Server Side Rendering (SSR, Dynamic Rendering)
  - 차이점은 '언제 html 파일을 생성하는 가?'에 있다.

  [정적 생성]
   - 프로젝트가 빌드하는 시점에 html 파일들이 생성
   - 모든 요청에 그 파일들을 재사용 한다. 즉, 파일들을 쭉 만들어놓고 호출이 들어올때마다 재활용 하는 것
   - 퍼포먼스 이유로, Next js는 정적 생성을 권고한다.
   - 정적 생성된 페이지들은 CDN에 캐시가 된다.
   사용법
    - getStaticProps / getStaticPaths를 사용하면됨.
   사용처(미리만들어둬도 되는 경우)
    - 마케팅 페이지
    - 블로그 게시물
    - 제품 목록
    - 도움말, 문서

  [SSR]
   - 매 요청마다 html 파일들을 생성
   - 항상 최신 상태를 유지
   사용법
    - getServerSideProps
   사용처
    - 관리자 페이지
    - 분석차트

  그럼 정적 생성과 SSR의 사용은 어떻게 구분하면 될까요?
   - 유저가 요청하기전에 미리 페이지를 만들어 놔도 상관없으면 정적생성을 사용하면된다.
```

## \.env.development \.env.production

```
개발환경과 실사용환경 구별 해서 사용하는 법
.env.development .env.production

사용법
node js에서는(서버 환경)
process.env.변수명

brower에서는(클라이언트 환경)
process.env.NEXT_PUBLIC_변수명


```
