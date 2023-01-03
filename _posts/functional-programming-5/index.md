---
title: "[함수형 프로그래밍] map, filter, reduce 직접 만들어 사용하기"
description: "어느날 갑자기 내가 함수형 프로그래밍 천재가 되면 좋겠다"
date: "2022년 07월 24일 일요일"
tags: ["함수형프로그래밍"]
coverImage: ""
ogImage:
  url: ""
---

# 들어가며

함수형 프로그래밍에서 유용하게 사용할 수 있는 `map`, `filter`, `reduce` 함수를 만들어 봅시다.

<u>이 글에서 알아볼 map, filter, reduce함수는 javascript에 내장된 함수가 아닌 직접 구현한 함수</u>입니다. javascript의 내장 함수와 비슷한 역할을 하지만 이터러블 프로토콜을 따르는 함수들과 조합성있게 사용할 수 있는 장점이 있습니다.

오늘 공통으로 사용할 books 배열입니다.

```js
const books = [
	{ name: "Harry Potter", price: 20000 },
	{ name: "The Lord of the Rings", price: 18000 },
	{ name: "Dune", price: 15000 },
	{ name: "The Hobbit", price: 13000 },
	{ name: "Fantastic Beasts", price: 10000 },
];
```

## map 함수

books배열에서 name, price의 값을 따로 빼서 사용해야 한다고 생각해 봅시다.  
names와 prices라는 배열을 각각 만들고 books배열을 for-of문으로 돌려 각 객체의 name과 price를 각각의 배열에 push 해주면 괜찮을 것 같네요. names와 prices배열을 확인해보면 원하는 값이 잘 들어와 있습니다.

```js
let names = [];
let prices = [];
for (const b of books) {
	names.push(b.name);
	prices.push(b.price);
}
console.log(names); // [Harry Potter, The Lorad of...]
console.log(prices); // [20000, 18000, ...]
```

위와 같은 기능을 map함수를 통해 다시 한번 만들어 보겠습니다.

함수형 프로그래밍은 `인자와 리턴 값`으로 소통하는 것을 권장하는데, 이 말을 마음에 새겨놓고 map함수 구현 과정을 봅시다.

- map이라는 이름의 함수는 첫 번째 인자로 f(함수)를 받고, 두 번째 인자로는 iter(이터러블 프로토콜을 따르는 무언가)를 받습니다.
- 함수 내부에는 배열을 돌며 뽑아낸 값을 담아줄 res(response)라는 빈 배열을 하나 만들어 주었습니다.
- 이제 인자로 받은 iter를 for-of문으로 순회합니다(iter는 이터러블 프로토콜을 따르는 무언가 이기 때문에 for-of문을 순회할 수 있습니다).
- 그리고 res에 f(a) 값을 push 해줍니다. 오잉, f(a) 값은 무엇일까요? 첫 번째 방법에서는 배열에 원하는 값, 예를 들면 b.name, b.price를 직접 배열에 push 해줬습니다. map함수는 수집할 값을 명시적으로 사용하지 않고 f라는 인자로 받을 함수에 수집할 값을 위임해 줄 것입니다. 이 과정은 매우 중요한데, map함수 내부가 아닌 외부의 함수에서 수집할 값을 지정해주기 때문에 map함수 자체의 재사용이 가능해지게 됩니다.
- 마지막으로 수집하고 싶은 값을 넣은 res를 return 해 줍니다.
- 이제 이 map함수를 어떻게 호출해줄지 봅시다. map함수는 f와, iter라는 2가지 인자를 받습니다. 그럼 map함수를 실행하기 위해서도 두 가지 값을 전달해주어야겠죠. f에는 수집하고 싶은 값, (b)=> b.name를, iter에는 books라는 배열을 넣어줍시다(books는 배열로 이터러블 프로토콜을 따릅니다).
- 그럼 결과적으로 첫 번째 방법과 동일한 결과를 얻을 수 있습니다.

