import React from 'react'
import styles from './index.less'

const pkg = require('../../../package.json')

const date = new Date()

function FooterInfo() {
	return (
	<div className={styles.normal}>
		<div><span>活力火山网上商城</span>©<span>{date.getFullYear()}</span></div>
		<div><span>版本：{pkg.version}</span></div>
	</div>
	)
}

export default FooterInfo
