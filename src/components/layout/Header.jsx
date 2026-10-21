import { Avatar, Button, Tag } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';
export default function Header() { const {user,logout}=useAuth(); return <header className="topbar"><div><span className="eyebrow">GOOD TO SEE YOU</span><div className="topbar-title">Welcome, {user?.name || 'Player'}!</div></div><div className="topbar-user"><Tag color="gold">DEMO PLAYER</Tag><Avatar icon={<UserOutlined/>} style={{background:'#efc35e',color:'#21213a'}}/><Button icon={<LogoutOutlined/>} onClick={logout}>Sign out</Button></div></header>; }
