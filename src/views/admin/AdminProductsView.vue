<template>
  <div class="w-100 p-8">
    <div class="d-flex justify-content-between align-items-center mb-7">
      <select
        class="form-select text-center w-13"
        aria-label="Default select example"
        v-model="category"
      >
        <option selected :value="null">全部分類</option>
        <option
          v-for="item in Object.keys(productsCategory)"
          :key="item"
          :value="item"
        >
          {{ item }}
        </option>
      </select>
      <p>
        <a
          @click.prevent="openProductModal(true)"
          class="btn btn-outline-primary"
          href="/products"
          >+ 新增產品</a
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
            <th class="w-7">上架</th>
            <th class="w-12">分類</th>
            <th>書名</th>
            <th class="w-7">數量</th>
            <th class="w-7">原價</th>
            <th class="w-7">售價</th>
            <th class="w-7">編輯</th>
          </tr>
        </thead>
        <tbody class="text-primary fs-5">
          <tr v-for="item in filterProductsOnPage" :key="item.id">
            <td class="text-center">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                :checked="item.is_enabled === 1"
                disabled
              />
            </td>
            <td>{{ item.category }} / {{ item.subcategory }}</td>
            <td>{{ item.title }}</td>
            <td class="text-center">{{ item.qty }}</td>
            <td class="text-end">
              ${{ $filters.thousandSeparator(item.origin_price) }}
            </td>
            <td class="text-end">
              ${{ $filters.thousandSeparator(item.price) }}
            </td>
            <td class="text-center">
              <FontAwesomeIcon
                icon="fa-solid fa-pen-to-square cursor-pointer"
                class="me-3"
                @click="openProductModal(false, item)"
              />
              <FontAwesomeIcon
                icon="fa-solid fa-trash"
                class="cursor-pointer"
                @click="openDeleteProductModal(item)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pages="pagination" @emit-pages="switchPage" />
  </div>

  <ProductModal
    ref="productModal"
    :temp-product="tempProduct"
    :category="productsCategory"
    :isNewProduct="isNewProduct"
    @update-product="updateProduct"
  />
  <DeleteModal
    ref="deleteModal"
    :temp-product="tempProduct"
    @del-item="deleteProduct"
  />
</template>

<script>
import { mapState, mapActions } from "pinia";
import useAdminProductsStore from "@/stores/adminProducts.js";
import ProductModal from "@/components/admin/ProductModal.vue";
import DeleteModal from "@/components/admin/DeleteModal.vue";
import Pagination from "@/components/global/Pagination.vue";

export default {
  components: {
    ProductModal,
    DeleteModal,
    Pagination,
  },
  data() {
    return {
      category: null,
      tempProduct: {},
      isNewProduct: false,
      filterCurrentPage: 1,
      filterAllProducts: [],
    };
  },
  computed: {
    ...mapState(useAdminProductsStore, ["productsAll", "productsCategory"]),
    filterProductsOnPage() {
      this.filterAllProducts = (
        this.category === null
          ? [...this.productsAll]
          : this.productsAll.filter((item) => item.category === this.category)
      ).reverse();
      return this.filterAllProducts.filter(
        (item, index) =>
          index >= 10 * this.filterCurrentPage - 10 &&
          index < 10 * this.filterCurrentPage
      );
    },
    pagination() {
      return {
        total_pages: Math.ceil(this.filterAllProducts.length / 10),
        current_page: this.filterCurrentPage,
        has_pre: this.filterCurrentPage > 1,
        has_next:
          this.filterCurrentPage <
          Math.ceil(this.filterAllProducts.length / 10),
      };
    },
  },
  watch: {
    category() {
      this.filterCurrentPage = 1;
    },
  },
  methods: {
    ...mapActions(useAdminProductsStore, [
      "getProductsAll",
      "postNewProduct",
      "putUpdateProduct",
      "deleteOneProduct",
    ]),
    openProductModal(isNewProduct, item) {
      if (isNewProduct) {
        this.tempProduct = { unit: "本" };
      } else {
        this.tempProduct = { ...item };
      }
      this.isNewProduct = isNewProduct;
      this.$refs.productModal.showModal();
    },
    openDeleteProductModal(item) {
      this.tempProduct = item;
      this.$refs.deleteModal.showModal();
    },
    async updateProduct(item) {
      if (this.isNewProduct) {
        await this.postNewProduct(item);
      } else {
        await this.putUpdateProduct(item);
      }
      this.filterCurrentPage = 1;
      this.$refs.productModal.hideModal();
    },
    async deleteProduct() {
      await this.deleteOneProduct(this.tempProduct);
      this.filterCurrentPage = 1;
      this.$refs.deleteModal.hideModal();
    },
    switchPage(page) {
      this.filterCurrentPage = page;
    },
  },
  created() {
    this.getProductsAll();
  },
};
</script>
