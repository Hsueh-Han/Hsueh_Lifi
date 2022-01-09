<template>
  <div class="wrap-bg position-relative border-xl">
    <div class="lifi-header bg-lifi-primary text-center">
      <h1 class="logo">&#9733; LOGO</h1>
    </div>
    <InvoiceList />
    <div class="input-invoice">
      <router-link class="input-link text-lifi-dark text-decoration-none"
      :to="{name: 'main-page'}">
        掃描輸入
      </router-link>
      <router-link class="input-link text-lifi-dark text-decoration-none"
      :to="{name: 'new-invoice'}">
        手輸發票
      </router-link>
    </div>
  </div>
</template>

<script>
import InvoiceList from '@/components/InvoiceList.vue';

export default {
  components: {
    InvoiceList,
  },
};
</script>

<style lang="scss" scoped>
.wrap-bg{
 background: #F5F5F5;
 height: 100vh;
}
.lifi-header{
  padding: 40px 0;
  .logo{
    font-size: 40px;
    line-height: 1;
    margin-bottom: 0;
  }
}
.input-invoice{
  box-shadow: 0px -1px 0px #E0E0E0;
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  .input-link{
    display: block;
    width: 50%;
    font-size: 14px;
    text-align: center;
    padding: 19px 0;
    background: #ffffff;
    &:hover{
      background: rgb(255, 255, 255, 0.1);
    }
  }
}
.border-xl{
  @media (min-width: 1200px) {
    border: 1px solid #e0e0e0;
  }
}
</style>
