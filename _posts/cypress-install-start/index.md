---
title: "Cypress로 E2E테스트 도입하기 (feat.React)"
description: "인간은 실수하기에 cypress가 필요해요."
date: "2022년 12월 20일 화요일"
tags: ["cypress", "테스트"]
coverImage: ""
ogImage:
  url: ""
---

# 들어가며

Cypress를 도입해 보겠다는 생각은 Cypress의 존재를 알고 난 후로 쭈-욱 해왔지만 막상 업무를 하다보면 Cypress는 뒷전이 되고 말았습니다. 그러던 어느날, 회사 서비스에서 사용 중인 외부 sdk를 테스트 하기위해 개발서버에서 sdk를 테스트 모드로 전환해 두었는데 그것을 잊고 실 서버에 배포했습니다. 그래서 사용자가 테스트모드를 마주하게되었습니다.

현재 회사는 QA없이 배포가 이뤄지는 환경이라 스스로 프론트엔드 환경 전반에 대해 책임져야하는데 스스로 꼼꼼하다고 생각함에도 저는 인간인지라 실수가 발생했습니다. 그래서 테스트 코드의 도입이 시급하다는 생각이 들었습니다.

Cypress는 서비스가 브라우저에서 예상한대로 작동하는지를 사용자 관점에서 테스트 할 수 있는 E2E(end to end) 테스팅 라이브러리 입니다. 예를들면, 사용자가 웹 서비스에 접근을 했을 때 메인페이지가 예상한대로 노출이 되는지, 마이페이지 버튼을 클릭하면 의도대로 마이페이지로 전환이 되는지 등에 대해 테스트 할 수 있습니다.

# Cypress 시작하기

Cypress를 설치하고, 테스트 코드를 작성해 보겠습니다.

## Cypress 설치하기

1.Cypress를 설치해줍니다.  
 테스트 개발환경에서만 사용할것이기 때문에 -D 를 붙여 devDependency에 설치해줍니다.

```ts
npm i -D cypress
```

package.json의 devDependencies에 cypress가 설치된것을 확인 할 수 있습니다.

![cypress설치완료](/images/cypress/installed-cypress.png)

</br>

2.아래 커맨드를 사용해 Cypress를 오픈해 봅시다.  
 오픈된 첫 화면에서 왼쪽의 E2E Testing을 클릭해주면 프로젝트 루트폴더에 `cypress`폴더와 `cypress.config.ts`파일이 생성된것을 확인 할 수 있습니다.

```ts
npx cypress open
```

![cypress 오픈 후 생성된 파일](/images/cypress/after-install-cypress.png)

</br>

3.생성된 cypress 폴더를 확인해 보겠습니다.

![cypress 초기 파일 구조](/images/cypress/cypress-first-file-destructure.png)

- `fixtures`폴더에는 모킹할 정적 데이터 파일을 작성할 수 있습니다. 예시로 example.json 파일이 담겨 있습니다.
- `support`폴더에는 테스트코드가 실행되기 전에 실행될 커스텀 커맨드나 재사용할 테스트 코드 등을 작성할 수 있습니다.

</br>

3-1. 테스트 코드를 작성하기 위해서 cypress폴더 내부에 `e2e`라는 이름의 폴더를 생성해 줍니다. 그리고 그 내부에 테스트 파일을 생성해 줍니다. `테스트파일.cy.ts`로 생성할 수 있습니다. (js를 사용한다면 테스트파일.cy.js)

저는 먼저 헤더를 테스트 해주기위해 `layout`폴더에 `header.cy.ts`파일을 생성했습니다.

![cypress-e2e-file](/images/cypress/cypress-e2e-folder.png)

</br>

4.이번에는 cypress.config.ts 파일을 확인해 봅시다.

- 이 파일을 통해 여러 설정값을 작성해 줄 수 있는데, 일단! `baseUrl`만 추가하도록 하겠습니다.
- baseUrl은 cy.visit()나 cy.request() 커맨드 사용시 프리픽스로 사용됩니다. 예를들어, `cy.visit('/mypage')`라고 코드를 작성하면 `http://localhost.com/mypage`로 이동할 되는 것 입니다.

![cypress.config.ts 파일](/images/cypress/cypress-config-file.png)

5.(옵션) 저는 package.json 파일에 Cypress의 오픈과 실행을 스크립트로 추가해서 사용하겠습니다.

```json
"scripts": {
	...
	"cy:open": "cypress open", // npm run cy:open 으로 사용
	"cy:run": "npx cypress run" // npm run cy:run 으로 사용
}
```

## 테스트코드 작성하기

이제 드디어! 본격적으로! 테스트 코드를 작성해 보겠습니다.

