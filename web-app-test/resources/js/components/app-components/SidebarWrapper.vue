<template>
    <div class="container-panel">
        <div id="main-container" class="panel-side-bar">
            <p class="text-title">
                Dashboard
            </p>
            <div class="menu-bar">
                <p class="text-xs">MENU</p>
                <div class="menu-bar">
                  <div v-for="(menu, x) in menuNavigation" :key="x">
                    <div v-if="active === menu.name" class="active nav-item">
                        <a :href="menu.route">{{ menu.title }}</a>
                    </div>
                    <div v-else class="nav-item">
                        <a :href="menu.route">{{ menu.title }}</a>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div class="panel-main-screen">
          <div class="breadcrumbs">
            <p>dashboard / menu / {{ active }}</p>
          </div>
          <div class="child-container">
            <slot />
          </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    active: String
  },
  data() {
    return {
      menuNavigation: [
        {
          route: '/',
          name: 'list',
          title: 'Student List'
        },
        {
          route: '/register',
          name: 'register',
          title: 'Register a Student'
        },
        {
          route: '/approvals',
          name: 'approvals',
          title: 'Approvals'
        }
      ]
    }
  },
  mounted() {
    document.getElementById('main-container').style.height = (screen.height - 100) + 'px';
    console.log('Sidebar Wrapper mounted.')
  }
}
</script>

<style scoped>
  .breadcrumbs p {
    font-size: 12px;
    color: #808080;
  }
  .child-container {
    margin-top: 25px;
  }
  .container-panel {
    display: flex;
    width: 100%;
    font-family: 'Roboto';
  }
  .panel-side-bar {
    width: 20%;
    background-color: #536e83;
    color: white;
    padding: 22px;
    font-family: 'Roboto';
  }
  .panel-main-screen {
    width: 80%;
    padding: 22px;
  }
  .menu-bar {
    margin-top: 20px;
  }
  .text-xs {
    font-size: 0.75rem; /* 12px */
    line-height: 1rem; /* 16px */
  }
  .text-title {
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem; /* 28px */
  }
  .active {
    background-color: #e5e6eb;
    color: black;
  }
  .nav-item {
    border-radius: 10px;
    padding: 15px 10px;
  }
</style>
