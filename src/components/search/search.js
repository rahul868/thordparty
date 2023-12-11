import styles from "@/styles/search/search.module.css";
import { Gcommoncontext } from "@/context/common_global";
import { useContext, useEffect, useState } from "react";
import File from "../home/reusable/file";
export default function Search() {
  const [searchtoken, setsearchtoken] = useState("");
  const { filemeta } = useContext(Gcommoncontext);
  useEffect(() => {
    return () => {
      setsearchtoken("");
    };
  }, []);

  function closesearch() {
    document.querySelectorAll("[data-g-navbar-flyer]").forEach((ele) => {
      ele.classList.remove("popup_container_active");
    });
    document.querySelector("#overlay").classList.remove("active_overlay");
  }

  function sortrecentdocs(arr) {
    const sortedDescending = arr.sort((a, b) => b.lastedit - a.lastedit);
    return sortedDescending;
  }
  return (
    <div className={styles.searchwrapper}>
      <div className={styles.searchsubwrapper}>
        <div className={styles.searchwrapper_content}>
          <div>
            <svg
              fill="rgba(55, 53, 47, 0.45)"
              className="sidebarSearch"
              display="block"
              viewBox="0 0 20 20"
              style={{
                width: 20,
                height: "100%",
                WebkitFlexShrink: "0",
                MsFlexShrink: "0",
                flexShrink: "0",
              }}
            >
              <path
                fillRule="evenodd"
                d="M3.246 8.82c0-.765.144-1.483.43-2.153A5.673 5.673 0 014.88 4.89a5.457 5.457 0 013.93-1.634c.77 0 1.49.143 2.16.43a5.523 5.523 0 011.778 1.204c.51.51.91 1.103 1.196 1.777.292.67.438 1.388.438 2.153 0 .602-.094 1.174-.28 1.716a5.496 5.496 0 01-.76 1.484l3.118 3.13a.842.842 0 01.212.322c.05.123.075.253.075.39 0 .19-.043.364-.13.519a.983.983 0 01-.875.499c-.137 0-.269-.025-.396-.075a.927.927 0 01-.335-.22l-3.138-3.137a5.801 5.801 0 01-1.435.69 5.33 5.33 0 01-1.627.247 5.457 5.457 0 01-2.16-.43 5.6 5.6 0 01-1.771-1.197c-.51-.51-.912-1.1-1.203-1.77a5.475 5.475 0 01-.43-2.168zm1.456 0c0 .57.105 1.103.315 1.6.214.497.51.934.888 1.312.379.374.816.668 1.313.882a3.98 3.98 0 001.593.321c.57 0 1.102-.107 1.6-.32a4.154 4.154 0 002.194-2.195c.214-.497.32-1.03.32-1.6a3.98 3.98 0 00-.32-1.592 4.177 4.177 0 00-.89-1.313 4.006 4.006 0 00-1.305-.882 3.997 3.997 0 00-1.6-.321 3.98 3.98 0 00-1.592.321c-.497.21-.934.504-1.313.882a4.178 4.178 0 00-.888 1.313 4.054 4.054 0 00-.315 1.592z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            autoFocus
            placeholder="Search your docs..."
            id="doc_search_in"
            onChange={(e) => setsearchtoken(e.target.value)}
            className={styles.docsearch_input}
          />
        </div>
        {!searchtoken ? (
          <div className={styles.result_wrapper}>
            <div className={styles.result_title}>Recently access docs</div>
            <div className={styles.results}>
              {sortrecentdocs(filemeta).map((file, index) => {
                if (file.type == "file") {
                  return (
                    <File callback={closesearch} file={file} key={index} />
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
        {searchtoken ? (
          <div className={styles.result_wrapper}>
            <div className={styles.result_title}>Found docs</div>
            <div className={styles.results}>
              {filemeta
                .filter((file) =>
                  file.name.toLowerCase().includes(searchtoken.toLowerCase())
                )
                .map((file, index) => (
                  <File callback={closesearch} file={file} key={index} />
                ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
