import React, { useState } from "react"; // ייבוא React והוק לניהול State
import { Button, Select, MenuItem, Box } from "@mui/material"; // רכיבים מ-MUI לעיצוב נוח
import "../styles/Filter.css"; // ייבוא עיצוב מותאם לקומפוננטה

const Filter = ({ onFilterChange }) => {
    const currentYear = new Date().getFullYear(); // קביעת השנה הנוכחית
    const [selectedMonth, setSelectedMonth] = useState("all"); // ניהול בחירת חודש
    const [selectedYear, setSelectedYear] = useState("all"); // ניהול בחירת שנה

    const handleFilterChange = () => {
        // ממיר את הערכים המסומנים למספרים, או משאיר אותם ריקים אם נבחר "Show All"
        const month = selectedMonth === "all" ? null : parseInt(selectedMonth, 10);
        const year = selectedYear === "all" ? null : parseInt(selectedYear, 10);
        onFilterChange({ month, year }); // מעדכן את הפילטר עם הערכים החדשים
    };

    return (
        <Box className="filter-container"> {/* תיבה עוטפת עבור עיצוב עם CSS */}
            {/* בחירת חודש */}
            <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} sx={{ minWidth: 120 }}>
                <MenuItem value="all">Show All</MenuItem> {/* אפשרות להציג הכל */}
                <MenuItem value="1">January</MenuItem>
                <MenuItem value="2">February</MenuItem>
                <MenuItem value="3">March</MenuItem>
                <MenuItem value="4">April</MenuItem>
                <MenuItem value="5">May</MenuItem>
                <MenuItem value="6">June</MenuItem>
                <MenuItem value="7">July</MenuItem>
                <MenuItem value="8">August</MenuItem>
                <MenuItem value="9">September</MenuItem>
                <MenuItem value="10">October</MenuItem>
                <MenuItem value="11">November</MenuItem>
                <MenuItem value="12">December</MenuItem>
            </Select>

            {/* בחירת שנה */}
            <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} sx={{ minWidth: 120 }}>
                <MenuItem value="all">Show All</MenuItem>
                {[...Array(10)].map((_, i) => ( // יוצרים רשימה של 10 השנים האחרונות
                    <MenuItem key={i} value={currentYear - i}>
                        {currentYear - i}
                    </MenuItem>
                ))}
            </Select>

            {/* כפתור הפילטר שמפעיל את הפונקציה לעדכון הנתונים */}
            <Button variant="contained" color="secondary" onClick={handleFilterChange}>
                Filter
            </Button>
        </Box>
    );
};

export default Filter; // ייצוא הקומפוננטה לשימוש חיצוני
