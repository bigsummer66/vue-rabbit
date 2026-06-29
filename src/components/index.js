//把components中的所有组件全局化注册通过插件的方式
import imageView from '@/components/imageView/index.vue';
import XtxSku from '@/components/XtxSku/index.vue'

export const componentPlugin = {
    install(app) {
        app.component('Sku', XtxSku);
        app.component('imageView', imageView);
    }
};