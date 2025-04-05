import React from 'react';
import { Objection } from '../App';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { exportToExcel } from '../utils/exportToExcel';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardProps {
  objections: Objection[];
}

const Dashboard = ({ objections }: DashboardProps) => {
  const labels = objections.map((obj) => obj.title);

  const barData = {
    labels,
    datasets: [
      {
        label: 'Cliques',
        data: objections.map((obj) => obj.clicks),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const totalPositive = objections.reduce(
    (sum, obj) => sum + obj.responses.reduce((acc, r) => acc + r.positive, 0),
    0
  );
  const totalNegative = objections.reduce(
    (sum, obj) => sum + obj.responses.reduce((acc, r) => acc + r.negative, 0),
    0
  );

  const pieData = {
    labels: ['Positivo', 'Negativo'],
    datasets: [
      {
        label: 'Feedback',
        data: [totalPositive, totalNegative],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  const lineData = {
    labels: objections.map((_, i) => `Objeção ${i + 1}`),
    datasets: [
      {
        label: 'Evolução dos Cliques',
        data: objections.map((obj) => obj.clicks),
        fill: false,
        borderColor: 'rgba(255, 206, 86, 1)',
        tension: 0.3,
      },
    ],
  };

  const handleExport = () => {
    exportToExcel(objections);
  };

  return (
    <div className="dashboard">
      <div className="export-section">
        <button className="export-btn" onClick={handleExport}>
          Exportar Relatório Excel
        </button>
      </div>

      <h2>Painel de Estatísticas</h2>

      <div className="charts-grid">
        <div className="chart-box">
          <h3>Objeções x Cliques</h3>
          <div className="chart-container">
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="chart-box">
          <h3>Feedback Geral</h3>
          <div className="chart-container">
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="chart-box">
          <h3>Evolução dos Cliques</h3>
          <div className="chart-container">
            <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
