export default {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        binding.value(e);
      }
    }
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('touchend', documentHandler);
  },
  update(el, binding, vnode) {},
  unbind(el, binding) {
    document.removeEventListener('touchend', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};
