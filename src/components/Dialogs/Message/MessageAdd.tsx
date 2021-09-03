import React from 'react'
import BigButton from '../../elements/BigButton'
import s from './../Dialogs.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Textarea } from '../../elements/FormsControls'

type NewMessageFormValuesType = {
    textMessage: string
}
type PropsType = {}

type NewMessageFormValuesTypeKeys = keyof NewMessageFormValuesType

const MessageForm: React.FC<
    InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType
> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.messageAdd}>
            {createField<NewMessageFormValuesTypeKeys>(
                '',
                'textMessage',
                [],
                Textarea
            )}
            <BigButton value="Sent" />
        </form>
    )
}

const MessageReduxForm = reduxForm<NewMessageFormValuesType, PropsType>({
    form: 'DialogMessage',
})(MessageForm)

type MapDispatchToProps = {
    addMessage: (message: string) => void
}
const MessageAdd: React.FC<MapDispatchToProps> = (props) => {
    let onSubmit = (formData: NewMessageFormValuesType) => {
        props.addMessage(formData.textMessage)
    }
    return (
        <div>
            <MessageReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default MessageAdd
