<script setup>
import { useCategoryStore } from '@/stores/categoryStore'
const categoryStore = useCategoryStore()
</script>

<template>
    <div class="home-category">
        <ul class="menu">
            <li v-for="item in categoryStore.categoryList" :key="item.id">
                <RouterLink class="title-link" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
                <a class="sub-link" v-for="i in item.children.slice(0, 2)" :key="i.id" href="javascript:;">{{ i.name }}</a>
                <!-- 弹层layer位置 -->
                <div class="layer">
                    <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
                    <ul>
                        <li v-for="i in item.goods" :key="i.id">
                            <RouterLink :to="`/detail/${i.id}`">
                                <img :src="i.picture" alt="" />
                                <div class="info">
                                    <p class="name ellipsis-2">
                                        {{ i.name }}
                                    </p>
                                    <p class="desc ellipsis">{{ i.desc }}</p>
                                    <p class="price"><i>¥</i>{{ i.price }}</p>
                                </div>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>


<style scoped lang='scss'>
.home-category {
    width: 250px;
    height: 500px;
    background: linear-gradient(180deg, rgba(17, 33, 29, 0.96), rgba(17, 33, 29, 0.78));
    border-radius: 24px 0 0 24px;
    position: relative;
    z-index: 120;
    backdrop-filter: blur(8px);

    .menu {
        >li {
            padding-left: 32px;
            height: 55px;
            line-height: 55px;
            transition: background-color .25s ease, padding-left .25s ease;

            &:hover {
                background: linear-gradient(90deg, rgba(39, 186, 155, 0.92), rgba(39, 186, 155, 0.64));
                padding-left: 36px;
            }

            a {
                margin-right: 4px;
                color: #fff;
                opacity: 0.88;
            }

            .title-link {
                font-size: 16px;
                font-weight: 600;
                opacity: 1;
            }

            .sub-link {
                font-size: 13px;
                color: rgba(255, 255, 255, 0.75);
            }

            .layer {
                width: 990px;
                height: 500px;
                background: rgba(255, 255, 255, 0.96);
                position: absolute;
                left: 250px;
                top: 0;
                z-index: 130;
                display: none;
                padding: 0 20px;
                border-radius: 0 24px 24px 0;
                box-shadow: 0 18px 40px rgba(29, 53, 45, 0.12);

                h4 {
                    font-size: 20px;
                    font-weight: normal;
                    line-height: 80px;

                    small {
                        font-size: 16px;
                        color: #666;
                    }
                }

                >ul {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;

                    >li {
                        width: 100%;
                        height: 120px;
                        margin-right: 0;
                        margin-bottom: 0;
                        border: 1px solid #eee;
                        border-radius: 14px;
                        background: #fff;
                        box-shadow: 0 10px 22px rgba(29, 53, 45, 0.06);

                        a {
                            display: flex;
                            width: 100%;
                            height: 100%;
                            align-items: center;
                            padding: 10px;

                            &:hover {
                                background: linear-gradient(180deg, #f6fcfa, #ecf8f3);
                            }

                            img {
                                width: 95px;
                                height: 95px;
                            }

                            .info {
                                padding-left: 10px;
                                line-height: 24px;
                                overflow: hidden;

                                .name {
                                    font-size: 16px;
                                    color: #666;
                                }

                                .desc {
                                    color: #999;
                                }

                                .price {
                                    font-size: 22px;
                                    color: $priceColor;

                                    i {
                                        font-size: 16px;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // 关键样式  hover状态下的layer盒子变成block
            &:hover {
                .layer {
                    display: block;
                }
            }
        }
    }
}
</style>
