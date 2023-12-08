<template>
  <sidebar-wrapper active="list">
    <div class="row">
      <a href="/"><i class="fa-solid fa-arrow-left"></i></a>
      <p class="fullName">{{ response.fullName }}</p>
    </div>
    <register-form :id="id" operation="view"></register-form>
  </sidebar-wrapper>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    id: String
  },
  data() {
    return {
      response: {
        fullName: '',
      }
    }
  },
  async created() {
    const { data } = await axios.get(`/api/students/${this.id}`);
    console.log('data', data.data);
    const payload = data.data;
    this.response.fullName = `${payload.firstName} ${payload.lastName}`;
  }
}
</script>

<style>
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .row .fullName {
    font-size: 30px;
  }
</style>