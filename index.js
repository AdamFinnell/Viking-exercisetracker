const API_BASE_URL = window.location.origin;


function showLoading(button) {
    const originalText = button.textContent;
    button.innerHTML = originalText + '<span class="loading"></span>';
    button.disabled = true;
    return originalText;
}

function hideLoading(button, originalText) {
    button.textContent = originalText;
    button.disabled = false;
}

// Helper function to display results
function displayResult(elementId, data, isError = false) {
    const element = document.getElementById(elementId);
    
    if (typeof data === 'object') {
        element.innerHTML = `
            <div class="result-section">
                <div class="result-title">${isError ? '❌ Error' : '✅ Success'}</div>
                <div class="result-content">${JSON.stringify(data, null, 2)}</div>
            </div>
        `;
    } else {
        const resultClass = isError ? 'error' : 'success';
        element.innerHTML = `<div class="${resultClass}">${data}</div>`;
    }
}

// API Functions that connect to your Express backend

// Create User API
async function createUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create user');
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

// Add Exercise API
async function addExercise(exerciseData) {
    try {
        const { userId, ...exercisePayload } = exerciseData;
        
        const response = await fetch(`${API_BASE_URL}/api/users/${userId}/exercises`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exercisePayload)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to add exercise');
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

// Get Exercise Log API
async function getExerciseLog(params) {
    try {
        const { userId, from, to, limit } = params;
        
        // Build query string
        const queryParams = new URLSearchParams();
        if (from) queryParams.set('from', from);
        if (to) queryParams.set('to', to);
        if (limit) queryParams.set('limit', limit);
        
        const queryString = queryParams.toString();
        const url = `${API_BASE_URL}/api/users/${userId}/logs${queryString ? '?' + queryString : ''}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to get exercise log');
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

// Get All Users API (bonus feature)
async function getAllUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users`);
        
        if (!response.ok) {
            throw new Error('Failed to get users');
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    
    // Create User Form
    document.getElementById('create-user-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = e.target.querySelector('button');
        const originalText = showLoading(button);
        
        try {
            const formData = new FormData(e.target);
            const userData = Object.fromEntries(formData);
            
            if (!userData.username || userData.username.trim() === '') {
                throw new Error('Viking name is required');
            }
            
            const result = await createUser(userData);
            displayResult('user-result', result);
            e.target.reset();
            
            // Show success message with Viking ID
            setTimeout(() => {
                displayResult('user-result', `⚔️ New Viking created successfully! Viking ID: ${result._id}`, false);
            }, 2000);
            
        } catch (error) {
            displayResult('user-result', { error: error.message }, true);
        } finally {
            hideLoading(button, originalText);
        }
    });

    // Add Exercise Form
    document.getElementById('add-exercise-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = e.target.querySelector('button');
        const originalText = showLoading(button);
        
        try {
            const formData = new FormData(e.target);
            const exerciseData = Object.fromEntries(formData);
            
            // Validation
            if (!exerciseData.userId || exerciseData.userId.trim() === '') {
                throw new Error('Viking ID is required');
            }
            if (!exerciseData.description || exerciseData.description.trim() === '') {
                throw new Error('Training description is required');
            }
            if (!exerciseData.duration || exerciseData.duration <= 0) {
                throw new Error('Duration must be a positive number');
            }
            
            const result = await addExercise(exerciseData);
            displayResult('exercise-result', result);
            e.target.reset();
            
        } catch (error) {
            displayResult('exercise-result', { error: error.message }, true);
        } finally {
            hideLoading(button, originalText);
        }
    });

    // Get Exercise Log Form
    document.getElementById('get-log-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = e.target.querySelector('button');
        const originalText = showLoading(button);
        
        try {
            const formData = new FormData(e.target);
            const params = Object.fromEntries(formData);
            
            if (!params.userId || params.userId.trim() === '') {
                throw new Error('Viking ID is required');
            }
            
            const result = await getExerciseLog(params);
            
            // Display the log in a user-friendly format
            const logElement = document.getElementById('log-result');
            logElement.innerHTML = `
                <div class="result-section">
                    <div class="result-title">📜 ${result.username}'s Training Chronicle</div>
                    <div style="margin-bottom: 15px;">
                        <strong>Total Sessions:</strong> ${result.count}
                        <strong style="margin-left: 20px;">Viking ID:</strong> ${result._id}
                    </div>
                    <div class="exercise-log">
                        ${result.log.map(exercise => `
                            <div class="exercise-item">
                                <div class="exercise-meta">
                                    <span class="exercise-duration">${exercise.duration} min</span>
                                    <span class="exercise-date">${exercise.date}</span>
                                </div>
                                <div><strong>${exercise.description}</strong></div>
                            </div>
                        `).join('')}
                        ${result.log.length === 0 ? '<div class="exercise-item">No training sessions found for this Viking.</div>' : ''}
                    </div>
                    <div style="margin-top: 15px;">
                        <strong>Raw JSON Response:</strong>
                        <div class="result-content">${JSON.stringify(result, null, 2)}</div>
                    </div>
                </div>
            `;
            
        } catch (error) {
            displayResult('log-result', { error: error.message }, true);
        } finally {
            hideLoading(button, originalText);
        }
    });

    // Add a "Load All Vikings" button functionality (bonus feature)
    addLoadAllUsersButton();
});

// Bonus: Add a button to load all users
function addLoadAllUsersButton() {
    const userSection = document.querySelector('#create-user-form').closest('.section');
    const loadUsersBtn = document.createElement('button');
    loadUsersBtn.textContent = 'Load All Vikings';
    loadUsersBtn.className = 'btn';
    loadUsersBtn.style.marginTop = '10px';
    loadUsersBtn.style.marginLeft = '10px';
    
    loadUsersBtn.addEventListener('click', async () => {
        const originalText = showLoading(loadUsersBtn);
        
        try {
            const users = await getAllUsers();
            
            const usersList = document.createElement('div');
            usersList.className = 'result-section';
            usersList.innerHTML = `
                <div class="result-title">🏰 All Vikings in Valhalla</div>
                <div class="exercise-log">
                    ${users.map(user => `
                        <div class="exercise-item">
                            <div class="exercise-meta">
                                <strong>${user.username}</strong>
                                <span class="exercise-date">ID: ${user._id}</span>
                            </div>
                            <div>
                                <button class="btn" style="padding: 5px 10px; font-size: 12px; margin-right: 5px;" 
                                        onclick="document.getElementById('userId').value = '${user._id}'">
                                    Use for Exercise
                                </button>
                                <button class="btn" style="padding: 5px 10px; font-size: 12px;" 
                                        onclick="document.getElementById('logUserId').value = '${user._id}'">
                                    Use for Log
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Remove previous users list if exists
            const existingList = userSection.querySelector('.all-users-list');
            if (existingList) {
                existingList.remove();
            }
            
            usersList.classList.add('all-users-list');
            userSection.appendChild(usersList);
            
        } catch (error) {
            displayResult('user-result', { error: error.message }, true);
        } finally {
            hideLoading(loadUsersBtn, originalText);
        }
    });
    
    userSection.appendChild(loadUsersBtn);
}

// Initialize app
console.log('🗡️ Viking Exercise Tracker initialized!');
console.log('⚔️ Ready to connect to your Express/MongoDB backend');
console.log('🛡️ API Base URL:', API_BASE_URL);