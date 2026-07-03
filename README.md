# 小兔鲜电商前台（Vue Rabbit）

基于 Vue 3 的 B2C 电商单页应用，实现从商品浏览、SKU 选规格、购物车、结算下单到支付回调的完整购物流程。

## 在线预览

<!-- 部署成功后替换下方链接 -->
**Demo：** 待部署（见下方「部署到 Vercel」）

仓库地址：[github.com/bigsummer66/vue-rabbit](https://github.com/bigsummer66/vue-rabbit)

## 项目截图

将截图放入 `docs/screenshots/` 后，README 会自动展示（建议宽度 1200px 左右）：

| 首页 | 商品详情（SKU + 放大镜） |
|------|--------------------------|
| ![首页](./docs/screenshots/home.png) | ![详情](./docs/screenshots/detail.png) |

| 购物车 | 结算下单 |
|--------|----------|
| ![购物车](./docs/screenshots/cart.png) | ![结算](./docs/screenshots/checkout.png) |

**截图建议路径：**

1. 首页 `/` — 轮播 + 分类导航
2. 商品详情 `/detail/:id` — 选规格 + 放大镜
3. 购物车 `/cartlist` — 勾选与合计
4. 结算页 `/checkout`（需登录）

本地开发运行 `npm run dev` 后，用浏览器全屏截图保存到 `docs/screenshots/` 即可。

## 功能概览

| 模块 | 功能 |
|------|------|
| 首页 | 分类导航、轮播图、新品/热卖/全品类推荐 |
| 分类 | 一级分类、二级分类、排序筛选、无限滚动加载 |
| 商品详情 | 图片放大镜预览、SKU 规格选择、加入购物车 |
| 购物车 | 单选/全选、数量修改、删除、本地/登录双模式 |
| 结算下单 | 收货地址管理、配送/支付方式、提交订单 |
| 支付 | 订单倒计时、支付宝跳转、支付结果回调 |
| 会员中心 | 个人信息、订单列表（状态筛选 + 分页） |
| 登录 | 表单校验、Token 持久化、登录后购物车合并 |

## 技术栈

- **框架**：Vue 3.5 + Vite 8
- **路由 / 状态**：Vue Router 5、Pinia 3 + `pinia-plugin-persistedstate`
- **UI**：Element Plus（按需自动引入）
- **网络**：Axios（请求/响应拦截器）
- **工具**：VueUse、Day.js、SCSS

## 项目亮点

1. **SKU 规格选择器**：基于幂集（Power Set）算法构建路径字典，实现多规格联动与无库存规格禁用
2. **双模式购物车**：游客使用本地持久化购物车，登录后自动合并至服务端
3. **图片懒加载**：自定义 `v-img-lazy` 指令，基于 `IntersectionObserver` 实现
4. **商品放大镜**：`useMouseInElement` 实现局部放大预览
5. **路由守卫**：结算、支付、会员中心等页面需登录后访问
6. **路由懒加载**：按页面动态 `import()`，优化首屏加载

## 目录结构

```
src/
├── apis/          # 接口按业务模块拆分
├── components/    # 全局组件（SKU、图片预览）
├── composables/   # 可复用组合式逻辑
├── directives/    # 自定义指令（图片懒加载）
├── router/        # 路由配置 + 导航守卫
├── stores/        # Pinia 状态（用户、购物车、分类）
├── utils/         # Axios 封装
└── views/         # 页面组件
```

## 快速开始

### 环境要求

- Node.js `^22.18.0` 或 `>=24.12.0`

### 安装依赖

```bash
cd vue-rabbit
npm install
```

### 环境变量

复制示例文件并按需修改：

```bash
cp .env.example .env
```

| 变量 | 说明 |
|------|------|
| `VITE_API_BASE_URL` | 接口基础地址（HTTPS） |
| `VITE_PAY_BASE_URL` | 支付跳转基础地址（HTTP） |

### 本地开发

```bash
npm run dev
```

访问 http://localhost:5173

### 生产构建

```bash
npm run build
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 测试账号

项目对接黑马测试 API，可使用以下账号体验完整流程：

| 字段 | 值 |
|------|-----|
| 账号 | `zhousg` |
| 密码 | `123456` |

## 部署到 Vercel

### 方式一：Vercel 控制台（推荐）

1. 登录 [Vercel](https://vercel.com)，点击 **Add New Project**
2. 导入 GitHub 仓库 `bigsummer66/vue-rabbit`
3. **Root Directory** 填写 `vue-rabbit`
4. **Environment Variables** 添加：

   | Name | Value |
   |------|-------|
   | `VITE_API_BASE_URL` | `https://pcapi-xiaotuxian-front-devtest.itheima.net` |
   | `VITE_PAY_BASE_URL` | `http://pcapi-xiaotuxian-front-devtest.itheima.net/` |

5. 点击 **Deploy**，完成后将域名写入 README「在线预览」

### 方式二：Vercel CLI

```bash
cd vue-rabbit
npx vercel login    # 浏览器授权（仅需一次）
npx vercel --prod   # 生产部署
```

部署成功后终端会输出 `Production: https://xxx.vercel.app`，复制到 README 即可。

## 核心实现说明

### 购物车合并流程

```
游客加购 → localStorage 持久化
    ↓
用户登录 → 调用 mergeCartAPI 合并本地购物车
    ↓
拉取服务端最新购物车列表
```

### 路由鉴权

访问 `meta.requiresAuth: true` 的路由时，若未登录则跳转 `/login?redirect=原路径`，登录成功后自动回跳。

## License

MIT
