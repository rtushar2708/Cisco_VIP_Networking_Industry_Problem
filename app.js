// Network data
const networkData = {
  "network_summary": {
    "total_nodes": 3,
    "total_links": 1,
    "total_vlans": 2,
    "total_issues": 4,
    "topology_health": 75
  },
  "nodes": [
    {
      "id": "R1",
      "name": "R1",
      "type": "router",
      "hostname": "R1",
      "interfaces": [
        {"name": "GigabitEthernet0/0", "ip": "192.168.1.1", "subnet": "255.255.255.0", "mtu": 1500, "status": "up"},
        {"name": "GigabitEthernet0/1", "ip": "10.0.0.1", "subnet": "255.255.255.252", "mtu": 1500, "status": "up"}
      ],
      "vlans": [],
      "routing_protocol": "ospf",
      "gateway": "10.0.0.2"
    },
    {
      "id": "R2",
      "name": "R2",
      "type": "router",
      "hostname": "R2",
      "interfaces": [
        {"name": "GigabitEthernet0/0", "ip": "10.0.0.2", "subnet": "255.255.255.252", "mtu": 1500, "status": "up"},
        {"name": "GigabitEthernet0/1", "ip": "192.168.2.1", "subnet": "255.255.255.0", "mtu": 1400, "status": "up"}
      ],
      "vlans": [],
      "routing_protocol": "ospf",
      "gateway": ""
    },
    {
      "id": "SW1",
      "name": "SW1",
      "type": "switch",
      "hostname": "SW1",
      "interfaces": [
        {"name": "GigabitEthernet0/1", "ip": "", "subnet": "", "mtu": 1500, "status": "up", "vlan": 10},
        {"name": "GigabitEthernet0/2", "ip": "", "subnet": "", "mtu": 1500, "status": "up", "vlan": 20}
      ],
      "vlans": [
        {"id": 10, "name": "SERVERS", "description": "Server VLAN"},
        {"id": 20, "name": "WORKSTATIONS", "description": "Workstation VLAN"}
      ],
      "routing_protocol": "none",
      "gateway": ""
    }
  ],
  "links": [
    {
      "source": "R1",
      "target": "R2",
      "source_interface": "GigabitEthernet0/1",
      "target_interface": "GigabitEthernet0/0",
      "bandwidth": 1000,
      "mtu": 1500,
      "status": "up"
    }
  ],
  "validation_issues": [
    {
      "id": 1,
      "type": "missing_ip",
      "severity": "medium",
      "title": "Missing IP Configuration",
      "message": "Interface SW1(GigabitEthernet0/1) has no IP address configured",
      "recommendation": "Configure IP address or shutdown unused interfaces",
      "affected_devices": ["SW1"]
    },
    {
      "id": 2,
      "type": "missing_ip",
      "severity": "medium",
      "title": "Missing IP Configuration",
      "message": "Interface SW1(GigabitEthernet0/2) has no IP address configured",
      "recommendation": "Configure IP address or shutdown unused interfaces",
      "affected_devices": ["SW1"]
    },
    {
      "id": 3,
      "type": "isolated_nodes",
      "severity": "high",
      "title": "Isolated Network Nodes",
      "message": "Isolated nodes with no connections: SW1",
      "recommendation": "Verify physical connectivity and IP configuration",
      "affected_devices": ["SW1"]
    },
    {
      "id": 4,
      "type": "potential_loop",
      "severity": "medium",
      "title": "Potential Network Loop",
      "message": "Potential network loops detected: 1 cycles found",
      "recommendation": "Review spanning tree configuration and link redundancy",
      "affected_devices": ["R1", "R2"]
    }
  ],
  "simulation_stats": {
    "running": false,
    "duration": 8,
    "total_packets_sent": 303,
    "total_packets_received": 299,
    "total_packets_dropped": 0,
    "device_stats": {
      "R1": {"packets_sent": 149, "packets_received": 147, "arp_table_size": 1, "routing_table_size": 1},
      "R2": {"packets_sent": 150, "packets_received": 149, "arp_table_size": 1, "routing_table_size": 1},
      "SW1": {"packets_sent": 1, "packets_received": 0, "arp_table_size": 0, "routing_table_size": 0}
    }
  },
  "optimization_recommendations": [
    {
      "type": "routing_protocol",
      "title": "Routing Protocol Optimization",
      "description": "Consider protocol selection based on network size",
      "recommendation": "Current OSPF setup is appropriate for this small network",
      "priority": "low"
    },
    {
      "type": "mtu_optimization",
      "title": "MTU Configuration",
      "description": "Standardize MTU across all devices",
      "recommendation": "Set consistent MTU of 1500 across all interfaces",
      "priority": "medium"
    },
    {
      "type": "vlan_optimization",
      "title": "VLAN Configuration",
      "description": "Optimize VLAN assignments",
      "recommendation": "Consider implementing inter-VLAN routing for SW1",
      "priority": "high"
    }
  ]
};

