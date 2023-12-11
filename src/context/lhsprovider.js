import { React, useState, createContext, useRef } from "react";
const Lhscontext = createContext();

const Lhsprovider = (props) => {
  const [file, setfile] = useState([]);
  
  // group creation for storing chat API status and data
  const [gasuccess, setgasuccess] = useState(false);
  const [galoading, setgaloading] = useState(false);
  const [gaerror, setgaerror] = useState(false);

  // Function for LHS bar document uploading.
  // Flow from lhscontext -> globalcontext

  const setSeperateFile = async (files) => {
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
        setSeperateFile,
        gaerror,
        galoading,
        gasuccess,
        setfile,
        file,
      }}
    >
      {props.children}
    </Lhscontext.Provider>
  );
};

export { Lhscontext, Lhsprovider };
