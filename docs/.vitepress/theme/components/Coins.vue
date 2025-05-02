<template>
  <div slide-enter>
    <div class="one-time-donations">
      <div class="links">
        <a href="#wechatpay" title="WeChat Pay">
          <span class="i-custom-wechatpay"></span
          >{{ theme.payment.wechatpay.name }}
        </a>
        <a href="#alipay" title="AliPay"
          ><span class="i-custom-alipay"></span>
          {{ theme.payment.alipay.name }}</a
        >
        <a href="#qqpay" title="QQ Pay">
          <span class="i-custom-qqpay"></span>
          {{ theme.payment.qqpay.name }}</a
        >
        <a href="#paypal" title="Paypal">
          <span class="i-custom-paypal"></span>
          {{ theme.payment.paypal.name }}</a
        >
        <a href="#bilibili" title="bilibili">
          <span class="i-custom-bilibili"></span>
          {{ theme.payment.bilibili.name }}</a
        >
      </div>
    </div>

    <div v-if="type && coins[type]" class="coin-details slide-enter">
      <p>
        <span ref="icon"></span>
        {{ coins[type].name }} Address:<br /><a
          :href="coins[type].address"
          :title="coins[type].name"
          target="_blank"
          rel="noopener noreferrer"
          >{{ coins[type].address }}</a
        >
      </p>
      <img :src="qrcode" alt="QR Code" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { useData } from 'vitepress'

const { theme } = useData()
let qrcode = ref()

const icon = ref()
const type = ref()
const coins = ref(theme.value.payment)

const updateType = () => {
  if (window.location.hash.slice(1)) {
    type.value = window.location.hash.slice(1)
    if (typeof coins.value[type.value]?.address === 'undefined') return
    qrcode = useQRCode(coins.value[type.value]?.address)
    nextTick(() => {
      icon.value.className = `i-custom-${[type.value]}`
    })
  }
}

onMounted(() => {
  updateType()
  window.addEventListener('hashchange', updateType)
})
onBeforeUnmount(() => {
  window.removeEventListener('hashchange', updateType)
})
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  a {
    flex: 1 1 auto;
    padding: 12px 8px;
    text-decoration: none !important;
    user-select: none;
    transition: transform 0.3s;
    display: inline-block;
    font-size: 16px;
    text-align: center;
    font-weight: 600;
    text-indent: 8px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: var(--vp-c-text-1);

    & > span {
      display: inline-block;
      height: 2em;
      width: 2em;
    }

    @media (any-hover: hover) {
      &:hover,
      &:active {
        transform: translateY(-3px);
      }

      svg {
        &:hover {
          transform: scale(1);
        }
      }
    }

    svg {
      margin-right: 5px;
    }
  }
}

@media (max-width: 788px) {
  .coin-details > p {
    display: none !important;
  }
}

.coin-details {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;

  img {
    box-shadow: var(--vp-shadow-1);
  }

  p {
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    width: 400px;

    a {
      font-weight: normal;
    }

    span {
      display: block;
      height: 5rem;
      width: 5rem;
      margin-left: 1rem;
      margin-bottom: 12px;
      animation: 4s whirling linear;
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }
  }
}

@keyframes whirling {
  from {
    transform: rotate3d(0, 1, 0, -90deg) scale(0.9);
  }

  to {
    transform: rotate3d(0, 1, 0, 90deg) scale(1);
  }
}
</style>
