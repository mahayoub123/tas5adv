import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import logo from "../../assets/images/Logo.png";
import profile from "../../assets/images/profile.jpg";
import DashIcon from "../../assets/images/DashIcon1.svg";
import DashIcon2 from "../../assets/images/DashIcon2.svg";
import DashIcon3 from "../../assets/images/DashIcon3.svg";
import LogoutBtn from "../../assets/images/sign-out-alt 1.svg";
import searchIcon from "../../assets/images/searchIcon.svg";
import arrow1 from "../../assets/images/Control.svg";
import arrow2 from "../../assets/images/Control2.svg";
import { Col, Container, Row } from "react-bootstrap";
import "./Dash.css";

export interface Item {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  [key: string]: any;
}

const Dash: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.post(
        "https://web-production-3ca4c.up.railway.app/api/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error: any) {
      console.error("Logout failed:", error.message);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.get<Item[]>(
          "https://web-production-3ca4c.up.railway.app/api/items",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItems(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDeleteClick = (item: Item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      await axios.delete(
        `https://web-production-3ca4c.up.railway.app/api/items/${itemToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(items.filter((i) => i.id !== itemToDelete.id));
      setShowModal(false);
      setItemToDelete(null);
    } catch (err: any) {
      console.error("Failed to delete:", err.message);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) return <p className="status">Loading items...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

  return (
    <>
      <div className="dashboardPageContainer">
        <Container fluid>
          <Row>
            <div className="dashboardContainer">
              <Col xs={12} md={3}>
                <div className="containerStyle">
                  <img src={logo} alt="logo" className="logoImgStyle" />
                  <img
                    src={profile}
                    className="profileImgStyle"
                    alt="profile"
                  />
                  <p className="usernameStyle">Mohammed Alkordy</p>
                  <div className="btnContainer">
                    <button className="dashboardBtnStyle">
                      <img src={DashIcon} alt="icon" />
                      Products
                    </button>
                    <button className="dashboardBtnStyle">
                      <img src={DashIcon2} alt="icon" />
                      Favorites
                    </button>
                    <button className="dashboardBtnStyle">
                      <img src={DashIcon3} alt="icon" />
                      Order List
                    </button>
                  </div>
                </div>
                <div>
                  <button className="logoutBtnStyle" onClick={handleLogout}>
                    <img src={LogoutBtn} alt="logout" />
                    Log Out
                  </button>
                </div>
              </Col>

              <Col>
                <div className="searchBarContainer">
                  <input
                    type="text"
                    placeholder="Search product by name"
                    className="searchStyle"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <img src={searchIcon} alt="search" className="iconStyle" />
                  <button
                    className="addBtnStyle"
                    onClick={() => navigate("/additem")}
                  >
                    ADD NEW PRODUCT
                  </button>
                </div>
              </Col>

              <Col xs={12} md={9} className="itemContainer">
                {currentItems.length === 0 ? (
                  <p className="status">No matching products found.</p>
                ) : (
                  currentItems.map((item) => (
                    <div className="item-card" key={item.id}>
                      <div className="image-wrapper">
                        {item.image_url && (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="item-image"
                          />
                        )}
                        <div className="hover-menu">
                          <button
                            className="hover-btn"
                            onClick={() => navigate("/edititem")}
                          >
                            Edit
                          </button>
                          <button
                            className="hover-delete-btn"
                            onClick={() => handleDeleteClick(item)}
                          >
                            Delete
                          </button>
                          <button
                            className="hover-btn"
                            onClick={() => navigate("/showitem")}
                          >
                            Show
                          </button>
                        </div>
                      </div>
                      <h3 className="item-title">{item.name}</h3>
                      <p className="item-description">{item.description}</p>
                    </div>
                  ))
                )}
              </Col>
            </div>
          </Row>
        </Container>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          className="popupStyle"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="modelBodyStyle">
            ARE YOU SURE YOU WANT TO DELETE THE PRODUCT{" "}
            <strong>{itemToDelete?.name}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <div className="popupBtnContainer">
              <Button
                variant="secondary"
                onClick={() => setShowModal(false)}
                className="popupBtnStyle"
              >
                NO
              </Button>
              <Button
                variant="danger"
                onClick={confirmDelete}
                className="popupBtnStyle"
              >
                YES
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="pagination-controls">
        <img
          src={arrow1}
          alt="Previous Page"
          onClick={goToPreviousPage}
          style={{
            cursor: currentPage > 1 ? "pointer" : "not-allowed",
            opacity: currentPage > 1 ? 1 : 0.5,
          }}
        />
        <span className="page-number">
          Page {currentPage} of {totalPages}
        </span>
        <img
          src={arrow2}
          alt="Next Page"
          onClick={goToNextPage}
          style={{
            cursor: currentPage < totalPages ? "pointer" : "not-allowed",
            opacity: currentPage < totalPages ? 1 : 0.5,
          }}
        />
      </div>
    </>
  );
};

export default Dash;
