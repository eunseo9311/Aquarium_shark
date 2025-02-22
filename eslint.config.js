export default [
    {
      // 언어 옵션을 통해 글로벌 변수를 정의합니다.
      languageOptions: {
        globals: {
          // 브라우저 전역 변수
          window: "readonly",
          document: "readonly",
          // Node 전역 변수 (필요하다면)
          process: "readonly",
          module: "readonly",
          __dirname: "readonly",
        },
        parserOptions: {
          ecmaVersion: 2022,
          sourceType: "module",
        },
      },
      // 플러그인과 확장 구성은 flat config 방식에 맞게 사용합니다.
      // 예를 들어, Next.js 코어 웹 바이탈 규칙을 사용하려면 다음과 같이 적용할 수 있습니다.
      plugins: {
        "next": require("eslint-plugin-next"),
      },
      rules: {
        // 원하는 ESLint 규칙들을 설정합니다.
        "no-console": "warn",
        // ...기타 규칙
      },
    },
  ];
  