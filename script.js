        // User Authentication State
        let isLoggedIn = false;
        let currentUser = null;

        // DOM Elements
        const authButtons = document.getElementById('authButtons');
        const userInfo = document.getElementById('userInfo');
        const userName = document.getElementById('userName');
        const adminSection = document.getElementById('adminSection');
        
        // Modal Elements
        const loginModal = document.getElementById('loginModal');
        const registerModal = document.getElementById('registerModal');
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const showRegister = document.getElementById('showRegister');
        const showLogin = document.getElementById('showLogin');
        const closeBtns = document.querySelectorAll('.close-btn');
        const logoutBtn = document.getElementById('logoutBtn');

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

            // Login Form submission
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // Simple validation
                if (email && password) {
                    loginUser(email);
                } else {
                    alert('Silakan isi semua field!');
                }
            });

            // Register Form submission
            document.getElementById('registerForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('registerConfirmPassword').value;
                
                // Validation
                if (!name || !email || !password || !confirmPassword) {
                    alert('Silakan isi semua field!');
                    return;
                }
                
                if (password !== confirmPassword) {
                    alert('Password dan konfirmasi password tidak cocok!');
                    return;
                }
                
                registerUser(name, email);
            });

            // Modal functionality
            loginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
            registerBtn.addEventListener('click', () => registerModal.style.display = 'flex');
            showRegister.addEventListener('click', (e) => {
                e.preventDefault();
                loginModal.style.display = 'none';
                registerModal.style.display = 'flex';
            });
            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                registerModal.style.display = 'none';
                loginModal.style.display = 'flex';
            });
            
            closeBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    this.closest('.modal').style.display = 'none';
                });
            });
            
            logoutBtn.addEventListener('click', logoutUser);

            // Close modal when clicking outside
            window.addEventListener('click', function(e) {
                if (e.target === loginModal) {
                    loginModal.style.display = 'none';
                }
                if (e.target === registerModal) {
                    registerModal.style.display = 'none';
                }
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

            // Check if user is logged in (in a real app, this would check localStorage/session)
            checkLoginStatus();
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
                    
                    // Add event tooltip
                    const eventTooltip = document.createElement('div');
                    eventTooltip.className = 'event-tooltip';
                    eventTooltip.textContent = events[day];
                    dateCell.appendChild(eventTooltip);
                }
                
                dateCell.textContent = day;
                datesContainer.appendChild(dateCell);
            }
        }

        // User Functions
        function checkLoginStatus() {
            // In a real app, this would check localStorage or cookies
            // For demo, we'll just use the isLoggedIn variable
            if (isLoggedIn) {
                authButtons.style.display = 'none';
                userInfo.style.display = 'flex';
                adminSection.style.display = 'block';
            } else {
                authButtons.style.display = 'flex';
                userInfo.style.display = 'none';
                adminSection.style.display = 'none';
            }
        }

        function loginUser(email) {
            // In a real app, this would validate against a database
            // For demo, we'll just simulate a successful login
            isLoggedIn = true;
            currentUser = {
                name: email.split('@')[0],
                email: email
            };
            
            // Update UI
            userName.textContent = currentUser.name;
            checkLoginStatus();
            
            // Close modal and reset form
            loginModal.style.display = 'none';
            document.getElementById('loginForm').reset();
            
            alert('Login berhasil! Selamat datang, ' + currentUser.name);
        }

        function registerUser(name, email) {
            // In a real app, this would create a new user in database
            // For demo, we'll just simulate registration and auto-login
            isLoggedIn = true;
            currentUser = {
                name: name,
                email: email
            };
            
            // Update UI
            userName.textContent = currentUser.name;
            checkLoginStatus();
            
            // Close modal and reset form
            registerModal.style.display = 'none';
            document.getElementById('registerForm').reset();
            
            alert('Registrasi berhasil! Selamat datang, ' + currentUser.name);
        }

        function logoutUser(e) {
            e.preventDefault();
            isLoggedIn = false;
            currentUser = null;
            checkLoginStatus();
            alert('Anda telah logout.');
        }