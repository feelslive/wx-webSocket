//引入文件
import Websocket from "./socket"
page({
    onLaunch() {
        this.socketInit()
    },
    onShow() {
        this.linkWebsocket()
    },
    // 建立连接
    linkWebsocket() {
        this.websocket.initWebSocket({
            url: this.globalData.websocketUrl,
            success(res) {
                // console.log(res)
            },
            fail(err) {
                console.log("linkWebsocket err", err)
            }
        })
    },
    /**
     * 创建websocket对象
     */
    socketInit() {
        // 创建websocket对象
        this.websocket = new Websocket({
            // true代表启用心跳检测和断线重连
            heartCheck: false,
            isReconnection: true
        });
        // 建立连接
        // 监听websocket状态
        this.websocket.onSocketClosed({
            url: this.globalData.websocketUrl,
            success(res) {
                console.log(res)
            },
            fail(err) {
                console.log("onSocketClosed err", err)
            }
        })
        // 监听网络变化
        this.websocket.onNetworkChange({
            url: this.globalData.websocketUrl,
            success(res) {
                console.log(res)
            },
            fail(err) {
                console.log("onNetworkChange err", err)
            }
        })
        // 监听服务器返回
        this.websocket.onReceivedMsg(result => {
            console.log('app.js收到服务器内容：' + result.data);
            // 要进行的操作
        })
    },
    // 向其他页面暴露当前websocket连接
    getSocket() {
        return this.websocket;
    },
    globalData: {
        websocketUrl: "你的wss链接地址"
    }
})