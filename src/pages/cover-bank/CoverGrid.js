import React from "react"
import { useNavigate } from "react-router-dom"
import { App } from "../../animations/Canvas/index"

// CSS IMPORT
import classes from "./CoverBank.module.scss"

//COMPONENTS
import ProgressiveImg from "../../components/progressiveImg"
import { FetchMoreLoader } from "../../components/FetchMoreLoader"

export default function CoverGrid({
  covers,
  imgRef,
  wrapperRef,
  setSelectedCover,
  setOpenModal,
  error,
  isError,
  isLoading
}) {
  const navigate = useNavigate()

  // Handle loading state
  if (isLoading) {
    return (
      <div className={classes.loadingState}>
        <FetchMoreLoader />
      </div>
    )
  }

  // Handle network/API errors
  if (isError || error) {
    return (
      <div className={classes.errorMessage}>
        <div className={classes.errorContent}>
          <p>{error || "Sorry, we're having trouble connecting to our servers. Please try again later."}</p>
        </div>
      </div>
    )
  }

  // Handle no results found
  if (!covers || covers.length === 0) {
    return (
      <div className={classes.errorMessage}>
        <div className={classes.errorContent}>
          <p>
            Can't find what you're looking for? <a href="https://forms.gle/Tz1SMwkBRbKvd62JA" target="_blank" rel="noopener noreferrer">Submit a cover</a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.coverGrid}>
      {covers.map((cover) => (
        <div key={cover?.id}>
          <figure ref={imgRef}>
            {cover?.fields?.Cover?.[0]?.thumbnails?.full?.url ? (
              <ProgressiveImg
                src={cover?.fields?.Cover[0]?.thumbnails.full.url}
                wrapperRef={wrapperRef}
                cover={cover}
                imgRef={imgRef}
                App={App}
                alt="album cover"
                width="240"
                height="211"
                setOpenModal={setOpenModal}
                setSelectedCover={setSelectedCover}
                placeholderSrc="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
              />
            ) : null}
          </figure>
          <p>{cover?.fields?.Album}</p>
          <h4>{cover?.fields?.CoverArtistString}</h4>
        </div>
      ))}
    </div>
  )
}
