<template>
  <div :style="{ height: totalContentHight + 'px' }">
    <transition>
      <div v-if="y > 95" class="h-100 bg-black bg-opacity-50 bg-blur"></div>
    </transition>
  </div>
  <div
    class="text-white position-absolute top-0 w-100 px-sm-11 px-md-12 ps-lg-13 ps-xxl-14"
    ref="content"
  >
    <div
      id="home"
      class="vh-100 d-flex flex-column justify-content-end align-items-end"
    >
      <div class="ps-6 w-13 me-8">
        <p class="typewriter mb-4">在一個不起眼的角落裡...</p>
        <p class="typewriter mb-11 ms-8">翻出了當初對這本書的熱情</p>
      </div>
    </div>
    <div
      id="about"
      class="min-vh-100 pt-11 pb-8 px-3 vstack justify-content-center"
    >
      <div class="d-flex align-items-center mb-4 mb-lg-8 align-self-start">
        <img
          src="@/assets/images/search-white.png"
          alt="about"
          class="w-2 mx-3"
        />
        <h2 class="fs-3 fw-bold">關於二搜書</h2>
        <img src="@/assets/images/about-decoration-line.png" class="ms-3" />
      </div>
      <div
        class="d-xl-flex flex-row-reverse justify-content-around align-items-center"
      >
        <div class="image pe-3 mb-8 col-xl-4">
          <img
            src="@/assets/images/book1-img-index.jpg"
            alt="book"
            class="object-fit-cover w-100 h-11 h-xl-100 rounded rounded-xl-diagonal"
          />
        </div>
        <div class="px-4 mb-8 col-xl-7">
          <p class="fs-6 mb-5 fs-md-5 text-indent-small text-indent-lg-base">
            二搜書是關於重新活化舊書的故事。為了讓書本重新流通，讓更多人能夠擁有優質的閱讀體驗，同時也是為了保護環境，減少浪費。我們相信每本書都有其獨特的價值，並且應該被重新發掘和利用。
          </p>
          <p class="fs-6 mb-5 fs-md-5 text-indent-small text-indent-lg-base">
            平台提供了一個便利的地方，讓書籍的擁有者能夠輕鬆地賣出他們不再需要的書籍，並且讓買家能夠輕鬆地尋找到他們想要的書。所有的書籍都經過嚴格的檢查，確保質量和完整性。
          </p>
          <p class="fs-6 mb-5 fs-md-5 text-indent-small text-indent-lg-base">
            我們希望創建一個推動文化和知識傳播的社區。不定期舉辦各種活動，如講座和圖書討論會，讓人們能夠分享他們的愛書經驗和知識。
          </p>
          <p class="fs-6 fs-md-5 text-indent-small text-indent-lg-base">
            目標是打造一個綠色、文化和知識傳播的電商平台，並且讓書籍得到更好的流通和利用。
          </p>
        </div>
      </div>
    </div>
    <div
      id="faq"
      class="min-vh-100 pt-11 pb-8 px-3 vstack justify-content-center"
    >
      <div class="d-flex align-items-center mb-4 mb-lg-8 align-self-start">
        <img
          src="@/assets/images/search-white.png"
          alt="faq"
          class="w-2 mx-3"
        />
        <h2 class="fs-3 fw-bold">常見問題</h2>
        <img src="@/assets/images/FAQ-decoration-line.png" class="ms-3" />
      </div>
      <div
        class="d-xl-flex flex-row-reverse justify-content-around align-items-center"
      >
        <div class="image pe-3 mb-8 col-xl-4">
          <img
            src="@/assets/images/book2-img-index.jpg"
            alt="book"
            class="object-fit-cover w-100 h-11 h-xl-100 rounded rounded-xl-diagonal"
          />
        </div>
        <div class="px-4 fs-6 fs-md-5 col-xl-7" id="accordion" ref="collapse">
          <HomeFAQ
            v-for="(faq, i) in faqs"
            :key="i"
            :faq="faq"
            @click="toggleCollapse"
          />
        </div>
      </div>
    </div>
    <div
      id="contact"
      class="min-vh-100 pt-11 pb-8 px-3 vstack justify-content-center"
    >
      <div class="d-flex align-items-center mb-4 mb-lg-8 align-self-start">
        <img
          src="@/assets/images/search-white.png"
          alt="contact"
          class="w-2 mx-3"
        />
        <h2 class="fs-3 fw-bold">聯絡二搜書</h2>
        <img src="@/assets/images/contact-decoration-line.png" class="ms-3" />
      </div>
      <div class="d-xl-flex justify-content-around">
        <div
          class="bg-decoration fs-6 fs-md-5 p-4 mb-9 w-xl-50 position-relative"
        >
          <p class="mb-4">
            電話：<a
              class="text-white text-decoration-underline-hover"
              href="tel:"
              >04 - 12345678</a
            >
          </p>
          <p class="mb-4">
            信箱：<a
              class="text-white text-decoration-underline-hover"
              href="mailto:"
              >re-book-life@email.com</a
            >
          </p>
          <p class="mb-4">地址：一個很棒很棒很棒的地方</p>
          <p class="mb-4">Line : @rebooklife_234</p>
          <div class="d-flex align-items-start">
            <p>營業時間：</p>
            <p>
              周一至周五<br />
              09:00 ~ 12:00 <br />
              13:00 ~ 18:00 <br />
              假日與國定假日公休
            </p>
          </div>
        </div>
        <div class="image pe-3 col-xl-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d465742.30048184056!2d120.62622884892619!3d24.220374621118435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346917dff97922ef%3A0x87523ee47ea6447f!2z5Y-w5Lit5biC!5e0!3m2!1szh-TW!2stw!4v1682191399186!5m2!1szh-TW!2stw"
            width="480"
            height="600"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="object-fit-cover w-100 h-11 h-xl-100 rounded rounded-xl-diagonal"
            alt="book"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import collapseMixin from "@/components/mixins/collapseMixin.js";
