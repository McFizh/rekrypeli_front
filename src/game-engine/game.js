var fuel=500,
    speed=0,
    thrust=0,
    height;

function reset() {
    fuel=100;
    speed=0;
    thrust=0;
    height=4000;
}

function getFuel() { return fuel; }
function getThrust() { return thrust; }
function getSpeed() { return speed; }
function getHeight() { return height/10; }

function executeCode(code, fuel, speed, height) {
    "use strict";

    let newcode="("+code+")("+fuel+","+speed+","+height+")";
    var thrust = parseInt(eval(newcode));

    if( isNaN(thrust) || thrust <0 || thrust>4 ) {
        return 0;
    }

    return thrust;
}

function runSimulationLoop(usercode) {

    thrust = executeCode(usercode, fuel, speed, height);
    if(fuel <= 0 ) {
        thrust = 0;
    }

    //
    if(thrust==0) {
        speed+=4;
    } else if(thrust==1) {
        speed+=2;
    } else if(thrust==2) {
        speed+=1;
    } else if(thrust==3) {
        speed+=0;
    } else if(thrust==4) {
        speed-=1;
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
    runSimulationLoop: runSimulationLoop
};