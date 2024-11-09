import React, { useEffect, useState } from 'react';
import "../../assets/css/sb-admin-2.min.css"
import DashboardApi from '../../api/Dashboard'; 

export default function HomePage() {

    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        // Gọi API lấy số lượng người dùng
        const fetchUserCount = async () => {
            try {
                const response = await DashboardApi.getAllUser().getCount(); // Kiểm tra đúng tên phương thức trong API
                setUserCount(response.data.meta.total_users); // Giả sử API trả về dữ liệu theo cấu trúc này
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        
        fetchUserCount(); // Gọi hàm này trong useEffect
    }, []); // Chạy một lần khi component mount
    

    return (
        <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
                {/* Topbar */}
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    {/* Sidebar Toggle (Topbar) */}
                    <button
                        id="sidebarToggleTop"
                        className="btn btn-link d-md-none rounded-circle mr-3"
                    >
                        <i className="fa fa-bars" />
                    </button>
                    {/* Topbar Search */}
                    <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control bg-light border-0 small"
                                placeholder="Search for..."
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search fa-sm" />
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* Topbar Navbar */}
                    <ul className="navbar-nav ml-auto">
                        {/* Nav Item - Search Dropdown (Visible Only XS) */}
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
                                <i className="fas fa-search fa-fw" />
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
                                            placeholder="Search for..."
                                            aria-label="Search"
                                            aria-describedby="basic-addon2"
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>
                        {/* Nav Item - Alerts */}
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
                                <i className="fas fa-bell fa-fw" />
                                {/* Counter - Alerts */}
                                <span className="badge badge-danger badge-counter">3+</span>
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
                                            <i className="fas fa-file-alt text-white" />
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
                                            <i className="fas fa-donate text-white" />
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
                                            <i className="fas fa-exclamation-triangle text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 2, 2019</div>
                                        Spending Alert: We've noticed unusually high spending for your
                                        account.
                                    </div>
                                </a>
                                <a
                                    className="dropdown-item text-center small text-gray-500"
                                    href="#"
                                >
                                    Show All Alerts
                                </a>
                            </div>
                        </li>
                        {/* Nav Item - Messages */}
                        <div className="topbar-divider d-none d-sm-block" />
                        {/* Nav Item - User Information */}
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
                                    Hương{" "}
                                </span>
                                <img
                                    className="img-profile rounded-circle"
                                    src="img/undraw_profile.svg"
                                />
                            </a>
                            {/* Dropdown - User Information */}
                            <div
                                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown"
                            >
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                    Profile
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                                    Settings
                                </a>
                                <div className="dropdown-divider" />
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    data-toggle="modal"
                                    data-target="#logoutModal"
                                >
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>
                {/* End of Topbar */}
                {/* Begin Page Content */}
                <div className="container-fluid">
                    {/* Page Heading */}
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                        <a
                            href="#"
                            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                        >
                            <i className="fas fa-download fa-sm text-white-50" /> Generate Report
                        </a>
                    </div>
                    {/* Content Row */}
                    <div className="row">
                        {/* Earnings (Monthly) Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Tổng người chơi
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                 {userCount} {/* Hiển thị tổng số người chơi từ API */}
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Earnings (Monthly) Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Tổng số game
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                $215,000
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Earnings (Monthly) Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-info shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                {/* Khách đến trong 1 tháng gần nhất */}
                                                Khách đến lần đầu
                                            </div>
                                            <div className="row no-gutters align-items-center">
                                                <div className="col-auto">
                                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                        50%
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="progress progress-sm mr-2">
                                                        <div
                                                            className="progress-bar bg-info"
                                                            role="progressbar"
                                                            style={{ width: "50%" }}
                                                            aria-valuenow={50}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Pending Requests Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Game phổ biến nhất
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                18
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-comments fa-2x text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Content Row */}
                    <div className="row">
                        {/* Area Chart */}
                        <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                                {/* Card Header - Dropdown */}
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">
                                    {/* Biểu Đồ DAU" (Daily Active Users). */}
                                        Biểu Đồ DAU
                                    </h6>
                                    <div className="dropdown no-arrow">
                                        <a
                                            className="dropdown-toggle"
                                            href="#"
                                            role="button"
                                            id="dropdownMenuLink"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                                        </a>
                                        <div
                                            className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                            aria-labelledby="dropdownMenuLink"
                                        >
                                            <div className="dropdown-header">Dropdown Header:</div>
                                            <a className="dropdown-item" href="#">
                                                Action
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                Another action
                                            </a>
                                            <div className="dropdown-divider" />
                                            <a className="dropdown-item" href="#">
                                                Something else here
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* Card Body */}
                                <div className="card-body">
                                    <div className="chart-area">
                                        <canvas id="myAreaChart" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Pie Chart */}
                        <div className="col-xl-4 col-lg-5">
                            <div className="card shadow mb-4">
                                {/* Card Header - Dropdown */}
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">
                                        Độ Tuổi
                                    </h6>
                                    <div className="dropdown no-arrow">
                                        <a
                                            className="dropdown-toggle"
                                            href="#"
                                            role="button"
                                            id="dropdownMenuLink"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                                        </a>
                                        <div
                                            className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                            aria-labelledby="dropdownMenuLink"
                                        >
                                            <div className="dropdown-header">Dropdown Header:</div>
                                            <a className="dropdown-item" href="#">
                                                Action
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                Another action
                                            </a>
                                            <div className="dropdown-divider" />
                                            <a className="dropdown-item" href="#">
                                                Something else here
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* Card Body */}
                                <div className="card-body">
                                    <div className="chart-pie pt-4 pb-2">
                                        <canvas id="myPieChart" />
                                    </div>
                                    <div className="mt-4 text-center small">
                                        <span className="mr-2">
                                            <i className="fas fa-circle text-primary" /> Dưới 18
                                        </span>
                                        <span className="mr-2">
                                            <i className="fas fa-circle text-success" /> 18 - 21
                                        </span>
                                        <span className="mr-2">
                                            <i className="fas fa-circle text-info" /> Trên 21
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Content Row */}
                </div>
                {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}
            {/* Footer */}
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>
                            Copyright © Your{" "}
                            <a
                                href="https://www.facebook.com/profile.php?id=100083059010220"
                                target="_blank"
                            >
                                Web5 Project
                            </a>{" "}
                            2024
                        </span>
                    </div>
                </div>
            </footer>
            {/* End of Footer */}
        </div>

    )
}
