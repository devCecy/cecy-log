---
title: "[함수형 프로그래밍] 제너레이터 뜯어보기"
description: "뜯기는건 나였다.."
date: "2022년 07월 19일 화요일"
tags: ["함수형프로그래밍"]
coverImage: ""
ogImage:
  url: ""
---

# 들어가며

이터러블, 이터레이터, 이터러블/이터레이터 프로토콜.......ㅇㅌㄹ이터 지옥에서 간신히 빠져나온 줄 알았는데 이번에는 제너ㄹㅇㅌ입니다🥹 그래도 여기까지 이해하며 따라왔다면 제너레이터는 오히려 재밌습니다! 제너레이터 뜯어봅시다 !

# 제너레이터(Generator)

`제너레이터`는 <u>이터레이터이자 이터러블을 생성</u>하는 함수입니다. 따라서 이터레이터를 리턴하는 함수이며, well-formed 이터러블을를 리턴하는 함수가 됩니다. (이 말이 이해되지 않는다면 [이터러블/이터레이터 뜯어보기, 이터러블 직접 만들어보기](http://localhost:3000/posts/functional-programming-3)를 참고해주세요🙄)

## 제너레이터로 이터레이터 생성하기

제너레이터 사용법은 아주 간단합니다. 제너레이터는 함수명 앞에 *를 붙여주면 됩니다. vscode에서 *위에 마우스 커서를 올려놓으니 gen()은 Generator라고 친절하게 알려주네요. 제너레이터로 이터레이터를 만들 수 있다고 했으니 next메서드 안의 값을 어떻게 만들어내나 싶을 텐데요, yield(일드)를 통해 next메서드의 value값을 생성할 수 있습니다.

```js
function* gen() {
	yield 1;
	yield 2;
}
```

![generator-gen()](/images/functional-programming/4-1.png)

gen()함수가 리턴한 값이 정말 이터레이터가 맞는지 확인해 봅시다. `iter[Symbol.iterator]()` === iter가 true이고, next메서드를 통해 값이 잘 반환되는것을 보니 \*를 통해 만든 gen()함수가 well-formed 이터러블을 만들어주었나 봅니다!

```js
function* gen() {
	yield 1;
	yield 2;
}

let iter = gen();
console.log(iter[Symbol.iterator]() === iter); // true
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: undefiend, done: true}
```

그렇다면 당연히 for-of 순회도 가능하겠죠! (제너레이터는 이터러블이자 이터레이터입니다!!)

```js
function* gen() {
	yield 1;
	yield 2;
}

for (const a of gen()) console.log(a); // 1, 2
```

제너레이터는 return을 통해 done이 true일 때의 value값을 지정해 줄 수 있습니다. return 값은 순회되지 않습니다.

```js
function* gen() {
	yield 1;
	yield 2;
	return 100; // done이 true일때의 value값을 지정해 줄 수 있다. 순회는 되지않는다.
}

let iter = gen();
console.log(iter[Symbol.iterator]() === iter); // true
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: 100, done: true}
```

제너레이터는 문(장)을 통해 순회하는 값을 만들 수 있는데 이 말은 즉, 제너레이터가 어떠한 값이든 순회할 수 있게 만들어 줄 수 있다는 뜻이 됩니다. 이 개념은 함수형 프로그래밍에서 중요한 역할을 하게 됩니다. ⭐️⭐️⭐️

```js
function* gen() {
	yield 1;
	if (false) yield 2; // if(false)는 false이기 때문에 yield 2는 생성되지 않습니다.
	return 100;
}

let iter = gen();
console.log(iter[Symbol.iterator]() === iter); // true
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 100, done: true}
```

### 제너레이터로 홀수만 리턴하는 이터레이터 만들기

제너레이터 사용방법을 알아보았으니 제너레이터를 사용하여 홀수만 리턴하는 이터레이터를 만들어 봅시다.

처음에는 단순하게 yield에 1, 3, 5를 넣은 odd함수를 만들어 봅시다. next메서드로 확인해보면 예상한 대로 1, 3, 5 홀수만 반환해주고 있습니다.

```js
function* odd() {
	// odd는 홀수를 뜻합니다!
	yield 1;
	yield 3;
	yield 5;
}

let iterator = odd();
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: 5
console.log(iterator.next()); // {value: undefined, done: true}
```

매번 홀수를 직접 넣어줄 수 없으니 이것을 반복문을 사용해서 다시 만들어 봅시다. odd함수에 limit이라는 인자를 넘겨주어 10까지 반복하며 홀수를 찾아줍니다.

```js
function* odd(limit) {
	for (const i of limit) {
		if (i % 2) yield i;
	}
}

let iterator = odd(10); // limit을 10으로 줍니다.
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: 5, done: false}
console.log(iterator.next()); // {value: 7, done: false}
console.log(iterator.next()); // {value: 9, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

여기서부터 아주 재밌습니다🙃(?)

이번에는 제너레이터를 이용해서 무한수열을 만드는 함수(infinity)와 최댓값 정하는 함수(limit)를 만들어 odd함수를 변형해 보겠습니다.

### infinity함수

infinity함수는 next메서드를 호출할 때마다 1이 증가한 value값을 반환합니다.

(무한히 값을 만들어내지만 iterator의 next메서드를 평가할 때만 값을 생성해 내기 때문에 다행히도 브라우저나 프로그램이 멈추지는 하진 않습니다.)

```js
function* infinity(i = 0) {
  while (true) yield i++;
}

let iterator = infinity();
console.log(iterator.next()); // {value: 0, done: false}
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
...
```

### limit 함수

이번에는 최댓값을 정하는 limit 함수를 만들어 봅시다.

limit함수는 최댓값 l(limit함수와 이름이 겹쳐서 l로 변경했습니다)과 iter값을 인자로 받습니다. 그리고 iter를 순회하여 리턴된 값을 value값으로 만들고 그 value값이 최댓값과 같으면 함수를 종료합니다. 어떤 iter가 들어와도 그 iter에서 순회 가능한 값 내에서 limit값을 비교해 함수가 종료될 것입니다.

```js
function* limit(l, iter) {
	for (const i of iter) {
		yield i;
		if (i === l) return;
	}
}
```

### odd함수

infinity함수와 limit함수를 이용하여 odd함수를 수정해 봅시다! for-of문 안쪽부터 확인해보겠습니다.

- 홀수만 리턴할 것이기 때문에 infinity 함수에 1을 인자로 넘겨줍니다. infinity함수는 1부터 시작해 무한수열을 만들어내고 이터레이터를 리턴하는데 여기서 리턴된 이터레이터를 limit의 두 번째 인자로 넣어줍니다.
- limit함수는 최댓값 10과 무한수열인 이터레이터를 받아 10이라는 최댓값을 리턴합니다.
- odd함수 내의 for-of반복문은 10(최댓값)까지 순회하며 2로 나누었을 때 1이 남는 값일 경우 yield로 만들어줍니다. 결론적으로 홀수 값만 갖게 됩니다. 그래서 next메서드로 호출해보면 1부터 10까지의 홀수값만 value에 담겨있는 것을 확인할 수 있습니다.

```js
function* odd(l) {
	for (const i of limit(l, infinity(1))) {
		if (i % 2) yield i;
	}
}

let iterator = odd(10);

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: 5, done: false}
console.log(iterator.next()); // {value: 7, done: false}
console.log(iterator.next()); // {value: 9, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

## 제너레이터는 이터러블/이터레이터 프로토콜을 따른다!

마지막으로, 제너레이터는 이터러블/이터레이터 프로토콜을 따르고 있기 때문에 for-of, 전개 연산자, 구조분해, 나머지 연산자 등과 함께 사용될 수 있음을 확인해 보겠습니다.

```js
// 전개 연산자
console.log(...odds(10)); // 1, 3, 5, 7, 9

// 구조 분해
const [a, b, c] = odds(5);
console.log(a); // 1
console.log(b); // 3
console.log(c); // 5

// 나머지 연산자
const [d, e, ...rest] = odds(10);
console.log(a); // 1
console.log(b); // 3
console.log(rest); // [5, 7, 9]
```

# 마치며

오늘은 제너레이터를 생성하는 방법을 배우고, 제너레이터를 이용하여 홀수만 리턴하는 함수도 만들어 보았습니다. Infinity함수와 limit함수를 통해서 odd함수를 수정해보면서 살짝 어질어질😵‍💫 했지만, 함수형 프로그래밍을 맛본 것 같아서 아주 좋습니다🤓. 다음 글에서는 map, filter, reduce를 통해 함수형 프로그래밍에 한 발짝 더 다가가 보겠습니다~~~!

## 참고

- 제가 예전에 작성했던 [[함수형 프로그래밍] 제너레이터 뜯어보기](https://devcecy.tistory.com/16) 글을 옮겨온 후 보강한 내용입니다.
- 유인동 님의 "함수형 프로그래밍과 Javascript ES6+" 강의를 바탕으로 작성했습니다.
- 강의를 들으며 저의 해석을 덧붙였고, 몇몇 개념을 추가 정리했습니다.
