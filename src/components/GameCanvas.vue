<template>
  <div class="gamecontainer">
    <canvas id="gamecanvas" width="500" height="500"/>
    <br/><br/>
    <div class="grid-container">
      <div class="column">
        <timerComponent :minutes="minutes" :seconds="seconds"/>
      </div>
      <div class="column">
        <button @click="$emit('quitclicked')" class="quitbutton">
          <i class="fas fa-bomb" />
        </button>

      </div>
      <div class="column">
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
var latestCode;

var crashCounter;

export default {
  name: 'GameCanvas',

  components: {
    timerComponent
  },

  props: [ 'bus' ],


  data: function() {
    return {
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

      // Remove syntax error line (if any)
      this.$emit('syntaxerror',false);

      // Reset game engine values & initialize game area
      gameEngine.reset();
      runloop(null,"");

      // This will request the coder from CodeEditor & start the engine
      this.bus.$emit('requestcode');
    }

  },

  mounted: function() {
    var that = this;

    // Set starting time
    startingTime = new Date();
    latestCode = "-not changed-";
    crashCounter = 10;

    clockInterval = setInterval( () => {
      runClockLoop(that);
    },1000);

    // Reset game-engine
    gameEngine.reset();
    runloop(null,"");

    // Bind event
    this.bus.$on('transmitcode', (code) => {
      var that=this;

      latestCode = code;

      gameInterval = setInterval(function() {
        runloop(that,code);
      },100);

    });

    // Return latest code & time spent
    this.bus.$on('datareq', ()=> {
      this.bus.$emit('dataresp', {
        code: latestCode,
        time: Math.floor( (new Date() - startingTime) / 1000 )
      })
    });
  },

  beforeDestroy: function() {
        if(gameInterval) { clearInterval(gameInterval); }
        if(clockInterval) { clearInterval(clockInterval); }
        this.bus.$off('transmitcode');
        this.bus.$off('datareq');
  }
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function runClockLoop(that) {
    var timeSpent = Math.floor( (new Date() - startingTime) / 1000 );

    // 15 x 60s => 900s
    var timeLeft = 900 - timeSpent;

    if(timeLeft<0) {
      timeLeft = 0;
      clearInterval(clockInterval);
      clearInterval(gameInterval);
      that.bus.$emit('gameover','timeout');
    }

    that.minutes = Math.floor(timeLeft / 60);
    that.seconds = ( timeLeft % 60 ) < 10 ? "0"+( timeLeft % 60 ):( timeLeft % 60 );
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function runloop(that, code) {
    var endState=null;

    // Run simulation loop
    if(that) {
      if(gameEngine.getCrashed()) {
        crashCounter--;
        if(crashCounter<=0) {
          clearInterval(gameInterval);
        }
      } else {
        endState = gameEngine.runSimulationLoop( code );
      }
    }

    // Draw game area & lander
    canvasTools.drawGameArea( gameEngine.getFuel(), gameEngine.getSpeed(), gameEngine.getThrust() );
    if( gameEngine.getCrashed() ) {
      if(crashCounter>0) {
        canvasTools.drawExplosion(250, 410-gameEngine.getHeight());
      }
    } else {
      canvasTools.drawLander(250, 400-gameEngine.getHeight() ,gameEngine.getThrust());
    }

    // Only on init 'that' is null
    if(that==null || (endState===null && gameEngine.getCrashed()) ) {
      return;
    }

    // Has the simulation ran it's course, if yes.. check the end result
    if(endState===-1) {
      // Lander crashed
      crashCounter = 10;
    } else if(endState===1) {
      // Lander safe
      that.bus.$emit('gameover','winner',{});
    } else if(endState==-2) {
      // Syntax error in code
      clearInterval(gameInterval);
      that.$emit('syntaxerror',true);
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
