
const http = require('http');
const chalk = require("chalk");

const middleware = require("../src/bb");
// 监听请求
const defaultConfig = require("./config");

const open = require("./aa/open");
const argv = require("../src/cli/index");
const config = Object.assign({}, defaultConfig, argv);


const { port, host, root } = config;
const server = http.createServer(middleware(root));
//    function fn(filePath){
//        return new Promise((reolve,reject)=>{
//            fs.stat(filePath,(err,stats)=>{
//                if(err){
//                    return  reject(err)
//                }
//                return reolve(stats)
//            })
//        })
//    }


//     function f1 (filePath){
// return new Promise ((reolve,reject)=>{
//      fs.readdir(filePath, (err, files) => {
//          if(err){
//              return reject(err)
//          }
//             return  reolve(files)
//     })
// })}
// function f2 (filePath){
//     return new Promise ((reolve,reject)=>{
//          fs.readFile(filePath, (err, data) => {
//                if(err){
//                    return reject(err)
//                }
//                 return  reolve(data)
//         })
//     })}

// 启动服务
server.listen(port, host, err => {
	if (err) {
		console.log("服务器启动失败：", err);
		return;
	}
	const address = `http://${host}:${port}`;
	console.log("服务器启动成功，请访问: " + chalk.yellow(address));
	open(address);
});
