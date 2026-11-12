
function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  })[character]);
}

function encodeFolderTitle(title) {
  return encodeURIComponent(title).replace(/'/g, '%27');
}

function decodeFolderTitle(title) {
  return decodeURIComponent(title);
}

// Curated User Avatars matching the circular portrait aesthetic in the mockup
const AVATARS = {
  u1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  u2: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
  u3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  u4: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
  u5: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
};

// Application State
const state = {
  currentMenu: 'mydrive',
  layoutMode: 'list', // 'list' or 'grid'
  searchQuery: '',
  activeFolderId: 'f1', // Card 1 ('Design Files') is active blue by default, matching reference
  openedSubfolder: null, // null or folder title when drilled down
  selectedFileId: 'file-5', // 'Team JB Picture.jpg' is selected by default, matching reference
  contextMenuFileId: null,
  sortAsc: true,
  storageUsedGB: 60.70,
  photosUsedGB: 10.70,
  storageMaxTB: 1,

  // Quick Access Folders (Cards 1, 2, 3 in mockup)
  quickFolders: [
    {
      id: 'f1',
      title: 'Design Files',
      avatars: [AVATARS.u1, AVATARS.u2, AVATARS.u3, AVATARS.u4]
    },
    {
      id: 'f2',
      title: 'Google Photos',
      avatars: [AVATARS.u1, AVATARS.u2, AVATARS.u3]
    },
    {
      id: 'f3',
      title: 'Training Materials',
      avatars: [AVATARS.u1, AVATARS.u2, AVATARS.u3, AVATARS.u4]
    }
  ],

  // Quick Access Document Card (Card 4 in mockup)
  quickDoc: {
    id: 'qdoc-1',
    title: 'Project Summary For English Class',
    lastModified: 'Sep 9 ,2019 - 4:30 AM',
    avatar: AVATARS.u3,
    size: '12 MB',
    type: 'doc'
  },

  // All Files List (Exact 6 rows from mockup + metadata for other tabs)
  files: [
    {
      id: 'file-1',
      name: 'Weekly Report Docs',
      type: 'doc',
      owners: [AVATARS.u1, AVATARS.u4],
      modified: 'Sep 9 ,2019 - 4:30 AM',
      size: '20 MB',
      starred: true,
      trashed: false,
      sharedWithMe: true,
      sharedRole: 'Editor',
      folder: 'Design Files',
      recentsGroup: 'Today'
    },
    {
      id: 'file-2',
      name: 'Design Checklist.xlss',
      type: 'sheet',
      owners: [AVATARS.u4],
      modified: 'Sep 9 ,2019 - 4:30 AM',
      size: '20 MB',
      starred: false,
      trashed: false,
      sharedWithMe: true,
      sharedRole: 'Editor',
      folder: 'Design Files',
      recentsGroup: 'Today'
    },
    {
      id: 'file-3',
      name: 'Weekly reports.pdf',
      type: 'pdf',
      owners: [AVATARS.u4],
      modified: 'Sep 9 ,2019 - 4:30 AM',
      size: '20 MB',
      starred: true,
      trashed: false,
      sharedWithMe: false,
      sharedRole: 'Viewer',
      folder: 'Training Materials',
      recentsGroup: 'This Week'
    },
    {
      id: 'file-4',
      name: 'Wedding Planner List.Doc',
      type: 'doc',
      owners: [AVATARS.u4],
      modified: 'Sep 9 ,2019 - 4:30 AM',
      size: '20 MB',
      starred: false,
      trashed: false,
      sharedWithMe: true,
      sharedRole: 'Viewer',
      folder: 'Training Materials',
      recentsGroup: 'This Week'
    },
    {
      id: 'file-5',
      name: 'Team JB Picture.jpg',
      type: 'image',
      owners: [AVATARS.u4],
      modified: 'Sep 9 ,2019 - 4:30 AM',
      size: '20 MB',
      starred: false,
      trashed: false,
      sharedWithMe: true,
      sharedRole: 'Editor',
      folder: 'Google Photos',
      recentsGroup: 'September 2019',
      previewUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'file-6',
      name: 'Team Bert Picture.jpg',
      type: 'image',
      owners: [AVATARS.u4],
      modified: 'Sep 9 ,2019 - 4:30 AM',
      size: '20 MB',
      starred: false,
      trashed: false,
      sharedWithMe: false,
      sharedRole: 'Viewer',
      folder: 'Google Photos',
      recentsGroup: 'September 2019',
      previewUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80'
    },
    // Pre-populated Trash items so the Trash tab is rich right out of the box
    {
      id: 'file-trash-1',
      name: 'Old Wireframe Prototype v1.pdf',
      type: 'pdf',
      owners: [AVATARS.u2],
      modified: 'Aug 28 ,2019 - 2:15 PM',
      size: '45 MB',
      starred: false,
      trashed: true,
      sharedWithMe: false,
      folder: 'Design Files',
      recentsGroup: 'September 2019'
    },
    {
      id: 'file-trash-2',
      name: 'Q2 Budget Draft_Deprecated.xlss',
      type: 'sheet',
      owners: [AVATARS.u1],
      modified: 'Aug 19 ,2019 - 9:10 AM',
      size: '14 MB',
      starred: false,
      trashed: true,
      sharedWithMe: false,
      folder: 'Training Materials',
      recentsGroup: 'September 2019'
    },
    {
      id: 'file-trash-3',
      name: 'Event Banner Raw Shoot.jpg',
      type: 'image',
      owners: [AVATARS.u3],
      modified: 'Aug 04 ,2019 - 6:45 PM',
      size: '32 MB',
      starred: false,
      trashed: true,
      sharedWithMe: false,
      folder: 'Google Photos',
      recentsGroup: 'September 2019'
    }
  ],

  // Synced Computers Data for "Computers" Menu
  computers: [
    {
      id: 'comp-1',
      name: 'MacBook Pro 16 — Design Studio',
      os: 'macOS Sonoma',
      status: 'Synced just now',
      online: true,
      usedGB: '38.4 GB',
      folders: ['Desktop Workspace', 'Figma Exports', 'Client Assets 2019']
    },
    {
      id: 'comp-2',
      name: 'Windows Workstation — Office',
      os: 'Windows 11 Pro',
      status: 'Synced 14 mins ago',
      online: true,
      usedGB: '16.2 GB',
      folders: ['Accounting Sheets', 'Quarterly Reports', 'HR Policies']
    },
    {
      id: 'comp-3',
      name: 'Home Media Server NAS',
      os: 'Ubuntu Linux LTS',
      status: 'Offline • Last seen yesterday',
      online: false,
      usedGB: '6.1 GB',
      folders: ['Family Photo Archive', '4K Video Renders']
    }
  ],

  // Cloud Backups Data for "Backups" Menu
  backups: [
    {
      id: 'bk-1',
      device: 'Jessica’s iPhone 15 Pro',
      type: 'Mobile Full Snapshot',
      lastRun: 'Today, 04:30 AM',
      size: '8.4 GB',
      health: 100
    },
    {
      id: 'bk-2',
      device: 'WhatsApp Cloud Media Archive',
      type: 'Encrypted Chat & Video Backup',
      lastRun: 'Sep 9 ,2019 - 4:30 AM',
      size: '4.2 GB',
      health: 100
    },
    {
      id: 'bk-3',
      device: 'Adobe Creative Cloud Presets',
      type: 'Application Settings & Brushes',
      lastRun: 'Sep 7 ,2019 - 11:20 PM',
      size: '1.9 GB',
      health: 100
    }
  ]
};

// Helper: Get File Type Badge SVG matching exact colors in the reference screenshot
function getFileIconHTML(type) {
  if (type === 'doc') {
    // Blue Rounded Square Docs Icon
    return `
      <div class="w-6 h-6 rounded-[6px] bg-[#4285F4] text-white flex items-center justify-center shadow-xs shrink-0">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
          <path stroke-linecap="round" d="M6 7h12M6 12h12M6 17h8"/>
        </svg>
      </div>
    `;
  }
  if (type === 'sheet') {
    // Green Rounded Square Sheets Icon
    return `
      <div class="w-6 h-6 rounded-[6px] bg-[#16A34A] text-white flex items-center justify-center shadow-xs shrink-0">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" d="M4 9h16M4 15h16M10 4v16"/>
        </svg>
      </div>
    `;
  }
  if (type === 'pdf') {
    // Red Rounded Square PDF Icon
    return `
      <div class="w-6 h-6 rounded-[6px] bg-[#EA4335] text-white flex items-center justify-center shadow-xs shrink-0">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 16c2-4 3-8 5-8s1 5 5 5c-3 1-6 1-10 3z"/>
        </svg>
      </div>
    `;
  }
  // Orange Rounded Square Image Icon
  return `
    <div class="w-6 h-6 rounded-[6px] bg-[#F59E0B] text-white flex items-center justify-center shadow-xs shrink-0">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 15l-5-5L5 21"/>
      </svg>
    </div>
  `;
}

// Update Sidebar Badges (Trash & Starred counts)
function updateSidebarBadges() {
  const trashCount = state.files.filter(f => f.trashed).length;
  const starredCount = state.files.filter(f => f.starred && !f.trashed).length;
  document.getElementById('trashCountBadge').textContent = trashCount;
  document.getElementById('starredCountBadge').textContent = starredCount;
}

// Render Quick Access Folder Card HTML with the exact top-left tab curve
function renderQuickFolderCard(folder, index) {
  const isActive = state.activeFolderId === folder.id;
  const stateClass = isActive ? 'active' : 'inactive';
  const sharedLabelColor = isActive ? 'text-white/90' : 'text-slate-800';
  const folderTagColor = isActive ? 'text-blue-100' : 'text-slate-800';
  const folderTitleColor = isActive ? 'text-blue-100' : 'text-[#3B71E8]';
  const staggerClass = `animate-stagger-${index + 1}`;

  const avatarsHTML = folder.avatars.map(url => `
    <img src="${url}" alt="Avatar" class="w-9 h-9 rounded-full object-cover ring-2 ${isActive ? 'ring-white/90' : 'ring-white'} shadow-xs"/>
  `).join('');

  const encodedTitle = encodeFolderTitle(folder.title);
  const safeTitle = escapeHTML(folder.title);
  return `
    <div
      onclick="handleFolderClick('${folder.id}', decodeFolderTitle('${encodedTitle}'))"
      ondblclick="enterSubfolder(decodeFolderTitle('${encodedTitle}'))"
      class="folder-card-wrapper ${stateClass} ${staggerClass}"
      title="Click to select • Double-click to open '${safeTitle}'"
    >
      <!-- Top-Left Folder Tab -->
      <div class="folder-tab"></div>
      <!-- Seamless S-Curve SVG Joiner -->
      <svg class="folder-tab-curve" viewBox="0 0 28 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="curve-fill transition-colors duration-250" d="M0 0 C10 0, 14 19, 28 19 L0 19 Z"/>
      </svg>

      <!-- Main Folder Body -->
      <div class="folder-body h-[168px] flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <p class="text-[10px] font-bold uppercase tracking-wider ${sharedLabelColor}">SHARED WITH</p>
            <button
              onclick="event.stopPropagation(); enterSubfolder(decodeFolderTitle('${encodedTitle}'))"
              class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-slate-200/70 text-slate-600 hover:bg-slate-300/70'} transition-colors"
            >
              Open
            </button>
          </div>
          <div class="flex items-center gap-1.5">
            ${avatarsHTML}
          </div>
        </div>

        <div class="pt-2">
          <p class="text-[10px] font-bold uppercase tracking-wider ${folderTagColor} mb-0.5">FOLDER</p>
          <p class="text-xs font-medium ${folderTitleColor} truncate">${safeTitle}</p>
        </div>
      </div>
    </div>
  `;
}

// Render Card 4 in Quick Access (Document Card matching mockup)
function renderQuickDocCard() {
  const doc = state.quickDoc;
  return `
    <div
      onclick="previewQuickDoc()"
      class="pt-[18px] animate-stagger-4 cursor-pointer group"
    >
      <div class="h-[168px] rounded-[18px] bg-[#F3F5F9] group-hover:bg-[#EAEEF6] transition-all duration-250 p-5 flex flex-col justify-between relative group-hover:-translate-y-1">
        <!-- Top Row: Blue Doc Outline Icon + Top-Right Circular Avatar -->
        <div>
          <div class="flex items-start justify-between mb-2">
            <div class="w-6 h-6 rounded-md border-[1.8px] border-[#1E5CE6] text-[#1E5CE6] flex items-center justify-center mt-0.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" d="M6 8h12M6 12h12M6 16h7"/>
              </svg>
            </div>
            <img src="${doc.avatar}" alt="Owner" class="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-xs -mt-1"/>
          </div>
          <p class="text-xs font-medium text-[#3B71E8] leading-snug line-clamp-2 pr-2">${doc.title}</p>
        </div>

        <!-- Bottom Row: LAST MODIFIED -->
        <div>
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-800 mb-0.5">LAST MODIFIED</p>
          <p class="text-[11px] font-medium text-slate-700 font-body">${doc.lastModified}</p>
        </div>
      </div>
    </div>
  `;
}

// Render File Rows (Either Table List matching reference or Responsive Card Grid)
function renderFilesListSection(filesArray, sectionTitle = 'ALL FILES', emptyMessage = 'No matching files found.') {
  if (filesArray.length === 0) {
    return `
      <div class="mt-2">
        <h2 class="text-[15px] font-bold uppercase tracking-wide text-slate-800 mb-4">${escapeHTML(sectionTitle)}</h2>
        <div class="rounded-2xl border border-dashed border-slate-200 p-12 text-center">
          <p class="text-sm font-semibold text-slate-600 mb-1">${escapeHTML(emptyMessage)}</p>
          <p class="text-xs text-slate-400">Try clearing your search filter or uploading a new file.</p>
        </div>
      </div>
    `;
  }

  // If user toggled Grid Mode
  if (state.layoutMode === 'grid') {
    const cardsHTML = filesArray.map((file, idx) => {
      const isSelected = state.selectedFileId === file.id;
      return `
        <div
          onclick="selectFileRow('${file.id}')"
          ondblclick="openFilePreviewModal('${file.id}')"
          class="p-4 rounded-2xl border transition-all cursor-pointer ${isSelected ? 'bg-[#EBF1FC] border-[#1E5CE6]' : 'bg-white border-slate-200/80 hover:border-blue-300 hover:shadow-md'}"
        >
          <div class="flex items-center justify-between mb-3">
            ${getFileIconHTML(file.type)}
            <div class="flex items-center gap-1">
              <button onclick="event.stopPropagation(); toggleFileStar('${file.id}')" class="p-1 rounded-lg hover:bg-slate-200/60 ${file.starred ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'}">
                <svg class="w-4 h-4" fill="${file.starred ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
              </button>
              <button onclick="openRowContextMenu(event, '${file.id}')" class="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><circle cx="4" cy="10" r="1.6"/><circle cx="10" cy="10" r="1.6"/><circle cx="16" cy="10" r="1.6"/></svg>
              </button>
            </div>
          </div>
          <p class="font-semibold text-xs text-slate-800 truncate mb-1">${escapeHTML(file.name)}</p>
          <div class="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
            <span>${file.size}</span>
            <span>${file.modified.split('-')[0]}</span>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="mt-2 animate-stagger-3">
        <h2 class="text-[15px] font-bold uppercase tracking-wide text-slate-800 mb-4">${escapeHTML(sectionTitle)}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          ${cardsHTML}
        </div>
      </div>
    `;
  }

  // Default Table List View (Exact match to reference screenshot)
  const rowsHTML = filesArray.map((file, idx) => {
    const isSelected = state.selectedFileId === file.id;
    const ownersHTML = file.owners.map(avatar => `
      <img src="${avatar}" alt="Owner" class="w-5 h-5 rounded-full object-cover ring-2 ring-white"/>
    `).join('');

    return `
      <div
        onclick="selectFileRow('${file.id}')"
        ondblclick="openFilePreviewModal('${file.id}')"
        class="file-row ${isSelected ? 'selected' : ''} grid grid-cols-12 items-center py-3.5 px-3 cursor-pointer text-xs"
      >
        <!-- NAME Column -->
        <div class="col-span-6 sm:col-span-4 flex items-center gap-3.5 pr-2">
          ${getFileIconHTML(file.type)}
          <span class="font-medium text-slate-800 truncate">${escapeHTML(file.name)}</span>
          ${file.starred ? `
            <button onclick="event.stopPropagation(); toggleFileStar('${file.id}')" title="Starred" class="text-amber-400 hover:scale-110 transition-transform">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </button>
          ` : ''}
        </div>

        <!-- OWNERS Column -->
        <div class="hidden sm:flex sm:col-span-2 items-center justify-center -space-x-1">
          ${ownersHTML}
        </div>

        <!-- LAST MODIFIED Column -->
        <div class="hidden md:flex md:col-span-3 items-center justify-center text-[#94A0B2] font-body text-[12px]">
          ${file.modified}
        </div>

        <!-- FILE SIZE Column -->
        <div class="col-span-3 sm:col-span-2 flex items-center justify-center text-[#94A0B2] font-body text-[12px]">
          ${file.size}
        </div>

        <!-- ACTIONS (Link Icon + Three Dots) -->
        <div class="col-span-3 sm:col-span-1 flex items-center justify-end gap-4 pr-2">
          <button
            onclick="event.stopPropagation(); copyFileLinkById('${file.id}')"
            title="Copy Share Link"
            class="text-slate-400 hover:text-[#1E5CE6] transition-colors"
          >
            <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
            </svg>
          </button>
          <button
            onclick="openRowContextMenu(event, '${file.id}')"
            title="More Actions"
            class="text-slate-600 hover:text-[#1E5CE6] transition-colors p-1"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="4" cy="10" r="1.5"/>
              <circle cx="10" cy="10" r="1.5"/>
              <circle cx="16" cy="10" r="1.5"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="mt-2 animate-stagger-4">
      <h2 class="text-[15px] font-bold uppercase tracking-wide text-slate-800 mb-4">${escapeHTML(sectionTitle)}</h2>

      <!-- Table Column Headers -->
      <div class="grid grid-cols-12 items-center pb-2.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#94A0B2]">
        <div class="col-span-6 sm:col-span-4">NAME</div>
        <div class="hidden sm:block sm:col-span-2 text-center">OWNERS</div>
        <div class="hidden md:block md:col-span-3 text-center">LAST MODIFIED</div>
        <div class="col-span-3 sm:col-span-2 text-center">FILE SIZE</div>
        <div class="col-span-3 sm:col-span-1"></div>
      </div>

      <!-- Table Rows -->
      <div class="flex flex-col">
        ${rowsHTML}
      </div>
    </div>
  `;
}

// ==================== RENDER SPECIFIC MENU PAGES ====================

// 1. MY DRIVE VIEW (Default Reference View)
function renderMyDriveView(filteredFiles) {
  // If user double-clicked into a subfolder, filter by that folder
  let filesToShow = filteredFiles.filter(f => !f.trashed);
  if (state.openedSubfolder) {
    filesToShow = filesToShow.filter(f => f.folder === state.openedSubfolder);
  }

  const quickFoldersHTML = state.quickFolders.map((f, idx) => renderQuickFolderCard(f, idx)).join('');

  return `
    <!-- QUICK ACSSES Section (Spelling preserved from reference mockup) -->
    <section class="mb-8">
      <div class="flex items-center justify-between mb-3.5">
        <h2 class="text-[15px] font-bold uppercase tracking-wide text-slate-800">QUICK ACSSES</h2>
        <span class="text-[11px] text-slate-400 hidden sm:inline">Click folder to highlight • Click "Open" to filter</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        ${quickFoldersHTML}
        ${renderQuickDocCard()}
      </div>
    </section>

    <!-- ALL FILES Section -->
    <section>
      ${renderFilesListSection(filesToShow, state.openedSubfolder ? `FILES IN ${state.openedSubfolder.toUpperCase()}` : 'ALL FILES')}
    </section>
  `;
}

// 2. COMPUTERS VIEW
function renderComputersView() {
  const cards = state.computers.map((comp, i) => `
    <div class="rounded-2xl bg-[#F3F5F9] hover:bg-[#EAEEF6] transition-all p-5 flex flex-col justify-between animate-stagger-${i + 1}">
      <div>
        <div class="flex items-start justify-between mb-3">
          <div class="w-11 h-11 rounded-2xl bg-[#1E5CE6] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="12" rx="2"/><path stroke-linecap="round" d="M8 20h8M12 16v4"/>
            </svg>
          </div>
          <span class="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${comp.online ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}">
            <span class="w-1.5 h-1.5 rounded-full ${comp.online ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}"></span>
            ${comp.status}
          </span>
        </div>
        <h3 class="font-bold text-sm text-slate-800">${comp.name}</h3>
        <p class="text-xs text-slate-400 mb-4">${comp.os} • ${comp.usedGB} backed up</p>

        <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Synced Folders</p>
        <div class="space-y-1.5 mb-4">
          ${comp.folders.map(f => `
            <div onclick="showToast('Opened synced folder: ${f}')" class="flex items-center justify-between bg-white px-3 py-2 rounded-xl text-xs text-slate-700 hover:text-[#1E5CE6] cursor-pointer shadow-2xs">
              <span class="flex items-center gap-2 font-medium">
                <svg class="w-4 h-4 text-[#1E5CE6]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/></svg>
                ${f}
              </span>
              <span class="text-[10px] text-slate-400">Synced</span>
            </div>
          `).join('')}
        </div>
      </div>

      <button onclick="triggerComputerSync('${comp.id}')" class="w-full py-2.5 rounded-xl bg-white hover:bg-[#1E5CE6] text-[#1E5CE6] hover:text-white font-semibold text-xs border border-blue-200 transition-colors">
        Sync Device Now
      </button>
    </div>
  `).join('');

  return `
    <div class="mb-6 animate-stagger-1">
      <div class="rounded-2xl bg-gradient-to-r from-[#1E5CE6] to-[#3874F6] text-white p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg shadow-blue-600/20">
        <div>
          <h2 class="font-bold text-base">Goodle Drive for Desktop Sync</h2>
          <p class="text-xs text-blue-100 mt-0.5">Folders from your connected computers are automatically mirrored to the cloud in real time.</p>
        </div>
        <button onclick="addSimulatedComputer()" class="px-4 py-2.5 rounded-xl bg-white text-[#1E5CE6] font-bold text-xs shadow-sm hover:bg-blue-50 transition-colors">
          + Link New Computer
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      ${cards}
    </div>
  `;
}

// 3. SHARED WITH ME VIEW
function renderSharedWithMeView(filteredFiles) {
  const sharedFiles = filteredFiles.filter(f => f.sharedWithMe && !f.trashed);
  const quickFoldersHTML = state.quickFolders.map((f, idx) => renderQuickFolderCard(f, idx)).join('');

  return `
    <section class="mb-8">
      <h2 class="text-[15px] font-bold uppercase tracking-wide text-slate-800 mb-3.5">SHARED TEAM FOLDERS</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        ${quickFoldersHTML}
      </div>
    </section>
    <section>
      ${renderFilesListSection(sharedFiles, 'SHARED FILES WITH JESSICA', 'No shared files match your search.')}
    </section>
  `;
}

// 4. RECENTS VIEW
function renderRecentsView(filteredFiles) {
  const activeFiles = filteredFiles.filter(f => !f.trashed);
  const groups = ['Today', 'This Week', 'September 2019'];

  const timelineHTML = groups.map((groupName, gIdx) => {
    const groupFiles = activeFiles.filter(f => (f.recentsGroup || 'Today') === groupName);
    if (groupFiles.length === 0) return '';
    return `
      <div class="mb-7 animate-stagger-${gIdx + 1}">
        <div class="flex items-center gap-2.5 mb-2">
          <span class="w-2.5 h-2.5 rounded-full bg-[#1E5CE6]"></span>
          <h3 class="text-xs font-extrabold uppercase tracking-wider text-[#1E5CE6]">${groupName}</h3>
        </div>
        ${renderFilesListSection(groupFiles, `${groupName.toUpperCase()} ACTIVITY`)}
      </div>
    `;
  }).join('');

  return timelineHTML || `<p class="text-sm text-slate-500">No recent activity found.</p>`;
}

// 5. TRASH VIEW
function renderTrashView(filteredFiles) {
  const trashedFiles = filteredFiles.filter(f => f.trashed);

  const rows = trashedFiles.map(file => `
    <div class="file-row grid grid-cols-12 items-center py-3.5 px-3 text-xs">
      <div class="col-span-6 sm:col-span-5 flex items-center gap-3.5">
        ${getFileIconHTML(file.type)}
        <span class="font-medium text-slate-700 truncate line-through decoration-slate-300">${escapeHTML(file.name)}</span>
      </div>
      <div class="hidden sm:block sm:col-span-3 text-center text-slate-400 font-body">${file.modified}</div>
      <div class="col-span-2 text-center text-slate-400 font-body">${file.size}</div>
      <div class="col-span-4 sm:col-span-2 flex items-center justify-end gap-2">
        <button onclick="restoreFromTrash('${file.id}')" class="px-2.5 py-1 rounded-lg bg-blue-50 text-[#1E5CE6] hover:bg-[#1E5CE6] hover:text-white font-semibold text-[11px] transition-colors">
          Restore
        </button>
        <button onclick="deleteForever('${file.id}')" class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white font-semibold text-[11px] transition-colors">
          Delete
        </button>
      </div>
    </div>
  `).join('');

  return `
    <div class="mb-6 animate-stagger-1">
      <div class="rounded-2xl bg-amber-50 border border-amber-200/80 p-4 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </div>
          <div>
            <p class="text-xs font-bold text-slate-800">Items in Trash are automatically deleted after 30 days</p>
            <p class="text-[11px] text-slate-500">You can restore files back to My Drive at any time before then.</p>
          </div>
        </div>
        ${trashedFiles.length > 0 ? `
          <button onclick="emptyAllTrash()" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-xs transition-colors">
            Empty Trash Now
          </button>
        ` : ''}
      </div>
    </div>

    ${trashedFiles.length === 0 ? `
      <div class="rounded-2xl border border-dashed border-slate-200 p-14 text-center animate-stagger-2">
        <p class="text-sm font-bold text-slate-700 mb-1">Trash is completely clean!</p>
        <p class="text-xs text-slate-400">No deleted files remaining.</p>
      </div>
    ` : `
      <div class="animate-stagger-2">
        <h2 class="text-[15px] font-bold uppercase tracking-wide text-slate-800 mb-4">DELETED FILES (${trashedFiles.length})</h2>
        <div class="flex flex-col">${rows}</div>
      </div>
    `}
  `;
}

// 6. STARRED VIEW
function renderStarredView(filteredFiles) {
  const starredFiles = filteredFiles.filter(f => f.starred && !f.trashed);
  return `
    <div class="mb-5 animate-stagger-1">
      <p class="text-xs text-slate-500">Important files marked with a star appear here for instant access.</p>
    </div>
    ${renderFilesListSection(starredFiles, 'STARRED FILES', 'You have no starred files yet. Use the menu on any file to star it!')}
  `;
}

// 7. BACKUPS VIEW
function renderBackupsView() {
  const backupCards = state.backups.map((bk, idx) => `
    <div class="rounded-2xl bg-[#F3F5F9] p-5 flex items-center justify-between gap-4 animate-stagger-${idx + 1}">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-white text-[#1E5CE6] flex items-center justify-center shadow-xs shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v5h5m4-1v5l3 2"/>
          </svg>
        </div>
        <div>
          <h3 class="font-bold text-sm text-slate-800">${bk.device}</h3>
          <p class="text-xs text-slate-500">${bk.type}</p>
          <p class="text-[11px] text-[#1E5CE6] font-medium mt-1">Last backup: ${bk.lastRun} • ${bk.size}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="runManualBackup('${bk.id}')" class="px-3.5 py-2 rounded-xl bg-[#1E5CE6] hover:bg-[#1749B8] text-white font-semibold text-xs transition-colors">
          Backup Now
        </button>
      </div>
    </div>
  `).join('');

  return `
    <div class="space-y-4 mb-8">
      ${backupCards}
    </div>
  `;
}

// ==================== MASTER RENDER DISPATCHER ====================
function renderApp() {
  updateSidebarBadges();

  const container = document.getElementById('pageContentContainer');
  const query = state.searchQuery.trim().toLowerCase();

  // Filter files by search query
  let filteredFiles = state.files.filter(f => f.name.toLowerCase().includes(query));

  // Update Page Title
  const titles = {
    mydrive: 'My Drive',
    computers: 'Computers',
    shared: 'Shared With Me',
    recents: 'Recents',
    trash: 'Trash',
    starred: 'Starred',
    backups: 'Backups'
  };
  document.getElementById('pageTitle').textContent = titles[state.currentMenu] || 'My Drive';

  // Show/Hide Subfolder Breadcrumb
  const bc = document.getElementById('folderBreadcrumb');
  if (state.currentMenu === 'mydrive' && state.openedSubfolder) {
    bc.classList.remove('hidden');
    bc.classList.add('flex');
    document.getElementById('activeBreadcrumbName').textContent = state.openedSubfolder;
  } else {
    bc.classList.add('hidden');
    bc.classList.remove('flex');
  }

  // Render current view
  if (state.currentMenu === 'mydrive') {
    container.innerHTML = renderMyDriveView(filteredFiles);
  } else if (state.currentMenu === 'computers') {
    container.innerHTML = renderComputersView();
  } else if (state.currentMenu === 'shared') {
    container.innerHTML = renderSharedWithMeView(filteredFiles);
  } else if (state.currentMenu === 'recents') {
    container.innerHTML = renderRecentsView(filteredFiles);
  } else if (state.currentMenu === 'trash') {
    container.innerHTML = renderTrashView(filteredFiles);
  } else if (state.currentMenu === 'starred') {
    container.innerHTML = renderStarredView(filteredFiles);
  } else if (state.currentMenu === 'backups') {
    container.innerHTML = renderBackupsView();
  }

  updateInfoDrawerContent();
}

// ==================== INTERACTION HANDLERS ====================

function switchMenu(menuKey) {
  state.currentMenu = menuKey;
  state.openedSubfolder = null;

  // Update active state on sidebar buttons
  document.querySelectorAll('#sidebarNav .nav-item').forEach(btn => {
    if (btn.getAttribute('data-menu') === menuKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Close mobile sidebar if open
  const sb = document.getElementById('appSidebar');
  if (!sb.classList.contains('-translate-x-full') && window.innerWidth < 1024) {
    toggleMobileSidebar();
  }

  renderApp();
}

function handleFolderClick(folderId, folderTitle) {
  state.activeFolderId = folderId;
  renderApp();
  showToast(`Selected folder "${folderTitle}"`);
}

function enterSubfolder(folderTitle) {
  state.currentMenu = 'mydrive';
  state.openedSubfolder = folderTitle;
  renderApp();
  showToast(`Opened folder "${folderTitle}"`);
}

function exitSubfolder() {
  state.openedSubfolder = null;
  renderApp();
}

function selectFileRow(fileId) {
  state.selectedFileId = fileId;
  renderApp();
}

function toggleLayoutMode() {
  state.layoutMode = state.layoutMode === 'list' ? 'grid' : 'list';
  renderApp();
  showToast(`Switched to ${state.layoutMode === 'grid' ? 'Grid' : 'List'} layout`);
}

function handleSearch(val) {
  state.searchQuery = val;
  const clearBtn = document.getElementById('clearSearchBtn');
  if (val.trim().length > 0) {
    clearBtn.classList.remove('hidden');
  } else {
    clearBtn.classList.add('hidden');
  }
  renderApp();
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  input.value = '';
  handleSearch('');
}

function cycleSortOrder() {
  state.sortAsc = !state.sortAsc;
  state.files.sort((a, b) => {
    return state.sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });
  renderApp();
  showToast(`Sorted files ${state.sortAsc ? 'A → Z' : 'Z → A'}`);
}

// Info Drawer Logic
function toggleInfoDrawer() {
  const drawer = document.getElementById('infoDrawer');
  const isHidden = drawer.classList.contains('hidden');
  if (isHidden) {
    drawer.classList.remove('hidden');
    requestAnimationFrame(() => {
      drawer.classList.remove('translate-x-full');
    });
    updateInfoDrawerContent();
  } else {
    drawer.classList.add('translate-x-full');
    setTimeout(() => drawer.classList.add('hidden'), 280);
  }
}

function updateInfoDrawerContent() {
  const file = state.files.find(f => f.id === state.selectedFileId) || state.files[0];
  if (!file) return;

  document.getElementById('drawerFileName').textContent = file.name;
  document.getElementById('drawerFileSize').textContent = file.size;
  document.getElementById('drawerFileModified').textContent = file.modified;
  document.getElementById('drawerFileLocation').textContent = file.folder || 'My Drive';

  const typeLabels = {
    doc: 'Goodle Docs Document',
    sheet: 'Goodle Spreadsheet',
    pdf: 'Adobe PDF Document',
    image: 'JPEG High-Res Image'
  };
  document.getElementById('drawerFileType').textContent = typeLabels[file.type] || 'Cloud File';
  document.getElementById('drawerFileIcon').outerHTML = `<div id="drawerFileIcon">${getFileIconHTML(file.type)}</div>`;

  // Avatars
  document.getElementById('drawerAvatars').innerHTML = file.owners.map(u => `
    <img src="${u}" class="w-7 h-7 rounded-full object-cover ring-2 ring-white" alt="Owner"/>
  `).join('');

  // Preview image
  const imgEl = document.getElementById('drawerPreviewImg');
  if (file.previewUrl) {
    imgEl.src = file.previewUrl;
  } else {
    imgEl.src = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=80';
  }
}

// Context Menu
function openRowContextMenu(e, fileId) {
  e.stopPropagation();
  state.contextMenuFileId = fileId;
  state.selectedFileId = fileId;
  const menu = document.getElementById('rowContextMenu');
  menu.classList.remove('hidden');

  const x = Math.min(e.clientX, window.innerWidth - 205);
  const y = Math.min(e.clientY, window.innerHeight - 210);
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;
  renderApp();
}

function contextAction(action) {
  const fileId = state.contextMenuFileId;
  document.getElementById('rowContextMenu').classList.add('hidden');
  if (!fileId) return;

  const file = state.files.find(f => f.id === fileId);
  if (!file) return;

  if (action === 'preview') {
    openFilePreviewModal(fileId);
  } else if (action === 'star') {
    toggleFileStar(fileId);
  } else if (action === 'copy') {
    copyFileLinkById(fileId);
  } else if (action === 'rename') {
    const newName = file.name.includes('(Edited)') ? file.name.replace(' (Edited)', '') : `${file.name} (Edited)`;
    file.name = newName;
    renderApp();
    showToast(`Renamed to "${newName}"`);
  } else if (action === 'trash') {
    file.trashed = true;
    renderApp();
    showToast(`Moved "${file.name}" to Trash`);
  }
}

function toggleFileStar(fileId) {
  const file = state.files.find(f => f.id === fileId);
  if (!file) return;
  file.starred = !file.starred;
  renderApp();
  showToast(file.starred ? `Added "${file.name}" to Starred` : `Removed "${file.name}" from Starred`);
}

function restoreFromTrash(fileId) {
  const file = state.files.find(f => f.id === fileId);
  if (!file) return;
  file.trashed = false;
  renderApp();
  showToast(`Restored "${file.name}" to My Drive`);
}

function deleteForever(fileId) {
  const idx = state.files.findIndex(f => f.id === fileId);
  if (idx !== -1) {
    const removed = state.files.splice(idx, 1)[0];
    renderApp();
    showToast(`Permanently deleted "${removed.name}"`);
  }
}

function emptyAllTrash() {
  state.files = state.files.filter(f => !f.trashed);
  renderApp();
  showToast('Trash emptied permanently');
}

// Clipboard Copy
function copyFileLinkById(fileId) {
  const file = state.files.find(f => f.id === fileId);
  if (!file) return;
  const dummy = document.createElement('textarea');
  dummy.value = `https://goodledrive.app/s/${file.id}/${encodeURIComponent(file.name)}`;
  document.body.appendChild(dummy);
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  showToast(`Share link copied for "${file.name}"`);
}

function copySelectedFileLink() {
  copyFileLinkById(state.selectedFileId);
}

// Modals & Preview
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

function openFilePreviewModal(fileId = state.selectedFileId) {
  const file = state.files.find(f => f.id === fileId) || state.files[0];
  if (!file) return;

  document.getElementById('previewModalIcon').innerHTML = getFileIconHTML(file.type);
  document.getElementById('previewModalTitle').textContent = file.name;
  document.getElementById('previewModalMeta').textContent = `${file.modified} • ${file.size}`;

  const body = document.getElementById('previewModalBody');
  if (file.type === 'image') {
    body.innerHTML = `<img src="${file.previewUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80'}" class="w-full h-56 object-cover rounded-xl shadow-xs" alt="${escapeHTML(file.name)}"/>`;
  } else {
    body.innerHTML = `
      <div class="max-w-xs">
        <div class="mx-auto mb-3 flex justify-center">${getFileIconHTML(file.type)}</div>
        <p class="text-xs font-bold text-slate-700 mb-1">${escapeHTML(file.name)}</p>
        <p class="text-[11px] text-slate-400">Cloud document synced and ready for collaborative editing in Goodle Drive.</p>
      </div>
    `;
  }

  openModal('previewModal');
}

function previewQuickDoc() {
  document.getElementById('previewModalIcon').innerHTML = getFileIconHTML('doc');
  document.getElementById('previewModalTitle').textContent = state.quickDoc.title;
  document.getElementById('previewModalMeta').textContent = `${state.quickDoc.lastModified} • ${state.quickDoc.size}`;
  document.getElementById('previewModalBody').innerHTML = `
    <div class="text-left w-full space-y-2 text-xs text-slate-600 bg-white p-4 rounded-xl border border-slate-100">
      <p class="font-bold text-slate-800">Executive Summary — English Literature Seminar</p>
      <p>Prepared by Jessica & Study Group. Includes full chapter annotations, bibliography references, and presentation slides for Monday's class.</p>
    </div>
  `;
  openModal('previewModal');
}

// Upload Simulation
function handleRealFileSelect(fileList) {
  if (!fileList || fileList.length === 0) return;
  const first = fileList[0];
  document.getElementById('customUploadName').value = first.name;
  const ext = first.name.split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
    document.getElementById('customUploadType').value = 'image';
  } else if (['xls', 'xlsx', 'csv'].includes(ext)) {
    document.getElementById('customUploadType').value = 'sheet';
  } else if (ext === 'pdf') {
    document.getElementById('customUploadType').value = 'pdf';
  } else {
    document.getElementById('customUploadType').value = 'doc';
  }
}

function startSimulatedUpload() {
  const nameInput = document.getElementById('customUploadName');
  const typeSelect = document.getElementById('customUploadType');
  const sizeInput = document.getElementById('customUploadSize');

  const fileName = nameInput.value.trim() || 'New Cloud Document.doc';
  const fileType = typeSelect.value;
  const fileSizeMB = parseInt(sizeInput.value, 10) || 20;

  const progressBox = document.getElementById('uploadProgressBox');
  const progressBar = document.getElementById('uploadProgressBar');
  const percentLabel = document.getElementById('uploadPercentLabel');

  progressBox.classList.remove('hidden');
  let progress = 0;

  const interval = setInterval(() => {
    progress += 20;
    progressBar.style.width = `${progress}%`;
    percentLabel.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      const newId = 'file-' + Date.now();
      state.files.unshift({
        id: newId,
        name: fileName,
        type: fileType,
        owners: [AVATARS.u1],
        modified: 'Just now',
        size: `${fileSizeMB} MB`,
        starred: false,
        trashed: false,
        sharedWithMe: false,
        folder: state.openedSubfolder || 'Design Files',
        recentsGroup: 'Today'
      });

      // Update Storage Bar
      state.storageUsedGB = +(state.storageUsedGB + fileSizeMB / 100).toFixed(2);
      if (fileType === 'image') {
        state.photosUsedGB = +(state.photosUsedGB + fileSizeMB / 100).toFixed(2);
      }
      refreshStorageBars();

      state.selectedFileId = newId;
      setTimeout(() => {
        progressBox.classList.add('hidden');
        progressBar.style.width = '0%';
        nameInput.value = '';
        closeModal('uploadModal');
        renderApp();
        showToast(`Uploaded "${fileName}" to Goodle Drive`);
      }, 250);
    }
  }, 90);
}

function createNewFolder() {
  const input = document.getElementById('newFolderInput');
  const title = input.value.trim() || 'New Shared Folder';
  const newId = 'f-' + Date.now();
  state.quickFolders.push({
    id: newId,
    title,
    avatars: [AVATARS.u1, AVATARS.u3, AVATARS.u4]
  });
  state.activeFolderId = newId;
  input.value = '';
  closeModal('newFolderModal');
  switchMenu('mydrive');
  showToast(`Created Quick Access folder "${title}"`);
}

function selectStoragePlan(tbValue, label) {
  state.storageMaxTB = tbValue;
  refreshStorageBars();
  closeModal('upgradeModal');
  showToast(`Storage plan upgraded to ${label}!`);
}

function refreshStorageBars() {
  document.getElementById('storageTextLabel').textContent = `${state.storageUsedGB.toFixed(2)} GB of ${state.storageMaxTB} TB used`;
  document.getElementById('photosTextLabel').textContent = `${state.photosUsedGB.toFixed(2)} GB of ${state.storageMaxTB} TB used`;
  const pct = Math.min(95, Math.max(12, (state.storageUsedGB / (state.storageMaxTB * 100)) * 100));
  document.getElementById('storageBarFill').style.width = `${pct}%`;
}

// Computers & Backups Actions
function triggerComputerSync(compId) {
  const comp = state.computers.find(c => c.id === compId);
  if (!comp) return;
  comp.online = true;
  comp.status = 'Synced just now';
  renderApp();
  showToast(`Synced all folders on "${comp.name}"`);
}

function addSimulatedComputer() {
  state.computers.push({
    id: 'comp-' + Date.now(),
    name: 'iPad Pro M4 — Studio Tablet',
    os: 'iPadOS 18',
    status: 'Synced just now',
    online: true,
    usedGB: '4.8 GB',
    folders: ['Procreate Sketches', 'PDF Markups']
  });
  renderApp();
  showToast('Linked "iPad Pro M4" to Computers');
}

function runManualBackup(bkId) {
  const bk = state.backups.find(b => b.id === bkId);
  if (!bk) return;
  bk.lastRun = 'Just now';
  renderApp();
  showToast(`Completed cloud backup for "${bk.device}"`);
}

// Dropdowns & Mobile Sidebar
function toggleDropdown(id) {
  const el = document.getElementById(id);
  el.classList.toggle('hidden');
}

function markNotificationsRead() {
  document.getElementById('notifBadge').classList.add('hidden');
  document.getElementById('notifDropdown').classList.add('hidden');
  showToast('All notifications marked as read');
}

function toggleMobileSidebar() {
  const sb = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  sb.classList.toggle('-translate-x-full');
  backdrop.classList.toggle('hidden');
}

// Toast Notification Helper
let toastTimer = null;
function showToast(message) {
  const box = document.getElementById('toastBox');
  document.getElementById('toastMessage').textContent = message;
  box.classList.remove('translate-y-16', 'opacity-0');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    box.classList.add('translate-y-16', 'opacity-0');
  }, 2800);
}

// Global Click Listener to close context menus & dropdowns
window.addEventListener('click', (e) => {
  document.getElementById('rowContextMenu').classList.add('hidden');
  const notifDropdown = document.getElementById('notifDropdown');
  if (!e.target.closest('#notifDropdown') && !e.target.closest('[title="Notifications"]')) {
    notifDropdown.classList.add('hidden');
  }
});

// Initialize Application on Load
function enhanceAccessibility() {
  document.querySelectorAll('button').forEach(button => {
    if (button.textContent.trim() || button.hasAttribute('aria-label')) return;
    const action = button.getAttribute('onclick') || '';
    const label = button.title || (action.includes('closeModal') ? 'Close dialog' :
      action.includes('toggleInfoDrawer') ? 'Close file details' :
      action.includes('toggleFileStar') ? 'Toggle starred file' :
      action.includes('openRowContextMenu') ? 'More file actions' : 'File action');
    button.setAttribute('aria-label', label);
  });
  document.querySelectorAll('input[id], select[id]').forEach(input => {
    if (input.hasAttribute('aria-label') || input.closest('label')) return;
    const label = input.previousElementSibling;
    if (label?.tagName === 'LABEL') label.setAttribute('for', input.id);
    else input.setAttribute('aria-label', input.placeholder || 'Folder name');
  });
  document.querySelectorAll('[onclick]:not(button):not(input):not(label)').forEach(element => {
    if (element.id === 'sidebarBackdrop') return;
    element.tabIndex = 0;
    element.setAttribute('role', 'button');
  });
}

document.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[role="button"][onclick]')) {
    event.preventDefault();
    event.target.click();
  }
  if (event.key === 'Escape') {
    document.querySelectorAll('[id$="Modal"]').forEach(modal => closeModal(modal.id));
  }
});

new MutationObserver(enhanceAccessibility).observe(document.getElementById('pageContentContainer'), { childList: true });
window.onload = function () {
  renderApp();
  enhanceAccessibility();
};
