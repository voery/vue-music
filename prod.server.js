var express = require('express');
var app = express();
// 加载静态资源
app.use(express.static('./dist'));
var port = 3001;

module.exports=app.listen(port,function(err){
    if(err){
        console.log(err);
        return ;
    }
    console.log("Listening at http://localhost:"+port+'\n');
});