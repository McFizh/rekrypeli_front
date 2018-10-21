<template>
  <div :id="editorId" class="flask-editor" />
</template>

<script>
import CodeFlask from 'codeflask';

export default {
  name: 'CodeEditor',
  props: [ 'name' ],

  data: function() {
    return {
        editorId: this.name + "-flask"
    };
  },

  mounted: function() {
    var el = document.getElementById(this.editorId);
    new CodeFlask(el, { language: 'js' });
  }
}
</script>

<style scoped>
    .flask-editor {
        border: 1px solid #bdbdbd;
        position: relative;
        min-height: 600px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
    }
</style>
