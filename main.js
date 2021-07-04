const { app, BrowserWindow, ipcMain, Notification } = require('electron');

// 加载一个新的browerWindow实例
let win // 定义一个全局的引用，防止被垃圾回收器回收掉
function createWindow(){
   win = new BrowserWindow({
     width: 800,
     height: 600,
	 webPreferences: {
	 	nodeIntegration: true, // 是否启用Node integration. 默认值为 false
		contextIsolation: false,
	 }
   })
   
   win.loadFile('index.html')
}
// 调用createWindow函数来打开你的窗口
// app模块只有在ready事件被激活后才能创建浏览器窗口
// 可以通过是用app.whenReady() api来监听此事件
app.on('ready',()=> { 
  	createWindow()
  	noticeUser()
})

function noticeUser(){

	// ipcMain.handle('notice-to-user', async (event, someArgument) => {
	// 	const result = new Promise((resolve, reject) => {
	// 		const notice = new Notification({
	// 			title: 'test',
	// 			body: 'test'
	// 		})
	// 		notice.show()

	// 	})
	// 	return result
	// })

	ipcMain.handle('notice-to-user', async ()=> {
		const res = await new Promise((resolve,reject)=> {
			const notice = new Notification({
				title: "任务结束",
				body: "是否开始休息？",
				actions: [{
							text: '开始休息',
							type: 'button'
						 }],
						 closeButtonText: '继续工作'
			})
			notice.show()
			notice.on('action',()=> {
				resolve('rest')
			})
			notice.on('close', ()=> {
				resolve('work')
			})

		})
		return res
	})
}

