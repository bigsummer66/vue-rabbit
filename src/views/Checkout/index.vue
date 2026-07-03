<script setup>
import { getCheckoutInfoAPI, createOrderAPI, addAddressAPI } from '@/apis/checkout'
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { ElMessage } from 'element-plus'

const router = useRouter() // 路由对象
const cartStore = useCartStore()
const checkInfo = ref({})  // 订单对象
const curAddress = ref({})  // 默认地址对象
const showDialog = ref(false)  // 切换地址弹框
const showAddDialog = ref(false)  // 添加地址弹框

const defaultAddressForm = {
    receiver: '',
    contact: '',
    provinceCode: '',
    cityCode: '',
    countyCode: '',
    address: '',
    postalCode: '',
    addressTags: '',
    isDefault: 0,
    fullLocation: ''
}

const addressForm = reactive({ ...defaultAddressForm })

const resetAddressForm = () => {
    Object.assign(addressForm, { ...defaultAddressForm })
}

const deliveryTimeType = ref(1)
const payType = ref(1)
const payChannel = ref(1)
const buyerMessage = ref('')

const getCheckInfo = async () => {
    const res = await getCheckoutInfoAPI()
    checkInfo.value = res.result
    const item = checkInfo.value?.userAddresses?.find(item => item.isDefault === 0)
    curAddress.value = item || checkInfo.value?.userAddresses?.[0] || {}
}

onMounted(() => {
    getCheckInfo()
})

const selectDeliveryTime = (type) => {
    deliveryTimeType.value = type
}

const selectPayType = (type, channel) => {
    payType.value = type
    payChannel.value = channel
}

//切换地址回调
const activeAddress = ref({})
const switchAddress = (item) => {
    activeAddress.value = item
}

const confirm = () => {
    curAddress.value = activeAddress.value
    showDialog.value = false
    activeAddress.value = {}
}

const addAddress = async () => {
    if (!addressForm.receiver || !addressForm.contact || !addressForm.provinceCode || !addressForm.cityCode || !addressForm.countyCode || !addressForm.address || !addressForm.postalCode || !addressForm.addressTags || !addressForm.fullLocation) {
        ElMessage.warning('请完整填写收货地址信息')
        return
    }

    const res = await addAddressAPI({ ...addressForm })
    ElMessage.success('添加收货地址成功')
    showAddDialog.value = false
    resetAddressForm()
    await getCheckInfo()

    const newAddress = checkInfo.value?.userAddresses?.find(item => item.id === res.result.id)
    if (newAddress) {
        curAddress.value = newAddress
    }
}

const createOrder = async () => {
    const goods = checkInfo.value?.goods || []

    if (!goods.length) {
        ElMessage.warning('当前没有可提交的商品')
        return
    }

    if (!curAddress.value?.id) {
        ElMessage.warning('请先选择或添加收货地址')
        return
    }

    const res = await createOrderAPI({
        deliveryTimeType: deliveryTimeType.value,
        payType: payType.value,
        payChannel: payChannel.value,
        buyerMessage: buyerMessage.value,
        goods: goods.map(item => ({
            skuId: item.skuId,
            count: item.count
        })),
        addressId: curAddress.value.id,
    })
    const orderId = res.result.id

    // 刷新购物车列表，让后端根据已提交的订单自行移除已结算商品
    await cartStore.updateNewList()

    router.push({
        path: '/pay',
        query: {
            id: orderId
        }
    })
}
</script>

