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
    <EndModal :endreason="endreason"
        @sendanswers="sendAnswers"
        @skipsending="backtostart" />
    <GiveupModal
        @resume="resumeGame"
        @giveup="giveupGame"/>
  </div>
</template>

<script>
import Vue from 'vue';
import Axios from 'axios';

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
var latestCode;
var timeSpent;

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
      codeFailed: false,
      endreason: ""
    }
  },

  methods: {

    showEndScreen: function(gameState) {
        // Show end modal, which contains gamestate and signup form
        // gameStates: 1 = winner , -1 = timeout , -2 = game canceled
        this.$modal.hide('giveupmodal');

        // Fetch code & time
        this.bus.$emit('datareq');

        //
        this.gameIsRunning = false;
        this.endreason = gameState;

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

    // Give up modal .. resume button
    resumeGame: function() {
        this.$modal.hide('giveupmodal');
    },

    // Give up modal .. give up button
    giveupGame: function() {
        this.showEndScreen('giveup');
    },

    // endDialog
    sendAnswers: function(data) {
        // Fill in extra data
        data.code = latestCode;
        data.time = timeSpent;

        // Send ajax req
        Axios.post('/api/scores', data);

        // Back to start
        this.backtostart();
    },

    backtostart: function() {
        this.$modal.hide('endmodal');
        this.$modal.show('startmodal');
        latestCode = "";
        timeSpent = 0;
        this.codeFailed = false;
    }

  },

  mounted: function() {
      this.bus.$on('gameover', (reason) => this.showEndScreen(reason) );
      this.bus.$on('dataresp', (data) => {
          latestCode = data.code;
          timeSpent = data.time;
      });

      this.$modal.show('startmodal');
  }


}
</script>
