<template>
  <div
    class="store-bg w-100 min-vh-100 vstack justify-content-center align-items-center text-secondary"
  >
    <div class="mb-7 position-relative">
      <h2 class="fs-lg-1">404</h2>
      <div class="skew position-absolute">
        <div
          class="border border-secondary border-dashed rounded-circle position-relative w-9 h-8 mb-5"
        >
          <div class="position-absolute">
            <p class="bg-secondary rounded-circle"></p>
          </div>
        </div>
      </div>
    </div>
    <p class="fs-6 fs-lg-4 fw-bold">這頁面不存在哦～讓我們回到地面上吧</p>
    <div class="text-center pt-7">
      <RouterLink
        class="btn btn-outline-primary btn-sm px-7 fs-sm-5 py-sm-4 rounded-sm-2"
        to="/bookstore"
      >
        回到二搜書店 →
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skew {
  transform: skew(-30deg, -15deg);
  top: -60px;
  left: -80px;
  .border {
    div {
      left: 50%;
      top: 50%;
      animation: move 3s linear infinite;

      p {
        width: 10px;
        height: 10px;
        margin: -50%;
        animation: rotate 3s linear infinite;
      }
    }
  }
}

@keyframes move {
  0%,
  100% {
    transform: translate(25px, 0);
  }

  25%,
  75% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-25px, 0);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) translate(50px, 0);
  }
  100% {
    transform: rotate(360deg) translate(50px, 0);
  }
}
</style>