<template>
    <div class="xtx-pay-checkout-page">
        <div class="container">
            <div class="wrapper">
                <!-- 收货地址 -->
                <h3 class="box-title">收货地址</h3>
                <div class="box-body">
                    <div class="address">
                        <div class="text">
                            <div class="none" v-if="!curAddress?.id">您需要先添加收货地址才可提交订单。</div>
                            <ul v-else>
                                <li><span>收<i />货<i />人：</span>{{ curAddress.receiver }}</li>
                                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                                <li><span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}</li>
                            </ul>
                        </div>
                        <div class="action">
                            <el-button size="large" @click="showDialog = true">切换地址</el-button>
                            <el-button size="large" @click="showAddDialog = true">添加地址</el-button>
                        </div>
                    </div>
                </div>
                <!-- 商品信息 -->
                <h3 class="box-title">商品信息</h3>
                <div class="box-body">
                    <table class="goods">
                        <thead>
                            <tr>
                                <th width="520">商品信息</th>
                                <th width="170">单价</th>
                                <th width="170">数量</th>
                                <th width="170">小计</th>
                                <th width="170">实付</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in checkInfo.goods || []" :key="i.skuId">
                                <td>
                                    <a href="javascript:;" class="info">
                                        <img :src="i.picture" alt="">
                                        <div class="right">
                                            <p>{{ i.name }}</p>
                                            <p>{{ i.attrsText }}</p>
                                        </div>
                                    </a>
                                </td>
                                <td>&yen;{{ i.price }}</td>
                                <td>{{ i.count }}</td>
                                <td>&yen;{{ i.totalPrice }}</td>
                                <td>&yen;{{ i.totalPayPrice }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 配送时间 -->
                <h3 class="box-title">配送时间</h3>
                <div class="box-body">
                    <a class="my-btn" :class="{ active: deliveryTimeType === 1 }" href="javascript:;"
                        @click.prevent="selectDeliveryTime(1)">不限送货时间：周一至周日</a>
                    <a class="my-btn" :class="{ active: deliveryTimeType === 2 }" href="javascript:;"
                        @click.prevent="selectDeliveryTime(2)">工作日送货：周一至周五</a>
                    <a class="my-btn" :class="{ active: deliveryTimeType === 3 }" href="javascript:;"
                        @click.prevent="selectDeliveryTime(3)">双休日、假日送货：周六至周日</a>
                </div>
                <!-- 支付方式 -->
                <h3 class="box-title">支付方式</h3>
                <div class="box-body">
                    <a class="my-btn" :class="{ active: payType === 1 }" href="javascript:;"
                        @click.prevent="selectPayType(1, 1)">在线支付</a>
                    <a class="my-btn" :class="{ active: payType === 2 }" href="javascript:;"
                        @click.prevent="selectPayType(2, 2)">货到付款</a>
                    <span style="color:#999">货到付款需付5元手续费</span>
                </div>
                <!-- 买家留言 -->
                <h3 class="box-title">买家留言</h3>
                <div class="box-body">
                    <el-input type="textarea" v-model="buyerMessage" placeholder="请输入买家留言，可不填" :rows="3" />
                </div>
                <!-- 金额明细 -->
                <h3 class="box-title">金额明细</h3>
                <div class="box-body">
                    <div class="total">
                        <dl>
                            <dt>商品件数：</dt>
                            <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
                        </dl>
                        <dl>
                            <dt>商品总价：</dt>
                            <dd>¥{{ checkInfo.summary?.totalPrice != null ? checkInfo.summary.totalPrice.toFixed(2) : '0.00' }}</dd>
                        </dl>
                        <dl>
                            <dt>运<i></i>费：</dt>
                            <dd>¥{{ checkInfo.summary?.postFee != null ? checkInfo.summary.postFee.toFixed(2) : '0.00' }}</dd>
                        </dl>
                        <dl>
                            <dt>应付总额：</dt>
                            <dd class="price">{{ checkInfo.summary?.totalPayPrice != null ? checkInfo.summary.totalPayPrice.toFixed(2) : '0.00' }}</dd>
                        </dl>
                    </div>
                </div>
                <!-- 提交订单 -->
                <div class="submit">
                    <el-button @click="createOrder" type="primary" size="large">提交订单</el-button>
                </div>
            </div>
        </div>
    </div>
    <!-- 切换地址 -->
    <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
        <div class="addressWrapper">
            <div class="text item" :class="{ active: activeAddress.id === item.id }" @click="switchAddress(item)"
                v-for="item in checkInfo.userAddresses" :key="item.id">
                <ul>
                    <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
                    <li><span>联系方式：</span>{{ item.contact }}</li>
                    <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
                </ul>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button>取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 添加地址 -->
    <el-dialog v-model="showAddDialog" title="添加收货地址" width="40%" center>
        <el-form :model="addressForm" label-width="90px">
            <el-form-item label="收货人">
                <el-input v-model="addressForm.receiver" placeholder="请输入收货人姓名" />
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="addressForm.contact" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="省份编码">
                <el-input v-model="addressForm.provinceCode" placeholder="请输入省份编码" />
            </el-form-item>
            <el-form-item label="城市编码">
                <el-input v-model="addressForm.cityCode" placeholder="请输入城市编码" />
            </el-form-item>
            <el-form-item label="地区编码">
                <el-input v-model="addressForm.countyCode" placeholder="请输入地区编码" />
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="addressForm.address" placeholder="请输入详细地址" />
            </el-form-item>
            <el-form-item label="邮政编码">
                <el-input v-model="addressForm.postalCode" placeholder="请输入邮政编码" />
            </el-form-item>
            <el-form-item label="地址标签">
                <el-input v-model="addressForm.addressTags" placeholder="例如 家里、公司" />
            </el-form-item>
            <el-form-item label="完整地址">
                <el-input v-model="addressForm.fullLocation" placeholder="请输入完整地址" />
            </el-form-item>
            <el-form-item label="默认地址">
                <el-radio-group v-model="addressForm.isDefault">
                    <el-radio :label="0">设为默认</el-radio>
                    <el-radio :label="1">普通地址</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showAddDialog = false">取消</el-button>
                <el-button type="primary" @click="addAddress">保存地址</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
    margin-top: 20px;

    .wrapper {
        background: #fff;
        padding: 0 20px;

        .box-title {
            font-size: 16px;
            font-weight: normal;
            padding-left: 10px;
            line-height: 70px;
            border-bottom: 1px solid #f5f5f5;
        }

        .box-body {
            padding: 20px 0;
        }
    }
}

