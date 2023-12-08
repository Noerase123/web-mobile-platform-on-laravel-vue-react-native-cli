<template>
    <div class="container-panel">
        <div class="panel-side-bar side-container">
            <p>Side bar</p>
        </div>
        <div class="panel-main-screen">
            <p>Main Screen</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    async created() {
        const { data } = await axios.get('/api/students/');
        console.log('data', data);
    },
    mounted() {
        console.log('Component mounted.')
    }
}
</script>

<style scoped>
    .container-panel {
        display: flex;
        width: 100%;
    }
    .panel-side-bar {
        height: 600px;
        width: 18%;
        background-color: #e1e1e1;
    }
    .panel-main-screen {
        flex: 1;
        background-color: #cdcdcd;
        width: 70%;
    }
</style>
