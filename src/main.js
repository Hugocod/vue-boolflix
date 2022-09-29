import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

///////flags npm package
import LangFlag from "vue-lang-code-flags";
Vue.component("lang-flag", LangFlag);
///////flags npm package --end

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

/* eslint-disable no-new */

new Vue({
    render: (h) => h(App),
    components: { App },
}).$mount("#app");
