import styles from "@/styles/reusable/sent.module.css";

function Rsentiment() {
  const sentiments = [
    { title: "Simplify" },
    { title: "Highlight" },
    { title: "Sentiment" },
    { title: "Summarize" },
    { title: "Enrich" },
    { title: "Critique" },
    { title: "Keywords" },
    { title: "Hashtags" },
    { title: "Place & titles" },
    { title: "Assumptions" },
  ];
  return (
    <>
      <div className={styles.sentiment_wrapper}>
        <div className={styles.sentiment_subwrapper}>
            {sentiments.map((sent , ind) => {
                return (
                    <div className={styles.sent_item}>
                        <span key={ind}>{sent.title}</span>
                    </div>
                )
            })}
        </div>
      </div>
    </>
  );
}

export default Rsentiment;
