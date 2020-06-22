import React, { useState, useEffect } from "react"

const AA = ({ r, location }) => {
  const [img, setImg] = useState("")
  useEffect(() => {
    import(`${location}/${r.journal}-type.png`).then((v) => {
      console.log(v)
      setImg(v.default)
    })
  }, [r.journal, location])
  return (
    <div
      style={{
        flex: "0",
        fontSize: "0.625rem",
        minWidth: "240px",
        margin: "6px",
      }}
    >
      <span style={{ fontWeight: "bold" }}>{r.journal}</span>
      <img
        async
        src={img}
        style={{ margin: 0, boxShadow: "0 0 1px 1px lightgrey" }}
      />
      font-size <span style={{ fontWeight: "bold" }}> {r.fontSize}</span>
      <br />
      line-height <span style={{ fontWeight: "bold" }}> {r.lineHeight}</span>
      <br />
      font-family <span style={{ fontWeight: "bold" }}> {r.fontFamily}</span>
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
}

export default AA
