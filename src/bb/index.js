
const path = require("path");
const fs = require("fs");
const util = require("util");
const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);
const cache = require("../aa/cache");
const pug = require("pug");

const fn = require("../aa");
const mime = require("../aa/mime");
module.exports = root => {
	return async (req, res) => {
		const url = req.url;

		const filePath = path.resolve(root, `.${url}`);
		try {
			const stats = await stat(filePath);
			if (stats.isDirectory()) {//如果是目录的话，应该显示目录 下面的文件列表
				let files = await readdir(filePath);
				const pugurlpath = path.resolve(__dirname, "../pug/index.pug");
				const html = pug.renderFile(pugurlpath, { files, url });

				res.statusCode = 200;
				res.setHeader("Content-Type", "text/html;charset=utf8");
				res.end(html);
			} else if (stats.isFile()) {
				let data = fs.createReadStream(filePath);

				const isCache = cache(stats, req, res);

				if (isCache) { return; }
				let ext = fn(filePath);

				if ("js" || "css" || "html" || "json" == ext) {
					data = mime(data, req, res);

				}



				res.statusCode = 200;
				res.setHeader("Content-Type", `${ext};charset=utf8`);
				data.pipe(res);
				return;
			}

		} catch (e) {
			console.log(e);
			res.statusCode = 404;
			res.setHeader("Content-Type", "text/plain;charset=utf8");
			res.end(`${url} 不是一个文件或文件夹`);
		}
	};

};
