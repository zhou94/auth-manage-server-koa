# 一个带权限等的后台服务端
###起因：

- 前段时间一直在写angular，还是维护ng1的项目，好不容易要做个钉钉小程序版本的应用，然后后台管理系统也打算重构了，正好也对不想写vue然后就用了react，然后搭好后发现还没接口，也不想用mock之类，那就说干就干，然后有了它

* * *

###技术栈：
- koa2+mongodb

###更新说明：
- 2018-9-15 
  写了一下午目前还就把登陆退出token鉴权等部分完成，有些地方还是有很大提升空间，陆续会优化

### Usage
```
本地运行
yarn install || npm install
yarn start || npm start

打包
yarn build || npm run build
