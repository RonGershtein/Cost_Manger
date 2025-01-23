import React from "react"; // ייבוא React

const CostTable = ({ costs, onDelete }) => {
    return (
        <table className="cost-table"> {/* טבלה שמציגה את הנתונים */}
            <thead>
            <tr>
                <th>Description</th> {/* עמודת תיאור */}
                <th>Amount</th> {/* עמודת סכום */}
                <th>Category</th> {/* עמודת קטגוריה */}
                <th>Date</th> {/* עמודת תאריך */}
                <th>Actions</th> {/* עמודת פעולות */}
            </tr>
            </thead>
            <tbody>
            {costs.length === 0 ? ( // אם אין נתונים, מציגים הודעה מתאימה
                <tr>
                    <td colSpan="5" className="no-data">No expenses found</td>
                </tr>
            ) : (
                costs.map((cost) => ( // מיפוי של כל ההוצאות ל-שורות בטבלה
                    <tr key={cost.id}> {/* הוספת מפתח ייחודי לכל שורה */}
                        <td>{cost.description}</td>
                        <td>{cost.amount.toFixed(2)}</td> {/* תצוגה עם 2 ספרות אחרי הנקודה */}
                        <td>{cost.category}</td>
                        <td>{new Date(cost.date).toLocaleDateString()}</td> {/* עיצוב תאריך לקריאה נוחה */}
                        <td>
                            <button className="delete-button" onClick={() => onDelete(cost.id)}> {/* כפתור מחיקה */}
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            )}
            </tbody>
        </table>
    );
};

export default CostTable; // ייצוא הקומפוננטה לשימוש חיצוני
