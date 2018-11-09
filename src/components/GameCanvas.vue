<template>
  <div class="gamecontainer">
    <canvas id="gamecanvas" width="500" height="500"/>
    <br/><br/>
    <div class="grid-container">
      <div class="column">
        <timerComponent :minutes="minutes" :seconds="seconds"/>

        <button @click="abandonGame" class="quitbutton">
          <i class="fas fa-bomb" />
        </button>

      </div>
      <div class="narrow-column">
        <button @click="requestCode" class="runbutton">
          <i class="fas fa-play" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import timerComponent from "./TimerComponent.vue";

import canvasTools from "../game-engine/canvas.js";
import gameEngine from "../game-engine/game.js";

var gameInterval;
var clockInterval;
var startingTime;

export default {
  name: 'GameCanvas',

  components: {
    timerComponent
  },

  props: [ 'bus' ],


  data: function() {
    return {
      value: 1,
      minutes: 15,
      seconds: "00"
    };
  },

  methods: {
    requestCode: function() {
      // Remove any pending intervals
      if(gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
      }

      // Reset game engine values & initialize game area
      gameEngine.reset();
      runloop(true,"");

      // This will request the coder from CodeEditor & start the engine
      this.bus.$emit('requestcode');
    },

    runSimulation: function (code) {
      gameInterval = setInterval(function() {
        runloop(false,code);
      },100);
    },

    abandonGame: function() {

    }
  },

  mounted: function() {
    var that = this;

    // Set starting time
    startingTime = new Date();

    clockInterval = setInterval( () => {
      runClockLoop(that);
    },1000);

    // Reset game-engine
    gameEngine.reset();
    runloop(true,"");

    // Bind event
    this.bus.$on('transmitcode', (code) => this.runSimulation(code) );

  }
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function runClockLoop(that) {
    var timeSpent = Math.floor( (new Date() - startingTime) / 1000 );
    var timeLeft = 15*60 - timeSpent;

    that.minutes = Math.floor(timeLeft / 60);
    that.seconds = ( timeLeft % 60 ) < 10 ? "0"+( timeLeft % 60 ):( timeLeft % 60 );
}

function runloop(init, code) {
    var endState;

    // Run simulation loop
    if(!init) {
      endState = gameEngine.runSimulationLoop( code );
    }

    // Draw game area & lander
    canvasTools.drawGameArea( gameEngine.getFuel(), gameEngine.getSpeed(), gameEngine.getThrust() );
    canvasTools.drawLander(250, 400-gameEngine.getHeight() ,gameEngine.getThrust());

    if(init) {
      return;
    }

    // Has the simulation ran it's course, if yes.. check the end result
    if(endState===-1) {
      // Lander crashed
      clearInterval(gameInterval);
    } else if(endState===1) {
      // Lander safe
      clearInterval(gameInterval);
    } else if(endState==-2) {
      // Syntax error in code
      clearInterval(gameInterval);
      this.$emit('syntaxerror');
    }
}
</script>

<style scoped>
.gamecontainer {
    background-color: #000;
    border: 1px solid #bdbdbd;
    position: relative;
    height: 500px; width: 500px;
    margin: 0px 15px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
}

.runbutton {
  font-size: 2em;
  border: 1px solid black;
  border-radius: 5px;
}

.quitbutton {
  font-size: 2em;
  border: 1px solid black;
  border-radius: 5px;
  margin-left: 20px;
  vertical-align: top;
}

button i {
  margin: 5px;
}
</style>
