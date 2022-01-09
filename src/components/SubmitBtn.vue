<template>
  <button class="lifi-submit-btn" :class="`bg-lifi-${btnBg}`">提交</button>
</template>

<script>
export default {
  props: ['type'],
  data() {
    return {
      btnBg: this.type,
    };
  },
};
</script>
