import { useState, createContext } from "react";
const Gcommoncontext = createContext();
const Gcommonprovider = (props) => {
  const [user, setuser] = useState({
    name: "Rahul Darekar",
    email: "rahuldarekar369782@gmail.com",
    a_profile:
      "",
  });
  const [currdoc, setcurrdoc] = useState({
    id: "fedgerg34ertgefg34t3",
    type: "file",
    slug: "Actual slug of file",
    name: "",
    filename: "index.m3u8",
    Lastedit: "3 days ago",
  });
  return (
    <Gcommoncontext.Provider
      value={{
        currdoc,
        setcurrdoc,
        user,
      }}
    >
      {props.children}
    </Gcommoncontext.Provider>
  );
};

export { Gcommoncontext, Gcommonprovider };
