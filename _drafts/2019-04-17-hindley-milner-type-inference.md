---
layout: post
title: "힌들리-밀너 타입 추론 Hindley-Milner Type Inference"
date: 2019-04-17 23:52:00 +0900
tags: jekyll update
---

### 타입 추론이 왜 중요할까? 

* `VeryLongClass veryLongInstance = new VeryLongClass();` 따위의 할당식을 `auto veryLongInstance = new VeryLongClass();`로 줄여서 써도 되는 것 
* 그냥 rust나 go같은 언어에서 타입을 쓰기 귀찮으면 빼먹어도 컴파일러에서 알아서 타입을 넣어주는 것

나와 같은 대부분의 애플리케이션 개발자들 다수가 이런 식으로 피상적으로 이해하고 있을 것 같다.

타입 시스템, 그 중에서도 **힌들리-밀너 타입 시스템 Hindley-Milner type system**은 이름에서 알 수 있듯이 [논리학자 힌들러가 제시하고](https://www.semanticscholar.org/paper/THE-PRINCIPAL-TYPE-SCHEME-OF-AN-OBJECT-IN-LOGIC/fc64117e5d5ed5947a0c85c55597e4116d6e55c6) [컴퓨터 과학자 밀너가 재발견하여](https://www.sciencedirect.com/science/article/pii/0022000078900144) 70년대에 이미 학문적으로 완성된 내용이다. 케케묵은 이론인데  요즘 해커뉴스같은 것을 볼라치면 힌들리-밀너가 어쩌고 랭크-N 다형성이 어쩌고 하는 글들이 자주 눈에 밟힌다. 심지어 한국인 개발자들의 블로그나 커뮤니티에서도 종종 나오는 토픽이다. 그런데 그중에서 HM 타입 시스템의 알고리즘/수학적 배경을 설명해주는 글이 거의 없다. PL 이론 전공자들은 인터넷을 안하나? 아니면 이런 건 자기네들끼리만 돌려보나? 그래서 나라도 직접 공부해서 적어보려고 한다.

왜 HM 타입 시스템이 자꾸 토픽에 오를까? 함수형 언어 열풍 때문이다.

함수형 패러다임에서는 *트레잇(=타입클래스)* 등을 활용해 다형성 polymorphism을 획득한다. 트레잇 개념이 익숙치 않다면 하나의 인스턴스가 어떤 성질을 만족시키기 위해 메소드를 구현하도록 만들어준다는 관점에서 OOP의 SOLID 원칙의 I, [*인터페이스 분리 원칙*](https://ko.wikipedia.org/wiki/%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4_%EB%B6%84%EB%A6%AC_%EC%9B%90%EC%B9%99)을 충실히 지킨 인터페이스와 같은 것이라고 생각해도 무방하다. (언어에 따라 실제로는 둘이 많이 다르긴 하지만)

불필요한 구현을 피하고 트레잇을 적극적으로 이용하려면 타입을 추상화시킬 필요가 있다. C++이나 자바에서는 메소드 오버로딩이나 템플릿, 제네릭 등을 사용하지만 이것이 잘 추상화된 방법이라고는 할 수 없다. C++의 템플릿은 컴파일할 때는 그냥 사용되는 타입에 따라 함수 여러 개로 컴파일되고(monomorphication) 그 전에는 타입 안전성 type soundness/type safety 을 체크하지는 않는다. 자바 제네릭은 인터페이스 파라미터의 신택스 슈거일 뿐이다. 

함수형 프로그래밍에서 필요한 보다 고도의 다형성이 필요하면서 타입 안전성을 지키고 싶다면 타입 체크 단계에서 C++이나 자바 컴파일러가 해주는 타입의 단순 비교 이상의 복잡한 로직이 필요해진다. 이런 경우, 타입 체크 시스템은 타입을 정확히 특정해 낼 수 없더라도 유효한 연산인지를 판단할 수 있어야 하므로 타입 정보를 문맥에서 유추해 낼 필요가 있다. 말하자면 소스코드의 타입 정보만 빼서 전처리를 돌리는 셈이다. 한 표현식 expression의 타입을 유추하기 위해서 (당연히) 논리학의 힘을 빌린다.

F#, 하스켈, 러스트, OCaml 등은 타입 안전성을 위해 HM 타입 시스템으로 모든 표현식의 타입 안전성을 검증해 낸다. 강력한 타입 추론은 그 부산물이다.

간단히 HM 타입 추론과 흔히 사용되는 로컬 타입 추론을 비교해 볼 방법이 있다. 타입스크립트 typescript 와 플로우타입 flow-type 을 비교해 보는 것이다. 둘 모두 타입 안전성을 보장하는 자바스크립트 개발을 목표로 하고 있고, 타입 어노테이션 문법도 비슷하지만 철학이 다소 다르다. 타입스크립트는 c#같은 문법을 적극 도입해서 객체 지향적으로 자바스크립트를 짤 수 있도록 access modifier, namespace, 믹스인 등의 새로운 문법을 적극적으로 도입하고 컴파일(트랜스파일?) 과정도 따로 있는 별도의 언어다. 또한 자바스크립트 언어의 상위 집합 superset 이기 때문에 타입 안전성이 없는 자바스크립트 코드도(타입 안전성이 없다고 해서 틀린 프로그램이라고는 할 수 없다) 올바른 타입 스크립트 코드다. 반면 플로우는 정적 타입 체커이며 어노테이션을 제거해주는 것 말고는 코드를 건드리지 않는다. 함수형 패러다임을 적극 활용하기 위해서 HM 타입 추론을 이용해 모든 표현식의 타입을 체크한다. 즉 올바른 자바스크립트 코드라 해도 플로우에서 타입 체크를 통과하지 못할 수 있다. 예를 들어,

```typescript
/* @flow */

const size = (sizable) => {
  return sizable.length;
}

size(1);
```

위의 함수는 올바른 자바스크립트 코드이고, 따라서 올바른 타입스크립트 코드이다. 그러나, `size` 함수 내부에서 파라미터의 `length` 프로퍼티를 참조하고 있으므로 맨 밑에서처럼 파라미터에 `length` 프로퍼티가 없는 `number` 타입을 집어넣는 것은 타입 안전성의 관점에서 보면 틀린 코드이다.

![타입스크립트에서 에러 없이 컴파일되는 모습](/assets/2019-04-17-hindley-milner-type-inference/1.png)

![플로우에서는 타입 에러를 잡아낸다](/assets/2019-04-17-hindley-milner-type-inference/2.png)

물론 명시적인 타입 제한을 통해 이를 어느정도 막을 수는 있지만 기본적으로 typescript는 함수 선언에서 아무것도 선언하지 않으면 인자에 자동으로 `any` 타입을 집어넣는다. 반면 flow는 타입 어노테이션이 없어도 함수 적용 등과 같은 모든 부분에서 HM 타입 시스템으로 타입 일관성을 체크하기 때문에 위와 같은 코드에서 런타임 에러를 막을 수 있다. 이런 점에서는 힌들리-밀너 타입 추론이 더 뛰어난 성능을 갖고 있을을 알 수 있다. 그리고 javascript에서 `undefined`와의 끝없는 싸움은 typescript로 바꾼다고 끝나는게 아니라는 것도 알 수 있다. =_=

### 힌들리-밀너 타입의 6가지 규칙

다음은 [추론 규칙](https://en.wikipedia.org/wiki/Rule_of_inference#The_standard_form_of_rules_of_inference)에 따라 서술한 HM 타입 추론의 6가지 규칙이다.


$$
\begin{array}{cr}
 \displaystyle\frac{x:\sigma \in \Gamma}{\Gamma \vdash_D x:\sigma}&[\mathtt{Var}]\\ \\
 \displaystyle\frac{\Gamma \vdash_D e_0:\tau \rightarrow \tau' \quad\quad \Gamma \vdash_D e_1 : \tau }{\Gamma \vdash_D e_0\ e_1 : \tau'}&[\mathtt{App}]\\ \\
 \displaystyle\frac{\Gamma,\;x:\tau\vdash_D e:\tau'}{\Gamma \vdash_D \lambda\ x\ .\ e : \tau \rightarrow \tau'}&[\mathtt{Abs}]\\ \\
 \displaystyle\frac{\Gamma \vdash_D e_0:\sigma \quad\quad \Gamma,\,x:\sigma \vdash_D e_1:\tau}{\Gamma \vdash_D \mathtt{let}\ x = e_0\ \mathtt{in}\ e_1 : \tau} &[\mathtt{Let}]\\ \\ \\
 \displaystyle\frac{\Gamma \vdash_D e:\sigma' \quad \sigma' \sqsubseteq \sigma}{\Gamma \vdash_D e:\sigma}&[\mathtt{Inst}]\\ \\
 \displaystyle\frac{\Gamma \vdash_D e:\sigma \quad \alpha \notin \text{free}(\Gamma)}{\Gamma \vdash_D e:\forall\ \alpha\ .\ \sigma}&[\mathtt{Gen}]\\ \\
\end{array}
$$