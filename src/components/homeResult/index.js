import React from "react"
import CoverGrid from "../../pages/cover-bank/CoverGrid"
import { FetchMoreLoader } from "../FetchMoreLoader"

export function HomeResult({
  homeStatus,
  covers,
  setSelectedCover,
  wrapperRef,
  setOpenModal,
  imgRef,
  homeFetch,
  error
}) {
  return (
    <>
      <CoverGrid
        covers={covers}
        setSelectedCover={setSelectedCover}
        setOpenModal={setOpenModal}
        imgRef={imgRef}
        wrapperRef={wrapperRef}
        error={error}
        isError={homeStatus === "error"}
        isLoading={homeStatus === "loading"}
      />
      {homeFetch && covers?.length > 0 && <FetchMoreLoader />}
    </>
  )
}
