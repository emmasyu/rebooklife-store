<template>
  <div
    class="modal modal-xl fade"
    id="productModal"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
    ref="modal"
    @click="closeCategorySelect"
    @click.self="defaultModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header justify-content-end">
          <h5
            class="modal-title fs-5 text-primary w-100 text-center fw-bold"
            id="productModalLabel"
          >
            {{ isNewProduct ? "新增書籍" : "編輯書籍" }}
          </h5>
          <button
            type="button"
            class="btn-close ms-0"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click.prevent="defaultModal"
          ></button>
        </div>
        <div class="modal-body d-flex px-8 pt-7 gap-8">
          <div class="w-13">
            <h6 class="fw-bold text-primary mb-4">上傳封面：</h6>
            <select
              class="form-select text-center w-13 fs-5 text-primary fw-bold mb-7"
              aria-label="Default select example"
              v-model="uploadMethod"
            >
              <option selected value="upload">上傳圖片</option>
              <option value="imageUrl">圖片網址</option>
            </select>
            <div class="text-center mb-8" v-show="uploadMethod === 'upload'">
              <label for="formFile" class="btn btn-outline-primary w-11"
                >上傳圖片</label
              >
              <input
                type="file"
                id="formFile"
                class="d-none"
                ref="fileInput"
                @change="uploadFile"
              />
            </div>
            <div class="mb-8" v-show="uploadMethod === 'imageUrl'">
              <div
                class="d-flex align-items-center border-bottom border-secondary px-5 py-4"
              >
                <label class="text-primary fw-bold w-10" for="imageUrl"
                  >圖片網址：</label
                >
                <input
                  class="form-control rounded-0 p-0"
                  type="text"
                  id="imageUrl"
                  placeholder="請輸入圖片網址"
                  required
                  v-model="productForm.imageUrl"
                />
              </div>
            </div>
            <div class="text-center">
              <img
                :src="productForm.imageUrl"
                :alt="productForm.title"
                class="rounded-2 w-11 shadow mb-4"
              />
            </div>
          </div>
          <div>
            <div v-show="editContent === 'baseIntro'">
              <div class="mb-7">
                <div class="d-flex">
                  <div
                    class="d-flex align-items-center border-bottom border-secondary px-5 py-4 me-4"
                  >
                    <label class="text-primary fw-bold w-10" for="category"
                      >分類<sup>*</sup>：</label
                    >
                    <input
                      class="form-control rounded-0 p-0"
                      type="text"
                      id="category"
                      placeholder="請輸入產品分類"
                      required
                      v-model="productForm.category"
                    />
                    <div class="position-relative">
                      <font-awesome-icon
                        class="text-primary position-relative cursor-pointer"
                        :icon="['fas', 'caret-down']"
                        @click.stop="toggleCategory"
                      />
                      <div
                        v-show="isOpenCategory"
                        class="list-group position-absolute end-0 w-10"
                      >
                        <a
                          v-for="item in Object.keys(category)"
                          href="#"
                          class="list-group-item list-group-item-action text-center"
                          :class="{ active: productForm.category === item }"
                          @click.prevent="selectCategory(item)"
                        >
                          {{ item }}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    class="d-flex align-items-center border-bottom border-secondary px-5 py-4"
                  >
                    <label class="text-primary fw-bold w-10" for="subcategory"
                      >子分類<sup></sup>：</label
                    >
                    <input
                      class="form-control rounded-0 p-0"
                      type="text"
                      id="subcategory"
                      placeholder="請輸入子分類"
                      required
                      v-model="productForm.subcategory"
                    />
                    <div class="position-relative">
                      <font-awesome-icon
                        class="text-primary position-relative cursor-pointer"
                        :icon="['fas', 'caret-down']"
                        @click.stop="toggleSubcategory"
                      />
                      <div
                        v-show="isOpenSubcategory"
                        class="list-group position-absolute end-0 w-10"
                      >
                        <a
                          v-if="productForm.category"
                          v-for="item in category[productForm.category]"
                          href="#"
                          class="list-group-item list-group-item-action text-center"
                          :class="{ active: productForm.subcategory === item }"
                          @click.prevent="selectSubcategory(item)"
                        >
                          {{ item }}
                        </a>
                        <a
                          v-else
                          class="list-group-item list-group-item-action text-center disabled"
                          >請先選擇分類</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="d-flex align-items-center border-bottom border-secondary px-5 py-4"
                >
                  <label class="text-primary fw-bold w-8" for="title"
                    >書名<sup>*</sup>：</label
                  >
                  <input
                    class="form-control rounded-0 p-0"
                    type="text"
                    id="title"
                    placeholder="請輸入書籍名稱"
                    required
                    v-model="productForm.title"
                  />
                </div>
                <div class="d-flex">
                  <div
                    class="d-flex align-items-center border-bottom border-secondary px-5 py-4 me-4"
                  >
                    <label class="text-primary fw-bold w-10" for="author"
                      >作者：</label
                    >
                    <input
                      class="form-control rounded-0 p-0"
                      type="text"
                      id="author"
                      placeholder="請輸入作者"
                      required
                      v-model="productForm.author"
                    />
                  </div>

                  <div
                    class="d-flex align-items-center border-bottom border-secondary px-5 py-4"
                  >
                    <label class="text-primary fw-bold w-10" for="ISBN"
                      >ISBN：</label
                    >
                    <input
                      class="form-control rounded-0 p-0"
                      type="number"
                      id="ISBN"
                      placeholder="請輸入ISBN"
                      required
                      v-model="productForm.ISBN"
                    />
                  </div>
                </div>
                <div class="d-flex">
                  <div
                    class="d-flex align-items-center border-bottom border-secondary px-5 py-4 me-4"
                  >
                    <label class="text-primary fw-bold w-10" for="publishing"
                      >出版社：</label
                    >
                    <input
                      class="form-control rounded-0 p-0"
                      type="text"
                      id="publishing"
                      placeholder="請輸入出版社"
                      required
                      v-model="productForm.publishing"
                    />
                  </div>
                  <div
                    class="d-flex align-items-center border-bottom border-secondary px-5 py-4"
                  >
                    <label
                      class="text-primary fw-bold w-10"
                      for="publication_year"
                      >出版年份：</label
                    >
                    <input
                      class="form-control rounded-0 p-0"
                      type="number"
                      id="publication_year"
                      placeholder="請輸入出版年份"
                      required
                      v-model="productForm.publication_year"
                    />
                  </div>
                </div>
                <div class="d-flex">
                  <div
                    class="d-flex align-items-center border-bottom border-secondary px-5 py-4 me-4"
                  >
                    <label class="text-primary fw-bold w-10" for="qty"
                      >庫存：</label
                    >
                    <input
                      class="form-control rounded-0 p-0"
                      type="number"
                      id="qty"
                      placeholder="請輸入產品數量"
                      required
                      v-model.number="productForm.qty"
                    />
                  </div>
                  <div
                    class="d-flex align-items-center border-bottom border-secondary px-5 py-4"
                  >
                    <label class="text-primary fw-bold w-10" for="unit"
                      >單位：</label
                    >
                    <input
                      class="form-control rounded-0 p-0"
                      type="text"
                      id="unit"
                      placeholder="請輸入單位"
                      required
                      v-model.number="productForm.unit"
                    />
                  </div>
                </div>
                <div class="d-flex">
                  <div
                    class="d-flex align-items-center border-bottom border-secondary px-5 py-4 me-4"
                  >
                    <label class="text-primary fw-bold w-10" for="origin_price"
                      >原價<sup>*</sup>：</label
                    >
                    <input
                      class="form-control rounded-0 p-0"
                      type="number"
                      id="origin_price"
                      placeholder="請輸入產品原價"
                      required
                      v-model.number="productForm.origin_price"
                    />
                  </div>
                  <div
                    class="d-flex align-items-center border-bottom border-secondary px-5 py-4"
                  >
                    <label class="text-primary fw-bold w-10" for="price"
                      >售價<sup>*</sup>：</label
                    >
                    <input
                      class="form-control rounded-0 p-0"
                      type="number"
                      id="price"
                      placeholder="請輸入產品售價"
                      required
                      v-model.number="productForm.price"
                    />
                  </div>
                </div>
              </div>
              <input
                class="form-check-input cursor-pointer"
                type="checkbox"
                id="is_enabled"
                v-model="productForm.is_enabled"
                :true-value="1"
                :false-value="0"
              />
              <label
                for="is_enabled"
                class="text-primary fw-bold ms-4 cursor-pointer"
                >是否上架</label
              >
            </div>
            <div v-show="editContent === 'detail'">
              <div class="mb-7">
                <label class="text-primary fw-bold mb-4" for="book_intro"
                  >書籍簡介：</label
                >
                <textarea
                  class="form-control border border-secondary rounded-0 px-5 py-3 h-11"
                  type="text"
                  id="book_intro"
                  placeholder="請輸入簡介內容"
                  required
                  v-model="productForm.book_intro"
                />
              </div>
              <div class="mb-7">
                <label class="text-primary fw-bold mb-4" for="book_chapter"
                  >書籍簡介：</label
                >
                <textarea
                  class="form-control border border-secondary rounded-0 px-5 py-3 h-11"
                  type="text"
                  id="book_chapter"
                  placeholder="請輸入書籍章節"
                  required
                  v-model="productForm.book_chapter"
                />
              </div>
            </div>
            <div class="d-flex justify-content-end my-8">
              <button
                type="button"
                class="btn rounded-0 fw-bold px-11 me-5"
                :class="{
                  'btn-primary': editContent === 'baseIntro',
                  'btn-outline-primary': editContent === 'detail',
                }"
                @click.prevent="
                  () => {
                    editContent = 'baseIntro';
                  }
                "
              >
                基本資訊
              </button>
              <button
                type="button"
                class="btn rounded-0 fw-bold px-11"
                :class="{
                  'btn-primary': editContent === 'detail',
                  'btn-outline-primary': editContent === 'baseIntro',
                }"
                @click.prevent="
                  () => {
                    editContent = 'detail';
                  }
                "
              >
                詳細內容
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer p-0">
          <button
            type="button"
            class="btn btn-primary w-100 fs-4"
            @click.prevent="updateProduct"
          >
            {{ isNewProduct ? "確認新增" : "確認修改" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { admin } from "@/api";
import modalMixin from "../mixins/modalMixin";
const { postUpload } = admin;

export default {
  props: ["tempProduct", "category", "isNewProduct"],

  data() {
    return {
      uploadMethod: "upload",
      editContent: "baseIntro",
      productForm: {},
      isOpenCategory: false,
      isOpenSubcategory: false,
    };
  },
  watch: {
    tempProduct() {
      this.productForm = { ...this.tempProduct };
    },
    "productForm.category": function (newCategory, oldCategory) {
      if (oldCategory && newCategory !== oldCategory) {
        this.productForm.subcategory = "";
      }
    },
  },
  methods: {
    async uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      console.log(formData);
      try {
        const response = await postUpload(formData);
        console.log("uploadFile", response);
        this.tempProduct.imageUrl = response.data.imageUrl;
      } catch (error) {
        console.log(error);
      }
    },
    updateProduct() {
      this.$emit("update-product", this.productForm);
      this.defaultModal();
    },
    defaultModal() {
      this.uploadMethod = "upload";
      this.editContent = "baseIntro";
      this.productForm = {};
    },
    toggleCategory() {
      this.isOpenCategory = !this.isOpenCategory;
      this.isOpenSubcategory = false;
    },
    toggleSubcategory() {
      this.isOpenSubcategory = !this.isOpenSubcategory;
      this.isOpenCategory = false;
    },
    closeCategorySelect() {
      this.isOpenCategory = false;
      this.isOpenSubcategory = false;
    },
    selectCategory(item) {
      this.productForm.category = item;
      this.isOpenCategory = false;
    },
    selectSubcategory(item) {
      this.productForm.subcategory = item;
      this.isOpenSubcategory = false;
    },
  },
  mixins: [modalMixin],
};
</script>
