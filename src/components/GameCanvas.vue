<template>
  <div class="gamecontainer">
    <canvas id="gamecanvas" width="500" height="500"/>
    <br/><br/>
    <div class="grid-container">
      <div class="column" style="margin-top: 20px;">
        <vue-slider ref="slider" v-model="value"/>
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
import vueSlider from 'vue-slider-component/src/vue-slider.vue';

import canvasTools from "../game-engine/canvas.js";
import gameEngine from "../game-engine/game.js";

var gameInterval;

export default {
  name: 'GameCanvas',

  components: {
    vueSlider
  },

  props: [ 'bus' ],


  data: function() {
    return {
      value: 1
    };
  },

  methods: {
    requestCode: function() {
      this.bus.$emit('requestcode');

      gameEngine.reset();
      runloop(true,"");

    },

    runSimulation: function (code) {
      gameInterval = setInterval(function() { 
        runloop(false,code);
      },100);
    }
  },

  mounted: function() {
    // Reset game-engine
    gameEngine.reset();
    runloop(true,"");

    // Bind event
    this.bus.$on('transmitcode', (code) => this.runSimulation(code) );
  }
}

function runloop(init, code) {
    var crashed = false;

    // Run simulation loop
    if(!init) {
      crashed = gameEngine.runSimulationLoop( code );
    }

    // Draw game area & lander
    canvasTools.drawGameArea( gameEngine.getFuel(), gameEngine.getSpeed(), gameEngine.getThrust() );
    canvasTools.drawLander(250, 400-gameEngine.getHeight() ,gameEngine.getThrust());

    if(init) {
      return;
    }


    // Safety counter
    if(crashed) {
      clearInterval(gameInterval);
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

.runbutton i {
  margin: 5px;
}

</style>