아주 간단한 테스트를 작성하여 cypress가 어떻게 동작하는지 확인해 보려합니다.
제 블로그의 헤더에는 `DEVCECY LOG`라는 텍스트가 있습니다. 사용자가 블로그 메인으로 진입시 이 텍스트가 잘 로드되는지 확인해 보겠습니다.

cypress 폴더 내에 작성하는 테스트 코드입니다.

```ts
// cypress > e2e > layout > header.cy.ts

describe("헤더 테스트", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000");
	});

	it("메인페이지에 진입하면, 헤더에 DEVCECY LOG 텍스트가 로드된다.", () => {
		cy.visit("/");
		cy.get(".nav-home-btn").should("exist").contains("DEVCECY LOG");
	});
});
```

그리고 'DEVCECY LOG' 텍스트가 존재하는 곳에 className으로 "nav-home-btn"을 적어주었습니다.

```html
<NavItem href="/" props="home" className="nav-home-btn"> DEVCECY LOG </NavItem>
```

</br>

위의 테스트 코드를 뜯어보겠습니다.

- `beforeEach`는 각각의 `it`이 실행되기 전 반복적으로 실행될 함수입니다.
- `describe`의 첫번째 인자에는 실행할 테스트 전반에 대한 설명을 적어줍니다. 그리고 다음 인자에 `it`을 통해 여러개의 테스트를 작성해 줄 수 있습니다.
- `it`의 첫번째 인자에는 각각의 테스트에 대한 설명을 적어줍니다. 예를들어 현재는 DEVCECY LOG텍스트가 로드 되는것만 확인하고 있지만, 새로운 it안에 About 텍스트가 로드되는지도 확인해 볼 수 있습니다. 두번째 인자에는 테스트함수를 작성해줍니다.
- `cy.get`(".nav-home-btn")의 `.get`은 selector 또는 alias를 통해 하나 혹은 그 이상의 DOM 엘리먼트 가져옵니다. 위 코드에서는 .nav-home-btn라는 클래스명을 가진 엘리먼트를 가져와라! 라는 뜻으로 이해할 수 있습니다.
- `.should`("exist")는 "exist" 해야만한다(should) 라는 뜻으로 직관적으로 이해할 수 있습니다.
- `.contains`("DEVCECY LOG") 또한 "DEVCECY LOG"을 포함(contains)한다, 입니다.
- 결국, `cy.get(".nav-home-btn").should("exist").contains("DEVCECY LOG")`는 .nav-home-btn 엘리먼트를 가져오고, 그것이 존재하며, "DEVCECY LOG"를 포함하고 있다. 를 테스트 하는 것입니다.
- 참고로, Cypress는 Mocha의 문법을 사용하고 있습니다.

## 테스트 실행하기

이번에는 작성한 테스트 코드를 실행을 해보겠습니다. 테스트 실행은 cypress가 제공하는 앱 혹은 터미널에서 할 수 있습니다.

1.앱에서 테스트 하기  
cypress 앱을 직접 실행하여 테스트를 진행하면 타임머신 기능을 통해 어떤 부분에서 테스트가 통과하지 못했는지 등을 확인 해 볼 수 있어 유용합니다.

- 먼저, 위에서 옵션으로 스크립트를 작성해주었다면 `npm run cy:open` 혹은 `npx cypress`로 cypress 앱을 실행해 줍니다.
- 왼쪽 E2E Testing 선택 > Chrome 선택 > Start E2E ~ 선택 해줍니다.
- E2E specs 리스트에 만들어 놓은 header.cy.ts 파일을 선택합니다.
- 자동으로 테스트가 실행되며 테스트 과정을 하나하나 확인해 볼 수 있습니다.

![앱에서 cypress 테스트 성공](/images/cypress/cypress-result.png)

2.터미널에서 테스트하기  
간단하게 테스트 해보려면 터미널에서 cypress를 실행해 주면됩니다.

- 위에서 스크립트를 등록했다면 터미널에 `npm run cy:run` 혹은 `npx cypress run` 해줍니다.
- 그럼 아래와 같이 터미널에서 테스트에 대한 결과를 확인해 볼 수 있습니다.

![터미널에서 cypress 테스트 성공](/images/cypress/terminal-run-test.png)

# 마무리

Cypress를 설치하고 기본적인 코드를 작성해보았습니다. 생각보다 수월하게 첫 테스트 코드를 작성할 수 있었습니다. [Cypress 공식문서](https://docs.cypress.io/guides/getting-started/installing-cypress)에 더 자세한 내용들이 깔끔하게 정리되어 있으니 참고하면 좋을 것 같습니다 :-)