```js
const map = (f, iter) => {
	// iter 자리에 들어올 값이 이터러블 프로토콜을 따름을 나타내기위해 iter라고 명명
	let res = [];
	for (const a of iter) {
		res.push(f(a)); // 추상화, 어떤값을 수집할 것인지를 f()함수에 위임해준다.
	}
	return res;
};

console.log(map((b) => b.name, books)); // [Harry Potter, The Lorad of...]
console.log(map((b) => b.price, books)); // [20000, 18000, ...]
```

## 이터러블 프로토콜을 따랐을 때의 map과의 조합성 good 예제

아니 그런데.. 그냥 for-of만 돌려도 원하는 배열을 얻을 수 있었고, 내장 map() 함수도 있는데 굳이 복잡한(?) map함수를 만든 이유는 무엇일까요?

### 예제 1

document.querySelectorAll("_")을 콘솔 로그로 출력해보면 노드 리스트가 나옵니다. 이걸 내장 map함수로 돌려봅시다. 오잉, 에러가 납니다. 그 이유는 document.querySelectorAll("_")의 프로토타입에는 map함수가 구현되어있지 않기 때문에 map함수를 사용할 수 없기 때문입니다.

```js
console.log(document.querySelectorAll("*").map((el) => el.nodeName)); // Uncaught TypeError: document.querySelectorAll(...).map is not a function ...
```

그런데 앞서 직접 만든 map함수로는 document.querySelectorAll의 노드 리스트를 뽑아낼 수가 있습니다. 그 이유는 document.querySelectorAll이 이터러블 프로토콜을 따르고 있기 때문입니다.

```js
const map = (f, iter) => {
	let res = [];
	for (const a of iter) {
		res.push(f(a));
	}
	return res;
};

console.log(map((el) => el.nodeName, document.querySelectorAll("*"))); // ['HTML', 'HEAD', 'META', 'META', 'META', 'TITLE', 'BODY', 'SCRIPT']
```

확인해봅시다. document.querySelectorAll의 Symbol.iterator를 실행하면 이터레이터가 리턴되고, next() 메서드도 정상적으로 값을 반환해주고 있습니다. 음, 내장 map함수로는 document.querySelectorAll의 노드 리스트를 꺼내 줄 수 없는데 우리가 만들어준 map함수로는 가능하군요!

```js
const iter = document.querySelectorAll("*")[Symbol.iterator()]
console.log(iter.next()); // {value: html, done: false}
console.log(iter.next()); // {value: head, done: false}
...
```

### 예제 2

이번에는 Map객체를 살펴봅시다. Map객체도 이터러블 프로토콜을 따르기 때문에 만들어준 map함수와 함께 사용할 수 있습니다.  
(사실 map함수와 함께 사용할 수 있다는 부분 이외에는 사용의 유용함에 대해서 아직 와닿지 않는 것 같습니다. 🥲 그래도 일단 기록,,,)

```js
// new Map()
let m = new Map();
m.set("a", 10);
m.set("b", 20);
const it = m[Symbol.iterator]();
console.log(it.next()); // {value : ['a', 10], done: false}
console.log(it.next()); // {value : ['b', 20], done: false}
console.log(it.next()); // {value : undefined, done: true}
```

인자가 배열로 들어오기 때문에 구조 분해하여 넣어주었습니다. 예를 들어, 처음 인자로 ['a',10] 이 들어올 테니 [k, a]로 키와 값을 구조 분해해서 받고, 값 10에는 2를 곱한 값을 담아서 리턴해주도록 했습니다. 콘솔을 보면 ['a', 20]이 출력됩니다.

```js
console.log(map(([k, a]) => [k, a * 2], m)); //[['a', 20],['b', 40]]
```

map이 리턴해준 값을 new Map()을 다시 해주면 Map객체를 리턴해 줍니다.

```js
console.log(new Map(map(([k, a]) => [k, a * 2], m))); // Map{'a' => 20, 'b' => 40}
```

## filter함수

