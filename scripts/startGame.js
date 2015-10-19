function getJsonP(){
	//Remove new game link
	var link = document.getElementById('linkNewGame');
	link.parentElement.removeChild(link);
	/*
	//Add script to make 
	var script = document.createElement("script");
	script.id = 'jsonPId';
	script.src="https://services.sapo.pt/Codebits/listbadges?callback=initiateGame";
	document.body.appendChild(script);*/
	var r = new XMLHttpRequest();
	r.open("GET", "https://services.sapo.pt/Codebits/listbadges", true);
	r.onreadystatechange = function () {
		if (r.readyState != 4 || r.status != 200) return;
			var data = JSON.parse(r.responseText);
			initiateGame(data);
	};
	r.send();
	}

function changeImgSource(link){
	this.changeSource(link);
}


function initiateGame(data){


	var img, data2 = [], p, btn, script;	

	//Remove JSONP script element
	//script = document.getElementById('jsonPId');
	//script.parentElement.removeChild(script);
	
	//New Game
	var game = new MemoryJavascript();
	
	//Shuffles 18 (9x2) codebits badges
	data2 = game.shuffle(game.narrowToNineX2(game.shuffle(data)));

	game.gameDataArray = data2;
	
	//Create game table
	for(var i = 0; i < data2.length; i ++){
		img = document.createElement("img");
		img.src="assets/defaultavatar.jpg";
		img.id="idLink:"+i;
		img.classList.add("normal");
		img.addEventListener("click",changeImgSource.bind(game, img.id),false);
	
		window.baseDiv.appendChild(img);			
				
		if((i+1)%6 === 0){
			p = document.createElement("p");
			window.baseDiv.appendChild(p);
		}
	}
	
	var span = document.createElement("span");
	span.id="linkStartGame";
	
	btn = document.createElement("button");
	btn.type="button";
	btn.innerHTML = "Iniciar Jogo";
	btn.addEventListener("click",game.startGame.bind(game),false);
	span.appendChild(btn);	
	
	window.baseDiv.appendChild(span);
}

(function newGame(){
	var a = document.createElement("a");
	a.href="#";
	a.id = "linkNewGame";
	a.innerHTML = "Novo Jogo";
	a.addEventListener('click', getJsonP, false);
	var baseDiv = document.getElementById('jsmmDiv');
	baseDiv.appendChild(a);
	
	window.baseDiv = baseDiv;
})();
