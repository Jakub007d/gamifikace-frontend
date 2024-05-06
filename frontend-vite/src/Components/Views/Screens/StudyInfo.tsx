import React, { useEffect, useState } from "react";
import fetchOkruh from "../../Downloaders/OkruhByIDDownloader";
import { NavigationButton } from "../../CardComponents/NavigationButton";
import { Okruh } from "@/src/props/Props";
import { CardContent, CardHeader, Card as UICard } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Button, CircularProgress } from "@mui/material";
interface Props {
  /** ID okruhu */
  okruhID: string;
}
/**
 * StudyInfo komponent slúži pre zobrazenie detailu okruhu a taktiež ako rozcestnik pre módy.
 * @param {Props} props
 * @param {string} okruhID - ID okruhu.
 * @returns {JSX.Element} -Vracia funkčnú komponentu StudyScreen.
 */
export const StudyInfo = ({ okruhID }: Props) => {
  const [l, setLection] = useState(Array<Okruh>);
  async function getOkruh(OkruhID: string) {
    const fetched: Okruh[] = await fetchOkruh(OkruhID);
    setLection(fetched);
  }
  useEffect(() => {
    getOkruh(okruhID);
  }, []);
  const {
    status,
    error,
    data: lection,
  } = useQuery({
    queryKey: ["okruh", okruhID],
    queryFn: () => fetchOkruh(okruhID),
  });
  if (status === "pending")
    return (
      <>
        <UICard className="ui_card">
          <CardHeader className="cardHeader">
            <div
              className="d-flex border border-secondary rounded card-body justify-content-center"
              style={{
                height: "100%",
                margin: "20px",
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <CircularProgress style={{ margin: "auto" }} />
            </div>
          </CardHeader>
          <CardContent
            style={{ height: "50%", display: "flex", flexDirection: "column" }}
          >
            <Button
              disabled
              className="btn btn-primary"
              style={{
                width: "80%",
                marginLeft: "auto",
                marginTop: "10px",
                marginBottom: "10px",
                marginRight: "auto",
              }}
            >
              Flash Cards
            </Button>
            <Button
              disabled
              className="btn btn-primary"
              style={{
                width: "80%",
                marginTop: "10px",
                marginBottom: "10px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Kvíz
            </Button>
          </CardContent>
        </UICard>
      </>
    );
  else if (status === "success")
    return (
      <UICard className="ui_card">
        <h1 style={{ textAlign: "center" }}>{lection[0]?.name}</h1>

        <CardHeader className="cardHeader">
          <div
            className="d-flex border border-secondary rounded card-body justify-content-center"
            style={{
              height: "100%",
              margin: "20px",
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p>TUTO BUDE OBRÁZOK ALEBO NEJAKÝ TEXT</p>
          </div>
        </CardHeader>

        <CardContent
          style={{ height: "50%", display: "flex", flexDirection: "column" }}
        >
          <NavigationButton
            directory="/FlashCards"
            text="Flash Cards"
            onSelected={() => null}
          ></NavigationButton>
          <NavigationButton
            directory="/Quiz"
            text="Kvíz"
            onSelected={() => null}
          ></NavigationButton>
        </CardContent>
      </UICard>
    );
  else status === "error";
  return (
    <UICard className="ui_card">
      <h1 style={{ textAlign: "center" }}>Error pri načítaní okruhu</h1>

      <CardHeader className="cardHeader">
        <div
          className="d-flex border border-secondary rounded card-body justify-content-center"
          style={{
            height: "100%",
            margin: "20px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <p>Pre správne fungovanie skúste znovu načítať stránku</p>
        </div>
      </CardHeader>

      <CardContent
        style={{ height: "50%", display: "flex", flexDirection: "column" }}
      >
        <Button
          disabled
          className="btn btn-primary"
          style={{
            width: "80%",
            marginLeft: "auto",
            marginTop: "10px",
            marginBottom: "10px",
            marginRight: "auto",
          }}
        >
          Flash Cards
        </Button>
        <Button
          disabled
          className="btn btn-primary"
          style={{
            width: "80%",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Kvíz
        </Button>
      </CardContent>
    </UICard>
  );
};
