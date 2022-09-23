//variaveis da bolinha
let xBolinha = 400;
let yBolinha = 300;
let diametro = 15;
let raio = diametro / 2

//variaveis da velocidade da bolinha
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 250;
let comprimentoRaquete = 10;
let alturaRaquete = 100;

//variaveis raquete do oponente
let xRaqueteOponente = 785;
let yRaqueteOponente = 250;
let velocidadeYOponente;

let colidiu = false

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//chance do oponente errar
let chanceDeErrar = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("glug.mp3");
}


function setup() {
  createCanvas(800, 600);
  //.play o som toca uma vez só. .loop o som fica se repetino
  trilha.loop();
}

//draw funciona como um loop, que fica repetindo o codigo 
function draw() {
  background(0); //desenha o background(fundo)
  mostraBolinha();//desenha a bolinha
  movimentaBolinha();//movimenta a bolinha
  verificaColisaoBorda();//verifica a colisao da bolinha
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  VerificaColisaoRaquete(xRaquete, yRaquete);//(solucao de outra pessoa, (peguei no Github))
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  VerificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
  
  
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || 
      xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

//nao e necessario criar outra funcao, posso chamar na funcao mostra raquete, como mostrado a cima 
/*
function mostraRaqueteOponente(){
  rect(xRaqueteOponente, yRaqueteOponente, comprimentoRaquete, alturaRaquete);
}
*/

//quanto menor o Y mais para cima o objeto vai 
function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + comprimentoRaquete && 
      yBolinha - raio < yRaquete + alturaRaquete &&
      yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function VerificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
  
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos){
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if(chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
  }
}

function incluirPlacar(){
  //adicionei css no codigo
  textAlign(CENTER);//alinhando texto no centro(CENTER)
  textSize(20);//tamanho da fonte
  fill(color(255,140,0));
  rect(250, 10, 40, 20);//adicionando uma "caixinha" em sob o texto 
  fill(255);//adicionando cor branca
  text(meusPontos, 270, 26);
  fill(color(255,140,0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 795){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 8){
    pontosOponente += 1;
    ponto.play();
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 6){
    xBolinha = 13
    }
}













