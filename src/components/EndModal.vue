<template>
    <modal name="endmodal" v-bind:clickToClose="false">
        <div class="modal-content">
        <h1>{{titleText}}</h1>
        <span class="intrest-span">
        I would like to hear more about:<br>
        <br/>
        <input type='checkbox' v-model="intrest1"> Subject A<br/>
        <input type='checkbox' v-model="intrest2"> Subject B<br/>
        <input type='checkbox' v-model="intrest3"> Subject C<br/>
        <input type='checkbox' v-model="intrest4"> Subject D<br/>
        </span><br/>
        <br/>
        <input type='checkbox' name='permission' v-model="permission"> I Accept that <br/>
        <br/>
        <button class="" v-bind:disabled="sendDisabled" @click.prevent="sendAnswers">Send form</button>
        <button class="" @click.prevent="backToStart">Not this time</button>

        </div>
    </modal>
</template>
<script>
export default {
    name: 'EndModal',

    props: ['endreason'],

    data: function() {
        return {
            permission:false,
            intrest1: false,
            intrest2: false,
            intrest3: false,
            intrest4: false
        };
    },

    computed: {

        titleText: function() {
            if(this.endreason=="timeout") {
                return "Time ran out";
            } else if(this.endreason=="giveup") {
                return "Mission aborted";
            } else if(this.endreason=="winner") {
                return "Safe landing!";
            }
        },

        sendDisabled: function() {
            return !this.permission;
        }


    },

    methods: {
        sendAnswers: function() {
            this.$emit('sendanswers', {
                intrest1: this.intrest1,
                intrest2: this.intrest2,
                intrest3: this.intrest3,
                intrest4: this.intrest4,
                permission: this.permission
            });
        },

        backToStart: function() {
            this.$emit('skipsending');
        }
    }

}
</script>

<style scoped>
.intrest-span {
    display: inline-block;
    text-align: left;
}
</style>
