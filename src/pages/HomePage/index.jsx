import React, { useEffect, useState } from 'react';
import "../../assets/css/sb-admin-2.min.css"; // Import CSS cho giao diện trang quản lý
import DashboardApi from '../../api/Dashboard'; // Import API để gọi dữ liệu từ backend
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Import các thành phần của Chart.js
import { Pie } from 'react-chartjs-2'; // Import biểu đồ Pie từ Chart.js

// Đăng ký các thành phần của Chart.js để sử dụng trong ứng dụng
ChartJS.register(ArcElement, Tooltip, Legend);

export default function HomePage() {
    // Khai báo state cho số lượng người dùng và số lượng game
    const [userCount, setUserCount] = useState(0);
    const [gameCount, setGameCount] = useState(0);
    // Khai báo state cho dữ liệu của biểu đồ Pie
    const [chartData, setChartData] = useState({
        labels: ['Dưới 18', '18-21', 'Trên 21'], // Nhãn cho các nhóm tuổi
        datasets: [{
            data: [0, 0, 0], // Dữ liệu mặc định cho các nhóm tuổi
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'], // Màu nền cho các phần của biểu đồ
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'], // Màu khi hover lên các phần
            hoverBorderColor: "rgba(234, 236, 244, 1)", // Màu viền khi hover
        }]
    });

    // Sử dụng useEffect để lấy dữ liệu từ API khi component được render lần đầu
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API lấy tất cả người dùng
                const response = await DashboardApi.getAllUser();
                const users = response.data.data; // Lấy dữ liệu người dùng từ response

                // Khởi tạo các nhóm tuổi
                const ageGroups = {
                    under18: 0,  // Nhóm dưới 18 tuổi
                    age18to21: 0,  // Nhóm từ 18 đến 21 tuổi
                    over21: 0  // Nhóm trên 21 tuổi
                };

                // Duyệt qua danh sách người dùng và phân loại theo độ tuổi
                users.forEach(user => {
                    if (user.dob) {  // Kiểm tra nếu có ngày sinh
                        const birthDate = new Date(user.dob);  // Chuyển ngày sinh thành đối tượng Date
                        const age = new Date().getFullYear() - birthDate.getFullYear();  // Tính tuổi

                        // Phân loại theo độ tuổi
                        if (age < 18) ageGroups.under18++;
                        else if (age >= 18 && age <= 21) ageGroups.age18to21++;
                        else ageGroups.over21++;
                    }
                });

                // Cập nhật lại dữ liệu cho biểu đồ Pie
                setChartData({
                    ...chartData,
                    datasets: [{
                        ...chartData.datasets[0],
                        data: [ageGroups.under18, ageGroups.age18to21, ageGroups.over21]  // Cập nhật dữ liệu nhóm tuổi
                    }]
                });

                // Cập nhật số lượng người dùng
                setUserCount(users.length);
            } catch (error) {
                console.error('Error fetching user data:', error);  // Xử lý lỗi khi gọi API
            }
        };

        fetchData();
    }, []);  // useEffect chỉ chạy 1 lần khi component được render lần đầu

    useEffect(() => {
        // Hàm lấy tổng số người dùng
        const fetchTotalUsers = async () => {
            try {
                const response = await DashboardApi.getAllUser();  // Gọi API lấy người dùng
                // Kiểm tra cấu trúc phản hồi và xử lý tùy theo dạng dữ liệu trả về
                if (response.data) {
                    if (typeof response.data.count === 'number') {
                        setUserCount(response.data.count);  // Nếu response chứa count, lấy giá trị đó
                    } else if (Array.isArray(response.data)) {
                        setUserCount(response.data.length);  // Nếu response là mảng, lấy độ dài
                    } else if (Array.isArray(response.data.data)) {
                        setUserCount(response.data.data.length);  // Nếu response có trường data là mảng, lấy độ dài
                    } else {
                        console.error('Unexpected response structure:', response.data);  // Xử lý khi cấu trúc dữ liệu không mong muốn
                        setUserCount(0);  // Đặt lại số lượng người dùng về 0
                    }
                } else {
                    console.error('No data in response:', response);  // Nếu không có dữ liệu trong response
                    setUserCount(0);  // Đặt lại số lượng người dùng về 0
                }
            } catch (error) {
                console.error('Error fetching total users:', error);  // Xử lý lỗi khi gọi API
                setUserCount(0);  // Đặt lại số lượng người dùng về 0 nếu có lỗi
            }
        };

        // Hàm lấy tổng số game
        const fetchGamesCount = async () => {
            try {
                const response = await DashboardApi.getAllGames();  // Gọi API lấy game
                console.log('Games response:', response);  // In ra phản hồi để kiểm tra dữ liệu

                // Xử lý phản hồi tùy theo cấu trúc dữ liệu trả về
                if (response.data) {
                    if (Array.isArray(response.data)) {
                        setGameCount(response.data.length);  // Nếu response là mảng, lấy độ dài
                    } else if (Array.isArray(response.data.data)) {
                        setGameCount(response.data.data.length);  // Nếu response có trường data là mảng, lấy độ dài
                    } else if (typeof response.data.count === 'number') {
                        setGameCount(response.data.count);  // Nếu response chứa count, lấy giá trị đó
                    } else {
                        console.error('Unexpected response structure:', response.data);  // Xử lý khi cấu trúc dữ liệu không mong muốn
                        setGameCount(0);  // Đặt lại số lượng game về 0
                    }
                } else {
                    console.error('No data in response:', response);  // Nếu không có dữ liệu trong response
                    setGameCount(0);  // Đặt lại số lượng game về 0
                }
            } catch (error) {
                console.error('Error fetching total games:', error);  // Xử lý lỗi khi gọi API
                setGameCount(0);  // Đặt lại số lượng game về 0 nếu có lỗi
            }
        };

        fetchTotalUsers();  // Gọi hàm lấy tổng số người dùng
        fetchGamesCount();  // Gọi hàm lấy tổng số game
    }, []);  // useEffect chỉ chạy 1 lần khi component được render lần đầu


    return (
        <div id="content-wrapper" className="d-flex flex-column">
            {/* Nội dung chính */}
            <div id="content">
                {/* Topbar */}
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    {/* Sidebar Toggle (Topbar) */}
                    {/* Nút bấm chuyển đổi sidebar khi màn hình nhỏ */}
                    <button
                        id="sidebarToggleTop"
                        className="btn btn-link d-md-none rounded-circle mr-3"
                    >
                        <i className="fa fa-bars" />
                    </button>

                    {/* Topbar Search */}
                    {/* Phần thanh tìm kiếm trên topbar */}
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
                    {/* Phần Navbar cho các mục trong topbar */}
                    <ul className="navbar-nav ml-auto">
                        {/* Nav Item - Search Dropdown (Visible Only XS) */}
                        {/* Mục tìm kiếm dropdown, hiển thị chỉ trên màn hình nhỏ */}
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
                            {/* Menu dropdown cho tìm kiếm trên màn hình nhỏ */}
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
                        {/* Mục thông báo, hiển thị biểu tượng chuông với số lượng thông báo */}
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
                                {/* Số lượng thông báo chưa đọc */}
                                <span className="badge badge-danger badge-counter">3+</span>
                            </a>
                            {/* Dropdown - Alerts */}
                            {/* Menu dropdown cho thông báo */}
                            <div
                                className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="alertsDropdown"
                            >
                                <h6 className="dropdown-header">Alerts Center</h6>
                                {/* Mỗi thông báo trong dropdown */}
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
                        {/* Phần phân tách giữa các mục trong menu */}
                        <div className="topbar-divider d-none d-sm-block" />

                        {/* Nav Item - User Information */}
                        {/* Mục thông tin người dùng, hiển thị tên và ảnh đại diện người dùng */}
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
                            {/* Menu dropdown cho thông tin người dùng */}
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
                        {/* Nút tải báo cáo */}
                        <a
                            href="#"
                            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                        >
                            <i className="fas fa-download fa-sm text-white-50" /> Generate Report
                        </a>
                    </div>
                    {/* Content Row - Dòng nội dung */}
                    <div className="row">
                        {/* Thẻ hiển thị tổng số người chơi */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Tổng người chơi
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                {userCount.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Thẻ hiển thị tổng số game */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Tổng số game
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                {gameCount}
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Thẻ hiển thị khách đến lần đầu */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-info shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
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
                        {/* Thẻ hiển thị game phổ biến nhất */}
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
                    {/* Content Row - Dòng biểu đồ */}
                    <div className="row">
                        {/* Biểu đồ DAU (Daily Active Users) */}
                        <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                                {/* Header của thẻ với dropdown */}
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">
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
                                {/* Thân của thẻ - biểu đồ */}
                                <div className="card-body">
                                    <div className="chart-area">
                                        <canvas id="myAreaChart" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Biểu đồ Pie về độ tuổi */}
                        <div className="col-xl-4 col-lg-5">
                            <div className="card shadow mb-4">
                                {/* Header của thẻ với dropdown */}
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
                                {/* Thân của thẻ - biểu đồ Pie */}
                                <div className="card-body">
                                    <div className="chart-pie pt-4 pb-2">
                                        <Pie
                                            data={chartData}
                                            options={{
                                                maintainAspectRatio: false,
                                                tooltips: {
                                                    backgroundColor: "rgb(255,255,255)",
                                                    bodyFontColor: "#858796",
                                                    borderColor: '#dddfeb',
                                                    borderWidth: 1,
                                                    xPadding: 15,
                                                    yPadding: 15,
                                                    displayColors: false,
                                                    caretPadding: 10,
                                                },
                                                legend: {
                                                    display: true,
                                                    position: 'bottom'
                                                },
                                                cutout: '80%',
                                            }}
                                        />
                                    </div>
                                    {/* Các chú thích độ tuổi */}
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
