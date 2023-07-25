<template>
  <div class="position-relative mx-auto">
    <img src="@/assets/images/coupon-bg.png" alt="coupon" class="w-100" />
    <div
      class="w-8 w-lg-10 h-8 h-lg-10 clippath position-absolute top-0"
      :class="`bg-${coupon.color}`"
    >
      <p class="fs-lg-4">{{ coupon.category }}</p>
    </div>
    <div
      class="position-absolute top-0 pt-8 pt-lg-9 w-100 text-black text-center"
    >
      <h4 class="fs-5 fs-lg-4 fw-bold" v-for="item in splitTitles">
        {{ item }}
      </h4>
      <h6 class="lh-sm">
        <span class="text-primary fw-bold">{{ coupon.percent / 10 }}</span> 折
      </h6>
      <p class="fs-6 mb-2">({{ coupon.notes }})</p>
      <p class="py-5 fs-lg-4 fw-bold cursor-pointer" @click="copyText">
        {{ coupon.code }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useStateStore from "@/stores/states.js";

export default {
  props: ["coupon"],
  computed: {
    splitTitles() {
      return this.coupon.title.split(" ");
    },
  },
  methods: {
    ...mapActions(useStateStore, ["pushToastMessage"]),
    async copyText(event) {
      try {
        await navigator.clipboard.writeText(event.target.innerText);
        this.pushToastMessage(`已成功複製 ${event.target.innerText} 到剪貼簿`);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.clippath {
  clip-path: polygon(1px 50px, 1px 100px, 100px 1px, 50px 1px);
  p {
    transform-origin: 70px 23px;
    transform: rotate(-45deg);
  }
  @media (min-width: 992px) {
    clip-path: polygon(1px 75px, 1px 150px, 150px 1px, 75px 1px);
    p {
      transform-origin: 100px 25px;
      transform: rotate(-45deg);
    }
  }
}
span.text-primary {
  font-size: 100px;
  @media (min-width: 992px) {
    font-size: 120px;
  }
}
</style>