// Application state
let simulationRunning = false;
let simulationInterval = null;
let currentDuration = 0;
let currentStats = { ...networkData.simulation_stats };

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Starting application initialization...');
  
  // Wait for DOM to be fully loaded
  setTimeout(() => {
    try {
      initializeTabs();
      initializeConfiguration();
      initializeValidation();
      initializeSimulation();
      initializeOptimization();
      initializeTopology();
      initializeModals();
      
      // Add additional styles
      addAdditionalStyles();
      
      console.log('Application initialization completed successfully');
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }, 100);
});

// Tab functionality - Fixed version
function initializeTabs() {
  console.log('Initializing tabs...');
  
  // Use event delegation for better reliability
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('tab-btn')) {
      e.preventDefault();
      e.stopPropagation();
      
      const targetTab = e.target.getAttribute('data-tab');
      console.log('Tab clicked:', targetTab);
      
      if (targetTab) {
        switchTab(targetTab);
      }
    }
  });
  
  console.log('Tab event listeners attached');
}

function switchTab(tabName) {
  console.log('Switching to tab:', tabName);
  
  // Update button states
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    }
  });
  
  // Update content visibility
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
  });
  
  const activeContent = document.getElementById(tabName);
  if (activeContent) {
    activeContent.classList.add('active');
    console.log('Tab switched successfully to:', tabName);
  } else {
    console.error('Tab content not found for:', tabName);
  }
}

// Configuration table
function initializeConfiguration() {
  console.log('Initializing configuration...');
  
  const tableBody = document.getElementById('configTableBody');
  if (!tableBody) {
    console.error('Configuration table body not found');
    return;
  }
  
  function renderConfigTable(filteredNodes = networkData.nodes) {
    tableBody.innerHTML = '';
    
    filteredNodes.forEach(node => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${node.name}</strong></td>
        <td><span class="device-tag">${node.type}</span></td>
        <td>${node.hostname}</td>
        <td>${node.interfaces.length} interfaces</td>
        <td>${node.vlans ? node.vlans.length : 0} VLANs</td>
        <td>
          <button class="btn btn--sm btn--outline view-details-btn" data-device="${node.id}">
            View Details
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });
    
    // Add event listeners for View Details buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const deviceId = this.getAttribute('data-device');
        showDeviceDetails(deviceId);
      });
    });
  }
  
  function filterDevices() {
    const searchInput = document.getElementById('configSearch');
    const deviceFilter = document.getElementById('deviceFilter');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const typeFilter = deviceFilter ? deviceFilter.value : '';
    
    const filtered = networkData.nodes.filter(node => {
      const matchesSearch = !searchTerm || 
        node.name.toLowerCase().includes(searchTerm) ||
        node.hostname.toLowerCase().includes(searchTerm);
      const matchesType = !typeFilter || node.type === typeFilter;
      
      return matchesSearch && matchesType;
    });
    
    renderConfigTable(filtered);
  }
  
  // Add event listeners
  const searchInput = document.getElementById('configSearch');
  const deviceFilter = document.getElementById('deviceFilter');
  
  if (searchInput) {
    searchInput.addEventListener('input', filterDevices);
  }
  if (deviceFilter) {
    deviceFilter.addEventListener('change', filterDevices);
  }
  
  renderConfigTable();
  console.log('Configuration initialized successfully');
}

