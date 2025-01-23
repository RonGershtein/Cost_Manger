const DB_NAME = "CostManager"; // שם מסד הנתונים ב-IndexedDB
const DB_VERSION = 1; // גרסת מסד הנתונים (אם נשנה את זה, תתבצע פעולה של onupgradeneeded)
let dbInstance; // משתנה שיחזיק את מופע מסד הנתונים

/**
 * פותח או יוצר מסד נתונים ב-IndexedDB.
 * מחזיר Promise שמתקבל כאשר מסד הנתונים מוכן לשימוש.
 */
export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION); // ניסיון לפתוח את מסד הנתונים

        // מופעל אם צריך לעדכן את מסד הנתונים (למשל, אם מדובר בגרסה חדשה)
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("costs")) { // אם טבלת "costs" לא קיימת, צור אותה
                const store = db.createObjectStore("costs", { keyPath: "id", autoIncrement: true }); // יצירת מחסן נתונים עם מפתח ראשי "id"
                store.createIndex("date", "date", { unique: false }); // יצירת אינדקס לחיפוש לפי תאריך
            }
        };

        // מופעל כאשר מסד הנתונים נפתח בהצלחה
        request.onsuccess = (event) => {
            dbInstance = event.target.result;
            resolve(dbInstance);
        };

        // מופעל אם יש שגיאה בפתיחת מסד הנתונים
        request.onerror = (event) => reject(event.target.error);
    });
};

/**
 * מוסיף הוצאה חדשה למסד הנתונים.
 * @param {Object} costItem - אובייקט של הוצאה הכולל id, תיאור, סכום, קטגוריה ותאריך.
 * @returns {Promise} מחזיר את ה-id של הפריט שנוסף.
 */
export const addCost = async (costItem) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("costs", "readwrite"); // יצירת טרנזקציה לקריאה וכתיבה
        const store = transaction.objectStore("costs"); // קבלת מחסן הנתונים "costs"
        const request = store.add(costItem); // ניסיון להוסיף את ההוצאה למסד הנתונים

        request.onsuccess = () => resolve(request.result); // החזרת ה-id של הפריט שנוסף
        request.onerror = () => reject(request.error);
    });
};

/**
 * שולף את כל ההוצאות מחנות הנתונים לפי חודש ושנה.
 * @param {number|null} month - מספר החודש (1-12) או null לשליפת כל החודשים.
 * @param {number|null} year - מספר השנה (למשל 2024) או null לשליפת כל השנים.
 * @returns {Promise<Array>} מחזיר מערך של הוצאות תואמות.
 */
export const getCostsByMonth = async (month, year) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("costs", "readonly"); // יצירת טרנזקציה לקריאה בלבד
        const store = transaction.objectStore("costs"); // קבלת מחסן הנתונים "costs"
        const costs = [];

        const request = store.openCursor(); // פתיחת מצביע לכל הרשומות במסד הנתונים

        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                const costDate = new Date(cursor.value.date);
                // בודק אם ההוצאה שייכת לחודש ולשנה שנבחרו (או לכל הנתונים אם לא נבחרו)
                if ((!month || costDate.getMonth() + 1 === month) && (!year || costDate.getFullYear() === year)) {
                    costs.push(cursor.value);
                }
                cursor.continue(); // ממשיך לבדוק רשומות נוספות
            } else {
                console.log("Fetched Costs:", costs); // הצגת הנתונים בקונסול לבדיקה
                resolve(costs); // מחזיר את המערך עם כל התוצאות התואמות
            }
        };

        request.onerror = () => reject(request.error);
    });
};

/**
 * מוחק הוצאה ממסד הנתונים לפי ה-id שלה.
 * @param {number} id - ה-id של ההוצאה שברצונך למחוק.
 * @returns {Promise<void>} מחזיר Promise שמתבצע כאשר המחיקה מסתיימת.
 */
export const deleteCost = async (id) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("costs", "readwrite"); // יצירת טרנזקציה לקריאה וכתיבה
        const store = transaction.objectStore("costs"); // קבלת מחסן הנתונים "costs"
        const request = store.delete(id); // מחיקת ההוצאה לפי ה-id

        request.onsuccess = () => {
            console.log(`Cost with ID ${id} deleted successfully.`); // אישור מחיקה בקונסול
            resolve();
        };

        request.onerror = () => {
            console.error("Failed to delete cost:", request.error); // הדפסת שגיאה במקרה של כשל במחיקה
            reject(request.error);
        };
    });
};
