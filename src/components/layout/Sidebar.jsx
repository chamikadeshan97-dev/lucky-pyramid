import { HomeOutlined, TrophyOutlined, HistoryOutlined, WalletOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
const links = [
  { path: '/home', label: 'Home', icon: <HomeOutlined/> },
  { path: '/play', label: 'Play Now', icon: <TrophyOutlined/> },
  { path: '/my-entries', label: 'My Entries', icon: <HistoryOutlined/> },
  { path: '/results', label: 'Results', icon: <TrophyOutlined/> },
  { path: '/wallet', label: 'My Wallet', icon: <WalletOutlined/> },
  { path: '/profile', label: 'My Profile', icon: <UserOutlined/> }
];
export default function Sidebar() { return <aside className="sidebar"><div className="brand"><div className="brand-mark">✦</div><div><strong>LUCKY PYRAMID</strong><small>Player Portal</small></div></div><div className="sidebar-caption">YOUR MENU</div><nav className="nav-list">{links.map(i => <NavLink to={i.path} key={i.path} className={({isActive})=>`nav-link ${isActive?'active':''}`}>{i.icon}<span>{i.label}</span></NavLink>)}</nav><div className="sidebar-footer">Play responsibly · Demo preview</div></aside>; }
