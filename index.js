var __slice = Array.prototype.slice
,	S = require('string')
,	is = require('dis')
,	dummy = S()
;


function StringLike(value){
	if(!(this instanceof StringLike)){return new StringLike(value);}
	this.setValue(value);
}

StringLike.prototype = S();

StringLike.prototype.constructor = StringLike;

var p = StringLike.prototype;

p.linebreaksToHTML = function(tag,brTag){
	if (this.s === null || this.s === undefined){return new this.constructor('')}
	tag = tag || 'p';
	brTag = brTag || 'br';
	var s = this.s
		.replace(/\r/g,'\n')
		.replace(/(\n*?)$/,'') //remove trailing line returns
		.replace(/^\n\n?/,'') //remove start line returns
		.split(/\n{2,}/)
		.join('</'+tag+'><'+tag+'>')
		.replace(/\n/g,'<'+brTag+'>')
	;
	var html = '<'+tag+'>'+s+'</'+tag+'>';
	return new this.constructor(html)
}

p.template = function(values, opening, closing) {
	opening = opening || StringLike.TMPL_OPEN
	closing = closing || StringLike.TMPL_CLOSE
	
	return dummy.template.call(this,values,opening,closing)

}

var convertStringsInObject = function(obj,limit,store){
	var prop,i,n,l;
	if(store){
		if(store===true){store=[];}
		l = store.length;
		for(i=0;i<l;i++) {
			if (store[i] === obj){return;}
		}
		store.push(obj);
	}
	limit = limit || 10;
	if(limit==0){return;}
	for(n in obj){
		if(n=='s' || !obj.hasOwnProperty(n)){continue;}
		prop = obj[n];
		if (typeof prop === 'string'){
			obj[n] = new StringLike(prop);
		}
		else if(is.object(prop)){
			convertStringsInObject(prop,limit-1,store);
		}
	}
}

for(var n in S){StringLike[n] = S[n];}
StringLike.convert = convertStringsInObject;
StringLike.VERSION = '0.0.1'
module.exports = StringLike;