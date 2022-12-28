---
title: "tsconfig.json 뜯어보기"
description: "씹고 뜯고 맛보고 즐기고"
date: "2022년 10월 12일 수요일"
tags: ["Typescript"]
coverImage: ""
ogImage:
  url: ""
---

# 들어가며

거의 모든 프로젝트에서 타입스크립트를 사용하고 있지만 그동안 tsconfig.json에 대해서는 조금 무심하지 않았나싶다. 알고보면 참 쉬운 tsconfig.json의 몇가지 주요 속성에 대해서 알아보자.

# tsconfig.json 뜯어보기

프로젝트의 root폴더에 tsconfig.json을 만들어주면, ts를 사용하는 프로젝트라는 것을 인식한다. tsconfig.json 파일 내부 주요 설정을 살펴보자.

```json
// tsconfig.json

{
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
  "compilerOptions": {
    "outDir": "build",
    "target": "es6",
    "lib": ["ES6", "DOM"],
    "allowJs": true,
    }
}
```

- `include` : 컴파일할 파일은 어떤것이야/어디에있어?
- `exclude` : 컴파일에서 제외할 파일은 어떤것이야/어디에있어?
- `outDir` : 컴파일된 js파일을 어디에 생성할까?  
  npm run build 해주면 build폴더에 컴파일된 index.js 파일이 생성된 것을 확인 할 수있다.

![build-folder](/images/tsconfig-json/build-folder.png)

</br>

- `target` : 컴파일 하고 싶은 js버전이 어떤거야?

```ts
// 컴파일 전
const hello = () => "hi";
```

target 설정 없이 위 코드를 컴파일 하면 기본값인 js ES3버전으로 아래와 같이 컴파일된다. const는 var로, ()=>{} 화살표 함수는 function(){} 함수로 컴파일 되는 것이다.

```ts
// build/index.js
var hello = function () {
	return "hi";
};
```

target을 "es6"로 설정한 뒤 컴파일 해주면 아래와 같이 컴파일 된다. 공식문서에 의하면 모던브라우저는 ES6를 지원하므로 ES6로 설정해주는것은 좋은 선택이라고 한다. (Modern browsers support all ES6 features, so ES6 is a good choice.)

```ts
// build/index.js
const hello = () => "hi";
```

</br>

- `lib` : ts를 어떤 환경에서 사용할거야?

"ES6"로 설정해주면 서버에서 사용하는 것으로 인식한다. "DOM"을 설정해주면 브러우저에서 사용하는것을 인식한다. 설정에 따라 코드가 동작하는 환경의 내장 api를 자동완성으로 보여준다.

"lib": ["DOM"] 을 설정해주면, 브라우저 내장 api들을 자동완성으로 보여준다.

![lib-dom](/images/tsconfig-json/lib-dom.png)

"lib": ["DOM"] 설정을 해주지 않으면 ts는 ts를 브라우저에서 사용한다는것을 알지 못하므로 document에 에러 표시가 나고 자동완성도 해주지 않는다.

![lib-empty](/images/tsconfig-json/lib-empty.png)

</br>

- `allowJs` : .js파일의 컴파일을 허용한다. js에서 ts로 마이그레이션 하는 경우 사용하면 좋은 속성이다.

참고로, .js파일 내에서도 타입체크를 하고싶다면? 파일 상단에 `// @ts-check`을 적어주고 주석으로 코멘트(JSDoc)를 달아주면 된다.

```ts
// @ts-check

/**
 * 프로젝트를 초기화 해준다.
 * @param {object} config
 * @param {string} config.url
 * @returns {boolean} 초기화 여부가 반환된다.
 */
export const init = (config) => {
	return true;
};

/**
 * 프로젝트를 종료 해준다.
 * @param {number} code
 * @returns {number} 프로젝트 종료 코드가 반환된다.
 */
export const exit = (code) => {
	return code + 1;
};
```

코멘트로 returns를 {void}로 지정해주니, 실제 init 함수의 리턴값은 boolean이라 에러가 난다. 이렇게 .js파일에서 타입을 체크해 줄 수도 있다.

![retrun-void](/images/tsconfig-json/retrun-void.png)

함수위에 마우스를 올려보면 주석으로 달아놓은 타입을 확인 할 수있다.

![mouse-over](/images/tsconfig-json/mouse-over.png)

# 마무리

이외에도 다양한 속성이 있으며 자세한 사항은 [Typescript 공식문서](https://www.typescriptlang.org/tsconfig)를 통해 확인해 볼 수 있다. 자주 사용하는 속성이 더 있는데 조금씩 추가해야겠다. ☕️

## 참고

- 제가 예전에 작성했던 [[타입스크립트] tsconfig.json 살펴보기](https://devcecy.tistory.com/18) 글을 옮겨온 후 보강한 내용입니다.
