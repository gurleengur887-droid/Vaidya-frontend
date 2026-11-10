import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  LogOut,
  ShieldCheck,
  Leaf,
} from "lucide-react";

import { adminLogout } from "./adminApi";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate("/admin", { replace: true });
  };

  const menuItems = [
    {
      name: "Overview",
      mobileName: "Home",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "All Orders",
      mobileName: "All Orders",
      path: "/admin/dashboard/orders",
      icon: ShoppingBag,
    },
    {
      name: "Pending Orders",
      mobileName: "Pending",
      path: "/admin/dashboard/pending",
      icon: Clock3,
    },
    {
      name: "Completed Orders",
      mobileName: "Completed",
      path: "/admin/dashboard/completed",
      icon: CheckCircle2,
    },
  ];

  const NavigationLinks = ({ mobile = false }) => (
    <>
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin/dashboard"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""} ${
                mobile ? "mobile-sidebar-link" : ""
              }`
            }
          >
            <Icon size={mobile ? 20 : 19} />

            <span>
              {mobile ? item.mobileName : item.name}
            </span>
          </NavLink>
        );
      })}
    </>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="admin-sidebar desktop-admin-sidebar">

        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <Leaf size={23} />
          </div>

          <div>
            <h2>
              VAIDYA<span>CARE</span>
            </h2>
            <p>ADMIN CONSOLE</p>
          </div>
        </div>

        <div className="sidebar-menu-label">
          WORKSPACE
        </div>

        <nav className="sidebar-navigation">
          <NavigationLinks />
        </nav>

        <div className="sidebar-bottom">

          <div className="sidebar-secure">
            <ShieldCheck size={17} />
            <span>Secure Admin Access</span>
          </div>

          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>

          <p>
            © {new Date().getFullYear()} Vaidya Care
          </p>

        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="mobile-admin-navigation">

        <NavigationLinks mobile />

        <button
          className="mobile-sidebar-link mobile-logout"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </nav>
    </>
  );
}