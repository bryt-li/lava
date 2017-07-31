
import moment from 'moment';
import 'moment/locale/zh-cn';

//从今天往后的15天，如果当前时间已经超过17点，则只配送明天的
//返回起止日期，以及当前选中的日期
const getOrderDate = () => {
	let today = moment().locale('zh-cn').utcOffset(8)
	let minDate = today
	let now = new Date()
	if(now.getHours()>17)
		minDate.add(1,'day')

	const date = minDate
	const maxDate = minDate.clone().add(15, 'day')
	return {minDate, date, maxDate}
}

const getOrderPayment = () => {
	const availablePayments = [
		{ value: 0, label: '微信支付' },
		{ value: 1, label: '余额支付' },
    ]
    const payment = 0
    return {availablePayments, payment}
}

//返回所有可选的时间，以及当前选中的时间
const getOrderTime = () => {
	const times = [
		'10:30之前',
		'11:30之前',
		'12:30之前',
		'12:30~13:30',
		'13:30~14:30',
		'14:30~15:30',
		'15:30~16:30',
		'16:30~17:30',
		'17:30~18:30'
	]
	const availableTimes = times.map((time) => {
		return {label:time,value:time}
	})
	
	const time = '12:30之前'
	return {availableTimes,time}
}

const formatStatus = (status) => {
	if(status==0)
		return '已提交'
	if(status==1)
		return '已支付'
	if(status==2)
		return '已确认'
	if(status==3)
		return '配送'
	if(status==4)
		return '已完成'
	if(status==5)
		return '已撤销'
}

module.exports = {
  getOrderDate,
  getOrderTime,
  getOrderPayment,
  formatStatus,
}


