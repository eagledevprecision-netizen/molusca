llet currentStream = null;

// Navigation
function navigateTo(section) {
    document.querySelectorAll('section').forEach(s => {
        s.classList.add('hidden');
    });
    document.getElementById(section).classList.remove('hidden');
    
    if (section === 'scanner' && !currentStream) {
        // Ready for camera
    }
}

// Camera functions
async function startCamera() {
    const video = document.getElementById('video');
    video.classList.remove('hidden');
    
    try {
        currentStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "environment" } 
        });
        video.srcObject = currentStream;
        video.play();
        
        setTimeout(() => {
            simulateScan(true);
        }, 2200);
    } catch(e) {
        alert("Camera access needed for live scanning (demo works without).");
    }
}

function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            simulateScan(true);
        };
        reader.readAsDataURL(file);
    }
}

// Mock AI Scan
function simulateScan(fromCamera = false) {
    // Show results
    navigateTo('results');
    
    // Fill in mock data
    document.getElementById('product-name').textContent = "Chocolate Chip Cookies";
    document.getElementById('product-brand').textContent = "Brand X Snacks";
    document.getElementById('health-score').textContent = "38/100";
    document.getElementById('calories').textContent = "310";
    document.getElementById('sugar').textContent = "32g";
    document.getElementById('additives').textContent = "9";
    document.getElementById('ai-insight').innerHTML = `
        High in refined sugars and seed oils.<br>
        <span class="text-orange-400">Potential blood sugar spike and inflammation risk.</span>
    `;
    
    // Alternatives
    const altsHTML = `
        <div class="bg-[#0f3d1f] p-5 rounded-2xl">
            <div class="text-4xl mb-3">🥥</div>
            <div class="font-medium">Coconut Date Bites</div>
            <div class="text-xs text-[#4ade80]">No added sugar • 5 ingredients</div>
        </div>
        <div class="bg-[#0f3d1f] p-5 rounded-2xl">
            <div class="text-4xl mb-3">🍌</div>
            <div class="font-medium">Banana Oat Cookies</div>
            <div class="text-xs text-[#4ade80]">Whole grain • Gut friendly</div>
        </div>
    `;
    document.getElementById('alternatives').innerHTML = altsHTML;
}

// Recipe modal
function showRecipe() {
    alert(`🌿 Homemade Banana Oat Cookies (12 mins)\n\nIngredients:\n• 2 ripe bananas\n• 2 cups rolled oats\n• Handful of dark chocolate chips (optional)\n• Pinch of cinnamon\n\nInstructions:\n1. Mash bananas\n2. Mix with oats\n3. Bake at 180°C for 12 minutes\n\nEnjoy guilt-free!`);
}

// Profile placeholder
function showProfile() {
    alert("Your health journey:\n\nScans this month: 14\nAverage health score: 67\nStreak: 9 days 🔥\n\nKeep protecting your temple!");
}

function toggleDarkMode() {
    // Already dark by design, but can expand later
    alert("Theme is nature-first by default 🌲");
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.getElementById('scanner').classList.contains('hidden')) {
        navigateTo('scanner');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
    
    // Add more recipes dynamically if needed
    console.log('%cMollusca ready to scan the forest 🌿', 'color:#4ade80; font-size:13px');
});Enterlet currentStream = null;

// Navigation
function navigateTo(section) {
    document.querySelectorAll('section').forEach(s => {
        s.classList.add('hidden');
    });
    document.getElementById(section).classList.remove('hidden');
    
    if (section === 'scanner' && !currentStream) {
        // Ready for camera
    }
}

// Camera functions
async function startCamera() {
    const video = document.getElementById('video');
    video.classList.remove('hidden');
    
    try {
        currentStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "environment" } 
        });
        video.srcObject = currentStream;
        video.play();
        
        setTimeout(() => {
            simulateScan(true);
        }, 2200);
    } catch(e) {
        alert("Camera access needed for live scanning (demo works without).");
    }
}

function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            simulateScan(true);
        };
        reader.readAsDataURL(file);
    }
}

// Mock AI Scan
function simulateScan(fromCamera = false) {
    // Show results
    navigateTo('results');
    
    // Fill in mock data
    document.getElementById('product-name').textContent = "Chocolate Chip Cookies";
    document.getElementById('product-brand').textContent = "Brand X Snacks";
    document.getElementById('health-score').textContent = "38/100";
    document.getElementById('calories').textContent = "310";
    document.getElementById('sugar').textContent = "32g";
    document.getElementById('additives').textContent = "9";
    document.getElementById('ai-insight').innerHTML = `
        High in refined sugars and seed oils.<br>
        <span class="text-orange-400">Potential blood sugar spike and inflammation risk.</span>
    `;
    
    // Alternatives
    const altsHTML = `
        <div class="bg-[#0f3d1f] p-5 rounded-2xl">
            <div class="text-4xl mb-3">🥥</div>
            <div class="font-medium">Coconut Date Bites</div>
            <div class="text-xs text-[#4ade80]">No added sugar • 5 ingredients</div>
        </div>
        <div class="bg-[#0f3d1f] p-5 rounded-2xl">
            <div class="text-4xl mb-3">🍌</div>
            <div class="font-medium">Banana Oat Cookies</div>
            <div class="text-xs text-[#4ade80]">Whole grain • Gut friendly</div>
        </div>
    `;
    document.getElementById('alternatives').innerHTML = altsHTML;
}

// Recipe modal
function showRecipe() {
    alert(`🌿 Homemade Banana Oat Cookies (12 mins)\n\nIngredients:\n• 2 ripe bananas\n• 2 cups rolled oats\n• Handful of dark chocolate chips (optional)\n• Pinch of cinnamon\n\nInstructions:\n1. Mash bananas\n2. Mix with oats\n3. Bake at 180°C for 12 minutes\n\nEnjoy guilt-free!`);
}

// Profile placeholder
function showProfile() {
    alert("Your health journey:\n\nScans this month: 14\nAverage health score: 67\nStreak: 9 days 🔥\n\nKeep protecting your temple!");
}

function toggleDarkMode() {
    // Already dark by design, but can expand later
    alert("Theme is nature-first by default 🌲");
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.getElementById('scanner').classList.contains('hidden')) {
        navigateTo('scanner');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
    
    // Add more recipes dynamically if needed
    console.log('%cMollusca ready to scan the forest 🌿', 'color:#4ade80; font-size:13px');
});Enter);
