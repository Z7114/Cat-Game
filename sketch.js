
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

// arduino
let port;
let connectBtn;

let selectedPose = 0;



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

  // // set up mic
  // mic = new p5.AudioIn();
  // mic.start();
  // getAudioContext().suspend();

  // set up arduino connection
  // port = createSerial();

  // connectBtn = createButton('Connect to Arduino');
  // connectBtn.position(20, 760);
  // connectBtn.mousePressed(connectBtnClick);

}


function draw() {
  image(display, 0, 0, 750, 750);

  // // read port data
  // let val = port.readUntil("\n");
  // console.log(val);

  // if (pose >= 0) {
  //   image(catPoses[pose], 170, 250, 400, 400);
  // }

  for (let i = 0; i < hands.length; i ++) {
    let hand = hands[i];
  // defining individual points
  let index = hand.index_finger_tip;
  let thumb = hand.thumb_tip;
  let middle = hand.middle_finger_tip;
  let ring = hand.ring_finger_tip;
  let pinky = hand.pinky_finger_tip;
  let wrist = hand.wrist;

  // getting distance between points
  let d = dist(index.x, index.y, thumb.x, thumb.y);
  let z = dist(middle.x, middle.y, thumb.x, thumb.y);
  let fist = dist(middle.x, middle.y, wrist.x, wrist.y);
  // console.log(wrist.x, wrist.y);

  // console.log(d, z);
  // Store selected image

  // condition for drawing to display based on keypoint distance
    if (d < 20 && z > 20) {
    // image(catPoses[2], 170, 250, 400, 400);
    selectedPose = 2;
    }
  
    if (z < 20 && d > 20) {
    // image(catPoses[4], 170, 250, 400, 400);
    selectedPose = 4;
    }

    if (fist < 10 && d > 20) {
      selectedPose = 1;
    }

  image(catPoses[selectedPose], 170, 250, 400, 400)


}

// if (val >= 400) {
//   image(catPoses[0], 170, 280, 400, 400);
//   }
}


// function mousePressed() {
//   mic.start();
//   getAudioContext().resume();
// }


// function noise() {
//   let vol = mic.getLevel(); // get audio data from mic
//   if (vol > 0.5) {
//     image(catPoses[9], 130, 250, 500, 500);
//     // console.log("Too loud");

//    }
// }


// callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

// connect arduino button
function connectBtnClick() {
  console.log("button is working");

  if (!port.opened()) {
    port.open("Arduino", 9600);
  } else {
    port.close();
  }
}