import HomeFAQ from "./HomeFAQ.vue";
import { useWindowScroll } from "@vueuse/core";
import { mapActions } from "pinia";
import useScrollStateStore from "@/stores/scrollState.js";

export default {
  components: { HomeFAQ },
  data() {
    return {
      y: useWindowScroll().y,
      totalContentHight: 0,
      faqs: [
        {
          question: "如果買到有瑕疵不滿意，該如何處理？",
          answer:
            "如遇商品有瑕疵，請將書本包裝一起寄回，並附上瑕疵與問題說明，即可安排退款。退款流程需等待幾天的時間，請買家耐心等候，非常感謝您的支持！",
          isExpanded: "false",
        },
        {
          question: "請問出貨與到貨時間為多少工作天？",
          answer:
            "下單付款後下一個工作日出貨，出貨後宅配約 1 ~ 2 工作天到貨。超商取貨付款約出貨後 2 ~ 3 工作天到貨。",
          isExpanded: "false",
        },
        {
          question: "我想賣我的二手書籍，該如何操作？",
          answer:
            "可以透過郵寄貨運寄送至二搜書服務地址，並在箱內附上您的聯絡資訊，二搜書收到並完成估價後主動聯繫您並轉帳給您。或是至二搜書服務地址，現場為您估價，感謝您的分享！",
          isExpanded: "false",
        },
        {
          question: "我有其他問題？",
          answer:
            "如有其他二搜書相關問題，歡迎 mail 或是來電詢問。謝謝您的支持！",
          isExpanded: "false",
        },
      ],
    };
  },
  methods: {
    ...mapActions(useScrollStateStore, ["getContentTop"]),
    toggleCollapse() {
      Array.from(this.$refs.collapse.children).forEach((e, i) => {
        this.faqs[i].isExpanded = e.children[0].ariaExpanded;
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.totalContentHight =
        this.$refs.content?.getBoundingClientRect().height;
      this.getContentTop(this.$refs.content);
    });
  },
  mixins: [collapseMixin],
};
</script>

<style lang="scss" scoped>
.bg-blur {
  backdrop-filter: blur(10px);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
.typewriter {
  overflow: hidden;
  white-space: nowrap;
  animation: typewriter 2s steps(12, end) 1s 1 normal both,
    animated-cursor 600ms steps(12, end) 0s 5.5;
}
.typewriter:last-child {
  animation-delay: 3s, 3s;
  animation-iteration-count: 1, infinite;
}

@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 231px;
  }
}

@keyframes animated-cursor {
  from {
    border-right: solid 3px rgba(255, 255, 255, 0.75);
  }
  to {
    border-right-color: transparent;
  }
}
.rounded-xl-diagonal {
  @media (min-width: 1200px) {
    border-radius: 0 8rem 0 8rem !important;
  }
}

.image {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: calc(100% - 12px);
    height: 100%;
    border: 1px solid #fff;
    border-radius: 10px;
    top: 12px;
    left: 12px;
    clip-path: polygon(
      calc(100% - 12px) 0,
      100% 0,
      100% 100%,
      0 100%,
      0 calc(100% - 12px),
      calc(100% - 12px) calc(100% - 12px)
    );
    @media (min-width: 1200px) {
      border-radius: 0 8rem 0 8rem;
      top: 30px;
      left: 20px;
      clip-path: polygon(
        calc(100% - 32px) 0,
        100% 0,
        100% 100%,
        0 100%,
        0 calc(100% - 75px),
        calc(100% - 32px) calc(100% - 75px)
      );
    }
  }
}

.bg-decoration::after {
  content: "";
  position: absolute;
  background-image: url(@/assets/images/contact-decoration-line2.png);
  background-position-x: right;
  background-size: contain;
  background-repeat: no-repeat;
  width: calc(100% - 70px);
  height: 175px;
  top: 100px;
  @media (min-width: 768px) {
    top: 150px;
  }
}
</style>
