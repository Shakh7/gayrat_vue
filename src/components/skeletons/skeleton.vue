<template>
    <h2 class="skeleton my-0" :class="class_list" v-if="custom_style.length > 0" :style="custom_style"></h2>
    <h2 class="skeleton my-0" :class="class_list" v-else style="min-height: 10px"></h2>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "skeleton",
    props: {
        custom_style: {
            type: String,
            default: ''
        },
        class_list: {
            type: String,
            required: false,
        },
    }
})
</script>

<style scoped lang="scss">
.skeleton {
  border-radius: 2px;
  background-color: #e2e5e7;
  // The shine that's going to move across the skeleton:
  background-image: linear-gradient(
                  90deg,
                  rgba(#fff, 0),
                  rgba(#fff, 0.5),
                  rgba(#fff, 0)
  );
  background-size: 40px 100%; // width of the shine
  background-repeat: no-repeat; // No need to repeat the shine effect
  background-position: left -40px top 0; // Place shine on the left side, with offset on the left based on the width of the shine - see background-size
  animation: shine 1s ease infinite; // increase animation time to see effect in 'slow-mo'
}

@keyframes shine {
  to {
    // Move shine from left to right, with offset on the right based on the width of the shine - see background-size
    background-position: right -40px top 0;
  }
}
</style>