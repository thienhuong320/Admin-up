import React, { useEffect, useState } from 'react';
import "../../assets/css/sb-admin-2.min.css"
import QuanliUserApi from "../../api/QuanliUser"
import axios from 'axios';

export default function QuanlyUser() {
  const [listUser, setListUser] = useState([]); // Lưu danh sách người dùng
  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const [searchTerm, setSearchTerm] = useState(''); // Thêm state để lưu từ khóa tìm kiếm
  const itemsPerPage = 5; // Số lượng người dùng trên mỗi trang

  // Lấy dữ liệu người dùng từ API khi component được mount
  useEffect(() => {
    (async () => {
      try {
        const res = await QuanliUserApi.getAllUser(); // Gọi API để lấy dữ liệu người dùng
        const data = res.data.data;
        setListUser(Array.isArray(data) ? data : []); // Đảm bảo dữ liệu là mảng
        console.log("data", data); // In dữ liệu ra console để kiểm tra
      } catch (error) {
        console.error(error); // Nếu có lỗi, log lỗi ra console
        setListUser([]); // Fallback về mảng rỗng nếu có lỗi
      }
    })();
  }, []); // Chạy lần đầu tiên khi component được mount

  // Tính toán các giá trị phân trang
  const indexOfLastItem = currentPage * itemsPerPage; // Vị trí phần tử cuối cùng trong trang
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Vị trí phần tử đầu tiên trong trang
  const currentUsers = listUser.slice(indexOfFirstItem, indexOfLastItem); // Cắt mảng người dùng theo trang

  const totalPages = Math.ceil(listUser.length / itemsPerPage); // Tính tổng số trang

  // Hàm thay đổi trang khi người dùng nhấn vào số trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Cập nhật trang hiện tại
  };

  // Hàm thay đổi từ khóa tìm kiếm
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Cập nhật từ khóa tìm kiếm khi người dùng thay đổi
  };

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        {/* Thanh điều hướng trên (Navbar) */}
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          {/* Nút để hiển thị sidebar khi kích thước màn hình nhỏ */}
          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button>

          {/* Form tìm kiếm */}
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              {/* Ô input để người dùng nhập từ khóa tìm kiếm */}
              <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                {/* Nút tìm kiếm */}
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>

          {/* Danh sách các mục trong navbar */}
          <ul className="navbar-nav ml-auto">
            {/* Dropdown cho tìm kiếm trên màn hình nhỏ */}
            <li className="nav-item dropdown no-arrow d-sm-none">
              <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-search fa-fw"></i>
              </a>
              {/* Menu dropdown cho tìm kiếm trên màn hình nhỏ */}
              <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                <form className="form-inline mr-auto w-100 navbar-search">
                  <div className="input-group">
                    {/* Ô input tìm kiếm trong menu dropdown */}
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                      {/* Nút tìm kiếm trong menu dropdown */}
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            {/* Dropdown cho thông báo */}
            <li className="nav-item dropdown no-arrow mx-1">
              <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-bell fa-fw"></i>
                {/* Badge thông báo */}
                <span className="badge badge-danger badge-counter">3+</span>
              </a>
              {/* Menu dropdown cho thông báo */}
              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                <h6 className="dropdown-header">Alerts Center</h6>
                {/* Một mục thông báo */}
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-primary">
                      <i className="fas fa-file-alt text-white"></i>
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 12, 2019</div>
                    <span className="font-weight-bold">A new monthly report is ready to download!</span>
                  </div>
                </a>
                {/* Các mục thông báo khác có thể thêm vào đây */}
                <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
              </div>
            </li>

            {/* Dấu phân cách giữa các mục */}
            <div className="topbar-divider d-none d-sm-block"></div>

            {/* Dropdown cho người dùng */}
            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {/* Tên người dùng */}
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Hương</span>
                {/* Hình ảnh người dùng */}
                <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt="User profile" />
              </a>
              {/* Menu dropdown cho người dùng */}
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                {/* Mục Profile */}
                <a className="dropdown-item" href="#">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile
                </a>
                {/* Mục Cài đặt */}
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i> Settings
                </a>
                <div className="dropdown-divider"></div>
                {/* Mục Đăng xuất */}
                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>

        <div className="container-fluid">
          {/* Phần này tạo ra một container chứa nội dung chính của trang */}

          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            {/* Đây là một phần flexbox để căn chỉnh các phần tử theo chiều ngang, dùng để hiển thị tiêu đề và nút thêm người dùng mới */}

            <h1 className="h3 mb-2 text-gray-800">Bảng</h1>
            {/* Tiêu đề của phần này */}

            <button type="button" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Thêm user mới
            </button>
            {/* Nút này sẽ mở một modal (hộp thoại) để thêm người dùng mới */}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              {/* Modal này chứa các trường nhập liệu để thêm người dùng mới */}

              <div className="modal-dialog">
                <div className="modal-content">

                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm user mới</h1>
                    {/* Tiêu đề của modal */}

                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    {/* Nút đóng modal */}
                  </div>

                  <div className="modal-body">
                    {/* Phần nhập liệu bên trong modal */}
                    <form className="user">
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Nhập tên game" />
                        {/* Trường nhập tên game */}
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Nhập mô tả game" />
                        {/* Trường nhập mô tả game */}
                      </div>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile" />
                        <label className="custom-file-label" htmlFor="customFile">Chọn hình ảnh</label>
                        {/* Trường nhập để chọn file hình ảnh */}
                      </div>
                    </form>
                  </div>

                  <div className="modal-footer">
                    {/* Các nút ở dưới cùng của modal */}
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    {/* Nút đóng modal */}

                    <button type="button" className="btn btn-primary">Save</button>
                    {/* Nút lưu người dùng mới */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow mb-4">
            {/* Phần này chứa một card (thẻ) hiển thị bảng thông tin người chơi */}

            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Quản lí người chơi</h6>
              {/* Tiêu đề của thẻ */}
            </div>

            <div className="card-body">
              <div className="table-responsive">
                {/* Phần bảng thông tin người chơi */}

                <table className="table table-bordered" width="100%" cellSpacing="0">
                  {/* Bảng dữ liệu người chơi */}

                  <thead>
                    <tr>
                      <th>Mã người chơi</th>
                      <th>Tên người chơi</th>
                      <th>email</th>
                      <th>password</th>
                      <th>Tên </th>
                      <th>Số điện thoại </th>
                      <th>Hình đại diện</th>
                      <th>Ngày sinh</th>
                      <th>Hành động</th>
                      {/* Các tiêu đề cột của bảng */}
                    </tr>
                  </thead>

                  <tbody>
                    {currentUsers.map((user) => (
                      <tr key={user.user_id}>
                        {/* Duyệt qua từng người dùng trong mảng currentUsers để tạo các hàng trong bảng */}

                        <td>{user.user_id}</td>
                        {/* Hiển thị mã người chơi */}

                        <td>{user.user_name}</td>
                        {/* Hiển thị tên người chơi */}

                        <td>{user.email}</td>
                        {/* Hiển thị email người chơi */}

                        <td>{user.password}</td>
                        {/* Hiển thị mật khẩu người chơi */}

                        <td>{user.fullname}</td>
                        {/* Hiển thị tên đầy đủ người chơi */}

                        <td>{user.phone}</td>
                        {/* Hiển thị số điện thoại người chơi */}

                        <td><img src={user.thumbnail} alt={user.user_name} width="50" /></td>
                        {/* Hiển thị hình đại diện của người chơi */}

                        <td>{user.dob}</td>
                        {/* Hiển thị ngày sinh người chơi */}

                        <td>
                          <a href="#" className="btn btn-info btn-circle"><i className="fa-solid fa-pen-to-square"></i></a>
                          {/* Nút chỉnh sửa người chơi */}

                          <a href="#" className="btn btn-danger btn-circle"><i className="fas fa-trash"></i></a>
                          {/* Nút xóa người chơi */}
                        </td>
                      </tr>
                    ))}
                    {/* Các dòng trong bảng được tạo từ dữ liệu currentUsers */}

                    {/* Các dòng bảng khác có thể được thêm vào ở đây */}
                  </tbody>
                </table>
              </div>

              {/* Phần phân trang */}
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`btn btn-primary ${currentPage === index + 1 ? 'active' : ''}`}
                    style={{ margin: '0 5px' }}
                  >
                    {index + 1}
                  </button>
                ))}
                {/* Tạo các nút phân trang dựa trên số trang totalPages */}
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}
