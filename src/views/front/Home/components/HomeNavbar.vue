<template>
  <nav
    class="navbar navbar-expand-lg fixed-top navbar-dark w-lg-8 w-xxl-13 vh-lg-100"
  >
    <div class="container-fluid flex-lg-column h-75 px-2">
      <a class="navbar-brand mx-auto" href="#"
        ><img
          class="navbar-brand-logo d-block w-xxl-100 w-7"
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
        @click.prevent="getCollapseBtn"
        ref="collapseBtn"
      >
        <FontAwesomeIcon
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
            @click.prevent="hideCollapse"
          >
            <img
              class="toggle-image"
              :src="newUrl(item.name).image"
              :alt="item.name"
            />
            <img :src="newUrl(item.name).decoration" class="d-lg-none mx-2" />
            <p class="toggle-text">{{ item.content }}</p>
          </RouterLink>
          <RouterLink
            class="nav-link link-light d-lg-none fs-5 my-5 float-horizon text-decoration-underline"
            to="/coupons"
            >前往領取優惠券</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'pinia';
import { useWindowSize, useWindowScroll } from '@vueuse/core';
import collapseMixin from '@/components/mixins/collapseMixin';
import navigationData from '@/data/navgation.json';
import useScrollStateStore from '@/stores/scrollState';

export default {
  data() {
    return {
      isExpanded: 'false',
      navigationData: navigationData.navigation,
      width: useWindowSize().width,
      y: useWindowScroll().y,
    };
  },
  computed: {
    ...mapState(useScrollStateStore, ['blockTopY']),
    logoPhoto() {
      if (this.width < 992) {
        return new URL(
          '@/assets/images/rebooklife-logo-white.png',
          import.meta.url,
        ).href;
      }
      return new URL(
        '@/assets/images/rebooklife-index-logo-white.png',
        import.meta.url,
      ).href;
    },
    newUrl() {
      // eslint-disable-next-line consistent-return
      return (name) => {
        switch (name) {
          case 'about':
            return {
              image: new URL(
                '@/assets/images/openbook-white.png',
                import.meta.url,
              ).href,
              decoration: new URL(
                '@/assets/images/about-decoration-line.png',
                import.meta.url,
              ).href,
            };
          case 'faq':
            return {
              image: new URL('@/assets/images/FAQ-white.png', import.meta.url)
                .href,
              decoration: new URL(
                '@/assets/images/FAQ-decoration-line.png',
                import.meta.url,
              ).href,
            };
          case 'contact':
            return {
              image: new URL(
                '@/assets/images/location-white.png',
                import.meta.url,
              ).href,
              decoration: new URL(
                '@/assets/images/contact-decoration-line.png',
                import.meta.url,
              ).href,
            };
          case 'bookstore':
            return {
              image: new URL('@/assets/images/book-white.png', import.meta.url)
                .href,
              decoration: new URL(
                '@/assets/images/bookstore-decoration-line.png',
                import.meta.url,
              ).href,
            };
          case 'bookmark':
            return {
              image: new URL(
                '@/assets/images/bookmark-white.png',
                import.meta.url,
              ).href,
              decoration: new URL(
                '@/assets/images/bookmark-decoration-line.png',
                import.meta.url,
              ).href,
            };
          case 'shopping cart':
            return {
              image: new URL(
                '@/assets/images/shopping-cart-white.png',
                import.meta.url,
              ).href,
              decoration: new URL(
                '@/assets/images/shopping-cart-decoration-line.png',
                import.meta.url,
              ).href,
            };
          // no default
        }
      };
    },
    isActive() {
      return (item, i) => {
        const nextBlockTopY = this.blockTopY?.[this.navigationData[i + 1]?.name];
        const currentBlockTopY = this.blockTopY?.[item.name];
        const blockRange = this.blockTopY?.about;
        return this.y < (nextBlockTopY - blockRange * 0.7
          || currentBlockTopY + blockRange)
        && this.y > currentBlockTopY - blockRange * 0.7;
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
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: -1;
  }
  .navbar-nav {
    height: calc(100vh - 65px);
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
