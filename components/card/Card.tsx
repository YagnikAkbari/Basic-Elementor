// import Image from "next/image";
import Image from "next/image";
import React from "react";
import { useDrag } from "react-dnd";

export interface cardData {
  "card-title": string;
  "card-img1": string;
}

const Card = ({
  cardData,
  passedFrom,
  handleClickEdit,
}: {
  cardData: cardData;
  passedFrom?: string;
  handleClickEdit?: Function;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Card",
    item: cardData,
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <li ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="card">
        {passedFrom && passedFrom === "drop-zone" && (
          <button
            className="edit-content"
            onClick={() => {
              handleClickEdit ? handleClickEdit(cardData) : () => {};
            }}
          >
            <Image
              src="/images/edit.png"
              className="edit-icon"
              alt="Edit"
              width={16}
              height={16}
            />
          </button>
        )}
        <Image
          src={cardData?.["card-img1"]}
          className="card__image"
          alt=""
          width={40}
          height={40}
        />
        <div className="card__header">
          <div className="card__header-text">
            <h3 className="card__title">{cardData?.["card-title"]}</h3>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
