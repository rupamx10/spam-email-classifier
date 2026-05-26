// ========================
// DOM Elements
// ========================

const emailInput = document.getElementById('emailInput');
const predictBtn = document.getElementById('predictBtn');
const resetBtn = document.getElementById('resetBtn');
const resultSection = document.getElementById('resultSection');
const loadingSection = document.getElementById('loadingSection');
const resultContainer = document.getElementById('resultContainer');
const confidenceBar = document.getElementById('confidenceBar');
const confidenceText = document.getElementById('confidenceText');

// ========================
// Event Listeners
// ========================

if (predictBtn) {
    predictBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        
        if (!email) {
            showError('❌ Email text খালি! কিছু লিখুন।');
            return;
        }
        
        predictSpam(email);
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        resetForm();
    });
}

// Allow Enter key to submit
if (emailInput) {
    emailInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            predictBtn.click();
        }
    });
}

// ========================
// Main Functions
// ========================

async function predictSpam(emailText) {
    try {
        // Show loading state
        resultSection.classList.add('hidden');
        loadingSection.classList.remove('hidden');
        predictBtn.disabled = true;
        
        // API call
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailText
            })
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Show result
        displayResult(data);
        
    } catch (error) {
        console.error('Error:', error);
        showError(`❌ Error: ${error.message}`);
    } finally {
        loadingSection.classList.add('hidden');
        predictBtn.disabled = false;
    }
}

function displayResult(data) {
    if (!data.success) {
        showError(data.error || 'Unknown error occurred');
        return;
    }
    
    const { prediction, confidence, message, email_preview } = data;
    
    // Determine result styling
    const isSpam = prediction === 'SPAM';
    const resultClass = isSpam ? 'result-spam' : 'result-not-spam';
    const resultEmoji = isSpam ? '🔴' : '🟢';
    
    // Build result HTML
    const resultHTML = `
        <div class="${resultClass}">
            <div class="result-title">${resultEmoji} ${prediction}</div>
            <div class="result-message">${message}</div>
            <div class="result-email">📧 "${email_preview}"</div>
        </div>
    `;
    
    resultContainer.innerHTML = resultHTML;
    
    // Update confidence bar
    confidenceBar.style.width = confidence + '%';
    confidenceText.textContent = confidence;
    
    // Show result section
    resultSection.classList.remove('hidden');
}

function showError(message) {
    resultContainer.innerHTML = `
        <div class="result-container result-spam" style="border-left: 5px solid #ff6666;">
            <div class="result-title">⚠️ Error</div>
            <div class="result-message">${message}</div>
        </div>
    `;
    resultSection.classList.remove('hidden');
    loadingSection.classList.add('hidden');
}

function resetForm() {
    emailInput.value = '';
    resultSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    emailInput.focus();
}

function testExample(button) {
    const example = button.closest('.example');
    const exampleTextElement = example.querySelector('.example-text');
    emailInput.value = exampleTextElement.textContent;
    
    // Auto predict
    setTimeout(() => {
        predictBtn.click();
    }, 100);
}

// ========================
// Initialize on page load
// ========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Spam Email Classifier loaded');
    emailInput?.focus();
    
    // Check if API is available
    fetch('/api/health')
        .then(res => res.json())
        .then(data => {
            console.log('🟢 Backend API Status:', data.status);
        })
        .catch(err => {
            console.error('❌ Backend connection error:', err);
        });
});
