JogoHTML
========

Uma pequena tentativa de fazer um joguinho com javascrit, utilizando jquery, usando os métodos mais simples deste.


Atualização[27 - 09 - 2013]

<h3>Mudança no escopo do projeto</h3>
<br />
Agora, o código está inserido em um plugin de jquery.
Pretenção de que venham mais tipos de jogos, como aventura, rpg, etc...
Conta agora com opções:
<br />
type: <strong>texto</strong> ->determina o tipo de jogo. <strong>(default naves)</strong>
<br />
enemy: customização do inimigo.(ainda poucas opções, mas serão feitas mais no futuro)<br />
&nbsp;&nbsp;&nbsp;-> hasEnemy: <strong>true/false</strong> se o jogo conta com inimigo na tela (para fins de testes)<strong>(default true)</strong><br />
hero: customização do herói.(ainda poucas opções, mas serão feitas mais no futuro)<br />
&nbsp;&nbsp;&nbsp;-> width:<strong>texto(px,%,etc...)</strong> determina a largura do herói<strong>(default "10%")</strong><br />
&nbsp;&nbsp;&nbsp;-> height:<strong>texto(px,%,etc...)</strong>  determina a altura do herói<strong>(default false)</strong><strong>(default "10%")</strong><br />
&nbsp;&nbsp;&nbsp;-> image:<strong>true/false</strong> determina se o herói possui uma imagem que o defina<strong>(default false)</strong><br />
&nbsp;&nbsp;&nbsp;-> changeImage:<strong>texto(caminho e nome do arquivo)</strong> determina a imagem que define o herói <strong>(default "")</strong>
<br />
lifebar: <strong>true/false</strong> habilita ou desabilita lifeba para inimigo e herói<strong>(default true)</strong>
