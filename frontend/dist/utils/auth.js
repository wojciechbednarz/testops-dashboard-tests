// Authentication state management

const AUTH_KEY = 'testops_auth_state';
const USER_KEY = 'testops_current_user';

export function setLoginState(username) {
    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(USER_KEY, username);
    updateUIForLoginState();
    dispatchAuthEvent('login', username);
}

export function clearLoginState() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    updateUIForLoginState();
    dispatchAuthEvent('logout');
}

export function isLoggedIn() {
    return localStorage.getItem(AUTH_KEY) === 'true';
}

export function getCurrentUser() {
    return localStorage.getItem(USER_KEY);
}

function dispatchAuthEvent(type, username = null) {
    const event = new CustomEvent('authStateChange', {
        detail: { type, username }
    });
    window.dispatchEvent(event);
}

export function updateUIForLoginState() {
    const isUserLoggedIn = isLoggedIn();
    const currentUser = getCurrentUser();
    
    // Update navigation menu
    const loginNavItem = document.querySelector('.nav-menu li:has(a[href="/login.html"])');
    
    if (loginNavItem) {
        if (isUserLoggedIn) {
            // Replace login link with user info and logout
            loginNavItem.innerHTML = `
                <div class="user-menu">
                    <div class="user-info">
                        <span class="user-icon">👤</span>
                        <span class="username">${currentUser}</span>
                    </div>
                    <button class="logout-btn" onclick="handleLogout()">🚪 Logout</button>
                </div>
            `;
        } else {
            // Show login link
            loginNavItem.innerHTML = '<a href="/login.html" class="nav-link">🔐 Login</a>';
        }
    }
    
    // Update header area if it exists
    const topHeader = document.querySelector('.top-header');
    if (topHeader && isUserLoggedIn) {
        let userStatus = topHeader.querySelector('.user-status');
        if (!userStatus) {
            userStatus = document.createElement('div');
            userStatus.className = 'user-status';
            topHeader.appendChild(userStatus);
        }
        userStatus.innerHTML = `
            <div class="logged-in-status">
                <span>Welcome, ${currentUser}</span>
                <button class="logout-btn-header" onclick="handleLogout()">Logout</button>
            </div>
        `;
    } else if (topHeader) {
        const userStatus = topHeader.querySelector('.user-status');
        if (userStatus) {
            userStatus.remove();
        }
    }
}

// Global logout handler
window.handleLogout = function() {
    if (confirm('Are you sure you want to logout?')) {
        clearLoginState();
        window.location.href = '/login.html';
    }
};

// Initialize auth state on page load
document.addEventListener('DOMContentLoaded', () => {
    updateUIForLoginState();
});

// Listen for auth state changes
window.addEventListener('authStateChange', (event) => {
    console.log('Auth state changed:', event.detail);
});
