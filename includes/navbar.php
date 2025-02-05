<nav class="top-navbar">
    <div class="navbar-left">
        <button id="sidebarCollapse" class="menu-toggle">
            <i class="fas fa-bars"></i>
        </button>
        <h4 class="mb-0 ms-3"><?php echo $pageTitle ?? 'Dashboard'; ?></h4>
    </div>

    <div class="navbar-right">
        <!-- Search -->
        <div class="nav-item search-box me-3">
            <input type="text" class="form-control" placeholder="Search...">
        </div>

        <!-- Notifications -->
        <div class="nav-item dropdown me-3">
            <button class="btn btn-link position-relative" data-bs-toggle="dropdown">
                <i class="fas fa-bell"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                </span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end notification-dropdown">
                <li class="dropdown-header">
                    <h6>Notifications</h6>
                    <span class="badge bg-primary">New 3</span>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <a class="dropdown-item" href="#">
                        <div class="notification-item">
                            <i class="fas fa-file-alt text-primary"></i>
                            <div class="ms-2">
                                <p class="mb-0">New timesheet submission</p>
                                <small class="text-muted">2 minutes ago</small>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="dropdown-item" href="#">
                        <div class="notification-item">
                            <i class="fas fa-project-diagram text-warning"></i>
                            <div class="ms-2">
                                <p class="mb-0">Project deadline approaching</p>
                                <small class="text-muted">1 hour ago</small>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="dropdown-item" href="#">
                        <div class="notification-item">
                            <i class="fas fa-users text-success"></i>
                            <div class="ms-2">
                                <p class="mb-0">New employee registered</p>
                                <small class="text-muted">3 hours ago</small>
                            </div>
                        </div>
                    </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <a class="dropdown-item text-center" href="#">
                        View All Notifications
                    </a>
                </li>
            </ul>
        </div>

        <!-- User Profile -->
        <div class="nav-item dropdown">
            <div class="user-profile" data-bs-toggle="dropdown">
                <img src="images/avatar.jpg" alt="User" class="rounded-circle">
                <span class="ms-2 d-none d-sm-inline-block">
                    <?php echo $_SESSION['user_name'] ?? 'Admin User'; ?>
                </span>
                <i class="fas fa-chevron-down ms-2"></i>
            </div>
            <ul class="dropdown-menu dropdown-menu-end">
                <li>
                    <a class="dropdown-item" href="profile.php">
                        <i class="fas fa-user me-2"></i> My Profile
                    </a>
                </li>
                <li>
                    <a class="dropdown-item" href="account-settings.php">
                        <i class="fas fa-cog me-2"></i> Account Settings
                    </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <a class="dropdown-item" href="logout.php">
                        <i class="fas fa-sign-out-alt me-2"></i> Logout
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
