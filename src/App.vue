<template>
  <div id="app">


    <div v-if="gameIsRunning" class="grid-container">
      <div class="narrow-column">
        <GameCanvas :bus="bus"/>
      </div>
      <div class="column">
        <CodeEditor name="editor" ref="editor" :bus="bus"/>
      </div>
    </div>

    <StartModal @start="startGame"></StartModal>
    <EndModal></EndModal>
    <modal name="giveupmodal">
    </modal>
  </div>
</template>

<script>
import Vue from 'vue';

import CodeEditor from './components/CodeEditor.vue';
import GameCanvas from './components/GameCanvas.vue';
import StartModal from './components/StartModal.vue';
import EndModal from './components/EndModal.vue';

//
export default {
  name: 'app',

  components: {
    CodeEditor, GameCanvas, StartModal, EndModal
  },

  data: function() {
    return {
      bus: new Vue(),
      gameIsRunning: false
    }
  },

  methods: {

    showEndScreen: function(gameState) {
      // Show end modal, which contains gamestate and signup form
      // gameStates: 1 = winner , -1 = timeout , -2 = game canceled

      this.$modal.show('endmodal');
    },

    startGame: function() {
        this.$modal.hide('startmodal');
        this.gameIsRunning = true;
    }

  },

  mounted: function() {
      this.$modal.show('startmodal');
  }


}
</script>

<style>
body {
  margin:0;
}

#app {
  margin: 15px;
}

.grid-container {
  width: 100%;
  display: flex;
}

.column { flex: 1; }
.narrow-column { flex: none; }

.grid-4-12 { flex: 4; }
.grid-5-12 { flex: 5; }
.grid-6-12 { flex: 6; }
.grid-7-12 { flex: 7; }
.grid-8-12 { flex: 8; }
</style>
