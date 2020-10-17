# sand 项目的 lint 统一规范

## 简介

> 该包中提供了如下功能

- eslint
  - react(js)
  - react(js)+prettier
  - node(js)
  - node(js)+prettier
  - typescript
  - typescript+prettier
  - vue(TODO:)
- stylelint
- commitlint

## 使用

```
npm i @jianghe/sand-lint --save
```

### eslint

#### 1. react

- 安装依赖.

  1. eslint
  2. @jianghe/sand-lint

- 配置.eslintrc.js

```
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/react'),
  rules: {},
};
```

#### 2. react + prettier

- 安装 Prettier Formatter for Visual Studio Code 插件

- 安装依赖

  1. eslint
  2. @jianghe/sand-lint

- 配置.eslintrc.js

```
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/react/prettier'),
  rules: {},
};
```

- 配置.prettierrc.js

```
const prettierConfig = require('@jianghe/sand-lint/prettier');
// 代码格式化配置
module.exports = prettierConfig;
```

#### 3. typescript

- 安装依赖

  1. eslint
  2. @jianghe/sand-lint

- 配置.eslintrc.js

```
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/typescript'),
  rules: {},
};
```

#### 4. typescript + prettier

- 安装 Prettier Formatter for Visual Studio Code 插件

- 安装依赖

  1. eslint
  2. @jianghe/sand-lint

- 配置.eslintrc.js

```
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/typescript/prettier'),
  rules: {},
};
```

- 配置.prettierrc.js

```
const prettierConfig = require('@jianghe/sand-lint/prettier/typescript');
// 代码格式化配置
module.exports = prettierConfig;
```

#### 5.node

- 安装依赖

  1. eslint
  2. @jianghe/sand-lint

- 配置.eslintrc.js

```
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/node'),
  rules: {},
};
```

#### 6. node + prettier

- 安装 Prettier Formatter for Visual Studio Code 插件

- 安装依赖

  1. eslint
  2. @jianghe/sand-lint

- 配置.eslintrc.js

```
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/node/prettier'),
  rules: {},
};
```

- 配置.prettierrc.js

```
const prettierConfig = require('@jianghe/sand-lint/prettier');
// 代码格式化配置
module.exports = prettierConfig;
```

#### 7. vue 项目

TODO:

### stylelint

#### 配置

- 安装依赖

  1. stylelint
  2. @jianghe/sand-lint

- 配置 .stylelintrc.js

```
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/style'),
  rules: {},
};
```

### commitlint

#### 配置

- 安装依赖

  1. @commitlint/cli
  2. husky
  3. @jianghe/sand-lint

- 配置 commitlint.config.js

```
module.exports = { extends: ['@jianghe/sand-lint/commitlint'] };
```

- 配置 package.json

```
{
  // ...
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  // ...
}
```
