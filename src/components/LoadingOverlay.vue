<template>
  <teleport to="#app">
    <div
      v-if="isLoading"
      class="bg-black text-light p-2 position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
      style="--bs-bg-opacity: 0.5; z-index: 1060"
    >
      <div class="bounce">
        <span
          v-for="(letter, index) in bounceLetterArray"
          class="bounce-letter"
          :style="`animation-delay: ${index * 0.1}s`"
          >{{ letter }}</span
        >
      </div>
    </div>
  </teleport>
</template>

<script>
import { mapState } from "pinia";
import useStateStore from "../stores/states";

export default {
  data() {
    return {
      bounceLetter: "資料更新中，請稍後...",
    };
  },
  computed: {
    ...mapState(useStateStore, ["isLoading"]),
    bounceLetterArray() {
      let bounceLetterArray = this.bounceLetter.split("");
      return bounceLetterArray;
    },
  },
};
</script>

<style>
.bounce-letter {
  animation: bounce 0.7s infinite alternate;
  transform: translateY(0);
  display: inline-block;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
    text-shadow: rgba(255, 255, 255, 0.4) 0 1.5em 0.35em;
  }
  100% {
    transform: translateY(0.5rem);
    text-shadow: rgba(255, 255, 255, 0.4) 0 0.5em 0.35em;
  }
}
</style>
