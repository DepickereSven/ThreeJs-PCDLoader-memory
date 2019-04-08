<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="create">
        <div id="canvas">

        </div>
        <v-snackbar v-model="snack.status" :timeout="4000" :color="snack.color">
            <v-icon :class="info"></v-icon>
            {{ snack.text }}
            <v-btn flat @click="close">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>

    import handle from "../assets/js/Vue/Live/handle"
    import requestHandler from "../assets/js/Request/requestHandler"

    export default {
        data: () => ({
            requestHandler: "",
            request: requestHandler.requests.PCD,
            request2: requestHandler.requests.PCD2,
            update: true,
            dialog: false,
            info: 'cyan darken-2',
            snack: {
                status: false,
                text: '',
                color: ''
            },
        }),
        methods: {
            showSnack(message) {
                this.snack.text = message;
                this.snack.status = true;
                this.snack.color = this.info;
            },
            close() {
                this.snack.status = false
            }
        },
        async mounted() {
            await handle.initThree(document.getElementById('canvas'));
            await handle.updateThree(this);
        }
    }
</script>

<style scoped>

    body {
        margin: 0;
    }

    canvas {
        width: 100%;
        height: 100%
    }

    .secondary-background {
        padding: 0 0 0 0;
    }

    #create .v-speed-dial {
        position: absolute;
        top: 64px
    }

    #create .settings{
        position: absolute;
        width: 40%;
        padding-top: 2%;
        height: 100%;
        background-color: white;
        border: 4px #2196f3 solid;
    }

    #create{
        position: relative;
    }

    #create .toggleMenu{
        position: absolute;
        top: 64px;
        left: 16px;
    }

</style>