import { Gcommonprovider } from "@/context/common_global";
import React, { useEffect } from 'react';

export function Appwrapper({ children,is_main }) {
  useEffect(() => {
    console.log("eiugferf");
  },[]);
  return (
    // is_main is a parameter used for checking if there is a need for Globalcontext wrapper on Children
    <div>
      {is_main ? <Gcommonprovider>{children}</Gcommonprovider> : children}
    </div>
  );
}
