import React from "react";
import "./hero.css";
import heroImg from "../../assest/images/hero2.png";
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <article className="text">
          <p>Put your recipes in a good place </p>
          <span>Easily save, organize, and customize recipes</span>
          <button> SING UP</button>
        </article>
        <article>
          <img src={heroImg} alt="" />
        </article>
      </div>
    </section>
  );
};

export default Hero;
