import { ipcMain } from 'electron'

export default function EventBus (mainWindow) {
  const minimize = (evt, arg) => { mainWindow.minimize() }

  ipcMain.on('min-window', minimize)
}

// export default class EventBus {
//   constructor (mainWindow) {
//     this.mainWindow = mainWindow

//     console.log(666, this.mainWindow)
//   }

//   /**
//    * 初始化
//    */
//   init () {
//     ipcMain.on('min-window', this.minimize)
//     ipcMain.on('full-window', this.maximize)
//     ipcMain.on('exit-full-window', this.unmaximize)
//     ipcMain.on('close', this.close)
//   }

//   /**
//    * 最小化窗口
//    * @param {*} evt
//    * @param {*} arg
//    */
//   minimize (evt, arg) {
//     console.log(this.mainWindow)
//     this.mainWindow.minimize()
//   }

//   /**
//    * 最大化窗口
//    * @param {*} evt
//    * @param {*} arg
//    */
//   maximize (evt, arg) {
//     this.mainWindow.maximize()
//   }

//   /**
//    * 取消最大化窗口
//    * @param {*} evt
//    * @param {*} arg
//    */
//   unmaximize (evt, arg) {
//     this.mainWindow.unmaximize()
//   }

//   /**
//    * 关闭窗口
//    * @param {*} evt
//    * @param {*} arg
//    */
//   close (evt, arg) {
//     this.mainWindow.close()
//   }
// }
