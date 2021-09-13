import React from 'react'
import s from './Dialogs.module.css'
import style from '../../Style.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './Message/MessageItem'
import MessageAddContainer from './Message/MessageAddContainer'
import { InitialStateType } from '../../redux/DialogsReducer'

type PropsType = InitialStateType

const Dialogs: React.FC<PropsType> = (props) => {
	let dialogsElements = props.dialogsData.map((d) => (
		<DialogItem name={d.name} id={d.id} key={d.id} avatar={d.avatar} />
	))
	let messagesElements = props.messages.map((m) => <MessageItem message={m.message} from={m.from} key={m.id} />)
	return (
		<div className={s.dialogs + ' ' + style.block}>
			<div className={s.dialogItems}>{dialogsElements}</div>
			<div className={s.messages}>
				{messagesElements}
				<MessageAddContainer />
			</div>
		</div>
	)
}

export default Dialogs
