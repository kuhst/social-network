import { List } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { usersAPI } from '../../../api/usersAPI'
import { UserType } from '../../../type/type'
import { UserPhotoPlaceholder } from '../../elements/UserPhotoPlaceholder'
import s from '../Header.module.css'

export const Search: React.FC = () => {
    const [searchText, setSearchText] = useState('')
    const [searchFocus, setSearchFocus] = useState(false)
    const [searchData, setSearchData] = useState<UserType[]>([])

    useEffect(() => {
        if (!!searchText) {
            setSearchFocus(true)
            usersAPI
                .getUsers(5, 1, { term: searchText.trim(), friend: null })
                .then((res) => {
                    setSearchData(res.items)
                })
        } else {
            setSearchFocus(false)
        }
        return () => {
            setSearchData([])
        }
    }, [searchText])

    return (
        <div
            style={{ position: 'relative' }}
            onBlur={() => {
                setTimeout(() => {
                    setSearchFocus(false)
                }, 200)
            }}
        >
            <input
                placeholder="Search here..."
                className={s.search}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            {searchFocus && (
                <div
                    style={{
                        position: 'absolute',
                        background: '#fff',
                        width: 300,
                    }}
                >
                    <List
                        dataSource={searchData}
                        renderItem={(item) => (
                            <NavLink to={`/profile/` + item.id}>
                                <List.Item
                                    key={item.id}
                                    onClick={() => {
                                        setSearchFocus(false)
                                        setSearchText('')
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                src={item.photos.large}
                                                size="default"
                                                style={{ marginLeft: 20 }}
                                                icon={<UserPhotoPlaceholder />}
                                            />
                                        }
                                        title={item.name}
                                        description={item.status}
                                    />
                                    {/* <div style={{ marginRight: 20 }}>test</div> */}
                                </List.Item>
                            </NavLink>
                        )}
                    ></List>
                </div>
            )}
        </div>
    )
}
