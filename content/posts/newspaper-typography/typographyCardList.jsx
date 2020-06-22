import React from "react"

import TypographyCard from "./typographyCard"

import resultKor from "./journals.kor/result.json"
import resultUsa from "./journals.usa/result.json"
import resultChn from "./journals.chn/result.json"
import resultJpn from "./journals.jpn/result.json"

const zonePath = {
  kor: "./journals.kor",
  usa: "./journals.usa",
  chn: "./journals.chn",
  jpn: "./journals.jpn",
}

const result = {
  kor: resultKor,
  usa: resultUsa,
  chn: resultChn,
  jpn: resultJpn,
}

const TypographyCardList = ({ zone }) => {
  const results = result[zone]
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "1080px",
        width: "100vw",
        alignSelf: "center",
        justifyContent: "space-between",
      }}
    >
      {results.map((r) => {
        return (
          <TypographyCard r={r} key={r.journal} location={zonePath[zone]} />
        )
      })}
    </div>
  )
}

export default TypographyCardList
