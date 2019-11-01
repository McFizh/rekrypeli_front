var fuel, speed, thrust, height, crashed;

function reset() {
  fuel=100;
  speed=0;
  thrust=0;
  height=4000;
  crashed=false;
}

function getFuel() { return fuel; }
function getThrust() { return thrust; }
function getSpeed() { return speed; }
function getHeight() { return height/10; }
function getCrashed() { return crashed; }

function executeCode(code, fuel, speed, height) {
  'use strict';

  var newcode='('+code+')('+fuel+','+speed+','+height+')';
  var coderes = 0;

  try {
    coderes = parseInt(eval(newcode));
  } catch(err) {
    return -1;
  }

  if( isNaN(coderes) || coderes <0 || coderes>4 || fuel <= 0 ) {
    return 0;
  }

  return coderes;
}

function runSimulationLoop(usercode) {

  thrust = executeCode(usercode, fuel, speed, height);

  // Something went wrong with parsing code
  if(thrust==-1) {
    thrust = 0;
    return -2;
  }

  //
  if(thrust==1) {
    speed+=2;
  } else if(thrust==2) {
    speed+=1;
  } else if(thrust==3) {
    speed+=0;
  } else if(thrust==4) {
    speed-=1;
  } else {
    // Thrust = 0 or value not in allowed range.
    // Although latter should not happen (tm)
    thrust = 0;
    speed+=4;
  }

  if(speed > 300) {
    speed = 300;
  }

  //
  fuel-=thrust;

  if(fuel<0) {
    fuel=0;
  }

  height-=speed;

  if(height <= 0 ) {

    height=0;
    thrust=0;

    if(speed > 90) {
      // Lander crashed
      crashed = true;
      return -1;
    } else {
      // Safe landing
      return 1;
    }
  }

  // Lander simulation still running
  return 0;
}

export default {
  reset: reset,
  getFuel: getFuel,
  getThrust: getThrust,
  getSpeed: getSpeed,
  getHeight: getHeight,
  getCrashed: getCrashed,
  runSimulationLoop: runSimulationLoop
};