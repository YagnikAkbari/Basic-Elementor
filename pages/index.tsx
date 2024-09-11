import Card, { cardData } from "@/components/card/Card";
import Image from "next/image";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDrop } from "react-dnd";
import "bootstrap/dist/css/bootstrap.min.css";

export interface DraggableBounds {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

export default function Home() {
  const [showEditorPane, setShowEditorPane] = useState<boolean>(false);
  const cardData = [
    {
      id: 1,
      "card-img1": "/images/sections.png",
      "card-title": "Inner Section",
    },
    {
      id: 2,
      "card-img1": "/images/heading.png",
      "card-title": "Heading",
    },
    {
      id: 3,
      "card-img1": "/images/text.png",
      "card-title": "Text Editor",
    },
    {
      id: 4,
      "card-img1": "/images/image.png",
      "card-title": "Image",
    },
  ];
  const [list, setList] = useState<any[]>([]);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "Card",
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (cardData) => {
      addList(cardData?.id);
    },
  }));

  const addList = (id) => {
    let ddd = cardData?.filter((item: any) => item?.id === id)[0];
    if (ddd && Object?.keys(ddd)?.length > 0)
      setList((list) => [...list?.filter((item: any) => id !== item?.id), ddd]);
  };  

  return (
    <div className="flex">
      <ul className="drag-zone">
        {cardData &&
          cardData.length > 0 &&
          cardData.map((item: cardData, idx: number) => (
            <Card cardData={item} key={idx} />
          ))}
      </ul>
      <div
        className="drop-zone"
        ref={drop}
        style={{ backgroundColor: isOver ? "red" : "white" }}
      >
        {canDrop ? "Release to drop" : "Drag a box here"}{" "}
        {list?.map((item: cardData, idx: number) => (
          <Card
            cardData={item}
            key={idx}
            passedFrom="drop-zone"
            handleClickEdit={(cardData: cardData) => {
              console.log("cardData", cardData);
              setShowEditorPane(true);
            }}
          />
        ))}
      </div>
      <Offcanvas
        show={showEditorPane}
        onHide={() => {
          setShowEditorPane(false);
        }}
        backdropClassName="d-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Component</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Extra Properties Cooming Soon to be updated...
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
