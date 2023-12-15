import { useState } from "react";
import Button from "../home/reusable/button";

export default function Groupname({ close, inputchange, onlyclose }) {

  return (
    <div style={{ width: 300, padding: "18px 12px" }}>
      <input
        style={{
          padding: 10,
          width: "100%",
          border: "1px solid #ededed",
          outline: "none",
          borderRadius: 4,
          marginBottom: 10,
        }}
        placeholder="Type name for group..."
        onChange={(e) => inputchange(e.target.value)}
      />
      <Button title={"SET NAME"} callback={onlyclose} />
    </div>
  );
}
