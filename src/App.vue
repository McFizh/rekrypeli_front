<template>
  <div id="app">
    <div class="grid-container">
      <div class="grid-5-12">
        <GameCanvas/>
      </div>
      <div class="grid-7-12">
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
.grid-container {
  width: 100%;
  display: flex;
}

.grid-4-12 { flex: 4; }
.grid-5-12 { flex: 5; }
.grid-6-12 { flex: 6; }
.grid-7-12 { flex: 7; }
.grid-8-12 { flex: 8; }
</style>
