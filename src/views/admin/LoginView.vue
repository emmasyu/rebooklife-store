<template>
  <div
    class="home-bg cover-blur d-flex justify-content-center align-items-center vh-100"
  >
    <div
      class="p-9 d-flex flex-column align-items-center bg-black bg-opacity-50 rounded-4 position-relative shadow"
    >
      <img
        src="@/assets/images/rebooklife-logo-white.png"
        alt="rebooklife-logo"
        class="mb-8 w-8"
      />
      <h3 class="fs-3 text-light fw-bold mb-11">登入管理系統</h3>
      <form class="text-center" @submit.prevent="login(user)">
        <div class="d-flex align-items-center border-bottom px-5 mb-7">
          <label class="text-light fw-bold" for="email">帳號：</label>
          <input
            class="form-control text-light rounded-0"
            type="email"
            id="email"
            placeholder="請輸入信箱"
            required
            autofocus
            v-model.trim="user.username"
          />
        </div>
        <div class="d-flex align-items-center border-bottom px-5 mb-12">
          <label class="text-light fw-bold" for="password">密碼：</label>
          <input
            class="form-control text-light rounded-0"
            :type="isPasswordVisible ? 'text' : 'password'"
            id="password"
            placeholder="請輸入密碼"
            required
            v-model.trim="user.password"
          />
          <div class="w-2">
            <font-awesome-icon
              :icon="
                ('fa-solid', isPasswordVisible ? 'fa-eye-slash' : 'fa-eye')
              "
              class="text-white"
              style="cursor: pointer"
              @click="changeEye"
            />
          </div>
        </div>
        <button class="btn btn-outline-light btn-lg fw-bold" type="submit">
          登入
        </button>
      </form>
    </div>
  </div>
  <button class="btn btn-outline-light fw-light position-absolute">
    進入二搜書 →
  </button>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useStatedStore from "@/stores/states.js";
import { postUserLogin } from "@/api";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      isPasswordVisible: false,
    };
  },
  computed: {
    ...mapState(useStatedStore, ["isLoading"]),
  },
  methods: {
    ...mapActions(useStatedStore, ["changeLoadingState"]),
    async login(user) {
      this.changeLoadingState(true, "登錄中");
      try {
        const response = await postUserLogin(user);
        console.log("postUserLogin", response);
        if (response.data.success) {
          const { token, expired } = response.data;
          document.cookie = `reBookToken=${token}; expires=${new Date(
            expired
          )}`;
          this.$router.push("/dashboard/products");
        }
      } catch (error) {
        console.log(error);
      }
      this.changeLoadingState(false);
    },
    changeEye() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-black.bg-opacity-50 {
  z-index: 0;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid #fff;
    border-radius: 1.25rem;
    left: 35px;
    top: 35px;
    clip-path: polygon(95% -1%, 101% -1%, 101% 101%, -1% 101%, -1% 96%);
    z-index: -1;
  }
}

label.text-light {
  min-width: 60px;
}

input.text-light {
  max-width: 300px;
}

button.position-absolute {
  bottom: 50px;
  left: 60px;
}
</style>
