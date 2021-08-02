import React from 'react';
import BigButton from '../../elements/BigButton';
import style from '../../../Style.module.css'
import s from './MyStatus.module.css'
import preloaderImage from '../../../assets/images/preloaderPoint.svg'

class MyStatus extends React.Component {
	state = {
		editMode: false,
		status: this.props.status
	}

	activateEditMode = () => {
		this.setState({
			editMode: true
		})
	}

	deactivateEditMode = () => {
		this.setState({
			editMode: false
		})
	}

	applyStatusChange = () => {
		this.props.setStatus(this.state.status);
		this.setState({
			editMode: false
		})
	}

	onStatusChange = (e) => {
		this.setState({
			status: e.currentTarget.value
		})
	}

	componentDidUpdate = (previousProps, previousState) => {
		if (this.props.status !== previousProps.status) {
			this.setState({
				status: this.props.status
			});
		}
	}

	render() {
		let statusChangeBlock = (
			<div className={style.block + ' ' + s.changeStatusBlock}>
				<div className={style.blockName}>
					<span>Change your status</span>
				</div>
				<div className={s.inputBlock}>
					<input onChange={this.onStatusChange} autoFocus={true} placeholder="Type new post..." value={this.state.status} />
					<div className={s.buttonBlock}>
						<BigButton value='Cancel' click={this.deactivateEditMode} />
						<BigButton value='Sent' click={this.applyStatusChange} />
					</div>
				</div>
			</div >
		)
		let preloader = (
			<div className={s.preloader}>
				<img src={preloaderImage} alt='Preloader' />
			</div>
		)
		let status = (
			<span onDoubleClick={this.activateEditMode}>{this.props.status || 'no status'}</span>
		)
		return (
			<div>
				<div className={s.status}>
					{this.props.loading ? preloader : status}
					{!this.state.editMode ? <></> : statusChangeBlock}
				</div>
			</div>
		)
	}
}

export default MyStatus