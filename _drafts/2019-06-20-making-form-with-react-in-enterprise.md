---
layout: post
title: "리액트로 대형 폼 컴포넌트 다루기"
tags: [react form 리액트 폼 antd]
excerpt: "사내 어드민, 총합 100개 이상의 필드를 가진 폼 컴포넌트를 antd로 다루기"
---

## 백그라운드

우리 회사는 플랫폼 비즈니스를 하고 있는데, 나는 고객사들을 관리하는 팀에서 엔터프라이즈 애플리케이션 개발을 하고 있다. 지금은 거의 프론트엔드 일을 도맡아서 하고 있는데, 사실 프론트 말고 다른 것들도 많이많이 해보고 싶지만 일정에 쫒기다 보니 비교 우위로 내가 조금 더 잘하는 프론트 엔드쪽에 치우친 일을 많이 하고 있다.

엔터프라이즈 개발은 우선순위가 커스터머 서비스와는 완전히 다르다. 기술의 완성도보다는 비즈니스 논리를 우선시하고 금방금방 바뀌는 비즈니스 환경을 따라잡을 생산성을 위해서 견고한 구조와 유지보수성을 중시한다. 그리고 엄청 정보량이 많다. 이 정보량을 처리하기 위해 퍼포먼스에서 타협점을 찾는게 큰 과제가 된다.

내가 하는 업무도 커스터머 서비스를 개발하는 다른 프론트엔드 엔지니어들과 지향점이 다소 다르다. SSR이니 코드 스플리팅이니 하는 온갖 방법을 동원해 쾌적한 사용자 경험을 제공하려고 노력하는 다른 프론트엔드 엔지니어들과는 달리 내 업무에서 클라이언트 전체 번들 사이즈나 초기 로딩 속도는 그리 우선순위가 높지 않다. 사용성은 중요하지만, 처음 사이트를 방문한 사용자에게 친절한 UX는 내 업무에서 고려대상이 아니다. 내 애플리케이션의 사용자는 하루 종일 그 애플리케이션을 사용해야 하는 사람들이다. 그러니 내가 신경써야 하는 사용성 역시 되도록 밀도 있는 정보를 중복없이 전달하고 빠르게 상호작용할 수 있는 방법을 제공하는 것이다. 한 프레임이 40ms를 넘어가지 않는 한 퍼포먼스에 신경쓰는 일은 별로 없다. (그러나 워낙 정보량이 많아서 이 널널한 기준을 만족하기가 생각보다 쉽지는 않다)

그리고 무엇보다 중요한 건 폼, 폼, 폼이다. 프론트 엔드에는 비즈니스 로직도, 도메인도 없다(만약 그런게 있다면 뭔가 상식적인 설계는 아닐테다). 정보의 CRUD, 즉 생성, 조회, 수정, 삭제를 수월하게, 내가 원하는 방식대로 하게 만드는 것이 전부다. 여러가지 invariant, validator를 넣고 이벤트 핸들러를 여기저기 갖다 붙이고 하는 것들도 뭐 중요하지만 데이터를 어디에 넣어서 어떻게 쓸지 하는 것이 이제 가장 큰 관심사가 된다. 너무나 당연하게도 우리 회사는 리액트를 쓰고 있다. 리액트는 모든 면에서 탁월한 라이브러리지만 특히 우리의 주 관심사인 상태 관리 측면에서는 더욱 탁월하다.

그러나 칼럼 개수가 수십개가 되면 [리액트 예제](https://reactjs.org/docs/forms.html#controlled-components)처럼 일일이 state에 칼럼을 추가하고 이벤트 핸들러를 추가할 수는 없다. 부모 컴포넌트에 그런 짓을 하면 한 칼럼에 `onChange` 이벤트가 걸릴 때마다 state가 업데이트되어서 전체 폼이 다시 렌더링되는 바람에 엄청나게 느려질 것이다.