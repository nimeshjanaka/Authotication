import React from "react";
import { Card } from "antd";
const { Meta } = Card;

interface CardComponentProps {
  imageurl: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
}

const CardComponent: React.FC<CardComponentProps> = ({
  imageurl,
  itemName,
  itemDescription,
  itemPrice,
}) => {
  return (
    <div
      style={{
        margin: "10px",
        width: "230px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        hoverable
        style={{
          width: "100%",
          minHeight: "150px",
          maxHeight: "300px",
          backgroundColor: "#00ffe4",
        }}
      >
        <img
          src={imageurl}
          alt={itemName}
          style={{
            width: "80%",
            height: "auto",
            alignItems: "center",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            border: "1px solid black",
            borderRadius: "10px",
          }}
        />
        <h3>{itemName}</h3>
        <p>{itemDescription}</p>
        <p>LKR {itemPrice}</p>
      </Card>
    </div>
  );
};

export default CardComponent;
