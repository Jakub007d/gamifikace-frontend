import React, { useState } from "react";
import { CardContent, CardHeader, Card as UICard } from "@/components/ui/card";
import { LoginForm } from "../../LoginComponents/LoginForm";
import { FieldValues } from "react-hook-form";
import fetchTokens from "../../Downloaders/TokenDownloader";
import { useQuery } from "@tanstack/react-query";
import fetchUser from "../../Downloaders/UserDownloader";
import Logout from "../../LoginComponents/logout";
import { useNavigate } from "react-router-dom";
/**
 * LoginScreen slúži ako rozhranie pre prihlásenie uživateľa.
 * @returns {JSX.Element} - Vracia funkčnú komponentu prihlasovaciej obrazovky.
 */
export const LoginScreen = () => {
  let navigate = useNavigate();
  function color_get(): string {
    if (logged_succesfully == "Ok" || logged_succesfully == "") return "gray";
    else return "red";
  }
  const [logged_succesfully, set_logged] = useState("");
  const { status, data: login } = useQuery({
    enabled: !!localStorage.getItem("access_token"),
    queryKey: [localStorage.getItem("access_token")],
    queryFn: () => fetchUser(localStorage.getItem("access_token")!),
  });
  function login_fc(username: string, password: string) {
    fetchTokens(username, password).then((value) => {
      if (value) set_logged("Ok");
      else if (!value) set_logged("Bad");
      else set_logged("");
    });
  }
  return (
    <UICard className="ui_card">
      {localStorage.getItem("access_token") == null && (
        <>
          <CardHeader className="cardHeader">
            {logged_succesfully == "Bad" && (
              <h2 style={{ color: "red", textAlign: "center" }}>
                Zle zadané prihlasovacie meno alebo heslo
              </h2>
            )}
          </CardHeader>
          <CardContent style={{ height: "50%" }}>
            <LoginForm
              colour={color_get()}
              disabled={false}
              onSubmit={(vals: FieldValues) => {
                login_fc(vals.username, vals.password);
                if (logged_succesfully == "Ok") navigate("/");
              }}
            ></LoginForm>
          </CardContent>
        </>
      )}
      {localStorage.getItem("access_token") != null && (
        <>
          <h1>Si prihlásený ako {login}</h1>
          <button
            onClick={() => {
              Logout();
              navigate("/");
            }}
          >
            LOGOUT
          </button>
        </>
      )}
    </UICard>
  );
};
