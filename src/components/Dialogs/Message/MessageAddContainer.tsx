import { addMessage } from '../../../redux/DialogsReducer';
import MessageAdd from './MessageAdd';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/ReduxStore';


const mapStateToProps = (state: AppStateType) => {
	return {
		dialogsData: state.dialogsPage,
	}
};

const MessageAddContainer = connect(mapStateToProps, { addMessage })(MessageAdd);

export default MessageAddContainer;