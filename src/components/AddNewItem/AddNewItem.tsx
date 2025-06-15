import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddNewItem.css";
import virtualImg from "../../assets/images/Upload icon.svg";

interface NewItem {
  name: string;
  price: string;
  image_url?: File | null;
}

const AddNewItem: React.FC = () => {
  const [item, setItem] = useState<NewItem>({
    name: "",
    price: "0",
    image_url: null,
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files && files.length > 0) {
      setItem((prevItem) => ({
        ...prevItem,
        image_url: files[0],
      }));
    } else {
      setItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");

      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("price", item.price);
      if (item.image_url) {
        formData.append("image", item.image_url);
      }

      await axios.post(
        "https://web-production-3ca4c.up.railway.app/api/items",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Item added successfully!");
      setItem({ name: "", price: "0", image_url: null });

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="formContainer">
      <h2 className="productTitleStyle">Add New Item</h2>

      <form onSubmit={handleSubmit} className="formStyle">
        <div className="formDecoration">
          <div className="formStyling">
            <p className="feildTitleStyle">Name</p>
            <input
              type="text"
              name="name"
              placeholder="Enter the product name"
              className="productInputStyle"
              value={item.name}
              onChange={handleChange}
              required
            />
            <p className="feildTitleStyle">Price</p>
            <input
              type="number"
              name="price"
              placeholder="Enter the product price"
              className="productInputStyle"
              value={item.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="imageUploadWrapper">
            <p className="feildTitleStyle">Image</p>

            <label htmlFor="image-upload" className="customImageInput">
              <img src={virtualImg} alt="Upload icon" className="uploadIcon" />
              <span>
                {item.image_url ? item.image_url.name : "Choose Image"}
              </span>
            </label>

            <input
              type="file"
              id="image-upload"
              name="image_url"
              accept="image/*"
              className="hiddenFileInput"
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="saveBtnStyle">
          SAVE
        </button>

        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AddNewItem;
