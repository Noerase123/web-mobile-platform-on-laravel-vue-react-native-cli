<template>
  <sidebar-wrapper active="register">
    <p class="title-text">Student Registration</p>
    <register-form></register-form>
  </sidebar-wrapper>
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

<style>
  .title-text {
    font-size: 36px;
    margin-bottom: 20px;
  }
</style>