// Validation issues
function initializeValidation() {
  console.log('Initializing validation...');
  
  const container = document.getElementById('issuesContainer');
  if (!container) {
    console.error('Issues container not found');
    return;
  }
  
  function renderIssues(filteredIssues = networkData.validation_issues) {
    container.innerHTML = '';
    
    filteredIssues.forEach(issue => {
      const issueCard = document.createElement('div');
      issueCard.className = `issue-card ${issue.severity}`;
      issueCard.innerHTML = `
        <div class="issue-header">
          <h4 class="issue-title">${issue.title}</h4>
          <span class="issue-severity ${issue.severity}">${issue.severity}</span>
        </div>
        <p class="issue-message">${issue.message}</p>
        <div class="issue-recommendation">
          <strong>Recommendation:</strong> ${issue.recommendation}
        </div>
        <div class="issue-devices">
          <strong>Affected devices:</strong>
          ${issue.affected_devices.map(device => 
            `<span class="device-tag">${device}</span>`
          ).join('')}
        </div>
      `;
      container.appendChild(issueCard);
    });
  }
  
  function filterIssues() {
    const severityFilter = document.getElementById('severityFilter');
    const typeFilter = document.getElementById('issueTypeFilter');
    
    const severityValue = severityFilter ? severityFilter.value : '';
    const typeValue = typeFilter ? typeFilter.value : '';
    
    const filtered = networkData.validation_issues.filter(issue => {
      const matchesSeverity = !severityValue || issue.severity === severityValue;
      const matchesType = !typeValue || issue.type === typeValue;
      
      return matchesSeverity && matchesType;
    });
    
    renderIssues(filtered);
  }
  
  // Add event listeners
  const severityFilter = document.getElementById('severityFilter');
  const typeFilter = document.getElementById('issueTypeFilter');
  
  if (severityFilter) {
    severityFilter.addEventListener('change', filterIssues);
  }
  if (typeFilter) {
    typeFilter.addEventListener('change', filterIssues);
  }
  
  renderIssues();
  console.log('Validation initialized successfully');
}

