(function(window){
"use strict";

function MemoryJavascript(){
	this.gameDataArray = [];
	this.comparator = [];
	this.gameStarted = false;
	this.allowedMoves = 2;
	this.moveAllowed = true;
	this.availablePairs = 9;	
}	


MemoryJavascript.prototype.comparatorContainsValue = function(id){
	var i;
	for (i = 0; i < this.comparator.length; i++){
		if(this.comparator[i].index == id){
			console.log("found it");
			return true;
		}
	}

	return false;

}


MemoryJavascript.prototype.changeSource = function(id){
	if(!this.gameStarted || !this.moveAllowed )
		return;
		
	
	var numId = parseInt(id.split(":")[1]);
	if(this.comparator.length > 0 && this.comparatorContainsValue(id)){
		document.getElementById(this.comparator[this.comparator.length -1].index).src="assets/defaultavatar.jpg";
		this.comparator.pop();
		this.allowedMoves = 2;
		return;
	}
		

	if(this.comparator.length === 2)
		return;




	document.getElementById(id).src = this.gameDataArray[numId].img.replace("http:\/\/codebits.eu\/imgs\/b\/2014\/","assets/").replace("http:\/\/codebits.eu\/imgs\/b\/2012\/","assets/");
	
	this.comparator.push({src:this.gameDataArray[numId].img, index: id});
	
	this.allowedMoves--;
	
	
	if(this.allowedMoves === 0){
		
		this.moveAllowed = false;
		
		if(this.comparator[this.comparator.length -1].src !== this.comparator[this.comparator.length -2].src){
			setTimeout(this.resetPair.bind(this), 750);
			
		}else{
			this.availablePairs--;
			if(this.availablePairs === 0){
				this.gameStarted = false;
				
				var p = document.getElementById('timerP');
				var time = p.innerHTML;
				p.parentElement.removeChild(p);
					
				
				var link = document.createElement("a");
				link.href = "https://twitter.com/intent/tweet/?text=Memory JavaScript FTW em: "+ time;
				link.innerHTML = "Partilhar o resultado no tweeter";
				link.id = "twitterLink";
				link.target = "_blank";
	
				window.baseDiv.appendChild(link);
				
				
				
			}else{
				this.comparator.pop();
				this.comparator.pop();
			}
		}
		
		this.moveAllowed = true;
		this.allowedMoves = 2;
		
	}
	
	
};


MemoryJavascript.prototype.resetPair = function(){
	document.getElementById(this.comparator[this.comparator.length -1].index).src="assets/defaultavatar.jpg";
	document.getElementById(this.comparator[this.comparator.length -2].index).src="assets/defaultavatar.jpg";
	this.comparator.pop();
	this.comparator.pop();
};



MemoryJavascript.prototype.startGame = function(){
	var link = document.getElementById('linkStartGame');
	link.parentElement.removeChild(link);
	
	this.gameStarted = true;
	
	
	var p = document.createElement("p");
	p.id="timerP";
	p.innerHTML = "0 segundos";
	
	window.baseDiv.appendChild(p);
	
	window.setInterval(function(){
	if (!this.gameStarted)
		return;
		this.updateTimer();
	
	}.bind(this), 800);
	
};


MemoryJavascript.prototype.shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

 
  while (0 !== currentIndex) {


    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;


    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

MemoryJavascript.prototype.narrowToNineX2 = function(array){
	var newArray = [], newAuxArray = [], returnArray=[];
	

	for (var i = 0; i < 9; i++){
		newArray[i] = array[i];
	}
	

	newAuxArray = newArray.slice(0);
	

	returnArray = newArray.concat(newAuxArray);
	
	return returnArray;
};

MemoryJavascript.prototype.updateTimer = function(){	
	var time = parseInt(document.getElementById("timerP").innerHTML.split(" ")[0]);
	time++;
	document.getElementById("timerP").innerHTML = time + " segundos";
};

window.MemoryJavascript = MemoryJavascript;

})(window);