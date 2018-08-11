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
app.use(express.static(path.join(__dirname,'bower_components')));
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
    // res.render('index',{title:'ataola_imooc_movie'});
    // res.render('index', {
    //     title: 'ataola_movie首页',
    //     movies: [{
    //         title:'西虹市首富',
    //         _id:1,
    //         poster:'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529206747.webp'
    //     },{
    //         title:'肆式青春 詩季織々',
    //         _id:2,
    //         poster:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2526429256.webp'
    //     },{
    //         title:'神秘世界历险记4',
    //         _id:3,
    //         poster:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2528380655.webp'
    //     },{
    //         title:'小偷家族 万引き家族',
    //         _id:4,
    //         poster:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529394955.webp'
    //     },{
    //         title:'风语咒',
    //         _id:5,
    //         poster:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2528298441.webp'
    //     },{
    //         title:'狄仁杰之四大天王',
    //         _id:6,
    //         poster:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2526405034.webp'
    //     }]
    // });
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
    // res.render('detail',{
    //     title:'ataola_imooc_详情页',
    //     movie:{
    //         doctor:'闫非 / 彭大魔',
    //         country:'中国大陆',
    //         title:'西虹市首富',
    //         year:'2018',
    //         poster:'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529206747.webp',
    //         language:'汉语普通话',
    //         flash:'http://player.youku.com/player.php/sid/XMzc0NzgyNDg5Mg==/v.swf',
    //         summary:'　西虹市丙级球队大翔队的守门员王多鱼（沈腾 饰）因比赛失利被教练开除，一筹莫展之际王多鱼突然收到神秘人士金老板（张晨光 饰）的邀请，被告知自己竟然是保险大亨王老太爷（李立群 饰）的唯一的继承人，遗产高达百亿！但是王老太爷给出了一个非常奇葩的条件，那就是要求王多鱼在一个 月内花光十亿，还不能告诉身边人，否则失去继承权。王多鱼毫不犹豫签下了“军令状”，与好友庄强（张一鸣 饰）以及财务夏竹（宋芸桦 饰）一起开启了“挥金之旅”，即将成为西虹市首富的王多鱼，第一次感受到了做富人的快乐，同时也发现想要挥金如土实在没有那么简单！'
    //     }
    // });
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
    // res.render('index', {title: '这是列表页'});
    // res.render('list',{
    //     title:'ataola_imooc列表页',
    //     movies:[{
    //         title:'西虹市首富',
    //         _id:1,
    //         doctor:'闫非 / 彭大魔',
    //         country:'中国大陆',
    //         year:'2018',
    //         language:'汉语普通话',
    //         flash:'http://player.youku.com/player.php/sid/XMzc0NzgyNDg5Mg==/v.swf',
    //         summary:'西虹市丙级球队大翔队的守门员王多鱼（沈腾 饰）因比赛失利被教练开除，一筹莫展之际王多鱼突然收到神秘人士金老板（张晨光 饰）的邀请，被告知自己竟然是保险大亨王老太爷（李立群 饰）的唯一的继承人，遗产高达百亿！但是王老太爷给出了一个非常奇葩的条件，那就是要求王多鱼在一个 月内花光十亿，还不能告诉身边人，否则失去继承权。王多鱼毫不犹豫签下了“军令状”，与好友庄强（张一鸣 饰）以及财务夏竹（宋芸桦 饰）一起开启了“挥金之旅”，即将成为西虹市首富的王多鱼，第一次感受到了做富人的快乐，同时也发现想要挥金如土实在没有那么简单！'
    //     }]
    // })
});


//服务器启动监听
app.listen(port);
console.log('The Project is running in ' + port);