import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserPhotoPlaceholder } from '../../../elements/UserPhotoPlaceholder'

type PropsType = {
    url: string | null
    name: string | null
    userId: number | null
}

const FriendItem: React.FC<PropsType> = (props) => {
    return (
        <NavLink to={`/profile/` + props.userId}>
            <Avatar
                size="large"
                src={props.url}
                icon={<UserPhotoPlaceholder />}
            />
        </NavLink>
    )
}

export default FriendItem
