---
layout: post
title: "My RustConf 2018 Closing Keynote 번역"
date: 2019-04-27 15:25:00 +0900
tags: [rust, ECS, 게임개발]
---

원문: [https://kyren.github.io/2018/09/14/rustconf-talk.html](https://kyren.github.io/2018/09/14/rustconf-talk.html)

이 글의 원저자 [Catherine West](https://github.com/kyren)에 대해서는 본문에 충분히 나오기에 따로 덧붙이지 않았습니다. 

rust 프로그래밍에 흥미가 있어 지난 12월에 번역해놓고 잊고 있던 글입니다.

이 글을 번역한 저는 전문 번역가가 아니고 게임 개발에 대해서 문외한입니다. 어색하거나 기술적으로 틀린 부분을 고칠 수 있도록 많은 지적 바랍니다.

---

RustConf 2018 폐회 키노트에서 에서 두 가지를 약속했습니다.
1. 슬라이드를 온라인에 올리기
2. 내 블로그에 긴 버전의 토크를 올리기
2.a. 일단 블로그를 만들기

...시간은 오래 걸렸지만 마침내 약속한 것들을 다 해냈습니다!

아직 키노트를 본 적 없는데 보고싶다면 [여기](https://www.youtube.com/watch?v=aKLntZcp27M)서 볼 수 있습니다.

(약간의 에라타를 거친) 토크의 슬라이드는 [여기](https://kyren.github.io/rustconf_2018_slides/index.html) 올라와있습니다.

저는 토크에서 약 30분의 시간 제한 때문에 하지 못했던 이야기들을 블로그에 올리겠다고 약속했습니다. 아래 있는 것들이 토크의 원래 버전이지만 사실 이대로는 올리지 않으려고 했습니다. 원래는 어마어마한 길이의 텍스트를 좀 정리하고 올리려고 했는데, 정신차리고보니 글 전체를 다시 쓰고 있었기 때문에 그걸 올리는 대신 그냥 빨리 *약속한 버전을* 올리기로 했습니다.

썩 만족스럽지는 않습니다. 돌이켜보니 30분 정도로 요약하면서 현명하게 자를 것들을 선택한 것 같습니다. 콘솔 개발 부분은 너무 주관적이고 그렇게까지 도움 되는 부분도 아니었습니다. 언어 바운더리를 다룬 특히 어려운 끝 부분은 사실일지언정 토픽을 약간 빗나갔죠. 그러나 사람들은 재밌어했고 자꾸 저에게 포스팅을 재촉했습니다. 그래서 미루지 말고 가볍게만 바꾼 버전을 올리기로 했습니다. 내가 30분이라는 시간제한을 깨닫기 전에 만든 것이라는 것을 염두에 두세요:) 토크를 위해서 만들었기 때문에 좀 인포멀하고 대화 스타일로 쓰였습니다.

이만 줄이고...

---

## RustConf 2018의 초안

이 글은 RustConf 2018 키노트에서 발표한 것의 초안입니다.

청중이 Rust와 함께 C++도 약간 알고 있다고 가정한 채 쓰였고 C++ 코드 예제가 꽤 많이 나오지만 C++에 익숙치 않아도 읽는걸 방해하진 않을 정도로 어렵진 않을거에요.

## 이 토크의 기본적인 명제

Rust는 몇몇 프로그래밍 패턴을 작성할 때 다른 언어보다 훨씬 고통스럽게 설계되었습니다. 이건 **좋은**겁니다! Rust로 게임 개발을 하는 가장 쉬운 방법이 대체로 *다른 모든* 언어에서도 가장 쉬운 길이거든요.

불행히도 나는 그걸 **매우 어렵게** 배웠습니다!

Rust에서는 간단하고 알기 쉬운 소유권 설계를 갖춘 데이터 지향 디자인을 유도하는데, 이건 게임 개발에 딱입니다. 아마 게임 개발만은 아닐겁니다! (잘 모르지만요)

## 왜 당신이 이걸 읽어야 하고, 나는 누군가요?

나는 Starbound의 선임 프로그래머였습니다. 나는 Chucklefish가 IRC에서만 일하고 있을 때부터 있었던 창립 멤버중 한명이고, "기술 선임"이라는 직책이 생겼을 때 기술 선임이었습니다. 아직도 가끔씩 Chucklefish에서 일하긴 하지만 이제 미국으로 다시 돌아갔기 때문에 요즘은 좀 더 독립적으로 일하고 있습니다.

하지만 솔직히 당신이 이걸 **읽어야만 하는** 이유는 없어요! 나는 **단 하나의** 게임을 릴리즈했고 이 토크는 내가 **하나**의 게임을 개발했을 때 **하면 안되었던** 일에 대한 경고를 포함하고 있습니다.

아마 *커다란* 사업적 결정을 내릴 때 내 토크를 근거삼으면 안될 겁니다. 나는 Rust가 당신에게 알맞은지, 당신의 게임을 Rust로 만들어야 할 지에 대해 확답을 줄 수는 없어요. 아마 좀더 고려해야 할 사항이 있을 겁니다. 인디라면 개발 실력이나 인내심, 선호도일거고 회사에 있으다 도구나 엔진, 미들웨어 등등 이미 사용하고 있는 것들을 생각해 봐야 할 겁니다.

아마 나 개인적으로는 당분간 게임 개발(과 다른 것도)에 Rust를 사용할 겁니다. 그 이유를 알고 싶거나 이미 Rust를 사용할 거라고 마음먹었다면 이 글이 유용할 겁니다.

이 글은 제 취향보다는 좀... 모호합니다. 난 사실 분명치 않은 구조적이거나 보편적인 충고보다는 기술적인 조언을 하는게 더 편한 사람입니다. 이게 유용하다고 생각해서 올리긴 했습니다(다들 흥미로워하고요). 하지만 기억하세요. 이건 그냥, 내 의견입니다.

## **도대체** 어떻게 Rust로 게임을 만들죠?

몇 년간 이 질문을 아주 많이 받았습니다.

> Rust로 처음부터 끝까지 게임을 어떻게 만들죠? 아니 진짜... 어떻게? 그러니까, *이론상*은 가능이야 하겠지만 내가 다른 언어로 항상 했던 어떤 패턴을 Rust에 적용시키려고 하면 자꾸 문제가 생기던데요? 이걸 "borrow checker와의 싸움"이라고들 한다던데, 사실... 그게 그렇게 *도움*되는지 모르겠어요. 뭘 잘못한거죠?

아니면 이런 거죠.

> 코드를 엄격하게 관리하고 싶을 때 rust가 얼마나 좋은지야 알지만, 작은 유틸리티나 보안이 무지 중요할 때 쓰이는 것도 봤지만, 이건 너무 엄격한 것 같은데요! 게임처럼 큰 프로젝트를 이런 제한을 갖고 어떻게 개발하는지 모르겠어요. 어떻게 게임같은 걸 `Rc<RefCell>`이나 `Arc<Mutex>`p를 떡칠하지 않고 개발 할 수 있죠?

이 (가상의) 질문은 당연히 게임에 관한 내용이지만 사실 다른 분야에서도 Rust에 대한 생각은 비슷합니다. 몇몇을 제외하면 나는 이 생각에 동의하지 않습니다(어쨌든 여긴 RustConf기도 하고요). 그 이유를 설명하기 위해 내가 잘 아는 게임 개발의 관점에서 얘기를 하려고 합니다.

사실 단상에 올라가서 "나 원, 그렇게 어렵지 않아요! 데이터 지향 디자인을 하세요! 게임을 개발하면 ECS를 쓰세요! ...감사합니다" 라고 말한 다음에 내려갈 수도 있겠죠. 그게 맞는 말이긴 하지만, 나는 좀 더 근본적인 점을 지적하려고 합니다. 이 질문에 대한 정말정말 짧은 답은 이렇습니다. 객체지향 디자인은 잊어버리고 게임의 상태를 대표하는 데이터의 표현에 집중하고, 문제를 실제보다 복잡하게 만들지만 않는다면 사실 그렇게 어렵지는 않습니다. 이제 천천히 Rust로 ECS 구현을 해보면서 한 과정씩 설명해보겠지만 사실 모든 과정이 필요하진 않습니다. 나는 사실 ECS같은 디자인 패턴이 필수라고조차 생각하지 않습니다. 그보다 *과거의 내가* 갖고 있었던, 문제를 엉키게 하던 몇몇 습관을 버리는 것이 더 중요하다고 생각합니다. Rust에서는 특히.

누군가에게는 내가 말하는게 *너무 당연해* 보일거에요. 당신에게 이게 너무도 뻔하다면, 좋아요. 내게는 항상 그렇진 않았습니다. 사실 내가 Rust를 그렇게 좋아하는 이유는 내가 Rust로 게임을 만들면서가 아니라 Rust를 해보기 전에 Starbound를 만들면서 저지른 실수에서 이런 것들을 배웠기 때문입니다. 누군가 내가 **하지 말아야 할 일**을 가르쳐줘야 하고, 과거의 나 자신에서 그걸 배울 수 있어서 정말 좋습니다.

나는 그냥 예전에 누가 해줬던 조언들을 되풀이할 뿐입니다. 사실 몇몇은 너무 널리 퍼져서 일종의 진리처럼 여겨집니다. 상속은 나쁘다, 객체지향는 거의 항상 나쁘다, ECS는 좋다 등등... 다행히 이것들은 사실인데, 이제 왜 그런지, borrow checker가 있으면 왜 더 중요한지 살을 붙여 보여드리려고 합니다. Rust로 게임 개발을 하려는 사람들에게 도움이 될 겁니다.

## **도대체** 어떻게 게임을 *전부 다* 만드는지

아마 이 질문은 게임 아키텍쳐를 처음부터 만들 때만 나올 겁니다. 대부분은 그러진 않죠. 사실 보통 인디 개발자를 위해 조언할 때 **절대** 직접 엔진을 만들지 말라고 합니다. Unity나 Unreal같은 걸로 게임을 만들기로 했다면 시스템적인 부분이 처음부터 많이 정해집니다.

난 이 충고를 따르지 않았습니다. 사실 Starbound를 개발하면서 인디 개발자를 위한 많은 충고를 따르지 않았습니다. 예컨대

* 직접 엔진을 만드려고 하지 마라 (Starbound는 SDL/libogg/libvorbis/libfreetype 위에서 돌아가는 쌩 C++로 만들었습니다)
* 항상 프로토타입을 만든 뒤 이걸 버릴 계획을 세워라 (데모를 위해 2주간 만든 코드와 1.0 릴리즈 때의 코드는 연속적입니다)
* 진짜로, 엔진을 만들지 마라. Unity/Unreal/Godot 등등을 써라 (심지어 우린 boost도 안썼습니다! 사실 c++17에 있는 std::optional이나 std::variant를 우리만의 버전으로 만들어 starbound에서 썼습니다. 그때는 boost에 의존하는 것보다 그게 더 쉬웠습니다. 2d 텍스쳐 아틀라싱도 직접 만들었는데 수많은 그룹화하기 어려운 오프라인 텍스쳐 아틀라싱을 만들 방법이 마땅치 않았기 때문입니다)
* 첫 번째 게임은 릴리즈를 빨리 할 수 있도록 간단하게 만들어야 한다 (starbound에서 플레이어가 갖고 있는 아이템은 플레이어의 물리에 영향을 미치는 각각의 루아 스크립트를 갖고 있습니다. 이 스크립트는 다른 아이템과 상호작용할 수도 있고 플레이어끼리 다른 스크립트를 갖고 있으면서 상호작용할 수 있도록 만들어졌습니다. 또 이 스크립트는 플레이어에게 거의 모든 엔티티가 갖고있는 스탯 데이터베이스에 커스텀 스탯과 컨트롤러를 더할 수도 있습니다. 또 복잡한 방식으로 물질 블록을 그리는데 쓰는 좀 이상한 DSL도 있죠.)

내 첫 번째 상업용 게임에 했던 비슷한 걸 시도하는 사람에게 내 전철을 밟지 마라, 추천하지 않는다고 말하지는 않으려고 합니다. 그러나 꽤 많은 인디 개발자가 Unreal / Unity 스타일 게임엔진을 사용하지 않으려고 합니다. "프레임워크" 스타일 게임엔진 대신에 좀더 "라이브러리" 스타일을 써서 특정 기능을 위한 개인적인 라이브러리를 쓰거나, 렌더링, 오디오, 인풋을 제공하는 작은 "프레임워크"를 써서 게임의 기본적인 구조를 직접 만듭니다. (예전에 당황스럽게도 어떤 포팅 하우스가 이걸 "전통적인" 개발 방식이라고 불렀습니다)

* XNA나 MonoGame으로 만들어진 게임들. XNA / MonoGame은 확실히 많은 패키지(렌더링, 사운드, 인풋)를 제공하지만 게임의 아키텍쳐를 강제하지는 않습니다. Terraria나 Stardew Valley 정도가 있겠네요.
* Jonathan Blow가 만든 모든 게임들(Braid, The Witness)
* Zach Barth가 만든 모든 게임들(Zachtronics). 그가 게임 개발을 시작하면 일단 쌩 이벤트 루프(input / update / render)로 시작한다고 합니다(주: 출처를 못찾았는데, 내가 틀리질 않기 바랍니다. 그의 인터뷰에서 본 기억이 납니다)
* Supergiant가 만든 모든 게임들(Bastion, Transistor, Pyre)
* 100% Chucklefish 스튜디오에서 만들어진 게임들: Starbound와 Wargroove (C++ halley로 만들었지만 엔진 대부분은 Wargroove 개발자가 만들었습니다)
* 수도없이 많은 2d 게임과 일부 3d 들이 이렇게 만들어집니다. 우리같은 사람들은 다발로 있습니다. 믿으세요.

물론 unity나 unreal로 개발하기로 했다면 제 충고는 필요 없겠죠. 그게 훌륭하고 만족스럽다면 그걸 떠나라고 설득하지는 않으려고 합니다. 분명 그런 경우는 아마 아주아주 일시적인 경우를 제외하면 Rust를 잘 안쓸 겁니다. 하지만 솔직히 나는 결국 Rust가 이런 상업용 주요 게임 엔진에 들어가는게 시간 문제라고 생각합니다. 지금은 그러나 Rust를 쓰려는 사람은 모든 것을 새로 만드는 타입의 인디 팀이나 자기만의 기술을 보유하고 있는 일부 AAA급 스튜디오밖에 없을 겁니다 (기다리고 있어요! EA SEED!). 또 언젠가 Rust를 쓰는 unity나 UE의 경쟁자가 나타날 거라고 생각합니다.

그래요, 게임을 만드려는 당신이 Unity나 Unreal처럼 게임의 스트럭쳐의 대부분을 결정하는 opinionated된 게임 엔진을 사용하지 않고 Rust를 쓰기로 결정했다 칩시다. 어떻게 만들어질까요?

## 과거에는 게임을 어떻게 만들었을까

과거, 대부분의 게임은 어쩔 수 없이 "데이터 지향"으로 만들어졌습니다. 128KB의 RAM(SNES)에는 추상화를 위한 공간이 별로 없었거든요. 이걸 "Action Replay" 시대라고 부를까 합니다. 그때는 게임의 RAM 상태를 매 프레임마다 패치할 수 있는 "Game Genies"나 "Game Sharks"라고 부르는 치팅 기기가 있던 시대였습니다. "Game Genie"같은 기기들은 게임 카트리지의 ROM을 패치할 수 있었지만, "Action Replay" 시절의 기기는 실제로 훅을 VBlank handler라는 걸로 집어넣어서 매 프레임마다 실제 상수 주소에 박혀있는 메모리 값을 덮어써서 예를 들어 생명이 줄지 않게 한다든가 하는 조작을 할 수 있었습니다.

이것이 동작하는 이유는 128KB의 RAM에서는 `malloc`따위를 구현할 수가 없었기 때문입니다. 스토리지의 모든 바이트가 귀중했던 그 시절의 게임들은 직접 메모리 내의 게임 상태를 위치를 알기 쉽게 수동으로 관리했습니다. NES / SNES 시대에는 메모리가 너무 적어서 그래픽 요소(타일, 스프라이트)와 논리적 상태가 구분되지 않았고 "엔티티" 구조 따위를 넣고 싶어도 게임 내에 있을 수 있는 "것들"의 최대치가 턱없이 적었기 때문에 추상화가 들어갈 공간이 없었죠. 이 시대는 "화면이 꺼지면 치유"라고 불리기도 하는데 화면을 끄면 게임 레벨이 전부 초기화됐기 때문이죠(적들도 마술처럼 회복됩니다).

Rust로 NES 게임을 구현한다고 생각해보면 (아마 **무지** 어렵겠지만 불가능은 아니겠죠? 최소한 C보다 어렵지는 않을 겁니다. 아마 그 시절 거의 모든 게임은 어셈블러로 직접 구현했을 겁니다) 이런 식으로 정적인 자료 구조를 정의해야 했을 겁니다.

```rust
pub type ProjectileType = u8;
pub type EnemyType = u8;
pub type EnemyBehavior = u8;
pub type Tile = u8;

pub struct PlayerProjectile {
    pub pos: Vector2<i16>,
    pub proj_type: ProjectileType,
    // etc...
}

pub struct Enemy {
    pub pos: Vector2<i16>,
    pub enemy_type: EnemyType,
    pub behavior: EnemyBehavior,
    // etc...
}

pub struct GameState {
    pub player_pos: Vector2<i16>,
    pub player_vel: Vector2<i8>,
    pub player_health: i8,

    // 스크린에 5개 이상의 투사체를 표시하고 싶다고요? 안됩니다. 플레이어가
    // 더 발사하면, 제일 오래된 것을 지우거나 쏜 투사체가 부딪히거나 
    // 화면 밖으로 나가길 기다릴 수밖에 없습니다 (메가맨처럼)
    pub player_projectiles: [Option<PlayerProjectile>; 4],

    // 모든 레벨 데이터는 이 상수 블럭에 저장됩니다.
    pub level_tiles: [[Tile; 64]; 64],

    // 스크린에는 8명의 적이 표시되고, 다 생성되면 적을 더 스폰하기 위해서는
    // 적이 없어지길 기다려야 합니다 (커비의 모험에서는, TAS에서 이것이
    // 심하게 남용되었습니다)
    pub enemies: [Enemy; 8],

    // etc...
}
```

이게 그냥 가상의 예이긴 하지만 자료구조가 이런 식으로 펼쳐지는것만 봐도 소프트웨어가 어떻게 작동하는지 많은 것을 알 수 있을 겁니다.

특기할 만 한 건 모든 SNES 게임들이 어셈블러로 만들어졌기 때문에 자료 은닉같은 것들이 없고 업데이트 루프 어디에서나 모든 게임의 상태에 접근할 수 있다는 겁니다.

N64가 나오기 전까지 꽤 오래 이렇게 모든 객체가 하나하나 소중히 배치되었습니다. 현대 게임 엔진 디자인과 유사한, 좀더 익숙한 예를 하나 더 들어 봅시다. 내가 가장 좋아하는 게임 중 하나인 마리오 64입니다. 마리오 64는 3D이기 때문에 재밌죠. 로우 폴리곤의 간단한 그래픽임을 제외하면 현대 3D 플랫포머와 그렇게 다르진 않죠? 이것도 역시 "액션 리플레이" 시대의 게임이고 대충 모든 레벨 데이터가 N64의 고급진 4MB의 램에 들어가 있습니다. 모든 맵, 다양한 레벨 플래그 등등이 예측가능한 메모리 블럭에 들어있습니다. 하지만 대부분의 동적 컨텐츠는 모던 게임 엔진처럼 "엔티티"의 형태로 저장되어 있습니다. 마리오 64에서는 엔티티 구조가 정확히 608바이트이고 240개라는 상한선이 있었습니다 (더 적을 수도 있습니다. 불바다의 바우저에서는 232개라는 제한이 있었습니다).

마리오64가 뭘로 프로그래밍됐는지는 모르지만 아마 C일 것이기 때문에 그 시대에서 미래의 더 나은 시스템 언어를 찾으려는 불타는 욕망을 안고 타임머신을 타고 미래로 왔다면 Rust로 마리오64같은 상업용 게임을 만들 것입니다. 약간의 예술적 허용을 더해 어떤 식으로 짜여졌을 지 생각해봅시다.

```rust
pub struct EntityAnimation = u8;
pub struct EntityBehavior = u8;

pub struct Entity {
    // 초기화 되었고 활성화되어 있는지 아니면 이미 죽어서 덮어씌워도
    // 되는지
    pub initialized: bool,

    // 이건 진짜 재미있습니다. 마리오64에서 모든 엔티티는 "중요"와
    // "비중요" 엔티티로 나뉘었습니다. 중요 엔티티에는 마리오나 코인,
    // 적 같은 겁니다. 비중요는 바람 효과나 마리오가 엉덩이찍기할 때
    // 나오는 별같은 겁니다. 게임에 엔티티 슬롯이 없으면 비중요 엔티티를
    // 지우고 중요 엔티티를 위한 공간을 만듭니다.
    // 게임에 240(불바다의 바우저에서는 232)개 이상의 중요 엔티티가
    // 생기면 게임은 멈춥니다.
    pub important: bool,

    pub position: Vector3<f32>,
    pub rotation: Vector3<f32>,

    // 실제 마리오64에서 여기 이런 것들은 대부분 포인터겠지만, 그냥 인덱스로
    // 쉽게 표시할 수도 있죠. 나중에 보겠지만 중요합니다.
    pub animation: EntityAnimation,
    pub behavior: EntityBehavior,

    pub visible: bool,
    pub damage_mario_on_touch: bool,
    pub home_in_on_mario: bool,

    // 여러 애니메이션과 게임 플레이를 위한 보편적인 타이머
    pub timer: u16,
    // 엔티티 타입마다 다르게 쓰이는 보편적인 액션
    pub action: u8,

    // Lots more stuff...
}

pub type EntityIndex = u8;
pub struct WorldRenderGeometry;
pub struct WorldCollisions;

pub struct GameState {
    pub world_render_geometry: WorldRenderGeometry,
    pub world_collisions: WorldCollisions,

    // 절대, 240은 넘으면 안됩니다
    pub entities: [Entity; 240],

    // 포인터 대신, 엔티티 배열의 인덱스를 저장합니다
    pub mario_entity: EntityIndex,

    // Lots more stuff...
}
```

한 줄 한 줄이 그렇게 중요하진 않구요, 이런 것들이 중요합니다.

* 게임의 상태를 표현하는게 (여기서는 좀 극적으로 간단하게 했지만) 여전히 간단합니다. 램 값을 예측하기 쉽고 추상화라고 할 만 한게 별로 없습니다. 모든게 직설적입니다.

* N64시대에 무슨 언어로 작성하는지 확실히는 모르지만 C로 짜여진 몇몇 타이틀은 알고 있습니다(Shadow of the Empire). 아마 C가 대세였을 겁니다. 마리오 64처럼 게임 구조는 간단하고 예측가능했을테니 게임의 상태는 전역 C 구조체나 구조체 배열이라고 추측할 수 있습니다.

* 상상이지만 아마 데이터 은닉은 별로 없었을 겁니다. 거대한 static 전역 구조체가 모든 게임 상태를 저장해놓고 모든 게임의 코드가 투명하게 만들어졌을 겁니다.

* 함수 포인터야 있었겠지만 객체지향 개념이 크게 쓰이지는 않았을 겁니다. vtable이나 그 비슷한 것도 보이지 않으니까요. 물론 제가 전문가는 아니고 그냥 추측이지만 제가 N64 시대에 대해 조사해본 바로는 그냥 지루하고 돌아가기만 하는 쌩 C로 데이터 포맷을 읽을 뿐인 엔진을 만들었을 겁니다.

마리오 64를 rust로 구현한다면 거대하고 절차지향적이고 단순한 게임 엔진을 C보다 좀 더 좋게 만들 수는 있겠지만 결국은 그냥 C같은 코드가 나올 겁니다. 단순화하면 게임엔진은 이런 식으로 나올 겁니다.

```rust
pub struct EntityAnimation = u8;
pub struct EntityBehavior = u8;

pub struct Entity {
    // ... see above
}

pub type EntityIndex = u8;
pub struct WorldRenderGeometry;
pub struct WorldCollisions;

pub struct GameState {
    // ... see above
}

fn main() {
    // 모든 게임 상태는 그냥 전역입니다
    let mut game_state = GameState { ... };

    loop {
        // 이 루프를 한 번 돌면 1프레임, 60fps 기준 16ms입니다

        // 모든 입력값을 한 프레임에 한 번에 다 받습니다. input 이벤트같은 건 
        // 없습니다. 마리오 64같은 게임에서는 컨트롤러의 상태를 불러 올 때 실제
        // 일어나는 것은 단순히 컨트롤러 상태를 저장해 놓는 지정된 메모리 공간을
        // 읽어 오는 것일 뿐입니다. 여기서는 프레임의 시작 부분에서 처리를 하고 
        // 있지만 실제 마리오 64에서는 프레임 당 한 번의 처리를 여러 군데에 분산
        // 시켜 놨을 겁니다.
        let input_state = capture_input_state();

        // 이전 게임의 상태와 입력에 맞춰서 game_state의 상태를 변경시키는 여러
        // 개의 함수를 짜 보겠습니다. 이 함수에 아주 화려한 대신 단순한 방식으로
        // 이름을 지어주도록 합시다. 하나의 함수를 이제 'system'이라고 부릅니다.

        // 마리오 내부에 점프를 할 지 말지, 멈출 지 말지 결정하는 상태 플래그를
        // 설정
        input_system(&mut game_state, &input_state);

        // pos += vel * dt;  중력을 적용. 충돌 검사를 하고 모든 엔티티에 반응.
        physics_system(&mut game_state);

        // 모든 엔티티의 엔티티 로직을 실행. update_mario, update_baddies,
        // update_platforms 등을 호출.
        entity_logic_system(&mut game_state);

        // ... 기타 여러 시스템

        // 현재 게임 상태를 렌더. N64 시대에는 현재보다 좀 더 쉽고 간단했지만,
        // 지저분하고 상태에 의존적인 것은 마찬가지입니다. 우리 게임의 상태도
        // 로딩된 그래픽 리소스의 상태를 포함하고 있을 겁니다.
        render_system(&mut game);

        // 엔티티의 상태 플래그를 읽고 새 오디오를 트리거하는데, 렌더링과 마찬
        // 가지로 지저분하고 상태에 의존적입니다.
        audio_system(&mut game);

        // VBlank를 기다리기
        wait_vblank();

        // 반복.
    }
}
```

이런 식으로 게임을 만드는 건 추천하지 않습니다! 위의 예시는 그냥 예시일 뿐, 이렇게도 충분히 복잡한 게임을 만들 수 있다고 생각할 수는 있습니다. 그래도 이런 식이면 게임이 절차 지향의 거대한 진흙덩이 구조가 될 겁니다. 뭔가 여기에 장점이 있을까요? 엄청난 단점은 있을 겁니다. 모든 게임 상태가 투명하고 변화 가능하기 때문에 실수로 뭔가가 바뀌면 그 원인을 찾기 어려울 겁니다. 현대에는 아무도 이렇게 모든 상태를 전역으로 놓고 코딩하지 않습니다. 하지만 한가지 좋은 점이 있는데, 바로 100% safe rust로 짜면서 borrow checker과 싸우지 않아도 된다는 겁니다. 이렇게 짜면 포인터를 전혀 이용할 수 없을 겁니다. 전체 게임 상태에 내부 포인터를 사용하면 구조에 어떤 변화가 있을 때마다 포인터가 전부 바뀔 것이기 때문에 포인터 대신 배열의 인덱스 값을 저장해야 합니다. "mario_entity" 필드가 그 예입니다. 너무 제한적인 것 같지만 어차피 물체의 개수가 N개로 제한되어 있다는 점을 고려하면 (기억하겠지만, malloc도 쓸 수 없습니다!) 당연한 선택입니다. 뭔가를 더할 때는 `all_the_textures: [TextureDscriptor; 256]`같은 식으로 하고 텍스쳐를 표현할 때는 이 정적 배열의 인덱스를 사용해야 합니다. rust는 public 구조체의 필드의 borrow를 하나하나 따로 관리할 수 있는것도 장점입니다. 그러니까, 이 일종의 엔진은 항상 상태를 읽을 수 있고 필요한 만큼 바꿀 수 있는 전체 퍼블릭 구조체의 중첩 트리 형태가 될 것입니다. 대개의 "액션 리플레이" 시대 게임에서는 이런 식으로 malloc도 없고 필요한 것들은 정적인 배열에 아주 제한적으로 배치되면서, 대부분의 것들은 정적인 구조체 어딘가에 조심스레 배치됩니다.

포인터 대신 인덱스를 쓰는 것이 기술적으로야 "안전하다고" 여겨지지만 사실은 포인터 때문에 생길 수 있는 UB(undefined behavior; 옮긴이)나 크래시가 없는 대신, 갱신이 안되었거나 잘못된 인덱스를 써서 "랜덤하고 예측 불가능한" 행동이 불러 일으킬 패닉과 맞바꾸는 것이나 마찬가집니다. 어쨌든 뭐 됐습니다. 자세한 것은 다음에 다시 다루고 일단 이런 디자인을 안전하고 borrow checker에 맞게 구현할 수 있다는 것만 짚고 넘어갑시다.

옛날 게임 구조를 rust로 심하게 단순화된 (인정합니다) 방식으로 구현하면서 어떻게 rust로 게임을 짤 수 있는지를 보여드렸습니다. 이걸 프로젝트에 추천하고 싶지는 않지만 지금도 이렇게 짜이는 게임들이 **있습니다**. 직관적으로, 하나의 일만 하는, 절차적인 방식으로요. 구체적으로 예를 들진 않겠지만 많은 게임들이 객체지향의 스타일을 살짝 가미한 채 이런 식으로 만들어집니다. 전에 단 하나의 **12k**줄로 이루어진 맵 생성 함수를 본 적이 있습니다. 이게 나쁜 건 아니고, 이렇게 짜는 사람들은 중요한 것과 아닌것을 구분하는데 탁월한 천재들입니다. 진짜 지혜가 거기 담겨있습니다!

하지만 나는 전혀 이런 방식을 추천하지 않습니다. 이런 걸 "UR 게임 아키텍쳐"라고 해 두고, 다시 본론으로 돌아갑시다. "데이터 지향! ECS를 쓰세요"라는 제 주장을 bottom-up 방식으로 살펴봤습니다. 이제 다시 top-down 방식으로 살펴봅시다.

## 너무 객체지향인

가장 단순하고 좀 더러운 절차지향 C 방식 게임 엔진 디자인을 살펴봤으니 이제 객체지향 원칙들을 적용하고 좀 나아지는게 있나 봅시다. 운좋게도 나는 starbound를 좀 알고 소스코드도 있기 때문에 Starbound를 단순화 시켜서 예로 들어볼 생각입니다. 그렇게 많은 거짓말은 안할 겁니다.

객체지향의 원칙이 뭘까요? 모든 의견이 일치하는 건 아니지만 대체로 맞는 포인트를 좀 짚어 봅시다.

* 단일 책임 원칙 - 객체는 하나의 논리적 책임을 갖고 있고 메소드들은 그 안에서만 동작해야 합니다.
* 캡슐화 - 데이터와 그걸 다룰 함수를 하나로 묶고 클래스 외부로부터의 방해와 남용으로부터 보호해야 합니다. 외부 코드의 변화 없이 내부적인 구현을 리팩토링할 수 있도록 합니다.
* 추상화, 또는 "Liskov 치환 원칙" 등등 - 기본 클래스(또는 인터페이스 등)를 사용하는 코드에 자식 클래스의 인스턴스를 대입하는 것이 문제가 없어야 합니다.
* 인터페이스 분리, 또는 의존 최소화의 원칙 등등 - 한 클래스는 최소한의 인터페이스만 사용해야 합니다

객체지향 언어들은 객체지향 디자인을 위해 객체 메소드나 프라이빗 데이터, 상속, 가상 메소드 등의 기능들을 갖고 있습니다. C++는 게임 개발자들이 자기만의 엔진을 만드는데 제일 인기있는 언어이기도 하고, 제 발등을 찍는(footguns) 많은 객체지향 기능들을 갖고 있기 때문에 주로 C++로 예를 들겠습니다.

이 원칙들을 시험해보면서 게임 개발에 어떻게 오용될 수 있고 심지어 대부분 실패하게 되었는지 (이제는 잘 알려진 사실입니다)를 얘기하려고 합니다. 이들은 rust보다 훨씬 크게 실패해왔습니다. 몇몇 원칙을 지키면서 게임을 개발하는 것이 가능*은* 하고 완전히 끔찍한 생각은 아닙니다. 나는 *전혀* 객체지향을 좋아하지 않지만 객체지향와 관계있거나 거기서 유래한(rust에서도 잘 되는) 멋진 아이디어가 몇가지 있습니다.

* 점 오퍼레이터 또는 "후위 함수". 하스켈에서 흔히 하는 "이름에 따른 타입 해석"과 순서를 반대로 쓰는, "타입에 따른 이름 해석"이 그것입니다. 100개의 짧고 간결한 이름을 쓰면서 이름이 겹치거나 C처럼 접두사를 붙이지 않고도 "효과적으로" 함수 호출을 할 수 있게 합니다. IDE랑도 잘 붙습니다!
* contract를 내장한 interface - rust의 trait입니다! 상속도 없고, C++의 순수 가상 클래스처럼 작고 의미있는 역할이 붙어있을 때 가장 좋습니다. 하스켈의 타입클래스와 마찬가지로 멋집니다.
* 데이터 은닉 - 데이터 정합성을 유지해야 할 때 안전하지 않은 코드가 접근하지 못하도록 안전한 인터페이스를 만들 수 있도록 해줍니다. 작은 "라이브러리" 코드를 만들 때 무척 유용합니다.

위의 좋은 점들에 관해서는 다루지 않겠습니다. 저것들은 정말 좋고, 위대하기까지 합니다. 저것들을 빼고, 남은 객체지향 디자인이 왜 게임 개발에서 실패하는지를 보겠습니다.

겉에서 보면 명시적인 "객체"가 튀어나오는 객체 지향은 개임개발에 딱인 것처럼 보입니다. starbound를 예로 들어보면 "플레이어", "NPC", "몬스터" 등은 우리 게임에 객체로 쓰기 쉬운 컨셉입니다. 여기서 시작해 볼까요.여기다 마리오 64처럼 "월드" 클래스를 붙여서 맵의 구조를 만들어 봅시다 (핵심에 집중하기 위해 인터페이스나 메뉴는 뺍시다). Rust로 구현하기 힘드니까 C++로 해봅시다.

```c++
typedef uint32_t EntityId;

enum class HumanoidAnimationState { ... };
class HumanoidItem { ... };

struct Player {
    Vec2F position;
    Vec2F velocity;
    float mass;

    HumanoidAnimationState animation_state;

    HumanoidItem left_hand_item;
    HumanoidItem right_hand_item;

    Vec2F aim_position;

    float health;
    EntityId focused_entity;
    float food_level;
    bool admin;

    // So, so much more...
};

enum class MonsterAnimationState { ... };
struct DamageRegion { ... };

struct Monster {
    Vec2F position;
    Vec2F velocity;
    float mass;

    MonsterAnimationState animation_state;

    float health;
    EntityId current_target;
    DamageRegion damage_region;

    ...
};

struct Npc {
    Vec2F position;
    Vec2F velocity;
    float mass;

    HumanoidAnimationState animation_state;

    HumanoidItem left_hand_item;
    HumanoidItem right_hand_item;

    float health;
    Vec2F aim_position;

    ...
};

struct WorldTile { ... };

struct World {
    List<EntityId> player_ids;
    // 흠, 인터페이스 하나를 만들어서 여기에 상속시켜야겠는데요?
    HashMap<EntityId, void*> entities;

    MultiArray2D<WorldTile> tiles;

    // So, so much more...
};
```

데이터 타입에 겹치는 구조가 많으니 서브 객체로 만들어 봅시다.

```c++
typedef uint32_t EntityId;

enum class HumanoidAnimationState { ... };
class HumanoidItem { ... };

struct Physics {
    Vec2F position;
    Vec2F velocity;
    float mass;
};

struct HumanoidState {
    HumanoidAnimationState animation_state;
    HumanoidItem left_hand_item;
    HumanoidItem right_hand_item;
    Vec2F aim_position;
};

struct Player {
    Physics physics;
    HumanoidState humanoid;

    float health;
    EntityId focused_entity;
    float food_level;
    bool admin;

    ...
};

enum class MonsterAnimationState { ... };
struct DamageRegion { ... };

struct Monster {
    Physics physics;

    MonsterAnimationState animation_state;

    float health;...
    EntityId current_target;
    DamageRegion damage_region;

    ...
};

struct Npc {
    Physics physics;
    HumanoidState humanoid;

    float health;

    ...
};

struct WorldTile { ... };

struct World {
    List<EntityId> player_ids;
    HashMap<EntityId, void*> entities;

    MultiArray2D<WorldTile> tiles;

    ...
};
```

아직까지 그렇게 나빠보이진 않습니다. 그렇지만 이건 그냥 자료 구조를 서술해 놓은 것일 뿐입니다. 객체지향 원칙중 캡슐화에서는 각 구조(이제 클래스라고 불러야겠네요)의 최소한의 인터페이스와 최소한의 메소드만 노출시켜야 합니다. 또 월드 클래스 안에 보이드 포인터가 있는데 그러면 안되겠죠. 우리 엔티티들의 인터페이스를 만들어서 집어넣어 봅시다.

```c++
typedef uint32_t EntityId;

// 엔티티에서 사용하기 위해 일단 선언
struct World;

struct InputState { ... };
struct RenderState { ... };

// 순수 가상 인터페이스!
class Entity {
public:
    // 자, *당연히* 모든 엔티티가 위치를 갖고 있을 테고, const로 해도 문제
    // 없겠죠.
    virtual Vec2F position() const = 0;

    // 모든 엔티티가 속도를 갖고 있을까요? 자리에 박혀있는 엔티티도 있을 테니,
    // 일단 속도는 스킵합시다. 다른 공통 필드가 있을까요? 여기에 넣을 만 한
    // 몇몇이 있지만, 그 필드가 없는 엔티티가 있을 지를 생각해보면 많진 않을
    // 겁니다. Maybe 타입을 리턴할 수도 있지만 인터페이스로서 그리 유용하진
    // 않겠죠. 그냥 따로 다른 인터페이스를 만들어서 객체지향 디자인을
    // 달성하도록 합시다!

    // 각 엔티티를 업데이트하고 렌더해야 하니까 메소드 몇 개를 정의해 봅시다.

    // 엔티티의 업데이트 메소드에 파라미터로 world들 넘겨줘야 합니다. 왜냐하면
    // 예를 들어서, 플레이어나 몬스터, NPC가 투사체를 만들어야 하니까요. 또,
    // 몬스터가 플레이어를 공격하기 위해서는 어디 있는지 알아야 하니까요.
    void update(World* world) = 0;

    // 너무 그렇게 지저분한 상태기반이 아니라서 각 엔티티가 어찌어찌 "자기 
    // 자신을 렌더링"할 수 있다고 가정합니다.
    void input(InputState const& input_state) = 0;
    void render(RenderState& render_state) = 0;

private:
    // private 데이터는 없습니다! 전에 말했듯이, 상속보다 컴포지션을 활용해야
    // 합니다. 그러니 우리에겐 순수 가상 인터페이스 뿐입니다! *어쩌면* 이제
    // 죽어버린 객체지향 디자인의 한 단면일까요? 확실하진 않지만 이미 예전에
    // 죽어버린 것으로 많이 논의된 내용이니 우리가 신경쓸 필요는 없을 겁니다.
};

class Player : Entity {
public:
    Vec2F position() const override;

    void input(InputState const& input_state) override;
    void update(World* world) override;
    void render(RenderState& render_state) override;

private:
    Physics m_physics;
    HumanoidState m_humanoid;

    ...
};

class Monster : Entity {
public:
    Vec2F position() const override;

    void input(InputState const& input_state) override;
    void update(World* world) override;
    void render(RenderState& render_state) override;

private:
    Physics m_physics;

    ...
};

class NPC : Entity {
public:
    Vec2F position() const override;

    void input(InputState const& input_state) override;
    void update(World* world) override;
    void render(RenderState& render_state) override;

private:
    Physics m_physics;
    HumanoidState m_humanoid;

    ...
};

struct WorldTile { ... };

struct World {
    List<EntityId> player_ids;
    HashMap<EntityId, shared_ptr<Entity>> entities;

    MultiArray2D<WorldTile> tiles;

    ...
};
```

먼저, 왜 EntityId같은게 있죠? C++이니까 그냥 포인터를 쓰면 되는거 아닌가요? 음, 그렇게 하는게 *굉장히* unsafe하기 때문에 내가 본 모든 (가비지 컬렉터가 없는 언어로 짜인)게임 엔진에서는 "entity_id"와 실제 엔티티 포인터를 매치시킨 맵을 한 곳에 갖고 있습니다. 예를 들어 C++에서 모든 엔티티가 shared_ptr같은 것을 갖고 있다고 합시다. 그럼 World 전체가 참조 순환을 갖고 있는 거대한 덩어리가 되고 엔티티는 절대 삭제되지 않을 겁니다. 큰 문제죠. 반면 그냥 포인터를 사용하면 포인터가 자꾸 잘못된 것을 가리키게 되고 잔 버그가 생겨서 아무도 관리 못하게 될 겁니다 (최소한 아무도 생 포인터나 리퍼런스를 "오랫동안" 관리하려 하지 않을 겁니다). weak_ptr를 사용하면 *되긴 하고*, 때때로 사용되긴 하지만 그냥 id로 관리하는게 네트워킹이나 디스크에 세이브, 로드하는데 더 편합니다. 사실 웃긴게, 바로 이런 구조 때문에 "UR 게임 아키텍쳐"를 안쓰려고 하는 데, 실제로는 게임 엔진에서 매우 *매우* 흔하게 이렇게 합니다!

(게임 엔진에서 Entityid는 보통 uint64_t를 하나씩 카운트를 올려서 쓰거나 uint32_t를 순환해서 씁니다. 그래서 EntityId가 재사용되는 일은 아예 또는 거의 없습니다. 이렇게 하면 엔티티가 없어지면 보통 그걸 바로 다른 엔티티가 대체하기 전에 모니터링하면서 없어진 것을 알립니다. "generational indexs"라는 다른 패턴이 있는데 꽤 중요해서 다음에 다루겠습니다)

그래서, 이걸로 복잡한 게임같은 걸... 실제로 만들 수 있을까요? *아주* 간단한 게임은 이 클래스와 인터페이스로도 만들 수 있을 겁니다. 이게 무슨 문제가 있을 지 좀더 파 봅시다.

몬스터가 플레이어를 따라가야 한다고 칩시다. 월드를 뒤져서 플레이어들의 엔티티를 찾아내고, 거리에 따라 정렬하고 (실제론 spatial hash나 kd-tree를 사용하겠죠) 가장 가까운 플레이어를 추적하겠죠. 이걸로도 구현할 수 있을 겁니다! 가장 피가 낮은 플레이어를 추적해야 한다는 새 요구사항이 생기면 어떨까요? 이런, 플레이어의 피는 프라이빗이기 때문에 퍼블릭 접근자를 만들어야 겠네요.

```c++
class Player : Entity {
public:
    Vec2F position() const override;

    void input(InputState const& input_state) override;
    void update(World* world) override;
    void render(RenderState& render_state) override;

    float health() const;

private:
    ...
};
```

방금 객체지향 디자인을 따르면서 피를 퍼블릭으로 만들었습니다. 그런데 피가 일정 수치 이하로 닳면 어떤 애니메이션 상태를 트리거하는 invariant가 생기면 어쩌죠? 데미지는? 단일 책임 원칙때문에 *몬스터*가 *플레이어*의 피를 건드려서는 안될 겁니다.

새 요구 사항이 생겼습니다. "운영자" 플레이어는 쫓아가면 안됩니다. 새 접근자를 추가합시다!

```c++
class Player : Entity {
public:
    Vec2F position() const override;

    void input(InputState const& input_state) override;
    void update(World* world) override;
    void render(RenderState& render_state) override;

    float health() const;
    bool is_admin() const;

private:
    ...
};
```

아직 데미지는 구현 안한 채로 작은 프로토타입을 만들었으니 이제 데미지를 구현해봅시다. 음, 데미지 시스템은 어디에 달아야 하죠? 아마 플레이어 객체가 직접 자기 피를 닳게 만들어야 할 겁니다. *자신의* 피니까요... 아니면 몬스터에 달아야 하나요? *자신의* 데미지 범위니까요. 모르겠습니다. 플레이어에 단다고 칩시다. 몬스터의 데미지 범위에 새 접근자를 만들어야겠군요.

```c++
class Monster : Entity {
public:
    Vec2F position() const override;

    void input(InputState const& input_state) override;
    void update(World* world) override;
    void render(RenderState& render_state) override;

    DamageRegion const& damage_region() const;

private:
    ...
};
```

접근자가 엄청 많아지네요. 그냥 퍼블릭으로 해도 되지만 객체지향 원칙은 어쩌죠? 작고 제한된 인터페이스만을 노출시켜서 리팩토링 없이 구현을 바꿀 수 있게 해야 하는데. 이렇게 어려웠나?

새 구현사항입니다. 특정 몬스터는 플레이어가 근처 필드에서 건드려야만 어그로가 끌립니다. 접근자를 좀 더 달아야겠네요. 객체지향 원칙을 위해 Physics 타입의 내부 변수 m_physics가 있는데 필드에서 서로 건드리는지를 알려면 이것에 접근해야 합니다. Physics의 내부 변수 Physics::onGround에 접근자를 달고 Player에도 Player::onGround 접근자를 만들어 Physics::onGround 를 사용할 수 있게 해야겠네요. 정말 많은 접근자를 써야 하는군요.

새 요구사항이 올 때마다 한때는 보기 좋았던 인터페이스에다가 새 구멍을 뚫어야 합니다. 8개월 뒤, 이렇게 개발했던 게임 프로토타입에는 **정말 많은** 구멍이 뚫려있을 겁니다. 많은 코드는 여러 개의 엔티티에 동시에 영향을 미치기 때문에 둘 곳을 찾기 어렵고 논리적으로 비슷한 기능을 하는 많은 코드가 여러 파일에 나눠져 있을 겁니다. "객체지향의 문제는 모든 것이 클래스 밖에서 일어난다는 점이다"

새 요구사항이 왔습니다. 특정한 아이템에 대한 아이디어가 있는데 플레이어가 이것을 들고 특정한 적에게 접근하면 아이템이 빛이 납니다. 이 적은 아이템을 무서워해서 도망가는데 그들이 빛나는 아이템에 열중해 있을 때는 특별한 애니메이션이 트리거됩니다. 이건 플레이어가 어떤 퀘스트를 완료했을 때만 적용됩니다.

아마 절망 속에 두 손 들 수밖에 없겠죠. 4개의 개별 모듈(플레이어, 아이템, 몬스터, 애니메이션)의 내부 값을 모두 알아야 하는 작업입니다. 아주 많은 접근자와 특별한 인터페이스를 붙여야 합니다. 누더기처럼 되겠죠.

이건 만들어진 예지만 내가 경험한 것과 그리 다르지 않습니다. 이제는 객체지향로 게임을 개발하면 대체로 이렇게 된다는건 상식입니다. 게임은 적고 집약된 데이터의 invariant를 코드로 관리하는 작업과 거리가 멉니다. 그러니 게임 개발에 데이터 은닉은 효용이 제한적입니다. 게임에서 대개의 흥미로운 작용은 여러 데이터 타입에 걸쳐있고 한 엔티티에 "속해" 있지 않습니다. 많은 엔티티 타입의 80%~60%가 비슷한 반면 재사용은 힘듭니다. 엔티티 안에 모듈을 넣을 때마다 더 많은 층위가 추가됩니다. "UR 아키텍쳐"에 비해 뭐가 더 나아졌나요? 함수 안에 있는 모든 자료가 퍼블릭은 아니라는거죠. 접근자를 계속 계속 계속 추가해서 거의 다를 바가 없긴 하지만. 조금 더 나은 코드 구조이지만 어찌보면 더 나쁜 구조 아닌가요?

좋아요, C++에는 많은 단점이 있고 내가 어떤 결론을 내릴 지 미리 말했죠(ECS 쓰세요!). 이런 식으로 게임을 만들 **수는** 있습니다. 많은 문제가 생기고 구멍투성이에 결국은 거대한 객체들로 남겠죠. starbound에서 현재 사용하는 버전의 실제 Player 객체를 봅시다.

```c++
class Player :
  public virtual ToolUserEntity,
  public virtual LoungingEntity,
  public virtual ChattyEntity,
  public virtual DamageBarEntity,
  public virtual PortraitEntity,
  public virtual NametagEntity,
  public virtual PhysicsEntity,
  public virtual EmoteEntity {

public:
  Player(PlayerConfigPtr config, Uuid uuid = Uuid());
  Player(PlayerConfigPtr config, Json const& diskStore);
  Player(PlayerConfigPtr config, ByteArray const& netStore);

  ClientContextPtr clientContext() const;
  void setClientContext(ClientContextPtr clientContext);

  StatisticsPtr statistics() const;
  void setStatistics(StatisticsPtr statistics);

  QuestManagerPtr questManager() const;

  Json diskStore();
  ByteArray netStore();

  EntityType entityType() const override;

  void init(World* world, EntityId entityId, EntityMode mode) override;
  void uninit() override;

  Vec2F position() const override;
  Vec2F velocity() const override;

  Vec2F mouthPosition() const override;
  Vec2F mouthOffset() const;
  Vec2F feetOffset() const;
  Vec2F headArmorOffset() const;
  Vec2F chestArmorOffset() const;
  Vec2F legsArmorOffset() const;
  Vec2F backArmorOffset() const;

  // 현재 위치에 상대적
  RectF metaBoundBox() const override;

  // 현재 위치에 상대적
  RectF collisionArea() const override;

  pair<ByteArray, uint64_t> writeNetState(uint64_t fromStep = 0) override;
  void readNetState(ByteArray data, float interpolationStep = 0.0f) override;

  void enableInterpolation(float extrapolationHint = 0.0f) override;
  void disableInterpolation() override;

  virtual Maybe<HitType> queryHit(DamageSource const& source) const override;
  Maybe<PolyF> hitPoly() const override;

  List<DamageNotification> applyDamage(DamageRequest const& damage) override;
  List<DamageNotification> selfDamageNotifications() override;

  void hitOther(EntityId targetEntityId, DamageRequest const& damageRequest) override;
  void damagedOther(DamageNotification const& damage) override;

  List<DamageSource> damageSources() const override;

  bool shouldDestroy() const override;
  void destroy(RenderCallback* renderCallback) override;

  Maybe<EntityAnchorState> loungingIn() const override;
  bool lounge(EntityId loungeableEntityId, size_t anchorIndex);
  void stopLounging();

  void revive(Vec2F const& footPosition);

  List<Drawable> portrait(PortraitMode mode) const override;
  bool underwater() const;

  void setShifting(bool shifting);
  void special(int specialKey);

  void moveLeft();
  void moveRight();
  void moveUp();
  void moveDown();
  void jump();

  void dropItem();

  float toolRadius() const;
  float interactRadius() const override;
  List<InteractAction> pullInteractActions();

  uint64_t currency(String const& currencyType) const;

  float health() const override;
  float maxHealth() const override;
  DamageBarType damageBar() const override;
  float healthPercentage() const;

  float energy() const override;
  float maxEnergy() const;
  float energyPercentage() const;

  float energyRegenBlockPercent() const;

  bool energyLocked() const override;
  bool fullEnergy() const override;
  bool consumeEnergy(float energy) override;

  float foodPercentage() const;

  float breath() const;
  float maxBreath() const;

  float protection() const;

  bool forceNude() const;

  String description() const override;

  List<LightSource> lightSources() const override;

  Direction walkingDirection() const override;
  Direction facingDirection() const override;

  Maybe<Json> receiveMessage(ConnectionId sendingConnection, String const& message, JsonArray const& args = {}) override;

  void update(uint64_t currentStep) override;

  void render(RenderCallback* renderCallback) override;

  PlayerInventoryPtr inventory() const;
  // 인벤토리 탭 필터링을 통해 월드에서 주울 수 있는 아이템의 개수를 반환
  size_t itemsCanHold(ItemPtr const& items) const;
  // 아이템을 inventory에 넣고 오버플로우를 반환.
  // 파라미터로 주어진 아이템은 사용된 후 유효하지 않게 됩니다.
  ItemPtr pickupItems(ItemPtr const& items);
  // 주어진 아이템을 가능한 한 모두 줍고, 오버플로우를 떨굽니다.
  // 파라미터로 주어진 아이템은 사용된 후 유효하지 않게 됩니다.
  void giveItem(ItemPtr const& item);

  void triggerPickupEvents(ItemPtr const& item);

  bool hasItem(ItemDescriptor const& descriptor, bool exactMatch = false) const;
  size_t hasCountOfItem(ItemDescriptor const& descriptor, bool exactMatch = false) const;
  // 여러 개의 아이템이 잡히지만 서로 다를 수 있습니다
  // 직렬화
  ItemDescriptor takeItem(ItemDescriptor const& descriptor, bool consumePartial = false, bool exactMatch = false);
  void giveItem(ItemDescriptor const& descriptor);

  // 아이템 교환 슬롯을 비웁니다.
  void clearSwap();

  // 인벤토리에서 착용한 장비를 새로고침
  void refreshEquipment();

  PlayerBlueprintsPtr blueprints() const;
  bool addBlueprint(ItemDescriptor const& descriptor, bool showFailure = false);
  bool blueprintKnown(ItemDescriptor const& descriptor) const;

  bool addCollectable(String const& collectionName, String const& collectableName);

  PlayerUniverseMapPtr universeMap() const;

  PlayerCodexesPtr codexes() const;

  PlayerTechPtr techs() const;
  void overrideTech(Maybe<StringList> const& techModules);
  bool techOverridden() const;

  PlayerCompanionsPtr companions() const;

  PlayerLogPtr log() const;

  InteractiveEntityPtr bestInteractionEntity(bool includeNearby);
  void interactWithEntity(InteractiveEntityPtr entity);

  // 플레이어의 타깃을 주어진 월드 위치로 고정.
  void aim(Vec2F const& position);
  Vec2F aimPosition() const override;

  Vec2F armPosition(ToolHand hand, Direction facingDirection, float armAngle, Vec2F offset = {}) const override;
  Vec2F handOffset(ToolHand hand, Direction facingDirection) const override;

  Vec2F handPosition(ToolHand hand, Vec2F const& handOffset = {}) const override;
  ItemPtr handItem(ToolHand hand) const override;

  Vec2F armAdjustment() const override;

  void setCameraFocusEntity(Maybe<EntityId> const& cameraFocusEntity) override;

  void playEmote(HumanoidEmote emote) override;

  bool canUseTool() const;

  // "Fires" whatever is in the primary (left) item slot, or the primary fire
  // of the 2H item, at whatever the current aim position is.  Will auto-repeat
  // depending on the item auto repeat setting.
  void beginPrimaryFire();
  // "Fires" whatever is in the alternate (right) item slot, or the alt fire of
  // the 2H item, at whatever the current aim position is.  Will auto-repeat
  // depending on the item auto repeat setting.
  void beginAltFire();

  void endPrimaryFire();
  void endAltFire();

  // Triggered whenever the use key is pressed
  void beginTrigger();
  void endTrigger();

  ItemPtr primaryHandItem() const;
  ItemPtr altHandItem() const;

  Uuid uuid() const;

  PlayerMode modeType() const;
  void setModeType(PlayerMode mode);
  PlayerModeConfig modeConfig() const;

  ShipUpgrades shipUpgrades();
  void setShipUpgrades(ShipUpgrades shipUpgrades);

  String name() const override;
  void setName(String const& name);

  Maybe<String> statusText() const override;
  bool displayNametag() const override;
  Vec3B nametagColor() const override;

  void setBodyDirectives(String const& directives);
  void setHairType(String const& group, String const& type);
  void setHairDirectives(String const& directives);
  void setEmoteDirectives(String const& directives);
  void setFacialHair(String const& group, String const& type, String const& directives);
  void setFacialMask(String const& group, String const& type, String const& directives);

  String species() const override;
  void setSpecies(String const& species);
  Gender gender() const;
  void setGender(Gender const& gender);
  void setPersonality(Personality const& personality);

  void setAdmin(bool isAdmin);
  bool isAdmin() const override;

  bool inToolRange() const override;
  bool inToolRange(Vec2F const& aimPos) const override;
  bool inInteractionRange() const;
  bool inInteractionRange(Vec2F aimPos) const;

  void addParticles(List<Particle> const& particles) override;
  void addSound(String const& sound, float volume = 1.0f) override;

  bool wireToolInUse() const;
  void setWireConnector(WireConnector* wireConnector) const;

  void addEphemeralStatusEffects(List<EphemeralStatusEffect> const& statusEffects) override;
  ActiveUniqueStatusEffectSummary activeUniqueStatusEffectSummary() const override;

  float powerMultiplier() const override;

  bool isDead() const;
  void kill();

  void setFavoriteColor(Vec4B color);
  Vec4B favoriteColor() const override;

  // Starts the teleport animation sequence, locking player movement and
  // preventing some update code
  void teleportOut(String const& animationType = "default", bool deploy = false);
  void teleportIn();
  void teleportAbort();

  bool isTeleporting() const;
  bool isTeleportingOut() const;
  bool canDeploy();
  void deployAbort(String const& animationType = "default");
  bool isDeploying() const;
  bool isDeployed() const;

  void setBusyState(PlayerBusyState busyState);

  // A hard move to a specified location
  void moveTo(Vec2F const& footPosition);

  List<String> pullQueuedMessages();
  List<ItemPtr> pullQueuedItemDrops();

  void queueUIMessage(String const& message) override;
  void queueItemPickupMessage(ItemPtr const& item);

  void addChatMessage(String const& message);
  void addEmote(HumanoidEmote const& emote);

  List<ChatAction> pullPendingChatActions() override;

  float beamGunRadius() const override;

  bool instrumentPlaying() override;
  void instrumentEquipped(String const& instrumentKind) override;
  void interact(InteractAction const& action) override;
  void addEffectEmitters(StringSet const& emitters) override;
  void requestEmote(String const& emote) override;

  ActorMovementController* movementController() override;
  StatusController* statusController() override;

  List<PhysicsForceRegion> forceRegions() const override;

  SongbookPtr songbook() const;

  void finalizeCreation();

  float timeSinceLastGaveDamage() const;
  EntityId lastDamagedTarget() const;

  bool invisible() const;

  void animatePortrait();

  bool isOutside();

  void dropSelectedItems(function<bool(ItemPtr)> filter);
  void dropEverything();

  bool isPermaDead() const;

  bool interruptRadioMessage();
  Maybe<RadioMessage> pullPendingRadioMessage();
  void queueRadioMessage(Json const& messageConfig, float delay = 0);
  void queueRadioMessage(RadioMessage message);

  // If a cinematic should play, returns it and clears it.  May stop cinematics
  // by returning a null Json.
  Maybe<Json> pullPendingCinematic();
  void setPendingCinematic(Json const& cinematic, bool unique = false);

  void setInCinematic(bool inCinematic);

  Maybe<pair<Maybe<StringList>, float>> pullPendingAltMusic();

  Maybe<PlayerWarpRequest> pullPendingWarp();
  void setPendingWarp(String const& action, Maybe<String> const& animation = {}, bool deploy = false);

  Maybe<pair<Json, RpcPromiseKeeper<Json>>> pullPendingConfirmation();
  void queueConfirmation(Json const& dialogConfig, RpcPromiseKeeper<Json> const& resultPromise);

  AiState const& aiState() const;
  AiState& aiState();

  // In inspection mode, scannable, scanned, and interesting objects will be
  // rendered with special highlighting.
  bool inspecting() const;

  // Will return the highlight effect to give an inspectable entity when inspecting
  EntityHighlightEffect inspectionHighlight(InspectableEntityPtr const& inspectableEntity) const;

  Vec2F cameraPosition();

  using Entity::setTeam;

private:
  // ...
};
```

Player에 필드보다 메소드가 더 많다는게 재미있죠. 게임 하나에 기능 하나를 더해달라고 하면서 "너무 객체 지향적인 아키텍쳐"와 "UR 아키텍쳐" 둘 중 뭐가 더 쉽냐고 내게 물으면 나는 거의 항상 "UR 아키텍쳐"가 더 쉽다고 대답할 겁니다. **하지만** 객체 지향으로도 **불가능하진 않습니다**. starbound의 대부분이 이렇거든요 :(.

c++가 단점이 있긴 하지만 모든 게임들이 starbound처럼 일시적인 기능이 많진 않을 겁니다. 이건 그냥 극단적인 예이고 보통은 그렇게까지 나쁘지 않을 수도 있지 않을까요? rust로 하면 어떻게 되는지 한번 봅시다! *시작하자마자* 뭔가 어려워집니다. 객체지향에서 가장 간단한 C++코드로 돌아가 봅시다.

```c++
// typedefs...

class Entity {
public:
    virtual Vec2F position() const = 0;

    void input(InputState const& input_state) = 0;
    void update(World* world) = 0;
    void render(RenderState& render_state) = 0;
};

// entity definitions...

struct World {
    List<EntityId> player_ids;
    HashMap<EntityId, shared_ptr<Entity>> entities;
    ...
};
```

rust로 바꾸면 이렇게 되겠죠

```rust
pub trait Entity {
    fn position(&self) -> Vec2F;

    fn input(&mut self, input_state: &InputState);
    fn update(&mut self, world: &mut World);
    fn render(&mut self, render_state: &mut RenderState);
}

pub struct World {
    player_ids: Vec<EntityId>,
    entities: HashMap<EntityId, Rc<Entity>>,
    ...
}
```

이 작은 예시에서도 이미 고통스러울 앞길이 보이기 시작합니다. 먼저, World가 모든 Entity를 갖고 있는데 각각의 Entity는 또 mutable한 메소드를 갖고 있고, 그중 하나는 World의 mutable ref를 갖고 있습니다. 이건 안돌아갑니다. 엔티티를 변경가능하도록 빌려왔는데 또 World의 리퍼런스(Entity 자체가 내부에 있는)를 다시 변경가능하도록 빌려오기 때문입니다. 돌아가려면 *모든* 엔티티 구현이 내부 변화만을 주도록 바꿔야 할 겁니다. World 리퍼런스를 건드릴 수 있는 방법이 없으니까요. World도 마찬가집니다. 그 자체를 변경 불가능한 리퍼런스로 넘겨야 하기 때문에 내부 변화만을 줄 메소드를 만들어야 합니다.

```rust
pub trait Entity {
    fn position(&self) -> Vec2F;

    fn input(&self, input_state: &InputState);
    fn update(&self, world: &World);
    fn render(&self, render_state: &mut RenderState);
}

pub struct World {
    player_ids: RefCell<Vec<EntityId>>,
    entities: RefCell<HashMap<EntityId, Rc<Entity>>>,
    ...
}
```

이렇게 하면 엔티티가 업데이트될 때 borrow 에러가 뜨지는 않겠지만 이제는 모든 것들을 RefCell 안에 넣어야겠네요? 모든 상태를 RefCell로 감쌀 수도 있고 그게 그렇게 어렵지는 않을 겁니다. 지금까지 크로스 커팅이 일어날 때는 코드가 복잡해지는 경향이 있다는 얘기를 했으니까, 다음 경우를 가정해봅시다.

몬스터가 플레이어에게 데미지를 주면 플레이어는 다치는 소리를 재생하면서, 게임 플레이 내부 로직 상 다른 크리쳐가 반응할 수 있는 논리적 소리 *또한* 재생합니다. 그것 때문에 특정 몬스터가 몰려들 지도 모릅니다. 그러니까 플레이어가 다치면 외부적 변화(오디오)와 내부적 변화(피)를 주고 몬스터들에게 각각의 내부적 변화(타겟 엔티티)를 일으킬 수 있는 신호를 줄 수 있습니다. 이 모든 것이 몬스터에게서 시작되었을 테니 컨트롤 플로우는 몬스터에게서 플레이어로, 다시 몬스터로 돌아갑니다. 몬스터를 디버깅 할 때, 간접적으로 구조체 내부의 메소드를 불러서 *원거리 액션*을 부를 수 있습니다. 단, rust는 이걸 허락하지 않아서 (그리고 RefCell 밖이라서 타입 체크도 안됩니다) 이걸 rust로 구현하면 RefCell 패닉이 일어날 겁니다.

계속 해봅시다. 각 엔티티가 태그의 동적인 집합을 갖고 있다고 해봅시다. C++로 구현하면 이렇게 되겠죠.

```c++
class Entity {
public:
    virtual Vec2F position() const = 0;
    virtual List<Tag> tags() const = 0;
};
```

게임을 프로파일링해봤는데 List\<Tag>를 복사하는데 CPU 시간을 너무 많이 집어먹어서 이렇게 바꾸려고 합니다.

```c++
class Entity {
public:
    virtual Vec2F position() const = 0;
    virtual List<Tag> const& tags() const = 0;
};
```

이 코드는 tags가 변화 가능하면서도 해제된 메모리를 호출하는 버그가 일어나지 않을 것을 가정하고 있는데, 말도 안되는 가정이죠. rust를 쓰면 이런 버그를 없앨 수 있습니다. 이건 rust 버전입니다.

```rust
pub trait Entity {
    fn position(&self) -> Vec2F;
    fn tags<'a>(&'a self) -> &'a Vec<Tag>;
}
```

수명을 일부러 생략하지 않고 표시했는데, 이 메소드가 *전체 엔티티*를 빌린 Vec의 리퍼런스를 반환한다는 것을 보여줍니다. 이건... 유용하지만 동시에 전혀 쓸모 없습니다. 나중에 변화를 일으키는 메소드를 호출하고 싶을 경우에는요. RefCell 내부에 변화를 일으키는 것도 불가능하고 대신 std::cell::Ref를 반환해야 합니다. 모든게 c++보다 훨씬 어렵죠. IRC에 가서 도와달라고 하면 의미심장하기만 했지 전혀 도움이 안되는 대답을 들을 겁니다. "당신은 아직 borrow checker와 싸우는 단계에 있군요"

상황은 더 나빠집니다. 심지어 starbound 내부에서도 Entity는 꽤 널널하지만 World에 같은 원칙을 적용하려고 하면,

```rust
pub struct World { ... }

impl World {
    fn tile<'a>(&'a self, index: Vector2<i32>) -> &'a WorldTile { ... }

    // HUGE number of additional members...
}
```

World 구조체가 충분히 크면 순수 가상 인터페이스(또는 rust라면 trait)가 없어도 여전히 문제가 있을 겁니다. 하나의 타일이 *전체 세계 객체*를 빌려야 하나요? 전체 객체의 *일부*만 빌린 뒤 변화시킬 수 있으면 훨씬 간단할텐데요. 당신이 할 수 있는건 모든 필드를 퍼블릭으로 하는 것 뿐입니다. rust에서는 구조체를 나눠서 빌리는 것이 가능하지만 설계상 이런 불투명한 메소드에다가는 그럴 수가 없습니다. 만약 World가 그냥 퍼블릭 멤버를 가진 구조체라면 좀더 쉽겠죠. 구조체가 클 수록 이것이 **더욱** 중요해지고 반대로 "애플리케이션" 레벨로 갈 수록 데이터 은닉은 덜 중요해집니다. 게임에서는 기능을 하나씩 추가할 수록 복잡도가 늘어나기 때문에 더욱 그렇습니다. 엔진이 아니라 게임을 만드는 이상 데이터들을 어딘가에는 넣어야 합니다.

이런 메소드를 작성하려면 크고 복잡한 구조체의 필드는 public으로 만들어 분할해 빌려주는게 당연히 더 쉽지만 그렇게 디자인하지 않았다고 칩시다. 대신 두 종류의 World 객체가 있다고 합시다. 하나는 서버고 하나는 클라이언트입니다. starbound가 바로 이렇게 짜여져 있습니다. 그리고 클라이언트와 서버 사이에 거대하고 복잡한 "world" 인터페이스가 있습니다.

```rust
pub trait World {
    fn tile<'a>(&'a self, index: Vector2<i32>) -> &'a WorldTile;

    // HUGE number of additional trait methods...
}
```

이제는 "객체지향" 원칙이든 아니든 엔티티처럼 "모든 필드를 퍼블릭으로 하는게" *불가능*합니다. 객체지향 원칙은 객체간의 의존성을 최소한으로 유지하도록 합니다. 그러기 위해 객체들끼리 직접 의존하는 대신 순수 인터페이스를 사용하는 패턴이 흔히 쓰입니다. starbound에서는 *처음부터 끝까지* 이런 식으로 짜여져 있고, 여기서는 고작 Entity와 World 두개만 보여드렸을 뿐입니다. 이렇게 짜면 빌려야 하는 양을 *늘림*으로서 빌림 문제를 *키웁니다*.

내가 30분만에 *완전히* 내 의견을 설득시킬 수 있다고는 생각하지 않습니다. 피상적으로나마 최소한 *아이디어*가 어디서 왔는지는 보여드렸습니다. 몇몇 분들은 이 조언이 **지나치게** 주관적이고 특정 종류의 소프트웨어(게임)에만 해당한다고 생각할 지도 모릅니다. 또 많은 분에게는 이미 지루한 상식일지도 모릅니다. 하지만 특정 분야 종사자들에게는 도움이 될 수도 있죠.

정리하자면 이런겁니다.

* 게임 개발에 객체지향는 전혀 도움이 안됩니다. 위에서 열거한 일부 객체 지향 원칙은 괜찮지만 "라이브러리"가 아니라 게임을 짜는 이상 **데이터 은닉**은 보통 도움은 안되고 시간과 노력만 낭비시킵니다. 게임의 데이터와 상태 변화가 잦을 수록 그렇습니다. 아마 이미 알고 있겠죠!
* 게임에서 "객체들" vs 데이터 타입에 대한 생각은 타당해보여도 사실 해롭기 짝이없습니다. 대부분의 행동은 특정 데이터에 "붙지" 않습니다. 그런 방식으로 생각하기 시작하면 멈추기도 쉽지 않죠. 시스템과 데이터 표현을 합쳐서 생각하는 짓은 이제 그만하세요!
* 때로 복잡한 객체 덩어리보다 차라리 12k 줄의 거대한 프로시져가 더 다루기 쉬울 거라는 생각이 듭니다.
* 카맥이 말했죠. "때로는 함수가 가장 나은 답일 수가 있다. 메소드도, 클래스도, 프레임워크도 말고 그냥 함수가."
* 많은 더러운 순차적인 상태 변화를 써야 할 때, 그냥 솔직히 그대로 길게(12k 줄까진 아니라도) 쓰는게 최선일 수 있습니다. 지금 일어나는 지저분한 일들에 솔직해지세요. 다른 함수나 메소드에 숨기는건 도움이 안됩니다. 혼란스럽고 잘못되기만 할 뿐. 그것들을 간단하고 순수한 함수들로 나눠 낼 수 있다면 그렇게 하세요. 그렇지 않다면 그냥 더러운 채로 진실되게 놔두세요! (카맥의 다른 말)[http://number-none.com/blow/john_carmack_on_inlined_code.html]
* 게임의 상태를 결정하는 구조체 타입을 생각해보는 것은 정말 쉽고 유익합니다. 코드 베이스의 타입 정의만 읽어도 알아야 할 거의 모든 것을 알 수 있습니다. C++이라면 구조체 멤버들끼리의 관계만 읽어도, 예를 들어 함수의 이름을 읽는 것보다 더 많은 것들을 알 수 있습니다. 저는 하스켈 코드를 읽는 데 시간을 많이 들였는데, 하스켈에는 라이브러리에 필요한 모든 타입들이 있는 "Types"라는 모듈을 만드는 패턴이 있습니다. rust에서도 이런 패턴이 자주 사용됩니다. 나는 이런 패턴을 좋아하는데 rust는 이런 패턴을 잘 활용하는 언어입니다.

    좀 짓궂은 비교를 해 봅시다. 이 인터페이스

    ```c++
    class World {
        List<EntityPtr> entityQuery(RectF const& boundBox) const = 0;
        ...
    }
    ```

    와 이 구조체

    ```c++
    struct World {
        SpatialHash2D<EntityId, float, EntityPtr> entitySpatialMap;
        ...
    };
    ```

    중 더 많은 것을 알 수 있는 것은 무엇인가요?
    분명 타입의 *이름*을 통해 많은 정보를 알 수 있고 SpatialHash2D는 그 자체로 서브타입을 갖고 있는 구조체지만 타입에 무엇을 의미하는지 알 수 있는 이름을 붙여놓으면 인터페이스가 감춘 부분을 따라갈 수 있을 겁니다(2차원 entity queries는 분명 빠를 거고 엔티티의 길이에 선형적으로 비례하지는 않을 겁니다.)

객체지향를 사용해서 UR-아키텍쳐를 개선할 수 있는지 찾아봤는데, 놀랍게도 *그럴 수가 없었죠*. 점 연산자와 데이터 은닉은 라이브러리 스타일 코드에서 invariant를 유지하는 데는 유용했지만 우리 게임처럼 큰 스케일의 구조에는 별로 도움이 안되었습니다. 하나의 거대하고 변경 가능한 퍼블릭 중첩 구조체를 객체지향 없이 다룰 방법이 필요합니다. 이제 ECS의 대안을 탑-다운 방식으로 접근해 봅시다.

## 처음으로 돌아가서

rust로 짠 "객체지향-아키텍쳐"는 완전한 실패였습니다. 이제 돌아가긴 하는 "UR-아키텍쳐"를 개선시켜봅시다. 아마 전에 본 적이 있을 상당히 표준적인 ECS로의 전환입니다. 여태껏 ECS에 관한 좋은 글 하나와 혼란스러운 나쁜 설명 여러 개를 읽었는데  나는 *데이터* 표현에 초점을 맞춰서 좀 나은 글을 쓰려고 합니다. 특히 rust에 유용한 방식으로요.

우리의 간단한 "Starbound"에서 게임의 상태를 표현하는 것부터 시작합시다. 이번에는 rust로 합니다. 메소드도, 함수도 없고 데이터 타입 뿐입니다. 뭔가 조금 더해졌을 뿐 "UR-아키텍쳐"의 마리오64와 비슷합니다.

```rust
type EntityIndex = usize;

struct Physics {
    position: Vector2<f32>,
    velocity: Vector2<f32>,
    mass: f32,
}

struct HumanoidAnimationState { ... }
struct HumanoidItem { ... }

struct HumanoidState {
    animation_state: HumanoidAnimationState,
    left_hand_item: HumanoidItem,
    right_hand_item: HumanoidItem,
    aim_position: Vector2<f32>,
}

struct Player {
    physics: Physics,
    humanoid: HumanoidState,

    health: f32,
    focused_entity: EntityIndex,
    food_level: f32,
    admin: bool,

    ...
}

enum MonsterAnimationState { ... }
struct DamageRegion { ... }

struct Monster {
    physics: Physics,
    animation_state: MonsterAnimationState,

    health: f32,
    current_target: EntityIndex,
    damage_region: DamageRegion,

    ...
}

struct NpcBehavior { ... }

struct Npc {
    physics: Physics,
    humanoid: HumanoidState,

    health: f32,
    behavior: NpcBehavior,

    ...
}

enum Entity {
    Player(Player),
    Monster(Monster),
    Npc(Npc),
}

struct Assets { ... }

struct GameState {
    assets: Assets,

    entities: Vec<Option<Entity>>,
    players: Vec<EntityIndex>,

    ...
}

fn main() {
    let mut game_state = initial_game_state();

    loop {
        let input_state = capture_input_state();

        player_control_system(&mut game_state, &input_state);
        npc_behavior_system(&mut game_state);
        monster_behavior_system(&mut game_state);

        physics_system(&mut game_state);

        // ... lots more systems

        render_system(&mut game);
        audio_system(&mut game);

        wait_vsync();
    }
}
```

마리오64 예제에 비해 약간 달라진게 있습니다. 일단 무작정 C를 베끼지 않고 enum/Option 타입같은 rust의 기능을 활용하기 시작했습니다. 이것만 했을 뿐인데 데이터 정합성이 안맞을 가능성이 갑자기 줄었죠! 예를 들어 마리오 64에서처럼 "Entity"에 타입 코드를 넣으려고 하면 몇몇 필드가 타입에 따라 수동으로 관리해야 하는 invariant가 생길겁니다. 이제는 많은 invariant가 sum 타입 덕분에 자연스럽게 떨어져 나갔죠. 덕분에 캡슐화를 덜 해도 데이터 은닉 없이도 데이터 정합성이 보장됩니다. 이런 방식으로 표현되지 않는 invariant도 물론 **있습니다!** 예를 들어 플레이어 id의 배열은 Player 타입 엔티티만을 가리켜야 한다든지 하는거죠.

`entities: Vec<Option<Entity>>` 또한 흥미롭습니다. 엔티티 중 일부가 다른 엔티티의 인덱스를 "포인터"처럼 갖고 있기 때문에 엔티티를 배열에서 이동시켜서는 안됐었죠. 엔티티들을 한바탕 할당한 다음 첫 번째로 할당된 엔티티를 지우고 싶을 때는 그 엔티티를 None으로 해버리면 다른 엔티티들을 건드리지 않아도 됩니다. 할당을 할 때는 배열에서 첫 번째 None을 찾아내서 집어넣으면 됩니다. None이 없으면 마지막에 push하면 되구요. "마리오 64" 예제가 정적 배열을 다루는 방식과 흡사한 점이 흥미롭죠.

이것들 말고 큰 차이는 없습니다. 모든 게임의 상태는 여전히 전역적이고, 각 시스템은 여전히 크고 절차지향적일 겁니다. 하지만... 그리 나쁘진 않죠? 솔직히 이건 내가 게임잼을 할 때 게임을 만드는 방법입니다.

저레벨 그래픽/오디오 코드를 여기다가 덧붙이진 않겠지만 간단한 2D나 3D 게임을 만들 때는 이걸로 충분할 겁니다. 내 게임의 상태는 다른 구조체로 가득한 꽤 복잡한 전역 구조체와 여러 파일로 나뉜 "시스템"(그냥 함수들)으로 이루어 질 것이고 그걸로 됐어요. 나는 "로딩"과 "언로딩" 그래픽 데이터 때문에 골머리를 썩지 않도록 최대한 적은 상태를 갖는 아주 간단한 그래픽 API를 선택할거고 오디오 API도 마찬가집니다. 이게 게임의 구조가 될 거에요. 아주 지저분하고 상태 의존적인 그래픽이나 오디오 시스템을 사용해야 한다면 게임 상태를 처음 만들 때 모든 것을 프리로드해서 에셋 구조체 내부 어딘가에 끼워넣어야 합니다. Rust에는 많은 고레벨 그래픽과 사운드 API가 있어서 이게 정말 쉽죠.

하지만 이 패턴은 심지어 모든 것을 그냥 전역 퍼블릭으로 놔두는 것과 비교해 봐도 분명 완벽하진 않습니다. 예를 들어, 각 엔티티 타입에 중복되는 데이터가 너무 많죠. e.g. Player, Monster, Npc에 `Physics`가 반복됩니다. `physics_system` 함수를 겹치는 부분을 분리할 수 있을 텐데 *반드시* Physics를 갖고 있는 3개의 개별 엔티티 타입을 함수가 알고 있어야 하죠. 엔티티 타입을 더할 때마다 이 시스템은 구현이 바뀌어야 할 겁니다. 엔티티가 더해질 때 마다 *아주 많은* 시스템이 영향을 받겠죠.

또, 엔티티를 계속 더할 수록 그 중 많은 부분이 겹치겠죠. "Monster"는 너무 추상적이라서 "FlyingMonster"과 "GroundMonster"로 나눠 봤더니 이 둘은 80%의 똑같은 필드를 공유하고 게다가 50%의 필드는 Player와 똑같다는 식으로.

이게 모든 엔티티를 통일된 하나의 타입에 몰아 넣는 것보다 좋은 방법일 수 있지만 또 어떻게 보면 더 나쁠 수도 있죠? 나쁘진 않지만 더 잘할 수 있을 지 봅시다. 마리오 64처럼 통일된 엔티티 타입을 사용하는 예제를 다시 보죠.

```rust
type EntityIndex = usize;

// 여러 다른 엔티티의 필드의 타입들을 논리적으로 묶어 봅시다...

struct Physics {
    position: Vector2<f32>,
    velocity: Vector2<f32>,
    mass: f32,
}

struct HumanoidAnimationState { ... }

struct HumanoidItem { ... }

enum MonsterAnimationState { ... }

struct DamageRegion { ... }

struct NpcBehavior { ... }

struct HumanoidState {
    animation_state: HumanoidAnimationState,
    left_hand_item: HumanoidItem,
    right_hand_item: HumanoidItem,
    aim_position: Vector2<f32>,
}

struct PlayerState {
    focused_entity: EntityIndex,
    food_level: f32,
    admin: bool,
}

struct MonsterState {
    current_target: EntityIndex,
    animation_state: MonsterAnimationState,
}

struct NpcState {
    behavior: NpcBehavior,
}

// 엔티티는 모든 가능한 엔티티 필드들의 모음이고, 모든 필드를 옵셔널로 해놓겠습
// 니다. 이 경우 아까 전 예제보다 많은 데이터 정합성이 깨질 수 있는 경우가 생겨
// 몇몇 타입 안전성을 잃습니다. 또한 모든 엔티티는 위치가 있기 때문에 옵셔널로
// 표현했음에도 physics 필드가 필수적입니다.
struct Entity {
    physics: Option<Physics>,
    health: Option<f32>,
    humanoid: Option<HumanoidState>,
    player: Option<PlayerState>,
    monster: Option<MonsterState>,
    npc: Option<NpcState>,

    ...
}

struct Assets { ... }

struct GameState {
    assets: Assets,

    entities: Vec<Option<Entity>>,
    players: Vec<EntityIndex>,

    ...
}

fn main() {
    let mut game_state = initial_game_state();

    loop {
        let input_state = capture_input_state();

        player_control_system(&mut game_state, &input_state);
        npc_behavior_system(&mut game_state);
        monster_behavior_system(&mut game_state);

        physics_system(&mut game_state);

        // ... lots more systems

        render_system(&mut game);
        audio_system(&mut game);

        wait_vsync();
    }
}
```

이건 좀 재밌네요. 약간의 invariant를 잃어서 유효하지 않은 엔티티가 허용될 수 있게 됐지만 큰 장점이 하나 있죠. 이제 `physics_system`의 구현이 좀 더 간단해졌습니다. 그냥 모든 엔티티를 돌면서 `physics` 필드를 갖고 있으면 바꿔주기만 하면 되죠. 엔티티들을 루프를 돌면서 타입을 맞추는 것보다 훨씬 간단합니다.

특정 "논리적" 엔티티 타입에만 맞는 구조체들도 분명 있습니다. 동시에 NPC *이면서* Monster일 수는 없는 invariant는 계속 지켜야 하겠죠. 하지만 "타입"별 데이터가 크게 줄은 것은 유의미한 변화입니다. 이제 이걸 조금 바꾸고 필드를 더 분리해봅시다.

```rust
struct Physics {
    position: Vector2<f32>,
    velocity: Vector2<f32>,
    mass: f32,
}

struct HumanoidAnimation { ... }

struct HumanoidItems {
    left_hand_item: HumanoidItem,
    right_hand_item: HumanoidItem,
    aim_position: Vector2<f32>,
}

struct MonsterAnimation { ... }

struct NpcBehavior { ... }

struct Aggression {
    current_target: EntityIndex,
}

// 그냥 다른 것도 구조체니까 Health도 구조체로 합니다.
struct Health(f32);

struct Hunger {
    food_level: f32,
}

struct PlayerState {
    focused_entity: EntityIndex,
    admin: bool,
}

struct Entity {
    physics: Option<Physics>,
    huamnoid_animation: Option<HumanoidAnimation>,
    humanoid_items: Option<HumanoidItems>,
    monster_animation: Option<MonsterAnimation>,
    npc_behavior: Option<NpcBehavior>,
    health: Option<Health>,
    hunger: Option<Hunger>,
    player: Option<PlayerState>,

    ...
}
```

필드가 엔티티에서 표현될 수 있는 방법이야 많고 다들 장단점이 있죠. 이렇게 필드 타입을 바꾸면 전에는 표현할 수 없던 것이 할 수 있게 됩니다! 예를 들어 Player에서 `food_level` 필드를 떼어내서 `Hunger`로 따로 정의했기 때문에, 이제 Player가 아니면서 배고픈 엔티티를 표현할 수 있게 되어 배고픔이 있는 NPC 구현할 수 있게 되었습니다. `Aggression` 필드를 분리해서 적대적인 NPC를 표현할 수 있죠! 몬스터 타입 애니메이션과 휴머노이드 아이템을 동시에 갖는 등의 유효하지 않은 상황도 일어날 수 있기 때문에 장단점은 있지만 이제 비슷한 엔티티를 반복해서 쓰거나 한 enum에서 엔티티 타입을 관리하지 않아도 됩니다.

이렇게 엔티티들은 하나 이상의 파츠의 조합으로 만들어져, 알라카르트 방식으로 파츠를 사용하는 패턴은 꽤 자주 사용됩니다. 이 파츠를 보통 "컴포넌트"라고 부릅니다! 이제 엔티티, 컴포넌트, 시스템을 모두 갖고 있으니 이것들을 합치기만 하면 "ECS" 시스템에 필요한 모든게 갖춰집니다. 데이터 상태의 표현에 집중하니까 금방 왔죠.

중요하진 않지만 금방 할 수 있는 변화를 하나 더 줘 봅시다. 이번에는 각 조각을 "컴포넌트"라고 해 봅시다.

```rust
struct PhysicsComponent { ... }
struct HumanoidAnimationComponent { ... }
struct HumanoidItemsComponent { ... }
struct MonsterAnimationComponent { ... }
struct NpcBehaviorComponent { ... }
struct AggressionComponent { ... }
struct HealthComponent { ... }
struct HungerComponent { ... }
struct PlayerComponent { ... }

type EntityIndex = usize;
struct Assets { ... }

struct GameState {
    assets: Assets,

    // 모든 컴포넌트 vec은 현재 엔티티 개수와 같은 길이를 갖고 있습니다.
    physics_components: Vec<Option<PhysicsComponent>>,
    humanoid_animation_components: Vec<Option<HumanoidAnimationComponent>>,
    humanoid_items_components: Vec<Option<HumanoidItemsComponent>>,
    monster_animation_components: Vec<Option<MonsterAnimationComponent>>,
    npc_behavior_components: Vec<Option<NpcBehaviorComponent>>,
    aggression_components: Vec<Option<AggressionComponent>>,
    health_components: Vec<Option<HealthComponent>>,
    hunger_components: Vec<Option<HungerComponents>>,
    player_components: Vec<Option<PlayerComponents>>,

    players: Vec<EntityIndex>,

    ...
}
```

고전적인 "구조체 배열"에서 "배열 구조체"로의 변형입니다. 이전과 (거의) 정확히 같은 정보를 갖고 있음은 분명합니다. 유지해야 하는 몇가지 새 정합성이 있는데, 이제 각 컴포넌트 Vec의 길이가 같아야 한다는 건데 새로운 사실은 아닙니다. 이런 타입을 사용할 경우 객체지향 아키텍쳐에서는 거의 불가능했던 리팩터링이 간단히 가능합니다. 변화를 가할 때마다 꽤 많은 시스템을 바꿔야 하는 것은 맞지만 데이터를 독립적으로 생각하는 것은 가치가 있죠.

보통 ECS를 소개하는 글들이 "배열 구조체"로 바꾸는 부분을 강조한 다음 퍼포먼스와 캐시 작용을 설명하는데, 좀 혼란스럽고 과할 수 있죠. 틀린 건 아니지만 나는 그게 중요하다고 생각하지는 않습니다. 저런 관점에서 설명하면 이 과정이 지루하고 평범해 보이기 때문에 나는 ECS에서 배열 구조체를 뒤에 설명했습니다. 구조체 배열이나 배열 구조체나, 뭐 둘 중 하나는 더 성능이 좋겠지만, 프로그래밍 패러다임이 극적으로 바뀌는 것은 아닙니다. 데이터 지향 관점에서 그리 큰 변화는 아니고, 그저 퍼포먼스 최적화일 뿐이죠. **훨씬 많은** 잠재적 최적화 방법이 있을 것이고, 이제 누군가 "ECS 시스템"이라고 부를 수 있는 최저 조건에 도달한 것 같습니다.

여기 게임 개발자 뿐 아니라 보편적인 Rust 사용자들이 얻을 수 있는 시사점들입니다.

* 상태의 구조에**만** 집중하는 것은 아주 효과적이고, 대부분 "메소드"나 "객체"로 이것을 달성하려 합니다. 아무도 구조체에 메소드가 있다고 "너무 객체지향적이"라고 생각하지 않습니다만, 최소한 구조적으로는 프로시져와 데이터를 **종속해 놓습니다**. 데이터 구조 디자인, 모듈 구성 둘 다 좋지만 이 둘을 섞으려고 하진 마세요! 난 "ECS 설계"가 게임 개발에 환상적이라고 믿습니다. 객체지향으로 개발할 때보다 데이터에 더 집중하도록 해주거든요. 단순히 배열 구조체의 마술 덕분에 ECS가 좋다고 생각하지 않습니다.
* Vec의 인덱스들로 **많은** 것을 할 수 있습니다. 자신을 빌리거나 `Rc<RefCell>`을 사용하는 것보다 더 쉽습니다.

이제 잠시 멈추고 `EntityIndex`에 대해 말해봅시다. Rust에서 스스로를 빌려야 하는 상황에 빠지면 나는 먼저 Vec과 인덱스를 고려하는 것이 좋다고 생각합니다. **다른** 도구들도 있죠. arena 크레이트나 rental 같은 것들 말입니다. 하지만 일단 Vec을 써봐야 합니다. 보편적으로 이런 문제들은 어떤 그래프 구조를 표현하고 싶을 때 생기고 (그리고 ECS는 사실 일종의... 평평한 그래프죠) *심지어 C++*에서도 이건 공통입니다! (Andrei Alexandrescu의 퍼포먼스 토크에서도 그가 가장 좋아하는 자료 구조는 std::vector입니다. "그냥 벡터 쓰세요!") Arena 할당자 같은 것은 대단하고 꽤 빠르며 여러 타입에서 작동하지만 self-borrowing 없이는 정적이지 않습니다. rental같은 self borrowing 솔루션은 *마지막 안식처*같은 도구입니다. 그렇게까지 할 필요는 없어요. 그냥 Vecs와 인덱스를 쓰면 됩니다.

**이미 말했듯이** 이것도 문제는 있습니다. 우리 엔티티 예제에서 "빈" 엔티티인덱스를 찾는 것과 "삭제"가 어떻게 작동하는지는 생략했습니다. 그리 좋은 방법이 없으니까요. Vec을 돌면서 빈 곳을 스캔해야 하기 때문에 "엔티티"를 할당하는 비용은 상수가 아닙니다. 엔티티를 삭제하는 것은 그보단 쉽지만, 단점이 있습니다. 엔티티를 지우고 Vec의 슬롯을 비운 직후에 다시 그 위치에 엔티티를 할당한다고 생각해 봅시다. 지울 때 "인덱스 리퍼런스"가 사용되는 곳이 없다면 좋겠지만 그렇지 않다면 어쩌죠? 원래 엔티티가 지워졌다는 것을 표현하지 않으면 "뭔가 다른 엔티티"가 반환된 것입니다. 게다가 이 두 경우 모두 하나가 아니라 여러 개의 배열을 관리해야 하는 "배열 구조체"로 바꾼 후 더 어려워졌습니다. 아직 "엔티티 인덱스"를 관리하는 방법을 다루지 않았죠. 이 문제를 한 번에 풀어봅시다.

## 생성 인덱스는 멋집니다

Rust 커뮤니티에서는 어떤지 모르겠지만 게임 개발 쪽에서는 널리 알려져 있는 내가 좋아하는 패턴 중 하나입니다.

Vec 내부에 엔티티를 저장하고 확인하는데 `EntityIndex`를 사용했죠. 위의 C++ 미니 스타바운드 예제에서도 엔티티를 저장하는데 증가하는 integer 인 `EntityId`를 사용했었습니다. 이런 식으로요.

```C++
HashMap<EntityId, shared_ptr<Entity>> entities;
```

`Vec`과 `HashMap` 둘 다 integer와 어떤 값을 대응시켜주는데 `Vec`의 경우 **가능한** 자료 구조 중 가장 빠르고, `HashMap`은 그보다 많이 느리지만 훨씬 유연합니다! 예를 들어 `HashMap`은 엔트리의 개수에 상한선만이 존재할 뿐이고 인덱스의 크기에는 제한이 없습니다. `HashMap`은 키 값을 1,000,000,000부터 시작하든 1부터 시작하든 잘 작동하지만 Vec은 당연히 길이가 10억일 때와 1일 때 다르게 작동합니다. 이건 위에서처럼 엔티티를 삭제할 때 문제가 됩니다. `HashMap`의 키 값을 u32나 심지어 u64로 해 놓으면 인덱스 값을 재사용할 필요 없이 항상 증가시키기만 하면 됩니다(결국은 순환하겠죠). 이렇게 하면 어쨌든 인덱스 값이  **최소한** "아주 오랜 시간동안" 재사용되지 않을 것이 보장됩니다. `u64`으로 해놨는데 인덱스가 재사용된다면 그 게임은 엄청나게 거대할테니 어쨌든 더 큰 문제를 안고 있겠죠 :). **그러나** HashMap은 Vec보다 한참 느립니다 :(

Vec에서 정수 인덱스를 이런 식으로 쓸 수는 없을까요? 있습니다. "생성 인덱스"라고 불립니다!

그냥 정수 인덱스 대신에 "생성 인덱스" 타입을 이렇게 정의합니다.

```rust
// usize / u64가 너무 크면 대신 다른 타입을 써도 됩니다
#[derive(Eq, PartialEq, etc...)]
pub struct GenerationalIndex {
    index: usize,
    generation: u64,
}

impl GenerationalIndex {
    pub index(&self) -> usize { ... }
}
```

그 다음 "GenerationalIndexAllocator"라고 불리는 것을 만듭니다.

```rust
struct AllocatorEntry {
    is_live: bool,
    generation: u64,
}

pub struct GenerationalIndexAllocator {
    entries: Vec<AllocatorEntry>,
    free: Vec<usize>,
}

impl GenerationalIndexAllocator {
    pub fn allocate(&mut self) -> GenerationalIndex { ... }

    // 인덱스가 할당되었었다면 true을 반환하고 할당을 해제시킵니다.
    pub fn deallocate(&mut self, index: GenerationalIndex) -> bool { ... }

    pub fn is_live(&self, index: GenerationalIndex) -> bool { ... }
}
```

(더 빨리 구현하는 방법이 있지만 이 정도로 충분합니다. 또 데이터 은닉을 **잘** 사용하고 있습니다.)

기본적인 아이디어는 인덱스를 재사용하지 않고 `Vec<Option<Entry>>`처럼 벡터의 인덱스를 "할당"할 수 있다는겁니다. 이렇게 작동합니다. 인덱스를 할당하면 실제 인덱스 0과 "세대" 0인 `GenerationalIndex`를 반환니다. 그 인덱스를 지우면 해제된 인덱스들의 풀로 돌아가고, 따라서 다음에 인덱스를 할당하면 실제 인덱스 0를 갖고 있지만 세대는 1인 다른 생성 인덱스를 반환받게 됩니다. 생성 인덱스는 세대가 계속 올라가기 때문에 절대 재사용될 일이 없지만 "실제 인덱스"는 항상 지금까지 할당되었던 모든 엔트리의 개수보다 "더 작습니다".  이렇게 하면 Vec으로 빠른 인덱싱을 할 수 있으면서 단순 인덱스의 "포인터같은" 좋지 않은 특성을 회피할 수 있습니다!

방금 Rust 커뮤니티에 이 패턴이 널리 알려지지 않았다고 했지만 약간 거짓말입니다. 이 아이디어를 구현한 최근에 출시된 아주 훌륭한 "slotmap"이라는 크레이트가 있거든요. 특정한 SlotMap에만 인덱스를 할당하는 것이 가능하고 다른 SlotMap을 위해 재사용하는 것은 불가능합니다. 유용하지만, 여기서 소개된 컨셉들이 분리되면 더욱 널리 **많이** 유용합니다. Vec의 인덱스는 "self borrowing"을 대처하는 좋은 패턴이고 생성 인덱스는 그것을 더욱 개량합니다. 저는 "slotmap"이 있어서 따로 크레이트를 만들기를 포기했으니 :(, 기능을 요청하기를 고려해보세요 :)

계속 나아가면서 타입을 `Vec<Option<T>>` 보다 더 쉽게 실제 데이터를 저장하는데 사용할 수 있도록 개선해봅시다.

```rust
struct ArrayEntry<T> {
    value: T,
    generation: u64,
}

// GenerationalIndex를 어떤 값 T에 연결해주는 배열
pub struct GenerationalIndexArray<T>(Vec<Option<ArrayEntry<T>>>);

impl<T> GenerationalIndexArray<T> {
    // 생성 인덱스에 어떤 값을 할당. 이전 세대의 값을 덮어씌울 수 있습니다.
    pub fn set(&mut self, index: GenerationalIndex, value: T) { ... }

    // 생성 인덱스로부터 값을 반환. 세대가 맞아야 합니다.
    // Gets the value for some generational index, the generation must match.
    pub fn get(&self, index: GenerationalIndex) -> Option<&T> { ... }
    pub fn get_mut(&mut self, index: GenerationalIndex) -> Option<&mut T> { ... }
}
```

새 추상화로 엔진을 좀 더 바꿔 봅시다.

```rust
struct PhysicsComponent { ... }
struct HumanoidAnimationComponent { ... }
struct HumanoidItemsComponent { ... }
struct MonsterAnimationComponent { ... }
struct NpcBehaviorComponent { ... }
struct AggressionComponent { ... }
struct HealthComponent { ... }
struct HungerComponent { ... }
struct PlayerComponent { ... }

// index나 id 접두사를 떼 버렸습니다. 헷갈릴 만한 다른 "Entity" 타입이 없으니까
// 요. 하지만 이건 진짜 엔티티를 호출할 때 필요한 id나 인덱스의 일종이라는 걸
// 잊지 마세요.
type Entity = GenerationalIndex;

// Entity에서 어떤 타입 T로 향하는 맵.
type EntityMap<T> = GenerationalIndexArray<T>;

struct GameState {
    assets: Assets,

    entity_allocoator: GenerationalIndexAllocator,

    physics_components: EntityMap<PhysicsComponent>,
    humanoid_animation_components: EntityMap<HumanoidAnimationComponent>,
    humanoid_items_components: EntityMap<HumanoidItemsComponent>,
    monster_animation_components: EntityMap<MonsterAnimationComponent>,
    npc_behavior_components: EntityMap<NpcBehaviorComponent>,
    aggression_components: EntityMap<AggressionComponent>,
    health_components: EntityMap<HealthComponent>,
    hunger_components: EntityMap<HungerComponents>,
    player_components: EntityMap<PlayerComponents>,

    players: Vec<Entity>,

    ...
}
```

깔끔하네요! 거의 다 왔고요, 이건 거의 완성된 ECS 시스템입니다.

전반적인 Rust 사용자들을 위한 충고: 분명 생성 인덱스는 멋지지만 몇몇 이유때문에 C++에서만 인기가 있었습니다. 하지만 Rust에서 **더욱** 유용하게 쓰일 수도 있죠! "slotmap" 개발자에게. 할당자를 따로 노출해주세요, 크게 유용할 테니까요! 이런 종류의 API를 제공하는게 맞지 않다고 생각한다면 내가 그 기능을 제공하는 비슷한 크레이트를 출시할 수 있습니다.

## 동적 타입은 **아주** 통제되어있는 부분에 한해  아주 좋습니다.

거의 다 왔고, "실제" ECS 시스템의 동작과 거의 비슷합니다. 아직 다루지 않았던 가장 큰 문제는 모든 것들이 아직도 전역이라는 것입니다. 정확히 말하자면, 모든 "시스템" (우리에게는 그냥 함수의 다른 이름일 뿐이죠)은 우리 게임 상태에 들어가는 *모든* 타입에 의존하고 있고 그게 참 큽니다. 대개의 게임은 한 크레이트 안에 들어가 있고 모듈 간의 의존성 그래프는 아무것도 걱정할 필요는 없지만 여전히 "GameState" 내부에 변화를 가하면 *이론적으로*는 잠재적으로 모든 시스템에 영향을 줄 수 있습니다. 어떻게 해결해야 할 지 봅시다.

바로 가기 전에 강조하고 싶은건 *optional*입니다. optional이 쓸데 없이 복잡하다고 야유할 수도 있고, 그게 맞을 수도 있습니다! 그러나 이게 대부분의 ECS 구현에서 **하는** 방식이니 최소한 이해는 하고 넘어가야 하고, 이런 일을 하는 라이브러리를 만들 때는 피할 수 없습니다.

일단 `anymap` 크레이트가 필요한데 `mopa` 크레이트도 괜찮습니다. 여러 타입 중 정확히 하나만 담을 수 있으면 됩니다.

```rust
pub struct AnyMap { ... }

impl AnyMap {
    pub fn insert<T>(&mut self, t: T) { ... }
    pub fn get<T>(&mut self) -> Option<&T> { ... }
    pub fn get_mut<T>(&mut self) -> Option<&mut T> { ... }
}
```

컴포넌트를 저장하는데 이걸 어떻게 쓸 수 있을까요?

```rust
struct PhysicsComponent { ... }
struct HumanoidAnimationComponent { ... }
struct HumanoidItemsComponent { ... }
struct MonsterAnimationComponent { ... }
struct NpcBehaviorComponent { ... }
struct AggressionComponent { ... }
struct HealthComponent { ... }
struct HungerComponent { ... }
struct PlayerComponent { ... }

type Entity = GenerationalIndex;
type EntityMap<T> = GenerationalIndexArray<T>;

struct GameState {
    assets: Assets,

    entity_allocoator: GenerationalIndexAllocator,
    // We're assuming that this will contain only types of the pattern
    // `EntityMap<T>`.  This is dynamic, so the type system stops being helpful
    // here, you could use `mopa` crate to make this somewhat better.
    entity_components: AnyMap,

    players: Vec<Entity>,

    ...
}
```

이제 게임 한정 데이터를 저장하는 대신에 계속 동적 타입으로 가 봅시다! 이제 게임 상태는 컴포넌트 로 이루어진 엔티티 뿐 아니라 다른 타입들 중 하나의 동적 콜렉션이라고 할 수 있습니다. 이걸 "리소스"라고 부르죠. GameState를 좀더 정확한 이름으로 바꿉시다.

```rust
type Entity = GenerationalIndex;
type EntityMap<T> = GenerationalIndexArray<T>;

struct ECS {
    entity_allocoator: GenerationalIndexAllocator,
    // Full of types like `EntityMap<T>`.
    entity_components: AnyMap,

    resources: AnyMap,
}
```

실제 ECS 자료구조가 어떻게 되어있는지에 도달했습니다. "리소스"를 AnyMap에다가 더하는 것은 흔한 패턴이고, 대충 모든 게임 상태가 "ECS" 구조로 표현될 수 있는 것을 의미합니다. "ECS"라고 부르지만, "시스템"같은 것이 보이지 않는 것이 중요합니다. ECS를 시스템과 연관지어 설명하고 싶지는 않은데, 중요하다고 생각은 하지만 핵심은 아니거든요. "시스템"이 루프 내의 순수 함수이든 좀 더 복잡하든 **모두** ECS 디자인의 중요한 부분을 보여줍니다.

뜬금없는 동적 타이핑에 야유할 수도 있습니다. 이제 그만하고 이게 뭘 가져다줄지 생각해 봅시다. 게임에 신기능 리퀘스트가 와서 어떤 카운터를 내장하고 있는 새로운 미치도록 특별한 몬스터가 필요하다고 합시다. 그 몬스터를 죽일 때마다 자신을 둘로 복사하고 카운터가 줄어들어 하이드라의 머리처럼 복제됩니다. `EnemyDuplicationLevel`같은 새로운 컴포넌트를 추가해야 한다는 거죠. 동적 타이핑이 있으면 다른 시스템에 "간섭"하지 않고 컴포넌트를 더할 수 있습니다. 새로운 모듈을 임포트하지 않으면 ECS가 그런 컴포넌트가 있다는 것을 "알 수" 없기 때문입니다. 리소스도 마찬가지로 존재하는 시스템에 "간섭" 없이 새 데이터 타입을 추가할 수 있습니다.

이런 정당화는 상당히 약한 것처럼 보이고 사실 그렇습니다. 모든 큰 그림을 보려면 좀 더 나아가야 합니다. 이제 진도를 좀 내서 중간 이상 규모의 "모던" 게임 엔진 디자인의 큰 그림을 보여드리려고 합니다. 사실 멀진 않지만 마지막 몇 개의 기능들은 서로 관련되어 있어 혼자서는 쓸모가 없습니다.

## "레지스트리" 패턴

이제 동적 타이핑을 하고 있는데 Rust에서 내가 좋아하는 패턴이지만 실제로는 한 번도 본 적이 없습니다 (있지만 내가 아직 못 본 것 뿐이라고 확신합니다). 이걸 "레지스트리 패턴"이라고 부르겠습니다.

명세 대로의 ECS 구현이라면 AnyMap에 엔트리를 밀어넣거나 하는 ECS에 타입을 "등록"하는 과정이 있습니다. 등록이 안된 컴포넌트 타입을 쓰면 보통 에러가 나죠. 좀 더 나아가서 "등록"을 ECS 자신에 맡겨놓지 말고 아예 "레지스트리"를 만들어 봅시다.

```rust
pub struct ComponentRegistry { ... }

impl ComponentRegistry {
    // Registers a component, components must implement a special trait to allow
    // e.g. loading from a JSON config.
    pub fn register_component<T: Component>(&mut self) { ... }

    // Sets up entries for all registered components to the given ECS
    pub fn setup_ecs(&self, ecs: &mut ECS) { ... }

    // Loads a given entity into the given ECS, loading all the components from
    // the given config
    pub fn load_entity(&self, config: Json, ecs: &mut ECS) -> Entity { ... }
}
```

"리소스"용도 하나 만들어 놓죠.

```rust
pub struct ResourceRegistry { ... }

impl ResourceRegistry {
    // The Resource trait provides loading from JSON and other things.
    pub fn register_resource<T: Resource>(&mut self) { ... }

    // Sets up entries for all registered resources to the given ECS
    pub fn setup_ecs(&self, ecs: &mut ECS) { ... }

    // Adds a resource to the given ECS by loading from the given config.
    pub fn load_resource(&self, config: Json, ecs: &mut ECS) { ... }
}
```

이것들을 lazy_static으로 하나의 커다란 전역 상수로 묶어놓습니다!

```rust
// When we add a component to our project, there are two steps.  First, add the
// component somewhere as a Rust module, THEN add it to this list here.  For
// added convenience, this function could go in the lib.rs which contains the
// component modules themselves.  If you were very fancy, you could have some
// kind of "plugin architecture" for this as well, grouping related components /
// resources together into "plugins".
fn load_component_registry() -> ComponentRegistry {
    let mut component_registry = ComponentRegistry::new();

    component_registry.register::<PhysicsComponent>();
    component_registry.register::<PlayerComponent>();
    ...
}

// Ditto 
fn load_resource_registry() -> ResourceRegistry { ... }

pub struct Registry {
    pub components: ComponentRegistry,
    pub resources: ResourceRegistry,
}

lazy_static! {
    pub static ref REGISTRY: Registry = Registry {
        components: load_component_registry(),
        resources: load_resource_registry(),
    };
}
```
내가 이 패턴을 좋아하는 이유는 잘 보면 Java의 전역 타입 레지스트리랑 비슷하거든요. "엔터프라이즈" 스타일이지만 꽤 유용합니다! *또한* (잘 보면) 빌트인 에디터의 컴포넌트 타입을 메뉴나 GUI로 추가해서 프로젝트 설정 파일에 저장하는 추적 엔진의 기능과도 비슷합니다. 이 경우 프로젝트 설정 파일 대신 rust 코드가 약간 더 있을 뿐이죠.

이 패턴은 나중에 매우 유용합니다! 게임 상태를 JSON 설정 파일에서 불러올 수 있다고 생각해 보세요. 각 리소스와 컴포넌트는 JSON으로 불러올 수 있으므로, 그냥 컴포넌트나 리소스 타입을 데이터 포맷과 함께 더하기만 하면 게임을 로드하고 볼 수 있는겁니다 (새 타입을 이해할 수 있는 새 시스템이 필요하지만, 곧 다룰겁니다).

이 시점에서는 이게 "진짜" ECS 게임 엔진의 청사진입니다. 간단한 라이브러리가 필요한 기능을 제외하면 함수와 시스템에 관해서는 거의 말하지 않았습니다! 이 컨셉을 동작을 통해서 소개하고 싶지 않았고, 상태를 표현하는 것이 더 유용한 접근 방법이기 때문입니다.

`SystemRegistry`를 더하는 것이 어렵진 않을 겁니다. 우리 시스템은 그냥 함수기 때문에 메인 루프에 약간 더 복잡한 함수를 더하기만 하면 됩니다. 시스템에 일종의 설정을 더해서 바꿀 수 있는 파라미터를 설정할 수 있게 하거나 여러 파라미터에 따라 같은 함수를 여러 번 재사용할 수도 있게 만들 수 있겠죠. 보통 시스템에 *상태*를 직접 주는 것은 피해야 하므로 게임 상태를 컴포넌트와 리소스만으로 제한해야 합니다. 게임 상태가 컴포넌트와 리소스 만으로 되어 있으면 복제 (에뮬레이터처럼 상태를 저장하는 거죠!) 나 직렬화같은 멋진 것들을 할 수 있습니다. 시스템 클로저같은 것이 있으면 더 어려워집니다.

그냥 Rust를 위해서도, 레지스트리 패턴이 꽤 좋습니다. Starbound에서는 모든 타입이 등록되어 있는 "Root" 객체가 이런 일을 했지만 여기서 설명한 것보다 좀더 stateful합니다. 읽기전용이고, 애셋을 불러오는 것으로 만들어집니다. 나는 "타입 레지스트리"라는 아이디어를 좋아하고 AnyMap으로 동적 타이핑을 하려면 이런게 필요합니다. 이제 "모든 것이 모든 것에 의존하는" 문제를 풀기 위해 이 두 패턴이 필요합니다.

## ECS는 게임의 SQL입니다

돌이켜보면 특정한 종류의 키(엔티티)를 정의하는 방법, 이 키들에 딸려오는 일련의 레코드들(컴포넌트), 그리고 어느 키에도 맞지 않는 레코드들을 정의하는 방법(리소스)를 설명했습니다. 여기에 동적 타이핑을 더하고 모든 레코드 타입을 한 곳에 정의하는 패턴(일종의 스키마같죠?)을 보여드렸습니다. 내가 만든 ECS에서는 심지어 컴포넌트에 "위치를 갖고 있으면서 속도도 가질 수 있지만 질량은 없는 엔티티들 불러와"같은 식으로 원시적인 "쿼리"도 처리할 수 있습니다.

이런 것들이 저리도록 친숙하실텐데 그 이유는 따로 있습니다. ECS는 단지 게임에서의 SQL일 뿐입니다. 아주 아주 아주 제한된 형태의 SQL이지만 정신적으로는 아주 유사하죠. 데이터 스키마를 정의하고, 불러오고, 쿼리를 실행하고, 업데이트합니다. 각 쿼리가 수 마이크로 초 이내에 실행되도록 되어있는 아주 제한된 SQL입니다.

이전에 내가 지금까지 ECS를 소개하는 아주 나쁜 소개글들 여럿과 좋은 글 하나를 읽었다고 했죠. ECS와 SQL의 공통점을 처음 언급한 것은 내가 아니고, 2009년 [이 글](http://t-machine.org/index.php/2007/09/03/entity-systems-are-the-future-of-mmog-development-part-1/)에서 MMO에 초점을 맞추어 그 점을 다루고 있습니다.

그래서, 그러면 게임 상태를 저장하는데 그냥 sqlite같은 것을 사용할 수도 있겠군요? 재미있게도 실제로 할 수도 있겠지만 16ms 안에 쿼리들을 실행하는 게 쉽지는 않을겁니다. 하지만 그럴 수만 있다면 얼마나 좋을 지 생각해 보세요! 게임 세이브 포맷을 만들어야 하면.. SQL을 그냥 쓰면 됩니다. 모든 세이브 파일 포맷을 업데이트 해야 하는데요.. 외부 SQL 업데이트 스크립트를 쓰면 됩니다! 아무 지점에서나 게임을 저장할 수 있도록 하고 싶나요? 됩니다. 버그를 찾아서 게임 상태를 30초 전으로 롤백하고 한 프레임씩 넘겨보면서 쿼리를 실행해보고 싶나요? 됩니다. SQL의 자동 증가하는 키는 생성 인덱스 컨셉에 관한 설명에 이미 들어가 있습니다 (`HashMap<EntityId, T>`와 더 비슷하죠).

이 시점에서 각 시스템은 기본적으로 데이터를 읽고 업데이트하고 다시 쓰기 위한 일련의 SQL 쿠리가 되어 있을 겁니다. 이제 섹시한 게임 개발을 지루한 웹 개발로 바꾸는 데 성공했습니다! (혹시나 하는데, 웹 개발도 섹시할 수 있고 게임 개발도 지루할 수 있죠)

*확실히* 실제 동작에 두 계단 정도 느릴 거라는 게 유일한 문제이지만 괜찮은 아이디어고 개념을 그려 보기에는 유용합니다.

이 비유는 중요하다고 생각하는데, 지금까지 너무 많은 "순수한 ECS란 무엇인가"라는 주제의 바보같은 논쟁을 봐 왔기 때문입니다.

* 엔티티가 곱 컴포넌트를 가질 수 있으면 ECS인가요? 곱 컴포넌트와 그냥 Vec을 포함한 컴포넌트 하나의 차이는 아주 아주 작지만, 네, ECS입니다. 두 테이블 사이가 1:1이든 1:N이든 SQL임에는 상관이 없죠? 그런 겁니다.
* 내 컴포넌트가 메소드를 갖고 있어도 ECS인가요? 네, 컴포넌트에 메소드를 넣는다고 세상이 끝나지 않습니다. 특히 작은invariant의 유지를 위해서라면요. SQL은 데이터를 위한 거지만 invariant를 유지하기 위한 프로시저를 포함하고 있습니다.
* 두 개의 다른 ECS 집합이 필요하거나, 리소스에 많은 데이터를 집어넣어도 ECS인가요? "싱글턴 엔티티"랑 리소스 중 뭘 써야 하죠? 두 개의 다른 데이터베이스를 쓰거나 최고 수준 테이블을 나눠 놓아도 SQL인가요? 당연하죠!

...이런 식으로요.

이런 유추가 완벽하진 않지만 정말 많은 통찰을 줍니다. 현재 좀 더 넓은 ECS 시스템, 예를 들어 컴포넌트와 엔티티 사이에 부모 자식 관계가 있는 컴포넌트 그래프라든지 그런 온갖 것들이 연구되고 있고, 물론 아주 좋습니다. SQL은 이미 이 모든 것들을 갖추고 있고, *모든 종류의* 데이터 관계를 표현하기 위한 완전한 언어와 소프트웨어 군입니다. 단지 게임은 좀 더 간단한 것만 있으면 되고, 기본적으로 항상 메모리 상에만 있으며, 나노 초에서 마이크로 초 수준의 시간 제한이 있을 뿐입니다. 그러니 타협을 거듭하면서 새로운 툴을 만들고 있는 겁니다.

"ECS"를 좀 덜 신비스럽도록 하고 어떻게 만들 지를 보여주면서 전체적인 조망을 보여주는 것이 내 토크의 또 다른 이유입니다.

## 잘못될 수 있는 곳

(노트: 이 섹션이 필요한지 잘 모르겠습니다. 그냥 내가 하고 싶은 **다른** 이야기를 끼워넣는 것 뿐일지도. 중요하지 않을 지도 모릅니다? 이미 이 토크는 아주아주 긴데도 말입니다)

토크를 시작할 때, borrow checker가 너무 제한적이라는, 지나치게 회의적인 태도는 잘못되었다고 주장했습니다. 여전히 그렇게 생각하지만 한 군데 문제가 있는 곳을 빠르게 짚어볼까 합니다. 내가 계속 제한을 느끼며 문제를 겪는 *유일한* 부분입니다. 프로젝트의 크기가 커지면 *뭔가*는 잘못되기 마련이죠? 한 가지 예시를 들어보겠지만, 이 문제는 전혀 rust에 국한된 문제가 아니고, 단지 rust에서는 좀 더 *바로* 느껴질 뿐입니다 (감 잡히시나요?).

언어의 경계는 어렵습니다.

이 문제는 바로 설명하기에 꽤... 어렵습니다. 이 이미 긴 토크 분량을 늘리지 않는 작은 예시를 들 수 있을 지 모르겠습니다. 나는 이 단 한 문제를 풀려고 한 크레이트(rlua)를 통째로 만들었고, 많은 어리석은 노력 끝에 내가 문제를 *거의* 반 정도는 해결했다고 확신하게 되었습니다.

어떤 컴포넌트들을 읽고 쓰려고 한다 칩시다 (이들은 시스템 동시성을 위해 RwLock에 담겨져 있습니다). Lua로 이 시스템을 읽을 수 있도록 하려고 ECS 스토어에 "쿼리"를 날리는 lua 스크립트를 짰습니다. 이제 쿼리 결과를 내주는 Lua에 "RwLockReadGrard" (실제로는 이걸 갖고 있는 구조체)를 넘겨주기만 하면 되는데... RwLockReadGuard가 정적이지 않습니다. 처음부터 락을 거는 대신 쿼리 API에 Lua 쿼리 락을 걸어주면 되지 않을까요... 이건 아주 느리고 스레드 안전하지도 않으며, 쿼리는 내내 락을 걸어야 할 겁니다. rental 크레이트를 사용할 수도 있는데... rental 크레이트는 너무 **어렵고** 이건 정말 **끔찍하네요**. (나중에 나는 이 문제를 rlua의 "범위" 시스템으로 해결했지만, 여전히 별로입니다).

시스템이 상태 기반이 아닌게 제일 좋겠죠, 맞죠? 보통 시스템은 데이터를 논리적으로 연관되어 있는 컴포넌트나 커스텀 리소스, 아니면 어떤 캐시같은 값에 저장해놓고 리셋되었을 때를 대비해야 합니다. 저장 / 복원 / 직렬화 등을 못하는 데이터는 의존하지 맙시다. Lua 시스템을 쓰기 전까지는 이게 쉽습니다. Lua에서의 값을 밖으로 끄집어내기는 정말 어렵거든요. Sync가 아니기 때문에 Lua의 상태를 리소스에 저장하는 것은 불가능합니다. lua의 데이터를 상태와 분리해서 저장하는 것도 안됩니다. 루아 내부 상태와 외부 핸들은 **전혀** Sync가 아니니까요. Lua만의 마법의 레지스트리 키들로 문제를 해결할 수도 있지만 그러면 각 시스템이 자신만의 lua 인스턴스를 갖게 될 거고, 잘못된 컨텍스트에서 lua 값을 쓰려고 시도할 때마다 제 발등을 찍게 될 겁니다. 직렬화도 못하고요.

lua 내부 타입이 아니라 그냥 데이터로 제한해서 데이터 타입을 만들 수도 있지만 그러면 그것과 lua가 아닌 표현끼리의 변환을 짜야 하므로 스크립트 시스템이 이 스토리지를 읽고 쓸 때마다 *개 느려*질 겁니다. 데이터를 복사할 때도 느려질 거고, 거의 대부분은 내부적으로 느린 lua API때문에 느려지겠죠.

모든 것이 어렵고, 정말 하려고 하면 할 수야 있겠지만 하면서도 계속 이것보다는 더 간단해야 한다고 느낄 겁니다. 심지어 C++로 자는 것보다 어렵지만 C++로 똑같은 것을 짜도 나쁘긴 마찬가지고 짜면서 rust로 짜는게 더 빠르다는 걸 깨달을 겁니다. 최소한 계속 크래시는 안나고 shared_ptr 순환은 없잖아요?

객체지향 디자인으로 잘못된 접근을 시도했던 이전 상황과 마찬가지로 느껴집니다. 불행히도 rlua는 lua C API의 동작에 꽤 심한 제한을 걸지만, 이건 내가 해줄 수 있는 최선에 가깝습니다.

언어의 경계는 특히, 언어 사이에 아주 다른 제한이 걸려 있을 때, 예를 들어 Rust와 Lua(아니면 C++과 Lua)같은 경우 어렵습니다. 특히 포함된 언어에 가비지 컬렉터가 있으면 가비지 컬렉터가 호스트 언어와 통신을 한다면 아무것도 동작하지 않고 아무것도 수집되지 않을 겁니다. (C++ / Rust에서, shared_ptr / Arc는, 뭐 일종의 가비지 컬렉터죠)

lua는 게임에서 인기가 많고, rlua를 specs같은 것과 어떻게 동작하느냐는 질문을 많이 받았으며, 매우 어렵고, 이 토크에서 내가 하려는 말을 아주 크게 거스르기 때문에 이것을 언급하기로 했습니다. 이 문제는 언어의 경계의 트릭키함 때문에 *독특한* 어려움을 갖고 있습니다. 그리고 C++에 비해 크게 어렵거나 쉽지 않고, C++과 비교하면 약간 더 어려우면서 안전하기는 하겠지만 C++로도 충분히 어려운데 더 어려운 방법이 대단한 장점을 가질 수는 없습니다.

곧 이 문제에 대한 해답을 찾을 것 같습니다! 내가 생각하고 있는 **다른** 토크에서는 비용 없는 가비지 컬렉션, 빠르고 (최대한) 쉬운 바인딩을 갖고 있는 새로운 언어 런타임을 rust로 만드는 방법을 다룰 생각입니다.

그때까진 게임 엔진에 스크립팅 레이어를 추가하기 전에 정말 정말 많이 숙고해야 합니다. 문제는, 나는 게임 엔진의 스크립팅 레이어를 **사랑**한다는 겁니다 (고치기 쉽다는 점 등 많은 이유로). 그래서 어쨌든 나는 추가했지만 이건 가볍게 내릴 수 있는 결정이 아니고 수많은 시간과 노력을 잡아먹을 수 있습니다. 나는 이걸 좀 더 쉽게 만들고 싶고, 안전하고 빠른 Lua를 Rust에서, 마치 PUC-Rio의 Lua와 C의 관계처럼 편안하게 만들고 싶습니다. 나중에 이에 대해 이야기할 것입니다.

## 요약

이 토크에서는 여러 목표를 갖고 있었습니다.

* 작은 규모의 프로젝트만 경험한 이들을 위해 중규모 rust 프로젝트 디자인을 설명하기
* 사람들이 "borrow checker와의 싸움"을 일으킨다고 생각하는 것의 예시를 들고 이 단계를 지나가는 조금이라도 더 구체적인 방법을 제시하기
* 데이터 지향 프로그래밍이 얼마나 좋은지, 게임과 Rust에 얼마나 적합한 지 보여주기
* Rust 이전의 게임 개발 패턴이 Rust에 적용했을 때도 잘 맞는 것을 보여주기

갖은 고생을 하면서 해결 방법을 찾아다닌 끝에야 결국 **제대로 듣질 않는** 것이 드러나는, 여러 언어에서 힘든 싸움이 될 많은 패턴을 이야기했습니다. 흥미롭게도, 이런 솔루션 중 많은 경우 Rust에서는 좀 더 빨리 어려움이 더 요란하고 **더** 짜증나는 형태로 나타납니다. 나는 나쁜 패턴의 단점이 있는 그대로 드러나는 도구를 좋아합니다. Rust는 그에 탁월하죠.

여기서 배운 교훈들을 C++에서, C에서 그대로 적용할 수 있을까요? 분명 그렇습니다. 심지어 이런 실수를 피하게 해주는 언어가 없어도 이런 실수를 저지르지 않는 사람에게도(나보다 낫군요), 수많은 장점이 있습니다. 이 토크는 30분짜리이고, 분명히 30분은 초과했기 때문에 Rust의 모든 장점이나 보편적인 내 rust 경험에 대해서는 말하지 않았습니다.
