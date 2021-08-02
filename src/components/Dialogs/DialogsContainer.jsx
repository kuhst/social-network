import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getDialogsData, getMessages } from '../../redux/dialogsSelector';
import Dialogs from './Dialogs';


const mapStateToProps = (state) => {
	return {
		dialogsData: getDialogsData(state),
		messages: getMessages(state),
	}
}

export default compose(
	connect(mapStateToProps, {}),
	withAuthRedirect
)(Dialogs)