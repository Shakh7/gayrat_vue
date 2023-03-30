<template>
  <section class="hero-wrapper">
    <div class="container-xl d-flex flex-column align-items-start justify-content-center h-100">
      <div class="text-start lh-lg">
        <h1 class="hero-title text-light mb-3">Delivery firms <br>compete for your job</h1>
        <p class="hero-context text-light">As Shiply's courier services are already making similar trips, quotes are up
          to 75%
          cheaper than standard
          rates.</p>
        <router-link :to="{name: 'get-quotes'}">
          <button
              class="btn btn-primary er fs-6 px-8 py-4"
          >
            RECEIVE QUOTES IN A MINUTE
          </button>
        </router-link>
        <CreateQuoteModal></CreateQuoteModal>
      </div>
    </div>
  </section>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import CreateQuoteModal from "@/components/modals/wizards/CreateQuoteModal.vue";

export default defineComponent({
  name: "create-quote",
  components: {
    CreateQuoteModal,
  },
  setup() {
    return {};
  },
});
</script>
<style scoped>
.hero-wrapper {
  background-image: url("/media/landing-page/hero-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  max-height: 550px;
}

.hero-wrapper .hero-title {
  font-size: 48px;
  z-index: 99;
}

.hero-wrapper .hero-context {
  font-size: 22px;
  max-width: 600px;
}
</style>