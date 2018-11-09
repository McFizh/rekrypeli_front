<template>
    <modal name="startmodal">
        <div class="modal">
        <h1>Ambientia Space Race</h1>
        <p>Atri Ambientialainen from Ambientia has been developing simulator for
            landing probe safely to Moon, but every simulation ends in a crash. <br/>
            <br/>
            Your mission, should you choose to accept it, is to help Atri A. to develop JavaScript
            application that reduces the landing speed to 90 or less.<br>
        </p>
        <button @click.prevent="$emit('start');">Begin the challenge</button>
        </div>
    </modal>
</template>
<script>
export default {
    name: 'StartModal',
}
</script>

<style scoped>
.modal {
    text-align: center;
    padding: 10px 20px;
}

button {
    margin-top: 50px;
    font-size: 14pt;
    border-radius: 5px;
    background-color: #4CAF50;
    padding: 5px 10px;
}
</style>
