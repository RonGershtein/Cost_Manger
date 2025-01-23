import React, { useContext } from "react"; // ייבוא React והוק לשימוש בקונטקסט
import { Link } from "react-router-dom"; // ייבוא רכיב ניווט של React Router
import { ThemeContext } from "../context/ThemeContext"; // ייבוא הקונטקסט לניהול מצב כהה/בהיר

const Navbar = () => {
    const { darkMode, setDarkMode } = useContext(ThemeContext); // שליפת הערך והפונקציה לעדכון מצב כהה/בהיר

    return (
        <nav className={`navbar ${darkMode ? "dark" : "light"}`}> {/* הוספת קלאס דינאמי לפי המצב */}
            <div className="nav-links"> {/* לינקים לניווט בדף */}
                <Link to="/">🏠 Home</Link>
                <Link to="/reports">📊 Reports</Link>
            </div>
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}> {/* כפתור למעבר בין מצבי תאורה */}
                {darkMode ? "☀️ LIGHT MODE" : "🌙 DARK MODE"}
            </button>
        </nav>
    );
};

export default Navbar; // ייצוא הקומפוננטה לשימוש בפרויקט
