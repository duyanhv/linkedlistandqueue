const fs = require('fs');

const writeFileSync = (filePath,data) => {
	fs.writeFileSync(filePath, data,'utf-8');
}

const readFileSync = (fileName,data) => {
	let readData = fs.readFileSync(fileName, data,'utf-8');
}

const existsSync = (filePath) => {
	return fs.existsSync(filePath);
}


module.exports = {
	writeFile: writeFileSync,
	readFile : readFileSync,
	exists : existsSync

}