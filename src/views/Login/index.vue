<script setup>
import { computed, ref } from 'vue'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { normalizeLoginPayload } from '@/utils/formValidators'

const userStore = useUserStore()

const router = useRouter()
const route = useRoute()

const form = ref({
    account: '',
    password: '',
    agree: false
})

const rules = {
    account: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 14, message: '密码长度在 6 到 14 位之间', trigger: 'blur' }
    ],
    agree: [
        {
            validator: (rule, value, callback) => {
                if (value) {
                    callback()
                } else {
                    callback(new Error('请先阅读并勾选协议'))
                }
            },
        }
    ]
}

const formRef = ref(null)
const loginLoading = ref(false)
const canSubmitLogin = computed(() => {
    return Boolean(form.value.account.trim() && form.value.password.trim() && form.value.agree && !loginLoading.value)
})

const fillExperienceAccount = () => {
    form.value.account = 'heima282'
    form.value.password = 'hm#qd@23!'
    form.value.agree = true
}

const doLogin = async () => {
    if (loginLoading.value) return

    try {
        await formRef.value.validate()
    } catch {
        return
    }

    const { account, password } = normalizeLoginPayload(form.value)
    form.value.account = account
    form.value.password = password

    loginLoading.value = true
    try {
        await userStore.getUserInfo({ account, password })
        ElMessage({ type: 'success', message: '登录成功' })
        router.replace({ path: route.query.redirect || '/' })
    } catch (error) {
        ElMessage({
            type: 'error',
            message: error?.response?.data?.message || error?.message || '登录失败，请检查用户名和密码'
        })
    } finally {
        loginLoading.value = false
    }
}
</script>

<template>
    <div>
        <header class="login-header">
            <div class="container m-top-20">
                <h1 class="logo">
                    <RouterLink to="/">栖川里物</RouterLink>
                </h1>
                <RouterLink class="entry" to="/">
                    返回品牌首页
                    <i class="iconfont icon-angle-right"></i>
                    <i class="iconfont icon-angle-right"></i>
                </RouterLink>
            </div>
        </header>
        <section class="login-section">
            <div class="wrapper">
                <nav>
                    <a href="javascript:;">账号登录</a>
                </nav>
                <div class="account-box">
                    <div class="form">
                        <div class="experience-entry">
                            <span>体验入口：</span>
                            <button type="button" @click="fillExperienceAccount">一键填充体验账号</button>
                        </div>
                        <el-form
                            ref="formRef"
                            :model="form"
                            :rules="rules"
                            label-position="right"
                            label-width="60px"
                            status-icon
                        >
                            <el-form-item prop="account" label="账号">
                                <el-input v-model="form.account" maxlength="20" placeholder="请输入体验账号或您的会员账号" />
                            </el-form-item>
                            <el-form-item prop="password" label="密码">
                                <el-input
                                    v-model="form.password"
                                    type="password"
                                    maxlength="20"
                                    show-password
                                    placeholder="请输入登录密码"
                                    @keyup.enter="doLogin"
                                />
                            </el-form-item>
                            <el-form-item prop="agree" label-width="22px">
                                <el-checkbox v-model="form.agree" size="large">
                                    我已阅读并同意隐私政策与服务协议
                                </el-checkbox>
                            </el-form-item>
                            <el-button
                                size="large"
                                class="subBtn"
                                :loading="loginLoading"
                                :disabled="!canSubmitLogin"
                                @click="doLogin"
                            >
                                登录会员中心
                            </el-button>
                        </el-form>
                    </div>
                </div>
            </div>
        </section>

        <footer class="login-footer">
            <div class="container">
                <p>
                    <a href="javascript:;">关于品牌</a>
                    <a href="javascript:;">帮助中心</a>
                    <a href="javascript:;">售后服务</a>
                    <a href="javascript:;">配送说明</a>
                    <a href="javascript:;">商务合作</a>
                    <a href="javascript:;">编辑精选</a>
                    <a href="javascript:;">合作伙伴</a>
                </p>
                <p>Copyright &copy; 栖川里物 ChicValley</p>
            </div>
        </footer>
    </div>
</template>

<style scoped lang="scss">
.login-header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;

    .container {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }

    .logo {
        width: 232px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            background: url("@/assets/images/logo-chicvalley.svg") no-repeat center 16px / 214px auto;
        }
    }

    .sub {
        flex: 1;
        font-size: 24px;
        font-weight: normal;
        margin-bottom: 38px;
        margin-left: 20px;
        color: #666;
    }

    .entry {
        width: 120px;
        margin-bottom: 38px;
        font-size: 16px;

        i {
            font-size: 14px;
            color: $xtxColor;
            letter-spacing: -5px;
        }
    }
}

.login-section {
    background:
        linear-gradient(120deg, rgba(15, 31, 27, 0.86), rgba(39, 186, 155, 0.48)),
        url('@/assets/images/center-bg.png') no-repeat center / cover;
    height: 488px;
    position: relative;

    .wrapper {
        width: 380px;
        background: rgba(255, 255, 255, 0.96);
        border-radius: 20px;
        position: absolute;
        left: 50%;
        top: 54px;
        transform: translate3d(100px, 0, 0);
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
        backdrop-filter: blur(10px);

        nav {
            font-size: 14px;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            padding: 0 40px;
            text-align: right;
            align-items: center;

            a {
                flex: 1;
                line-height: 1;
                display: inline-block;
                font-size: 18px;
                position: relative;
                text-align: center;
            }
        }
    }
}

.login-footer {
    padding: 30px 0 50px;
    background: #fff;

    p {
        text-align: center;
        color: #999;
        padding-top: 20px;

        a {
            line-height: 1;
            padding: 0 10px;
            color: #999;
            display: inline-block;

            ~a {
                border-left: 1px solid #ccc;
            }
        }
    }
}

.account-box {
    .experience-entry {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
        padding: 18px 20px 0;
        color: #666;
        font-size: 13px;

        button {
            border: 0;
            background: rgba($xtxColor, 0.1);
            color: $xtxColor;
            border-radius: 999px;
            padding: 6px 14px;
            cursor: pointer;
            transition: all .3s;

            &:hover {
                background: rgba($xtxColor, 0.18);
            }
        }
    }

    .form::before {
        content: '已预置体验账号，可快速进入完整下单链路，便于演示登录、购物车与结算流程。';
        display: block;
        margin: 4px 0 14px;
        padding: 10px 12px;
        border-radius: 12px;
        background: rgba($xtxColor, 0.08);
        color: #4d635c;
        font-size: 12px;
        line-height: 1.6;
    }

    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: $xtxColor;

            i {
                font-size: 14px;
            }
        }
    }

    .form {
        padding: 0 20px 20px 20px;

        &-item {
            margin-bottom: 28px;

            .input {
                position: relative;
                height: 36px;

                >i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: $priceColor;
                    }

                    &.active,
                    &:focus {
                        border-color: $xtxColor;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            >.error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: $priceColor;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: $xtxColor;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}

.subBtn {
    background: $xtxColor;
    width: 100%;
    color: #fff;
}
</style>
