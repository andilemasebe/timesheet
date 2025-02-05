const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/performance/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { period } = req.query;
    
    // Add your database query here to fetch performance metrics
    const performanceData = await Performance.find({
      userId,
      date: { $gte: getPeriodStartDate(period) }
    });
    
    res.json(performanceData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching performance data' });
  }
});

router.get('/performance/team/:managerId', auth, async (req, res) => {
  try {
    const { managerId } = req.params;
    const { period } = req.query;
    
    // Add your database query here to fetch team performance metrics
    const teamPerformance = await Performance.find({
      managerId,
      date: { $gte: getPeriodStartDate(period) }
    });
    
    res.json(teamPerformance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team performance data' });
  }
});

module.exports = router;
