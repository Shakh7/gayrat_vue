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

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import {initApexCharts} from "@/core/plugins/apexcharts";
import {initInlineSvg} from "@/core/plugins/inline-svg";
import {initVeeValidate} from "@/core/plugins/vee-validate";

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

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app.use(i18n);

app.directive("tooltip", (el) => {
    new Tooltip(el);
});

app.mount("#app");
