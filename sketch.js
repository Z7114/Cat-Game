
let catPoses = [];
let screen;
let mic;
let pose = 0;

function preload() {
  catPoses[0] = loadImage('assets/Afraid.png');
  catPoses[1] = loadImage('assets/Attacking.png');
  catPoses[2] = loadImage('assets/Calm.png');
  catPoses[3] = loadImage('assets/Cat Loaf.png');
  catPoses[4] = loadImage('assets/Defensive.png');
  catPoses[5] = loadImage('assets/Disinterested.png');
  catPoses[6] = loadImage('assets/Friendly.png');
  catPoses[7] = loadImage('assets/Gone.png');
  catPoses[8] = loadImage('assets/Hiding.png');
  catPoses[9] = loadImage('assets/On Guard 0.png');
  catPoses[10] = loadImage('assets/On Guard L.png');
  catPoses[11] = loadImage('assets/On Guard R.png');
  catPoses[12] = loadImage('assets/Trusting.png');

  screen = loadImage('assets/Main Screen.png');


}


function setup() {
  // uploading game screen
  createCanvas(750, 750);
  image(screen, 0, 0, 750, 750);

  // set up mic
  mic = new p5.AudioIn();
  mic.start();
  getAudioContext().suspend();

}


function draw() {

  cat();

  
  // if (mouseIsPressed) {
  //   image(catPoses[2], 100, 100, 500, 500);
  // }
}


function mousePressed() {
  mic.start();
  getAudioContext().resume();
}


function cat() {
  let vol = mic.getLevel(); // get audio data from mic

  if (vol > 0.5) {
    image(catPoses[9], 130, 250, 500, 500);
    console.log("Too loud");
   } else {
    
   }
}