filter함수는 특정 조건에 만족하는 값을 뽑아 새로운 배열로 반환해 줍니다.  
books 배열의 책들 중 15000원 이하의 가격의 책만 뽑아내 봅시다. 역시나 시작은 명명적으로 filter의 기능을 구현해보겠습니다.  
under15000이라는 빈 배열을 만들고, books배열을 for-of로 순회하면서 15000원 이하인 값을 가진 값을 under15000 배열에 넣어 주었습니다. 예상한 대로 15000원 이하의 값을 가진 객체만을 가진 배열이 반환되었습니다.

```js
let under15000 = [];
for (const b of books) {
	if (b.price < 15000) under15000.push(b);
}

console.log(under15000); // [{name: 'The Hobbits', price:13000}, {name: 'Fantastic Beats', price: 10000}]
```

이번에는 filter함수를 통해 구현해 봅시다. map함수와 생김새가 비슷합니다.  
if내부에 있던 조건을 f라는 함수에 위임해줍니다. 그리고 그 조건에 만족하는 값만 res란 배열에 담아 리턴해 줍니다.  
조건을 f라는 함수에 위임했기 때문에 filter함수를 실행하기 위해서는 f자리에 특정 조건을 가진 함수((b)=> b.price < 15000)를 넣어주면 됩니다.

```js
const filter = (f, iter) => {
	let res = [];
	for (const b of iter) {
		if (f(b)) res.push(b);
	}
	return res;
};

console.log(filter((b) => b.price < 15000, books)); // [{name: 'The Hobbits', price:13000}, {name: 'Fantastic Beats', price: 10000}]
```

## reduce함수

이번에는 배열의 모든 값을 더하는 함수를 만들어봅시다. 역시나 처음은 명명적으로 만들어 보았습니다. 배열의 모든 합을 갖게 될 total에 0을 할당해 줍니다. 그리고 nums을 for-of문으로 순회해 total에 total + n값을 해줍니다. nums배열의 순회가 끝나고 나면 total에 15가 정상적으로 출력됩니다.

```js
const nums = [1, 2, 3, 4, 5];
let total = 0;
for (const n of nums) {
	total = total + n;
}
console.log(total); // 15
```

reduce함수를 직접 구현해봅시다.

- reduce함수는 f, acc, iter라는 3개의 인자를 받고 있습니다.
- 함수 내부는 iter를 for-of로 순회하다가 acc(누적 값)에 f(acc, n) 함수를 할당해 줍니다.
- 인자로 받은 f함수에는 add함수를 넘겨줄 것인데 add함수는 2개의 인자(a, b)를 받아 더해 줍니다.
- for-of문 내에서 acc의 값을 보면 초기값으로 넘겨준 0으로 시작해 1, 3, 6, 10으로 값이 잘 누적되고 있음을 알 수 있습니다.

```js
const add = (a, b) => a + b;

const reduce = (f, acc, iter) => {
	for (const n of iter) {
		console.log(acc); // 0, 1, 3, 6, 10
		acc = f(acc, n);
	}
	return acc;
};

console.log(reduce(add, 0, nums)); // 15
```

reduce함수를 호출할 때 초기값 0을 생략해주면 어떻게 될까요? 실제 자바스크립트 내장 reduce함수에서 초기값은 옵션입니다. 초기값을 제거해봅시다. 오류가 납니다.
add함수와 nums배열만 넘기고 있기 때문에 iter가 iterable이 아니라는 에러를 마주하게 됩니다. 사실 nums가 iter인자 자리에 들어가야 하는데 현재의 reduce함수는 이것을 처리해주지 못하고 있습니다. 함수를 수정해보겠습니다.

```js
const add = (a, b) => a + b;

const reduce = (f, acc, iter) => {
	for (const n of iter) {
		acc = f(acc, n);
	}
	return acc;
};

console.log(reduce(add, nums)); // reduce(add, nums) is not iterable
```

acc값과 iter값을 만들어줍시다.

