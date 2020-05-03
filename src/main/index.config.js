export default {

  bg: null,

  window: {

    // 标题
    title: 'Hanas',

    titleBarStyle: 'hiddenInset',

    // 窗口颜色
    backgroundColor: '#333',

    // 窗口创建时是否显示
    show: false,

    // 宽度
    width: 1280,

    // 最小宽度
    minWidth: 1280,

    // 高度
    height: 720,

    // 最小高度
    minHeight: 720,

    // 窗口边框是否包括在设置的尺寸内
    useContentSize: true,

    // 窗口在屏幕居中
    center: true,

    // 设置为false是启用一个无边框窗口
    frame: true,

    // 网页功能设置
    webPreferences: {

      // 在webworker中启动nodejs特性
      nodeIntegrationInWorker: true,

      // 禁用通源策略
      webSecurity: false

    }

  }

}
