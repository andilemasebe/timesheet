import axios from 'axios';

export const getPerformanceData = async (userId, period) => {
  try {
    const response = await axios.get(`/api/performance/${userId}`, {
      params: { period }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch performance data');
  }
};

export const getTeamPerformance = async (managerId, period) => {
  try {
    const response = await axios.get(`/api/performance/team/${managerId}`, {
      params: { period }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch team performance data');
  }
};
