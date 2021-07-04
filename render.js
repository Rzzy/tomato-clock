const {ipcRenderer} = window.require('electron')
const Timer = require('timer.js')

function startWork(){
	let timer = new Timer({
		ontick(ms){
			updateTime(ms)
		},
		onend(){
			noticeToRest()			
		}

	})
	timer.start(10)
}
function updateTime(ms){
	const container = document.getElementById('timer-container')
	container.innerText = `${Math.floor(ms / 1000)}`
}
async function noticeToRest(){
	console.log('xxxxxxxxxxxx')
	const res = await ipcRenderer.invoke('notice-to-user', ['someArgument'])
	if(res === 'rest') {
		setTimeout(()=>{
			alert('休息结束...')
			startWork()
		}, 5*1000)
	} else {
		startWork()
	}
}
startWork()
