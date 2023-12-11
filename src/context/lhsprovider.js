import { React, useState, createContext, useContext } from "react";
import { Gcommoncontext } from "./common_global";
const Lhscontext = createContext();
const Lhsprovider = (props) => {
  //Global context
  const { user, setcurrdoc, setfilemeta } = useContext(Gcommoncontext);
  const [filelhs, setfilelhs] = useState([]);

  // group creation for storing chat API status and data
  const [gasuccess, setgasuccess] = useState(false);
  const [galoading, setgaloading] = useState(false);
  const [gaerror, setgaerror] = useState(false);

  // Function for LHS bar document uploading.
  // Flow from lhscontext -> globalcontext

  const setSeperateFileLhs = async (files) => {
    setgaloading(true);
    try {
      // Simulate API call for user file metadata
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/process_documents?emailid=${user.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // content type based on your API requirements
          },
          body: JSON.stringify(files),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update group");
      }
      const result = await response.json();
      setfilemeta((prevFiles) => [...files, ...prevFiles]);
      setcurrdoc(files[0]);
      setgasuccess(true);
      setTimeout(() => {
        setgasuccess(false);
        setgaerror(false);
      }, 4000);
      return { success: true };
    } catch (err) {
      setgaerror(err.message);
      setTimeout(() => {
        setgaerror(false);
      }, 4000);
      return { success: false };
    } finally {
      setgaloading(false);
    }
  };

  return (
    <Lhscontext.Provider
      value={{
        setSeperateFileLhs,
        gaerror,
        galoading,
        gasuccess,
        setfilelhs,
        filelhs,
      }}
    >
      {props.children}
    </Lhscontext.Provider>
  );
};

export { Lhscontext, Lhsprovider };
