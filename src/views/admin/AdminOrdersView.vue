<template>
  <div class="w-100 p-8">
    <div class="d-flex justify-content-end align-items-center mb-7">
      <p>
        <a
          @click.prevent="openDeleteOrderModal({})"
          class="btn btn-outline-primary"
          href="#"
          >刪除所有訂單</a
        >
      </p>
    </div>
    <div
      class="px-7 py-2 mb-8 overflow-auto border border-primary border-dashed rounded-5"
      style="height: 640px"
    >
      <table class="table table-hover">
        <thead class="text-primary fs-4 text-center">
          <tr>
            <th class="w-9">付款狀態</th>
            <th class="w-9">訂單日期</th>
            <th>訂單商品</th>
            <th class="w-9">應付金額</th>
            <th class="w-9">出貨狀態</th>
            <th class="w-7">編輯</th>
          </tr>
        </thead>
        <tbody class="text-primary fs-5">
          <tr v-for="(item, index) in orders" :key="item.id">
            <td class="text-center">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                :checked="item.is_paid"
                disabled
              />
            </td>
            <td class="text-center">
              {{ $filters.convertTimeToLocaleDate(item.create_at) }}
            </td>
            <td>
              <p>
                共計 {{ item.totalQty }} 本
                <FontAwesomeIcon
                  class="text-primary position-relative cursor-pointer"
                  :icon="[
                    'fas',
                    isOpenOrderProducts[index] ? 'caret-down' : 'caret-right',
                  ]"
                  @click="toggleOrderProducts(index)"
                />
              </p>
              <ul
                v-show="isOpenOrderProducts[index]"
                class="mt-2 pt-2 border-top border-gray"
              >
                <li
                  v-for="(productItem, key) in item.products"
                  :key="key"
                  class="d-flex justify-content-between py-2"
                >
                  <p>{{ productItem.product.title }}</p>
                  <p class="text-nowrap">x{{ productItem.qty }}</p>
                </li>
              </ul>
            </td>
            <td class="text-end">
              $ {{ $filters.thousandSeparator(item.total) }}
            </td>
            <td class="text-center">{{ item.ship }}</td>
            <td class="text-center">
              <FontAwesomeIcon
                icon="fa-solid fa-eye"
                class="me-3 cursor-pointer"
                @click="openOrderModal(item)"
              />
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                class="cursor-pointer"
                @click="openDeleteOrderModal(item)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pages="pagination" @emit-pages="switchPage" />
  </div>

  <OrderModal
    ref="orderModal"
    :temp-order="tempOrder"
    @update-order="updateOrder"
  />
  <DeleteModal
    ref="deleteModal"
    :temp-order="tempOrder"
    @del-item="deleteOrder"
  />
</template>

<script>
import { mapState, mapActions } from "pinia";
import useAdminOrdersStore from "@/stores/adminOrders.js";
import OrderModal from "@/components/admin/OrderModal.vue";
import DeleteModal from "@/components/admin/DeleteModal.vue";
import Pagination from "@/components/global/Pagination.vue";

export default {
  components: {
    OrderModal,
    DeleteModal,
    Pagination,
  },
  data() {
    return {
      tempOrder: {},
      isOpenOrderProducts: [],
    };
  },
  computed: {
    ...mapState(useAdminOrdersStore, ["orders", "pagination"]),
  },
  watch: {
    orders() {
      this.orders.map((i) => this.isOpenOrderProducts.push(false));
    },
  },
  methods: {
    ...mapActions(useAdminOrdersStore, [
      "getOrders",
      "putUpdateOrder",
      "deleteOneOrder",
      "deleteAllPayOrders",
    ]),
    openOrderModal(item) {
      this.tempOrder = { ...item };
      this.$refs.orderModal.showModal();
    },
    openDeleteOrderModal(item) {
      this.tempOrder = { ...item };
      this.$refs.deleteModal.showModal();
    },
    async updateOrder(item) {
      await this.putUpdateOrder(item);
      this.$refs.orderModal.hideModal();
    },
    async deleteOrder() {
      if (this.tempOrder.user) {
        await this.deleteOneOrder(this.tempOrder);
      } else {
        await this.deleteAllPayOrders();
      }
      this.$refs.deleteModal.hideModal();
    },
    switchPage(page) {
      this.getOrders(page);
    },
    toggleOrderProducts(index) {
      this.isOpenOrderProducts[index] = !this.isOpenOrderProducts[index];
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
