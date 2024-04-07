import React, { useEffect, useState } from "react";
import fetchOkruh from "../../Downloaders/OkruhByIDDownloader";
import MobileBasicView from "../MobileView/MobileBasicView";
import GenericCardWindow from "../../CardComponents/GenericCardWindow";
import { Link } from "react-router-dom";
import { NavigationButton } from "../../CardComponents/NavigationButton";
import { Okruh } from "@/src/props/Props";
import { CardContent, CardHeader, Card as UICard } from "@/components/ui/card";
interface Props {
  okruhID: string;
}

export const StudyInfo = ({ okruhID }: Props) => {
  const [lection, setLection] = useState(Array<Okruh>);
  async function getOkruh(OkruhID: string) {
    const fetched: Okruh[] = await fetchOkruh(OkruhID);
    setLection(fetched);
  }
  useEffect(() => {
    getOkruh(okruhID);
  }, []);
  return (
    <UICard className="ui_card">
      <h1 style={{ textAlign: "center" }}>{lection[0]?.name}</h1>

      <CardHeader className="cardHeader">
        <div
          className="d-flex border border-secondary rounded card-body justify-content-center"
          style={{ height: "100%", margin: "20px" }}
        >
          <p>TUTO BUDE OBRÁZOK ALEBO NEJAKÝ TEXT</p>
        </div>
      </CardHeader>

      <CardContent
        style={{ height: "50%", display: "flex", flexDirection: "column" }}
      >
        <NavigationButton
          directory="/FlashCards"
          text="Štúdium"
          onSelected={() => null}
        ></NavigationButton>
        <NavigationButton
          directory="/Quiz"
          text="Quiz"
          onSelected={() => null}
        ></NavigationButton>
        <NavigationButton
          directory="/AddQuestion"
          text="Prida Otázku"
          onSelected={() => null}
        ></NavigationButton>
      </CardContent>
    </UICard>
  );
};
