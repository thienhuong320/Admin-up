import React from 'react'
import "../../assets/css/sb-admin-2.min.css"
export default function SideBar() {
    return (
        <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            {/* Sidebar - Brand */}
            <a
                className="sidebar-brand d-flex align-items-center justify-content-center"
                href="/"
            >
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text nav-link mx-3"  >UEH ADMIN</div>
            </a>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span  >Dashboard</span>
                </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            {/* <div class="sidebar-heading">
            Interface
        </div> */}
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="/QuanlyGame">
                    <i className="fa-solid fa-gamepad" />
                    <span> Quản lí game</span>
                </a>
            </li>
            {/* Nav Item - Utilities Collapse Menu */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="/QuanlyUser">
                    <i className="fa-regular fa-user" />
                    <span >Quản lí người dùng</span>
                </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            {/* <div class="sidebar-heading">
            Addons
        </div> */}
            {/* Nav Item - Tables */}
            <li className="nav-item">
                <a className="nav-link" href="tables.html">
                    <i className="fa-solid fa-gear" />
                    <span>Quản lí cài đặt</span>
                </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />
            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" />
            </div>
            {/* Sidebar Message */}
        </ul>

    )
}
