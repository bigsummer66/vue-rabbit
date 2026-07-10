<template>
    <footer class="app_footer">
        <div class="contact">
            <div class="container">
                <dl>
                    <dt>客户支持</dt>
                    <dd><i class="iconfont icon-kefu"></i> 在线顾问</dd>
                    <dd><i class="iconfont icon-question"></i> 售后反馈</dd>
                </dl>
                <dl>
                    <dt>品牌动态</dt>
                    <dd><i class="iconfont icon-weixin"></i> 服务号</dd>
                    <dd><i class="iconfont icon-weibo"></i> 官方社媒</dd>
                </dl>
                <dl>
                    <dt>移动端体验</dt>
                    <dd class="qrcode"><img src="@/assets/images/qrcode.jpg" /></dd>
                    <dd class="download">
                        <span>扫码查看精选专栏</span>
                        <span>同步体验移动端页面</span>
                        <a href="javascript:;">打开活动页</a>
                    </dd>
                </dl>
                <dl>
                    <dt>服务专线</dt>
                    <dd class="hotline">400-865-2026 <small>周一至周日 09:00-21:00</small></dd>
                </dl>
            </div>
        </div>
        <div class="extra">
            <div class="container">
                <div class="slogan">
                    <a href="javascript:;">
                        <i class="iconfont icon-footer01"></i>
                        <span>选品克制</span>
                    </a>
                    <a href="javascript:;">
                        <i class="iconfont icon-footer02"></i>
                        <span>履约高效</span>
                    </a>
                    <a href="javascript:;">
                        <i class="iconfont icon-footer03"></i>
                        <span>质感交付</span>
                    </a>
                </div>
                <div class="copyright">
                    <p>
                        <a href="javascript:;">关于品牌</a>
                        <a href="javascript:;">帮助中心</a>
                        <a href="javascript:;">售后政策</a>
                        <a href="javascript:;">配送说明</a>
                        <a href="javascript:;">商务合作</a>
                        <a href="javascript:;">内容推荐</a>
                        <a href="javascript:;">合作伙伴</a>
                    </p>
                    <p>Copyright © 栖川里物 ChicValley</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.app_footer {
    overflow: hidden;
    background-color: #f5f5f5;
    padding-top: 20px;

    .contact {
        background: #fff;

        .container {
            padding: 60px 0 40px 25px;
            display: flex;
        }

        dl {
            height: 190px;
            text-align: center;
            padding: 0 72px;
            border-right: 1px solid #f2f2f2;
            color: #999;

            &:first-child {
                padding-left: 0;
            }

            &:last-child {
                border-right: none;
                padding-right: 0;
            }
        }

        dt {
            line-height: 1;
            font-size: 18px;
        }

        dd {
            margin: 36px 12px 0 0;
            float: left;
            width: 92px;
            height: 92px;
            padding-top: 10px;
            border: 1px solid #ededed;

            .iconfont {
                font-size: 36px;
                display: block;
                color: #666;
            }

            &:hover {
                .iconfont {
                    color: $xtxColor;
                }
            }

            &:last-child {
                margin-right: 0;
            }
        }

        .qrcode {
            width: 92px;
            height: 92px;
            padding: 7px;
            border: 1px solid #ededed;
        }

        .download {
            padding-top: 5px;
            font-size: 14px;
            width: auto;
            height: auto;
            border: none;

            span {
                display: block;
            }

            a {
                display: block;
                line-height: 1;
                padding: 10px 25px;
                margin-top: 5px;
                color: #fff;
                border-radius: 2px;
                background-color: $xtxColor;
            }
        }

        .hotline {
            padding-top: 20px;
            font-size: 22px;
            color: #666;
            width: auto;
            height: auto;
            border: none;

            small {
                display: block;
                font-size: 15px;
                color: #999;
            }
        }
    }

    .extra {
        background-color: #333;
    }

    .slogan {
        height: 178px;
        line-height: 58px;
        padding: 60px 100px;
        border-bottom: 1px solid #434343;
        display: flex;
        justify-content: space-between;

        a {
            height: 58px;
            line-height: 58px;
            color: #fff;
            font-size: 28px;

            i {
                font-size: 50px;
                vertical-align: middle;
                margin-right: 10px;
                font-weight: 100;
            }

            span {
                vertical-align: middle;
                text-shadow: 0 0 1px #333;
            }
        }
    }

    .copyright {
        height: 170px;
        padding-top: 40px;
        text-align: center;
        color: #999;
        font-size: 15px;

        p {
            line-height: 1;
            margin-bottom: 20px;
        }

        a {
            color: #999;
            line-height: 1;
            padding: 0 10px;
            border-right: 1px solid #999;

            &:last-child {
                border-right: none;
            }
        }
    }
}
</style>
