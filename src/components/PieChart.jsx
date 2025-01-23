import React, { useEffect, useState } from "react"; // ייבוא React והוקים לניהול State והרצת קוד בזמן טעינה
import { Pie } from "react-chartjs-2"; // קומפוננטה להצגת גרף עוגה
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // רכיבים רלוונטיים ל-Chart.js
import { getCostsByMonth } from "../utils/idb"; // פונקציה שמביאה נתונים מה-IndexedDB
import "../styles/PieChart.css"; // ייבוא עיצוב מותאם לגרף

ChartJS.register(ArcElement, Tooltip, Legend); // רישום הרכיבים הדרושים לגרף עוגה

const PieChart = ({ month, year }) => {
    const [chartData, setChartData] = useState(null); // State שמחזיק את הנתונים לתצוגת הגרף

    useEffect(() => {
        getCostsByMonth(month, year)
            .then((costs) => {
                if (!costs || costs.length === 0) { // אם אין נתונים, לא נציג גרף
                    setChartData(null);
                    return;
                }

                // חישוב סך כל ההוצאות לפי קטגוריה
                const categoryTotals = costs.reduce((totals, cost) => {
                    totals[cost.category] = (totals[cost.category] || 0) + cost.amount;
                    return totals;
                }, {});

                console.log("Category Totals:", categoryTotals); // בדיקה אם הנתונים נכונים

                if (Object.keys(categoryTotals).length === 0) { // אם אין נתונים רלוונטיים - לא נציג גרף
                    setChartData(null);
                    return;
                }

                // יצירת מבנה נתונים מתאים להצגת התרשים
                setChartData({
                    labels: Object.keys(categoryTotals), // שמות הקטגוריות
                    datasets: [
                        {
                            data: Object.values(categoryTotals), // סכום ההוצאות לכל קטגוריה
                            backgroundColor: [
                                "#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40"
                            ], // צבעים שונים לפרוסות הגרף
                            hoverOffset: 4, // אפקט על מעבר עכבר
                        },
                    ],
                });
            })
            .catch((error) => console.error("Error fetching costs:", error)); // טיפול בשגיאות
    }, [month, year]); // רץ מחדש בכל שינוי של חודש או שנה

    return (
        <div className="chart-container">
            {/* אם יש נתונים - מציגים את התרשים, אחרת מציגים הודעה שאין נתונים */}
            {chartData ? <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} /> : <p>No data available for the selected month and year.</p>}
        </div>
    );
};

export default PieChart; // ייצוא הקומפוננטה לשימוש בפרויקט
