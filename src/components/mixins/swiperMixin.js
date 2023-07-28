import Swiper, { EffectCoverflow } from 'swiper';
import 'swiper/css/effect-coverflow';
import 'swiper/css';

export default {
  data() {
    return {
      swiper: {},
      options: { modules: [EffectCoverflow] },
    };
  },
  methods: {
    assignOptions(newOptions) {
      this.options = Object.assign(this.options, newOptions);
    },
  },

  mounted() {
    this.swiper = new Swiper('.swiper', this.options);
  },
};
