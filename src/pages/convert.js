import React from 'react'
import CSSJSON from "cssjson";
import {mapAttributes} from "../components/deprecated";


const Convert = () => {

    const [inputCss, setInputCss] = React.useState("")

    const zz = mapAttributes(CSSJSON.toJSON(inputCss || ""));
    const output = CSSJSON.toCSS(zz);

    return (
        <div css={{
            padding: '40px',
            maxWidth: '1200px',
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px'
        }}>
            <div css={{
                width: '100%'
            }}>
                Input:
                <textarea css={{
                    width: '100%',
                    minHeight: '200px'
                }} placeholder="Input CSS" onChange={(e) => {
                    setInputCss(e.target.value)
                }} />
            </div>
            <div css={{
                width: '100%'
            }}>
                Result:
                <textarea css={{
                    width: '100%',
                    minHeight: '200px'
                }} value={output} placeholder="Output CSS" />
            </div>
        </div>
    )
}

export default Convert
