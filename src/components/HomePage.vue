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
    <div class="vh-100 d-flex flex-column justify-content-end align-items-end">
      <div class="ps-6 w-13 me-8">
        <p class="typewriter mb-4">在一個不起眼的角落裡...</p>
        <p class="typewriter mb-8 ms-8">翻出了當初對這本書的熱情</p>
      </div>
    </div>
    <div
      id="about"
      class="min-vh-100 pt-11 px-3 d-flex flex-column justify-content-center"
    >
      <div class="d-flex align-items-center mb-4 mb-lg-8 align-self-start">
        <img
          src="../assets/images/search-white.png"
          alt="about"
          class="w-2 mx-3"
        />
        <h2 class="fs-3 fw-bold">關於二搜書</h2>
        <img src="../assets/images/about-decoration-line.png" class="ms-3" />
      </div>
      <div
        class="d-xl-flex flex-row-reverse justify-content-around align-items-center w-100"
      >
        <div class="pe-3 mb-8 w-xl-33">
          <img
            src="../assets/images/book1-img-index.jpg"
            alt="book"
            class="object-fit-cover w-100 h-11 h-xl-100 rounded rounded-xl-diagonal"
          />
        </div>
        <div class="px-4 mb-8 w-xl-50">
          <p class="fs-6 mb-5 fs-md-5">
            　　二搜書是關於重新活化舊書的故事。為了讓書本重新流通，讓更多人能夠擁有優質的閱讀體驗，同時也是為了保護環境，減少浪費。我們相信每本書都有其獨特的價值，並且應該被重新發掘和利用。
          </p>
          <p class="fs-6 mb-5 fs-md-5">
            　　平台提供了一個便利的地方，讓書籍的擁有者能夠輕鬆地賣出他們不再需要的書籍，並且讓買家能夠輕鬆地尋找到他們想要的書。所有的書籍都經過嚴格的檢查，確保質量和完整性。
          </p>
          <p class="fs-6 mb-5 fs-md-5">
            　　我們希望創建一個推動文化和知識傳播的社區。不定期舉辦各種活動，如講座和圖書討論會，讓人們能夠分享他們的愛書經驗和知識。
          </p>
          <p class="fs-6 fs-md-5">
            　　目標是打造一個綠色、文化和知識傳播的電商平台，並且讓書籍得到更好的流通和利用。
          </p>
        </div>
      </div>
    </div>
    <div
      id="FAQ"
      class="min-vh-100 pt-11 px-3 d-flex flex-column justify-content-center"
    >
      <div class="d-flex align-items-center mb-4 mb-lg-8 align-self-start">
        <img
          src="../assets/images/search-white.png"
          alt="FAG"
          class="w-2 mx-3"
        />
        <h2 class="fs-3 fw-bold">常見問題</h2>
        <img src="../assets/images/FAQ-decoration-line.png" class="ms-3" />
      </div>
      <div
        class="d-xl-flex flex-row-reverse justify-content-around align-items-center w-100"
      >
        <div class="pe-3 mb-8 w-xl-33">
          <img
            src="../assets/images/book2-img-index.jpg"
            alt="book"
            class="object-fit-cover w-100 h-11 h-xl-100 rounded rounded-xl-diagonal"
          />
        </div>
        <div
          class="px-4 mb-8 fs-6 fs-md-5 w-xl-50"
          id="accordion"
          ref="collapse"
        >
          <div class="border rounded px-2 py-3 mb-4">
            <div
              class="d-flex justify-content-between cursor-pointer"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              @click="toggleCollapse"
            >
              <h4 class="fs-6 fs-md-5 px-2 mb-0 lh-base pe-7">
                Q：如果買到有瑕疵不滿意，該如何處理？
              </h4>
              <font-awesome-icon
                class="fs-4 pe-2"
                :icon="[
                  'fas',
                  isExpandedFAQ[0] === 'true' ? 'caret-down' : 'caret-right',
                ]"
              />
            </div>
            <div id="collapseOne" data-bs-parent="#accordion" class="collapse">
              <hr />
              <p class="px-2">
                A：如遇商品有瑕疵，請將書本包裝一起寄回，並附上瑕疵與問題說明，即可安排退款。退款流程需等待幾天的時間，請買家耐心等候，非常感謝您的支持！
              </p>
            </div>
          </div>

          <div class="border rounded px-2 py-3 mb-4">
            <div
              class="d-flex justify-content-between cursor-pointer collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              @click="toggleCollapse"
            >
              <h4 class="fs-6 fs-md-5 px-2 mb-0 lh-base pe-7">
                Q：請問出貨與到貨時間為多少工作天？
              </h4>
              <font-awesome-icon
                class="fs-4 pe-2"
                :icon="[
                  'fas',
                  isExpandedFAQ[1] === 'true' ? 'caret-down' : 'caret-right',
                ]"
              />
            </div>
            <div id="collapseTwo" data-bs-parent="#accordion" class="collapse">
              <hr />
              <p class="px-2">
                A：下單付款後下一個工作日出貨，出貨後宅配約 1 ~ 2
                工作天到貨。超商取貨付款約出貨後 2 ~ 3 工作天到貨。
              </p>
            </div>
          </div>

          <div class="border rounded px-2 py-3 mb-4">
            <div
              class="d-flex justify-content-between cursor-pointer collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
              @click="toggleCollapse"
            >
              <h4 class="fs-6 fs-md-5 px-2 mb-0 lh-base pe-7">
                Q：我想賣我的二手書籍，該如何操作？
              </h4>
              <font-awesome-icon
                class="fs-4 pe-2"
                :icon="[
                  'fas',
                  isExpandedFAQ[2] === 'true' ? 'caret-down' : 'caret-right',
                ]"
              />
            </div>
            <div
              id="collapseThree"
              data-bs-parent="#accordion"
              class="collapse"
            >
              <hr />
              <p class="px-2">
                A：可以透過郵寄貨運寄送至二搜書服務地址，並在箱內附上您的聯絡資訊，二搜書收到並完成估價後主動聯繫您並轉帳給您。或是至二搜書服務地址，現場為您估價，感謝您的分享！
              </p>
            </div>
          </div>

          <div class="border rounded px-2 py-3 mb-4">
            <div
              class="d-flex justify-content-between cursor-pointer collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
              @click="toggleCollapse"
            >
              <h4 class="fs-6 fs-md-5 px-2 mb-0 lh-base pe-7">
                Q：我有其他問題？
              </h4>
              <font-awesome-icon
                class="fs-4 pe-2"
                :icon="[
                  'fas',
                  isExpandedFAQ[3] === 'true' ? 'caret-down' : 'caret-right',
                ]"
              />
            </div>
            <div id="collapseFour" data-bs-parent="#accordion" class="collapse">
              <hr />
              <p class="px-2">
                A：如有其他二搜書相關問題，歡迎 mail
                或是來電詢問。謝謝您的支持！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="contact"
      class="min-vh-100 pt-11 pb-8 px-3 d-flex flex-column justify-content-center"
    >
      <div class="d-flex align-items-center mb-4 mb-lg-8 align-self-start">
        <img
          src="../assets/images/search-white.png"
          alt="contact"
          class="w-2 mx-3"
        />
        <h2 class="fs-3 fw-bold">聯絡二搜書</h2>
        <img src="../assets/images/contact-decoration-line.png" class="ms-3" />
      </div>
      <div class="d-xl-flex justify-content-around w-100">
        <div class="fs-6 fs-md-5 p-4 mb-9 w-xl-50 position-relative">
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
          <p class="mb-4">Line：@rebooklife_234</p>
          <p>營業時間：周一至周五</p>
          <p>　　　　　09:00 ~ 12:00</p>
          <p>　　　　　13:00 ~ 18:00</p>
          <p>　　　　　假日與國定假日公休</p>
        </div>
        <div class="pe-3 w-xl-33">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d465742.30048184056!2d120.62622884892619!3d24.220374621118435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346917dff97922ef%3A0x87523ee47ea6447f!2z5Y-w5Lit5biC!5e0!3m2!1szh-TW!2stw!4v1682191399186!5m2!1szh-TW!2stw"
            style="border: 0"
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
import collapseMixin from "./mixins/collapseMixin.js";
import { useWindowScroll } from "@vueuse/core";
const { y } = useWindowScroll();

export default {
  data() {
    return {
      y,
      isExpandedFAQ: [false, false, false, false],
      totalContentHight: 0,
    };
  },
  methods: {
    toggleCollapse() {
      this.isExpandedFAQ = Array.from(this.$refs.collapse.children).reduce(
        (all, curr) => {
          return [
            ...all,
            Array.from(curr.children).filter((i) => i.ariaExpanded !== null)[0]
              .ariaExpanded,
          ];
        },
        []
      );
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.totalContentHight =
        this.$refs.content?.getBoundingClientRect().height;
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

.pe-3:has(:is(img, iframe)[alt="book"]) {
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
.rounded:has(.show) {
  background-color: rgba($color: #000, $alpha: 0.5);
  transition: all 0.5s ease-in;
}
.mb-9:has(a[href="tel:"])::after {
  content: "";
  position: absolute;
  background-image: url(../assets/images/contact-decoration-line2.png);
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
