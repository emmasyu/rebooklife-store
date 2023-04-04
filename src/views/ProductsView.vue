<template>
  <LoadingOverlay />
  <div class="w-100 p-8">
    <div class="d-flex justify-content-between align-items-center mb-7">
      <select
        class="form-select text-center w-13"
        aria-label="Default select example"
        v-model="category"
      >
        <option selected :value="null">全部分類</option>
        <option v-for="item in productsCategory" :value="item">
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
      class="px-7 py-2 mb-8 overflow-auto border-dashed"
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
          <tr v-for="item in filterProducts.pageProducts" :key="item.id">
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
            <td class="text-end">${{ item.origin_price }}</td>
            <td class="text-end">${{ item.price }}</td>
            <td class="text-center">
              <font-awesome-icon
                icon="fa-solid fa-pen-to-square"
                class="me-3"
                style="cursor: pointer"
                @click.prevent="openProductModal(false, item)"
              />
              <font-awesome-icon
                icon="fa-solid fa-trash"
                style="cursor: pointer"
                @click.prevent="openDeleteProductModal(item)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pages="filterProducts.pagination" @emit-pages="switchPage" />
  </div>

  <ProductModal
    ref="productModal"
    :temp-product="tempProduct"
    :category="productsCategory"
    :subcategory="productsSubcategory"
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
import useAdminProductsStore from "../stores/adminProducts.js";
import ProductModal from "../components/ProductModal.vue";
import DeleteModal from "../components/DeleteModal.vue";
import Pagination from "@/components/Pagination.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { deleteProduct } from "../api/admin";

export default {
  components: {
    ProductModal,
    DeleteModal,
    Pagination,
    LoadingOverlay,
  },
  data() {
    return {
      category: null,
      tempProduct: {},
      isNewProduct: false,
      filterCurrentPage: 1,
    };
  },
  computed: {
    ...mapState(useAdminProductsStore, [
      "productsAll",
      "productsCategory",
      "productsSubcategory",
      "pagination",
    ]),
    filterProducts() {
      let products;
      if (this.category === null) {
        products = [...this.productsAll];
      } else {
        products = this.productsAll.filter(
          (item) => item.category === this.category
        );
      }
      let pageProducts = [];
      products.reverse();
      products.forEach((item, index) => {
        if (
          index >= 10 * this.filterCurrentPage - 10 &&
          index < 10 * this.filterCurrentPage
        ) {
          pageProducts.push(item);
        }
      });
      let pagination = {
        total_pages: Math.ceil(products.length / 10),
        current_page: this.filterCurrentPage,
        has_pre: this.filterCurrentPage > 1,
        has_next: this.filterCurrentPage < Math.ceil(products.length / 10),
      };
      return {
        pageProducts,
        pagination,
      };
    },
  },
  watch: {
    productsAll() {
      this.filterCurrentPage = 1;
    },
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
    updateProduct(item) {
      if (this.isNewProduct) {
        this.postNewProduct(item);
      } else {
        this.putUpdateProduct(item);
      }
      this.$refs.productModal.hideModal();
    },
    deleteProduct() {
      this.deleteOneProduct(this.tempProduct);
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

<style scoped>
.border-dashed {
  border: 1px;
  border-style: dashed;
  border-radius: 30px;
}
</style>
