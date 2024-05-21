import styles from './CustomContainer.module.css'

export default function CustomContainer({children,customStyle}){
    return (
        <div style={customStyle} className={styles.boxWrapper}>{children}</div>    
    )
}