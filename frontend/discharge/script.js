// ============================================
// GPS · PMS - DISCHARGE PAGE
// ============================================

// ==================== DISCHARGE DATA ====================
const dischargeRecords = [
    { id: 'DIS-2024-0012', prisoner: 'Ama Serwaa', inmateId: 'INM-2024-0008', type: 'release', reason: 'Sentence completed', date: '2024-01-15', authority: 'Warden James Appiah', destination: '25 Osu RE, Accra', status: 'completed', checklist: { medical: true, property: true, admin: true, court: true, security: true, records: true, fingerprint: true, gatepass: true } },
    { id: 'DIS-2024-0011', prisoner: 'Kwame Nkrumah', inmateId: 'INM-2023-0150', type: 'court_order', reason: 'Acquitted by High Court', date: '2024-01-16', authority: 'Deputy Warden Comfort Asare', destination: '10 Ring Road, Accra', status: 'pending', checklist: {} },
    { id: 'DIS-2024-0010', prisoner: 'Ibrahim Musah', inmateId: 'INM-2022-0098', type: 'release', reason: 'Sentence completed - 5 years', date: '2024-01-18', authority: 'Warden James Appiah', destination: 'Tamale, Northern Region', status: 'in_progress', checklist: { medical: true, property: true, admin: true, court: true } },
    { id: 'DIS-2024-0009', prisoner: 'Grace Asante', inmateId: 'INM-2023-0085', type: 'parole', reason: 'Parole approved', date: '2024-01-20', authority: 'Parole Board', destination: 'Kumasi Central', status: 'pending', checklist: {} },
    { id: 'DIS-2024-0008', prisoner: 'Peter Amoah', inmateId: 'INM-2021-0042', type: 'transfer_out', reason: 'Transfer to Nsawam Prison', date: '2024-01-12', authority: 'Warden James Appiah', destination: 'Nsawam Maximum Security', status: 'completed', checklist: { medical: true, property: true, admin: true, court: true, security: true, records: true } },
    { id: 'DIS-2024-0007', prisoner: 'Samuel Darko', inmateId: 'INM-2020-0030', type: 'death', reason: 'Natural causes', date: '2024-01-08', authority: 'Medical Officer', destination: 'Korle Bu Mortuary', status: 'completed', checklist: { medical: true, admin: true, records: true } },
];

// ==================== RENDER PENDING LIST ====================
function renderPendingList() {
    const pending = dischargeRecords.filter(d => d.status === 'pending' || d.status === 'in_progress');
    const list = document.getElementById('pendingList');
    document.getElementById('pendingCount').textContent = pending.length;
    
    if (pending.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-light);"><i class="fas fa-check-circle" style="font-size:48px;display:block;margin-bottom:15px;"></i><p>No pending discharges</p></div>';
        return;
    }
    
    list.innerHTML = pending.map(d => `
        <div class="pending-item">
            <div class="pending-header">
                <div>
                    <div class="pending-prisoner">${d.prisoner}</div>
                    <div class="pending-id">${d.inmateId}</div>
                </div>
                <span class="discharge-type-badge ${d.type}">${d.type.replace('_', ' ')}</span>
            </div>
            <div class="pending-details">
                <span><i class="fas fa-calendar"></i> ${d.date}</span>
                <span><i class="fas fa-info-circle"></i> ${d.reason}</span>
            </div>
            <div class="pending-actions">
                <button class="btn btn-sm btn-primary" onclick="processDischarge('${d.id}')">
                    <i class="fas fa-check-circle"></i> Process
                </button>
                <button class="btn btn-sm btn-outline" onclick="viewDischarge('${d.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
            </div>
        </div>
    `).join('');
}

