<script setup>
import HomePanel from './HomePanel.vue'
import { findNewAPI } from '@/apis/home'
import { useAsyncData } from '@/composables/useAsyncData'

const {
  data: newList,
  loading,
  error,
  execute: getNewList
} = useAsyncData(findNewAPI, { initialData: [] })
</script>

<template>
    <HomePanel title="本周上新" sub-title="编辑精选 灵感到货">
        <div v-if="error" class="panel-feedback">
            <p>本周上新加载失败</p>
            <el-button type="primary" plain @click="getNewList">重新加载</el-button>
        </div>
        <ul v-else class="goods-list" :class="{ skeleton: loading }">
            <template v-if="loading">
                <li v-for="item in 4" :key="item" class="skeleton-card">
                    <div class="img skeleton-block"></div>
                    <div class="line skeleton-block"></div>
                    <div class="line short skeleton-block"></div>
                </li>
            </template>
            <li v-for="item in newList" :key="item.id">
                <RouterLink :to="'/detail/' + item.id">
                    <img v-img-lazy="item.picture" :alt="item.name" />
                    <p class="name">{{ item.name }}</p>
                    <p class="price">&yen;{{ item.price }}</p>
                </RouterLink>
            </li>
        </ul>
    </HomePanel>
</template>

<style scoped lang='scss'>
.panel-feedback {
    height: 406px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: #f8fbf9;
    color: #5f6b66;
}

.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;
        background: #f0f9f4;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .price {
            color: $priceColor;
        }
    }

    &.skeleton {
        li {
            background: #f8fbf9;
            box-shadow: none;
            transform: none;
        }
    }
}

.skeleton-card {
    padding: 0 0 28px;
}

.skeleton-block {
    background: linear-gradient(90deg, #edf2ef 25%, #f8fbf9 37%, #edf2ef 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
}

.img {
    width: 306px;
    height: 306px;
}

.line {
    height: 24px;
    margin: 18px auto 0;
    width: 72%;
    border-radius: 999px;
}

.short {
    width: 44%;
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