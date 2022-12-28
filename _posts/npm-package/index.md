---
title: "npm 패키지 배포하기 (+버전 업데이트)"
description: "Weekly Downloads 10,000을 향하여🔥"
date: "2022년 06월 12일 일요일"
tags: ["npm"]
coverImage: ""
ogImage:
  url: ""
---

# 들어가며

흔히, `npm i react` 처럼 패키지를 다운받고는 하는데 바로 그 `npm`에 내가 만든 패키지를 베포해서 개발 생태계에 자그마한 도움이 되어보자 😎

# npm package 배포하기

npm package를 배포하고 버전 업데이트까지 해볼 것이다.

## 사전 작업

1. 당연하게도, 배포할 코드를 준비한다.
2. README.md에 패키지 사용법을 작성해준다.
3. github에 패키지를 담을 레포를 만들고 푸시해준다.
4. npm사이트에 회원가입을 한 뒤, organization을 생성해준다.

organization을 생성하고 나면 우리가 npm 문서를 볼 때 자주 보던 레이아웃을 발견할 수 있고, 그 안에는 아직 아무 패키지도 없을 것이다.

![empty-npm-organization](/images/npm-package/empty-npm-organization.png)

## npm 배포하기

1. 배포하고자 하는 코드가 있는 폴더에 package.json 파일을 만들어주자. package.json을 만들어 주기 위해 git init 해주자.

```ts
git init
```

2. 그럼, package.json에 들어갈 몇 가지 정보에 대해 질문한다. 하나씩 차근히 대답해주자.

- () 괄호 안의 값은 default로 주어진 값으로 default 값을 사용할 것이라면 그냥 엔터 치면 되고, 수정하고 싶다면 그 옆에 적어주면 된다.
- package name은 말 그대로 사용자가 내 패키지를 설치하기 위해 작성하게 될 이름이다. 예를 들어 npm i react로 react를 설치하는 것처럼 내가 만든 패키지를 설치하려면 npm i @cecy/use-clipboard를 입력하면 된다. @cecy에서 cecy는 나의 organization 명이다.
- 나는 아래와 같이 입력했다.

```ts
package name: (useClipboard) @cecy/use-clipboard
version: (1.0.0)
description: React Hook to copy your text in clipboard
entry point: (index.js)
test command:
git repository: https://github.com/devcecy/custom-hooks
keyword: react, hooks, clipboard
author: devCecy <im.ceciliaan@gmail.com>
license:(ISC) MIT
```

모두 대답해주고 나면, 방금 내가 입력한 내용을 쭈-욱 보여주고 Is this OK? (yes)라고 친절하게 물어본다. 오타가 나거나 수정할 부분이 없다면 엔터를 해주자. 그럼 폴더에 package.json파일이 생성되어있을 것이다.

![package-json](/images/npm-package/package-json.png)

3. 내가 만든 패키지는 useRef를 사용했는데 이 패키지를 사용할 사용자가 useRef를 사용할 수 없는 환경일 수도 있다. 그래서 미리 환경을 만들어주자. 이 부분은 본인이 만든 패키지의 환경에 따라 설치해줘야 하는 부분이 다를 것이다. 나는 react와 react-dom을 package에 설치해 주었다.

```ts
npm i react react-dom
```

4. package.json안에 dependencies가 생성되었을 텐데, 이름을 peerDependencies로 변경해주자. peerDependencies는 @cecy/use-clipboard 패키지 사용을 위해 react와 react-dom이 필요함을 나타내지만, 만약 사용자가 두 가지 패키지를 모두 설치한 상황이라면 중복으로 설치하지 않도록 도와줄 것이다.

![peer-dependencies](/images/npm-package/peer-dependencies.png)

5. 패키지는 준비는 완성되었다. 이제 npm에 로그인을 해주자.

```ts
npm login
```

Username, Password, Email을 입력하고 나면 입력한 email로 1회성 코드를 보내준다. 메일함을 확인해서 코드를 입력해주자.

코드까지 입력해주고 나면 아래 문구가 나올 것이다.

```ts
Logged in as devcecy on https://registry.npmjs.org/.
```

6. 드.디.어 패키지를 배포할 차례!

아래 코드를 입력해주자. +cecy/use-clipboard@1.0.0이 나오면 배포가 완료된 것이다.

```ts
npm publish --access public
```

![published-npm](/images/npm-package/published-npm.png)

7. npm사이트로 돌아가 새로고침을 해보자. 그럼 패키지가 생성된 것을 알 수 있다.

![my-published-npm](/images/npm-package/my-published-npm.png)

## npm 패키지 업데이트

내가 올린 패키지를 install 해서 사용해보려고 하니 컴포넌트를 export 하지 않은 오류가 있었다. 그리고 description을 국문에서 영문으로 바꾸고 싶었다. 이 두 가지를 위해 패키지를 수정 후 업데이트 해주자. 의도치않은 오류로인해 버전업데이트까지 해보았다. 굳!

1. 먼저, 수정하고자 하는 코드를 수정하고 add, commit, push 모두 해준다.

2. 그리고 수정되기 원하는 버전을 아래와 같이 적어주면, 수정된 버전 v1.0.1이 터미널에 나올 것이다.

```ts
npm version 1.0.1
```

![npm-version-up](/images/npm-package/npm-version-up.png)

3. package.json에서 버전을 1.0.1로 수정해준 뒤,

4. npm publish로 다시 배포해주자.

```ts
npm publish
```

![new-published](/images/npm-package/new-published.png)

5. npm 페이지에 다시 들어가서 새로고침해보면 버전이 업데이트되었음을 확인할 수 있다. 업데이트 끝!

![my-new-published-npm](/images/npm-package/my-new-published-npm.png)

## 최종 패키지 구조

어떤 패키지를 만들었냐에 따라 패키지 구조는 모두 다를 수 있다. 그렇기 때문에 이 부분은 오로지 미래의 나를 위한 기록이다.

custom-hooks라는 프로젝트 안에 useClipboard폴더를 만들어 주었다. 추후 이곳에 usehooks를 더 추가할 예정이다.
node-modules는 react와 react-dom을 설치할 때 생성되었다.
index.js에는 export default를 선언해 주었다.

```ts
export { useClipboard as default } from "./useClipboard";
```

- package.json은 git init 후 생성되었다.
- README.md에는 패키지 사용법을 작성했다.
- 마지막으로, useClipboard.js에 usehook 코드가 작성되어있다. export 해주어야 한다 꼬옥!

![hook-structure](/images/npm-package/hook-structure.png)

# 마무리

사용만하던 npm에 내 코드를 올려보다니 감격스러웠다. 요즘 함수형 custom hook의 매력을에 빠져있어서 좀 더 유용하고 재밌는 hook을 만들어 배포해봐야겠다. 누군가 내 패키지를 다운받는 그날 까지,,,✨

## 참고

- 제가 예전에 작성했던 [npm 패키지 배포하기 (+버전 업데이트)](https://devcecy.tistory.com/10) 글을 옮겨온 것 입니다.
- [실전형 리액트 Hooks | #2 10 Publishing to NPM](https://www.youtube.com/watch?v=4P8Bb87hOf8)
