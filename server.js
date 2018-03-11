var express =  require('express');
var rp = require('request-promise');
var app = express();

var feedDomain = 'http://toifeeds.indiatimes.com/feeds/showfeed.cms';

app.get('/',function(req,res){
    res.send('request captured');

});


app.get('/showfeed',function(req,res){
    console.log(req.query);

    var  requrl = generateUrl(req.query);
    var options = {
        url:requrl,
        json:true
    }
    console.log(requrl);
    rp(options).then(function(result){
        res.send(result);
    });


})



function generateUrl(queryObj){
    var requrl = feedDomain;
    Object.keys(queryObj).forEach(function(item,index){
        requrl = requrl + (index===0?'?':'&') + item+'='+ queryObj[item];
    });


    return requrl;
}




app.listen('3000');
console.log("app is listening on port 3000");

