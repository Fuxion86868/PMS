// ============================================
// GPS · PMS - COURT ATTENDANCE PAGE
// ============================================

// ==================== COURT DATA ====================
const courtHearings = [
    { id: 1, inmateId: 'INM-2024-0012', prisoner: 'Marcus Johnson', caseNumber: 'CASE-2024-0189', court: 'High Court - Accra', type: 'trial', date: '2024-01-16', time: '09:00', judge: 'Justice Abena Mensah', escorts: 'Capt. John Mensah, Offc. Grace Tetteh', status: 'scheduled', outcome: '' },
    { id: 2, inmateId: 'INM-2024-0011', prisoner: 'Kojo Mensah', caseNumber: 'CASE-2024-0180', court: 'Circuit Court - Kumasi', type: 'sentencing', date: '2024-01-16', time: '11:30', judge: 'Justice Yaw Boakye', escorts: 'Lt. Sarah Owusu', status: 'scheduled', outcome: '' },
    { id: 3, inmateId: 'INM-2024-0010', prisoner: 'Abena Dapaah', caseNumber: 'CASE-2024-0175', court: 'High Court - Accra', type: 'bail', date: '2024-01-17', time: '10:00', judge: 'Justice Abena Mensah', escorts: 'Sgt. Kofi Amoah', status: 'scheduled', outcome: '' },
    { id: 4, inmateId: 'INM-2024-0009', prisoner: 'Yaw Boateng', caseNumber: 'CASE-2024-0170', court: 'High Court - Accra', type: 'trial', date: '2024-01-18', time: '08:30', judge: 'Justice Abena Mensah', escorts: 'Capt. John Mensah, Sgt. Kofi Amoah', status: 'scheduled', outcome: '' },
    { id: 5, inmateId: 'INM-2024-0008', prisoner: 'Ama Serwaa', caseNumber: 'CASE-2023-0165', court: 'District Court - Accra', type: 'mention', date: '2024-01-12', time: '09:30', judge: 'Magistrate Kwame Nkrumah', escorts: 'Offc. Grace Tetteh', status: 'completed', outcome: 'Released' },
    { id: 6, inmateId: 'INM-2024-0012', prisoner: 'Marcus Johnson', caseNumber: 'CASE-2024-0189', court: 'High Court - Accra', type: 'trial', date: '2024-01-10', time: '09:00', judge: 'Justice Abena Mensah', escorts: 'Capt. John Mensah', status: 'completed', outcome: 'Adjourned' },
    { id: 7, inmateId: 'INM-2024-0011', prisoner: 'Kojo Mensah', caseNumber: 'CASE-2024-0180', court: 'Circuit Court - Kumasi', type: 'mention', date: '2024-01-08', time: '10:00', judge: 'Justice Yaw Boakye', escorts: 'Lt. Sarah Owusu', status: 'adjourned', outcome: 'Next: 2024-01-16' },
];

let selectedDate = '2024-01-16';
let currentMonth = 0; // January
let currentYear = 2024;

// ==================== CALENDAR ====================
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function renderCalendar() {
    document.getElementById('calendarMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    
    let calendarHTML = `
        <div class="calendar-weekdays">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>
        <div class="calendar-days">
    `;
    
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="calendar-day other-month"></div>';
    }
    
    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = dateStr === today.toISOString().split('T')[0];
        const isSelected = dateStr === selectedDate;
        const hasHearing = courtHearings.some(h => h.date === dateStr);
        
        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (isSelected) classes += ' selected';
        if (hasHearing) classes += ' has-hearing';
        
        calendarHTML += `<div class="${classes}" data-date="${dateStr}" onclick="selectDate('${dateStr}')">${day}</div>`;
    }
    
    calendarHTML += '</div>';
    document.getElementById('calendarGrid').innerHTML = calendarHTML;
}

function selectDate(date) {
    selectedDate = date;
    document.getElementById('selectedDate').textContent = formatDate(date);
    renderCalendar();
    renderHearingsList();
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
});

