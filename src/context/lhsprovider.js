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

  return (
    <Lhscontext.Provider
      value={{
        messagesContainerRef,
      }}
    >
      {props.children}
    </Lhscontext.Provider>
  );
};

export { Lhscontext, Lhsprovider };
