(function ( $ ) {
	var cima = $(window).height()-100;
	var lado = $(window).width()/2;
	var pontuacao = 0;
	var n = 0;
	var timer;
	var paused = false;
	
    $.fn.game = function(options) {
		var settings = $.extend({
            // opcoes basicas.
            type: "naves",
			enemy:{hasEnemy:true},
			hero:{width:"10%",height:"10%",image:false,changeImage:""},
			lifebar:true
        }, options );
		
		//funcao para permitir pausar e continuar o jogo
		function Timer(callback, delay) {
			var timerId, start, remaining = delay;

			this.pause = function() {
				window.clearTimeout(timerId);
				remaining -= new Date() - start;
			};

			this.resume = function() {
				start = new Date();
				timerId = window.setTimeout(callback, remaining);
			};

			this.resume();
		}
		
		
		function moveInimigoEsq(obj) { obj.css("left", obj.offset().left - 10);if(obj.offset().left <= 0) obj.attr("move","direita");}
		function moveInimigoDir(obj) {obj.css("left", obj.offset().left + 10);if(obj.offset().left >= ($(window).width() - obj.width())) obj.attr("move","esquerda");}
		function movimentoNaveInimigo(obj){
			if(obj.attr("move") == "esquerda") moveInimigoEsq(obj);
			if(obj.attr("move") == "direita") moveInimigoDir(obj);
			if(n % 11 == 0){
				$('body').append("<hr id=\"tiroInimigo"+n+"\" class=\"tiro\" size=\"30\"  width=\"1\">");
				$("#tiroInimigo"+n+"").css("left", $("#inimigo").offset().left + 50);
				$("#tiroInimigo"+n+"").css("top", $("#inimigo").offset().top + 5);
				tiroInimigo($("#tiroInimigo"+n+""));	
			}
			n++;
			timer = new Timer(function(){movimentoNaveInimigo(obj);}, 80);
		}
		function tiroInimigo(obj) {
			obj.css("top", obj.offset().top + 1); 
			testaAtritoI(obj);
			if(obj.offset().top < $(window).height())
				window.setTimeout(function(){tiroInimigo(obj);}, 20);
			else
				obj.remove();
		}
		function testaAtritoI(obj){
			$.each($(".heroi"), function(){
				
				if(Math.abs(obj.offset().left) >= Math.abs(this.offsetLeft) && Math.abs(obj.offset().left) <= Math.abs(this.offsetWidth+this.offsetLeft)){
					if(Math.abs(obj.offset().top) >= Math.abs(this.offsetTop) && Math.abs(obj.offset().top) <= Math.abs(this.offsetHeight+this.offsetTop)){	
						pontuacao--;obj.remove();$("#pontuacao").empty();$("#pontuacao").append(pontuacao);
						if($("#lifebarH").length){
							$("#lifebarH").css("width",$("#lifebarH").width()-10);
							if($("#lifebarH").width() <= 0) alert("GAME OVER!");
						}
					}
				}
			});
		}
		function movimentaHeroiDireita(obj,n)
		{
			right = obj.offset().left + n;
			if(right > ($(window).width() - obj.width())) right = $(window).width() - obj.width();
			if(right <= ($(window).width() - obj.width())) obj.css("left", right);
			obj.css("left", right);
			n++;
			if(n < 5)
				window.setTimeout(function(){movimentaHeroiDireita(obj,n);}, 100);			
		}
		function movimentaHeroiEsquerda(obj,n)
		{
			left = obj.offset().left - n;
			if(left < 0) left = 0
			if(left >= 0) obj.css("left", left);
			n++;
			if(n < 5)
				window.setTimeout(function(){movimentaHeroiEsquerda(obj,n);}, 100);
		}
		function testaAtritoH(obj){
			$.each($(".inimigo"), function(){
				if(Math.abs(obj.offset().left) >= Math.abs(this.offsetLeft) && Math.abs(obj.offset().left) <= Math.abs(this.offsetWidth+this.offsetLeft)){
					if(Math.abs(obj.offset().top) >= Math.abs(this.offsetTop) && Math.abs(obj.offset().top) <= Math.abs(this.offsetHeight+this.offsetTop)){	
						pontuacao++;$("#pontuacao").empty();obj.remove();$("#pontuacao").append(pontuacao);
						if($("#lifebarI").length){
							$("#lifebarI").css("width",$("#lifebarI").width()-10);
							if($("#lifebarI").width() <= 0) alert("Você venceu!");
						}
					}
				}
			});
		}
		function tiroHeroi(obj) {
			obj.css("top", obj.offset().top - 9);
			testaAtritoH(obj);
			if(obj.offset().top > (-(obj.height()+10)))
				window.setTimeout(function(){tiroHeroi(obj);}, 1);
			else
				obj.remove();
		}
		
		//representa todas as funcoes do usuario/heroi
		function funcoesHeroi(obj){
			if(!paused){
				document.onkeydown = function(evt) {
					evt = evt || window.event;
					switch(evt.keyCode){
						case 37:
							var a = 1
							movimentaHeroiEsquerda(obj,a)
							break;
						case 39:
							var a = 1
							movimentaHeroiDireita(obj,a)
							break;
						case 32:
							$('body').append("<hr id=\"tiro"+n+"\" class=\"tiro\" size=\"30\"  width=\"1\">");
							$("#tiro"+n+"").css("left", obj.offset().left + (obj.width()/2));
							$("#tiro"+n+"").css("top", obj.offset().top);
							tiroHeroi($("#tiro"+n+""));
							n++;
							break;
						case 13:
							if(paused){
								timer.resume();
								paused = false;
							}else{
								timer.pause();
								paused = true;
							}
							break;
					}
				}
			}
		}
		
		//inicializa os jogos
		this.initGame = function (settings){
			switch(settings.type){
				case "naves":
					$('body').css({ overflow: "hidden" });
					$("body").append("<div style=\"border:1px solid purple;\" class=\"barra\" id=\"barra\" ></div>");
					$("#barra").append("Pontuacao:<br />");
					$("#barra").append("<span id=\"pontuacao\">0</span>");
					$("#barra").css({ left: 0, top: cima, position:"absolute", width: "100%", height:100 });
					if(settings.lifebar){
						$("#barra").append("<div style=\"background-color:green;\" class=\"status\" id=\"lifebarH\" ></div>");
						$("#lifebarH").css({ position:"absolute", width: $(window).width()/2, height: "50px" });
						$("#barra").append("<div style=\"background-color:red;\" class=\"status\" id=\"lifebarI\" ></div>");
						$("#lifebarI").css({ left: $(window).width()/2, position:"absolute", width: $(window).width()/2, height: "50px" });
					}
					if(settings.hero.image)
						$("body").append("<img src=\""+ settings.hero.changeImage +"\" class=\"heroi\" id=\"heroi\"></div>");
					else
						$("body").append("<div style=\"border:1px solid red;\" class=\"heroi\" id=\"heroi\"></div>");
					$("#heroi").css({ left: lado, top: cima-$("#barra").height(), position:"absolute",width: settings.hero.width, height: settings.hero.height });
					if(settings.enemy.hasEnemy){
						$("body").append("<div style=\"border:1px solid green;\" class=\"inimigo\" id=\"inimigo\" move=\"esquerda\" ></div>");
						$("#inimigo").css({ left: $(window).width()/4, top: 2, position:"absolute", width: "10%", height: "10%" });
						movimentoNaveInimigo($("#inimigo"));
					}
					funcoesHeroi($("#heroi"));
					break;
			}
		}
        return this.initGame(settings)
    };
 
}( jQuery ));