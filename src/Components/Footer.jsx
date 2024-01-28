import React from 'react';
import styles from './Footer.module.css';
import { ReactComponent as Dogs } from '../Assets/dogs-footer.svg';
import SocialAcc from './Helper/SocialAcc';

const Footer = () => {
  let year = new Date().getFullYear();

  return (

<footer className={styles.footer}>
  <div className={styles.contain}>
  <div className={styles.col}>
    <h1>Company</h1>
    <ul>
      <li>About</li>
      <li>Mission</li>
      <li>Services</li>
      <li>Social</li>
      <li>Get in touch</li>
    </ul>
  </div>
  <div className={styles.col}>
    <h1>Products</h1>
    <ul>
      <li>About</li>
      <li>Mission</li>
      <li>Services</li>
      <li>Social</li>
      <li>Get in touch</li>
    </ul>
  </div>
  <div className={styles.col}>
    <h1>Accounts</h1>
    <ul>
      <li>About</li>
      <li>Mission</li>
      <li>Services</li>
      <li>Social</li>
      <li>Get in touch</li>
    </ul>
  </div>



  <div className={styles.col}>
    <h1>Resources</h1>
    <ul>
      <li>Webmail</li>
      <li>Redeem code</li>
      <li>WHOIS lookup</li>
      <li>Site map</li>
      <li>Web templates</li>
      <li>Email templates</li>
    </ul>
  </div>
  <div className={styles.col}>
    <h1>Support</h1>
    <ul>
      <li>Contact us</li>
      <li>Web chat</li>
      <li>Open ticket</li>
    </ul>
  </div>
  <SocialAcc />

     <div className={styles.col}>
    <p>   <Dogs />
</p>
   <p>Dogs. Alguns direitos reservados. {year}</p>
    </div>
<div className={styles.clearfix}></div>
</div>
</footer>


//
//
//

  );
};

export default Footer;
