<template>
  <div class="gamecontainer">
    <canvas id="gamecanvas" width="500" height="500"/>
    <br/><br/>
    <div class="grid-container">
      <div class="column" style="margin-top: 20px;">
        <vue-slider ref="slider" v-model="value"/>
      </div>
      <div class="narrow-column">
        <button @click="runSimulation" class="runbutton">
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
var loopCount=0;

export default {
  name: 'GameCanvas',
  components: {
    vueSlider
  },

  data: function() {
    return {
      value: 1
    };
  },

  methods: {
    runSimulation: function () {
      loopCount = 50;
      gameInterval = setInterval(function() { runloop(false); },100);
    }
  },

  mounted: function() {
    gameEngine.reset();
    runloop(true);
  }
}

function runloop(init) {
    //
    gameEngine.runSimulationLoop();
    canvasTools.drawGameArea( gameEngine.getFuel(), gameEngine.getSpeed(), gameEngine.getThrust() );
    canvasTools.drawLander(250, 150-gameEngine.getHeight() ,gameEngine.getThrust());

    if(init) {
      return;
    }

    //
    loopCount--;
    if(loopCount<=0) {
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
