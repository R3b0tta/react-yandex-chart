import React from 'react'
import StockChart from "../components/StockChart";

export default function Sber() {
    const figi = "BBG004730N88";

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
