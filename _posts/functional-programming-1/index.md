---
title: "[함수형 프로그래밍] 평가, 일급객체, 일급함수, 고차함수"
description: "무엇이든지 기본부터 착착-"
date: "2022년 07월 13일 수요일"
tags: ["함수형프로그래밍"]
coverImage: ""
ogImage:
  url: ""
---

# 들어가며

얼마 전 함수형 프로그래밍을 접하게 되었는데 신선한 충격을 받았습니다. 어떻게하면 저걸 배울 수 있을까 찾아보다가 유인동님의 함수형프로그래밍 강의를 수강하게 되었구요. 프로그래밍 강의를 영화 보듯이 너무 재밌게(?) 본 적은 처음인 것 같습니다. 차분한 목소리로 말씀해주시는데 아니 도데체 뭘 하시는거지? <-> 아니 저게 저렇게된다고?!를 계속 반복했거든요. 정리해두지 않으면 안될것 같아 기록을 시작합니다 :-)

# 함수형 프로그래밍 시작하기

함수형 프로그래밍을 시작하기에 앞서 함수형 프로그래밍의 기반이 되는 몇 가지 개념들을 알아보겠습니다.

## 평가

코드가 계산되어 값을 만드는 것을 말합니다.

```js
3 + 4 // 7
[1,2,...[3,4]] // [1,2,3,4]
```

## 일급 객체

아래의 특성을 가지는 객체를 일급 객체라고 합니다.

- 값으로 다룰 수 있다.
- 변수에 담을 수 있다.
- 함수의 인자로 사용될 수 있다.
- 함수의 결과로 사용 될 수 있다.

## 일급 함수

자바스크립트에서 함수는 일급입니다. 즉, 자바스크립트의 함수는 위 일급 객체의 조건을 모두 만족합니다.
코드를 통해 함수가 일급이라는 말의 뜻을 다시 한번 알아보겠습니다.

1. 함수(a => a + 1)를 값으로 다뤄(일급 1번특성), add1이라는 변수에 담았다(일급 2번 특성).
2. 함수를 담은 add1을 값으로 다뤄(일급 1번 특성) console.log() 함수 안에 인자로 넣어 출력을 했다(일급 3번 특성).
3. 함수는 평가해서(add1(1)) 결과로 만들어(일급 4번 특성) 값(2)을 다른 함수(consoele.log())에 전달할 수 있다.
4. f1은 함수를 실행했을 때 다시 함수를 리턴한다(일급 4번 특성).
5. f1을 실행한 결과를 전달하면(일급 3번 특성) 함수가 출력된다(()=>1)(일급 4번 특성).

```js
1) const add1 = a => a + 1
2) console.log(add1) // a => a + 5
3) console.log(add1(1)) // 2
4) const f1 => () => () => 1;
5) console.log(f1()) // () => 1
```

## 고차 함수

일급 함수의 특징 중 하나인 함수가 함수를 반환하는 함수를 고차 함수라고 합니다.

고차 함수는 2가지로 나눠볼 수 있습니다.

1. 함수를 인자로 받아서 실행하는 함수
2. 함수를 만들어서 리턴하는 함수 (클로저를 만들어 리턴하는 함수)

먼저, 함수를 인자로 받아서 실행하는 고차 함수를 알아보겠습니다.

### 함수를 인자로 받아서 실행하는 고차 함수

`apply1 함수`

1. apply1은 함수(f)를 받아 함수를 리턴(f(1))하고 있으므로 고차 함수입니다.
2. apply1 함수의 인자로 add2라는 함수를 전달해주면 결괏값으로 3이 출력됩니다. 3이 출력되는 과정이 명확히 이해되지 않는다면 apply1(add2)를 풀어 적어보면 됩니다.

- apply1(add2)은 apply1(a => a + 2)로 바꿔볼 수 있고,
- apply1은 a => a + 2를 인자로 받으므로 (a => a + 2)(1)이 됩니다.
- 그러므로 a자리에 1이 인자로 전달되어 결괏값이 3이 나오는 것이죠.

```js
1) const appply1 = f => f(1);
   const add2 = a => a + 2;
2) console.log(apply1(add2)) // 3
```

`times 함수`  
n만큼 f를 실행하는 고차 함수입니다.

1. times함수에 console.log함수를 첫 번째 인자(f)로 넘기고, 3을 두 번째 인자(n)로 넘겨줍니다. 그럼 times함수 안쪽 f(i)는 console.log(0), console.log(1), console.log(2)가 차례로 반환될 것입니다.
2. times함수에 a => console.log(a + 10)을 첫 번째 인자(f)로 넘기고, 3을 두 번째 인자(n)로 넘겨줍니다. 그럼 times함수 안쪽 f(i)는 (a => console.log(a+10))(0), (a => console.log(a+10))(1), (a => console.log(a+10))(2)가 차례로 반환될 것입니다.

```js
const times = (f, n) => {
	let i = -1;
    while(++i < n) f(i);
}

1) times(console.log, 3) // 0
                         // 1
                         // 2

2) times(a => console.log(a + 10), 3) // 10
                                      // 11
                                      // 12
```

times함수와 같이 함수를 인자로 받아 함수 내부에서 인자를 적용하는 함수를 만드는 프로그래밍을 `Applicative Programming`이라고 합니다.

### 함수를 만들어서 리턴하는 함수 (클로저를 만들어 리턴하는 함수)

addMaker는 클로저를 만들어 리턴하는 함수입니다.

1. add10을 출력해보면 함수 b => a + b가 리턴되는 것을 알 수 있습니다.  
   (addMaker에 10을 인자로 넘겨주었기 때문에 b => 10 + b가 리턴될 것이라고 생각했는데, 그렇지 않고 b => a + b 함수가 10을 기억하고 있다고 합니다. 클로저에 대해 알고 있다고 생각했는데 결괏값을 혼동한 것 보면 클로저에 대해 한번 더 정리를 해야 할 것 같네요!)
2. add10에 5를 인자로 넣어주면 b => a + b가 5 => 10 + 5가 되므로 15를 리턴합니다.

```js
 const addMaker = a => b => a + b;
   const add10 = addMaker(10);
1) console.log(add10) // b => a + b
2) console.log(add10(5)); // 15
```

# 마치며

함수형 프로그래밍에서는 함수가 일급 객체라는 성질을 이용해서 많은 조합성을 만들어내고 추상화의 도구로 사용할 수 있습니다. 다음 글에서는 함수형 프로그래밍 전 알아야 할 이터러블과 이터레이터 프로토콜에 대해서 알아보겠습니다.

## 참고

- 제가 예전에 작성했던 [[함수형 프로그래밍] 평가, 일급객체, 일급함수, 고차함수](https://devcecy.tistory.com/13) 글을 옮겨온 후 보강한 내용입니다.
- 유인동 님의 "함수형 프로그래밍과 Javascript ES6+" 강의를 바탕으로 작성했습니다.
- 강의를 들으며 저의 해석을 덧붙였고, 몇몇 개념을 추가 정리했습니다.
