<template>
  <div class="bg-white" v-if="invoiceList">
    <div class="invoice-total text-center">
      <p class="date-text">110年12月</p>
      <p class="count-detail">
        <span class="mr-2">{{`共 ${invoiceList.length} 張,`}}</span>
        <span>{{`總金額 ${numComma(allInvoiceAmount)} 元`}}</span>
      </p>
    </div>
    <div class="invoice-list-wrap">
      <div class="invoice-list-item" @click="checkDetail(item)"
        v-for="item in invoiceList" :key="item.id">
        <div class="d-flex align-items-center w-75 overflow-hidden">
          <div>
            <p class="mb-0 fz-12 text-lifi-dark text-center invoice-date">
              {{dateFormat(item.time)}}
            </p>
            <div class="status-badge fz-10"
             :class="{
                'badge-primary': item.status === '已確認',
                'badge-notice': item.status === '驗證中'
             }">
              {{item.type === 0 ? '載具' : item.status === '已確認' ? '電子' : '驗證中'}}
            </div>
          </div>
          <div>
            <p class="mb-0 fz-14">
              {{item.details ? item.details[0].description : item.invNum}}
            </p>
            <p class="mb-0 fz-10 text-lifi-gray">
              {{item.sellerName || '無店家資料'}}
            </p>
          </div>
        </div>
        <div>
          <p class="mb-0 fz-14 text-lifi-dark">
            {{item.amount ? `${numComma(item.amount)}元` : '--元'}}
          </p>
        </div>
      </div>
    </div>
    <Modal v-if="modalShow" @modalHandler="hideModal" :data="staredInvoice"/>
  </div>
</template>

<script>
import Modal from '@/components/InvoiceModal.vue';
import { timeToMMDD, commaStr } from '@/utils/format';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      dateFormat: timeToMMDD,
      numComma: commaStr,
      modalShow: false,
      invoiceList: null,
      staredInvoice: null,
    };
  },
  created() {
    this.getInvoiceList();
  },
  methods: {
    async getInvoiceList() {
      const res = await this.axios.get(`${process.env.VUE_APP_API}/invoices?time_like=2021-12`);
      const dataArr = res.data.sort((a, b) => {
        const aTime = new Date(a.time).getTime();
        const bTime = new Date(b.time).getTime();
        return bTime - aTime;
      });
      this.invoiceList = dataArr;
    },
    async delInvoice(id) {
      await this.axios.delete(`${process.env.VUE_APP_API}/invoices/${id}`);
    },
    checkDetail(invoiceDetail) {
      this.staredInvoice = invoiceDetail;
      this.modalShow = true;
    },
    async hideModal(para, delId) {
      if (delId) {
        await this.delInvoice(delId);
        await this.getInvoiceList();
      }
      this.modalShow = para;
    },
  },
  computed: {
    allInvoiceAmount() {
      const allAmount = this.invoiceList.reduce((acc, cur) => {
        if (cur.amount) {
          return acc + cur.amount;
        }
        return acc;
      }, 0);
      return allAmount;
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice-total{
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
  .date-text{
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 1px;
  }
  .count-detail{
    color: #51519B;
    font-size: 14px;
    margin-bottom: 0;
  }
}
.invoice-list-wrap{
  max-height: calc(100vh - 120px - 70px - 59px - 23px);
  overflow: auto;
  .invoice-list-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 8px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
  }
}
.invoice-date{
  width: 36px;
}
</style>
