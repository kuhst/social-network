import React from 'react'
import BigButton from '../elements/BigButton'
import s from './Users.module.css'
import style from '../../Style.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../type/type'

type PropsType = {
    user: UserType
    followingInProgress: Array<number>

    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User: React.FC<PropsType> = ({
    user,
    follow,
    unfollow,
    followingInProgress,
}) => {
    return (
        <div className={style.block + ' ' + s.block}>
            <NavLink to={`/profile/` + user.id}>
                <div className={s.userPhoto}>
                    <img
                        src={user.photos.large ? user.photos.large : userPhoto}
                        alt={s.Avatar}
                    ></img>
                </div>
            </NavLink>
            <div className={s.container}>
                <div className={s.user}>
                    <div className={s.userName}>{user.name}</div>
                    {user.status ? (
                        <div className={s.status}>
                            <p className={s.textConcat}>{user.status}</p>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className={s.button}>
                    {user.followed ? (
                        <BigButton
                            disabled={followingInProgress.some(
                                (userId) => userId === user.id
                            )}
                            value="unfollow"
                            click={() => {
                                unfollow(user.id)
                            }}
                        />
                    ) : (
                        <BigButton
                            disabled={followingInProgress.some(
                                (userId) => userId === user.id
                            )}
                            value="follow"
                            click={() => {
                                follow(user.id)
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default User
