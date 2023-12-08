<template>
  <form class="form-container" v-on:submit.prevent="onSubmit">
    <div class="row">
      <div class="label-field">
        Student ID
      </div>
      <input v-model="payload.studentID" class="input-field" name="studentID" placeholder="Student ID" />
    </div>
    <div class="row">
      <div class="label-field">
        <p>Name of Child</p>
      </div>
      <input v-model="payload.firstName" class="input-field" name="firstName" placeholder="First" />
      <input v-model="payload.middleName" class="input-field" name="middleName" placeholder="Middle" />
      <input v-model="payload.lastName" class="input-field" name="lastName" placeholder="Last" />
    </div>
    <div class="row">
      <div class="label-field">
        <p>Birthday</p>
      </div>
      <input v-model="payload.birthday" class="input-field" type="date" name="birthday" />
    </div>
    <div class="row">
      <div class="label-field">
        <p>Name of Parent</p>
      </div>
      <input v-model="payload.parentFirstName" class="input-field" name="parentFirstName" placeholder="First" />
      <input v-model="payload.parentMiddleName" class="input-field" name="parentMiddleName" placeholder="Middle" />
      <input v-model="payload.parentLastName" class="input-field" name="parentLastName" placeholder="Last" />
    </div>
    <div class="row">
      <div class="label-field">
        <p>Email</p>
      </div>
      <input v-model="payload.email" class="input-field" type="email" name="email" placeholder="email" />
      <div class="label-field">
        <p>Contact #</p>
      </div>
      <input v-model="payload.contactNum" class="input-field" type="number" name="contactNum" />
    </div>
    <div class="row">
      <div class="label-field">
        <p>Relationship</p>
      </div>
      <select v-model="payload.relationship" class="input-field">
        <option disabled value="">Please select relationship</option>
        <option>Mother</option>
        <option>Father</option>
        <option>Aunt</option>
        <option>Uncle</option>
        <option>Guardian</option>
      </select>
    </div>
    <div class="row-button">
      <button>
        Cancel
      </button>
      <button class="save">
        Save
      </button>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    id: String
  },
  data() {
    return {
      payload: {
        firstName: '',
        middleName: '',
        lastName: '',
        birthday: '',
        studentID: '',
        parentFirstName: '',
        parentMiddleName: '',
        parentLastName: '',
        email: '',
        contactNum: '',
        relationship: ''
      }
    }
  },
  async created() {
    this.onView();
  },
  methods: {
    async onView() {
      const { data } = await axios.get('/api/students/' + this.id);
      console.log('data', data);
      this.payload = data.data;
    }
  }
}
</script>

<style>
  .row-button {
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 10px;
  }
  .row-button button {
    width: 100px;
    padding: 10px;
  }
  .save {
    background-color: #536e83;
    border-radius: 8px;
    color: white;
  }
  .label-field {
    width: 100px;
    padding-right: 10px;
    text-align: right;
  }
  .input-field {
    border: 1px solid #e1e1e1;
    padding: 7px;
    border-radius: 4px;
    flex: 1;
  }
  .form-container {
    width: 100%;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
</style>