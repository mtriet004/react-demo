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
import {useTranslation} from 'react-i18next'
const SideBar = (props) =>{

    const {collapsed, toggled, handleToggleSidebar} = props
    const navigator = useNavigate()
    const {t} = useTranslation()

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
                        
                        <span style={{cursor: 'pointer'}} onClick={() =>{navigator('/')}}> <DiReact size={'3em'} color='00bfff' className='loader-icon'/>Minh Triết</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                            suffix={<span className="badge red">{t('sidebar.t1')}</span>}
                        >
                            {t('sidebar.title')}
                            <Link to='/admins'></Link>
                        </MenuItem>
                        {/* <MenuItem icon={<FaGem />}> components </MenuItem> */}
                        <SubMenu
                            suffix={<span className="badge yellow">3</span>}
                            title={t('sidebar.title1')}
                            icon={<FaGem/>}
                        >
                            <MenuItem > {t('sidebar.t2')}
                            <Link to='/admins/manage-users'></Link>
                            </MenuItem>
                            <MenuItem> {t('sidebar.t3')}
                                <Link to='/admins/manage-quizzes'></Link>
                            </MenuItem>
                            <MenuItem>
                            {t('sidebar.t4')}
                             <Link to='/admins/manage-questions'></Link>
                             </MenuItem>
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