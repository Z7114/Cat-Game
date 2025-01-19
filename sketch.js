
// visuals
let catPoses = [];
let display;
let pose = 2;

// movement
let video;
let handPose;
let hands = []; // keeps track of the poses detected
let connections;
let screen;


// audio
let mic;



function preload() {
  // loading illustrations
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

  display = loadImage('assets/Main Screen.png');

  // load the hand pose model
  handPose = ml5.handPose();


}

function mousePressed() {
  console.log(hands);
}


function setup() {
  // uploading game screen
  createCanvas(750, 750);
  image(display, 0, 0, 750, 750);
  screen = createGraphics(640, 480);

  // create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // start detecting hands from webcam
  handPose.detectStart(video, gotHands);

  // get the skeletal connections
  connections = handPose.getConnections();

  // set up mic
  mic = new p5.AudioIn();
  mic.start();
  getAudioContext().suspend();


}


function draw() {
  image(display, 0, 0, 750, 750);

  // if (pose >= 0) {
  //   image(catPoses[pose], 170, 250, 400, 400);
  // }

  for (let i = 0; i < hands.length; i ++) {
    let hand = hands[i];
  // defining individual points
  let index = hand.index_finger_tip;
  let thumb = hand.thumb_tip;

  // getting distance between points
  let d = dist(index.x, index.y, thumb.x, thumb.y);
  // condition for drawing to display based on keypoint distance
  if (d < 30) {
    image(catPoses[6], 130, 250, 500, 500);
  }
}
}


// function mousePressed() {
//   mic.start();
//   getAudioContext().resume();
// }


// function cat() {
//   let vol = mic.getLevel(); // get audio data from mic
//   if (vol > 0.5) {
//     image(catPoses[9], 130, 250, 500, 500);
//     // console.log("Too loud");

//    }
// }

function keyTyped() {
  if (keyCode === 32) {
    pose = 0;
  }  
}

// callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}