import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const SentimentChart = ({ data }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <PieChart width={400} height={300}>
            <Pie data={data} dataKey="value" nameKey="label" outerRadius={100} fill="#8884d8">
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
};

export default SentimentChart;
