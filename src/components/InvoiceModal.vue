<template>
  <div class="modal-container">
    <div class="modal-close-btn-wrap">
      <button class="modal-close-btn" @click="closeModal"></button>
    </div>
    <div class="modal-box">
      <div class="modal-header">
        <div class="position-relative">
          <div class="status-badge fz-10 position-absolute mt-fix-6"
            :class="{
                'badge-primary': invoice.status === '已確認',
                'badge-notice': invoice.status === '驗證中'
             }">
            {{invoice.type === 0 ? '載具' : invoice.status === '已確認' ? '電子' : '驗證中'}}
          </div>
          <p class="fz-20 font-weight-bold text-center mb-fix-2">
            {{invoice.invNum}}
          </p>
        </div>
        <p class="fz-12 text-lifi-gray text-center mb-fix-2">
          {{invoice.time}}
        </p>
        <p class="mb-0 fz-12 text-lifi-dark text-center">
          {{invoice.sellerName || '無店家資料'}}
        </p>
      </div>
      <div class="modal-body">
        <div class="row no-gutters text-lifi-gray fz-12 invoice-detail-header">
          <div class="col-6">品項</div>
          <div class="col-2 text-center">數量</div>
          <div class="col-2 text-center">單價</div>
          <div class="col-2 text-center">小計</div>
        </div>
        <div class="invoice-detail-group">
          <div class="row no-gutters align-items-center fz-12 text-lifi-gray invoice-detail-item"
          v-for="(item, index) in invoice.details" :key="index">
            <div class="col-6">
              <p class="mb-0">{{item.description}}</p>
            </div>
            <div class="col-2 text-center">
              <p class="mb-0">{{numComma(item.quantity)}}</p>
            </div>
            <div class="col-2 text-center">
              <p class="mb-0">{{numComma(item.unitPrice)}}</p>
            </div>
            <div class="col-2 text-center">
              <p class="mb-0">{{numComma(item.amount)}}</p>
            </div>
          </div>
          <p class="fz-12 text-lifi-gray text-center py-2"
          v-if="!invoice.details">
            -  沒有明細資料 -<br>此張發票可能正在等待店家更新或驗證。</p>
        </div>
      </div>
      <div class="modal-footer">
        <p class="mb-0 fz-12 text-lifi-gray">總金額</p>
        <p class="mb-0 fz-12 text-lifi-gray">
          {{invoice.amount ? numComma(invoice.amount) : '--'}}
        </p>
      </div>
    </div>
    <div class="modal-data-delete-btn-wrap" v-if="invoice.status === '驗證中'">
      <button class="modal-data-delete-btn" @click="delInvoice(invoice.id)">
        <span class="delete-icon"></span>
        <span>刪除發票</span>
      </button>
    </div>
  </div>
</template>

<script>
import { commaStr } from '@/utils/format';

export default {
  props: ['data'],
  data() {
    return {
      numComma: commaStr,
      invoice: this.data,
    };
  },
  methods: {
    closeModal() {
      this.$emit('modalHandler', false);
    },
    delInvoice(id) {
      this.$emit('modalHandler', false, id);
    },
  },
};
</script>
