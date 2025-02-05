import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const PerformancePage = ({ userId, isManager }) => {
  const [performanceData, setPerformanceData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    fetchPerformanceData();
  }, [userId, selectedPeriod]);

  const fetchPerformanceData = () => {
    // Sample data - replace with actual API call
    const data = [
      { date: '2023-01', hoursLogged: 168, efficiency: 95, tasksCompleted: 45 },
      { date: '2023-02', hoursLogged: 160, efficiency: 92, tasksCompleted: 42 },
      // Add more data points
    ];
    setPerformanceData(data);
  };

  return (
    <div className="performance-container">
      <h2>Performance Dashboard</h2>
      
      <div className="filters">
        <select 
          value={selectedPeriod} 
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="quarter">Quarterly</option>
        </select>
      </div>

      <div className="charts">
        <div className="chart-container">
          <h3>Hours Logged vs Target</h3>
          <LineChart width={600} height={300} data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="hoursLogged" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;
