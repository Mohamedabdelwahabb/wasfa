import React from "react";
import "./hero.scss";
import heroImg from "../../assest/images/hero.png";
const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
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
