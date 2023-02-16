<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div
      class="login-box p-9 d-flex flex-column align-items-center bg-black bg-opacity-50 rounded-4 position-relative shadow"
    >
      <img
        src="../assets/images/rebooklife-logo-white.png"
        alt="rebooklife-logo"
        class="login-logo mb-8"
      />
      <h3 class="fs-3 text-white fw-bold mb-11">登入管理系統</h3>
      <form class="text-center" @submit.prevent="signIn">
        <div class="d-flex align-items-center border-bottom px-5 mb-7">
          <label class="text-white fw-bold" for="email">帳號：</label>
          <input
            class="form-control text-light rounded-0"
            type="email"
            id="email"
            placeholder="請輸入信箱"
            required
            autofocus
            v-model="user.username"
          />
        </div>
        <div class="d-flex align-items-center border-bottom px-5 mb-12">
          <label class="text-white fw-bold" for="password">密碼：</label>
          <input
            class="form-control text-light rounded-0"
            :type="isVisible ? 'text' : 'password'"
            id="password"
            placeholder="請輸入密碼"
            required
            v-model="user.password"
          />
          <div class="visible-icon">
            <font-awesome-icon
              icon="fa-solid fa-eye"
              class="text-white"
              style="cursor: pointer"
              @click="changeEye"
              v-if="!isVisible"
            />
            <font-awesome-icon
              icon="fa-solid fa-eye-slash"
              class="text-white"
              style="cursor: pointer"
              @click="changeEye"
              v-else
            />
          </div>
        </div>
        <button class="btn btn-outline-light btn-lg fw-bold" type="submit">
          登入
        </button>
      </form>
    </div>
  </div>
  <button
    class="btn btn-outline-light fw-light position-absolute letter-space-2"
  >
    進入二搜書 →
  </button>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      isVisible: false,
    };
  },
  methods: {
    signIn() {
      const api = `${import.meta.env.VITE_APP_API}admin/signin`;
      this.axios.post(api, this.user).then((res) => {
        console.log(res);
      });
    },
    changeEye() {
      this.isVisible ? (this.isVisible = false) : (this.isVisible = true);
    },
  },
};
</script>

<style>
body::before {
  backdrop-filter: blur(10px);
}

#app {
  min-height: 100vh;
  position: relative;
}

.login-box::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid #ffffff;
  border-radius: 1.25rem;
  z-index: -1;
  left: 35px;
  top: 35px;
  clip-path: polygon(94% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 95%);
}

.login-logo {
  width: 100px;
}

label.text-white {
  width: 100px;
}

input::placeholder {
  letter-spacing: 0.2rem;
}

input:-webkit-autofill {
  transition: 999999s;
}

button.position-absolute {
  bottom: 50px;
  left: 60px;
}

button {
  letter-spacing: 0.2rem;
}

button.btn-outline-light:hover {
  color: #390000;
}

.visible-icon {
  width: 20px;
}
</style>
