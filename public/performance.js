class PerformanceTracker {
    constructor() {
        this.charts = {};
        this.userId = this.getUserId();
        this.isManager = false;
        this.init();
    }

    async init() {
        await this.checkUserRole();
        this.setupEventListeners();
        this.initializeCharts();
        this.loadData();
    }

    async checkUserRole() {
        const response = await fetch(`/api/user-role/${this.userId}`);
        const data = await response.json();
        this.isManager = data.role === 'manager';
        
        if (this.isManager) {
            document.getElementById('managerControls').classList.remove('hidden');
            this.loadTeamMembers();
        }
    }

    async loadTeamMembers() {
        const response = await fetch(`/api/team-members/${this.userId}`);
        const members = await response.json();
        const select = document.getElementById('teamMember');
        
        members.forEach(member => {
            const option = document.createElement('option');
            option.value = member.id;
            option.textContent = member.name;
            select.appendChild(option);
        });
    }

    initializeCharts() {
        const chartConfigs = {
            hours: { type: 'line', label: 'Hours Logged' },
            tasks: { type: 'bar', label: 'Tasks Completed' },
            efficiency: { type: 'line', label: 'Efficiency Rate' },
            score: { type: 'line', label: 'Performance Score' }
        };

        Object.entries(chartConfigs).forEach(([key, config]) => {
            const ctx = document.getElementById(`${key}Chart`).getContext('2d');
            this.charts[key] = new Chart(ctx, {
                type: config.type,
                data: {
                    labels: [],
                    datasets: [{
                        label: config.label,
                        data: [],
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });
    }

    async loadData() {
        const period = document.getElementById('timePeriod').value;
        const teamMember = this.isManager ? 
            document.getElementById('teamMember').value : 
            this.userId;

        const response = await fetch(`/api/performance-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ period, userId: teamMember })
        });

        const data = await response.json();
        this.updateCharts(data);
        this.updateTable(data);
    }

    updateCharts(data) {
        Object.keys(this.charts).forEach(key => {
            this.charts[key].data.labels = data.dates;
            this.charts[key].data.datasets[0].data = data[key];
            this.charts[key].update();
        });
    }

    updateTable(data) {
        const tbody = document.querySelector('#performanceTable tbody');
        tbody.innerHTML = '';

        data.dates.forEach((date, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${date}</td>
                <td>${data.hours[index]}</td>
                <td>${data.tasks[index]}</td>
                <td>${data.efficiency[index]}%</td>
                <td>${data.score[index]}</td>
            `;
            tbody.appendChild(row);
        });
    }

    setupEventListeners() {
        document.getElementById('timePeriod').addEventListener('change', () => this.loadData());
        if (this.isManager) {
            document.getElementById('teamMember').addEventListener('change', () => this.loadData());
        }
    }

    getUserId() {
        // Replace with your actual user authentication logic
        return localStorage.getItem('userId');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PerformanceTracker();
});
