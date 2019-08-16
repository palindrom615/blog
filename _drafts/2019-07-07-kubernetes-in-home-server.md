---
layout: post
title: "홈 서버로 띄우는 3분 쿠버네티스"
tags: [kubernetes, docker, container, helm, 쿠버네티스, 도커, 컨테이너, 헬름]
excerpt: "이제 쿠버네티스는 프로덕션 환경에서 필수다. 그동안 클라우드 중심 기술이라서 직접 해보기 어렵다는 핑계로 배우기를 미뤄왔는데, 서버를 하나 만들 일이 생겨서 쿠버네티스를 try해 본다."
---

## 백그라운드

컨테이너 기술이 얼마나 편리한 지 내가 또 설명할 필요는 없을 것 같다. 업무 시간 외에도, 나는 일상 생활이나 개인 개발에 도커를 자주 쓰려고 하는 편이다. 주로 이럴 때 사용하는데, 너무 편하다.
* 일회용이나 개발용 로컬 db가 필요할 때
    * 어릴 때 php, 아파치 서버, mysql을 컴퓨터에 깔아 보려고 시도한 적 있는가? 없다면 비교적 세상을 순탄하게 살아온 셈이다. 나는 **절대로 로컬에 db를 깔지 않는다**. 절대로. 도커 커맨드 한 줄로 어떤 DB든 한방에 인스턴스를 띄울 수 있으니까 이제는 로컬 환경에 db를 깔 필요가 없다.
* 구버전 스크립트 언어 런타임이 필요할 때
    * 세상을 살다 보면 어쩔 수 없이 python 2나 node 4.x, ruby 2.2 같은 구버전 환경이 필요할 때가 있다. 스크립트에 사이드 이펙트가 없는 경우 nvm이나 pipenv을 뒤늦게 깔아서 뒤적거리는 것보다 그냥 Dockerfile 하나를 작성해서 쓰는게 빠를 때가 왕왕 있다.

최근에 새로 윈도우 홈서버를 만들었다. 새 서버로는 이런 일들을 해보려고 한다.
* 젠킨스 서버를 띄우기
    * 요번 회사에서 젠킨스를 쓰는데 아직 젠킨스를 제대로 써 본적이 없어 한번 돌려보는게 좋을 것 같다
* 지라 서버를 띄우기
    * 요번 회사에서 지라를 쓰는데... 이하 상동.
* 소나큐브 서버를 띄우기
    * 상동

아무래도 엔터프라이즈용 앱들은 웹 앱이 다수다. 서버도 생겼으니 내 전용 워크플로우를 구축해보는것도 재미있겠다 싶어 쿠버네티스를 활용해 이 서비스들을 구축하려고 한다.

## 서버, 도커, 쿠버네티스

지금은 다소 나아졌지만, 아직도 도커를 가상머신과 비교하는 글이 굉장히 많다. 나도 처음 도커를 접하고 한동안 도커 = 가벼운 vm이라는 잘못된 등식을 떨쳐내지 못해 베스트 프랙티스를 이해하는데 어려움을 겪었다. 도커에도 네트워크나 볼륨처럼 실제 하드웨어를 가상화하는 부분이 있기도 하고, 기존 배포환경에서 가상 머신으로 하던 걸 지금은 도커로 하고 있으니까 뭐 이해가 안가는 것은 아니지만 도커 컨테이너를 "성능 좋은 가상머신"정도로 생각하는 것은 잘못된 비유다[^1]. _컨테이너는 systemd에서 띄우는 디먼과 같은 존재다. vm같은 것이 아니다. 그러니 도커는 KVM이나 hyper-v같은 하이퍼바이저가 아니라 systemd와 같은 프로세스 매니저로 생각을 해야 맞다._ 

[^1]: [공식 블로그](https://blog.docker.com/2016/03/containers-are-not-vms/)를 포함해 여러 글에서 설명하고 있다

그러니까 컨테이너로 뭔가를 할 때면 디먼이나 서비스로 치환해서 생각해보자. 컨테이너에 ssh로 접속한다고? 기껏 도커를 활용해 격리해놓은 reproducible한 환경을 무너트리고 싶으면 그래도 된다. 컨테이너의 내용물을 바꾸고 싶으면 이미지부터 다시 만드는게 맞다. 컨테이너에 systemd를 띄운다고? 도커는 그 자체로 컨테이너들을 관리하는 서비스 매니저다. systemd로 도커 서비스를 띄워놓고 도커에 컨테이너를 올려놓은 다음에 다시 컨테이너 위에 systemd를 올리는게 좋은 방법 같은가?[^2] [^3]

[^2]: [서버 프로세스를 관리하는 올바른 방법](http://www.codeok.net/%EC%84%9C%EB%B2%84%20%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EB%A5%BC%20%EA%B4%80%EB%A6%AC%ED%95%98%EB%8A%94%20%EC%98%AC%EB%B0%94%EB%A5%B8%20%EB%B0%A9%EB%B2%95)이라는 글을 추천한다. 오래된 글이긴 하지만 읽는 것이 시간낭비는 아닐 것이다
[^3]: [도커 공식 리퍼런스에서 설명하는 컨테이너 안에 여러 서비스를 띄우는 방법](https://docs.docker.com/config/containers/multi-service_container/)

뜬금없이 도커 가지고 웬 꼬장이냐 하면, 도커는 프로세스의 추상화임을 지적하기 위함이다. 재작년부터였나 '쿠버네티스가 리눅스를 대체했다'는 토픽이 여기저기 자주 올라온다. 

그 말 그대로, 이제는 더 이상 시스템 관리자가 systemd 등을 손수 건드릴 이유가 없다. systemd는 디먼 관리에 다재다능한 툴이지만 웹서비스 배포를 위한 툴이 아니라서 추상화가 덜 되어있다. 분명 systemd로도 [scale out](https://unix.stackexchange.com/questions/288236/have-systemd-spawn-n-processes)도 할 수 있고 [blue green 배포](https://www.kimsereylam.com/gitlab/nginx/dotnetcore/ubuntu/2019/01/04/custom-blue-green-deployment-with-nginx-and-gitlab-ci.html#systemd)도 할 수 있지만, 

 https://www.netroby.com/view/3795
 
<blockquote class="twitter-tweet"><p lang="ko" dir="ltr">한번에 workbench 만들어주는 툴이 있으면 &#39;이거 분명히 나중에 문제 생길거야&#39; 하면서 첨부터 삽질해보려는 사람들의 모임. <br>(ex, minicube 안 써보고 바로 쿠버네티스 풀 셋업부터 시도, gradle 프로젝트 만들고 gradle에서 spring 의존성 설치) <a href="https://t.co/fiQCFtdW9x">https://t.co/fiQCFtdW9x</a></p>&mdash; 이수호(李琇浩) (@bin_bash_shell) <a href="https://twitter.com/bin_bash_shell/status/1149571238739640321?ref_src=twsrc%5Etfw">July 12, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
무척 
