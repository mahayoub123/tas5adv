import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditItem.css";

interface Item {
  id?: number;
  name: string;
  price: string;
  image_url?: string;
  imageFile?: File | null;
}

const EditItem: React.FC = () => {
  const [item, setItem] = useState<Item>({
    name: "",
    price: "",
    imageFile: null,
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("TOKEN:", token);
        console.log("ID:", id);
        if (!token) throw new Error("Unauthorized");

        const response = await axios.get(
          `https://web-production-3ca4c.up.railway.app/api/items/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data, "kkkkk");

        setItem({
          name: response.data.name,
          price: response.data.price.toString(),
          image_url: response.data.image_url,
          imageFile: null,
        });
      } catch (err: any) {
        console.error("FETCH ERROR:", err);
        setError(err.response?.data?.message || err.message);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setItem((prevItem) => ({
        ...prevItem,
        imageFile: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("price", item.price);
      if (item.imageFile) {
        formData.append("image", item.imageFile);
      }

      formData.append("_method", "PUT");

      await axios.post(
        `https://web-production-3ca4c.up.railway.app/api/items/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      setSuccess("Item updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="formContainer">
      <h2 className="productTitleStyle">Edit Item</h2>

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

          <div>
            <p className="feildTitleStyle">Image</p>
            {item.image_url && (
              <img
                src={item.image_url}
                alt="Current"
                style={{ width: "150px", marginBottom: "10px" }}
              />
            )}
            <input
              type="file"
              name="image"
              className="productInputStyle2"
              accept="image/*"
              onChange={handleFileChange}
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

export default EditItem;
