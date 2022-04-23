/**
 * checkout多选，最多选中两个，其余选项不可点击；取消选中后的项，所有选项可点击
 */
import React, { Component } from 'react'
import { Checkbox, DatePicker } from 'antd'
import './index.scss'
class MyCheckbox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			options: [
				{ label: '杨梅', value: '杨梅', disabled: false },
				{ label: '椰汁拿铁', value: '椰汁拿铁', disabled: false },
				{ label: '草莓', value: '草莓', disabled: false },
				{ label: '寿喜锅', value: '寿喜锅', disabled: false },
				{ label: '柠檬', value: '柠檬', disabled: false },
				{ label: '雪碧', value: '雪碧', disabled: false },
			],
            size: 'default',
		}
	}

	onChange = (checkedList) => {
		console.log('-11')
		const { options } = this.state
		let valueList = options.map((item) => item.value)
		let disList = []
		valueList.forEach((item) => {
			if (!checkedList.includes(item)) {
				disList.push(item)
			}
		})
		if (checkedList.length === 2) {
			for (let i in options) {
				for (let j in disList) {
					if (options[i].value === disList[j]) {
						options[i].disabled = true
					}
				}
			}
		} else {
			for (let i in options) {
				options[i].disabled = false
			}
		}
	}

	render() {
		const { options, size } = this.state
		return (
			<div className="my-checkbox">
				<Checkbox.Group options={options} onChange={this.onChange} />
				<br />
				<DatePicker size={size} picker="week" />
			</div>
		)
	}
}

export default MyCheckbox
