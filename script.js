let currentStream = null;
let scanHistory = JSON.parse(localStorage.getItem('molluscaHistory')) || [];

// Navigation
function navigateTo(section) {
    document.querySelectorAll('section').forEach(s => {
        s.classList.add('hidden');
    });
    document.getElementById(section).classList.remove('hidden');
}

// Real Barcode Scanner
function startBarcodeScanner() {
    const video = document.getElementById('video');
    video.classList.remove('hidden');
    
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.getElementById('camera-view'),
            constraints: { facingMode: "environment" }
        },
        decoder: { readers: ["ean_reader", "code_128_reader"] }
    }, function(err) {
        if (err) {
            console.error(err);
            alert("Barcode scanner init failed. Using demo mode.");
            simulateScan();
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected(function(result) {
        Quagga.stop();
        const code = result.codeResult.code;
        alert(`Barcode detected: ${code}\n\n(Real lookup coming in v2)`);
        simulateScan(true);
    });
}

function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
        simulateScan(true);
    }
}

// Mock AI Scan + Save to History
function simulateScan(fromCamera = false) {
    const product = {
        name: "Chocolate Chip Cookies",
        brand: "Brand X Snacks",
        score: 38,
        calories: 310,
        sugar: "32g",
        additives: 9,
        date: new Date().toLocaleDateString()
    };
    
    scanHistory.unshift(product);
    if (scanHistory.length > 10) scanHistory.pop();
    localStorage.setItem('molluscaHistory', JSON.stringify(scanHistory));
    
    navigateTo('results');
    
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-brand').textContent = product.brand;
    document.getElementById('health-score').textContent = product.score + "/100";
    document.getElementById('calories').textContent = product.calories;
    document.getElementById('sugar').textContent = product.sugar;
    document.getElementById('additives').textContent = product.additives;
    document.getElementById('ai-insight').innerHTML = `
        High in refined sugars and seed oils.<br>
        <span class="text-orange-400">Potential blood sugar spike and inflammation risk.</span>
    `;
    
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
    
    updateHistoryUI();
}

// Populate recipes
function populateRecipes() {
    const recipes = [
        { title: "Coconut Chia Pudding", desc: "High protein • Anti-inflammatory", img: "https://picsum.photos/id/1080/800" },
        { title: "Mango Turmeric Smoothie", desc: "Gut healing • Vitamin boost", img: "https://picsum.photos/id/201/800" },
        { title: "Herb Roasted Chickpeas", desc: "Crunchy snack • Zero oil option", img: "https://picsum.photos/id/292/800" }
    ];
    
    let html = '';
    recipes.forEach(r => {
        html += `
            <div class="bg-[#1a2f23] rounded-3xl overflow-hidden card-hover">
                <div class="h-56 bg-cover" style="background-image: url('${r.img}')"></div>
                <div class="p-6">
                    <h4 class="font-semibold">${r.title}</h4>
                    <p class="text-sm text-[#4ade80] mt-2">${r.desc}</p>
                </div>
            </div>
        `;
    });
    document.getElementById('recipes-grid').innerHTML = html;
}

// History UI
function updateHistoryUI() {
    const container = document.getElementById('history-list');
    if (!container) return;
    
    let html = '';
    scanHistory.forEach((scan) => {
        html += `
            <div class="bg-[#1a2f23] p-6 rounded-3xl flex justify-between items-center">
                <div>
                    <div class="font-medium">${scan.name}</div>
                    <div class="text-xs text-gray-400">${scan.brand} • ${scan.date}</div>
                </div>
                <div class="text-right">
                    <div class="text-xl font-mono text-[#4ade80]">${scan.score}/100</div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html || '<p class="text-center text-gray-400 py-12">No scans yet. Start protecting your health!</p>';
}

function showRecipe() {
    alert(`🌿 Homemade Banana Oat Cookies (12 mins)\n\nIngredients:\n• 2 ripe bananas\n• 2 cups rolled oats\n• Handful of dark chocolate chips (optional)\n• Pinch of cinnamon\n\nInstructions:\n1. Mash bananas\n2. Mix with oats\n3. Bake at 180°C for 12 minutes\n\nEnjoy guilt-free!`);
}

function showProfile() {
    alert("Your health journey:\n\nScans this month: 14\nAverage health score: 67\nStreak: 9 days 🔥\n\nKeep protecting your temple!");
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    const icon = document.querySelector('button[onclick="toggleDarkMode()"] i');
    if (icon) {
        icon.classList.toggle('fa-moon', !isDark);
        icon.classList.toggle('fa-sun', isDark);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
    populateRecipes();
    updateHistoryUI();
    
    console.log('%cMollusca ready to scan the forest 🌿', 'color:#4ade80; font-size:13px');
});
