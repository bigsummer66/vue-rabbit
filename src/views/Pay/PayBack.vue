<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getOrderAPI } from '@/apis/pay'

const route = useRoute()
const orderInfo = ref({})

const getOrderInfo = async () => {
    const res = await getOrderAPI(route.query.orderId)
    orderInfo.value = res.result
}

onMounted(() => {
    getOrderInfo()
})
</script>

<template>
    <div class="xtx-pay-page">
        <div class="container">
            <div class="pay-result">
                <span class="iconfont icon-queren2 green" v-if="$route.query.payResult === 'true'"></span>
                <span class="iconfont icon-shanchu red" v-else></span>
                <p class="tit">支付{{ $route.query.payResult === 'true' ? '成功' : '失败' }}</p>
                <p class="tip">我们将尽快为您安排发货，请留意订单进度与物流通知。</p>
                <p>支付方式：<span>支付宝</span></p>
                <p>支付金额：<span>{{ orderInfo.payMoney?.toFixed(2) }}</span></p>
                <div class="btn">
                    <el-button type="primary" style="margin-right:20px">查看订单</el-button>
                    <el-button>进入首页</el-button>
                </div>
                <p class="alert">
                    <span class="iconfont icon-tip"></span>
                    温馨提示：栖川里物不会以订单异常、系统升级等理由要求您点击陌生链接进行退款，请注意核验信息并保护账户安全。
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.pay-result {
    padding: 100px 0;
    background: #fff;
    text-align: center;
    margin-top: 20px;

    >.iconfont {
        font-size: 100px;
    }

    .green {
        color: #1dc779;
    }

    .red {
        color: $priceColor;
    }

    .tit {
        font-size: 24px;
    }

    .tip {
        color: #999;
    }

    p {
        line-height: 40px;
        font-size: 16px;
    }

    .btn {
        margin-top: 50px;
    }

    .alert {
        font-size: 12px;
        color: #999;
        margin-top: 50px;
    }
}
</style>
