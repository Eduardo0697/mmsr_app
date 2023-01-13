import styles from "./SongPlayingAnimation.module.css"
export default function SongPlayingAnimation(){
    return(
        <div className={styles.icon}>
            <span className={styles.animated}/>
            <span className={styles.animated}/>
            <span className={styles.animated}/>
        </div>
    )
}