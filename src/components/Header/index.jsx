import React from 'react'
import "../../assets/css/sb-admin-2.min.css" // Import CSS cho style của navbar
export default function Header() {
    return (
        // component Header
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* Nút Sidebar Toggle (Topbar) */}
            <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
            >
                <i className="fa fa-bars" /> {/* Icon thanh sidebar dạng 3 gạch ngang */}
            </button>

            {/* Form tìm kiếm trên Topbar */}
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control bg-light border-0 small"
                        placeholder="Search for..." // Placeholder cho ô tìm kiếm
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm" /> {/* Icon tìm kiếm */}
                        </button>
                    </div>
                </div>
            </form>

            {/* Topbar Navbar */}
            <ul className="navbar-nav ml-auto">

                {/* Item Nav - Tìm kiếm Dropdown (Chỉ hiển thị trên màn hình nhỏ) */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="searchDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i className="fas fa-search fa-fw" /> {/* Icon tìm kiếm */}
                    </a>
                    {/* Dropdown - Messages */}
                    <div
                        className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown"
                    >
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control bg-light border-0 small"
                                    placeholder="Search for..." // Placeholder cho ô tìm kiếm
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm" /> {/* Icon tìm kiếm */}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                {/* Item Nav - Thông báo (Alerts) */}
                <li className="nav-item dropdown no-arrow mx-1">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="alertsDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i className="fas fa-bell fa-fw" /> {/* Icon thông báo */}
                        <span className="badge badge-danger badge-counter">3+</span> {/* Số lượng thông báo */}
                    </a>
                    {/* Dropdown - Alerts */}
                    <div
                        className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="alertsDropdown"
                    >
                        <h6 className="dropdown-header">Alerts Center</h6>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="mr-3">
                                <div className="icon-circle bg-primary">
                                    <i className="fas fa-file-alt text-white" /> {/* Icon thông báo */}
                                </div>
                            </div>
                            <div>
                                <div className="small text-gray-500">December 12, 2019</div>
                                <span className="font-weight-bold">
                                    A new monthly report is ready to download!
                                </span>
                            </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="mr-3">
                                <div className="icon-circle bg-success">
                                    <i className="fas fa-donate text-white" /> {/* Icon quyên góp */}
                                </div>
                            </div>
                            <div>
                                <div className="small text-gray-500">December 7, 2019</div>
                                $290.29 has been deposited into your account!
                            </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                            <div className="mr-3">
                                <div className="icon-circle bg-warning">
                                    <i className="fas fa-exclamation-triangle text-white" /> {/* Icon cảnh báo */}
                                </div>
                            </div>
                            <div>
                                <div className="small text-gray-500">December 2, 2019</div>
                                Spending Alert: We've noticed unusually high spending for your
                                account.
                            </div>
                        </a>
                        <a className="dropdown-item text-center small text-gray-500" href="#">
                            Show All Alerts {/* Link hiển thị tất cả thông báo */}
                        </a>
                    </div>
                </li>

                {/* Divider giữa các item */}
                <div className="topbar-divider d-none d-sm-block" />

                {/* Item Nav - Thông tin người dùng */}
                <li className="nav-item dropdown no-arrow">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="userDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                            Hương {/* Tên người dùng */}
                        </span>
                        <img
                            className="img-profile rounded-circle"
                            src="img/undraw_profile.svg" // Hình ảnh đại diện người dùng
                        />
                    </a>
                    {/* Dropdown - Thông tin người dùng */}
                    <div
                        className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown"
                    >
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" /> {/* Icon người dùng */}
                            Profile {/* Liên kết đến trang hồ sơ người dùng */}
                        </a>
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" /> {/* Icon cài đặt */}
                            Settings {/* Liên kết đến trang cài đặt */}
                        </a>
                        <div className="dropdown-divider" /> {/* Đường phân chia */}
                        <a
                            className="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#logoutModal"
                        >
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" /> {/* Icon đăng xuất */}
                            Logout {/* Liên kết đăng xuất */}
                        </a>
                    </div>
                </li>
            </ul>
        </nav>

    )
}
