import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
    Action,
} from 'redux'
import authReducer from './AuthReducer'
import dialogsReducer from './DialogsReducer'
import profileReducer from './ProfileReducer'
import sidebarReducer from './SidebarReducer'
import usersReducer from './UsersReducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './AppReducer'
import chatReducer from './ChatReducer'

let rootReducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer,
    form: formReducer,
})
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunkMiddleware))
)

// @ts-ignore
window.store = store

export default store

type RootStateType = typeof rootReducers
export type AppStateType = ReturnType<RootStateType>
export type InferActionsTypes<T> = T extends {
    [keys: string]: (...args: any[]) => infer U
}
    ? U
    : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
    R,
    AppStateType,
    unknown,
    A
>
