<script setup>
import { getHomeBannerAPI } from '@/apis/home'
import { useAsyncData } from '@/composables/useAsyncData'

const {
  data: bannerList,
  loading,
  error,
  execute: getHomeBanner
} = useAsyncData(() => getHomeBannerAPI(), { initialData: [] })
</script>

<template>
    <div class="home-banner">
        <div v-if="loading" class="banner-placeholder skeleton-block"></div>
        <div v-else-if="error" class="banner-feedback">
            <p>轮播图加载失败</p>
            <el-button type="primary" plain @click="getHomeBanner">重新加载</el-button>
        </div>
        <el-carousel v-else height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <img :src="item.imgUrl" :alt="item.alt || item.title || '首页轮播图'" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped lang='scss'>
.home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 18px 40px rgba(27, 48, 42, 0.12);

    .banner-placeholder,
    .banner-feedback {
        width: 100%;
        height: 500px;
    }

    .banner-feedback {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        background: linear-gradient(135deg, #f6fbf8, #e8f5ef);
        color: #5f6b66;
    }

    img {
        width: 100%;
        height: 500px;
        object-fit: cover;
    }
}

.skeleton-block {
    background: linear-gradient(90deg, #edf2ef 25%, #f8fbf9 37%, #edf2ef 63%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
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
