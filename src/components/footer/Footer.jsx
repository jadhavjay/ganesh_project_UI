import React from "react";
import classes from "./footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
            NoBroker rental platform lets you find your dream house without any
            broker acting as a middleman. This is the most convenient way of
            finding your house without paying hefty brokerage.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +123 456 789</span>
          <span>YouTube: IamGaneshMahale</span>
          <span>GitHub: IamGaneshMahale</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent: Asia</span>
          <span>Country: India</span>
          <span>Current Location: Mumbai</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
