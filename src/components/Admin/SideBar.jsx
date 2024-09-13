import 'react-pro-sidebar/dist/css/styles.css';
import './SideBar.scss'
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import {FaGem, FaGithub } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { useNavigate } from 'react-router-dom';
import {MdDashboard} from 'react-icons/md'
import {DiReact} from 'react-icons/di'

const SideBar = (props) =>{
    const {collapsed, toggled, handleToggleSidebar} = props
    const navigator = useNavigate()
    return(
        <>
             <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        
                        <span style={{cursor: 'pointer'}} onClick={() =>{navigator('/')}}> <DiReact size={'3em'} color='00bfff'/> Minh Triết</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                            suffix={<span className="badge red">New</span>}
                        >
                            Dashboard
                            <Link to='/admins'></Link>
                        </MenuItem>
                        {/* <MenuItem icon={<FaGem />}> components </MenuItem> */}
                        <SubMenu
                            suffix={<span className="badge yellow">3</span>}
                            title='Features'
                            icon={<FaGem/>}
                        >
                            <MenuItem > Quản lý Users
                            <Link to='/admins/manage-users'></Link>
                            </MenuItem>
                            <MenuItem> Quản lý bài Quiz</MenuItem>
                            <MenuItem> Quản lý câu hỏi</MenuItem>
                        </SubMenu>
                    </Menu>
                    {/* <Menu iconShape="circle">
                        
                    </Menu> */}
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                MinhTriet
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar