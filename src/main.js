import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

///////flags npm package
import LangFlag from "vue-lang-code-flags";
Vue.component("lang-flag", LangFlag);
///////flags npm package --end

new Vue({
    render: (h) => h(App),
}).$mount("#app");
