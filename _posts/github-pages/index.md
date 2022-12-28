---
title: "GitHub Pages로 프로젝트 배포하기 (+ 404에러 & 빈 페이지에러 해결)"
description: "간단한게 제일 좋아-! 친구들 모여라-!"
date: "2022년 06월 15일 수요일"
tags: ["github-pages", "배포"]
coverImage: ""
ogImage:
  url: ""
---

# 들어가며

개인 프로젝트를 아-주 간단하게 배포해보자.  
GitHub Pages는 깃헙 레포에 있는 코드를 웹으로 배포해주는데 배포 방법이 아주 간단하고 심지어 무료다. ✨

# GitHub Pages로 프로젝트 배포하기

시-작 !

## 사전작업

- 배포할 코드를 준비해준다.
- repository를 만들고 연결해 준다.

## 배포를 위한 아주 약간의 작업 시작

1. gh-pages를 설치해준다.

```ts
npm i gh-pages
```

2. package.json에 deploy 스크립트를 추가해준다.  
   predeploy 스크립트는 말 그대로 deploy 스크립트 실행 전에 실행해 주는 스크립트다.
   deploy(npm run deploy)를 하기 전에 build(npm run build)를 먼저 해줘 야하기 때문에 predeploy에 build스크립트를 적어주었다.

```ts
"scripts": {
    ...
    "deploy": "gh-pages -d build",
    "predeploy": "npm run build"
  },
```

3. package.json 가장 하단에 배포될 주소를 생성해 준다.

- git remote -v : repository명 혹은 연결된 repository가 있는지 확인해 볼 수 있다.
- 연결된 repository가 없다면 먼저 깃헙에 repository를 새로 생성하고 git remote add origin [repository주소]로 연결해주자.
- username에 대문자가 들어간다면 소문자로 바꿔서 적어주자. devCecy -> devcecy

```ts
// 예시
"homepage": "https://[github username].github.io/[repository명]"

// 실제
"homepage": "https://devcecy.github.io/todo-app"
```

4. 다 준비되었으니, deploy!  
   npm run deploy를 하면 predeploy로 npm run build가 먼저 실행되고, 그다음으로 deploy 스크립트가 실행되는 것을 알 수 있다.

   ```ts
   npm run deploy
   ```

   ![github-pages-published](/images/github-pages/github-pages-published.png)

5. homepage에 적었던 주소로 들어가 보자. 배포가 완료되었을 것이다. 끝! 🎉

## 404 에러가 났다면,

- 바로 들어가면 404 에러가 나 있을 수 있다. 조금 기다려준다. 3분 정도?
- 자세한 배포 상황을 알고 싶다면 깃헙 repository로 들어가 보자. 오른쪽 하단에 Envirenments로 들어가면 deployment history를 볼 수 있다. 수정해서 재 배포했다면 그 내역을 확인할 수 있다.
- Active 태그가 붙어있으면 배포가 완료된 것이다. 배포 중이면 pending(기억이 가물가물..)라고 나올 것이다.

![github-pages-active](/images/github-pages/github-pages-active.png)

## 빈페이지가 뜬다면,

- 라우팅 설정을 한 파일을 찾아가, BrowerRouter에 basename을 추가해준다.
- process.env.PUBLIC_URL이 개발모드에 따라 동적으로 경로를 설정해 줄 것이다.

```ts
   <BrowserRouter basename={process.env.PUBLIC_URL}>
```

# 마무리

개인 프로젝트 올린다고 A더블유S 가장 저렴한 요금제 사용했다가 매달 야금야금 돈도 나가고, 올리는 과정도 쉽지 않았는데🥲 github pages는 그에 비해 진짜 간단하다. 개인 프로젝트 올리고 확인하는 용도로 사용하기 좋을 것 같다!

## 참고

- 제가 예전에 작성했던 [GitHub Pages로 프로젝트 배포하기 (+ 404에러 & 빈 페이지에러 해결)](https://devcecy.tistory.com/11) 글을 옮겨온 것 입니다.
- [6 7 Publishing (노마드코더)](https://www.youtube.com/watch?v=SZxVDGAZPsk)
