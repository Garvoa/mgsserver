
const etag=require("etag");
// 设置缓存 
//是否命中缓存
//判断缓存

function checkCache(stats,req){
  //  获取首次客户端首次发送的if-none-match if-modified-sine


  const ifNoneMatch = req.headers["if-none-match"]; // 属性名都是小写~
  const ifModifiedSince = req.headers["if-modified-since"];

    const eTag=etag(stats);
    if(ifNoneMatch&&ifNoneMatch===eTag){
        return true;
    }
    const lastmodified=new Date(stats.mtime).toGMTString();
    if(ifModifiedSince&&ifModifiedSince===lastmodified){
        return true;
    }
    return false;
}

function  setCache(stats,res){
    res.setHeader("Cache-Control","max-age=3600,public");
    res.setHeader("Expires",new Date(Date.now+0).toGMTString());
    res.setHeader("Etag",etag(stats));
    res.setHeader("Last-modified",new Date(stats.mtime).toGMTString());
}

function cache(stats, req, res){
    const isCache = checkCache(stats, req);
    
    if (isCache) {
        // 命中缓存 - 设置响应状态码为304
        res.statusCode = 304;
        res.end();
        return true;
      }
    
    setCache(stats, res);
  return false;
}
module.exports=cache;

