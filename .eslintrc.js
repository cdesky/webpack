module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react", "react-hooks"],
  root: true,
  rules: {
    "no-unused-vars": ["error", { vars: "all", args: "after-used" }],
    // 'react/react-in-jsx-scope': 'error' ,
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-no-undef": "error",
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  },
  settings: {
    react: {
      pragma: "React"
    }
  },
  globals: {
    $: false
  }
};
