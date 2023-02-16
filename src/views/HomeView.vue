<template></template>

<script></script>

<style>
body {
  min-height: 100vh;
  background: url("../assets/images/background-img-index.jpg") center center
    fixed;
  animation: scale-shrink 10s linear alternate infinite;
  letter-spacing: 0.2rem;
}
body::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: -1;
}
@keyframes scale-shrink {
  0% {
    background-size: auto 100%;
  }
  100% {
    background-size: auto 120%;
  }
}
</style>
