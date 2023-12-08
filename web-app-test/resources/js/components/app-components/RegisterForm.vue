<template>
  <div>
    <div v-if="id !== null && operation === 'view'">
      <div class="row-container">
        <div class="image-container">
          <div class="image">
            <i class="fa-regular fa-user"></i>
          </div>
        </div>
        <div class="view-container">
          <p>STUDENT INFORMATION</p>
          <div class="row row-view">
            <div class="label-field">
              Student ID
            </div>
            <div class="value-field">
              <p>{{ payload.studentID }}</p>
            </div>
          </div>
          <div class="row row-view">
            <div class="label-field">
              <p>Name of Child</p>
            </div>
            <div class="value-field">
              {{ `${payload.firstName} ${payload.middleName} ${payload.lastName}` }}
            </div>
          </div>
          <div class="row row-view">
            <div class="label-field">
              <p>Birthday</p>
            </div>
            <div class="value-field">
              {{ birthdayFormat(payload.birtday) }}
            </div>
          </div>
          <div class="row row-view">
            <div class="label-field">
              <p>Name of Parent</p>
            </div>
            <div class="value-field">
              {{ `${payload.parentFirstName} ${payload.parentMiddleName} ${payload.parentLastName}` }}
            </div>
          </div>
          <div class="row row-view">
            <div class="label-field">
              <p>Email</p>
            </div>
            <div class="value-field">
              {{ payload.email }}
            </div>
          </div>
          <div class="row row-view">
            <div class="label-field">
              <p>Contact #</p>
            </div>
            <div class="value-field">
              {{ payload.contactNum }}
            </div>
          </div>
          <div class="row row-view">
            <div class="label-field">
              <p>Relationship</p>
            </div>
            <div class="value-field">
              {{ payload.relationship }}
            </div>
          </div>
        </div>
        <div class="approval-panel">
          <p>APPLICATION STATUS</p>
          <div class="row">
            <p class="current-status">Current status: </p>
            <p>{{ payload.status }}</p>
          </div>
          <div v-if="payload.status === 'pending'" class="row">
            <button class="btn-decline" v-on:click="onUpdateStatus('declined')">
              <i class="fa-solid fa-x"></i>
            </button>
            <button class="btn-accept" v-on:click="onUpdateStatus('approved')">
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <form v-else class="form-container" v-on:submit.prevent="onSubmit">
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
        <button class="save" v-on:click="onSubmit">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import axios from 'axios';
export default {
  props: {
    id: String,
    operation: String
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
        relationship: '',
        status: ''
      }
    }
  },
  created() {
    this.onView();
  },
  methods: {
    async onView() {
      const { data } = await axios.get(`/api/students/${this.id}`);
      console.log('data', data.data);
      this.payload = data.data;
    },
    async onUpdateStatus(status) {
      const { data } = await axios.patch(`/api/students/${this.id}`, {
        ...this.payload,
        status
      });
      console.log('data', data);
      this.onView();
      alert('updated successfully');
    },
    async onSubmit() {
      const { data } = await axios.post('/api/students/', this.payload);
      console.log('data', data);
    },
    birthdayFormat(birthday) {
      return dayjs(birthday).format('MMM DD, YYYY');
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
  .value-field {
    text-align: left;
    font-size: 20px;
    font-weight: 600;
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
  .row-view {
    border-bottom: 1px solid #536e83;
  }
  .view-container {
    width: 50%;
  }
  .image-container {
    width: 200px;
    height: 200px;
    background-color: grey;
    border-radius: 1000px;
    position: relative;
    margin-top: 10px;
  }
  .image {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 50px;
    color: white;
    transform: translate(-50%, -50%);
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .row-container {
    display: flex;
    flex-direction: row;
    gap: 30px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .approval-panel {
    border: 1px solid #536e83;
    border-radius: 10px;
    padding: 25px;
    font-size: 20px;
    width: 25%;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .current-status {
    font-size: 15px;
  }
  .status-btn {
    justify-content: space-around;
  }
  .btn-decline {
    background-color: #ff7e26;
    color: white;
    flex: 1;
    border-radius: 10px;
  }
  .btn-accept {
    background-color: #80bb80;
    color: white;
    flex: 1;
    border-radius: 10px;
  }
</style>