<template>
  <div id="app">
    <div class="grid-container">
      <div class="narrow-column">
        <GameCanvas/>
      </div>
      <div class="column">
        <CodeEditor name="editor2"/>
      </div>
    </div>
  </div>
</template>

<script>
import CodeEditor from './components/CodeEditor.vue';
import GameCanvas from './components/GameCanvas.vue';

export default {
  name: 'app',
  components: {
    CodeEditor, GameCanvas
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
