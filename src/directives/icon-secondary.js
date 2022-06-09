export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value.type} text-green-600 text-xl`;

    if (binding.value.right) {
      iconClass += " float-right";
    }

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
