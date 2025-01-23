import React, { useState, useEffect } from "react"; // ייבוא React והוקים לניהול State והרצת קוד בזמן טעינה
import CostForm from "../components/CostForm"; // קומפוננטה להוספת הוצאה חדשה
import CostTable from "../components/CostTable"; // קומפוננטה להצגת הטבלה עם ההוצאות
import Filter from "../components/Filter"; // קומפוננטה לסינון נתונים לפי חודש ושנה
import { getCostsByMonth, deleteCost } from "../utils/idb.js"; // פונקציות לשליפת נתונים מה-IndexedDB ולמחיקת הוצאות
import "../styles/Home.css"; // ייבוא עיצוב מותאם לעמוד הבית

const Home = () => {
    const [costs, setCosts] = useState([]); // State שמחזיק את רשימת ההוצאות
    const [filters, setFilters] = useState({ month: null, year: null }); // State שמחזיק את ערכי הפילטרים

    useEffect(() => {
        loadCosts(); // טוען נתונים בכל פעם שהפילטרים משתנים
    }, [filters]); // תלוי בשינוי של filters

    const loadCosts = async () => {
        const { month, year } = filters;
        const data = await getCostsByMonth(month, year); // מביא נתונים מה-IndexedDB לפי פילטרים
        setCosts(data); // מעדכן את ה-State עם הנתונים החדשים
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) { // אישור מחיקה
            try {
                await deleteCost(id); // מחיקת הפריט מה-IndexedDB
                loadCosts(); // רענון הרשימה לאחר המחיקה
            } catch (error) {
                console.error("Error deleting cost:", error); // טיפול בשגיאה אם יש בעיה במחיקה
            }
        }
    };

    return (
        <div className="home-container">
            <h2 className="page-title">Cost Manager system</h2>
            <CostForm onAdd={loadCosts} /> {/* טופס להוספת הוצאה חדשה */}
            <Filter onFilterChange={setFilters} /> {/* רכיב לסינון נתונים */}
            <CostTable costs={costs} onDelete={handleDelete} /> {/* טבלה שמציגה את ההוצאות */}
        </div>
    );
};

export default Home; // ייצוא הקומפוננטה לשימוש בפרויקט
