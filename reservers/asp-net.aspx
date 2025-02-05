@{
    ViewBag.Title = "Employee Dashboard";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

@section Styles {
    <link rel="stylesheet" href="~/Content/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        .container {
            display: flex;
            flex-direction: row;
            margin-top: 80px;
            padding: 0 15px;
        }

        .dashboard {
            flex: 1;
            padding: 20px;
        }

        .timesheet-form {
            max-width: 1200px;
            margin: 0 auto;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-control {
            width: 100%;
            padding: 10px;
        }

        .table-responsive {
            overflow-x: auto;
        }

        .timesheet-table {
            width: 100%;
            min-width: 600px;
        }

        @media screen and (max-width: 1024px) {
            .container {
                padding: 0 10px;
            }
        }

        @media screen and (max-width: 768px) {
            .container {
                flex-direction: column;
            }

            .hamburger-menu {
                display: block !important;
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                position: absolute;
                right: 70px;
                top: 50%;
                transform: translateY(-50%);
            }

            .sidebar {
                display: none;
                position: fixed;
                top: 60px;
                left: 0;
                width: 100%;
                background: white;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                z-index: 999;
            }

            .sidebar.active {
                display: block;
            }

            .dashboard {
                width: 100%;
                padding: 10px;
            }

            .header .logout-btn {
                display: none;
            }

            .sidebar .logout-btn {
                display: block;
                width: 100%;
                padding: 10px;
                text-align: left;
                background: none;
                border: none;
                cursor: pointer;
            }
        }

        @media screen and (max-width: 480px) {
            .header h1 {
                font-size: 1.5em;
            }

            .button-group {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .btn-submit, .btn-reset {
                width: 100%;
            }

            .timesheet-table {
                font-size: 14px;
            }

            .form-group label {
                font-size: 14px;
            }
        }
    </style>
}

<div class="header" style="position: fixed; width: 100%; top: 0; z-index: 1000;">
    <h1>Employee Dashboard</h1>
    @Html.ActionLink("Logout", "Logout", "Account", null, new { @class = "logout-btn" })
    <button class="hamburger-menu" id="menuToggle" style="display: none;">
        <i class="fas fa-bars"></i>
    </button>
</div>

<div class="container">
    <div class="sidebar" id="sidebar">
        <nav>
            <ul>
                <li>@Html.ActionLink("Dashboard", "Index", "Dashboard", null, new { @class = "active" })<i class="fas fa-home"></i></li>
                <li>@Html.ActionLink("Profile", "Index", "Profile", null, new { })<i class="fas fa-user"></i></li>
                <li>@Html.ActionLink("Time Sheets", "Index", "TimeSheets", null, new { })<i class="fas fa-clock"></i></li>
                <li>@Html.ActionLink("Projects", "Index", "Projects", null, new { })<i class="fas fa-project-diagram"></i></li>
                <li>@Html.ActionLink("Reports", "Index", "Reports", null, new { })<i class="fas fa-chart-bar"></i></li>
                <li>@Html.ActionLink("Settings", "Index", "Settings", null, new { })<i class="fas fa-cog"></i></li>
                <li>@Html.ActionLink("Logout", "Logout", "Account", null, new { @class = "logout-btn" })<i class="fas fa-sign-out-alt"></i></li>
            </ul>
        </nav>
    </div>

    <div class="dashboard">
        <div class="timesheet-form">
            <h2 style="text-align: center;"><i class="fas fa-calendar-plus"></i> Submit Timesheet</h2><br>
            @using (Html.BeginForm("SubmitTimesheet", "TimeSheets", FormMethod.Post, new { id = "timesheetForm", autocomplete = "on" }))
            {
                @Html.AntiForgeryToken()
                <div class="form-group">
                    <label for="date"><i class="far fa-calendar-alt"></i> Date:</label>
                    @Html.TextBox("date", null, new { @class = "form-control", type = "date", required = "required" })
                </div>
                <div class="form-group">
                    <label for="hours"><i class="far fa-clock"></i> Hours Worked:</label>
                    @Html.TextBox("hours", null, new { @class = "form-control", type = "number", min = "0", max = "24", step = "0.5", required = "required", placeholder = "Enter hours (0-24)", title = "Please enter the number of hours worked (between 0 and 24)" })
                </div>
                <div class="form-group">
                    <label for="project"><i class="fas fa-tasks"></i> Project:</label>
                    @Html.DropDownList("project", new SelectList(ViewBag.Projects, "Value", "Text"), "Select a project", new { @class = "form-control", required = "required" })
                </div>
                <div class="form-group">
                    <label for="description"><i class="fas fa-comment-alt"></i> Work Description:</label>
                    @Html.TextArea("description", null, new { @class = "form-control", rows = "4", required = "required", maxlength = "500", placeholder = "Describe your work" })
                    <small class="char-count">0/500 characters</small>
                </div>
                <div class="form-group button-group">
                    <button type="submit" class="btn-submit"><i class="fas fa-save"></i> Submit Time Entry</button>
                    <button type="reset" class="btn-reset"><i class="fas fa-undo"></i> Clear Form</button>
                </div>
            }

            <h3><i class="fas fa-history"></i> Recent Time Entries</h3>
            <div class="table-responsive">
                <table class="timesheet-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Hours</th>
                            <th>Project</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="timeEntries">
                        @foreach (var entry in Model.TimeEntries)
                        {
                            <tr>
                                <td>@entry.Date.ToShortDateString()</td>
                                <td>@entry.Hours</td>
                                <td>@entry.Project</td>
                                <td>@entry.Description</td>
                                <td>@entry.Status</td>
                                <td>
                                    @Html.ActionLink("Edit", "Edit", new { id = entry.Id }, new { @class = "btn-edit" })
                                    @Html.ActionLink("Delete", "Delete", new { id = entry.Id }, new { @class = "btn-delete", onclick = "return confirm('Are you sure you want to delete this entry?');" })
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

@section Scripts {
    <script src="~/Scripts/employee.js"></script>
    <script>
        document.getElementById('menuToggle').addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('active');
        });
    </script>
}