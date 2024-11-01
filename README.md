
# FETSTIVAL 🐶🎉


## 1. Project Overview (프로젝트 개요)
> 반려동물과 함께 참여할 수 있는 페스티벌 정보를 모아서 확인하고,
> 페스티벌 관련 커머셜 상품을 구매할 수 있는 쇼핑 플랫폼

- [Notion Link](https://shinhm1.notion.site/6-121e7e8fdd12801cab96e77334648a2d?p=121e7e8fdd1280e89a44e709601d181a&pm=s)
- [Figma Link](https://www.figma.com/design/G14CLP8aTlOvMhZPhx4Ggt/PETSTIVAL-UI?node-id=0-1&t=IuyaigNYK4MYWYA2-1)

<br/>

## 2. Team Members (팀원 및 팀 소개)
| 김다연 | 김영동 | 신혜민 | 유성현 | 최명지 |
|:------:|:------:|:------:|:------:|:------:|
| FE | FE | PL | FE | FE |

<br/>

## 3. 주요 기능
- **소셜 로그인**: 카카오, 구글 로그인 지원

- **반려견 프로필**: 반려견 상세정보를 프로필에 등록 및 조회, 수정

- **페스티벌 정보 확인**: 공공 데이터 API 활용한 반려동물 페스티벌 정보 확인

- **상품 조회 및 구매**: 페스티벌, 반려동물 관련 상품 조회 및 구매

- **결제**: 토스페이먼츠 PG결제를 활용한 테스트 결제

- **장바구니**: 구매하고 싶은 상품 저장

<br/>

## 4. 기술 스택
| 내용        | 사용 기술 스택                   |
|-------------|----------------------------------|
| FE          | React + Vite + JavaScript        |
| BE          | Supabase                         |
| DB          | Edge Function, Docker, Deno, TypeScript |
| CSS         | MUI, StoryBook, CSS Module       |
| 상태관리    | Zustand                          |
| 배포    | Vercel                          |


<br/>

## 5. 프로젝트 구조
```plaintext
project/
├── supabase/                # Supabase Edge Function 모음
├── src/
│   ├── assets/              # 이미지, 폰트 등 정적 파일
│   ├── components/          # UI 컴포넌트 모음
│   ├── stories/             # 디자인 재사용이 가능한 UI 컴포넌트 및 storybook 배포 파일 모음
│   ├── hooks/               # 커스텀 훅 모음
│   ├── service/             # Supabase Client 및 DB 관련 파일 모음
│   ├── pages/               # 각 페이지 컴포넌트 모음
│   ├── App.js               
│   ├── index.js             
│   package-lock.json    
│   package.json         
├── .gitignore               
└── README.md                
```

<br/>

## 6. 커밋 컨벤션
### 기본 구조
```
type(영문): subject(한글)
```

### type 종류
| 커밋 태그 | 설명                              | 예시                          |
|-----------|-----------------------------------|-------------------------------|
| feat      | 새로운 기능 추가                   | feat: …                       |
| fix       | 버그 수정                          | fix: …                        |
| style     | HTML, CSS로 UI 구현 시 작성       | style: 로그인 페이지 UI 구현    |
| refactor  | 코드 리팩토링                      | refactor: update login logic  |
| docs      | 문서 (README, 템플릿) 수정         | docs: …                       |
| test      | 테스트 코드                        | test: …                       |
| build     | 빌드 관련 파일 수정               | build: …                      |
| ci        | CI 설정 파일 수정                 | ci: …                         |
| pref      | 성능 개선                          | pref: …                       |
| chore     | 의존성 추가 등 기타 작업           | chore: …                      |

