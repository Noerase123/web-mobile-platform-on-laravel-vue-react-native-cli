<template>
  <v-app>
    <h1>Details</h1>
  </v-app>
</template>

<script>
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

<style>

</style>