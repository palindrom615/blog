import React from "react"

import Img from "../../../src/components/image"

import resultKor from "./journals.kor/result.json"
import resultUsa from "./journals.usa/result.json"
import resultChn from "./journals.chn/result.json"
import resultJpn from "./journals.jpn/result.json"

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
          <div
            style={{
              flex: "0",
              fontSize: "0.625rem",
              minWidth: "240px",
              margin: "6px",
            }}
            key={r.journal}
          >
            <span style={{ fontWeight: "bold" }}>{r.journal}</span>
            <Img
              async
              src={`${r.journal}-type.png`}
              style={{ margin: 0, boxShadow: "0 0 1px 1px lightgrey" }}
              alt={`${r.journal}의 본문 타이포그래피`}
            />
            font-size <span style={{ fontWeight: "bold" }}> {r.fontSize}</span>
            <br />
            line-height{" "}
            <span style={{ fontWeight: "bold" }}> {r.lineHeight}</span>
            <br />
            font-family{" "}
            <span style={{ fontWeight: "bold" }}> {r.fontFamily}</span>
            {r.letterSpacing !== "normal" && (
              <>
                <br />
                letter-spacing{" "}
                <span style={{ fontWeight: "bold" }}> {r.letterSpacing}</span>
              </>
            )}
            {r.wordSpacing !== "0px" && (
              <>
                <br />
                word-spacing{" "}
                <span style={{ fontWeight: "bold" }}> {r.wordSpacing}</span>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default TypographyCardList
