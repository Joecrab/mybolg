let bodyParser = require('body-parser'); 
let routerApi = require('./router.js');

let express = require('express');
let app = express();

//app.use() 相当于每个请求都在里面过一遍
app.use(express.static(__dirname + '/public'))
//将静态文件目录设置为根目录public，这是为了浏览器可以访问静态资源
//__dirname表示一个绝对路径，是nodejs的一个全局变量，代表程序运行的根目录

app.use(bodyParser.json())//处理post请求的json数据

app.use('/api', routerApi);
//当一个路径有多个匹配规则时，使用app.use（），否则用app.get/post（）那些
//好处：（自己的理解）我们可以创建不同的路由对象，里面有很多匹配规则，然后可以和不同的path
//区分开来，可以知道这个路径的数据时干嘛用的了，而不用把一堆的get/post写在一起

app.listen(3000, () => {
    console.log('listening 3000...')
})
