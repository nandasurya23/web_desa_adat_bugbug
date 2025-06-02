       // Calendar Functionality
       document.addEventListener('DOMContentLoaded', function() {
        // Initialize calendar
        let currentDate = new Date();
        updateCalendar(currentDate);

        // Navigation buttons
        document.getElementById('prev-month').addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar(currentDate);
        });

        document.getElementById('next-month').addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar(currentDate);
        });

        // Days of week header
        const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const daysHeader = document.getElementById('calendar-days-header');
        
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            daysHeader.appendChild(dayElement);
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
            this.reset();
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            });
        });
    });

    function updateCalendar(date) {
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                          "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        
        // Update month/year display
        document.getElementById('current-month-year').textContent = 
            `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        
        // Get first day of month and total days in month
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const totalDays = lastDay.getDate();
        
        // Get day of week for first day (0-6)
        const startingDay = firstDay.getDay();
        
        // Clear previous dates
        const datesContainer = document.getElementById('calendar-dates');
        datesContainer.innerHTML = '';
        
        // Add empty cells for days before first day of month
        for (let i = 0; i < startingDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-date empty';
            datesContainer.appendChild(emptyCell);
        }
        
        // Add cells for each day of month
        const today = new Date();
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();
        
        // Sample events data (in a real app, this would come from a database)
        const events = {
            '15': 'Usaba Gumang',
            '25': 'Ngaben Massal'
        };
        
        for (let day = 1; day <= totalDays; day++) {
            const dateCell = document.createElement('div');
            dateCell.className = 'calendar-date';
            
            // Highlight today
            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dateCell.classList.add('today');
            }
            
            // Add event indicator
            if (events[day]) {
                dateCell.classList.add('has-event');
                const eventDot = document.createElement('span');
                eventDot.className = 'event-dot';
                dateCell.appendChild(eventDot);
            }
            
            dateCell.textContent = day;
            datesContainer.appendChild(dateCell);
        }
    }