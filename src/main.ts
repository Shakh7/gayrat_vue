import {createApp} from "vue";
import {createPinia} from "pinia";
import {Tooltip} from "bootstrap";
import App from "./App.vue";
import axios from "axios";
/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router/index";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";
import FloatingVue from 'floating-vue'

import {
    // Directives
    VTooltip,
    VClosePopper,
    // Components
    Dropdown,
    Menu
} from 'floating-vue'
import 'floating-vue/dist/style.css'

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import {initApexCharts} from "@/core/plugins/apexcharts";
import {initInlineSvg} from "@/core/plugins/inline-svg";
import {initVeeValidate} from "@/core/plugins/vee-validate";
import {initKtIcon} from "@/core/plugins/keenthemes";

import "@/core/plugins/prismjs";

import {setupCalendar, Calendar, DatePicker} from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(setupCalendar, {})
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

app.directive('tooltip', VTooltip)
app.directive('close-popper', VClosePopper)

app.component('VDropdown', Dropdown)
app.component('VMenu', Menu)

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initKtIcon(app);
initVeeValidate();

app.use(i18n);

app.directive("tooltip", (el) => {
    new Tooltip(el);
});

app.mount("#app");
