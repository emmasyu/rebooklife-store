<template>
  <ul
    class="progress-bar d-flex justify-content-center text-primary fw-bold fs-6 fs-lg-5 pb-8 rounded-bottom-4 shadow-small shadow-lg-none fixed-top pt-11 position-lg-static bg-lg-transparent"
  >
    <li
      v-for="item in cartProgress"
      :key="item.name"
      class="progress-item position-relative px-6 px-sm-8 px-lg-10"
      :class="{ active: $route.name === item.name }"
    >
      <div class="ripple bg-primary rounded-2 position-relative"></div>
      <p
        class="progress-text position-absolute start-0 end-0 top-6 top-lg-7 text-center text-nowrap"
      >
        {{ item.text }}
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      cartProgress: [
        {
          name: 'cart',
          text: '購物車',
        },
        {
          name: 'order',
          text: '訂單資訊',
        },
        {
          name: 'orderPay',
          text: '確認訂單',
        },
        {
          name: 'orderFinish',
          text: '訂單完成',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  z-index: 1029;
  background: rgba(233, 226, 226, 0.9);
  .progress-item {
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      width: calc(100% - 25px);
      height: 2px;
      top: 5px;
      left: calc(50% + 12.5px);
      background: #390000;
      @media (min-width: 992px) {
        top: 6.5px;
        width: calc(100% - 30px);
        left: calc(50% + 15px);
      }
    }
    .ripple {
      width: 11px;
      height: 11px;
      @media (min-width: 992px) {
        width: 15px;
        height: 15px;
      }
    }
    .progress-text {
      display: none;
    }
  }
}
.progress-bar .active {
  .progress-text {
    display: block;
  }
  .ripple {
    &::after,
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: #fff;
      z-index: -1;
      border-radius: 3rem;
    }
    &,
    &::after,
    &::before {
      outline: 0px rgba(188, 108, 108, 0.5) solid;
      animation: ripple 4s infinite -1.33s ease-in;
    }
    &::after {
      animation-delay: 0s;
    }
    &::before {
      animation-delay: 1.33s;
    }
  }
}

@keyframes ripple {
  to {
    outline-color: rgba(188, 108, 108, 0);
    outline-width: 20px;
  }
}
</style>
