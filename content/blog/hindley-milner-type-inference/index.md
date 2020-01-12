---
layout: post
title: "힌들리-밀너 타입 추론 Hindley-Milner Type Inference"
tags: [hindley milner type inference 힌들리 밀너 타입 추론]
math: true
description: "힌들리 밀너 타입 추론의 수학적 배경을 애플리케이션 개발자의 관점에서 알아보기"
date: "2019-04-17"
---

## 타입 추론?

* C++의 `auto`나 lombok의 `var`, `val`? `VeryLongClass veryLongInstance = new VeryLongClass();` 따위의 할당식을 `auto veryLongInstance = new VeryLongClass();`로 줄여서 써도 되는 것?
* 그냥 rust나 go같은 언어에서 타입을 쓰기 귀찮으면 빼먹어도 컴파일러에서 알아서 타입을 넣어주는 것?

나와 같은 애플리케이션 개발자들 다수가 언어 차원에서 지원하는 타입 추론을 이런 식으로 피상적으로 이해하고 있을 것 같다.

타입 시스템 중에서도 이번 글의 주제인 **힌들리-밀너 타입 시스템 Hindley-Milner type system**은 이름에서 알 수 있듯이 [논리학자 힌들러가 제시하고](https://www.semanticscholar.org/paper/THE-PRINCIPAL-TYPE-SCHEME-OF-AN-OBJECT-IN-LOGIC/fc64117e5d5ed5947a0c85c55597e4116d6e55c6) [컴퓨터 과학자 밀너가 재발견한](https://www.sciencedirect.com/science/article/pii/0022000078900144) 타입 이론으로, 70년대에 이미 학문적으로 완성된 내용이다. 고전적인 타입 추론 알고리즘으로서 많은 언어, 정적 분석 도구, 컴파일러에 도입되어 타입 시스템에 사용되는 중이다. 한국인 개발자 커뮤니티나 블로그에도 간혹 토픽으로 올라오는데 정작 한글로 HM 타입 시스템의 알고리즘/수학적 배경을 설명해주는 글이 거의 없는게 아쉬워 공부하면서 블로그에 올리려고 한다. PL 이론이 인기 없긴 하지만 한국에도 전공자가 없진 않을텐데, 이런 건 자기네들끼리만 돌려보나? 틀린 내용이야 많겠지만 지적해주면 바로바로 고치려고 한다. 피드백 환영!😉😉

## 타입 체크

불필요한 구현을 피하고 추상 자료 타입 Abstract Data Type, 믹스인, 트레잇(= 타입클래스) 등을 잘 활용하기 위해서는 타입을 추상화시킬 필요가 있다. C++이나 자바에서는 메소드 오버로딩이나 템플릿, 제네릭 등을 사용하지만 이것이 잘 추상화된 방법이라고는 할 수 없다. C++의 템플릿은 컴파일할 때는 그냥 사용되는 타입에 따라 함수 여러 개로 컴파일되고(monomorphication) 그 전에는 타입 안전성(type soundness/type safety)을 체크하지는 않는다. 자바 제네릭은 그냥 타입 캐스팅을 대신해주는 신택스 슈거일 뿐이다. (이게 두 언어의 잘못이라는 것은 아니다)

타입 안전성을 지키면서 보다 고도의 타입 추상화를 달성하기 위해선 타입 체크 단계에서 C++이나 자바 컴파일러가 해주는 타입의 단순 비교 이상의 복잡한 로직이 필요하다. 이런 경우, 타입 체크 시스템은 추상화된 타입을 정확히 특정해 낼 수 없더라도 유효한 연산인지를 판단할 수 있어야 하므로 타입 정보를 문맥에서 유추해 낼 필요가 있다. 이때 논리학을 기반으로 만들어진 HM 타입 시스템을 사용한다.

F#, 하스켈, 러스트, OCaml 등은 타입 안전성을 위해 HM 타입 시스템으로 모든 표현식의 타입 안전성을 검증해 낸다. 강력한 타입 추론은 그 부산물이다.

정적 타입 언어 뿐이 아니라, 스크립트 언어는 (당연히 컴파일 과정이 없으니까) 동적 타입 언어가 대부분인데, 요즘은 여기에 HM 타입 시스템을 통해 정적 타입 체크를 거치게 해서 버그를 줄이고 생산성을 높인다든가 하는 식의 시도도 많다.

## 구체적인 힌들리-밀너 타입 시스템의 좋은 점

간단히 HM 타입 추론과 흔히 사용되는 로컬 타입 추론을 비교해 볼 방법이 있다. 타입스크립트 typescript 와 플로우타입 flow-type 을 비교해 보는 것이다. 둘 모두 타입 안전성을 보장하는 자바스크립트 개발을 목표로 하고 있고, 타입 애너테이션 문법도 비슷하지만 철학이 다소 다르다. 타입스크립트는 객체 지향적으로 자바스크립트를 짤 수 있도록 access modifier, namespace 등의 C#스러운 새로운 문법을 적극적으로 도입하고 컴파일(트랜스파일?) 과정도 따로 있는 별도의 언어다. 또한 자바스크립트 언어의 상위 집합 superset 이기 때문에 타입 안전성이 없는 자바스크립트 코드도(*타입 안전성이 없다고 해서 틀린 프로그램이라고는 할 수 없다*) 올바른 타입 스크립트 코드다. 반면 플로우는 언어가 아니라 정적 타입 체크 시스템이며 어노테이션을 제거해주는 것 말고는 코드를 건드리지 않는다. 함수형 패러다임을 적극 활용하기 위해서 HM 타입 추론을 이용해 모든 표현식의 타입을 체크한다. 즉 올바른 자바스크립트 코드라 해도 플로우에서 타입 체크를 통과하지 못할 수 있다. 예를 들어,

```typescript
/* @flow */

const size = (sizable) => {
  return sizable.length;
}

size(1);
```

위의 함수는 올바른 자바스크립트 코드이고, 따라서 올바른 타입스크립트 코드이다. 그러나, `size` 함수 내부에서 파라미터의 `length` 프로퍼티를 참조하고 있으므로 맨 밑에서처럼 파라미터에 `length` 프로퍼티가 없는 `number` 타입을 집어넣는 것은 타입 안전성의 관점에서 보면 틀린 코드이다.

![타입스크립트에서 에러 없이 컴파일되는 모습](1.png)

![플로우에서는 타입 에러를 잡아낸다](2.png)

위 사진을 보면 타입스크립트에서는 에러를 찾아주지 못한 채 컴파일되는 반면 플로우에서는 타입 에러를 잡아내 주는 것을 알 수 있다.

물론 명시적인 타입 제한을 통해 이를 어느정도 막을 수는 있지만 기본적으로 typescript는 함수 선언에서 아무것도 선언하지 않으면 인자에 자동으로 `any` 타입을 집어넣는다. 반면 flow는 타입 어노테이션이 없어도 함수 적용 등과 같은 모든 부분에서 HM 타입 시스템으로 타입 일관성을 체크하기 때문에 위와 같은 코드에서 런타임 에러를 막을 수 있다. 이런 점에서는 힌들리-밀너 타입 추론이 더 뛰어난 성능을 갖고 있음을 알 수 있다. 그리고 javascript에서 `undefined`와의 끝없는 싸움은 typescript로 바꾼다고 끝나는게 아니라는 것도 알 수 있다. =_=

## 힌들리-밀너 타입의 6가지 규칙

다음은 [추론 규칙](https://en.wikipedia.org/wiki/Rule_of_inference#The_standard_form_of_rules_of_inference)에 따라 서술한 HM 타입 추론의 6가지 규칙이다.

$$
\begin{array}{cr}
 \displaystyle\frac{x:\sigma \in \Gamma}{\Gamma \vdash x:\sigma}&[\mathtt{Var}]\\ \\
 \displaystyle\frac{\Gamma \vdash e_0:\tau \rightarrow \tau' \quad\quad \Gamma \vdash e_1 : \tau }{\Gamma \vdash e_0\ e_1 : \tau'}&[\mathtt{App}]\\ \\
 \displaystyle\frac{\Gamma,\;x:\tau\vdash e:\tau'}{\Gamma \vdash \lambda\ x\ .\ e : \tau \rightarrow \tau'}&[\mathtt{Lam}]\\ \\
 \displaystyle\frac{\Gamma \vdash e_0:\sigma \quad\quad \Gamma,\,x:\sigma \vdash e_1:\tau}{\Gamma \vdash \mathtt{let}\ x = e_0\ \mathtt{in}\ e_1 : \tau} &[\mathtt{Let}]\\ \\ \\
 \displaystyle\frac{\Gamma \vdash e:\sigma' \quad \sigma' \sqsubseteq \sigma}{\Gamma \vdash e:\sigma}&[\mathtt{Inst}]\\ \\
 \displaystyle\frac{\Gamma \vdash e:\sigma \quad \alpha \notin \text{free}(\Gamma)}{\Gamma \vdash e:\forall\ \alpha\ .\ \sigma}&[\mathtt{Gen}]\\ \\
\end{array}
$$

$\mathtt{Var}$는 변수 variable, $\mathtt{App}$은 함수의 적용 application, $\mathtt{Lam}$는 람다 표현식 lambda expression, $\mathtt{Let}$는 변수 선언, $\mathtt{Inst}$는 서브타이핑(i.e. 상속) Instance, $\mathtt{Gen}$는 보편화 generalization에 사용되는 타입 추론 규칙이다.

수학 기호를 마구마구 써서 매우 어려워 보인다. =_= 람다 대수에서 사용되는 표현들이 많다. 수학과를 전공했어도 특별히 관심있거나 괴짜가 아닌 다음에야 학부에서 람다 대수는 잘 안배우는 걸로 알고 있다(일단 내 주변에서는 한 명도 못봤다). 나는 따로 배운 적 없고 [A Tutorial Introduction to the Lambda Calculus](https://arxiv.org/abs/1503.09060)라는 논문만 읽었는데, 길지도 않고 람다 캘큘러스가 어떤 건지 대충 알 수 있으니까 한번 읽어두기를 매우 강추한다. 일단 기호의 의미는,

* 추론 규칙에서는 가운데 있는 긴 줄 위쪽이 가정이고 아래쪽이 결론이다. $\frac{A}{B}$ 는 "A 이면 B 이다"라는 뜻이다.
* $\Gamma$는 미리 전제된 가정들의 집합이다. 현재 컨텍스트, 이미 주어진 상황으로 생각해도 좋다.
* $\sigma$와 $\tau$는 타입을 가리키는데, $\tau$는 모노타입을, $\sigma$는 폴리타입을 가리킨다. 그러니까, $x:\sigma \in \Gamma$ 는 "$x$의 타입이 $\sigma$인 것이 이미 전제 중에 포함되어 있다", 뭐 그런 뜻이다.
* 함수의 타입은 입력 타입 -> 출력 타입이다. 입력으로 $\tau$ 타입을 받고 출력으로 $\tau'$ 타입을 뱉는 함수의 타입 P은 $\tau \rightarrow \tau'$이다.
* 람다 대수에서 람다 표현식은 $\lambda x. e$으로 표현된다. 람다 기호와 . 사이에 있는 변수들이 입력값, 그 뒤의 표현식이 출력 값이다. (파이썬에서 람다함수를 이 비슷하게 쓴다)
* 람다 대수에서 함수의 적용(= 호출)은 $fx$과 같이 표시한다. 왼쪽이 오른쪽에 적용된다. 함수의 합성은 $fghx$처럼 쓰면 된다.
* $\vdash$는 수학적으로 유추 가능함을 뜻한다. $\Gamma \vdash x:\sigma$는 전체 문맥에서 $x$의 타입이 $\sigma$인 것을 연역적으로 유추할 수 있다는 뜻이다.

---
각 특징의 증명을 여기서 유도하지 않겠다. 그냥 규칙 자체만 해설해도 타입 시스템을 공부하는데 충분히 도움이 될 거라고 생각한다.

### $\mathtt{Var}$

첫번째 $\mathtt{Var}$ 식은 variance, 변수 선언시에 적용되는 규칙이다. 해석해 보면,

$$
\displaystyle\frac{x:\sigma \in \Gamma}{\Gamma \vdash x:\sigma}
$$

> 주어진 전제에 $x$의 타입이 $\sigma$이라는 것이 포함되어 있다면 $x$는 $\sigma$ 타입으로 유추 가능하다.

동어반복같은 말이다. 당연해 보이고 실제로도 당연하다. 그냥 수학적 무결성을 위해서 필요한 식이고 그 이상의 의미는 없다고 생각된다.

### $\mathtt{App}$과 $\mathtt{Lam}$

$\mathtt{App}$과 $\mathtt{Lam}$ 식도 해석해 보자. 이 둘은 각각 apply, 즉 함수의 적용(호출)과 lambda 함수에서의 타입 추론 규칙이다. 개발자라면 이제 이 식의 의미도 직관적으로 이해할 수 있을 것이다.

$$
\displaystyle\frac{\Gamma \vdash e_0:\tau \rightarrow \tau' \quad\quad \Gamma \vdash e_1 : \tau }{\Gamma \vdash e_0\ e_1 : \tau'}
$$

> 어떤 함수 $e_0$가 $\tau \rightarrow \tau'$의 타입을 갖고, $e_1$이 $\tau$의 타입을 가질 때, $e_0e_1$는 $\tau'$ 타입으로 유추 가능하다.

$$
\displaystyle\frac{\Gamma,\;x:\tau\vdash e:\tau'}{\Gamma \vdash \lambda\ x\ .\ e : \tau \rightarrow \tau'}
$$

> 변수 $x$의 타입이 $\tau$일 때 표현식 $e$의 타입이 $\tau'$으로 결정된다면 $\lambda x.e$는 $\tau \rightarrow \tau'$ 타입으로 유추 가능하다.

### $\mathtt{Let}$

변수 할당에 적용되는 $\mathtt{Let}$ 규칙도 해석하기 그리 어렵지 않다.

$$
 \displaystyle\frac{\Gamma \vdash e_0:\sigma \quad\quad \Gamma,\,x:\sigma \vdash e_1:\tau}{\Gamma \vdash \mathtt{let}\ x = e_0\ \mathtt{in}\ e_1 : \tau}
$$

> $e_0$의 타입이 $\sigma$이고, $x$가 $\sigma$ 타입을 갖고 있을 경우 $e_1$ 표현식이 $\tau$ 타입이라면, $x$에 $e_0$를 할당했을 경우 $e_1$은 $\tau$ 타입으로 유추 가능하다.

### $\mathtt{Inst}$

다섯번째 $\mathtt{Inst}$ 규칙은 상속을 포함한 서브타이핑에 관한 규칙이다.

$$
 \displaystyle\frac{\Gamma \vdash e:\sigma' \quad \sigma' \sqsubseteq \sigma}{\Gamma \vdash e:\sigma}
$$

> $e$는 $\sigma'$ 타입이고, $\sigma'$는 $\sigma$ 타입에 포함될 때 $e$는 $\sigma$ 타입으로 유추 가능하다.

### $\mathtt{Gen}$

$$
  \displaystyle\frac{\Gamma \vdash e:\sigma \quad \alpha \notin \text{free}(\Gamma)}{\Gamma \vdash e:\forall\ \alpha\ .\ \sigma}
$$

여섯번째 규칙은 $\mathtt{Gen}$, generalization에 관한 규칙이다. 대충 '보편화' 정도로 번역이 될 것 같다. 이게 바로 haskell 등의 언어에서 자랑하는 Rank N 타입, `forall` 키워드에 관한 규칙이다. Rank N 타입에 관해서 한국어로 알기쉽게 잘 설명된 문서가 있어 참고하면 좋을 것 같다. https://opentutorials.org/course/2063/11681

간단히 설명해서, 템플릿, 제네릭처럼 타입 파라미터를 직접 받는 방식은 Rank 1 타입, 이런 Rank 1 타입 함수를 반환하는 고차 함수를 다시 Rank 2 타입, 이런 식으로 임의의 수 N까지 표현할 수 있느냐 하는 것이 Rank N 타입이다.

약간 어려운데, 일단 위 수식을 풀어 써보자.
> $e$는 $\sigma$ 타입이고, $\alpha$는 주어진 맥락에서 자유변수가 아닐 때, $e$는 모든 $\alpha$에 대해 $\sigma$이다.

우선 자유변수는 선형대수학에서 (물론 다른 대수학에서도) 사용되는 용어를 빌려 온 것이다.
람다 캘큘러스에서는 $M=\lambda x.T$에서 $M$에서는 $x$에 대해 종속 변수이지만, $T$에서는 $x$가 자유 변수라고 설명한다.

예를 들어 자바스크립트에서,

```javascript
const a = 1;
const plusA = (b) => {
  console.log(a + b);
}
plusA(1);
```

위의 `plusA` 함수와 같이, 함수 내부에서 외부에 있는 로컬 변수 `a`를 참조하는 함수를 클로저라고 한다. 이때 a는 함수 인자로 들어가는 게 아니라 외부에서 내려오는 값이므로, 값이 함수 내부에 종속되지 않는 자유 변수다. 반면 `b`는 `plusA` 함수의 인자로, 함수를 호출할 때 어떤 값을 집어넣느냐에 따라 달라지는 종속변수이다. 그러나 위 람다 캘큘러스의 정의에서처럼 함수 내부의 표현식(사실 void 타입이지만) `console.log(a + b)`에서는 a, b 모두 자유 변수가 된다.

대충 `자유변수가 아니다` = `함수의 인자 값, 또는 인자만으로 결정되는 값이다` 정도로 이해하면 될 것 같다.

위 내용을 갖고 다시 풀어 써보자.

> $\alpha$를 인자로 갖고 있는 함수 내에서 $e$가 $\sigma$ 타입일 때, $e$는 $\alpha$가 어떤 타입이든 $\sigma$ 타입이다.

그러면 이걸 다시 아래 예제에 적용해보자. 위 오픈 튜토리얼즈의 예시를 타입스크립트 비슷한 pseudo code로 바꾸고 변형했다.

```typescript
const isSameResult = <T>(f: Array[T] => number)
  => <S, U>(x: Array<S>, y: Array<U>)
  => f(x) === f(y);
// === 연산자는 피연산자의 값과 상관 없이 bool 타입을 반환하므로 isSameResult의
// 타입은 (T[] => number) => (S[], U[]) => bool로 추론 가능하다.

isSameResult(l => l.length)([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
// 위 추론에서, S는 number, U는 string으로 구체화(type instantiation 또는
// monomorphication)가 된다. 이 때, f(x)에서는 T가 number로, f(y)에서는 T가
// string으로 추론되는데, 타입스크립트에는 Rank N 타입을 지원하지 않으므로 T에
// any를 넣어 타입 추론을 피해가는 것 밖에 못한다. 위 예시에서는 generalization
// 된 함수를 한 번 더 generalization 해서 Rank 2 타입 함수를 만들어 해결한다.
```

아직 Rank N 타입을 지원하는 언어가 제한적이라서 낯설게 느껴지지만, 이 규칙을 손으로 몇 번 적용해 보면 타입 파라미터를 활용한 다형성에 더 익숙해질 수 있지 않을까 싶다.

## 이상

HM 알고리즘도 배워서 직접 구현해보거나 하는 것도 재미있겠지만 바쁘기도 하고 해서 아직 알고리즘까지 익히진 못했다. 대충 AST 내부를 순회하면서 위 규칙들을 적용하는 것이라고 상상중.

요즘 scala를 배우고 있는데, IDE의 자동완성, 타입 추론이 생산성에 지대한 영향을 끼친다는 것을 실감하고 있다. 그러니까... IDE가 자꾸 삐끗한다. 언어 차원에서 타입 체크 시스템을 잘 만들어서 LSP로 뿌려주면 그것만으로도 개발 경험의 질이 높아지는데, 개발자가 컴파일러 차원에서 타입 체크가 어떻게 돌아가는지 알아놓으면 언어에 대한 이해도를 한층 높일 수 있지 않을까 싶다.

## 참고

본문의 모든 하이퍼링크들과

* [Practical Foundations for Programming Languages](https://www.cs.cmu.edu/~rwh/pfpl/2nded.pdf)
* 위키피디아 영문판 [System F](https://en.wikipedia.org/wiki/System_F), [자유 변수와 종속 변수](https://en.wikipedia.org/wiki/Free_variables_and_bound_variables)
* [하스켈 위키](https://wiki.haskell.org/Rank-N_types)
