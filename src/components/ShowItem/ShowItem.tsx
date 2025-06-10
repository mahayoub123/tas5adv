import phone from "../../assets/images/Phone.png";
import "./ShowItem.css";

const ShowItem: React.FC = () => {
  return (
    <div>
      <h1 className="productTitleStyle">iPhone X</h1>
      <img src={phone} alt="phone" className="phoneImgStyle" />
      <div className="rowStyling">
        <div className="infoContainer">
          <p className="parStyle">Price:</p>
          <p className="descStyle">200$</p>
        </div>
        <div className="infoContainer">
          <p className="parStyle">Added At:</p>
          <p className="descStyle">30/12/2020</p>
        </div>
      </div>
      <div className="rowStyling2">
        <div className="infoContainer">
          <p className="parStyle">Updated At:</p>
          <p className="descStyle">30/12/2020</p>
        </div>
      </div>
    </div>
  );
};

export default ShowItem;
