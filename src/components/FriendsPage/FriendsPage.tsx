import React, { useEffect, useState } from 'react'
import style from '../../Style.module.css'
import { List, Spin, Button } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import Avatar from 'antd/lib/avatar/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
    actionsUsersReducer,
    follow,
    responseUsers,
    unfollow,
} from '../../redux/UsersReducer'
import { getUsers, getUsersCount } from '../../redux/usersSelector'

const FriendsPage = React.memo(() => {
    const [pageNumber, setPageNumber] = useState(1)
    const users = useSelector(getUsers)
    const usersCount = useSelector(getUsersCount)
    const dispatch = useDispatch()
    const getMoreFriends = () => {
        dispatch(
            responseUsers(
                10,
                pageNumber,
                {
                    friend: true,
                    term: '',
                },
                true
            )
        )
        setPageNumber((actual) => actual + 1)
    }
    useEffect(() => {
        dispatch(
            responseUsers(
                10,
                pageNumber,
                {
                    friend: true,
                    term: '',
                },
                true
            )
        )
        setPageNumber((actual) => actual + 1)
        return () => {
            dispatch(actionsUsersReducer.setUsers([]))
        }
    }, [])
    console.log('component update')
    return (
        <div className={style.block}>
            <InfiniteScroll
                dataLength={users.length}
                next={getMoreFriends}
                hasMore={users.length !== 0 && users.length < usersCount}
                loader={
                    <div className="example">
                        <Spin size="large" />
                    </div>
                }
            >
                <List
                    dataSource={users}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={
                                    <NavLink to={`/profile/` + item.id}>
                                        <Avatar
                                            src={item.photos.large}
                                            size={100}
                                            style={{ marginLeft: 20 }}
                                        />
                                    </NavLink>
                                }
                                title={
                                    <NavLink to={`/profile/` + item.id}>
                                        {item.name}
                                    </NavLink>
                                }
                                description={item.status}
                            />
                            <div style={{ marginRight: 20 }}>
                                {item.followed ? (
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            dispatch(unfollow(item.id))
                                        }}
                                    >
                                        Unfollow
                                    </Button>
                                ) : (
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            dispatch(follow(item.id))
                                        }}
                                    >
                                        Follow
                                    </Button>
                                )}
                            </div>
                        </List.Item>
                    )}
                ></List>
            </InfiniteScroll>
        </div>
    )
})

export default FriendsPage
