<template>
  <footer class="w-100 text-secondary fs-6 fs-lg-5 py-7">
    <div class="container">
      <div class="border-bottom border-secondary d-none d-lg-block pb-7 mb-7">
        <RouterLink to="/">
          <img
            src="@/assets/images/rebooklife-logo-white.png"
            alt="rebooklife"
            class="w-9"
          />
        </RouterLink>
      </div>
      <div class="row flex-lg-row-reverse align-items-start w-100 ms-0">
        <div class="col-lg-5">
          <h4
            class="fs-5 fw-bold mb-4 text-center text-lg-start fs-lg-4 mb-lg-7"
          >
            訂閱二搜書最新活動訊息
          </h4>
          <VForm class="pb-9" v-slot="{ errors }" @submit="sendEmail">
            <ErrorMessage
              name="電子郵件"
              class="invalid-feedback ps-4 h-3"
              :class="{ 'd-block': errors['電子郵件'] }"
            ></ErrorMessage>
            <div class="w-100 d-flex">
              <VField
                type="email"
                placeholder="請輸入 Email 接收最新活動訊息"
                class="w-100 text-center border-0 rounded-0 border-bottom border-secondary outline-none text-lg-start"
                name="電子郵件"
                :class="[
                  errors['電子郵件']
                    ? 'border-danger is-invalid bg-danger bg-opacity-25'
                    : 'border-secondary bg-transparent',
                ]"
                rules="email"
                v-model="email"
              />
              <button
                type="submit"
                class="w-3 px-2 w-lg-6 px-lg-4 h-3 h-lg-6 d-flex justify-content-center align-items-center bg-secondary bg-secondary-light-hover text-light fs-5 fs-lg-3 border-0"
              >
                <font-awesome-icon :icon="['fas', 'envelope']" />
              </button>
            </div>
          </VForm>
        </div>
        <div
          class="col-lg-7 d-flex flex-column align-items-center justify-content-between flex-lg-row"
        >
          <div class="d-flex flex-column pb-7">
            <RouterLink
              class="text-decoration-underline-hover text-secondary mb-4"
              to="/#about"
              >關於二搜書 | About Re book life</RouterLink
            >
            <RouterLink
              class="text-decoration-underline-hover text-secondary mb-4"
              to="/#faq"
              >常見問題 | FAQ</RouterLink
            >
            <RouterLink
              class="text-decoration-underline-hover text-secondary"
              to="/#contact"
              >聯絡我們 | Contct Us</RouterLink
            >
          </div>

          <div
            class="row pb-4 text-center fs-3 align-self-lg-end fs-lg-2 pe-xl-8 pe-xxl-11"
          >
            <a
              href="https://github.com/EmmaSyu"
              class="col text-secondary text-secondary-light-hover"
              target="_blank"
              ><font-awesome-icon :icon="['fab', 'square-github']"
            /></a>
            <a
              href="#"
              class="col text-secondary text-secondary-light-hover"
              @click.prevent
              ><font-awesome-icon :icon="['fab', 'linkedin']"
            /></a>
            <a
              href="#"
              class="col text-secondary text-secondary-light-hover"
              @click.prevent
              ><font-awesome-icon :icon="['fab', 'square-instagram']"
            /></a>
            <a
              href="#"
              class="col text-secondary text-secondary-light-hover"
              @click.prevent
              ><font-awesome-icon :icon="['fab', 'line']"
            /></a>
          </div>
        </div>
      </div>
      <div class="fs-6 text-center d-lg-flex justify-content-center">
        <p>Copyright ©Rebooklife.</p>
        <p>本網站僅供個人作品使用，不提供商業用途</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useStatesStore from "@/stores/states.js";

export default {
  data() {
    return {
      email: "",
    };
  },
  computed: {
    ...mapState(useStatesStore, ["toastMessage"]),
  },
  methods: {
    ...mapActions(useStatesStore, ["pushToastMessage"]),
    sendEmail() {
      if (this.email === "") {
        this.pushToastMessage("欄位不可為空", { success: false });
      } else {
        this.pushToastMessage("郵件訂閱傳送成功");
        this.email = "";
      }
    },
  },
};
</script>

<style scoped>
footer {
  background-color: #f4f4f4;
}
img {
  filter: hue-rotate(42deg) saturate(63%) brightness(53%) sepia(100%);
}
</style>
