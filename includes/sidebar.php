<nav id="sidebar" class="sidebar">
    <div class="sidebar-header">
        <img src="images/OIP.jpg" alt="Logo" class="logo">
        <h3>Admin Dashboard</h3>
    </div>

    <ul class="list-unstyled components">
        <li class="<?php echo ($currentPage == 'dashboard') ? 'active' : ''; ?>">
            <a href="admin-dashboard.php">
                <i class="fas fa-tachometer-alt me-2"></i> Dashboard
            </a>
        </li>

        <li class="<?php echo ($currentPage == 'employees') ? 'active' : ''; ?>">
            <a href="#employeeSubmenu" data-bs-toggle="collapse" class="nav-link">
                <div><i class="fas fa-users me-2"></i> Employees</div>
                <i class="fas fa-chevron-down submenu-arrow"></i>
            </a>
            <ul class="collapse list-unstyled ps-3" id="employeeSubmenu">
                <li><a href="employee-list.php">View All</a></li>
                <li><a href="employee-add.php">Add New</a></li>
                <li><a href="employee-reports.php">Reports</a></li>
            </ul>
        </li>

        <li class="<?php echo ($currentPage == 'projects') ? 'active' : ''; ?>">
            <a href="projects.php">
                <i class="fas fa-project-diagram me-2"></i> Projects
            </a>
        </li>

        <li class="<?php echo ($currentPage == 'timesheet') ? 'active' : ''; ?>">
            <a href="timesheet.php">
                <i class="fas fa-clock me-2"></i> Timesheets
            </a>
        </li>

        <li class="<?php echo ($currentPage == 'reports') ? 'active' : ''; ?>">
            <a href="reports.php">
                <i class="fas fa-chart-line me-2"></i> Reports
            </a>
        </li>

        <li class="<?php echo ($currentPage == 'settings') ? 'active' : ''; ?>">
            <a href="settings.php">
                <i class="fas fa-cog me-2"></i> Settings
            </a>
        </li>
    </ul>
</nav>
