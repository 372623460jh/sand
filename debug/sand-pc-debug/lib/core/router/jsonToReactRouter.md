### jsonToReactRouter
该工具用于将json形式的路由配置转换为react-router 4 组件式的配置，支持的配置：
1. Redirect
```
{
  path: '' // 匹配路径
  exact: 
  redirect:{
    to:'' // 重定向至哪个路径
  },
  
}
        from: route.path, // 路由全路径
          push: route.push, // 当为true时将push一个新的实体到历史中代替当前
          exact: route.exact || true, // 是否完全匹配
          sensitive: route.sensitive || true, // 是否区分大小写
          to: route.redirect.to, // 跳转路径


          key: route.key || i, // key
          from: route.path || '', // 路由全路径
          exact: route.exact, // 是否完全匹配
          to: route.redirect.to, // 跳转路径
```