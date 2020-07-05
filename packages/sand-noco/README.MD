node-core === noco 基于 koa 的扩展最佳实践

@jianghe 每次脚手架修改完后，记得保持脚手架项目的干净，执行下 npm run clean 即可

### 日志中间件(loggerMiddleware)

日志有两种：一种是写到日志文件的 依赖 log4js 日志，一种是输入到控制台的 debug 日志。分别依赖 log4js 和 debug 库。sand-noco 库只对外输出基于 log4js 的一个中间件，该中间件执行后会将 logger 对象挂在到 ctx。debug 日志在具体的业务代码中自行使用。

日志分级：框架报错日志（不对外输出，sand-noco 中使用），通用日志，服务报错日志

1. 日志中间件中自定义框架自身的错误码。
2. 提供日志中间件，日志中间件会初始化 log4js ，包装后挂载到 ctx 上：commonLogger 和 errorLogger
3. ctx.commonLogger 和 ctx.errorLogger, 该对象有 log4j 提供的多种日志方式，debug，info，warn，error 等和 log4js 一致。

#### 使用方式

```
const { loggerMiddleware, app } = require('sand-noco');
// app其实就是koa2实例
app.use(loggerMiddleware());

// 输出到日志文件的
ctx.commonLogger.info(msg)
ctx.commonLogger.error(new Error())
ctx.errorLogger.info(msg)
ctx.errorLogger.error(new Error())
```

### 错误处理中间件（errorHandlerMiddleware）

errorHandlerMiddleware 该中间件是默认第一个引入的中间件，主要兜底处理异常。用 trycatch 方法包裹 await next()，捕获到未处理的 throw 异常使用 logger 直接输出

### cors 中间件（corsMiddleware）

基于 koa2-cors 可自定义 cors 规则。

#### 使用方式

```
const { corsMiddleware, app } = require('sand-noco');
// app 其实就是 koa2 实例
app.use(corsMiddleware(getCors()));
```

### 视图中间件（viewMiddleware）

基于 koa-views 和 ejs

#### 使用方式

```
const { viewMiddleware, app } = require('sand-noco');
// app 其实就是 koa2 实例
app.use(viewMiddleware({
  // 传入视图路径
  viewsPath:'',
}));
```
