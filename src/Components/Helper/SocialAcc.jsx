import React from 'react'
import styles from './SocialAcc.module.css'
const SocialAcc = () => {
  return (
    <div className={`${styles.col} ${styles.social}`}>
    <h1>Social</h1>
    <ul>
      <li><img src="https://svgshare.com/i/5fq.svg" width="32" style={{width: '32px'}}/></li>
      <li><img src="https://svgshare.com/i/5eA.svg" width="32" style={{width: '32px'}}/></li>
      <li><img src="https://svgshare.com/i/5f_.svg" width="32" style={{width: '32px'}}/></li>
    </ul>
  </div>

  )
}

export default SocialAcc
