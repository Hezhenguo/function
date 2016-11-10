function Jquery(argu){
	this.element = [];
	switch(typeof argu){
		case 'function':
			window.addEventListener('load',argu,false);
			break;

		case 'object':
			this.element.push(argu);
			break;

		case 'string':
			var ovefix = argu.charAt(0);
		switch(ovefix){
			case '#':
				var demoId=document.getElementById(argu.substring(1));
				if(demoId){
					this.element.push(demoId);
				}
				break;

			case '.':
				this.element = document.getElementsByClassName(argu.substring(1));
				break;

			default:
				this.element = document.getElementsByTagName(argu);
				break;
		} 
		break;

	}
}
Jquery.prototype.click = function(fn){
	for(var i=0;i<this.emement.length;i++){
		this.element[i].addEventListener('click',fn,false);
	}
};
Jquery.prototype.mouseover = function(fn){
	for(var i=0;i<this.element.length;i++){
		this.element[i].addEventListener('mouseover',fn,false);
	}
}
Jquery.prototype.on = function(type,select,fn){
	if (typeof select=='string') {
		for(var i=0;i<this.element.length;i++){
			this.element[i].addEventListener(type,function(e){
				var BomFix = select.charAt(0);
				switch(BomFix){
					case '#':
						if (e.target.id==select.substring(1)) {
							fn.call(e,target);
						}
					break;

					case '.':
						if (e.target.ClassName==select.substring(1)) {
							fn.call(e.target);
						}
					break;

					default:
					break;
				}
			})
		}
	}else{
		for(var i=0;i<this.element.length;i++){
			fn=select;
			this.element[i].addEventListener(type,fn,false);
		}
	}

}
Jquery.prototype.css = function(propertyName,value){//第一个传的值可能是字符串，对象或propertyName
	//判断value得值
	if(value){
		for(var i=0;i<this.element.length;i++){
			this.element[i].style[propertyName]=value;
		}
	}else{
		if(typeof propertyName=='string'){
			getStyle(this.element[0],propertyName);
		}else{
			for(var p in propertyName){
				for(var i=0;i<this.element.length;i++){	
				setClass(this.element[i],p,propertyName[p])
				}
			}
			
		}
	}
	return this;

};
Jquery.prototype.offset = function(coordinates){
	if(coordinates){
		for(var i=0;i<this.element.length;i++){
			var position = getStyle(this.element[i],'position');
			if(position == 'static'){
				this.element[i].style.position = 'realtive';
			}
			setClass(this.element[i],'left',coordinates.left);
			setClass(this.element[i],'top',coordinates.top);
		}
	}else{
		var iTop = iLeft = 0;
		var elem = this.element[0];
		do{
			iTop+=elem.offsetTop;
			iLeft+=elem.offsetLeft;
			elem=elem.offsetParent;
		}while(elem);
	}
	return this;

};
Jquery.prototype.hover = function(fnoVer,fnOut){
	for(var i=0;i<elememt.length;i++){
		this.element[i].addEventListener('mouseover',fnoVer,false);
		this.element[i].addEventListener('mouseout',fnOut,false);
	}
	return this;
}
function $(argu){
	return new Jquery(argu);
};
function setClass(elem,attr,value){
	switch(attr){
		case 'width':
		case 'heigth':
		case 'padding':
		case 'paddingLeft':
		case 'paddingRight':
		case 'paddingTop':
		case 'paddingBottom':
		value = /\%/.test(value)?value:Math.max(parseInt(value),0) + 'px';
		break;
		case 'left':
		case 'top':
		case 'bottom':
		case 'right':
		case 'margin':
		case 'marginLeft':
		case 'marginTop':
		case 'marginRight':
		case 'marginBottom':
		value = /\%/.test(value)?value:parseInt(value) + 'px';

	}
};
function getStyle(elem,prop){
	if (elem.currentStyle) {
		return elem.currentStyle[prop];
	}else{
		return getComputedStyle(elem,null)[prop];
	}
};