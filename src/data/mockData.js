// ─── Students ────────────────────────────────────────────────────────────────
export const students = [
  { id: 1, name: "Aisha Malik",      rollNo: "CS-001", avatar: "AM", present: true,  focus: 87, mood: "focused",   engagement: 91, seat: "A1" },
  { id: 2, name: "Rahul Sharma",     rollNo: "CS-002", avatar: "RS", present: true,  focus: 62, mood: "distracted",engagement: 55, seat: "A2" },
  { id: 3, name: "Priya Nair",       rollNo: "CS-003", avatar: "PN", present: true,  focus: 94, mood: "happy",     engagement: 96, seat: "A3" },
  { id: 4, name: "Omar Hassan",      rollNo: "CS-004", avatar: "OH", present: false, focus: 0,  mood: "absent",    engagement: 0,  seat: "A4" },
  { id: 5, name: "Zara Khan",        rollNo: "CS-005", avatar: "ZK", present: true,  focus: 78, mood: "neutral",   engagement: 72, seat: "B1" },
  { id: 6, name: "Arjun Patel",      rollNo: "CS-006", avatar: "AP", present: true,  focus: 45, mood: "bored",     engagement: 40, seat: "B2" },
  { id: 7, name: "Fatima Zahra",     rollNo: "CS-007", avatar: "FZ", present: true,  focus: 89, mood: "focused",   engagement: 88, seat: "B3" },
  { id: 8, name: "Dev Kapoor",       rollNo: "CS-008", avatar: "DK", present: true,  focus: 71, mood: "confused",  engagement: 65, seat: "B4" },
  { id: 9, name: "Neha Gupta",       rollNo: "CS-009", avatar: "NG", present: false, focus: 0,  mood: "absent",    engagement: 0,  seat: "C1" },
  { id: 10,"name": "Ali Raza",       rollNo: "CS-010", avatar: "AR", present: true,  focus: 93, mood: "happy",     engagement: 95, seat: "C2" },
  { id: 11, name: "Sneha Reddy",     rollNo: "CS-011", avatar: "SR", present: true,  focus: 55, mood: "distracted",engagement: 50, seat: "C3" },
  { id: 12, name: "Kabir Singh",     rollNo: "CS-012", avatar: "KS", present: true,  focus: 82, mood: "focused",   engagement: 84, seat: "C4" },
  { id: 13, name: "Layla Ibrahim",   rollNo: "CS-013", avatar: "LI", present: true,  focus: 68, mood: "neutral",   engagement: 70, seat: "D1" },
  { id: 14, name: "Vikram Mehta",    rollNo: "CS-014", avatar: "VM", present: true,  focus: 76, mood: "happy",     engagement: 80, seat: "D2" },
  { id: 15, name: "Anaya Chowdhury", rollNo: "CS-015", avatar: "AC", present: false, focus: 0,  mood: "absent",    engagement: 0,  seat: "D3" },
  { id: 16, name: "Hassan Al-Amin",  rollNo: "CS-016", avatar: "HA", present: true,  focus: 88, mood: "focused",   engagement: 90, seat: "D4" },
  { id: 17, name: "Pooja Verma",     rollNo: "CS-017", avatar: "PV", present: true,  focus: 60, mood: "confused",  engagement: 58, seat: "E1" },
  { id: 18, name: "Usman Tariq",     rollNo: "CS-018", avatar: "UT", present: true,  focus: 97, mood: "happy",     engagement: 98, seat: "E2" },
  { id: 19, name: "Meera Joshi",     rollNo: "CS-019", avatar: "MJ", present: true,  focus: 73, mood: "neutral",   engagement: 75, seat: "E3" },
  { id: 20, name: "Samir Ali",       rollNo: "CS-020", avatar: "SA", present: true,  focus: 84, mood: "focused",   engagement: 86, seat: "E4" },
];

// ─── Attendance Timeline ──────────────────────────────────────────────────────
export const attendanceWeek = [
  { day: "Mon", present: 17, absent: 3 },
  { day: "Tue", present: 18, absent: 2 },
  { day: "Wed", present: 15, absent: 5 },
  { day: "Thu", present: 19, absent: 1 },
  { day: "Fri", present: 17, absent: 3 },
  { day: "Sat", present: 16, absent: 4 },
  { day: "Today", present: 17, absent: 3 },
];

