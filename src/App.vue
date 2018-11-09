<template>
  <div id="app">


    <div v-if="gameIsRunning" class="grid-container">
      <div class="narrow-column">
        <GameCanvas :bus="bus"
            @syntaxerror="showErrorLine"
            @quitclicked="showGiveupDialog" />
      </div>
      <div class="column">
        <CodeEditor name="editor" ref="editor" :bus="bus"/>
      </div>
    </div>

    <div v-if="codeFailed" class="grid-container">
        <div class="column content-box error-box">
            Something went wrong while parsing your code
            <span style='font-size: 200%; margin-left: 20px; vertical-align: middle;'>&#x1F92D;</span>

        </div>
    </div>

    <StartModal @start="startGame" />
    <EndModal />
    <GiveupModal
        @resume="resumeGame"
        @giveup="giveupGame"/>
  </div>
</template>

<script>
import Vue from 'vue';

// Import components
import CodeEditor from './components/CodeEditor.vue';
import GameCanvas from './components/GameCanvas.vue';

// Import modals
import StartModal from './components/StartModal.vue';
import EndModal from './components/EndModal.vue';
import GiveupModal from './components/GiveupModal.vue';

// Import css
require('@/assets/css/main.css');

//
export default {
  name: 'app',

  components: {
    CodeEditor, GameCanvas,
    StartModal, EndModal, GiveupModal
  },

  data: function() {
    return {
      bus: new Vue(),
      gameIsRunning: false,
      codeFailed: false
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
    },

    showErrorLine: function(arg1) {
        this.codeFailed = arg1;
    },

    showGiveupDialog: function() {
        this.$modal.show('giveupmodal');
    },

    resumeGame: function() {
        this.$modal.hide('giveupmodal');
    },

    giveupGame: function() {
        this.$modal.hide('giveupmodal');
    }

  },

  mounted: function() {
      this.$modal.show('startmodal');
  }


}
</script>