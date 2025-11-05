import React, { useState } from "react"
import "./Home.scss"

function Home() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle email submission here
    console.log("Email submitted:", email)
  }

  return (
    <div className="home">
      <div className="home__content">
        <div className="home__left">
          <h1 className="home__title">Cover Bank</h1>
          <p className="home__description">
            Explore Nigerian album covers from the 50s to date.
          </p>
        </div>
        <div className="home__right">
          <form className="home__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="home__input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="home__button">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
