function $(argu){
	var element = []
	switch(typeof argu){
		case 'string':
		var prefix = argu.charAt(0);
		switch(prefix){
			case '#':
			var domObj=document.getElementById(argu.substring(1));
			element.push(domObj);
			break;
		}
		break;
		case 'object':
		break;
		case 'function':
		window.addEventListener('load',argu,false);
		break;
	}
	var obj=new object;
	obj.click = function(fn){
		for(var i=0;i<element.length;i++){
			element[i].addEventListener('click',fn,false);
		}
	}
	return obj;
}