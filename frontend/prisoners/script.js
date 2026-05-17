// ============================================
// GPS · PMS - PRISONERS PAGE
// ============================================
// FRONTEND: All UI interactions work now
// BACKEND: API calls are marked with comments
// ============================================

// ==================== MOCK DATA ====================
// BACKEND: This data will come from GET /api/prisoners
const prisoners = [
    { id: 'INM-2024-0012', firstName: 'Marcus', lastName: 'Johnson', age: 38, gender: 'Male', nationality: 'Ghanaian', block: 'A', cell: 'A-104', security: 'medium', offense: 'Armed Robbery', sentence: '15 years', status: 'active', admissionDate: '2024-01-15', photo: '', caseNumber: 'CASE-2024-0189', warrantNumber: 'WRT-2024-0042', dob: '1985-06-15', nationalId: 'GHA-839201745', phone: '+233 24 567 8901', address: '15 Independence Avenue, Accra', maritalStatus: 'Single', height: '178', weight: '82', eyeColor: 'Brown', hairColor: 'Black', marks: 'Scar on left forearm', kinName: 'Ama Johnson', kinRelation: 'Spouse', kinContact: '+233 24 123 4567', arrestDate: '2024-01-10', arrestingOfficer: 'Detective Kwame Asante', court: 'High Court - Accra', judge: 'Justice Abena Mensah', expectedRelease: '2039-01-10', bloodGroup: 'O+', genotype: 'AA', allergies: 'Penicillin, Peanuts', chronicIllness: 'Mild Asthma', medications: 'Ventolin Inhaler', mentalHealth: 'Stable', assignedOfficer: 'Captain John Mensah', items: 'Wrist Watch, Wallet', cash: 'GHS 450.00', valuables: 'Gold chain, 1 wedding ring', instructions: 'Monitor for 72 hours' },
    { id: 'INM-2024-0011', firstName: 'Kojo', lastName: 'Mensah', age: 27, gender: 'Male', nationality: 'Ghanaian', block: 'B', cell: 'B-205', security: 'minimum', offense: 'Theft', sentence: '3 years', status: 'active', admissionDate: '2024-01-14', photo: '', caseNumber: 'CASE-2024-0180', warrantNumber: 'WRT-2024-0038', dob: '1997-03-22', nationalId: 'GHA-739201845', phone: '+233 55 123 4567', address: '42 Market Street, Kumasi', maritalStatus: 'Single', height: '172', weight: '68', eyeColor: 'Brown', hairColor: 'Black', marks: 'None', kinName: 'Akua Mensah', kinRelation: 'Mother', kinContact: '+233 55 987 6543', arrestDate: '2024-01-08', arrestingOfficer: 'Officer Grace Tetteh', court: 'Circuit Court - Kumasi', judge: 'Justice Yaw Boakye', expectedRelease: '2027-01-08', bloodGroup: 'B+', genotype: 'AS', allergies: 'None', chronicIllness: 'None', medications: 'None', mentalHealth: 'Stable', assignedOfficer: 'Lt. Sarah Owusu', items: 'Phone, Cash', cash: 'GHS 120.00', valuables: 'None', instructions: '' },
    { id: 'INM-2024-0010', firstName: 'Abena', lastName: 'Dapaah', age: 35, gender: 'Female', nationality: 'Ghanaian', block: 'A', cell: 'A-302', security: 'medium', offense: 'Fraud', sentence: '7 years', status: 'active', admissionDate: '2024-01-13', photo: '', caseNumber: 'CASE-2024-0175', warrantNumber: 'WRT-2024-0035', dob: '1989-08-10', nationalId: 'GHA-639201845', phone: '+233 20 876 5432', address: '8 Cantonments Road, Accra', maritalStatus: 'Divorced', height: '165', weight: '60', eyeColor: 'Brown', hairColor: 'Black', marks: 'Tattoo on right wrist', kinName: 'Kwesi Dapaah', kinRelation: 'Brother', kinContact: '+233 20 111 2233', arrestDate: '2024-01-05', arrestingOfficer: 'Detective Kwame Asante', court: 'High Court - Accra', judge: 'Justice Abena Mensah', expectedRelease: '2031-01-05', bloodGroup: 'A+', genotype: 'AA', allergies: 'Sulphur', chronicIllness: 'None', medications: 'None', mentalHealth: 'Stable', assignedOfficer: 'Sgt. Kofi Amoah', items: 'Handbag, Jewelry', cash: 'GHS 800.00', valuables: 'Gold earrings, 2 rings', instructions: '' },
    { id: 'INM-2024-0009', firstName: 'Yaw', lastName: 'Boateng', age: 45, gender: 'Male', nationality: 'Ghanaian', block: 'C', cell: 'C-110', security: 'maximum', offense: 'Murder', sentence: 'Life', status: 'active', admissionDate: '2024-01-12', photo: '', caseNumber: 'CASE-2024-0170', warrantNumber: 'WRT-2024-0030', dob: '1979-11-05', nationalId: 'GHA-539201845', phone: '+233 24 333 4444', address: '10 Darkuman Street, Accra', maritalStatus: 'Married', height: '180', weight: '85', eyeColor: 'Dark Brown', hairColor: 'Bald', marks: 'Scar on face', kinName: 'Efua Boateng', kinRelation: 'Wife', kinContact: '+233 24 555 6666', arrestDate: '2024-01-02', arrestingOfficer: 'Detective Kwame Asante', court: 'High Court - Accra', judge: 'Justice Abena Mensah', expectedRelease: 'N/A', bloodGroup: 'O-', genotype: 'AS', allergies: 'None', chronicIllness: 'Hypertension', medications: 'Lisinopril', mentalHealth: 'Under Observation', assignedOfficer: 'Captain John Mensah', items: 'Belt, Shoes', cash: 'GHS 50.00', valuables: 'None', instructions: 'Suicide watch - check every 30 minutes' },
    { id: 'INM-2024-0008', firstName: 'Ama', lastName: 'Serwaa', age: 29, gender: 'Female', nationality: 'Ghanaian', block: 'A', cell: 'A-205', security: 'minimum', offense: 'Drug Possession', sentence: '2 years', status: 'released', admissionDate: '2023-06-15', photo: '', caseNumber: 'CASE-2023-0165', warrantNumber: 'WRT-2023-0025', dob: '1995-02-14', nationalId: 'GHA-439201845', phone: '+233 54 222 3333', address: '25 Osu RE, Accra', maritalStatus: 'Single', height: '163', weight: '55', eyeColor: 'Brown', hairColor: 'Brown', marks: 'None', kinName: 'Kojo Serwaa', kinRelation: 'Father', kinContact: '+233 54 444 5555', arrestDate: '2023-06-10', arrestingOfficer: 'Officer Grace Tetteh', court: 'District Court - Accra', judge: 'Magistrate Kwame Nkrumah', expectedRelease: '2025-06-10', bloodGroup: 'AB+', genotype: 'AA', allergies: 'None', chronicIllness: 'None', medications: 'None', mentalHealth: 'Stable', assignedOfficer: 'Lt. Sarah Owusu', items: 'Clothes, Phone', cash: 'GHS 200.00', valuables: 'None', instructions: '' },
];

