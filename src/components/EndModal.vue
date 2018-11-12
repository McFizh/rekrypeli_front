<template>
    <modal name="endmodal" v-bind:clickToClose="false" v-bind:scrollable="true" height="500">
        <div class="modal-content">
        <h1>{{titleText}}</h1>
        I take part in competition!<br/>
        <br/>
        <span class="intrest-span">
        <label for="firstname">Firstname:</label><input type="text" id="firstname" v-model="firstname"><br/>
        <label for="lastname">Lastname:</label><input type="text" id="lastname" v-model="lastname"><br/>
        <label for="email">Email:</label><input type="text" id="email" v-model="email"><br/>
        <br/>
        I want more information about Ambientia. I'm interested in:<br>
        <br/>
        <input type='checkbox' v-model="intrest1"> Ambientia's events<br/>
        <input type='checkbox' v-model="intrest2"> Job opportunities<br/>
        <input type='checkbox' v-model="intrest3"> Internship<br/>
        <input type='checkbox' v-model="intrest4"> Writing final thesis to Ambientia<br/>
        <br/>
        <input type='checkbox' name='permission' v-model="permission">
        I agree, that Ambientia can use my personal data for above mentioned purposes.
        No information will be transferred to the third parties.
        Personal data will be kept in register for 12 months and after that all personal data will be removed.
        <br/>
        </span><br/>
        <button class="sendbtn" v-bind:disabled="sendDisabled" @click.prevent="sendAnswers">Send form</button>
        <button class="dismissbtn" @click.prevent="backToStart">Not this time</button>

        </div>
    </modal>
</template>
<script>
export default {
    name: 'EndModal',

    props: ['endreason'],

    data: function() {
        return {
            firstname: "",
            lastname: "",
            email: "",
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
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
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

button {
    margin-top: 50px;
    font-size: 14pt;
    border-radius: 5px;
    padding: 5px 10px;
}

.sendbtn {
    margin-right: 20px;
    background-color: #4CAF50;
}

.dismissbtn {
    background-color: #FF2250;
}
</style>
