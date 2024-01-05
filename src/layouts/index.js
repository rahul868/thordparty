import { Gcommonprovider } from "@/context/common_global";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function Appwrapper({ children, page }) {
  if (page == "signin" || page == "signup") {
    return (
      <GoogleOAuthProvider clientId="928923089849-hr5t4dedrv9b3iikk88joitjapvrldea.apps.googleusercontent.com">
        {children}
      </GoogleOAuthProvider>
    );
  }
  return <Gcommonprovider>{children}</Gcommonprovider>;
}
