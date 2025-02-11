import React from "react"
import classes from "./About.module.scss"

import { contributors } from "../../data/Contributors"


export default function About() {

  return (
    <div className={classes.about}>
      <div className={classes.aboutWrapper}>
        <section>
          <h3>About</h3>
          <p>Cover Bank is Nigeria's largest digital archive of album artwork, home to over 5,300 stunning covers from 1950 to today. Each piece captures a moment in time, from the bold experiments of the 70s to the digital innovations of the present day.</p>
          <p>We're on a mission to celebrate two incredible stories: Nigeria's rich musical heritage and the brilliant designers who gave it its visual power. These artists shaped how the world saw Nigerian music, yet many of their names have been forgotten. Through extensive research, we're crafting the first complete history of Nigerian album cover design, finally giving these creators their due.</p>
          <p>Cover Bank isn't just an archive – it's a living source of inspiration. Our collection draws in music historians piecing together cultural stories, designers seeking fresh perspectives, educators sharing Nigeria's visual legacy, and anyone captivated by the evolution of African design. Every cover tells a story of creativity, culture, and artistic innovation.</p>
          <p>This project is supportedby Independent Arts, a creative incubator dedicated to nurturing Nigerian artistry.</p>
        </section>
        <section>
          <h3>Essays</h3>
          <p>
            <a href="https://www.waxpoetics.com/article/nigerian-1970s-album-covers-wuruwuru-archives/"><b>Face the Music</b></a> <br></br>
            <span>Immaculata Abba & Wax Poetics</span>
          </p>
        </section>
        <section>
          <h3>Join us</h3>
          <p>You can contribute the Cover Bank project by helping to maintain the database, website or publishing a story inspired by the covers. If you're interested, please <a href="https://docs.google.com/forms/d/e/1FAIpQLSd9mEbDJV6DRaJkKqhWrFjPYrIN4cAHZ268H7pmYtYrp6lglA/viewform?usp=sf_link" target="_blank">reach out to us</a>.</p>
        </section>
      </div>

      {/* CONTRIBUTORS */}
      <aside className={classes.contributors}>
        <h3>Contributors</h3>
        {contributors.map((contributor) => (
          <div className={classes.contributorContainer} key={contributor.name}>
            <img src={contributor.image} alt={contributor.name} />
            <div className={classes.textContainer}>
              <p>{contributor.name}</p>
              <span>{contributor.role}</span>
            </div>
          </div>
        ))}
      </aside>
    </div>
  )
}
