
import { NavLink, Outlet } from "react-router-dom";
import {
  HomeOutlined,
  GiftOutlined,
  TrophyOutlined,
  ShoppingOutlined,
  WalletOutlined,
  UserOutlined,
  LogoutOutlined,
  PhoneOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  CrownOutlined,
} from "@ant-design/icons";

import useAuth from "../../hooks/useAuth";
import { usePortal } from "../../context/PortalContext";
import { money } from "../../data/demoData";

const links = [
  { to: "/home", label: "Home", icon: <HomeOutlined /> },
  { to: "/build", label: "Build My Bundle", icon: <GiftOutlined /> },
  { to: "/nlb", label: "NLB Top Winners", icon: <TrophyOutlined /> },
  { to: "/my-entries", label: "My Purchases", icon: <ShoppingOutlined /> },
  { to: "/results", label: "Results", icon: <CrownOutlined /> },
  { to: "/wallet", label: "Wallet", icon: <WalletOutlined /> },
  { to: "/profile", label: "Profile", icon: <UserOutlined /> },
];

function formatMobile(value) {
  if (!value) return "Not available";

  const digits = String(value).replace(/\D/g, "");

  if (digits.startsWith("94") && digits.length === 11) {
    return "0" + digits.slice(2);
  }

  return String(value);
}

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "Not available"
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
}

export default function MainLayout() {
  const { user, logout } = useAuth();
  const { data } = usePortal();

  const customer = {
    ...(data?.customer || {}),
    ...Object.fromEntries(
      Object.entries(user || {}).filter(
        ([, value]) => value !== null && value !== undefined
      )
    ),
  };

  const lotteries = data?.lotteries || [];

  const purchasedTickets = lotteries.reduce(
    (total, lottery) => total + Number(lottery.ticketsPurchased || 0),
    0
  );

  const winningTickets = lotteries.reduce(
    (total, lottery) => total + Number(lottery.winningTickets || 0),
    0
  );

  const totalWinnings = lotteries.reduce(
    (total, lottery) => total + Number(lottery.winningAmount || 0),
    0
  );

  const purchaseCount = Number(customer.purchaseCount || 0);
  const walletBalance = Number(customer.walletBalance || 0);

  const stats = [
    {
      label: "Wallet Balance",
      value: money(walletBalance),
      icon: <WalletOutlined />,
    },
    {
      label: "Total Purchases",
      value: purchaseCount.toLocaleString(),
      icon: <ShoppingOutlined />,
    },

  ];

  return (
    <div className="portal-shell">

      {/* RED HEADER: BRAND + CUSTOMER + STATISTICS */}
      <header className="brand-header lp-header">

        <div className="lp-header-top">
          <div className="brand-group">
            <div className="brand-symbol">
              W<span>★</span>
            </div>

            <div>
              <span className="eyebrow">
                WINWAY CUSTOMER EXPERIENCE
              </span>

              <h1>
                Lucky Pyramid <span>&</span> Smart Bundles
              </h1>

              <p>Your lotteries, your choices.</p>
            </div>
          </div>

          <button
            type="button"
            className="header-logout"
            onClick={logout}
          >
            <LogoutOutlined /> Log out
          </button>
        </div>

        <div className="lp-header-divider" />

        {/* CUSTOMER DETAILS */}
        <div className="lp-customer-row">
          <div className="lp-customer-info">
            <div className="lp-customer-avatar">
              <UserOutlined />
            </div>

            <div>
              <div className="lp-welcome">WELCOME BACK</div>

              <h2>{customer.name || "WinWay Customer"}</h2>

              <div className="lp-customer-meta">
                <span>
                  <PhoneOutlined />{" "}
                  {formatMobile(customer.mobileNumber || customer.mobile)}
                </span>

                <span>
                  <CalendarOutlined /> Member since{" "}
                  {formatDate(customer.registeredDate)}
                </span>
              </div>
            </div>
          </div>

          <span className="lp-customer-badge">
            {purchaseCount >= 3
              ? "Established Customer"
              : purchaseCount > 0
                ? "New Customer"
                : "Welcome to WinWay"}
          </span>
        </div>

        {/* STATISTICS INSIDE RED HEADER */}
        <div className="lp-header-stats">
          {stats.map((stat) => (
            <div className="lp-header-stat" key={stat.label}>
              <div className="lp-header-stat-icon">
                {stat.icon}
              </div>

              <div className="lp-header-stat-content">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="site-nav">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              "nav-link " + (isActive ? "selected" : "")
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="demo-banner">
        <b>DEMO MODE</b>{" "}
        Fictional customer and lottery data. No real
        payments or ticket purchases.
      </div>

      <main className="portal-content">
        <Outlet />
      </main>

      <footer className="footer">
        WinWay Lucky Pyramid · Customer Portal Demonstration
      </footer>
    </div>
  );
}
