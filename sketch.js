let numSegmentos = 5;
let direction ='right';

const xStart = 0; 
const yStart = 250;
const diff = 10;

let xCor = [];
let yCor = [];

let xComida = 0;
let yComida = 0;
let placar;

function setup() {
 placar = createDiv('Score = 0');
 placar.position(605,5);
 placar.id = 'score';
 placar.style('color', '#F7E8E8');
 //somDaTrilha.loop(); 
 
  createCanvas(700, 550);
  frameRate(15);
  stroke(0);
  strokeWeight(15);
  atualizaCoordenadasDaComida();

  for (let i = 0; i < numSegmentos; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

function draw() {
  background(80);
  for (let i = 0; i < numSegmentos - 1; i++) {
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
  }
  atualizaCoordenadasDaCobra();
  verificaStatusDoJogo();
  verificaPorComida();
}

function atualizaCoordenadasDaCobra() {
  for (let i = 0; i < numSegmentos - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];  
}
  
  switch (direction) {
    case 'right':
      xCor[numSegmentos - 1] = xCor[numSegmentos - 2] + diff;
      yCor[numSegmentos - 1] = yCor[numSegmentos - 2];
      break;
    case 'up':
      xCor[numSegmentos - 1] = xCor[numSegmentos - 2];
      yCor[numSegmentos - 1] = yCor[numSegmentos - 2] - diff;
      break;
    case 'left':
      xCor[numSegmentos - 1] = xCor[numSegmentos - 2] - diff;
      yCor[numSegmentos - 1] = yCor[numSegmentos - 2];
      break;
    case 'down':
      xCor[numSegmentos - 1] = xCor[numSegmentos - 2];
      yCor[numSegmentos - 1] = yCor[numSegmentos - 2] + diff;
      break;
  }
}

function verificaStatusDoJogo() {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    verificaColisaoDaCobra()) {
    noLoop();
    const valorPlacar = parseInt(placar.html().substring(8));
    placar.html('Game Over:  ' + valorPlacar);
  }
}

function verificaColisaoDaCobra() {
  const cabecaCobraX = xCor[xCor.length - 1];
  const cabecaCobraY = yCor[yCor.length - 1];
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === cabecaCobraX && yCor[i] === cabecaCobraY) {
      return true;
    }
  }
}

function verificaPorComida() {
  point(xComida, yComida);
  if (xCor[xCor.length - 1] === xComida && yCor[yCor.length - 1] === yComida) {
    const prevScore = parseInt(placar.html().substring(8));
    placar.html('Score = ' + (prevScore + 1));
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegmentos++;
    somDoPonto.play();
    atualizaCoordenadasDaComida();
  }
}

function atualizaCoordenadasDaComida() {
  xComida = floor(random(10, (width - 100) / 10)) * 10;
  yComida = floor(random(10, (height - 100) / 10)) * 10;
}

function keyPressed() {
  switch (keyCode) {
    case 37:
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 39:
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 38:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 40:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
}


