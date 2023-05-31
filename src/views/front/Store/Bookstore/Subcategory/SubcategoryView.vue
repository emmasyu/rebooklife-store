<template>
  <div class="py-8 pb-lg-10 d-flex flex-wrap gap-9">
    <div class="text-primary" v-for="book in productsOfSubcategory">
      <BookCard :book="book" />
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import useProductsStore from "@/stores/products.js";
import BookCard from "@/components/front/BookCard.vue";

export default {
  components: { BookCard },
  data() {
    return {
      currentCategory: this.$route.params.category,
      currentSubcategory: this.$route.params.subcategory,
    };
  },
  computed: {
    ...mapState(useProductsStore, ["productsAll", "productsOfFeatured"]),
    productsOfSubcategory() {
      if (this.currentCategory === "all") {
        return Object.values(this.productsOfFeatured).find(
          (item) => item.name === this.currentSubcategory
        ).books;
      }
      return this.productsAll?.filter(
        (book) => book.subcategory === this.currentSubcategory
      );
    },
  },
};
</script>
