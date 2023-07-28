import Collapse from 'bootstrap/js/dist/collapse';

export default {
  data() {
    return {
      collapse: {},
    };
  },
  methods: {
    hideCollapse() {
      this.collapse.hide();
      this.isExpanded = 'false';
    },
  },
  mounted() {
    this.collapse = new Collapse('.collapse', {
      toggle: false,
    });
  },
};
