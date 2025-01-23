import React, { useEffect, useState } from "react"; // ייבוא React והוקים לניהול State והרצת קוד בצד לקוח
import { Bar } from "react-chartjs-2"; // קומפוננטה להצגת גרף עמודות
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"; // רכיבים נדרשים לתרשים
import { getCostsByMonth } from "../utils/idb"; // פונקציה שמביאה נתונים מה-IndexedDB

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend); // רישום רכיבים לשימוש בתרשים

const BarChart = ({ year }) => {
    const [chartData, setChartData] = useState(null); // משתנה שיחזיק את הנתונים לתרשים

    useEffect(() => {
        const fetchData = async () => {
            const monthlyTotals = Array(12).fill(0); // יוצרים מערך של 12 חודשים עם ערכים התחליים של 0

            for (let month = 1; month <= 12; month++) {
                const costs = await getCostsByMonth(month, year); // מביאים את ההוצאות של כל חודש
                monthlyTotals[month - 1] = costs.reduce((sum, cost) => sum + cost.amount, 0); // מחשבים סכום לכל חודש
            }

            setChartData({
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // שמות החודשים
                datasets: [{
                    label: `Total Expenses in ${year ? year : "All Years"}`,// כותרת לגרף
                    data: monthlyTotals, // הנתונים בפועל
                    backgroundColor: "#007bff",
                    borderColor: "#0056b3",
                    borderWidth: 1,
                }],
            });
        };

        fetchData(); // קריאה לפונקציה שמביאה נתונים

    }, [year]); // רץ מחדש כשהשנה משתנה

    return (
        <div className="chart-container">
            {chartData ? <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} /> : <p>Loading...</p>}
        </div>
    );
};

export default BarChart;
