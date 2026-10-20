let paletteCorpo;
let paletteLinee;
let paletteFoglie;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  // per le palette creo degli Array
  paletteCorpo = [         
    color(255,69,0), 
    color(255,140,0), 
    color(255,165,0),  
    color(255,127,80),   
    color(210,105,30), 
    color(244,164,96)  
  ];

  paletteLinee = [
    color(255,255,224), 
    color(255,228,196), 
    color(240,230,140)  
  ];

  paletteFoglie = [
    color(0,100,0), 
    color(0,128,0), 
    color(50,205,50),
    color(154,205,50)     
  ];

  background(139,69,19);

  // creo la griglia per i glifi
  let numeroGlifi = 25;
  let numeroColonne = ceil(sqrt(numeroGlifi));
  let numeroRighe = ceil(sqrt(numeroGlifi));
  let dimensioneColonna = windowWidth / numeroColonne;
  let dimensioneRiga = windowHeight / numeroRighe;

  let xCorrente = 0;
  let yCorrente = 0;

  angleMode(DEGREES);

  // ciclo che si ripete per ogni carota, che ne sceglie colori, rotazione e dimensione casuali
  for (let g = 0; g < numeroGlifi; g++) {
    let coloreSceltoCorpo = random(paletteCorpo);
    let coloreSceltoLinee = random(paletteLinee);
    let coloreSceltoFoglie = random(paletteFoglie);
    let rotazioneCasuale = random(360); 

    // dimensione variabile per ogni carota (tra il 30% e l'80% della cella)
    let dimensioneCasuale = random(dimensioneRiga * 0.3, dimensioneRiga * 0.8);

    push();
    // sposta l'origine del disegno al centro della cella della griglia
    translate(xCorrente + dimensioneColonna / 2, yCorrente + dimensioneRiga / 2);
    disegnaCarota(0, 0, dimensioneCasuale, rotazioneCasuale, coloreSceltoCorpo, coloreSceltoLinee, coloreSceltoFoglie);
    pop();

    // il disegno successivo sarà spostato a destra della larghezza di una colonna
    // se arriva alla fine dello schermo, azzera la coordinata Xce scende alla riga successiva aumentando la Y
    xCorrente += dimensioneColonna;
    if (xCorrente >= windowWidth) {
      xCorrente = 0;
      yCorrente += dimensioneRiga;
    }
  }
}


function draw() {
}


function disegnaCarota(_x, _y, _size, _rot, _colCorpo, _colLinee, _colFoglie) {
  push();
  translate(_x, _y);
  rotate(_rot); // rotazione casuale

  noStroke();

  // foglie
  fill(_colFoglie);
  push();
  translate(0, -_size * 0.35);
  rotate(70);
  ellipse(0, 0, _size * 0.8, _size * 0.08);
  rotate(45);
  ellipse(0, 0, _size * 0.8, _size * 0.07);
  rotate(-70);
  ellipse(0, 0, _size * 0.7, _size * 0.07);
  pop();

  // triangolo
  fill(_colCorpo);
  triangle(-_size * 0.35, -_size * 0.35, _size * 0.35, -_size * 0.35, 0, _size * 0.5);

  // linee sulla carota
  fill(_colLinee);
  ellipse(-_size * 0.08, -_size * 0.25, _size * 0.4, _size * 0.03);
  ellipse(_size * 0.05, -_size * 0.15, _size * 0.4, _size * 0.03);
  ellipse(0, 0, _size * 0.3, _size * 0.03);
  ellipse(-_size * 0.05, _size * 0.15, _size * 0.15, _size * 0.03);
  ellipse(_size * 0.09, _size * 0.15, _size * 0.06, _size * 0.03);
  ellipse(0, _size * 0.28, _size * 0.1, _size * 0.03);

  pop();
}