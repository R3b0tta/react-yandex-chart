import React from 'react'
import StockChart from "../components/StockChart";

export default function Ydex() {
    const figi = "TCS00A107UL4";

    return (
        <div>
            <h1>ГРАФИК АКЦИЙ Т-БАНКА</h1>
            {
                <StockChart
                    figi = {figi}
                />
            }
        </div>
    )
}
