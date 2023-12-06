import { useState, createContext } from "react";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

const Gcommoncontext = createContext();
const Gcommonprovider = (props) => {
  const config = {
    dictionaries: [adjectives, colors, animals],
    separator: " ",
  };

  const [user, setuser] = useState({
    name: "Rahul Darekar",
    email: "rahuldarekar369782@gmail.com",
    a_profile: "",
  });

  const [filemeta, setfilemeta] = useState([]);
  //   [
  //   {
  //     id: "fedgerg34ertgefg34t3",
  //     type: "file",
  //     slug: "Actual slug of file",
  //     name: "",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "now",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t4",
  //     type: "group",
  //     groupname: uniqueNamesGenerator(config),
  //     Lastedit: "3h",
  //     childs: [
  //       {
  //         id: "fedgerg34ertgefg34th",
  //         filename: uniqueNamesGenerator(config),
  //         Lastedit: "22h",
  //       },
  //       {
  //         id: "fedgerg34ertgefg34ta",
  //         filename: uniqueNamesGenerator(config),
  //         Lastedit: "22h",
  //       },
  //       {
  //         id: "fedgerg34ertgefg34tk",
  //         filename: uniqueNamesGenerator(config),
  //         Lastedit: "22h",
  //       },
  //     ],
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },

  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  // ]

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
        filemeta,
        setfilemeta,
      }}
    >
      {props.children}
    </Gcommoncontext.Provider>
  );
};

export { Gcommoncontext, Gcommonprovider };
