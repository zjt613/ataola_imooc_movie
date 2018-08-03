//导入相应模块
var express=require('express');
var port=process.env.PORT || 3000;
var app=express();
//设置视图
app.set('views','./views');
app.set('view engine','jade');

//index page
app.get('/',(req,res)=>{
   res.render('index',{title:'ataola_imooc_movie'});
});

//后台 admin page
app.get('/admin',(req,res)=>{
   res.render('index',{title:'这是后台界面'});
});

//详细页 detail page
app.get('/movie/:idl',(req,res)=>{
   res.render('index',{title:'这是详细页'});
});

//列表页 list page
app.get('/admin/list',(req,res)=>{
   res.render('index',{title:'这是列表页'});
});


//服务器启动监听
app.listen(port);
console.log('The Project isrunning in '+port);