<template>
  <nav
    class="navbar navbar-expand-lg fixed-top navbar-dark w-lg-8 w-xxl-13 vh-lg-100"
  >
    <div class="container-fluid flex-lg-column h-75 px-2">
      <a class="navbar-brand mx-auto" href="#"
        ><img
          class="navbar-brand-logo align-baseline d-lg-block w-xxl-100 w-7 mb-lg-5"
          :src="logoPhoto"
          alt="rebooklife"
      /></a>
      <button
        class="navbar-toggler position-absolute top-0 end-0 border-0 mt-4 me-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="getCollapseBtn()"
        ref="collapseBtn"
      >
        <font-awesome-icon
          :icon="['fas', isExpanded === 'true' ? 'xmark' : 'bars']"
        />
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarNavAltMarkup"
        ref="collapse"
      >
        <div
          class="navbar-nav flex-lg-column align-items-center justify-content-center h-lg-auto fs-4"
        >
          <RouterLink
            v-for="(item, i) in navigationData"
            :key="item.name"
            class="nav-link d-flex align-items-center d-lg-block text-center position-relative"
            :class="{ active: isActive(item, i) }"
            aria-current="page"
            :to="item.bookmark"
            @click="hideCollapse()"
          >
            <img
              class="toggle-image"
              :src="newUrl(item.src)"
              :alt="item.name"
            />
            <img :src="newUrl(item.decoration)" class="d-lg-none mx-2" />
            <p class="toggle-text">{{ item.content }}</p>
          </RouterLink>
          <RouterLink
            class="nav-link link-light d-lg-none fs-5 mb-5 mt-10 float-horizon text-decoration-underline"
            to="/coupons"
            >前往領取優惠券</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import collapseMixin from "@/components/mixins/collapseMixin";
import navigationData from "@/data/navgation.json";
import { mapState } from "pinia";
import useScrollStateStore from "@/stores/scrollState.js";
import { useWindowSize } from "@vueuse/core";
import { useWindowScroll } from "@vueuse/core";

export default {
  setup() {
    const { width } = useWindowSize();
    const { y } = useWindowScroll();
    return { width, y };
  },
  data() {
    return {
      isExpanded: "false",
      navigationData: navigationData.navigation,
    };
  },
  computed: {
    ...mapState(useScrollStateStore, ["blockTopY"]),
    logoPhoto() {
      if (this.width < 992) {
        return new URL(
          `@/assets/images/rebooklife-logo-white.png`,
          import.meta.url
        ).href;
      } else {
        return new URL(
          `@/assets/images/rebooklife-index-logo-white.png`,
          import.meta.url
        ).href;
      }
    },
    newUrl() {
      return (url) => {
        return new URL(url, import.meta.url).href;
      };
    },
    isActive() {
      return (item, i) => {
        return (
          this.y <
            (this.blockTopY?.[this.navigationData[i + 1]?.name] -
              this.blockTopY?.about * 0.7 ||
              this.blockTopY?.[item.name] + this.blockTopY?.about) &&
          this.y > this.blockTopY?.[item.name] - this.blockTopY?.about * 0.7
        );
      };
    },
  },

  methods: {
    getCollapseBtn() {
      this.isExpanded = this.$refs.collapseBtn.ariaExpanded;
    },
  },

  mixins: [collapseMixin],
};
</script>

<style lang="scss" scoped>
.cover-blur::before {
  backdrop-filter: blur(10px);
}

.navbar {
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: -1;
  }
  .navbar-nav {
    height: calc(100vh - 73.7px);
  }
  .nav-link {
    padding: 16px;
    &.active {
      filter: sepia(1) hue-rotate(305deg) brightness(87%) saturate(61);
    }
  }
  .toggle-image {
    width: 40px;
  }
  @media (min-width: 992px) {
    .nav-link {
      height: 65px;
      padding: 10px;
      .toggle-image {
        display: none;
        width: 50px;
      }
      &:hover,
      &.active {
        padding: 0px;
        .toggle-text {
          display: none;
        }
        .toggle-image {
          display: inline-block;
        }
        transition: padding 0.5s;
      }
    }
  }
  @media (min-width: 1400px) {
    .nav-link {
      &::before {
        content: "";
        width: 40px;
        height: 2px;
        background-color: white;
        position: absolute;
        top: 30px;
        left: -50px;
      }
      &::after {
        content: "";
        width: 40px;
        height: 2px;
        background-color: white;
        position: absolute;
        top: 30px;
        right: -50px;
      }
    }
  }
}
.float-horizon::before {
  content: "→";
  display: inline-block;
  animation: float-horizon 0.5s ease-in-out infinite alternate;
}
@keyframes float-horizon {
  from {
    transform: translateX(0rem);
  }
  to {
    transform: translateX(-0.5rem);
  }
}
</style>
