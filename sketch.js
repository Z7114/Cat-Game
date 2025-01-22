
// visuals
let catPoses = [];
let display;
let pose = 2;
let selectedPose = 3;

// pose detection
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
let serial;

// input states ??
let gesture;
let noise;
let light;
let touch;

// storing input data
let catState = [gesture, noise, light, touch];


function preload() {
  // loading illustrations
  catPoses[0] = loadImage('assets/Afraid.png');
  catPoses[1] = loadImage('assets/Attacking.png');
  catPoses[2] = loadImage('assets/Calm.png');
  catPoses[3] = loadImage('assets/Cat Loaf.png');
  catPoses[4] = loadImage('assets/Defensive.png');
  catPoses[5] = loadImage('assets/Friendly.png');
  catPoses[6] = loadImage('assets/Gone.png');
  catPoses[7] = loadImage('assets/Hiding.png');
  catPoses[8] = loadImage('assets/On Guard 0.png');
  catPoses[9] = loadImage('assets/Trusting.png');

  display = loadImage('assets/Main Screen.png');

  // load the hand pose model
  handPose = ml5.handPose();


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
  // getAudioContext().suspend();

  // set up arduino connection
  port = createSerial();

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 760);
  connectBtn.mousePressed(connectBtnClick);



}


function draw() {
  image(display, 0, 0, 750, 750);
  // remember to add background changes with hiding pose + low light detected

  checkCatState(); // using function to check for input states


  if (catState[0, 0, 0, 0]) {
    selectedPose = 2; // night mode
  } else if (catState[0, 0, 0, 1]) {
    selectedPose = 8; // night mode (NM)
  } else if (catState[0, 0, 1, 0]) {
    selectedPose = 8; // NM
  } else if (catState[0, 0, 1, 1]) {
    selectedPose = 1; // NM
  } else if (catState[0, 1, 0, 0]) {
    selectedPose = 0; // NM
  } else if (catState[0, 1, 0, 1]) {
    selectedPose = 7; // different background, NM
  } else if (catState[0, 1, 1, 0]) {
    selectedPose = 6; // NM
  } else if (catState[0, 1, 1, 1]) {
    selectedPose = 6; // NM
  } else if (catState[1, 0, 0, 0]) {
    selectedPose = 5; // resize image
  } else if (catState[1, 0, 0, 1]) {
    selectedPose = 0; //
  } else if (catState[1, 0, 1, 0]) {
    selectedPose = 9; //
  } else if (catState[1, 0, 1, 1]) {
    selectedPose = 1; //
  } else if (catState[1, 1, 0, 0]) {
    selectedPose = 0; //
  } else if (catState[1, 1, 0, 1]) {
    selectedPose = 4; //
  } else if (catState[1, 1, 1, 0]) {
    selectedPose = 7; // different bg
  } else if (catState[1, 1, 1, 1]) {
    selectedPose = 1; //
  }


  // draws cat
  // remeber to create if statement that check for trust cat pose (for resizing the image)
  image(catPoses[selectedPose], 170, 250, 400, 400)


  // for (let i = 0; i < hands.length; i ++) {
  //   let hand = hands[i];
  // // defining individual points
  // let index = hand.index_finger_tip;
  // let thumb = hand.thumb_tip;
  // let middle = hand.middle_finger_tip;
  // let ring = hand.ring_finger_tip;
  // let pinky = hand.pinky_finger_tip;
  // let wrist = hand.wrist;


  // // getting distance between points
  // let d = dist(index.x, index.y, thumb.x, thumb.y);
  // let z = dist(middle.x, middle.y, thumb.x, thumb.y);
  // // console.log(wrist.x, wrist.y);

  // // console.log(d, z);
  // // Store selected image

  // // condition for drawing to display based on keypoint distance
  //   if (d < 20 && z > 20) {
  //   // image(catPoses[2], 170, 250, 400, 400);
  //   selectedPose = 2;
  //   }
  
  //   if (z < 20 && d > 20) {
  //   // image(catPoses[4], 170, 250, 400, 400);
  //   selectedPose = 0;
  //   }
    

  // if (hands.length > 0) {
  //   hand = hands[0];
  //   let index = hand.index_finger_tip;
  //   let indexA = hand.index_finger_mcp;

  //   if (index.y > indexA.y) {
  //     selectedPose = 4;
  //   }
  // }

}



// callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

// function mousePressed() {
//   mic.start();
//   getAudioContext().resume();
// }


// connect arduino button
function connectBtnClick() {
  console.log("button is working");

  if (!port.opened()) {
    port.open("Arduino", 9600);
  } else {
    port.close();
  }
}

function checkCatState() {
  // checking gesture state // WORKS
  for (let i = 0; i < hands.length; i ++) {
    let hand = hands[i];
    let wrist = hand.wrist;
    // console.log(wrist.y);

  // condition for gesture state
    if (wrist.y > 300) { // checking wrist y coord for raised hand
      // arm raised = smaller number
      catState[0] = 0;
    } else {
      catState[0] = 1;
    }
  }

  // checking noise state // WORKS
  let vol = mic.getLevel(); // get audio data from mic
  if (vol < 0.5) { // checking for loud or quiet sound
    catState[1] = 0;
  } else {
    catState[1] = 1;
  }
  // console.log(vol);

  // checking light state 
  let ldrValue = port.readUntil("\n"); // read port data... until new line("\n")?
  if(ldrValue < 500) {
    catState[2] = 0;
  } else {
    catState[2] = 1;
  }
  console.log(ldrValue);

  // checking touch state
  let sensorValue = port.readUntil("\n");
  if(sensorValue == 626) {
    catState[3] = 0;
  } else {
    catState[3] = 1;
  }

}