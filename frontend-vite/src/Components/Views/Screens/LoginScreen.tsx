import React, { useState } from "react";
import MobileBasicView from "../MobileView/MobileBasicView";
import { CardContent, CardHeader, Card as UICard } from "@/components/ui/card";
import { LoginForm } from "../../LoginComponents/LoginForm";
import { FieldValues } from "react-hook-form";
import fetchTokens from "../../Downloaders/TokenDownloader";
import { useQuery } from "@tanstack/react-query";
import fetchUser from "../../Downloaders/UserDownloader";
import Logout from "../../LoginComponents/logout";

export const LoginScreen = () => {
  const { status, data: login } = useQuery({
    enabled: !!localStorage.getItem("access_token"),
    queryKey: [localStorage.getItem("access_token")],
    queryFn: () => fetchUser(localStorage.getItem("access_token")!),
  });
  return (
    <UICard
      style={{
        minWidth: "500px",
        maxWidth: "700px",
        height: "100vh",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {localStorage.getItem("access_token") == null && (
        <>
          <CardHeader className="cardHeader"></CardHeader>
          <CardContent style={{ height: "50%" }}>
            <LoginForm
              colour="gray"
              disabled={false}
              onSubmit={(vals: FieldValues) => {
                fetchTokens(vals.username, vals.password);
              }}
            ></LoginForm>
          </CardContent>
        </>
      )}
      {localStorage.getItem("access_token") != null && (
        <>
          <h1>Si prihlásený ako {login}</h1>
          <button onClick={() => Logout()}>LOGOUT</button>
        </>
      )}
    </UICard>
  );
};