// Simulation functionality
function initializeSimulation() {
  console.log('Initializing simulation...');
  
  // Use event delegation for simulation buttons
  document.addEventListener('click', function(e) {
    if (e.target.id === 'startSimulation') {
      startSimulation();
    } else if (e.target.id === 'stopSimulation') {
      stopSimulation();
    } else if (e.target.id === 'injectFault') {
      injectFault();
    } else if (e.target.id === 'restoreFault') {
      restoreFault();
    }
  });
  
  function startSimulation() {
    simulationRunning = true;
    currentDuration = 0;
    
    const startBtn = document.getElementById('startSimulation');
    const stopBtn = document.getElementById('stopSimulation');
    const injectBtn = document.getElementById('injectFault');
    
    if (startBtn) startBtn.disabled = true;
    if (stopBtn) stopBtn.disabled = false;
    if (injectBtn) injectBtn.disabled = false;
    
    const statusIndicator = document.getElementById('simulationStatus');
    if (statusIndicator) {
      statusIndicator.innerHTML = '<span class="status-dot running"></span>Simulation: Running';
    }
    
    simulationInterval = setInterval(() => {
      currentDuration++;
      updateSimulationStats();
    }, 1000);
    
    showToast('Simulation started successfully');
  }
  
  function stopSimulation() {
    simulationRunning = false;
    
    const startBtn = document.getElementById('startSimulation');
    const stopBtn = document.getElementById('stopSimulation');
    const injectBtn = document.getElementById('injectFault');
    const restoreBtn = document.getElementById('restoreFault');
    
    if (startBtn) startBtn.disabled = false;
    if (stopBtn) stopBtn.disabled = true;
    if (injectBtn) injectBtn.disabled = true;
    if (restoreBtn) restoreBtn.disabled = true;
    
    const statusIndicator = document.getElementById('simulationStatus');
    if (statusIndicator) {
      statusIndicator.innerHTML = '<span class="status-dot"></span>Simulation: Stopped';
    }
    
    if (simulationInterval) {
      clearInterval(simulationInterval);
    }
    
    showToast('Simulation stopped');
  }
  
  function injectFault() {
    showLoading();
    
    setTimeout(() => {
      hideLoading();
      const injectBtn = document.getElementById('injectFault');
      const restoreBtn = document.getElementById('restoreFault');
      
      if (injectBtn) injectBtn.disabled = true;
      if (restoreBtn) restoreBtn.disabled = false;
      
      showToast('Network fault injected - link R1-R2 down');
    }, 1500);
  }
  
  function restoreFault() {
    showLoading();
    
    setTimeout(() => {
      hideLoading();
      const injectBtn = document.getElementById('injectFault');
      const restoreBtn = document.getElementById('restoreFault');
      
      if (injectBtn) injectBtn.disabled = false;
      if (restoreBtn) restoreBtn.disabled = true;
      
      showToast('Network link restored - R1-R2 connection up');
    }, 1000);
  }
  
  function updateSimulationStats() {
    const simDurationEl = document.getElementById('simDuration');
    const packetsSentEl = document.getElementById('packetsSent');
    const packetsReceivedEl = document.getElementById('packetsReceived');
    const packetLossEl = document.getElementById('packetLoss');
    
    if (simDurationEl) {
      simDurationEl.textContent = `${currentDuration}s`;
    }
    
    // Simulate increasing packet counts
    const packetsSent = currentStats.total_packets_sent + Math.floor(Math.random() * 10);
    const packetsReceived = packetsSent - Math.floor(Math.random() * 3);
    const packetLoss = packetsSent > 0 ? ((packetsSent - packetsReceived) / packetsSent * 100).toFixed(1) : '0.0';
    
    if (packetsSentEl) packetsSentEl.textContent = packetsSent;
    if (packetsReceivedEl) packetsReceivedEl.textContent = packetsReceived;
    if (packetLossEl) packetLossEl.textContent = `${packetLoss}%`;
    
    currentStats.total_packets_sent = packetsSent;
    currentStats.total_packets_received = packetsReceived;
  }
  
  // Initialize device stats
  renderDeviceStats();
  console.log('Simulation initialized successfully');
}

function renderDeviceStats() {
  const container = document.getElementById('deviceStatsGrid');
  if (!container) return;
  
  container.innerHTML = '';
  
  Object.entries(currentStats.device_stats).forEach(([deviceId, stats]) => {
    const deviceCard = document.createElement('div');
    deviceCard.className = 'device-stat-card';
    deviceCard.innerHTML = `
      <h4>${deviceId}</h4>
      <div class="device-metric">
        <span class="metric-label">Packets Sent:</span>
        <span class="metric-value">${stats.packets_sent}</span>
      </div>
      <div class="device-metric">
        <span class="metric-label">Packets Received:</span>
        <span class="metric-value">${stats.packets_received}</span>
      </div>
      <div class="device-metric">
        <span class="metric-label">ARP Table Size:</span>
        <span class="metric-value">${stats.arp_table_size}</span>
      </div>
      <div class="device-metric">
        <span class="metric-label">Routing Table Size:</span>
        <span class="metric-value">${stats.routing_table_size}</span>
      </div>
    `;
    container.appendChild(deviceCard);
  });
}

