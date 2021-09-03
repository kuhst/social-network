import React, { useEffect } from 'react'
import s from './FriendsBlock.module.css'
import style from '../../../Style.module.css'
import FriendItem from './FriendItem/FriendItem'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/ReduxStore'
import { Button, Space } from 'antd'
import { getFriends } from '../../../redux/SidebarReducer'
import { NavLink } from 'react-router-dom'

const FriendBlock = () => {
    let friends = useSelector((state: AppStateType) => state.sidebar.friends)
    let friendsCount = useSelector(
        (state: AppStateType) => state.sidebar.friendsCount
    )
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFriends())
    }, [])
    const friendsArr = friends.map((f) => (
        <FriendItem
            url={f.photos.large}
            name={f.name}
            userId={f.id}
            key={f.id}
        />
    ))
    return (
        <div className={style.block}>
            <div className={style.blockName}>
                <span>Friends ({friendsCount})</span>
            </div>
            <Space className={s.container} size="small">
                {friendsArr}
                <NavLink to={'/friends'}>
                    <Button type="primary" shape="circle" size="large">
                        +{friendsCount - friends.length}
                    </Button>
                </NavLink>
            </Space>
        </div>
    )
}

export default FriendBlock
