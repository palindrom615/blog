---
layout: post
title: "[마인크래프트] 최신 버전 자바 설치, 마인크래프트 적용 방법"
tags: [minecraft 마인크래프트 자바 java jdk sdk]
description: "그냥 아래에 있는대로 따라하면 끝"
date: "2020-02-26"
---

## tl;dr

그냥 아래 스텝을 따라하면 자바 설정 끝. 따로 설치 파일을 다운받거나 환경변수를 손으로 건드릴 필요가 없다. 32비트니 64비트니 신경도 쓸 필요 없다.

1. 파워셸 켜기
   1. `Win + r` 키 를 눌러 실행창 실행
   2. `powershell`이라 입력
   3. `Enter`

<video src="./1-powershell.mp4" preload="auto" style="width: 100%;" autoplay playsinline controls loop muted />

2. 파워 셸에 아래 스크립트를 복사/붙여 넣기

   아래 글을 복사해서 파워셸 창에 붙여 넣으면 됨.

   파워셸 창에서 마우스 우클릭하면 복사된 텍스트 붙여넣기 가능하다. 조금 기다리면 자바 설치 끝.

   ```powershell
   Set-ExecutionPolicy RemoteSigned -Force -scope CurrentUser
   iwr -useb get.scoop.sh | iex
   scoop bucket add palindrom615 https://github.com/palindrom615/scoop-bucket
   scoop update
   scoop install sdkman
   sdk install java
   Invoke-Expression (sdk export windows)
   Write-Output "Done!"
   ```

<video src="./2-scripting.mp4"  preload="auto" style="width: 100%;" autoplay playsinline controls loop muted />

3. 마인크래프트에 적용하기

   (이 부분은 마인크래프트를 안해서 확실하지 않다...)

   - 서버의 경우: **따로 건드릴 필요 없다.** [공식 문서](https://www.minecraft.net/ko-kr/download/server/)에 나와있는 명령어 그대로 넣어주면 된다. 마인크래프트 서버는 환경변수에 있는 JRE를 그대로 사용하니까 따로 건드릴 필요는 없다.
   - 클라이언트의 경우:
     1. 설정의 java 실행파일에서 찾아보기 버튼 클릭
     2. `Ctrl + l`키를 입력, 주소창에 `%JAVA_HOME%\bin`을 입력해서 이동
     3. 파일이름에 `javaw.exe` 입력 후 확인

<video src="./3-apply-to-minecraft.mp4" preload="auto" style="width: 100%;" autoplay playsinline controls loop muted />

**자바 설치 끝!**

## 자세한 설명(feat. [sdkman](https://github.com/palindrom615/sdkman))

자바뿐 아니라 스칼라, 코틀린 등의 언어/컴파일러, gradle, maven 등의 빌드 툴, Spark, spring boot 등의 프레임워크 등 JVM 이코시스템의 많은 sdk들을 관리해주는 [sdkman](https://sdkman.io/)이라는 툴이 있는데, 이게 bash로 짜여져 있어서 윈도우에서 사용하려면 WLS나 Cygwin을 사용해야 했다. 그게 별로 마음에 안들어서 클라이언트를 go 언어로 후딱 하나 짰다.

자바는 환경변수 설정이 왜이렇게 어려운지 모르겠다. 어차피 환경이 다 거기서 거기일텐데 좀 스마트하게 해주면 좋을 것을. 나도 옛날에 (`classpath`까지 손으로 설정해야 했으니까 java 5 이전 버전일듯) 맨날 설치할 때 뭐가 꼬여서 몇시간씩 낭비하고 그랬다.

이 애플리케이션은 자바를 처음 배우는 학생이나 개발자들이 그런 일에 시간을 덜 낭비했으면 하는 마음에서 만들었다. 환경변수를 손으로 만지거나 하는 그런 쓰잘데기없는 시간을 아껴서 이선균 성대모사를 연습하거나 코를 긁거나 뭐 그런 유익한 일에 활용했으면 한다.

헛소리는 그만하고 sdkman는 scoop과 brew로 배포하고 있다. 사용법은 [github README](https://github.com/palindrom615/sdkman)로 대신한다. go 언어에는 [goreleaser](https://goreleaser.com/)라는 좋은 CI 템플릿이 있어서 자동으로 필요한 환경들로 크로스 컴파일해주고 github에 릴리즈해주고 scoop과 brew에 배포까지 해준다.

마인크래프트는 그냥 SEO때문에 넣은 거고 잘 모른다. 조회수 좀 올라갈 지 기대가 된다.
