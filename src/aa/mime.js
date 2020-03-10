const {createDeflate,createGzip}= require("zlib");


function mime(data,req,res){
    const acceptEncoding = req.headers["accept-encoding"];
    if(acceptEncoding){
   
      const acce =acceptEncoding.split(", ");
     
      if(acce.indexOf("gzip")!==-1){
        res.setHeader("Content-Encoding","gip");
        data=data.pipe(createGzip());
      
        return data;
      }else if(acce.indexOf("gdeflate")!==-1){
          res.setHeader("Content-Encoding","gdeflate");
          data.pipe(createDeflate());
        return;
      }else{
          return data;
      }

    }
}
module.exports=mime;