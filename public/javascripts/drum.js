let hh, k, s, hPhrase, hPat, drums, scorep, arrOfSin, mic;

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}



function setup() {
  // CANVAS 
  cnv = createCanvas(700, 700)
  playBtn = createButton("play", keyPressed())
  cnv.mousePressed(addIns)


  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();



  // LOADING SOUNDS
  hh = loadSound('/samples/hh.wav', () => {
    drums.loop()
  })
  k = loadSound('/samples/k.wav', () => {
    drums.loop()
  })
  s = loadSound('/samples/s.wav', () => {
    drums.loop()
  })
  o1 = loadSound('/samples/o1.wav', () => {
    drums.loop()
  })
  o2 = loadSound('/samples/o2.wav', () => {
    drums.loop()
  })
  o3 = loadSound('/samples/o3.wav', () => {
    drums.loop()
  })
  o4 = loadSound('/samples/o4.wav', () => {
    drums.loop()
  })
  o5 = loadSound('/samples/o5.wav', () => {
    drums.loop()
  })
  o6 = loadSound('/samples/o6.wav', () => {
    drums.loop()
  })

  // PATTERNS

  hPat = [1, 0, 1, 0]
  kPat = [1, 0, 1, 0]
  sPat = [0, 1, 0, 0]
  o1Pat = [0, 0, 0, 0]
  o2Pat = [0, 0, 0, 0]
  o3Pat = [0, 0, 0, 0]
  o4Pat = [0, 0, 0, 0]
  o5Pat = [0, 0, 0, 0]
  o6Pat = [0, 0, 0, 0]

  arrOfSin = [o1Pat, o2Pat, o3Pat, o4Pat, o5Pat, o6Pat]

  // PHRASES
  hPhrase = new p5.Phrase('hh', (time) => {
    hh.play(time)
  }, hPat)
  kPhrase = new p5.Phrase('k', (time) => {
    k.play(time)
  }, kPat)
  sPhrase = new p5.Phrase('s', (time) => {
    s.play(time)
  }, sPat)
  o1Phrase = new p5.Phrase('o1', (time) => {
    o1.play(time)
  }, o1Pat)
  o2Phrase = new p5.Phrase('o2', (time) => {
    o2.play(time)
  }, o2Pat)
  o3Phrase = new p5.Phrase('o3', (time) => {
    o3.play(time)
  }, o3Pat)
  o4Phrase = new p5.Phrase('o4', (time) => {
    o4.play(time)
  }, o4Pat)
  o5Phrase = new p5.Phrase('o5', (time) => {
    o5.play(time)
  }, o5Pat)
  o6Phrase = new p5.Phrase('o6', (time) => {
    o6.play(time)
  }, o6Pat)

  // ADDING PHRASES
  drums = new p5.Part()
  drums.addPhrase(hPhrase)
  drums.addPhrase(sPhrase)
  drums.addPhrase(kPhrase)
  drums.addPhrase(o1Phrase)
  drums.addPhrase(o2Phrase)
  drums.addPhrase(o3Phrase)
  drums.addPhrase(o4Phrase)
  drums.addPhrase(o5Phrase)
  drums.addPhrase(o6Phrase)

  // SET BPM
  bpmCtr = createSlider(30, 140, 60, 1)
  bpmCtr.position(10, 20)
  bpmCtr.input(() => {
    drums.setBPM(bpmCtr.value())
  })
  drums.setBPM('60')


}



let x = 0.2

// function draw() {
//   background(220, 3);
//   for (let i = 0; i < hPat.length; i++) {
//     if (hPat[i] === 1) {
//       ellipse(i + 1 + x, i + 2 + x, 10, 10)
//       x += 0.2
//     }
//   }
//   kPat.forEach(kick => {
//     fill(0)
//     ellipse(random(width), random(height), 3, 3)
//   });

// }
let perDist = [0,0,0,0,0,1]
function addIns() {
  let chosen = random(arrOfSin)
   i = floor(random(perDist))
  let ranC = random(255) 
  
  if (mouseX < width / 2 && mouseY < height / 2) { // Left - Up -- Hh
    fill(123,12,234)
    ellipse(mouseX,mouseY,ranC,ranC)
    hPat.push(i)
    console.log(`h added ${hPat}`);
  } else if (mouseX > width / 2 && mouseY < height / 2) { // Right - Up -- Kick
    fill(23,212,134)
    ellipse(mouseX,mouseY,ranC,ranC)
    kPat.push(i)
    console.log(`k added ${kPat}`);
  } else if (mouseX < width / 2 && mouseY > height / 2) { // Left - Down - Snare
    fill(223,12,134)
    ellipse(mouseX,mouseY,ranC,ranC)
    sPat.push(i)
    console.log(`s added ${sPat}`);
  } else if (mouseX > width / 2 && mouseY > height / 2) {// right - Down - synths
    fill(223,222,34)
    ellipse(mouseX,mouseY,ranC,ranC)
    chosen.push(i)
    console.log(`sint added ${chosen}`);
  }
}

function keyPressed() {
  if (key === " ") {
    if (hh.isLoaded() && k.isLoaded() && s.isLoaded()) {
      if (!drums.isPlaying) {
        drums.loop()
      } else {
        drums.pause()
      }
    }
  } else {
    console.log("be patient");
  }
}






let noiseScale = 0.02;

function draw() {

  frameRate(17);
  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel() * 4;
  fill(0);
  noStroke();
  smooth()
  // Draw an ellipse with height based on volume
  let h = map(vol, 0, 1, random(1233), 0);
  ellipse((width / 1.2) * vol, h - 25, vol * 400, vol * 400);
  drawPointy(100);
  drawPointy(10);
   drawArc();
  background(vol * 30, 7);

  function drawPointy(weigh) {
    stroke(vol * 200);
    smooth()
    strokeWeight(random(weigh));
    point(random(height * 1.6), random(width * 1.6));
  }

  function drawArc() {
    arc(random(2000), random(2000), vol * 200, vol * 444, vol * 444, HALF_PI);
    fill(random());
    noStroke();
    arc(random(vol * 2000), random(400), vol * 444, vol * 444, HALF_PI, PI);
    arc(vol * 4400, random(300), 700, 70, PI, PI + QUARTER_PI);
    arc(vol * 444, vol * 444, vol * 444, vol * 444, PI + QUARTER_PI, TWO_PI);
  }
}