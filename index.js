/*==============================================
=            Import of node_modules            =
==============================================*/
const fs = require("fs");
/*=====  End of Import of node_modules  ======*/


const toBuffer = module.exports.toBuffer = (base64String)=>{
	let base64StringSplitted = base64String.split(";base64,");
	let contentType = base64StringSplitted[0].replace("data:","");
	let buffer = new Buffer(base64StringSplitted[1], "base64");
	return {
		"contentType" : contentType,
		"buffer" : buffer
	};
};


const toBinary = module.exports.toBinary = (base64String)=>{
	let bufferObject = toBuffer(base64String);
	return {
		"contentType" : bufferObject.contentType,
		"binary" : bufferObject.buffer.toString("binary");
	}	
};


const toFile = module.exports.toFile = (fileUrl, base64String)=>{
	let bufferObject = toBuffer(base64String);
	fs.writeFileSync(fileUrl, bufferObject.buffer);
	return {
		"contentType" : bufferObject.contentType,
		"fileUrl" : fileUrl
	}
};