// Optimization recommendations
function initializeOptimization() {
  console.log('Initializing optimization...');
  
  const container = document.getElementById('recommendationsContainer');
  if (!container) {
    console.error('Recommendations container not found');
    return;
  }
  
  container.innerHTML = '';
  
  networkData.optimization_recommendations.forEach(rec => {
    const recCard = document.createElement('div');
    recCard.className = 'recommendation-card';
    recCard.innerHTML = `
      <div class="recommendation-header">
        <h4 class="recommendation-title">${rec.title}</h4>
        <span class="priority-badge ${rec.priority}">${rec.priority}</span>
      </div>
      <p class="recommendation-description">${rec.description}</p>
      <div class="recommendation-action">
        <strong>Action:</strong> ${rec.recommendation}
      </div>
    `;
    container.appendChild(recCard);
  });
  
  console.log('Optimization initialized successfully');
}

// Topology functionality
function initializeTopology() {
  console.log('Initializing topology...');
  
  // Use event delegation for topology buttons
  document.addEventListener('click', function(e) {
    if (e.target.id === 'resetView') {
      e.preventDefault();
      showToast('Topology view reset');
    } else if (e.target.id === 'exportTopology') {
      e.preventDefault();
      showLoading();
      setTimeout(() => {
        hideLoading();
        showToast('Topology diagram exported successfully');
      }, 2000);
    }
  });
  
  // Add interactive functionality to topology image
  const topologyImage = document.querySelector('.topology-image');
  if (topologyImage) {
    topologyImage.addEventListener('click', (e) => {
      const rect = topologyImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Simulate node detection based on click position
      let clickedNode = null;
      if (x > 100 && x < 200 && y > 150 && y < 250) {
        clickedNode = networkData.nodes.find(n => n.id === 'R1');
      } else if (x > 400 && x < 500 && y > 150 && y < 250) {
        clickedNode = networkData.nodes.find(n => n.id === 'R2');
      } else if (x > 250 && x < 350 && y > 300 && y < 400) {
        clickedNode = networkData.nodes.find(n => n.id === 'SW1');
      }
      
      if (clickedNode) {
        showNodeDetails(clickedNode);
      }
    });
  }
  
  console.log('Topology initialized successfully');
}

function showNodeDetails(node) {
  const nodeOverlay = document.getElementById('nodeOverlay');
  const nodeTitle = document.getElementById('nodeTitle');
  const nodeInfo = document.getElementById('nodeInfo');
  
  if (!nodeOverlay || !nodeTitle || !nodeInfo) return;
  
  nodeTitle.textContent = `${node.name} (${node.type})`;
  nodeInfo.innerHTML = `
    <p><strong>Hostname:</strong> ${node.hostname}</p>
    <p><strong>Type:</strong> ${node.type}</p>
    <p><strong>Routing Protocol:</strong> ${node.routing_protocol}</p>
    ${node.gateway ? `<p><strong>Gateway:</strong> ${node.gateway}</p>` : ''}
    <p><strong>Interfaces:</strong></p>
    <ul>
      ${node.interfaces.map(intf => 
        `<li>${intf.name} - ${intf.ip || 'No IP'} (${intf.status})</li>`
      ).join('')}
    </ul>
    ${node.vlans && node.vlans.length > 0 ? `
      <p><strong>VLANs:</strong></p>
      <ul>
        ${node.vlans.map(vlan => 
          `<li>VLAN ${vlan.id}: ${vlan.name} - ${vlan.description}</li>`
        ).join('')}
      </ul>
    ` : ''}
  `;
  
  nodeOverlay.style.display = 'block';
  
  // Hide after 5 seconds
  setTimeout(() => {
    nodeOverlay.style.display = 'none';
  }, 5000);
}

// Modal functionality
function initializeModals() {
  console.log('Initializing modals...');
  
  document.addEventListener('click', function(e) {
    if (e.target.id === 'closeModal') {
      hideModal();
    } else if (e.target.id === 'deviceModal') {
      hideModal();
    }
  });
  
  console.log('Modals initialized successfully');
}

