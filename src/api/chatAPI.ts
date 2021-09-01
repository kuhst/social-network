let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
}

// @ts-ignore
window.subscribers = subscribers

let ws: WebSocket | null = null

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChanel, 3000)
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('Refresh page')
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach((s) => s(newMessages))
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach((s) => s(status))
}

const createChanel = () => {
    cleanUp()
    ws?.close()

    ws = new WebSocket(
        'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
    )
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChanel()
    },
    stop() {
        // notifySubscribersAboutStatus('pending')
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(
        eventName: EventsNameType,
        callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
    ) {
        // @ts-ignore
        subscribers[eventName].push(callback)

        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(
                // @ts-ignore
                (s) => s !== callback
            )
        }
    },
    unsubscribe(
        eventName: EventsNameType,
        callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
    ) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(
            // @ts-ignore
            (s) => s !== callback
        )
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
}

type EventsNameType = 'status-changed' | 'messages-received'

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error'
export type MessagesReceivedSubscriberType = (
    messages: ChatMessageType[]
) => void
export type StatusChangedSubscriberType = (status: StatusType) => void
