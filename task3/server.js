const http = require("http");
const express = require("express");

const app = express();

// بيانات الطلاب (داتا تجريبية)
let students = [
  { id: 1, name: "Ali", active: true, grades: [90, 85, 92] },
  { id: 2, name: "Sara", active: false, grades: [55, 60, 50] },
  { id: 3, name: "Omar", active: true, grades: [70, 75, 80] },
  { id: 4, name: "Laila", active: false, grades: [40, 30, 50] },
  { id: 5, name: "Mona", active: true, grades: [100, 95, 98] }
];

// دالة لحساب المتوسط
function avg(grades) {
  return grades.reduce((a, b) => a + b, 0) / grades.length;
}

// 1️⃣ كل الطلاب
app.get("/students", (req, res) => {
  res.json(students);
});

// 2️⃣ الطلاب النشيطين
app.get("/students/active", (req, res) => {
  const active = students.filter(s => s.active);
  res.json(active);
});

// 3️⃣ الطلاب الغير نشيطين
app.get("/students/inactive", (req, res) => {
  const inactive = students.filter(s => !s.active);
  res.json(inactive);
});

// 4️⃣ أعلى طالب في المتوسط
app.get("/students/top", (req, res) => {
  const topStudent = students.reduce((prev, curr) => {
    return avg(curr.grades) > avg(prev.grades) ? curr : prev;
  });
  res.json({ ...topStudent, average: avg(topStudent.grades) });
});

// 5️⃣ الطلاب الراسبين (متوسط أقل من 60)
app.get("/students/fail", (req, res) => {
  const failed = students.filter(s => avg(s.grades) < 60);
  res.json(failed);
});

// تشغيل السيرفر باستخدام http module
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
