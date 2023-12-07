import { React, useState, createContext, useRef } from "react";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
const Lhscontext = createContext();

const Lhsprovider = (props) => {
  const [files, setfiles] = useState([]);

  // const [SelectedFile, setSelectedFile] = useState({});
  const config = {
    dictionaries: [adjectives, colors, animals],
    separator: " ",
  };

  const messagesContainerRef = useRef(null);

  const [filemeta, setfilemeta] = useState([
    {
      id: "fedgerg34ertgefg34t3",
      type: "file",
      slug: "https://www.cl.cam.ac.uk/teaching/1011/OpSystems/os1a-slides.pdf",
      name: "",
      filename: uniqueNamesGenerator(config),
      Lastedit: "now",
    },
    {
      id: "fedgerg34ertgefg34t4",
      type: "group",
      groupname: uniqueNamesGenerator(config),
      Lastedit: "3h",
      childs: [
        {
          id: "fedgerg34ertgefg34th",
          filename: uniqueNamesGenerator(config),
          Lastedit: "22h",
        },
        {
          id: "fedgerg34ertgefg34ta",
          filename: uniqueNamesGenerator(config),
          Lastedit: "22h",
        },
        {
          id: "fedgerg34ertgefg34tk",
          filename: uniqueNamesGenerator(config),
          Lastedit: "22h",
        },
      ],
    },
    {
      id: "fedgerg34ertgefg34t5",
      type: "file",
      filename: uniqueNamesGenerator(config),
      Lastedit: "3min",
    },
    {
      id: "fedgerg34ertgefg34t5",
      type: "file",
      filename: uniqueNamesGenerator(config),
      Lastedit: "3min",
    },
    {
      id: "fedgerg34ertgefg34t5",
      type: "file",
      filename: uniqueNamesGenerator(config),
      Lastedit: "3min",
    },
    {
      id: "fedgerg34ertgefg34t5",
      type: "file",
      filename: uniqueNamesGenerator(config),
      Lastedit: "3min",
    },
    {
      id: "fedgerg34ertgefg34t5",
      type: "file",
      filename: uniqueNamesGenerator(config),
      Lastedit: "3min",
    },

     {
      id: "fedgerg34ertgefg34t5",
      type: "file",
      filename: uniqueNamesGenerator(config),
      Lastedit: "3min",
    },
    {
      id: "fedgerg34ertgefg34t5",
      type: "file",
      filename: uniqueNamesGenerator(config),
      Lastedit: "3min",
    },
    {
      id: "fedgerg34ertgefg34t5",
      type: "file",
      filename: uniqueNamesGenerator(config),
      Lastedit: "3min",
    },
  ]);

  // co nst [filemeta, setfilemeta] = useState([]);

  // const/ [SelectGroupChat, setSelectGroupChat] = useState();

  return (
    <Lhscontext.Provider
      value={{
        messagesContainerRef,
        filemeta,
        setfilemeta,
      }}
    >
      {props.children}
    </Lhscontext.Provider>
  );
};

export { Lhscontext, Lhsprovider };
