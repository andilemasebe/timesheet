function updateSidebarByRole(userRole) {
    const restrictedItems = [
        '#companySubmenu',
        'a[href="employee-management.html"]',
        'a[href="reports.html"]',
        'a[href="departments.html"]'
    ];

    if (userRole === 'employee') {
        restrictedItems.forEach(item => {
            const element = document.querySelector(item);
            if (element) {
                element.closest('li').style.display = 'none';
            }
        });
    }
}
