document.addEventListener('DOMContentLoaded', function() {
    // Current date tracking
    let currentDate = new Date();
    
    // Initialize calendar
    function initCalendar() {
        const currentMonthElement = document.getElementById('currentMonth');
        const calendarDays = document.getElementById('calendarDays');
        
        // Update month/year display
        currentMonthElement.textContent = currentDate.toLocaleString('default', { 
            month: 'long', 
            year: 'numeric' 
        });
        
        // Generate calendar days
        generateCalendarDays(currentDate, calendarDays);
    }

    // Generate calendar grid
    function generateCalendarDays(date, container) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const startingDay = firstDay.getDay();
        
        container.innerHTML = '';
        
        // Previous month padding
        for (let i = 0; i < startingDay; i++) {
            container.appendChild(createDayElement(''));
        }
        
        // Current month days
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = createDayElement(day);
            if (isToday(date, day)) {
                dayElement.classList.add('today');
            }
            container.appendChild(dayElement);
        }
    }

    // Navigation handlers
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        initCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        initCalendar();
    });

    // Event modal handling
    const addEventBtn = document.getElementById('addEventBtn');
    const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    
    addEventBtn.addEventListener('click', () => {
        eventModal.show();
    });

    // Initialize calendar on load
    initCalendar();
});
