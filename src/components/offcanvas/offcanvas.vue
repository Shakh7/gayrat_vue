<template>
  <div :id="id" class="app-offcanvas shadow-sm" :class="{'show': show}">
    <div class="canvas-title border-bottom d-flex flex-row justify-content-between align-items-center p-4">
      <h5 class="my-0">
        <slot name="title">Canvas Title</slot>
      </h5>
      <i @click="close(id)" class="bi bi-x fs-4 cursor-pointer"></i>
    </div>
    <div class="canvas-body bg-light h-100 p-4">
      <slot></slot>
    </div>
  </div>

  <div @click="close(id)" :id="id + '_close_element'"
       class="canvas-bg-dark w-100 d-none vh-100 position-absolute opacity-25">
    s
  </div>

</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "offcanvas",
  props: {
    id: {
      type: String,
      default: () => 'custom_offcanvas'
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    close(id) {
      let canvas = document.getElementById(id)
      let bg = document.getElementById(id + `_close_element`)
      bg.classList.add('d-none')
      bg.classList.remove('d-block')
      canvas.style.right = '-1000%'
    },
    showCanvas(id) {

    },
    handleKeyClicks() {
      if (event.key === "Escape") {
        this.close(this.id)
      }
    }
  },
  mounted() {
    const elements = document.querySelectorAll('[data-cc-target]');
    elements.forEach(element => {
      element.addEventListener('click', () => {
        let element_toggle_id = element.getAttribute('data-cc-toggle');
        let canvas = document.getElementById(element_toggle_id)
        let bg = document.querySelector('#' + this.id + `_close_element.canvas-bg-dark`)
        console.log(bg)
        canvas.style.right = 0
        bg.classList.remove('d-none')
        bg.classList.add('d-block')
      });
    });

    window.addEventListener("keydown", this.handleKeyClicks);
  }
})
</script>

<style>
.app-offcanvas {
  position: fixed;
  top: 0;
  right: -1000%;
  height: 100vh;
  width: 250px;
  transition: 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 55;
}

.app-offcanvas .canvas-title {
  background-color: white;
}

.canvas-bg-dark {
  z-index: 10;
  background-color: black;
  transition: 1s;
}
</style>