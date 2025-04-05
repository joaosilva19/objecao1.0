// src/Dashboard.tsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useFeedbackContext } from "./FeedbackProvider";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Registrar componentes do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard() {
  const { objections, feedbacks, totalPositives, totalNegatives, mostClickedObjection } = useFeedbackContext();

  // Dados para Pie Chart: Distribuição de Feedback
  const pieData = {
    labels: ["Positivos", "Negativos"],
    datasets: [
      {
        data: [totalPositives, totalNegatives],
        backgroundColor: ["green", "red"],
      },
    ],
  };

  // Ordenar objeções pelo número de cliques (para o Bar Chart)
  const sortedByClicks = useMemo(() => {
    const copy = [...objections];
    return copy.sort((a, b) => b.clickedCount - a.clickedCount);
  }, [objections]);

  const barData = {
    labels: sortedByClicks.map((o) => o.text),
    datasets: [
      {
        label: "Cliques na Objeção",
        data: sortedByClicks.map((o) => o.clickedCount),
        backgroundColor: "#3f51b5",
      },
    ],
  };

  // Ranking de respostas mais positivas
  const positiveCountMap: Record<string, number> = {};
  feedbacks.forEach((f) => {
    if (f.result === "Positiva") {
      if (!positiveCountMap[f.response]) positiveCountMap[f.response] = 0;
      positiveCountMap[f.response]++;
    }
  });
  const rankingResponses = Object.entries(positiveCountMap).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
      {/* Cabeçalho */}
      <div style={{ backgroundColor: "#3f51b5", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff" }}>
        <h2 style={{ margin: 0 }}>Dashboard de Estatísticas</h2>
        <Link to="/" style={{ backgroundColor: "#fff", color: "#3f51b5", textDecoration: "none", padding: "0.5rem 1rem", borderRadius: 4, fontWeight: "bold" }}>
          ← Voltar
        </Link>
      </div>

      <div style={{ padding: "1rem" }}>
        {/* Resumo visual */}
        <div style={{ backgroundColor: "#eee", padding: "1rem", borderRadius: 8, marginBottom: "1rem", display: "flex", justifyContent: "space-around" }}>
          <div>
            <strong>Objeção mais clicada:</strong> {mostClickedObjection || "Nenhuma objeção clicada ainda"}
          </div>
          <div>
            <strong>Positivos:</strong> {totalPositives}
          </div>
          <div>
            <strong>Negativos:</strong> {totalNegatives}
          </div>
        </div>

        {/* Gráficos */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
          <div style={{ backgroundColor: "#fff", padding: "1rem", borderRadius: 8, boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <h3 style={{ marginTop: 0 }}>Distribuição de Feedback</h3>
            <Pie data={pieData} />
          </div>
          <div style={{ backgroundColor: "#fff", padding: "1rem", borderRadius: 8, boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <h3 style={{ marginTop: 0 }}>Objeções Mais Clicadas</h3>
            <Bar data={barData} />
          </div>
        </div>

        {/* Ranking de Respostas Mais Positivas */}
        <div style={{ backgroundColor: "#fff", padding: "1rem", borderRadius: 8, boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          <h3 style={{ marginTop: 0 }}>Ranking de Respostas (Mais Positivas)</h3>
          {rankingResponses.length === 0 ? (
            <p style={{ color: "#777" }}>Ainda não há respostas positivas registradas.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#eee" }}>
                  <th style={{ textAlign: "left", padding: "0.5rem" }}>Resposta</th>
                  <th style={{ textAlign: "left", padding: "0.5rem" }}>Positivas</th>
                </tr>
              </thead>
              <tbody>
                {rankingResponses.map(([resp, count], idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #ccc" }}>
                    <td style={{ padding: "0.5rem" }}>{resp}</td>
                    <td style={{ padding: "0.5rem" }}>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
