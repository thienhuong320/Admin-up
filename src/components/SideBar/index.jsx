import React from 'react'
import "../../assets/css/sb-admin-2.min.css"
export default function SideBar() {
    return (
        <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            {/* Phần Sidebar - Thương hiệu */}
            <a
                className="sidebar-brand d-flex align-items-center justify-content-center"
                href="/"
            >
                {/* Biểu tượng thương hiệu với hiệu ứng xoay nhẹ */}
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                {/* Tên thương hiệu của sidebar */}
                <div className="sidebar-brand-text nav-link mx-3"  >UEH ADMIN</div>
            </a>
            {/* Dòng phân chia */}
            <hr className="sidebar-divider my-0" />
            {/* Mục - Dashboard */}
            <li className="nav-item active">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span  >Dashboard</span>
                </a>
            </li>
            {/* Dòng phân chia */}
            <hr className="sidebar-divider" />
            {/* Phần tiêu đề của sidebar */}
            {/* <div class="sidebar-heading">
            Interface
        </div> */}
            {/* Mục quản lý game với menu có thể mở rộng */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="/QuanlyGame">
                    <i className="fa-solid fa-gamepad" />
                    <span> Quản lí game</span>
                </a>
            </li>
            {/* Mục quản lý người dùng với menu có thể mở rộng */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="/QuanlyUser">
                    <i className="fa-regular fa-user" />
                    <span >Quản lí người dùng</span>
                </a>
            </li>
            {/* Dòng phân chia */}
            <hr className="sidebar-divider" />
            {/* Phần tiêu đề của sidebar */}
            {/* <div class="sidebar-heading">
            Addons
        </div> */}
            {/* Mục quản lý cài đặt */}
            <li className="nav-item">
                <a className="nav-link" href="tables.html">
                    <i className="fa-solid fa-gear" />
                    <span>Quản lí cài đặt</span>
                </a>
            </li>
            {/* Dòng phân chia với ẩn trên màn hình nhỏ */}
            <hr className="sidebar-divider d-none d-md-block" />
            {/* Nút chuyển đổi Sidebar */}
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" />
            </div>
            {/* Tin nhắn sidebar */}
        </ul>

    )
}
