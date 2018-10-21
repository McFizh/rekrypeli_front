var fuel=500,
    speed=0,
    thrust=0,
    height=100;

function reset() {
    fuel=500;
    speed=0;
    thrust=0;
    height=1000;
}

function getFuel() { return fuel; }
function getThrust() { return thrust; }
function getSpeed() { return speed; }
function getHeight() { return height/10; }

function runSimulationLoop() {

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

    //
    fuel-=thrust;
    height-=speed;
}

export default {
    reset: reset,
    getFuel: getFuel,
    getThrust: getThrust,
    getSpeed: getSpeed,
    getHeight: getHeight,
    runSimulationLoop: runSimulationLoop
};