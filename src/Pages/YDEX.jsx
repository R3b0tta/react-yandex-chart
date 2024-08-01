import React from 'react'
import StockChart from "../components/StockChart";

export default function Ydex() {
    const figi = "TCS00A107T19";

    return (
        <div>
            <h1>ГРАФИК ЯНДЕКС АКЦИЙ</h1>
            {
                <StockChart
                    figi = {figi}
                />
            }
        </div>
    )
}
