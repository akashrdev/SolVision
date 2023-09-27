// import { useState, useEffect, useRef } from 'react';
// import { Connection, clusterApiUrl } from '@solana/web3.js';
// import * as d3 from 'd3';
// const url = process.env.NEXT_PUBLIC_ENDPOINT;

// const TPS = () => {
//   const connection = new Connection(url);
//   const [transactionData, setTransactionData] = useState([]);
//   const [TPS, setTPS] = useState(0);
//   const [transactions, setTransactions] = useState([])
//   const svgRef = useRef();

//   useEffect(() => {
//     let speedPerTransaction = 0;
//     connection.getRecentPerformanceSamples(60 * 1).then((result) => {
//       setTransactions(result)
//       result.map((transaction) => {
//         speedPerTransaction +=
//           transaction.numTransactions / transaction.samplePeriodSecs;
//       });
//       setTPS(speedPerTransaction / 60);
//     });

//     const width = 800;
//     const height = 400;
//     const svg = d3
//       .select(svgRef.current)
//       .attr('width', width)
//       .attr('height', height)
//       .style('overflow', 'visible')
//       .style('margin-top', '75px');

//     const xScale = d3.scaleBand();
//     .domain(transactions.map((transaction, i) => i))
//     .range([0, w])
//     .padding(0.5)

//     const yScale = d3.scaleLinear()
//     .domain([0, h])
//     .range([h, 0])

//     const xAxis = d3.axisBottom(xScale)
//     .ticks(transactions.length)

//     const yAxis = d3.axisLeft(yScale)
//     .ticks(5)
//     svg.append('g')
//     .call(xAxis)
//     .attr('transform', `translate(0, ${height})`)
//     svg.append('g')
//     .call(yAxis)

//     svg.selectAll('.bar')
//     .data(transactions.numTransactions)
//     .join('rect')
//     .attr('x', (v, i) => xScale(i))
//     .attr('y', yScale)
//     .attr('width', xScale(bandwidth()))
//     .attr('height', val => height - yScale(val))
//   }, []);

//   return (
//     // <div className="border border-black w-1/3 h-36 rounded-lg">
//     //   <div className="flex flex-row justify-between p-2">
//     //     <h1>TPS</h1>
//     //     <h1 className="text-black font-bold">{Math.ceil(TPS)}</h1>
//     //   </div>
//     // </div>
//     <div>
//       <svg ref={svgRef}></svg>
//     </div>
//   );
// };

// export default TPS;

import { useState, useEffect, useRef } from 'react';
import { Connection } from '@solana/web3.js';
import * as d3 from 'd3';

const url = process.env.NEXT_PUBLIC_ENDPOINT;

const TPS = () => {
  const connection = new Connection(url);
  const [transactionData, setTransactionData] = useState([]);
  const [TPS, setTPS] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    let speedPerTransaction = 0;
    connection.getRecentPerformanceSamples(60 * 0.5).then((result) => {
      result.forEach((transaction) => {
        speedPerTransaction +=
          transaction.numTransactions / transaction.samplePeriodSecs;
      });
      setTPS(speedPerTransaction / 30);
      setTransactions(result);
    });
  }, []);

  useEffect(() => {
    if (transactions.length === 0) return;

    const width = 900;
    const height = 400;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('overflow', 'visible')
      .style('margin-top', '75px');

    const xScale = d3
      .scaleBand()
      .domain(transactions.map((_, i) => i))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(transactions, (d) => d.numTransactions / d.samplePeriodSecs),
      ])
      .range([height, 0]);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(transactions.length)
      .tickFormat(() => '')
      .tickSize(0);

    const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(0);

    svg
      .selectAll('.bar')
      .data(transactions)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (_, i) => xScale(i))
      .attr('y', (d) => yScale(d.numTransactions / d.samplePeriodSecs))
      .attr('width', xScale.bandwidth())
      .attr(
        'height',
        (d) => height - yScale(d.numTransactions / d.samplePeriodSecs)
      )
      .attr('fill', (d) => {
        if (d.numTransactions / d.samplePeriodSecs < 750) {
          return '#10b981';
        } else {
          return '#10b981';
        }
      });

    svg
      .append('g')
      .attr('class', 'axis')
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`)
      .call((g) => g.select('.domain').remove()) // This line removes the x-axis line.
      .selectAll('.tick line')
      .remove();

    svg
      .append('g')
      .attr('class', 'axis')
      .call(yAxis)
      .call((g) => g.select('.domain').remove()) // Add this line to remove the y-axis line
      .selectAll('text')
      .attr('fill', '#fafafa')
      .selectAll('.tick line')
      .remove();
  }, [transactions]);

  return (
    <div className="flex flex-col border border-black rounded-lg w-[1000px] pl-1 bg-zinc-800">
      <div className="h-10 border-b border-black flex justify-between">
        <h1 className="m-2 text-white">Transactions per second (TPS)</h1>
        {TPS < 750 ? (
          <h1 className="text-red-500 font-bold m-2">{Math.ceil(TPS)}</h1>
        ) : (
          <h1 className="text-emerald-500 font-bold m-2">{Math.ceil(TPS)}</h1>
        )}
      </div>
      <div className="flex justify-center mb-2">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default TPS;