function showDeviceDetails(deviceId) {
  const device = networkData.nodes.find(n => n.id === deviceId);
  if (!device) return;
  
  const modal = document.getElementById('deviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  if (!modal || !modalTitle || !modalBody) return;
  
  modalTitle.textContent = `${device.name} - Device Configuration`;
  
  modalBody.innerHTML = `
    <div class="device-details">
      <div class="detail-section">
        <h4>Basic Information</h4>
        <table class="detail-table">
          <tr><td><strong>Device ID:</strong></td><td>${device.id}</td></tr>
          <tr><td><strong>Hostname:</strong></td><td>${device.hostname}</td></tr>
          <tr><td><strong>Type:</strong></td><td>${device.type}</td></tr>
          <tr><td><strong>Routing Protocol:</strong></td><td>${device.routing_protocol}</td></tr>
          ${device.gateway ? `<tr><td><strong>Gateway:</strong></td><td>${device.gateway}</td></tr>` : ''}
        </table>
      </div>
      
      <div class="detail-section">
        <h4>Interface Configuration</h4>
        <table class="detail-table">
          <thead>
            <tr><th>Interface</th><th>IP Address</th><th>Subnet</th><th>MTU</th><th>Status</th><th>VLAN</th></tr>
          </thead>
          <tbody>
            ${device.interfaces.map(intf => `
              <tr>
                <td>${intf.name}</td>
                <td>${intf.ip || 'N/A'}</td>
                <td>${intf.subnet || 'N/A'}</td>
                <td>${intf.mtu}</td>
                <td><span class="status status--${intf.status === 'up' ? 'success' : 'error'}">${intf.status}</span></td>
                <td>${intf.vlan || 'N/A'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      ${device.vlans && device.vlans.length > 0 ? `
        <div class="detail-section">
          <h4>VLAN Configuration</h4>
          <table class="detail-table">
            <thead>
              <tr><th>VLAN ID</th><th>Name</th><th>Description</th></tr>
            </thead>
            <tbody>
              ${device.vlans.map(vlan => `
                <tr>
                  <td>${vlan.id}</td>
                  <td>${vlan.name}</td>
                  <td>${vlan.description}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}
      
      <div class="detail-section">
        <h4>Configuration Files</h4>
        <p>Download the complete device configuration:</p>
        <a href="https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/7c170ba018271e8eef713af34ad69fb9/b32b06c9-62d2-4224-8fec-362d1af66e90/${getConfigFileName(device.id)}" 
           target="_blank" class="btn btn--primary btn--sm">
          Download ${device.id}.cfg
        </a>
      </div>
    </div>
  `;
  
  modal.classList.remove('hidden');
}

function getConfigFileName(deviceId) {
  const fileMap = {
    'R1': '768153cc.cfg',
    'R2': '5fa9eba6.cfg',
    'SW1': '40f2daf0.cfg'
  };
  return fileMap[deviceId] || '8e9d8e94.txt';
}

function hideModal() {
  const modal = document.getElementById('deviceModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Utility functions
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  if (!toast || !toastMessage) return;
  
  toastMessage.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 300);
  }, 3000);
}

function showLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.remove('hidden');
  }
}

function hideLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
  }
}

// Add additional styles
function addAdditionalStyles() {
  const additionalStyles = `
    .detail-section {
      margin-bottom: 24px;
    }
    
    .detail-section h4 {
      margin-bottom: 12px;
      color: var(--color-primary);
      border-bottom: 1px solid var(--color-border);
      padding-bottom: 8px;
    }
    
    .detail-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--font-size-sm);
    }
    
    .detail-table th,
    .detail-table td {
      padding: 8px 12px;
      text-align: left;
      border-bottom: 1px solid var(--color-card-border-inner);
    }
    
    .detail-table th {
      background-color: var(--color-bg-1);
      font-weight: var(--font-weight-semibold);
    }
    
    .detail-table tr:nth-child(even) {
      background-color: var(--color-bg-1);
    }
    
    /* Ensure tab navigation works */
    .tab-btn {
      cursor: pointer;
      user-select: none;
    }
    
    .tab-btn:focus {
      outline: var(--focus-outline);
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = additionalStyles;
  document.head.appendChild(styleSheet);
}

console.log('App.js loaded successfully');