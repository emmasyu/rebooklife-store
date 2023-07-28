import Dropdown from 'bootstrap/js/dist/dropdown';

export default {
  data() {
    return {
      dropdown: {},
    };
  },
  methods: {
    hideDropdown() {
      this.dropdown.hide();
    },
  },
  mounted() {
    this.dropdown = new Dropdown('[data-bs-toggle="dropdown"]');
  },
};
