import React, { useEffect, useState } from "react";
import style from "../../Style.module.css";
import s from "./ChatPage.module.css";
import { List, Avatar } from "antd";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import InfiniteScroll from "react-infinite-scroll-component";

type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const ChatPage = () => {
  const [wsChannel, setWsChanel] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let closeHandler = () => {
      console.log("close");
      createChanel();
    };

    const createChanel = () => {
      ws?.removeEventListener("close", closeHandler);
      ws?.close();

      ws = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
      );
      console.log("create ws");

      ws.addEventListener("close", closeHandler);

      setWsChanel(ws);
    };

    createChanel();

    return () => {
      ws.removeEventListener("close", closeHandler);
      ws.close();
    };
  }, []);

  return (
    <div className={style.block}>
      <ChatMessages wsChannel={wsChannel} />
      <AddChatMessage wsChannel={wsChannel} />
    </div>
  );
};

const ChatMessages: React.FC<{ wsChannel: WebSocket | null }> = ({
  wsChannel,
}) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    let messageHandler = (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    };
    wsChannel?.addEventListener("message", messageHandler);

    return () => {
      wsChannel?.removeEventListener("message", messageHandler);
    };
  }, [wsChannel]);

  return (
    <div
      id='scrollableDiv'
      style={{
        height: 300,
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={() => {}}
        hasMore={false}
        loader={<h4>Loading...</h4>}
        scrollableTarget='scrollableDiv'
      >
        <List
          itemLayout='horizontal'
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
  );
};

const AddChatMessage: React.FC<{ wsChannel: WebSocket | null }> = ({
  wsChannel,
}) => {
  const [readyStatus, setReadyStatus] = useState<boolean>(false);
  useEffect(() => {
    let openHandler = () => {
      console.log("ready");
      setReadyStatus(true);
    };
    wsChannel?.addEventListener("open", openHandler);

    return () => {
      wsChannel?.removeEventListener("open", openHandler);
    };
  }, [wsChannel]);

  return (
    <div>
      <Formik
        initialValues={{
          textMessage: "",
        }}
        onSubmit={(values) => {
          wsChannel?.send(values.textMessage);
        }}
      >
        <Form>
          <Input name='textMessage' type='text' />
          <SubmitButton loading={false} disabled={!readyStatus}>
            Search
          </SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatPage;
