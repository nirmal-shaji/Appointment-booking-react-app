import React, { useState } from 'react'
import '../layout.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector ,useDispatch} from 'react-redux'
import { Badge } from 'antd'
import  {setUser} from '../redux/userSlice'
function Layout({ children }) {
    const [collapsed, setcollapsed] = useState(false)

    const { user } = useSelector((state) => state.user)
    const location = useLocation()
    const navigate = useNavigate()
    const Dispatch=useDispatch()
   
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-5-line'

        },
        {
            name: 'Book',
            path: '/Application',
            icon: 'ri-file-list-line'

        }, {
            name: 'Applications',
            path: '/Applications',
            icon: 'ri-file-list-line'

        }


    ];

    const adminMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-5-line'

        },
        {
            name: 'Users',
            path: '/users',
            icon: 'ri-user-line'

        },
        {
            name: 'New Applications',
            path: '/new-Applications',
            icon: 'ri-file-list-line'

        },
        {
            name: 'Applications-to-be-approved',
            path: '/Approved-Applications',
            icon: 'ri-file-list-line'

        },
        {
            name: 'Slot-Booking',
            path: '/slot-Booking',
            icon: 'ri-ticket-fill icon-size'

        },


    ];
    const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu

    return (
        <div className='main'>
            <div className="d-flex layout">
                <div className={collapsed ? 'collapsed-sidebar' : 'sidebar'}>
                    <div className="sidebar-header">
                        <h1 className='logo'>A</h1>
                    </div>
                    <div className="menu">
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return (
                                <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                    <i className={menu.icon}></i>
                                    {!collapsed && < Link to={menu.path} >{menu.name}</Link>}
                                </div>
                            )
                        })}
                        <div className={`d-flex menu-item `} onClick={() => {
                            localStorage.clear()
                            navigate('/login')
                        }}>
                            <i className='ri-logout-circle-line'></i>
                            {

                            !collapsed && < Link to='/login'onClick={() => { Dispatch(setUser(null) ) }}>Logout</Link>

                            }
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        {collapsed ? <i className="ri-menu-line close-icons" onClick={() => { setcollapsed(false) }}></i> : <i className="ri-close-line close-icons" onClick={() => { setcollapsed(true) }}></i>}
                        <div className="d-flex align-items-center px-4">
                            <Badge count={user?.unseenNotification.length} onClick={()=>{navigate('/Notifications')}}>
                                <i className="ri-notification-4-line header-icons mr-2 px-3"></i>
                            </Badge>

                            <Link className='anchor mx-3' to='/profile'>{user?.name}</Link>
                        </div>
                    </div>
                    <div className="body">
                        {children}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Layout