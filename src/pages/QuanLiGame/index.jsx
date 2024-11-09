import React, { useEffect, useState } from 'react';
import "../../assets/css/sb-admin-2.min.css";
import QuanlyGameApi from '../../api/QuanliGame';
import axios from 'axios';

export default function QuanlyGame() {
  const [listGame, setListGame] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Thêm state để lưu từ khóa tìm kiếm
  const itemsPerPage = 5;
  // Tạo thêm game mới
  const [gameName, setGameName] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState(null);
  const [releaseDate, setReleaseDate] = useState("");
  const [tag, setTag] = useState("");
  const [games, setGames] = useState([]);
  const [gameTotalPages, setGameTotalPages] = useState(1);

  // Tạo game mới khi nhấn nút Save
  const createGame = async () => {
    const gameData = {
      game_name: gameName,
      description: description,
      genre: genre,
      image: image,  // Assuming 'image' is the URL or file path
      release_date: releaseDate,
      tag: tag
    };

    try {
      const response = await QuanlyGameApi.createGame(gameData); // Gửi dữ liệu vào backend
      console.log('Game created successfully:', response.data);
      setListGame((prevGames) => [...prevGames, response.data.data]); // Cập nhật lại danh sách game
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  // Đóng modal và reset trạng thái
  const handleCloseModal = () => {
    setGameName("");
    setDescription("");
    setGenre("");
    setImage("");
    setReleaseDate("");
    setTag("");
    // Reset other state values as necessary
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Fetch the games for the selected page
    // You need to update this part to handle pagination in your data fetching logic
  };

  // Xóa game được chọn
  const handleDeleteGame = async (gameId) => {
    try {
      await QuanlyGameApi.deleteGame(gameId);
      setListGame((prevGames) => prevGames.filter(game => game.game_id !== gameId)); // Update the list after deletion
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  // Tìm kiếm theo tag
  useEffect(() => {
    const fetchGames = async () => {
      try {
        if (searchTerm) {
          // Nếu có từ khóa tìm kiếm, gọi API tìm kiếm theo tag
          const res = await QuanlyGameApi.getGameByTag(searchTerm);
          setListGame(res.data.data);
        } else {
          // Nếu không có từ khóa tìm kiếm, lấy tất cả game
          const res = await QuanlyGameApi.getAllGames();
          setListGame(res.data.data);
        }
      } catch (error) {
        console.error(error);
        setListGame([]); // Fallback to empty array if there's an error
      }
    };

    fetchGames();
  }, [searchTerm]); // Hook phụ thuộc vào searchTerm để fetch dữ liệu khi có thay đổi

// In ra bảng các games
  useEffect(() => {
    (async () => {
      try {
        const res = await QuanlyGameApi.getAllGames();
        const data = res.data.data;
        setListGame(Array.isArray(data) ? data : []); // Ensure `data` is an array
        console.log("data", data);
      } catch (error) {
        console.error(error);
        setListGame([]); // Fallback to empty array if there's an error
      }
    })();
  }, []);

  // Quản lý phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGames = listGame.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(listGame.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Cập nhật từ khóa tìm kiếm khi người dùng thay đổi
  };

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button>
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-light border-0 small"
                placeholder="Search by tag..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={handleSearchChange} // Lắng nghe sự thay đổi từ ô tìm kiếm
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow d-sm-none">
              <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-search fa-fw"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                <form className="form-inline mr-auto w-100 navbar-search">
                  <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow mx-1">
              <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-bell fa-fw"></i>
                <span className="badge badge-danger badge-counter">3+</span>
              </a>
              <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                <h6 className="dropdown-header">Alerts Center</h6>
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
                {/* Additional alert items here */}
                <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
              </div>
            </li>
            <div className="topbar-divider d-none d-sm-block"></div>
            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Hương</span>
                <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt="User profile" />
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a className="dropdown-item" href="#">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i> Settings
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>

        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-2 text-gray-800">Bảng</h1>
            <button
              type="button"
              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Thêm game mới
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm game mới</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập tên game"
                          value={gameName}
                          onChange={(e) => setGameName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập mô tả game"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập thể loại game"
                          value={genre}
                          onChange={(e) => setGenre(e.target.value)}
                        />
                      </div>
                      <div className="custom-file">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="URL image"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Ngày phát hành"
                          value={releaseDate}
                          onChange={(e) => setReleaseDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập tag"
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    {/* // Gọi handleCloseModal khi đóng modal  */}
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>
                      Close</button>
                    <button type="button" className="btn btn-primary" onClick={createGame}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Quản lí Game</h6>
            </div>
            <div className="card-body">
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
                          {/* button để chỉnh sửa */}
                          <button className="btn btn-info btn-circle">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          {/* button để xóa */}
                          <button className="btn btn-danger btn-circle" onClick={() => handleDeleteGame(game.game_id)}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
