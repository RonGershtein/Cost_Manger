import React, { createContext, useState, useEffect } from "react"; // ייבוא React והוקים לניהול קונטקסט ומצב

export const ThemeContext = createContext(); // יצירת קונטקסט לניהול מצב התאורה (כהה/בהיר)

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true"; // קריאה מה-localStorage כדי לשמור את ההעדפה של המשתמש
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark-mode"); // מוסיף מחלקה ל-root להפעלת מצב כהה
        } else {
            document.documentElement.classList.remove("dark-mode"); // מסיר את המחלקה אם מצב בהיר
        }
        localStorage.setItem("darkMode", darkMode); // שומר את המצב הנוכחי ב-localStorage כדי לשמר אותו אחרי רענון
    }, [darkMode]); // רץ בכל פעם שהמשתמש מחליף מצב כהה/בהיר

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}> {/* מספק את המצב לכל הרכיבים */}
            {children} {/* מציג את כל הקומפוננטות בתוך ThemeProvider */}
        </ThemeContext.Provider>
    );
};
