# ataola_imooc_movie :blush:
## 说明:
这个是阿涛在看了慕课大佬scott老师的视频后，自己跟着做的基于NodeJS和mongoDB的
小网站

## Explain
This is a small website where ataola watched the video of imooc Scott teacher, followed by NodeJS and mongoDB.

## 项目知识点一览表(Project Table)

### 服务端(Server)
NodeJS+Express(jade)
### 数据库(database)
mongoDB+mongoose
### 包库管理(package manage)
npm

### 前端(Front end)
Jquery+Bootstrap
### 管理工具(manage tools)
bower
### 构建工具(build tools)
grunt
### 本地环境(local Environment)
less(cssmin)+JSHint(UglifeJS)+mocha(nodemon)

### 项目目录（Project Catalog)
![项目目录](./public/images/init.png)

### 视图(View)
基于jade模板的视图创建，总共是四个，一个是首页index，一个是后台admin，
一个是列表页list，一个是详细页detail，这个要注意的就是排列，可能有空格会错误，
不过webstorm这种神器一看就知道错没错，下面放一个模板,jade的语法不会的Google吧，
有html基础的应该很好理解
```
doctype
html
    head
        meta(charset="utf-8")
        title #{title}
    body
        h1 #{title}
```

### 路由控制(Routing control)
这里没有按照视频上的，自己用了es6的语法，具体的以首页为例
```
   app.get('/',(req,res)=>{
      res.render('index',{title:'ataola_imooc_movie'});
   });
```
效果如下：:point_down:
![路由测试](./public/images/viewroute.png)
