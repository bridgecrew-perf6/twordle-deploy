import Head from 'next/head'
import React from 'react';
import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
import { useEffect, useState } from "react";

const stats = () => {

    const [history, setHistory] = useState({});
    useEffect(() => {
        // Perform localStorage action
        const curr = JSON.parse(localStorage.getItem("history"));
        if(curr == null) {
            setHistory({});
            console.log("FIRST TIME");
        }
        else {
            setHistory(curr);
        }
        
    }, [])
    console.log(history);
    const piechart = history;
    if (Object.keys(piechart).length != 0) {
        delete piechart['0a'];
        delete piechart['10a'];
    }
    const val_to_color = {1:'#ACDDDE', 2:'#97C876', 3:'#FFBDB3', 4:'#810FFB', 5:'#FF9933', 6: '#1381A2'}
    var colors_to_add = []
    for (const p in piechart) {
        const value = Array.from(p)[0];
        console.log(value);
        colors_to_add.push(val_to_color[value])
    }
    const data1 = {
        labels: Object.keys(piechart),
        datasets: [
            {
                data: Object.values(piechart),
                backgroundColor: colors_to_add,
            },
        ],
    };
      
    return (
        <div>
            {console.log('pie', piechart)}
            {
                Object.keys(piechart).length != 0 ? 
                <div>
                    <title>Stats</title>  
                    <div>
                        <h2>Stats</h2>
                    </div>
                    <Doughnut data={data1} width={400} height={100}/>
                    <h3>Previous Successful Attempts:</h3>
                    </div>
                :<h2>No previous wins</h2>
            }
            <ul>
            {
            Object.keys(piechart).sort().map(key => {
                const att = Array.from(key)[0];
                console.log(val_to_color[att], att)
                return(
                    <p style={{
                        color: val_to_color[att]
                        }}>Attempt# {att}:{piechart[key]}</p>
                )
            
            } 
        )}
            </ul>
        </div>
    )
}

export default stats