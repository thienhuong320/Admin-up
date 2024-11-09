import React, { useEffect, useState } from 'react';
import "../../assets/css/sb-admin-2.min.css";
import QuanlyGameApi from '../../api/QuanliGame';
import axios from 'axios';

export default function QuanlyGame() {
  // Khởi tạo state cho danh sách game, trang hiện tại, và từ khóa tìm kiếm
  const [listGame, setListGame] = useState([]); // Lưu danh sách game
  const [currentPage, setCurrentPage] = useState(1); // Lưu trang hiện tại cho phân trang
  const [searchTerm, setSearchTerm] = useState(''); // Thêm state để lưu từ khóa tìm kiếm
  const itemsPerPage = 5; // Số lượng game hiển thị trên mỗi trang

  // Khởi tạo state cho form thêm game mới
  const [gameName, setGameName] = useState(""); // Tên game
  const [description, setDescription] = useState(""); // Mô tả game
  const [genre, setGenre] = useState(""); // Thể loại game
  const [image, setImage] = useState(null); // Hình ảnh game
  const [releaseDate, setReleaseDate] = useState(""); // Ngày phát hành game
  const [tag, setTag] = useState(""); // Thẻ tag của game
  const [games, setGames] = useState([]); // Lưu danh sách game (dành cho các tác vụ khác)
  const [gameTotalPages, setGameTotalPages] = useState(1); // Tổng số trang của danh sách game

  // Hàm tạo game mới khi nhấn nút Save
  const createGame = async () => {
    // Dữ liệu game sẽ được gửi lên backend
    const gameData = {
      game_name: gameName,
      description: description,
      genre: genre,
      image: image,  // Giả sử 'image' là URL hoặc đường dẫn file hình ảnh
      release_date: releaseDate,
      tag: tag
    };

    try {
      // Gửi dữ liệu game đến API
      const response = await QuanlyGameApi.createGame(gameData);
      console.log('Game created successfully:', response.data);
      setListGame((prevGames) => [...prevGames, response.data.data]); // Cập nhật lại danh sách game sau khi thêm
    } catch (error) {
      console.error("Error creating game:", error); // Xử lý lỗi nếu có
    }
  };

  // Hàm đóng modal và reset lại các giá trị trong form thêm game
  const handleCloseModal = () => {
    setGameName(""); // Reset tên game
    setDescription(""); // Reset mô tả
    setGenre(""); // Reset thể loại
    setImage(""); // Reset hình ảnh
    setReleaseDate(""); // Reset ngày phát hành
    setTag(""); // Reset tag
    // Reset các giá trị state khác nếu cần thiết
  };

  // Hàm xử lý sự thay đổi của trang (phân trang)
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Cập nhật trang hiện tại
    // Fetch lại danh sách game cho trang đã chọn
    // Cần phải cập nhật logic này để xử lý phân trang trong việc lấy dữ liệu
  };

  // Hàm xóa game được chọn
  const handleDeleteGame = async (gameId) => {
    try {
      // Gửi yêu cầu xóa game từ backend
      await QuanlyGameApi.deleteGame(gameId);
      // Cập nhật lại danh sách game sau khi xóa
      setListGame((prevGames) => prevGames.filter(game => game.game_id !== gameId));
    } catch (error) {
      console.error("Error deleting game:", error); // Xử lý lỗi khi xóa game
    }
  };

  // UseEffect để tìm kiếm game theo tag hoặc tất cả game
  useEffect(() => {
    const fetchGames = async () => {
      try {
        if (searchTerm) {
          // Nếu có từ khóa tìm kiếm, gọi API để tìm kiếm game theo tag
          const res = await QuanlyGameApi.getGameByTag(searchTerm);
          setListGame(res.data.data); // Cập nhật danh sách game tìm được
        } else {
          // Nếu không có từ khóa tìm kiếm, lấy tất cả game
          const res = await QuanlyGameApi.getAllGames();
          setListGame(res.data.data); // Cập nhật tất cả game
        }
      } catch (error) {
        console.error(error); // Xử lý lỗi nếu có
        setListGame([]); // Nếu có lỗi, fallback về mảng rỗng
      }
    };

    fetchGames();
  }, [searchTerm]); // Khi từ khóa tìm kiếm thay đổi, gọi lại API

  // UseEffect để lấy tất cả game khi component được load lần đầu tiên
  useEffect(() => {
    (async () => {
      try {
        const res = await QuanlyGameApi.getAllGames();
        const data = res.data.data;
        setListGame(Array.isArray(data) ? data : []); // Đảm bảo 'data' là mảng
        console.log("data", data); // Log dữ liệu để kiểm tra
      } catch (error) {
        console.error(error); // Xử lý lỗi khi lấy game
        setListGame([]); // Fallback về mảng rỗng nếu có lỗi
      }
    })();
  }, []); // Chạy chỉ một lần khi component được mount lần đầu tiên

  // Quản lý phân trang
  const indexOfLastItem = currentPage * itemsPerPage; // Chỉ số của game cuối cùng trên trang hiện tại
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Chỉ số của game đầu tiên trên trang hiện tại
  const currentGames = listGame.slice(indexOfFirstItem, indexOfLastItem); // Lấy các game của trang hiện tại

  const totalPages = Math.ceil(listGame.length / itemsPerPage); // Tổng số trang

  // Hàm xử lý thay đổi trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Cập nhật trang khi người dùng thay đổi
  };

  // Hàm xử lý thay đổi từ khóa tìm kiếm
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Cập nhật từ khóa tìm kiếm khi người dùng thay đổi
  };

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        {/* Thanh điều hướng (navbar) */}
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          {/* Nút ẩn/hiện thanh bên */}
          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i> {/* Biểu tượng menu */}
          </button>

          {/* Form tìm kiếm trên thanh điều hướng */}
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              {/* Ô input để người dùng nhập từ khóa tìm kiếm */}
              <input
                type="text"
                className="form-control bg-light border-0 small"
                placeholder="Search by tag..." // Gợi ý tìm kiếm theo tag
                aria-label="Search"
                aria-describedby="basic-addon2"
                value={searchTerm} // Giá trị tìm kiếm được lưu trong state
                onChange={handleSearchChange} // Hàm xử lý sự kiện thay đổi giá trị ô tìm kiếm
              />
              <div className="input-group-append">
                {/* Nút tìm kiếm */}
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i> {/* Biểu tượng tìm kiếm */}
                </button>
              </div>
            </div>
          </form>

          {/* Danh sách các mục trong thanh điều hướng */}
          <ul className="navbar-nav ml-auto">
            {/* Mục tìm kiếm cho màn hình nhỏ (d-sm-none) */}
            <li className="nav-item dropdown no-arrow d-sm-none">
              <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-search fa-fw"></i> {/* Biểu tượng tìm kiếm */}
              </a>
              <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                {/* Form tìm kiếm trong dropdown */}
                <form className="form-inline mr-auto w-100 navbar-search">
                  <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                      {/* Nút tìm kiếm */}
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i> {/* Biểu tượng tìm kiếm */}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            {/* Mục thông báo */}
            <li className="nav-item dropdown no-arrow mx-1">
              <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-bell fa-fw"></i> {/* Biểu tượng chuông thông báo */}
                <span className="badge badge-danger badge-counter">3+</span> {/* Số lượng thông báo */}
              </a>
              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                <h6 className="dropdown-header">Alerts Center</h6> {/* Tiêu đề danh sách thông báo */}
                {/* Mục thông báo mẫu */}
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="mr-3">
                    <div className="icon-circle bg-primary">
                      <i className="fas fa-file-alt text-white"></i> {/* Biểu tượng thông báo */}
                    </div>
                  </div>
                  <div>
                    <div className="small text-gray-500">December 12, 2019</div> {/* Thời gian thông báo */}
                    <span className="font-weight-bold">A new monthly report is ready to download!</span> {/* Nội dung thông báo */}
                  </div>
                </a>
                {/* Thêm các mục thông báo khác ở đây */}
                <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a> {/* Liên kết "Hiển thị tất cả thông báo" */}
              </div>
            </li>

            {/* Ngăn cách các mục trong thanh điều hướng */}
            <div className="topbar-divider d-none d-sm-block"></div>

            {/* Mục thông tin người dùng */}
            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Hương</span> {/* Tên người dùng */}
                <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt="User profile" /> {/* Hình ảnh đại diện */}
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                {/* Mục profile */}
                <a className="dropdown-item" href="#">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile {/* Biểu tượng và liên kết tới trang hồ sơ */}
                </a>
                {/* Mục cài đặt */}
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i> Settings {/* Biểu tượng và liên kết tới cài đặt */}
                </a>
                <div className="dropdown-divider"></div> {/* Ngăn cách các mục */}
                {/* Mục đăng xuất */}
                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout {/* Biểu tượng và liên kết đăng xuất */}
                </a>
              </div>
            </li>
          </ul>
        </nav>

        <div className="container-fluid">
          {/* Phần tiêu đề và nút thêm game */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-2 text-gray-800">Bảng</h1>
            {/* Nút "Thêm game mới" kích hoạt modal */}
            <button
              type="button"
              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Thêm game mới
            </button>

            {/* Modal để thêm game mới */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm game mới</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    {/* Form nhập thông tin game */}
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập tên game"
                          value={gameName}
                          onChange={(e) => setGameName(e.target.value)} // Lắng nghe sự thay đổi tên game
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập mô tả game"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)} // Lắng nghe sự thay đổi mô tả game
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập thể loại game"
                          value={genre}
                          onChange={(e) => setGenre(e.target.value)} // Lắng nghe sự thay đổi thể loại game
                        />
                      </div>
                      <div className="custom-file">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="URL image"
                          value={image}
                          onChange={(e) => setImage(e.target.value)} // Lắng nghe sự thay đổi URL hình ảnh
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Ngày phát hành"
                          value={releaseDate}
                          onChange={(e) => setReleaseDate(e.target.value)} // Lắng nghe sự thay đổi ngày phát hành
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập tag"
                          value={tag}
                          onChange={(e) => setTag(e.target.value)} // Lắng nghe sự thay đổi tag
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    {/* Nút đóng modal */}
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>
                      Close</button>
                    {/* Nút lưu thông tin game */}
                    <button type="button" className="btn btn-primary" onClick={createGame}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phần hiển thị danh sách game */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Quản lí Game</h6>
            </div>
            <div className="card-body">
              {/* Bảng hiển thị thông tin game */}
              <div className="table-responsive">
                <table className="table table-bordered" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>ID game</th>
                      <th>Tên game</th>
                      <th>Mô tả game</th>
                      <th>Thể loại</th>
                      <th>Hình ảnh</th>
                      <th>Tag</th>
                      <th>Ngày phát hành</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Duyệt qua các game để hiển thị */}
                    {currentGames.map((game) => (
                      <tr key={game.game_id}>
                        <td>{game.game_id}</td>
                        <td>{game.game_name}</td>
                        <td>{game.description}</td>
                        <td>{game.genre}</td>
                        <td><img src={game.image} alt={game.game_name} width="50" /></td>
                        <td>{game.tag}</td>
                        <td>{game.release_date}</td>
                        <td>
                          {/* Nút chỉnh sửa game */}
                          <button className="btn btn-info btn-circle">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          {/* Nút xóa game */}
                          <button className="btn btn-danger btn-circle" onClick={() => handleDeleteGame(game.game_id)}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Phần phân trang */}
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)} // Thay đổi trang
                    className={`btn btn-primary ${currentPage === index + 1 ? 'active' : ''}`}
                    style={{ margin: '0 5px' }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
