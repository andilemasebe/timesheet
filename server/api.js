const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'timesheet_system'
});

router.get('/user-role/:userId', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT role FROM users WHERE id = ?',
            [req.params.userId]
        );
        res.json({ role: rows[0].role });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

router.get('/team-members/:managerId', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT u.id, u.name 
             FROM users u 
             JOIN team_members tm ON u.id = tm.user_id
             JOIN teams t ON tm.team_id = t.id
             WHERE t.manager_id = ?`,
            [req.params.managerId]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

router.post('/performance-data', async (req, res) => {
    try {
        const { period, userId } = req.body;
        const dateRange = getDateRange(period);
        
        const [rows] = await pool.query(
            `SELECT date, hours_worked, tasks_completed, 
                    efficiency_rate, performance_score
             FROM performance_metrics
             WHERE user_id = ? AND date BETWEEN ? AND ?
             ORDER BY date`,
            [userId, dateRange.start, dateRange.end]
        );
        
        const formattedData = formatPerformanceData(rows);
        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

function getDateRange(period) {
    const end = new Date();
    const start = new Date();
    
    switch(period) {
        case 'week':
            start.setDate(end.getDate() - 7);
            break;
        case 'month':
            start.setMonth(end.getMonth() - 1);
            break;
        case 'quarter':
            start.setMonth(end.getMonth() - 3);
            break;
    }
    
    return { start, end };
}

function formatPerformanceData(rows) {
    return {
        dates: rows.map(row => row.date),
        hours: rows.map(row => row.hours_worked),
        tasks: rows.map(row => row.tasks_completed),
        efficiency: rows.map(row => row.efficiency_rate),
        score: rows.map(row => row.performance_score)
    };
}

module.exports = router;
