import React, { useState } from "react"; // ייבוא React והוק לניהול State
import PieChart from "../components/PieChart"; // גרף עוגה להצגת פילוח הוצאות לפי קטגוריות
import BarChart from "../components/BarChart"; // גרף עמודות להצגת סיכום חודשי
import * as XLSX from "xlsx"; // ספרייה ליצירת קבצי Excel
import { saveAs } from "file-saver"; // ספרייה לשמירת קבצים מקומית
import { getCostsByMonth } from "../utils/idb"; // פונקציה לשליפת נתונים מה-IndexedDB

const Reports = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1); // ערך ברירת מחדל - החודש הנוכחי
    const [year, setYear] = useState(new Date().getFullYear()); // ערך ברירת מחדל - השנה הנוכחית

    // פונקציה לייצוא הנתונים לקובץ Excel (ללא עמודת ה-ID)
    const exportToExcel = async () => {
        const data = await getCostsByMonth(month, year); // שליפת הוצאות מה-IndexedDB לפי החודש והשנה שנבחרו
        if (!data.length) {
            alert("No data available to export."); // בדיקה אם אין נתונים לייצוא
            return;
        }

        // מסירים את עמודת ה-ID מכל רשומה כדי שלא תיכלל בקובץ
        const filteredData = data.map(({ id, ...rest }) => rest);

        // המרת הנתונים לגיליון עבודה של Excel
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

        // יצירת קובץ והורדתו כ-Excel
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        saveAs(dataBlob, `Expenses_${month}_${year}.xlsx`);
    };

    return (
        <div className="container">
            <h2>Reports</h2>

            {/* סינון לפי חודש ושנה */}
            <div className="filters">
                <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
                    <option value="">All Months</option>
                    {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString("default", { month: "long" })} {/* הצגת שמות חודשים */}
                        </option>
                    ))}
                </select>

                <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                    <option value="">All Years</option>
                    {[...Array(5)].map((_, i) => (
                        <option key={i} value={new Date().getFullYear() - i}>
                            {new Date().getFullYear() - i} {/* הצגת חמש השנים האחרונות */}
                        </option>
                    ))}
                </select>

                <button onClick={exportToExcel} className="export-button">Export to Excel</button> {/* כפתור הורדת Excel */}
            </div>

            {/* גרף פאי - פילוח לפי קטגוריות לחודש שנבחר */}
            <PieChart month={month} year={year} />

            {/* גרף עמודות - סיכום חודשי לשנה שנבחרה */}
            <h3>Yearly Expenses Overview</h3>
            <BarChart year={year} />
        </div>
    );
};

export default Reports; // ייצוא הקומפוננטה לשימוש בפרויקט
