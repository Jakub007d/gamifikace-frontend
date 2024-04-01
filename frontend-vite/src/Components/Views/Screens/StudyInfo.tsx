import React, { useEffect, useState } from "react";
import fetchOkruh from "../../Downloaders/OkruhByIDDownloader";
import MobileBasicView from "../MobileView/MobileBasicView";
import GenericCardWindow from "../../CardComponents/GenericCardWindow";
import { Link } from "react-router-dom";
import { NavigationButton } from "../../CardComponents/NavigationButton";
import { Okruh } from "@/src/props/Props";
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
    <MobileBasicView>
      <h1>{lection[0]?.name}</h1>
      <GenericCardWindow>
        <p>TUTO BUDE OBRÁZOK ALEBO NEJAKÝ TEXT</p>
      </GenericCardWindow>
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
    </MobileBasicView>
  );
};
