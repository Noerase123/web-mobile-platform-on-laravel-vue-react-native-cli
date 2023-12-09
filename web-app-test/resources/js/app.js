/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { createApp } from 'vue';

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

const app = createApp({});

// pages
import HomeComponent from './components/HomeComponent.vue';
import Registration from './components/Registration.vue';
import Details from './components/DetailsComponent.vue';
import Approvals from './components/ApprovalsComponent.vue';

// components
import SidebarWrapper from './components/app-components/SidebarWrapper.vue';
import RegisterForm from './components/app-components/RegisterForm.vue';
import ViewForm from './components/app-components/ViewForm.vue';

app.component('home', HomeComponent);
app.component('registration', Registration);
app.component('details-component', Details);
app.component('approvals', Approvals);
app.component('sidebar-wrapper', SidebarWrapper);
app.component('register-form', RegisterForm);
app.component('view-form', ViewForm);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Object.entries(import.meta.glob('./**/*.vue', { eager: true })).forEach(([path, definition]) => {
//     app.component(path.split('/').pop().replace(/\.\w+$/, ''), definition.default);
// });

/**
 * Finally, we will attach the application instance to a HTML element with
 * an "id" attribute of "app". This element is included with the "auth"
 * scaffolding. Otherwise, you will need to add an element yourself.
 */

app.mount('#app');