function formatDate(dateStr) {
    if (dateStr === new Date().toISOString().split('T')[0]) return 'Today';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

// ==================== HEARINGS LIST ====================
function renderHearingsList() {
    const hearings = courtHearings.filter(h => h.date === selectedDate);
    const list = document.getElementById('hearingsList');
    document.getElementById('hearingCount').textContent = `${hearings.length} hearing${hearings.length !== 1 ? 's' : ''}`;
    
    if (hearings.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-check"></i>
                <p>No hearings scheduled for this date</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = hearings.map(h => `
        <div class="hearing-item">
            <div class="hearing-item-header">
                <div class="hearing-prisoner">
                    <div class="hearing-avatar"><i class="fas fa-user"></i></div>
                    <div>
                        <div class="hearing-name">${h.prisoner}</div>
                        <div class="hearing-id">${h.inmateId} | ${h.caseNumber}</div>
                    </div>
                </div>
                <span class="hearing-type-badge ${h.type}">${h.type.toUpperCase()}</span>
            </div>
            <div class="hearing-details">
                <span><i class="fas fa-landmark"></i> ${h.court}</span>
                <span><i class="fas fa-clock"></i> ${h.time}</span>
                <span><i class="fas fa-gavel"></i> ${h.judge}</span>
                <span><i class="fas fa-user-shield"></i> ${h.escorts}</span>
            </div>
            <div class="hearing-actions">
                <button class="btn btn-sm btn-primary" onclick="openOutcomeModal(${h.id})">
                    <i class="fas fa-check-circle"></i> Record Outcome
                </button>
                <button class="btn btn-sm btn-outline" onclick="adjournHearing(${h.id})">
                    <i class="fas fa-calendar-alt"></i> Adjourn
                </button>
            </div>
        </div>
    `).join('');
}

// ==================== TABLE ====================
function renderTable(filteredData = null) {
    const data = filteredData || courtHearings;
    const tbody = document.getElementById('courtTable');
    
    tbody.innerHTML = data.map(h => `
        <tr>
            <td><strong>${h.date}</strong><br><small>${h.time}</small></td>
            <td>${h.prisoner}<br><small>${h.inmateId}</small></td>
            <td>${h.caseNumber}</td>
            <td>${h.court}</td>
            <td><span class="hearing-type-badge ${h.type}">${h.type}</span></td>
            <td>${h.judge}</td>
            <td>${h.escorts}</td>
            <td><span class="status-badge ${h.status}">${h.status}</span></td>
            <td>${h.outcome ? `<span class="outcome-badge">${h.outcome}</span>` : '-'}</td>
            <td>
                <div class="actions-cell">
                    ${h.status === 'scheduled' ? `
                        <button class="btn-icon-xs complete" title="Record Outcome" onclick="openOutcomeModal(${h.id})">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn-icon-xs adjourn" title="Adjourn" onclick="adjournHearing(${h.id})">
                            <i class="fas fa-calendar-alt"></i>
                        </button>
                        <button class="btn-icon-xs cancel" title="Cancel" onclick="cancelHearing(${h.id})">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : '<small class="text-light">Completed</small>'}
                </div>
            </td>
        </tr>
    `).join('');
}

// ==================== FILTERS ====================
document.getElementById('filterStatus').addEventListener('change', applyFilters);
document.getElementById('filterType').addEventListener('change', applyFilters);
document.getElementById('filterDate').addEventListener('change', applyFilters);

function applyFilters() {
    const status = document.getElementById('filterStatus').value;
    const type = document.getElementById('filterType').value;
    const date = document.getElementById('filterDate').value;
    
    let filtered = courtHearings;
    if (status) filtered = filtered.filter(h => h.status === status);
    if (type) filtered = filtered.filter(h => h.type === type);
    if (date) filtered = filtered.filter(h => h.date === date);
    
    renderTable(filtered);
}

// ==================== ACTIONS ====================
function openOutcomeModal(hearingId) {
    const hearing = courtHearings.find(h => h.id === hearingId);
    if (!hearing) return;
    
    document.getElementById('outcomePrisonerInfo').innerHTML = `
        <i class="fas fa-gavel" style="font-size:24px;color:var(--accent-dark);"></i>
        <div>
            <h4>${hearing.prisoner} (${hearing.inmateId})</h4>
            <span>${hearing.caseNumber} | ${hearing.court} | ${hearing.date} at ${hearing.time}</span>
        </div>
    `;
    
    document.getElementById('outcomeResult').value = '';
    document.getElementById('outcomeNextDate').value = '';
    document.getElementById('nextDateGroup').style.display = 'none';
    document.getElementById('outcomeVerdict').value = '';
    document.getElementById('outcomeRemarks').value = '';
    document.getElementById('outcomeReport').value = '';
    
    // Store hearing ID for save
    document.getElementById('saveOutcomeBtn').setAttribute('data-hearing-id', hearingId);
    
    document.getElementById('outcomeModal').classList.add('active');
}

// Show/hide next date when adjourned
document.getElementById('outcomeResult').addEventListener('change', function() {
    document.getElementById('nextDateGroup').style.display = this.value === 'adjourned' ? 'flex' : 'none';
});

document.getElementById('saveOutcomeBtn').addEventListener('click', function() {
    const hearingId = parseInt(this.getAttribute('data-hearing-id'));
    const outcome = document.getElementById('outcomeResult').value;
    const verdict = document.getElementById('outcomeVerdict').value;
    const remarks = document.getElementById('outcomeRemarks').value;
    const report = document.getElementById('outcomeReport').value;
    const nextDate = document.getElementById('outcomeNextDate').value;
    
    if (!outcome) { alert('Please select an outcome'); return; }
    
    const hearing = courtHearings.find(h => h.id === hearingId);
    if (hearing) {
        hearing.status = (outcome === 'adjourned') ? 'adjourned' : 'completed';
        hearing.outcome = outcome.charAt(0).toUpperCase() + outcome.slice(1);
        if (nextDate) hearing.outcome += ` - Next: ${nextDate}`;
    }
    
    alert(`✅ Outcome recorded!\n\nPrisoner: ${hearing.prisoner}\nOutcome: ${outcome.toUpperCase()}\n\nBACKEND: PUT /api/court/${hearingId}\nBody: { outcome: "${outcome}", verdict: "${verdict}", next_date: "${nextDate}" }`);
    
    document.getElementById('outcomeModal').classList.remove('active');
    renderHearingsList();
    renderTable();
    updateStats();
});

function adjournHearing(hearingId) {
    const newDate = prompt('Enter new court date (YYYY-MM-DD):');
    if (!newDate) return;
    
    const hearing = courtHearings.find(h => h.id === hearingId);
    if (hearing) {
        hearing.status = 'adjourned';
        hearing.outcome = `Adjourned to ${newDate}`;
        hearing.date = newDate;
    }
    
    alert(`✅ Hearing adjourned to ${newDate}\n\nBACKEND: PUT /api/court/${hearingId}\nBody: { status: "adjourned", new_date: "${newDate}" }`);
    renderHearingsList();
    renderTable();
    renderCalendar();
    updateStats();
}

function cancelHearing(hearingId) {
    if (!confirm('Cancel this court hearing?')) return;
    
    const hearing = courtHearings.find(h => h.id === hearingId);
    if (hearing) {
        const reason = prompt('Reason for cancellation:');
        hearing.status = 'cancelled';
        hearing.outcome = `Cancelled: ${reason || 'No reason given'}`;
    }
    
    alert('✅ Hearing cancelled');
    renderHearingsList();
    renderTable();
    updateStats();
}

// ==================== SCHEDULE MODAL ====================
document.getElementById('scheduleBtn').addEventListener('click', () => {
    document.getElementById('scheduleModal').classList.add('active');
});

document.getElementById('closeScheduleModal').addEventListener('click', () => {
    document.getElementById('scheduleModal').classList.remove('active');
});

document.getElementById('cancelScheduleBtn').addEventListener('click', () => {
    document.getElementById('scheduleModal').classList.remove('active');
});

document.getElementById('saveScheduleBtn').addEventListener('click', () => {
    const prisoner = document.getElementById('schedPrisoner').value;
    const court = document.getElementById('schedCourt').value;
    const type = document.getElementById('schedType').value;
    const date = document.getElementById('schedDate').value;
    const time = document.getElementById('schedTime').value;
    const judge = document.getElementById('schedJudge').value;
    
    if (!prisoner || !court || !type || !date || !time) {
        alert('Please fill all required fields');
        return;
    }
    
    // Add new hearing
    const prisonerName = document.getElementById('schedPrisoner').selectedOptions[0].text.split(' (')[0];
    const newHearing = {
        id: courtHearings.length + 1,
        inmateId: prisoner,
        prisoner: prisonerName,
        caseNumber: document.getElementById('schedCase').value || 'CASE-2024-NEW',
        court: court,
        type: type,
        date: date,
        time: time,
        judge: judge || 'TBD',
        escorts: 'TBD',
        status: 'scheduled',
        outcome: ''
    };
    
    courtHearings.push(newHearing);
    
    alert(`✅ Court date scheduled!\n\nPrisoner: ${prisonerName}\nDate: ${date} at ${time}\nCourt: ${court}\n\nBACKEND: POST /api/court\nBody: { inmate_id: "${prisoner}", court: "${court}", type: "${type}", date: "${date}", time: "${time}" }`);
    
    document.getElementById('scheduleModal').classList.remove('active');
    renderCalendar();
    renderHearingsList();
    renderTable();
    updateStats();
});

// ==================== CLOSE MODALS ====================
document.getElementById('closeOutcomeModal').addEventListener('click', () => {
    document.getElementById('outcomeModal').classList.remove('active');
});
document.getElementById('cancelOutcomeBtn').addEventListener('click', () => {
    document.getElementById('outcomeModal').classList.remove('active');
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('active');
    });
});

// ==================== UPDATE STATS ====================
function updateStats() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('statToday').textContent = courtHearings.filter(h => h.date === today).length;
    document.getElementById('statPending').textContent = courtHearings.filter(h => h.status === 'scheduled').length;
    document.getElementById('statCompleted').textContent = courtHearings.filter(h => h.status === 'completed').length;
}

// ==================== SIDEBAR ====================
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        this.classList.add('active');
    });
});

// ==================== MOBILE ====================
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebar.classList.toggle('mobile-open');
    });
}

// ==================== KEYBOARD ====================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    }
});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    selectedDate = today;
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    
    document.getElementById('selectedDate').textContent = 'Today';
    document.getElementById('filterDate').value = today;
    
    renderCalendar();
    renderHearingsList();
    renderTable();
    updateStats();
    
    console.log('✅ Court Attendance Page Loaded');
    console.log('📅 Selected date:', today);
    console.log('📊 Total hearings:', courtHearings.length);
});