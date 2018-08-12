//导入相应模块
var express = require('express');
var path=require('path');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var Movie=require('./models/movie');
var _=require('underscore');
var port = process.env.PORT || 3000;
var app = express();

//连接mongodb数据库
mongoose.connect('mongodb://localhost/ataola_imooc_movie');
//设置视图
app.set('views', './views/pages');
app.set('view engine', 'jade');

//静态资源
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '1mb'}));
app.use(express.static(path.join(__dirname,'public')));
app.locals.moment=require('moment');
//index page
app.get('/', (req, res) => {
    Movie.fetch((err,movies)=>{
        if(err){
            console.log(err);
        }
        res.render('index',{
            title:'ataola的电影唉',
            movies:movies
        });
    });
});

//后台 admin page
app.get('/admin/movie', (req, res) => {
    // res.render('index', {title: '这是后台界面'});
    res.render('admin',{
        title:'ataola_imooc后台录入页',
        movie:{
            title:'',
            doctor:'',
            country:'',
            year:'',
            poster:'',
            flash:'',
            summary:'',
            language:''
        }
    });
});
// admin更新movies数据
app.get('/admin/update/:id',(req,res)=>{
   var  id=req.params.id;
   if(id){
       Movie.findById(id,(err,movie)=>{
           res.render('admin',{
               title:'ataola后台更新页',
               movie:movie
           })
       })
   }
});
// admin 后台提交页post请求
app.post('/admin/movie/new',(req,res)=>{
    var id=req.body.movie._id;
    var movieObj=req.body.movie;
    var _movie;

    if(id!=='undefined'){
        Movie.findById(id,(err,movie)=>{
            if(err){
                console.log(err);
            }
            _movie=_.extend(movie,movieObj);
            _movie.save((err,movie)=>{
               if(err){
                   console.log(err);
               }
               res.redirect('/movie/'+movie._id);
            });
        });
    }
    else {
        _movie=new Movie({
            doctor:movieObj.doctor,
            title:movieObj.title,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash
        });
        _movie.save((err,movie)=>{
            if(err){
                console.log(err);
            }
            res.redirect('/movie/'+movie._id);
        });
    }
});

//详细页 detail page
app.get('/movie/:id', (req, res) => {
    // res.render('index', {title: '这是详细页'});
    var id=req.params.id;
    Movie.findById(id,(err,movie)=>{
       res.render('detail',{
           title:'ataola的详情页唉'+movie.title,
           movie:movie
       });
    });
});

//列表页 list page
app.get('/admin/list', (req, res) => {
    Movie.fetch((err,movies)=>{
        if(err){
            console.log(err);
        }
        res.render('list',{
            title:'ataola的列表页',
            movies:movies
        })
    })
});

//list 列表页的删除
app.delete('/admin/list',function (req,res) {
   var id=req.query.id;
   if(id){
       Movie.remove({_id:id},function (err,movie) {
           if(err){
               console.log(err);
           }
           else{
               res.json({success:1});
           }
       });
   }
});


//服务器启动监听
app.listen(port);
console.log('The Project is running in ' + port);