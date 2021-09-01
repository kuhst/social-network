import React, { useEffect } from 'react'
import style from '../../Style.module.css'
import { List, Avatar, Space, Spin } from 'antd'
import { NavLink } from 'react-router-dom'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import {
    sendMessage,
    startMessagesListening,
    stopMessagesListening,
} from '../../redux/ChatReducer'
import { AppStateType } from '../../redux/ReduxStore'
import { getStatus } from '../../redux/chatSelector'

const ChatPage = () => {
    const status = useSelector(getStatus)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <Spin spinning={status === 'pending'} size="large">
            <div className={style.block}>
                <ChatMessages />
                <AddChatMessage status={status} />
            </div>
        </Spin>
    )
}

const ChatMessages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    console.log('>>>>messages')
    return (
        <div
            id="scrollableDiv"
            style={{
                height: 300,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
            }}
        >
            <InfiniteScroll
                dataLength={messages.length}
                next={() => {}}
                hasMore={false}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    itemLayout="horizontal"
                    style={{ margin: '0 20px' }}
                    dataSource={messages}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.photo} />}
                                title={
                                    <NavLink to={`/profile/` + item.userId}>
                                        {item.userName}
                                    </NavLink>
                                }
                                description={item.message}
                            />
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

const AddChatMessage: React.FC<ChatAddMessagePropsType> = ({ status }) => {
    const dispatch = useDispatch()

    return (
        <div style={{ padding: 20, paddingTop: 5 }}>
            <Formik
                initialValues={{
                    textMessage: '',
                }}
                onSubmit={(values) => {
                    dispatch(sendMessage(values.textMessage))
                }}
            >
                <Form>
                    <Input.TextArea
                        name="textMessage"
                        showCount
                        maxLength={100}
                        allowClear
                        autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                    <SubmitButton
                        loading={false}
                        disabled={status === 'pending'}
                        style={{ marginTop: 10 }}
                    >
                        Send
                    </SubmitButton>
                </Form>
            </Formik>
        </div>
    )
}

export default ChatPage

type ChatAddMessagePropsType = {
    status: 'ready' | 'pending' | 'error'
}
