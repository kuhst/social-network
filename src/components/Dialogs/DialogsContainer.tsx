import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { getDialogsData, getMessages } from '../../redux/dialogsSelector'
import { AppStateType } from '../../redux/ReduxStore'
import Dialogs from './Dialogs'

const mapStateToProps = (state: AppStateType) => {
	return {
		dialogsData: getDialogsData(state),
		messages: getMessages(state),
	}
}

export default compose<React.ComponentType>(connect(mapStateToProps, {}), withAuthRedirect)(Dialogs)
