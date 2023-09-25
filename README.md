## 💻 tmdb

- 영화, TV 정보를 검색하는 사이트
- yarn berry 버전을 사용 했습니다

## 💡 프로젝트 스택

- React, TypeScript
- React-query, i18next
- Scss
- Vite

## 🏃 실행 방법

1. berry version

```
yarn set version berry
```

2. yml 파일 변경

```
nodeLinker: pnp
yarnPath: .yarn/releases/yarn-3.2.0.cjs
```

3. yarn install

```
yarn
```

4. vscode sdks

```
yarn dlx @yarnpkg/sdks vscode
```

5. typescript plugin

```
yarn plugin import typescript
```

6. vscode typescript 버전 설정

```
window: Ctrl+Shift+P
mac: Command+Shift+P
typescript 버전 선택 검색후
작업 영역의 버전선택(.yarn/sdks/typescript/lib)
```

7. StroyBook 실행

```
yarn storybook
```

- 루트 폴더에 본인의 .env 파일 추가

```
VITE_MOVIE_BASE_URL = 'https://api.themoviedb.org/3'
VITE_MOVIE_API_KEY = ''
VITE_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
VITE_BASE_BACK_DROP_IMAGE_URL ='https://image.tmdb.org/t/p/w1000_and_h450_multi_faces'
VITE_ACCESS_TOKEN =''
```

- 개발 서버 구동

```
yarn dev
```

- build

```
yarn build
```

## 🚀 개발 흐름

1. 타입 정의
2. tmdb api 에 요청한 데이터를 전역 스토어에 저장 할 수도 있었지만, 원하는 대로 데이터를 요청하고 캐싱 해주는 react-query 사용
3. 다국어 지원 가능성을 염두해두고 i18next 도입
4. custom hooks 로 자주쓰는 로직 재활용