// ==================== RENDER TABLE ====================
function renderTable(filteredData = null) {
    const data = filteredData || dischargeRecords;
    const tbody = document.getElementById('dischargeTable');
    
    tbody.innerHTML = data.map(d => `
        <tr>
            <td><strong>${d.id}</strong></td>
            <td>${d.prisoner}<br><small>${d.inmateId}</small></td>
            <td><span class="discharge-type-badge ${d.type}">${d.type.replace('_', ' ')}</span></td>
            <td>${d.reason}</td>
            <td>${d.date}</td>
            <td>${d.authority}</td>
            <td><span class="status-badge ${d.status.replace('_', ' ')}">${d.status.replace('_', ' ')}</span></td>
            <td>
                <div class="actions-cell">
                    <button class="btn-icon-xs view" title="View Details" onclick="viewDischarge('${d.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${d.status !== 'completed' ? `
                        <button class="btn-icon-xs process" title="Process" onclick="processDischarge('${d.id}')">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn-icon-xs cancel" title="Cancel" onclick="cancelDischarge('${d.id}')">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                </div>
            </td>
        </tr>
    `).join('');
}

// ==================== FILTERS ====================
document.getElementById('filterType').addEventListener('change', applyFilters);
document.getElementById('filterStatus').addEventListener('change', applyFilters);
document.getElementById('filterDate').addEventListener('change', applyFilters);

function applyFilters() {
    const type = document.getElementById('filterType').value;
    const status = document.getElementById('filterStatus').value;
    const date = document.getElementById('filterDate').value;
    
    let filtered = dischargeRecords;
    if (type) filtered = filtered.filter(d => d.type === type);
    if (status) filtered = filtered.filter(d => d.status === status);
    if (date) filtered = filtered.filter(d => d.date === date);
    
    renderTable(filtered);
}

// ==================== PROCESS DISCHARGE ====================
function processDischarge(dischargeId) {
    const record = dischargeRecords.find(d => d.id === dischargeId);
    if (!record) return;
    
    document.getElementById('disPrisoner').value = record.inmateId;
    document.getElementById('disCurrentStatus').value = record.status;
    document.getElementById('disType').value = record.type;
    document.getElementById('disReason').value = record.reason;
    document.getElementById('disDate').value = record.date;
    document.getElementById('disAuthority').value = '1';
    document.getElementById('disDestination').value = record.destination || '';
    
    // Reset checklist
    document.querySelectorAll('.disCheck').forEach(cb => cb.checked = false);
    if (record.checklist) {
        Object.keys(record.checklist).forEach(key => {
            const cb = document.querySelector(`.disCheck[data-check="${key}"]`);
            if (cb && record.checklist[key]) cb.checked = true;
        });
    }
    
    document.getElementById('dischargeModal').classList.add('active');
}

document.getElementById('newDischargeBtn').addEventListener('click', () => {
    document.getElementById('disPrisoner').value = '';
    document.getElementById('disCurrentStatus').value = '';
    document.getElementById('disType').value = '';
    document.getElementById('disReason').value = '';
    document.getElementById('disDate').value = new Date().toISOString().split('T')[0];
    document.querySelectorAll('.disCheck').forEach(cb => cb.checked = false);
    document.getElementById('dischargeModal').classList.add('active');
});

// Complete Discharge
document.getElementById('completeDischargeBtn').addEventListener('click', () => {
    const prisoner = document.getElementById('disPrisoner').value;
    const type = document.getElementById('disType').value;
    const date = document.getElementById('disDate').value;
    const reason = document.getElementById('disReason').value;
    const authority = document.getElementById('disAuthority').value;
    
    if (!prisoner || !type || !date || !reason || !authority) {
        alert('Please fill all required fields');
        return;
    }
    
    // Check checklist
    const allChecked = [...document.querySelectorAll('.disCheck')].every(cb => cb.checked);
    if (!allChecked) {
        alert('⚠️ Please complete all checklist items before discharge');
        return;
    }
    
    const prisonerName = document.getElementById('disPrisoner').selectedOptions[0]?.text.split(' (')[0] || 'Unknown';
    
    alert(`✅ Discharge Completed!\n\nPrisoner: ${prisonerName}\nType: ${type.replace('_', ' ')}\nDate: ${date}\n\nBACKEND: POST /api/discharge\nBody: { inmate_id: "${prisoner}", type: "${type}", date: "${date}", reason: "${reason}" }`);
    
    document.getElementById('dischargeModal').classList.remove('active');
    
    // Update local data
    const record = dischargeRecords.find(d => d.inmateId === prisoner);
    if (record) {
        record.status = 'completed';
        record.date = date;
    }
    
    renderPendingList();
    renderTable();
    updateStats();
});

// ==================== VIEW DISCHARGE ====================
function viewDischarge(dischargeId) {
    const record = dischargeRecords.find(d => d.id === dischargeId);
    if (!record) return;
    
    const content = document.getElementById('viewDischargeContent');
    content.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;">
            <div class="detail-item"><strong>Discharge ID:</strong> ${record.id}</div>
            <div class="detail-item"><strong>Status:</strong> <span class="status-badge ${record.status}">${record.status}</span></div>
            <div class="detail-item"><strong>Prisoner:</strong> ${record.prisoner}</div>
            <div class="detail-item"><strong>Inmate ID:</strong> ${record.inmateId}</div>
            <div class="detail-item"><strong>Type:</strong> ${record.type.replace('_', ' ')}</div>
            <div class="detail-item"><strong>Date:</strong> ${record.date}</div>
            <div class="detail-item"><strong>Reason:</strong> ${record.reason}</div>
            <div class="detail-item"><strong>Authority:</strong> ${record.authority}</div>
            <div class="detail-item"><strong>Destination:</strong> ${record.destination || 'N/A'}</div>
            <div class="detail-item" style="grid-column:1/-1;"><strong>Checklist:</strong><br>
                ${Object.keys(record.checklist).length > 0 
                    ? Object.keys(record.checklist).map(k => `<span style="color:${record.checklist[k] ? 'var(--green)' : 'var(--red)'};margin-right:10px;">${record.checklist[k] ? '✅' : '❌'} ${k}</span>`).join('')
                    : '<span style="color:var(--text-light);">Not started</span>'}
            </div>
        </div>
    `;
    
    document.getElementById('viewDischargeModal').classList.add('active');
}

function cancelDischarge(dischargeId) {
    if (!confirm('Cancel this discharge? This cannot be undone.')) return;
    
    const record = dischargeRecords.find(d => d.id === dischargeId);
    if (record) record.status = 'cancelled';
    
    alert(`❌ Discharge ${dischargeId} cancelled`);
    renderPendingList();
    renderTable();
    updateStats();
}

// ==================== UPDATE STATS ====================
function updateStats() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('statPending').textContent = dischargeRecords.filter(d => d.status === 'pending').length;
    document.getElementById('statToday').textContent = dischargeRecords.filter(d => d.date === today).length;
    document.getElementById('statMonth').textContent = dischargeRecords.filter(d => d.status === 'completed').length;
    document.getElementById('statTotal').textContent = dischargeRecords.length + 1880;
}

// ==================== MODAL CLOSE ====================
document.getElementById('closeDischargeModal').addEventListener('click', () => {
    document.getElementById('dischargeModal').classList.remove('active');
});
document.getElementById('cancelDischargeBtn').addEventListener('click', () => {
    document.getElementById('dischargeModal').classList.remove('active');
});
document.getElementById('saveDraftDischargeBtn').addEventListener('click', () => {
    alert('📝 Draft saved!\n\nBACKEND: POST /api/discharge (status: draft)');
    document.getElementById('dischargeModal').classList.remove('active');
});

document.getElementById('closeViewModal').addEventListener('click', () => {
    document.getElementById('viewDischargeModal').classList.remove('active');
});
document.getElementById('closeViewBtn').addEventListener('click', () => {
    document.getElementById('viewDischargeModal').classList.remove('active');
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('active');
    });
});

document.getElementById('printDischargeBtn').addEventListener('click', () => {
    alert('🖨️ Printing discharge document...\n\nBACKEND: GET /api/discharge/:id/print');
    window.print();
});

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
    renderPendingList();
    renderTable();
    updateStats();
    document.getElementById('disDate').value = new Date().toISOString().split('T')[0];
    console.log('✅ Discharge Page Loaded');
});