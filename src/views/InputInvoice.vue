<template>
  <div>
    <div class="bg-lifi-primary new-invoice-header">
      <h1 class="text-lifi-dark text-center fz-14 mb-0">手動輸入發票</h1>
      <router-link class="index-link" :to="{name: 'main-page'}">
        <span class="link-icon"></span>
      </router-link>
    </div>
    <div class="new-invoice-content">
      <p class="fz-14">發票號碼</p>
      <div class="input-group mb-3">
        <input class="lifi-input lifi-input-md" type="text" placeholder="大寫英文"
        onkeyup="this.value=this.value.replace(/[^A-Z]/g,'')" maxlength="2" v-model="newInvoice.en"
        @blur="newInvoice.en = $event.target.value">
        <input class="lifi-input lifi-input-lg" type="text" placeholder="8碼發票號碼"
        onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="8" v-model="newInvoice.code"
        @blur="newInvoice.code = $event.target.value">
      </div>
      <p class="fz-14">開立時間</p>
      <div class="input-group mb-5">
        <input class="lifi-input lifi-input-md" type="text" placeholder="西元年"
        onkeyup="if(value>2022)value=2022;value=value.replace(/^(0+)|[^\d]+/g,'')" maxlength="4"
        v-model="newInvoice.year" @blur="newInvoice.year = $event.target.value">
        <input class="lifi-input lifi-input-sm" type="text" placeholder="月份"
        onkeyup="if(value>12)value=12;value=value.replace(/^(0+)|[^\d]+/g,'')" maxlength="2"
        v-model="newInvoice.month" @blur="newInvoice.month = $event.target.value">
        <input class="lifi-input lifi-input-sm" type="text" placeholder="日期"
        onkeyup="if(value>31)value=31;value=value.replace(/^(0+)|[^\d]+/g,'')" maxlength="2"
        v-model="newInvoice.date" @blur="newInvoice.date = $event.target.value">
      </div>
      <div class="text-center">
        <Btn type="primary" @click="uploadNewInvioce"/>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/SubmitBtn.vue';

export default {
  components: {
    Btn,
  },
  data() {
    return {
      newInvoice: {},
    };
  },
  methods: {
    async uploadNewInvioce() {
      const obj = {
        invNum: this.newInvoice.en + this.newInvoice.code,
        status: '驗證中',
        time: `${this.newInvoice.year}-${this.newInvoice.month}-${this.newInvoice.date}`,
        type: 1,
      };
      await this.axios.post(`${process.env.VUE_APP_API}/invoices`, obj);
      this.newInvoice = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.new-invoice-header{
  padding: 12px 0;
  position: relative;
  .index-link{
    display: inline-block;
    width: 45px;
    height: 45px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    .link-icon{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-60%) translateY(-50%);
      display: inline-block;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-right-color: #ffffff;
    }
  }
}
.new-invoice-content{
  width: 375px;
  margin: 0 auto;
  padding: 20px 27px;
}
</style>
