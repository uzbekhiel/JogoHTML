function moveInimigoEsq(obj) {
		obj.css("left", obj.offset().left - 10);
		if(obj.offset().left <= 0) obj.attr("move","direita");
    }
	
	function moveInimigoDir(obj) {
		obj.css("left", obj.offset().left + 10);
		if(obj.offset().left >= ($(window).width() - obj.width())) obj.attr("move","esquerda");
    }
	
	function movimentoInimigo(obj){
		var rand = Math.floor((Math.random()*10)+1);
		
		if(rand % 5 == 0) obj.css("left", obj.offset().left - 10);
		if(rand % 4 == 0) obj.css("left", obj.offset().left + 10);
		
		window.setTimeout(function(){movimentoInimigo(obj);}, 100);
	
	}
	
	function movimentoInimigo2(obj){
	
		if(obj.attr("move") == "esquerda") moveInimigoEsq(obj);
		if(obj.attr("move") == "direita") moveInimigoDir(obj);
		
		if(n % 11 == 0){
			$('body').append("<hr id=\"tiroInimigo"+n+"\" class=\"tiro\" size=\"30\"  width=\"1\">");
			$("#tiroInimigo"+n+"").css("left", $("#objeto2").offset().left + 50);
			$("#tiroInimigo"+n+"").css("top", $("#objeto2").offset().top + 5);
			tiroInimigo($("#tiroInimigo"+n+""));	
		}
		n++;
		window.setTimeout(function(){movimentoInimigo2(obj);}, 80);
	}
	
	function tiroHeroi(obj) {
		var atingeInimigo = 0;
		obj.css("top", obj.offset().top - 20);
		if(obj.attr("atingiu") != "atingiu") testaAtritoH(obj);
		
		if(obj.offset().top > (-(obj.height()+10)))
		{
			window.setTimeout(function(){tiroHeroi(obj);}, 100);
		}
    }
	
	function tiroInimigo(obj) {
		obj.css("top", obj.offset().top + 20);
		if(obj.attr("atingiu") != "atingiu") testaAtritoI(obj)
		
		if(obj.offset().top < $(window).height())
		{
			window.setTimeout(function(){tiroInimigo(obj);}, 100);
		}
    }
	
	function testaAtritoH(obj){
		$.each($(".objeto"), function(){
			
			if(Math.abs(obj.offset().left) >= Math.abs(this.offsetLeft) && Math.abs(obj.offset().left) <= Math.abs(this.offsetWidth+this.offsetLeft)){
				if(Math.abs(obj.offset().top) >= Math.abs(this.offsetTop) && Math.abs(obj.offset().top) <= Math.abs(this.offsetHeight+this.offsetTop)){	
					pontuacao++;
					obj.attr("atingiu","atingiu");
					$("#pontuacao").empty();
					$("#pontuacao").append(pontuacao);
				}
			}
		});
	}
	
	function testaAtritoI(obj){
		$.each($(".heroi"), function(){
			
			if(Math.abs(obj.offset().left) >= Math.abs(this.offsetLeft) && Math.abs(obj.offset().left) <= Math.abs(this.offsetWidth+this.offsetLeft)){
				if(Math.abs(obj.offset().top) >= Math.abs(this.offsetTop) && Math.abs(obj.offset().top) <= Math.abs(this.offsetHeight+this.offsetTop)){	
					pontuacao--;
					obj.attr("atingiu","atingiu");
					$("#pontuacao").empty();
					$("#pontuacao").append(pontuacao);
				}
			}
		});
	}
