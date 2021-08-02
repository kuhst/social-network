import React, { useState } from 'react';
import BigButton from '../../elements/BigButton';
import style from '../../../Style.module.css'
import s from './MyStatus.module.css'
import preloaderImage from '../../../assets/images/preloaderPoint.svg'

const MyStatus = (props) => {

	const [editMode, setEditMode] = useState(false);
	const [status, setStatus] = useState(props.status);
	const activateEditMode = () => {
		setEditMode(true)
	};

	const deactivateEditMode = () => {
		setEditMode(false)
	};

	const applyStatusChange = () => {
		props.setStatus(status);
		setEditMode(false);
	};

	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value)
	}

	let statusChangeBlock = (
		<div className={style.block + ' ' + s.changeStatusBlock}>
			<div className={style.blockName}>
				<span>Change your status</span>
			</div>
			<div className={s.inputBlock}>
				<input onChange={onStatusChange} autoFocus={true} placeholder="Type new post..." value={status} />
				<div className={s.buttonBlock}>
					<BigButton value='Cancel' click={deactivateEditMode} />
					<BigButton value='Sent' click={applyStatusChange} />
				</div>
			</div>
		</div >
	)

	let preloader = (
		<div className={s.preloader}>
			<img src={preloaderImage} alt='Preloader' />
		</div>
	)

	let statusBlock = (
		<span onDoubleClick={activateEditMode}>{props.status || 'no status'}</span>
	)

	return (
		<div>
			<div className={s.status}>
				{props.loading ? preloader : statusBlock}
				{!editMode ? <></> : statusChangeBlock}
			</div>
		</div>
	)
}

export default MyStatus