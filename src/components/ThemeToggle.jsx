import React, { useContext } from "react"; // ייבוא React והוק לשימוש בקונטקסט
import { ThemeContext } from "../context/ThemeContext"; // ייבוא הקונטקסט לניהול מצב כהה/בהיר

const ThemeToggle = () => {
    const { darkMode, setDarkMode } = useContext(ThemeContext); // שליפת המצב הנוכחי ופונקציה לעדכונו

    return (
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}> {/* כפתור למעבר בין מצבי תאורה */}
            {darkMode ? "LIGHT MODE" : "DARK MODE"} {/* טקסט הכפתור משתנה בהתאם למצב */}
        </button>
    );
};

export default ThemeToggle; // ייצוא הקומפוננטה לשימוש בפרויקט
