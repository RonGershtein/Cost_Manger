import React, { useState } from "react"; // ייבוא React והוק לניהול State
import { addCost } from "../utils/idb.js"; // פונקציה להוספת נתונים ל-IndexedDB
import { toast } from "react-toastify"; // ספרייה להצגת הודעות Toast
import "react-toastify/dist/ReactToastify.css"; // ייבוא עיצוב ל-Toast

const CostForm = ({ onAdd }) => {
    // הגדרת משתנים מקומיים לניהול שדות הטופס
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Living Expenses"); // ברירת מחדל - הוצאות מחיה
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]); // תאריך ברירת מחדל - היום

    const handleSubmit = async (event) => {
        event.preventDefault(); // מונע רענון של הדף

        // בדיקת תקינות השדות לפני שמירת הנתונים
        if (!description.trim() || !amount || isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid description and amount."); // הצגת הודעת שגיאה אם הערכים לא תקינים
            return;
        }

        // יצירת אובייקט חדש עם הנתונים שהוזנו
        const newCost = {
            id: Date.now(), // יצירת ID ייחודי
            description,
            amount: parseFloat(amount), // הפיכת הכמות למספר
            category,
            date
        };

        try {
            await addCost(newCost); // שמירת הנתונים ב-IndexedDB
            toast.success("Cost added successfully!"); // הודעה על הצלחה

            // איפוס הטופס לאחר הוספה
            setDescription("");
            setAmount("");
            setDate(new Date().toISOString().split("T")[0]); // עדכון התאריך לברירת מחדל
            onAdd(); // עדכון הנתונים ברכיב הראשי
        } catch (error) {
            toast.error("Error adding cost."); // הודעת שגיאה במקרה של כשל בהוספה
            console.error("Failed to add cost:", error);
        }
    };

    return (
        <form className="cost-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Description *"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Amount *"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Living Expenses">Living Expenses</option>
                <option value="Transportation">Transportation</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Personal Expenses">Personal Expenses</option>
                <option value="Education">Education</option>
                <option value="Leisure & Entertainment">Leisure & Entertainment</option>
                <option value="Communication">Communication</option>
                <option value="Family">Family</option>
                <option value="Financial Expenses">Financial Expenses</option>
            </select>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <button type="submit">ADD COST</button>
        </form>
    );
};

export default CostForm;
