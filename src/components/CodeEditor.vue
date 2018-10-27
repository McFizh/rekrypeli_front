<template>
    <div :id="editorId" class="flask-editor">
        function calcIteration(fuel, speed, height) {
            // For every loop iteration, you will get 3 values:
            // fuel: remaining fuel (0-500)
            // speed: vertical speed
            // height: height of the lander

            // ::::::::::::::::::
            // Add your code here
            // ::::::::::::::::::

            // Return engine power value (0-4)
            return 0;
        }
    </div>
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
        new CodeFlask(
            document.getElementById(this.editorId), { language: 'js' }
        );
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
