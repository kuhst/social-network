import React from 'react'
import { Field, WrappedFieldMetaProps } from 'redux-form'
import { FieldValidatorsType } from '../../utils/validators'
import s from './FormsControls.module.css'

type FormControlPropsType = {
	meta: WrappedFieldMetaProps
	description?: string
	input: any
	children?: React.ReactNode
}

const Element =
	(Element: string): React.FC<FormControlPropsType> =>
	({ meta, input, ...props }) => {
		const hasErr = meta.touched && meta.error
		return (
			<div className={s.inputContainer + ' ' + (hasErr ? s.error : '')}>
				<Element {...input} {...props} className={s.input} />
				{props.description ? <span className={s.description}>{props.description}</span> : ''}
				{hasErr && <div className={s.errorMessage}>{meta.error}</div>}
			</div>
		)
	}

export const Input = Element('input')

export const Textarea = Element('textarea')

export function createField<FormKeysType extends string>(
	placeholder: string | undefined,
	name: FormKeysType,
	validators: Array<FieldValidatorsType>,
	component: React.FC<FormControlPropsType>,
	description = '',
	props = {}
) {
	return (
		<div>
			<Field
				placeholder={placeholder}
				name={name}
				validate={validators}
				component={component}
				{...props}
				description={description}
			/>
		</div>
	)
}

export default Element