// ─── Focus Timeline (last 60 min, every 5 min) ───────────────────────────────
export const focusTimeline = [
  { time: "8:00", avg: 82 }, { time: "8:05", avg: 79 }, { time: "8:10", avg: 84 },
  { time: "8:15", avg: 88 }, { time: "8:20", avg: 85 }, { time: "8:25", avg: 76 },
  { time: "8:30", avg: 71 }, { time: "8:35", avg: 68 }, { time: "8:40", avg: 73 },
  { time: "8:45", avg: 77 }, { time: "8:50", avg: 80 }, { time: "8:55", avg: 78 },
  { time: "9:00", avg: 83 }, { time: "9:05", avg: 86 }, { time: "9:10", avg: 89 },
  { time: "9:15", avg: 87 }, { time: "9:20", avg: 91 }, { time: "9:25", avg: 94 },
];

// ─── Mood Distribution ────────────────────────────────────────────────────────
export const moodData = [
  { mood: "Focused",    count: 6, color: "#3b82f6" },
  { mood: "Happy",      count: 4, color: "#22c55e" },
  { mood: "Neutral",    count: 3, color: "#94a3b8" },
  { mood: "Confused",   count: 2, color: "#f59e0b" },
  { mood: "Bored",      count: 1, color: "#f97316" },
  { mood: "Distracted", count: 2, color: "#ef4444" },
];

// ─── Safety Alerts ────────────────────────────────────────────────────────────
export const alerts = [
  {
    id: 1, type: "warning", category: "crowd",
    title: "High Crowd Density",
    desc: "Zone B — 8 students clustered near door",
    time: "09:22 AM", resolved: false, severity: "medium",
  },
  {
    id: 2, type: "info", category: "engagement",
    title: "Low Engagement Zone",
    desc: "3 students in row D showing <40% focus score",
    time: "09:18 AM", resolved: false, severity: "low",
  },
  {
    id: 3, type: "success", category: "attendance",
    title: "Attendance Logged",
    desc: "Auto-attendance completed — 17/20 present",
    time: "08:02 AM", resolved: true, severity: "info",
  },
  {
    id: 4, type: "danger", category: "safety",
    title: "Abnormal Motion Detected",
    desc: "Rapid movement pattern in Zone A — reviewing",
    time: "08:47 AM", resolved: true, severity: "high",
  },
  {
    id: 5, type: "info", category: "mood",
    title: "Mood Shift Detected",
    desc: "Avg class mood dropped from 'Happy' → 'Neutral'",
    time: "09:05 AM", resolved: false, severity: "low",
  },
];

// ─── Engagement by hour ───────────────────────────────────────────────────────
export const engagementHourly = [
  { hour: "8 AM",  score: 78 }, { hour: "9 AM",  score: 85 },
  { hour: "10 AM", score: 72 }, { hour: "11 AM", score: 68 },
  { hour: "12 PM", score: 55 }, { hour: "1 PM",  score: 62 },
  { hour: "2 PM",  score: 70 }, { hour: "3 PM",  score: 75 },
];

// ─── AI Model Status ──────────────────────────────────────────────────────────
export const aiModels = [
  { name: "Attendance (Face Rec.)", status: "active",  accuracy: 98.2, fps: 12, load: 34 },
  { name: "Focus & Engagement",     status: "active",  accuracy: 91.7, fps: 8,  load: 52 },
  { name: "Sentiment Analyzer",     status: "active",  accuracy: 87.4, fps: 6,  load: 41 },
  { name: "Crowd / Fight Detect.",  status: "active",  accuracy: 94.1, fps: 15, load: 29 },
  { name: "Weapon Detection",       status: "standby", accuracy: 99.3, fps: 0,  load: 0  },
  { name: "Admin Decision Engine",  status: "active",  accuracy: 92.8, fps: 4,  load: 18 },
];

// ─── Classroom zones ──────────────────────────────────────────────────────────
export const zones = [
  { id: "A", label: "Zone A", density: 4, risk: "low"    },
  { id: "B", label: "Zone B", density: 8, risk: "medium" },
  { id: "C", label: "Zone C", density: 3, risk: "low"    },
  { id: "D", label: "Zone D", density: 2, risk: "low"    },
  { id: "E", label: "Zone E", density: 3, risk: "low"    },
];
