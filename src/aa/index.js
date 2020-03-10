const path=require("path");
const obj = {
    txt: " text/plain",
    css: "text/css",
    html: "text/html",
    js: "application/javascript",
    gif: "image/gif",
   jpg:" image/ jpeg",
   jpeg:" image/ jpeg",
png:"image / png",
mp3:"audio / webm",
mp4:"video / webm",
// image / svg + xml
// image / x - icon
json:"application / json"
// multipart / form - data
};
function fn(filePath){
   const extname=path.extname(filePath).slice(1);
 
       return   obj[extname];
 
}

module.exports=fn;