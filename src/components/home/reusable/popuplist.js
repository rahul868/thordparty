import styles from "@/styles/reusable/popuplist.module.css"
export default function Popuplist({ list }) {
    return (
        <div className={styles.plist_wrapper}>
            <div className={styles.plist_subwrapper}>
                <ul>
                    {list.map((item) => {
                        return <li onClick={() => item.callback(item.name)}><span>{item.svg}</span><span>{item.name}</span></li>
                    })}
                </ul>
            </div>
        </div>
    )
}