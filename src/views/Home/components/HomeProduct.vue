<script setup>
import HomePanel from './HomePanel.vue'
import { getGoodsAPI } from '@/apis/home.js'
import GoodItem from './Goodsitem.vue'
import { useAsyncData } from '@/composables/useAsyncData'

const {
  data: goodsProduct,
  loading,
  error,
  execute: getGoods
} = useAsyncData(getGoodsAPI, { initialData: [] })
</script>

<template>
    <div class="home-product">
        <div v-if="error" class="container product-feedback">
            <p>商品楼层加载失败</p>
            <el-button type="primary" plain @click="getGoods">重新加载</el-button>
        </div>
        <div v-else-if="loading" class="container product-skeleton">
            <div v-for="item in 2" :key="item" class="panel">
                <div class="header skeleton-block"></div>
                <div class="box">
                    <div class="cover skeleton-block"></div>
                    <div class="grid">
                        <div v-for="card in 8" :key="card" class="card skeleton-block"></div>
                    </div>
                </div>
            </div>
        </div>
        <HomePanel v-else :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
            <div class="box">
                <RouterLink class="cover" :to="`/category/${cate.id}`">
                    <img v-img-lazy="cate.picture" :alt="cate.name" />
                    <strong class="label">
                        <span>{{ cate.name }}馆</span>
                        <span>{{ cate.saleInfo }}</span>
                    </strong>
                </RouterLink>
                <ul class="goods-list">
                    <li v-for="good in cate.goods" :key="good.id">
                        <GoodItem :good="good" />
                    </li>
                </ul>
            </div>
        </HomePanel>
    </div>
</template>

<style scoped lang='scss'>
.home-product {
    background: #fff;
    margin-top: 20px;

    .product-feedback,
    .product-skeleton {
        padding: 40px 0 60px;
    }

    .product-feedback {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        color: #5f6b66;
    }

    .panel + .panel {
        margin-top: 40px;
    }

    .header {
        width: 320px;
        height: 36px;
        border-radius: 999px;
        margin-bottom: 24px;
    }

    .grid {
        width: 990px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }

    .card {
        height: 300px;
        border-radius: 12px;
    }

    .skeleton-block {
        background: linear-gradient(90deg, #edf2ef 25%, #f8fbf9 37%, #edf2ef 63%);
        background-size: 400% 100%;
        animation: skeleton-loading 1.4s ease infinite;
    }

    .sub {
        margin-bottom: 2px;

        a {
            padding: 2px 12px;
            font-size: 16px;
            border-radius: 4px;

            &:hover {
                background: $xtxColor;
                color: #fff;
            }

            &:last-child {
                margin-right: 80px;
            }
        }
    }

    .box {
        display: flex;

        .cover {
            width: 240px;
            height: 610px;
            margin-right: 10px;
            position: relative;

            img {
                width: 100%;
                height: 100%;
            }

            .label {
                width: 188px;
                height: 66px;
                display: flex;
                font-size: 18px;
                color: #fff;
                line-height: 66px;
                font-weight: normal;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate3d(0, -50%, 0);

                span {
                    text-align: center;

                    &:first-child {
                        width: 76px;
                        background: rgba(0, 0, 0, 0.9);
                    }

                    &:last-child {
                        flex: 1;
                        background: rgba(0, 0, 0, 0.7);
                    }
                }
            }
        }

        .goods-list {
            width: 990px;
            display: flex;
            flex-wrap: wrap;

            li {
                width: 240px;
                height: 300px;
                margin-right: 10px;
                margin-bottom: 10px;

                &:nth-last-child(-n + 4) {
                    margin-bottom: 0;
                }

                &:nth-child(4n) {
                    margin-right: 0;
                }
            }
        }

        .goods-item {
            display: block;
            width: 220px;
            padding: 20px 30px;
            text-align: center;
            transition: all .5s;

            &:hover {
                transform: translate3d(0, -3px, 0);
                box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
            }

            img {
                width: 160px;
                height: 160px;
            }

            p {
                padding-top: 10px;
            }

            .name {
                font-size: 16px;
            }

            .desc {
                color: #999;
                height: 29px;
            }

            .price {
                color: $priceColor;
                font-size: 20px;
            }
        }
    }
}

@keyframes skeleton-loading {
    0% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0 50%;
    }
}
</style>
