<template>
  <div
    class="border-0 border-lg-1 border-dashed border-secondary rounded-5 p-lg-7 min-w-lg-content h-lg-content col"
  >
    <h4
      class="mt-7 mt-lg-0 fs-6 fs-lg-5 fs-xl-4 fw-bold pb-4 text-lg-center border-bottom-0 border-bottom-lg border-lg-gray"
    >
      收件人資訊
    </h4>
    <VForm class="pt-lg-4" v-slot="{ errors }" @submit="sendOrder">
      <div class="mb-2">
        <label for="name" class="px-4 py-2">姓　　名<sup>*</sup>：</label>
        <VField
          id="name"
          type="text"
          class="form-control fs-6 fs-xl-5 rounded-0 border-0 px-4 py-2 py-xl-4 w-100 border-bottom border-secondary"
          placeholder="請輸入收件人姓名"
          name="姓名"
          :class="[
            errors['姓名']
              ? 'border-danger is-invalid bg-danger bg-opacity-25'
              : 'border-secondary',
          ]"
          v-model="form.user.name"
          rules="required"
        />
        <ErrorMessage name="姓名" class="invalid-feedback ps-4"></ErrorMessage>
      </div>
      <div class="mb-2">
        <label for="tel" class="px-4 py-2">連絡電話<sup>*</sup>：</label>
        <VField
          id="tel"
          type="tel"
          class="form-control fs-6 fs-xl-5 rounded-0 border-0 px-4 py-2 py-xl-4 w-100 border-bottom border-secondary"
          placeholder="請輸入收件人電話"
          name="連絡電話"
          :class="[
            errors['連絡電話']
              ? 'border-danger is-invalid bg-danger bg-opacity-25'
              : 'border-secondary',
          ]"
          v-model="form.user.tel"
          :rules="{ regex: /^(09)[0-9]{8}$/, required: true }"
        />
        <ErrorMessage
          name="連絡電話"
          class="invalid-feedback ps-4"
        ></ErrorMessage>
      </div>
      <div class="mb-2">
        <label for="email" class="px-4 py-2">電子郵件<sup>*</sup>：</label>
        <VField
          id="email"
          type="email"
          class="form-control fs-6 fs-xl-5 rounded-0 border-0 px-4 py-2 py-xl-4 w-100 border-bottom border-secondary"
          placeholder="請輸入收件人email"
          name="電子郵件"
          :class="[
            errors['電子郵件']
              ? 'border-danger is-invalid bg-danger bg-opacity-25'
              : 'border-secondary',
          ]"
          v-model="form.user.email"
          rules="email|required"
        />
        <ErrorMessage
          name="電子郵件"
          class="invalid-feedback ps-4"
        ></ErrorMessage>
      </div>
      <div class="mb-2">
        <label for="address" class="px-4 py-2">收件地址<sup>*</sup>：</label>
        <VField
          id="address"
          type="text"
          class="form-control fs-6 fs-xl-5 rounded-0 border-0 px-4 py-2 py-xl-4 w-100 border-bottom border-secondary"
          placeholder="請輸入收件人地址"
          name="收件地址"
          :class="[
            errors['收件地址']
              ? 'border-danger is-invalid bg-danger bg-opacity-25'
              : 'border-secondary',
          ]"
          v-model="form.user.address"
          rules="required"
        />
        <ErrorMessage
          name="收件地址"
          class="invalid-feedback ps-4"
        ></ErrorMessage>
      </div>
      <div class="mb-4">
        <label for="note" class="px-4 py-2 d-block">備註：</label>
        <textarea
          class="resize-none border-secondary rounded-2 bg-transparent outline-none py-2 px-4 w-100"
          rows="5"
          v-model="form.message"
        ></textarea>
      </div>
      <div>
        <VField
          type="checkbox"
          id="read"
          value="checked"
          class="form-check-input w-2 h-2 border-secondary me-2 mt-0"
          :class="{ 'is-invalid': errors['閱讀須知'] }"
          name="閱讀須知"
          v-model="form.read"
          :rules="isRead"
        />
        <label for="read" class="fw-normal"
          >我已閱讀並接受二搜書 須知與條款</label
        >
        <ErrorMessage
          name="閱讀須知"
          class="invalid-feedback ps-6"
        ></ErrorMessage>
      </div>
      <div class="btn-submit mt-8 text-center sticky-bottom pb-lg-5">
        <Button :text="'送出訂單'">submit</Button>
      </div>
    </VForm>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import useOrdersStore from "@/stores/orders.js";
import Button from "@/components/front/Button.vue";

export default {
  components: { Button },
  data() {
    return {
      form: {
        user: {},
        message: "",
      },
    };
  },
  computed: {
    ...mapState(useOrdersStore, ["orderId"]),
  },
  methods: {
    ...mapActions(useOrdersStore, ["postOrderInfo"]),
    isRead(value) {
      if (!value || !value?.length) return "請閱讀須知與條款";
      return true;
    },
    async sendOrder() {
      await this.postOrderInfo(this.form);
      this.$router.push(`/bookstore/cart/order_pay/${this.orderId}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-submit {
  margin-left: -32px;
  margin-right: -32px;
}
</style>
