import { useContext } from "react";
import { Rhscontext } from "@/context/provider";

function useDragandDrop() {
  const context = useContext(Rhscontext);

  const { files, setfiles } = context;
  const dragfunc = () => {
    var dropArea = document.getElementById("drop-area");

    if (dropArea === null) {
      return null;
    }

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.addEventListener(eventName, highlight, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
      dropArea.classList.add("hover");
    }

    function unhighlight(e) {
      dropArea.classList.remove("hover");
    }

    dropArea.addEventListener("drop", handleDrop, false);

    // svae file in function
    function handleDrop(e) {
      var dt = e.dataTransfer;
      var dragfiles = dt.files;
      handlefiledsaved(dragfiles);
    }

    function handlefiledsaved(dragfiles) {
      try {
        if (files.length > 0) {
          let newAddedFiles = Array.from(files);
          for (let i = 0; i < dragfiles.length; i++) {
            console.log(dragfiles[i]);
            newAddedFiles.push(dragfiles[i]);
          }
          setfiles(newAddedFiles);
        } else {
          setfiles(Array.from(dragfiles));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { dragfunc };
}

export default useDragandDrop;
