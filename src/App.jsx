import React from "react"; // ייבוא React לצורך שימוש בקומפוננטות
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ייבוא React Router לניהול ניווט בדפים
import Navbar from "./components/Navbar"; // ייבוא רכיב הניווט
import Home from "./pages/Home"; // ייבוא דף הבית
import Reports from "./pages/Reports"; // ייבוא דף הדוחות
import { ThemeProvider } from "./context/ThemeContext"; // ייבוא ספק הקונטקסט לניהול מצב כהה/בהיר
import { ToastContainer } from "react-toastify"; // ייבוא רכיב ה-Toast להצגת הודעות
import "react-toastify/dist/ReactToastify.css"; // ייבוא עיצוב ה-Toast
import "./styles/Global.css"; // ייבוא עיצוב כללי לאפליקציה

function App() {
    return (
        <ThemeProvider> {/* מספק את הקונטקסט לכל הקומפוננטות שבתוך האפליקציה */}
            <Router> {/* ניהול הניווט בין הדפים */}
                <div className="app-container">
                    <Navbar /> {/* רכיב התפריט הראשי */}
                    <Routes> {/* הגדרת הנתיבים של האפליקציה */}
                        <Route path="/" element={<Home />} /> {/* דף הבית */}
                        <Route path="/reports" element={<Reports />} /> {/* דף הדוחות */}
                    </Routes>
                    <ToastContainer /> {/* רכיב שמאפשר הצגת הודעות Toast בכל מקום באפליקציה */}
                    <footer className="footer">
                        © {new Date().getFullYear()} Ron Gershtein and Idan Shany. All rights reserved.
                    </footer> {/* זכויות יוצרים בתחתית הדף */}
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App; // ייצוא הקומפוננטה הראשית של האפליקציה