// Track current prisoner in modal
let currentPrisonerId = null;

// ==================== RENDER TABLE ====================
function renderTable(data) {
    const tbody = document.getElementById('prisonersTable');
    if (!tbody) return;

    tbody.innerHTML = data.map(p => `
        <tr>
            <td><input type="checkbox" class="row-checkbox" data-id="${p.id}"></td>
            <td><strong>${p.id}</strong></td>
            <td>
                <div class="inmate-photo">
                    ${p.photo ? `<img src="${p.photo}" alt="${p.firstName}">` : '<i class="fas fa-user"></i>'}
                </div>
            </td>
            <td>${p.firstName} ${p.lastName}</td>
            <td>${p.age} / ${p.gender.charAt(0)}</td>
            <td>Block ${p.block}</td>
            <td>${p.offense}</td>
            <td>${p.sentence}</td>
            <td><span class="status-badge ${p.status}">${p.status}</span></td>
            <td>${p.admissionDate}</td>
            <td>
                <div class="actions-cell">
                    <button class="btn-icon-sm view" title="View Details" onclick="openPrisonerModal('${p.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon-sm edit" title="Edit Prisoner" onclick="editPrisoner('${p.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon-sm transfer" title="Transfer Prisoner" onclick="transferPrisoner('${p.id}')">
                        <i class="fas fa-exchange-alt"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    document.getElementById('resultsCount').textContent = `Showing ${data.length} prisoners`;
}

// ==================== FILTER FUNCTION ====================
function filterPrisoners() {
    const searchTerm = document.getElementById('searchPrisoner').value.toLowerCase();
    const filterBlock = document.getElementById('filterBlock').value;
    const filterStatus = document.getElementById('filterStatus').value;
    const filterSecurity = document.getElementById('filterSecurity').value;
    const filterGender = document.getElementById('filterGender').value;

    let filtered = prisoners;

    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.firstName.toLowerCase().includes(searchTerm) ||
            p.lastName.toLowerCase().includes(searchTerm) ||
            p.id.toLowerCase().includes(searchTerm) ||
            p.caseNumber.toLowerCase().includes(searchTerm)
        );
    }

    if (filterBlock) filtered = filtered.filter(p => p.block === filterBlock);
    if (filterStatus) filtered = filtered.filter(p => p.status === filterStatus);
    if (filterSecurity) filtered = filtered.filter(p => p.security === filterSecurity);
    if (filterGender) filtered = filtered.filter(p => p.gender.toLowerCase() === filterGender);

    renderTable(filtered);
}

// ==================== FILTER EVENT LISTENERS ====================
document.getElementById('searchPrisoner').addEventListener('input', filterPrisoners);
document.getElementById('filterBlock').addEventListener('change', filterPrisoners);
document.getElementById('filterStatus').addEventListener('change', filterPrisoners);
document.getElementById('filterSecurity').addEventListener('change', filterPrisoners);
document.getElementById('filterGender').addEventListener('change', filterPrisoners);

document.getElementById('clearFilters').addEventListener('click', () => {
    document.getElementById('searchPrisoner').value = '';
    document.getElementById('filterBlock').value = '';
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterSecurity').value = '';
    document.getElementById('filterGender').value = '';
    renderTable(prisoners);
});

// Select All Checkbox
document.getElementById('selectAll').addEventListener('change', function() {
    document.querySelectorAll('.row-checkbox').forEach(cb => {
        cb.checked = this.checked;
    });
});

// ==================== MODAL FUNCTIONS ====================

// Open modal with prisoner details
function openPrisonerModal(inmateId) {
    const prisoner = prisoners.find(p => p.id === inmateId);
    if (!prisoner) return;

    currentPrisonerId = inmateId;

    // Header
    document.getElementById('modalInmateId').textContent = prisoner.id;
    document.getElementById('modalName').textContent = `${prisoner.firstName} ${prisoner.lastName}`;
    document.getElementById('modalGender').textContent = prisoner.gender;
    document.getElementById('modalAge').textContent = prisoner.age;
    document.getElementById('modalNationality').textContent = prisoner.nationality;
    document.getElementById('modalStatus').textContent = prisoner.status;
    document.getElementById('modalStatus').className = `status-badge ${prisoner.status}`;

    // Personal Tab
    document.getElementById('detailName').textContent = `${prisoner.firstName} ${prisoner.lastName}`;
    document.getElementById('detailDob').textContent = prisoner.dob;
    document.getElementById('detailNationalId').textContent = prisoner.nationalId;
    document.getElementById('detailPhone').textContent = prisoner.phone;
    document.getElementById('detailAddress').textContent = prisoner.address;
    document.getElementById('detailMarital').textContent = prisoner.maritalStatus;
    document.getElementById('detailHeight').textContent = `${prisoner.height} cm`;
    document.getElementById('detailWeight').textContent = `${prisoner.weight} kg`;
    document.getElementById('detailEyes').textContent = prisoner.eyeColor;
    document.getElementById('detailHair').textContent = prisoner.hairColor;
    document.getElementById('detailMarks').textContent = prisoner.marks;
    document.getElementById('detailKin').textContent = `${prisoner.kinName} (${prisoner.kinRelation}) - ${prisoner.kinContact}`;

    // Case Tab
    document.getElementById('detailCase').textContent = prisoner.caseNumber;
    document.getElementById('detailWarrant').textContent = prisoner.warrantNumber;
    document.getElementById('detailOffense').textContent = prisoner.offense;
    document.getElementById('detailArrestDate').textContent = prisoner.arrestDate;
    document.getElementById('detailArrestingOfficer').textContent = prisoner.arrestingOfficer;
    document.getElementById('detailCourt').textContent = prisoner.court;
    document.getElementById('detailJudge').textContent = prisoner.judge;
    document.getElementById('detailSentence').textContent = prisoner.sentence;
    document.getElementById('detailRelease').textContent = prisoner.expectedRelease;

    // Medical Tab
    document.getElementById('detailBlood').textContent = prisoner.bloodGroup;
    document.getElementById('detailGenotype').textContent = prisoner.genotype;
    document.getElementById('detailAllergies').textContent = prisoner.allergies;
    document.getElementById('detailChronic').textContent = prisoner.chronicIllness;
    document.getElementById('detailMeds').textContent = prisoner.medications;
    document.getElementById('detailMental').textContent = prisoner.mentalHealth;

    // Assignment Tab
    document.getElementById('detailBlock').textContent = `Block ${prisoner.block}`;
    document.getElementById('detailCell').textContent = prisoner.cell;
    document.getElementById('detailSecurity').textContent = prisoner.security;
    document.getElementById('detailOfficer').textContent = prisoner.assignedOfficer;
    document.getElementById('detailAdmissionDate').textContent = prisoner.admissionDate;
    document.getElementById('detailInstructions').textContent = prisoner.instructions || 'None';

    // Property Tab
    document.getElementById('detailItems').textContent = prisoner.items;
    document.getElementById('detailCash').textContent = prisoner.cash;
    document.getElementById('detailValuables').textContent = prisoner.valuables;

    // Reset to first tab
    switchModalTab('modal-personal');

    // Show modal
    document.getElementById('prisonerModal').classList.add('active');
}

// Close modal
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('prisonerModal').classList.remove('active');
    currentPrisonerId = null;
});

// Close on overlay click
document.getElementById('prisonerModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
        currentPrisonerId = null;
    }
});

// Modal tab switching
function switchModalTab(tabId) {
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
    
    const tabBtn = document.querySelector(`.modal-tab[data-tab="${tabId}"]`);
    const tabContent = document.getElementById(tabId);
    
    if (tabBtn) tabBtn.classList.add('active');
    if (tabContent) tabContent.classList.add('active');
}

document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        switchModalTab(targetTab);
    });
});

// ==================== ACTION BUTTONS (FRONTEND WORKS NOW) ====================

// 1. EDIT PRISONER - Opens edit form / redirects to edit page
function editPrisoner(inmateId) {
    // FRONTEND: Shows notification + can redirect
    // BACKEND: Will redirect to edit form: GET /api/prisoners/:id (to get data), then PUT /api/prisoners/:id (to save)
    
    showNotification(`Opening edit form for ${inmateId}...`, 'info');
    
    // Option 1: Redirect to edit page (when backend is ready)
    // window.location.href = `../admissions/index.html?edit=${inmateId}`;
    
    // Option 2: Show alert for now
    setTimeout(() => {
        alert(`📝 Edit Prisoner: ${inmateId}\n\nThis will open an edit form pre-filled with prisoner data.\n\nBACKEND: GET /api/prisoners/${inmateId} → Fill form → PUT /api/prisoners/${inmateId}`);
    }, 300);
}

// 2. TRANSFER PRISONER - Opens transfer form
function transferPrisoner(inmateId) {
    // FRONTEND: Shows transfer confirmation dialog
    // BACKEND: POST /api/transfers with { inmate_id, from_block, to_block, reason }
    
    const prisoner = prisoners.find(p => p.id === inmateId);
    if (!prisoner) return;
    
    const newBlock = prompt(`🔄 Transfer Prisoner: ${prisoner.firstName} ${prisoner.lastName}\nCurrent Block: ${prisoner.block}\nCell: ${prisoner.cell}\n\nEnter new Cell Block (A, B, C, D):`);
    
    if (newBlock && ['A', 'B', 'C', 'D'].includes(newBlock.toUpperCase())) {
        const reason = prompt('Reason for transfer:');
        
        // FRONTEND: Update locally for demo
        prisoner.block = newBlock.toUpperCase();
        prisoner.cell = `${newBlock.toUpperCase()}-${Math.floor(Math.random() * 900) + 100}`;
        
        alert(`✅ Transfer Successful!\n\n${prisoner.firstName} ${prisoner.lastName} transferred to Block ${prisoner.block}, Cell ${prisoner.cell}\n\nBACKEND: POST /api/transfers\nBody: { inmate_id: "${inmateId}", from_block: "${prisoner.block}", to_block: "${newBlock}", reason: "${reason}" }`);
        
        renderTable(prisoners);
    } else if (newBlock) {
        alert('❌ Invalid block. Please enter A, B, C, or D.');
    }
}

// ==================== MODAL FOOTER BUTTONS (NOW WORKING) ====================

// Edit from modal
document.getElementById('btnEdit').addEventListener('click', function() {
    if (currentPrisonerId) {
        document.getElementById('prisonerModal').classList.remove('active');
        editPrisoner(currentPrisonerId);
    }
});

// Transfer from modal
document.getElementById('btnTransfer').addEventListener('click', function() {
    if (currentPrisonerId) {
        document.getElementById('prisonerModal').classList.remove('active');
        transferPrisoner(currentPrisonerId);
    }
});

// Discipline from modal
document.getElementById('btnDiscipline').addEventListener('click', function() {
    if (!currentPrisonerId) return;
    
    // FRONTEND: Shows discipline form
    // BACKEND: POST /api/discipline
    const prisoner = prisoners.find(p => p.id === currentPrisonerId);
    
    const incident = prompt(`⚠️ Add Disciplinary Record\n\nPrisoner: ${prisoner.firstName} ${prisoner.lastName} (${currentPrisonerId})\n\nDescribe the incident:`);
    
    if (incident) {
        const action = prompt('Disciplinary action taken:');
        
        alert(`✅ Disciplinary record added!\n\nPrisoner: ${currentPrisonerId}\nIncident: ${incident}\nAction: ${action || 'Pending'}\n\nBACKEND: POST /api/discipline\nBody: { inmate_id: "${currentPrisonerId}", incident: "${incident}", action: "${action}", officer_id: 1, date: "${new Date().toISOString().split('T')[0]}" }`);
        
        document.getElementById('prisonerModal').classList.remove('active');
    }
});

// Medical from modal
document.getElementById('btnMedical').addEventListener('click', function() {
    if (!currentPrisonerId) return;
    
    // FRONTEND: Shows medical update form
    // BACKEND: PUT /api/medical/:inmate_id
    const prisoner = prisoners.find(p => p.id === currentPrisonerId);
    
    const notes = prompt(`🏥 Update Medical Record\n\nPrisoner: ${prisoner.firstName} ${prisoner.lastName} (${currentPrisonerId})\nCurrent Status: ${prisoner.mentalHealth}\n\nEnter medical notes:`);
    
    if (notes) {
        alert(`✅ Medical record updated!\n\nPrisoner: ${currentPrisonerId}\nNotes: ${notes}\n\nBACKEND: PUT /api/medical/${currentPrisonerId}\nBody: { notes: "${notes}", checkup_date: "${new Date().toISOString().split('T')[0]}" }`);
        
        document.getElementById('prisonerModal').classList.remove('active');
    }
});

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// ==================== SIDEBAR NAVIGATION ====================
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') e.preventDefault();
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

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape') {
        document.getElementById('prisonerModal').classList.remove('active');
        currentPrisonerId = null;
    }
    
    // Ctrl+F to focus search
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        document.getElementById('searchPrisoner').focus();
    }
});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    renderTable(prisoners);
    console.log('✅ Prisoners Page Loaded');
    console.log('📊 Total prisoners:', prisoners.length);
    console.log('🟢 Active:', prisoners.filter(p => p.status === 'active').length);
    console.log('🔵 Released:', prisoners.filter(p => p.status === 'released').length);
    console.log('🟡 Transferred:', prisoners.filter(p => p.status === 'transferred').length);
});