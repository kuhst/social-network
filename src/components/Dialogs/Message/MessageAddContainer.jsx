import { addMessage } from '../../../redux/DialogsReducer';
import MessageAdd from './MessageAdd';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
	return {
		dialogsData: state.dialogsPage,
	}
};

const MessageAddContainer = connect(mapStateToProps, { addMessage })(MessageAdd);

export default MessageAddContainer;