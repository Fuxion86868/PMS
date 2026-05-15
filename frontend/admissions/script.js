// ============================================
// GPS · PMS - ADMISSIONS PAGE
// ============================================

// ==================== TAB NAVIGATION ====================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const prevBtn = document.getElementById('prevTabBtn');
const nextBtn = document.getElementById('nextTabBtn');
let currentTab = 0;

tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        switchTab(index);
    });
});

function switchTab(index) {
    // Update active states
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    tabBtns[index].classList.add('active');
    tabContents[index].classList.add('active');
    
    currentTab = index;
    updateNavButtons();
    
    // Scroll to top of form
    document.querySelector('.tabs-container').scrollIntoView({ behavior: 'smooth' });
}

function updateNavButtons() {
    prevBtn.style.display = currentTab === 0 ? 'none' : 'flex';
    
    if (currentTab === tabBtns.length - 1) {
        nextBtn.innerHTML = '<i class="fas fa-check-circle"></i> Complete Admission';
        nextBtn.classList.add('btn-primary');
    } else {
        nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        nextBtn.classList.add('btn-primary');
    }
}

prevBtn.addEventListener('click', () => {
    if (currentTab > 0) switchTab(currentTab - 1);
});

nextBtn.addEventListener('click', () => {
    if (currentTab < tabBtns.length - 1) {
        switchTab(currentTab + 1);
    } else {
        submitAdmission();
    }
});

// ==================== WARRANT SEARCH ====================
document.getElementById('searchWarrantBtn').addEventListener('click', function() {
    const searchValue = document.getElementById('warrantSearch').value.trim();
    
    if (!searchValue) {
        alert('Please enter a warrant number or case number');
        return;
    }
    
    // Simulate search
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    this.disabled = true;
    
    setTimeout(() => {
        document.getElementById('warrantResult').style.display = 'block';
        this.innerHTML = '<i class="fas fa-search"></i> Search Warrant';
        this.disabled = false;
        
        // Show success message
        showNotification('Warrant found! Details auto-filled.', 'success');
    }, 1500);
});

// ==================== PHOTO UPLOAD ====================
document.getElementById('photoPreview').addEventListener('click', function() {
    document.getElementById('photoInput').click();
});

document.getElementById('photoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('photoPreview').innerHTML = `<img src="${event.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
        };
        reader.readAsDataURL(file);
    }
});

// ==================== PROPERTY ITEMS ====================
document.getElementById('addPropertyItem').addEventListener('click', function() {
    const propertyList = document.getElementById('propertyList');
    const newItem = document.createElement('div');
    newItem.className = 'property-item';
    newItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Item Description</label>
                <input type="text" placeholder="Describe item">
            </div>
            <div class="form-group">
                <label>Quantity</label>
                <input type="number" value="1" min="1">
            </div>
            <div class="form-group">
                <label>Condition</label>
                <select>
                    <option>Good</option>
                    <option>Fair</option>
                    <option>Poor</option>
                </select>
            </div>
            <div class="form-group item-actions">
                <button type="button" class="btn-icon remove-item" title="Remove">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    propertyList.appendChild(newItem);
    
    // Add remove event
    newItem.querySelector('.remove-item').addEventListener('click', function() {
        newItem.remove();
    });
});

// Add remove event to existing items
document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.property-item').remove();
    });
});

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'success') {
    // Simple alert for now - can be replaced with toast
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// ==================== SUBMIT ADMISSION ====================
function submitAdmission() {
    // Check confirmations
    const confirmInmate = document.getElementById('confirmInmate').checked;
    const confirmProperty = document.getElementById('confirmProperty').checked;
    const confirmMedical = document.getElementById('confirmMedical').checked;
    const confirmRules = document.getElementById('confirmRules').checked;
    
    if (!confirmInmate || !confirmProperty || !confirmMedical || !confirmRules) {
        alert('Please confirm all checkboxes before submitting.');
        return;
    }
    
    // Collect form data
    const formData = {
        inmateId: document.getElementById('inmateId').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        otherNames: document.getElementById('otherNames').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        nationality: document.getElementById('nationality').value,
        caseNumber: document.getElementById('caseNumber').value,
        offense: document.getElementById('offense').value,
        cellBlock: document.getElementById('cellBlock').value,
        admissionDate: document.getElementById('admissionDate').value,
        // ... collect all other fields
    };
    
    console.log('Admission Data:', formData);
    
    // Show success
    alert('Admission completed successfully! Inmate ID: ' + formData.inmateId);
    
    // Redirect to dashboard
    // window.location.href = '../dashboard/index.html';
}

// ==================== RECENT ADMISSIONS ====================
const recentAdmissions = [
    { id: 'INM-2024-0011', name: 'Kojo Mensah', crime: 'Theft', block: 'Block B', date: '2024-01-14', status: 'Active' },
    { id: 'INM-2024-0010', name: 'Abena Dapaah', crime: 'Fraud', block: 'Block A', date: '2024-01-13', status: 'Active' },
    { id: 'INM-2024-0009', name: 'Yaw Boateng', crime: 'Assault', block: 'Block C', date: '2024-01-12', status: 'Released' },
];

function renderRecentAdmissions() {
    const tbody = document.getElementById('recentAdmissionsTable');
    if (!tbody) return;
    tbody.innerHTML = recentAdmissions.map(item => `
        <tr>
            <td><strong>${item.id}</strong></td>
            <td>${item.name}</td>
            <td>${item.crime}</td>
            <td>${item.block}</td>
            <td>${item.date}</td>
            <td><span class="status-badge ${item.status.toLowerCase()}">${item.status}</span></td>
        </tr>
    `).join('');
}

// ==================== AGE CALCULATION ====================
document.getElementById('dob').addEventListener('change', function() {
    const dob = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    document.getElementById('age').value = age;
});

// ==================== SIDEBAR NAVIGATION ====================
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
        }
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        this.classList.add('active');
    });
});

// ==================== MOBILE SIDEBAR ====================
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebar.classList.toggle('mobile-open');
    });
}

document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('mobile-open');
        }
    }
});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    renderRecentAdmissions();
    updateNavButtons();
    console.log('Admissions Page Loaded');
});