- acc는 값이 없다면 iter의 첫 값으로 만들어주면 됩니다. 두 번째 인자로 받은 nums배열을 Symbol.iterator로 실행해주어 그 값의 첫 값을 갖기 위해 next()메서드를 사용해줍시다. 그리고 그값을 acc에 넣어줍니다. for-of문 내부에서 확인해보니 acc가 1, 3, 6, 10으로 잘 생성되었습니다.
- iter는 두번째 인자로 받은 acc(사실은 nums배열)를 Symbol.iterator로 실행해 리턴된 이터레이터를 iter값으로 만듭시다.
- 이제 reduce(add, nums)를 호출하면 정상적으로 15가 리턴됩니다.

```js
const add = (a, b) => a + b;

const reduce = (f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}
	for (const n of iter) {
		console.log(acc); // 1, 3, 6, 10
		acc = f(acc, n);
	}
	return acc;
};

console.log(reduce(add, nums)); // 15
```

계속 사용해오던 books배열에서 모든 책의 값을 reduce함수를 통해 더해봅시다. add함수 대신 a, b인자를 받아 둘을 더해주는 함수를 직접 넣어 호출했습니다.

```js
console.log(
	reduce((total_price, product) => total_price + product.price, 0, books)
); // 76000
```

## map + filter + reduce

이제 위에서 만들었던 3가지 함수를 모두 조합하여, 15000원 보다 높은 가격을 가진 책의 가격을 뽑아 그 가격을 모두 더하는 함수를 만들어 봅시다. books배열과 그동안 만들었던 map, filter, reduce 함수를 모두 모아봤습니다.

```js
const books = [
	{ name: "Harry Potter", price: 20000 },
	{ name: "The Lord of the Rings", price: 18000 },
	{ name: "Dune", price: 15000 },
	{ name: "The Hobbit", price: 13000 },
	{ name: "Fantastic Beasts", price: 10000 },
];

// map
const map = (f, iter) => {
	let res = [];
	for (const a of iter) {
		res.push(f(a));
	}
	return res;
};

// filter
const filter = (f, iter) => {
	let res = [];
	for (const b of iter) {
		if (f(b)) res.push(b);
	}
	return res;
};

// reduce
const reduce = (f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}
	for (const n of iter) {
		acc = f(acc, n);
	}
	return acc;
};

const add = (a, b) => a + b;
```

- 15000원보다 높은 가격을 가진책 => filter

```js
filter((b) => b.price > 15000, books); // [{name : 'Harry Potter', price: '20000'}, {name: 'The Load of the Rings', price: 18000}]
```

- 의 가격을 뽑아 => map

```js
map(
	(b) => b.price,
	filter((b) => b.price > 15000, books)
); // [20000, 18000]
```

- 그 가격을 모두 더하는 => reduce

```js
reduce(
	add,
	map(
		(b) => b.price,
		filter((b) => b.price > 15000, books)
	)
); // 38000
```

# 마치며

오늘 만들어본 map, filter, reduce함수는 제너레이터로 생성된 함수, 일반 array, Map객체 등 이터러블/이터레이터 프로토콜을 따르는 값이라면 모두 조합성있게 사용할 수있는 장점을 가지고 있습니다. 이런식으로 내장된 함수를 직접 구현하여 사용해 볼 수 있겠습니다. 그리고 3가지 함수를 조합하여 사용하는 방법 또한 알아보았습니다.  
머리로는 이해가되었지만, 직접 이런 함수를 만들고 조합해서 사용하는데에는 연습이 필요할 것 같습니다. 다음시간에는 함수를 만들고 조합해서 사용하는 연습을 더 해보겠습니다.

## 참고

- 제가 예전에 작성했던 [[함수형 프로그래밍] map, filter, reduce 직접 만들어 사용하기](https://devcecy.tistory.com/17) 글을 옮겨온 후 보강한 내용입니다.
- 유인동 님의 "함수형 프로그래밍과 Javascript ES6+" 강의를 바탕으로 작성했습니다.
- 강의를 들으며 저의 해석을 덧붙였고, 몇몇 개념을 추가 정리했습니다.
