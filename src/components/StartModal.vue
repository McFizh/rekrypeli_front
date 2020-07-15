<template>
  <modal name="startmodal" v-bind:clickToClose="false">
    <div class="modal-content">
      <h1>Space Race</h1>
      <p>John Doe has been developing simulator for landing probe safely to Moon, but every simulation ends in a crash. <br/>
          <br/>
          Your mission, should you choose to accept it, is to help John Doe to develop JavaScript
          application that reduces the landing speed to 90 or less.<br>
      </p>
      <button @click.prevent="$emit('start');">Begin the challenge</button>
    </div>
  </modal>
</template>
<script>
export default {
  name: 'StartModal',
};
</script>

<style scoped>
button {
    margin-top: 50px;
    font-size: 14pt;
    border-radius: 5px;
    background-color: #4CAF50;
    padding: 5px 10px;
}
</style>
