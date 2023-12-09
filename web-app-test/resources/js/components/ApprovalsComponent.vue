<template>
  <sidebar-wrapper active="approvals">
    <div class="row justify-between">
      <p class="title-text">Approvals</p>
      <button v-on:click="downloadFile" class="export-btn">
        <i class="fa-solid fa-file-arrow-down"></i>
        Export Excel
      </button>
    </div>
    <div class="tabs">
      <div class="tab" v-for="(item, i) in tabs" :key="i">
        <div v-if="activeTab === item.category" class="active">
          <div v-if="item.category === 'all'">
            <button v-on:click="onShowAll">
              {{ item.title }}
            </button>
          </div>
          <div v-else>
            <button v-on:click="onShowPerStatus(item.category)">
              {{ item.title }}
            </button>
          </div>
        </div>
        <div v-else>
          <div v-if="item.category === 'all'">
            <button v-on:click="onShowAll">
              {{ item.title }}
            </button>
          </div>
          <div v-else>
            <button v-on:click="onShowPerStatus(item.category)">
              {{ item.title }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Name of Child</th>
          <th>Birthday</th>
          <th>Student ID</th>
          <th>Parent Name</th>
          <th>Contact #</th>
          <th>Email</th>
          <th>Relationship</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in listData" :key="i">
          <td>{{ `${item.firstName} ${item.lastName}` }}</td>
          <td>{{ birthdayFormat(item.birthday) }}</td>
          <td>{{ item.studentID }}</td>
          <td>{{ `${item.parentFirstName} ${item.parentLastName}` }}</td>
          <td>{{ item.contactNum }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.relationship }}</td>
          <td>
            <div v-if="item.status === 'pending'">
              <div class="status pending">
                {{ item.status.toUpperCase() }}
              </div>
            </div>
            <div v-else-if="item.status === 'declined'">
              <div class="status declined">
                {{ item.status.toUpperCase() }}
              </div>
            </div>
            <div v-else>
              <div class="status approved">
                {{ item.status.toUpperCase() }}
              </div>
            </div>
          </td>
          <td>
            <div class="row justify-around">
              <a :href="`/details/${item.id}`" class="view">
                <i class="fa-regular fa-eye"></i>
              </a>
              <!-- <a :href="`/details/${item.id}`" class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
              </a> -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </sidebar-wrapper>
</template>

<script>
import exportFromJSON from "export-from-json";
import axios from 'axios';
import dayjs from 'dayjs';

export default {
  data() {
    return {
      activeTab: 'all',
      listData: [],
      tabs: [
        {
          category: 'all',
          title: 'Show all'
        },
        {
          category: 'pending',
          title: 'Pending'
        },
        {
          category: 'approved',
          title: 'Approved'
        },
        {
          category: 'declined',
          title: 'Declined'
        }
      ]
    }
  },
  async created() {
    const { data } = await axios.get('/api/students/');
    console.log('data', data.data);
    this.listData = data.data;
  },
  mounted() {
    console.log('Home Component mounted.')
  },
  methods: {
    downloadFile() {
      const data = this.listData;
      const fileName = "student-report";
      const exportType = exportFromJSON.types.csv;

      if (data) exportFromJSON({ data, fileName, exportType });
    },
    async onShowAll() {
      const { data } = await axios.get('/api/students/');
      console.log('data', data.data);
      this.listData = data.data;
      this.activeTab = 'all';
    },
    async onShowPerStatus(status) {
      const { data } = await axios.get('/api/students/category/'+status);
      console.log('showperstatus', data.data);
      this.listData = data.data;
      this.activeTab = status;
    },
    birthdayFormat(birtday) {
      return dayjs(birtday).format('MM/DD/YYYY');
    }
  }
}
</script>

<style scoped>
  .export-btn {
    background-color: #536e83;
    color: white;
    padding: 10px;
    border-radius: 5px;
  }
  .tabs {
    display: flex;
    flex-direction: row;
    border-bottom: 3px solid #e1e1e1;
    margin-bottom: 30px;
  }
  .tabs .tab button {
    padding: 5px 10px;
    font-size: 15px;
    font-weight: 600;
    width: 100px;
  }
  .tab {
    text-align: center;
  }
  .tab .active {
    /* background-color: blue; */
    border-bottom: 3px solid #000;
  }
  tbody tr td div .view {
    color: #536e83;
  }
  tbody tr td div .edit {
    color: 		#979ab4;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .justify-around {
    justify-content: space-around;
  }
  .justify-between {
    justify-content: space-between;
  }
  .status {
    text-align: center;
    font-size: 12px;
    padding: 3px;
    border-radius: 10px;
  }
  .approved {
    background-color: #d2f8d2;
    color: #000000;
  }
  .pending {
    background-color: #ff7e26;
    color: white;
  }
  .declined {
    background-color: rgb(156, 77, 77);
    color: white;
  }
  thead {
    background-color: #f7f7f7;
  }
  tbody tr td {
    text-align: center;
    padding: 10px;
    font-size: 14px;
    color: #808080;
    border-bottom: 1px solid #e1e1e1;
  }
  thead tr th {
    text-align: center;
    padding: 10px;
  }
  .table {
    width: 100%;
  }
  .title-text {
    font-size: 36px;
    margin-bottom: 20px;
  }
</style>