.address {
    border: 1px solid #f5f5f5;
    display: flex;
    align-items: center;

    .text {
        flex: 1;
        min-height: 90px;
        display: flex;
        align-items: center;

        .none {
            line-height: 90px;
            color: #999;
            text-align: center;
            width: 100%;
        }

        >ul {
            flex: 1;
            padding: 20px;

            li {
                line-height: 30px;

                span {
                    color: #999;
                    margin-right: 5px;

                    >i {
                        width: 0.5em;
                        display: inline-block;
                    }
                }
            }
        }

        >a {
            color: $xtxColor;
            width: 160px;
            text-align: center;
            height: 90px;
            line-height: 90px;
            border-right: 1px solid #f5f5f5;
        }
    }

    .action {
        width: 420px;
        text-align: center;

        .btn {
            width: 140px;
            height: 46px;
            line-height: 44px;
            font-size: 14px;

            &:first-child {
                margin-right: 10px;
            }
        }
    }
}

.goods {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    .info {
        display: flex;
        text-align: left;

        img {
            width: 70px;
            height: 70px;
            margin-right: 20px;
        }

        .right {
            line-height: 24px;

            p {
                &:last-child {
                    color: #999;
                }
            }
        }
    }

    tr {
        th {
            background: #f5f5f5;
            font-weight: normal;
        }

        td,
        th {
            text-align: center;
            padding: 20px;
            border-bottom: 1px solid #f5f5f5;

            &:first-child {
                border-left: 1px solid #f5f5f5;
            }

            &:last-child {
                border-right: 1px solid #f5f5f5;
            }
        }
    }
}

.my-btn {
    width: 228px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-right: 25px;
    color: #666666;
    display: inline-block;

    &.active,
    &:hover {
        border-color: $xtxColor;
    }
}

.total {
    dl {
        display: flex;
        justify-content: flex-end;
        line-height: 50px;

        dt {
            i {
                display: inline-block;
                width: 2em;
            }
        }

        dd {
            width: 240px;
            text-align: right;
            padding-right: 70px;

            &.price {
                font-size: 20px;
                color: $priceColor;
            }
        }
    }
}

.submit {
    text-align: right;
    padding: 60px;
    border-top: 1px solid #f5f5f5;
}

.addressWrapper {
    max-height: 500px;
    overflow-y: auto;
}

.text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    &.item {
        border: 1px solid #f5f5f5;
        margin-bottom: 10px;
        cursor: pointer;

        &.active,
        &:hover {
            border-color: $xtxColor;
            background: lighten($xtxColor, 50%);
        }

        >ul {
            padding: 10px;
            font-size: 14px;
            line-height: 30px;
        }
    }
}
</style>