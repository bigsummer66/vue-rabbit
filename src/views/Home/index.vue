<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeProduct from './components/HomeProduct.vue'
</script>

<template>
    <section class="hero-section">
        <div class="container hero-shell">
            <HomeCategory />
            <HomeBanner />
            <div class="hero-copy">
                <p class="eyebrow">Vue 3 E-commerce Demo</p>
                <h1>完整电商业务链路展示</h1>
                <p class="summary">
                    从商品浏览、SKU 规格联动、购物车到结算支付，全流程覆盖常见电商前台核心场景。
                </p>
                <div class="hero-tags">
                    <span>Vue 3</span>
                    <span>Pinia</span>
                    <span>Axios</span>
                    <span>Route Guard</span>
                </div>
            </div>
            <div class="hero-stats">
                <div class="stat-card">
                    <strong>8+</strong>
                    <span>核心业务模块</span>
                </div>
                <div class="stat-card">
                    <strong>SPA</strong>
                    <span>从浏览到支付回调</span>
                </div>
                <div class="stat-card">
                    <strong>体验优化</strong>
                    <span>懒加载 / 骨架屏 / 登录回跳</span>
                </div>
            </div>
        </div>
    </section>
    <HomeNew />
    <HomeHot />
    <HomeProduct />
</template>

<style scoped lang="scss">
.hero-section {
    padding: 20px 0 0;
    background:
        radial-gradient(circle at top left, rgba(39, 186, 155, 0.16), transparent 28%),
        linear-gradient(180deg, #f7fbf9 0%, #f5f5f5 100%);
}

.hero-shell {
    height: 560px;
}

.hero-copy {
    position: absolute;
    top: 88px;
    right: 32px;
    z-index: 100;
    width: 360px;
    padding: 28px 30px;
    border-radius: 24px;
    color: #fff;
    background: linear-gradient(160deg, rgba(21, 43, 37, 0.92), rgba(39, 186, 155, 0.82));
    box-shadow: 0 18px 40px rgba(21, 43, 37, 0.18);
    backdrop-filter: blur(10px);

    .eyebrow {
        font-size: 13px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.72);
    }

    h1 {
        margin-top: 14px;
        font-size: 34px;
        line-height: 1.25;
    }

    .summary {
        margin-top: 14px;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(255, 255, 255, 0.82);
    }
}

.hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;

    span {
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.16);
        font-size: 13px;
    }
}

.hero-stats {
    position: absolute;
    left: 280px;
    right: 32px;
    bottom: 18px;
    z-index: 100;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
}

.stat-card {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 18px 22px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(39, 186, 155, 0.12);
    box-shadow: 0 12px 30px rgba(36, 62, 54, 0.08);

    strong {
        font-size: 22px;
        color: #16352d;
    }

    span {
        color: #5f6b66;
        font-size: 14px;
    }
}
</style>
