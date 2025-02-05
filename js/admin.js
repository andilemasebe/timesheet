// Chart configurations
document.addEventListener('DOMContentLoaded', function() {
    // Employee Distribution Chart
    const employeeCtx = document.getElementById('employeeChart').getContext('2d');
    new Chart(employeeCtx, {
        type: 'doughnut',
        data: {
            labels: ['IT Department', 'HR Department', 'Sales', 'Marketing', 'Operations'],
            datasets: [{
                data: [45, 25, 30, 20, 35],
                backgroundColor: [
                    '#4e73df',
                    '#1cc88a',
                    '#36b9cc',
                    '#f6c23e',
                    '#e74a3b'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                title: {
                    display: true,
                    text: 'Employee Distribution by Department',
                    padding: 20
                }
            }
        }
    });

    // Project Status Chart
    const projectCtx = document.getElementById('projectChart').getContext('2d');
    new Chart(projectCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Completed Projects',
                data: [15, 12, 18, 14, 20, 16],
                backgroundColor: '#4e73df',
                borderRadius: 5
            }, {
                label: 'Ongoing Projects',
                data: [10, 15, 12, 8, 12, 15],
                backgroundColor: '#1cc88a',
                borderRadius: 5
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                title: {
                    display: true,
                    text: 'Project Status Overview',
                    padding: 20
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
});
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Dynamic Table Population
    populateEmployeeTable();
    updateActivityFeed();
});

// Populate Employee Table
function populateEmployeeTable() {
    const employees = [
        { name: 'John Doe', department: 'IT', status: 'Active', performance: '90%' },
        { name: 'Jane Smith', department: 'HR', status: 'Active', performance: '85%' },
        // Add more employee data
    ];

    const tableBody = document.getElementById('employeeTableBody');
    employees.forEach(emp => {
        const row = `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td><span class="badge bg-success">${emp.status}</span></td>
                <td>${emp.performance}</td>
                <td>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Update Activity Feed
function updateActivityFeed() {
    const activities = [
        'New employee John Doe added',
        'Project X completed',
        'Budget report generated',
        // Add more activities
    ];

    const feed = document.getElementById('activityFeed');
    activities.forEach(activity => {
        feed.innerHTML += `
            <div class="activity-item">
                <i class="fas fa-circle"></i>
                <span>${activity}</span>
                <small>Just now</small>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const submenuToggles = document.querySelectorAll('[data-bs-toggle="collapse"]');
    
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const arrow = this.querySelector('.submenu-arrow');
            arrow.classList.toggle('rotated');
        });
    });
});

// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    
    sidebarCollapse.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        content.classList.toggle('expanded');
        
        // Store sidebar state in localStorage
        localStorage.setItem('sidebarState', sidebar.classList.contains('collapsed'));
    });
    
    // Check and restore sidebar state on page load
    const sidebarState = localStorage.getItem('sidebarState') === 'true';
    if (sidebarState) {
        sidebar.classList.add('collapsed');
        content.classList.add('expanded');
    }
});
