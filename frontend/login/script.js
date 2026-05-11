 // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
      
      // Get form elements
      const loginForm = document.getElementById('loginForm');
      const usernameInput = document.getElementById('username');
      const passwordInput = document.getElementById('password');
      const rememberCheckbox = document.getElementById('remember');
      const loginBtn = document.getElementById('loginBtn');
      const messageDiv = document.getElementById('loginMessage');
      
      // Check if user was previously logged in (optional)
      if (localStorage.getItem('remembered_username')) {
        usernameInput.value = localStorage.getItem('remembered_username');
        rememberCheckbox.checked = true;
      }
      
      // Handle form submission
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;
        
        // Validate inputs
        if (!username || !password) {
          showMessage('Please enter both username and password', 'error');
          return;
        }
        
        // Show loading state
        showMessage('<i class="fas fa-spinner fa-spin"></i> Authenticating...', 'info');
        loginBtn.disabled = true;
        
        // Prepare form data
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
        if (remember) formData.append('remember', '1');
        
        try {
          // Send login request
          const response = await fetch('api/login_api.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
          });
          
          // Parse response
          const data = await response.json();
          console.log('Server response:', data); // Debug log
          
          // Handle response
          if (data.status === true) {
            // Login successful
            showMessage('<i class="fas fa-check-circle"></i> ' + data.message, 'success');
            
            // Save username if "Remember me" is checked
            if (remember) {
              localStorage.setItem('remembered_username', username);
            } else {
              localStorage.removeItem('remembered_username');
            }
            
            // Store user info if provided
            if (data.data) {
              if (data.data.name) localStorage.setItem('user_name', data.data.name);
              if (data.data.role) localStorage.setItem('user_role', data.data.role);
            }
            
            // Get redirect URL from response or use default
            let redirectUrl = '/PMS/pages/newboard.php';
            if (data.data && data.data.redirect) {
              redirectUrl = data.data.redirect;
            }
            
            console.log('Redirecting to:', redirectUrl); // Debug log
            
            // Small delay to show success message, then redirect
            setTimeout(() => {
              window.location.href = redirectUrl;
            }, 1000);
            
          } else {
            // Login failed
            showMessage('<i class="fas fa-exclamation-circle"></i> ' + (data.message || 'Invalid username or password'), 'error');
            loginBtn.disabled = false;
            passwordInput.value = ''; // Clear password field for security
            passwordInput.focus();
          }
          
        } catch (error) {
          console.error('Login error:', error);
          showMessage('<i class="fas fa-exclamation-triangle"></i> Connection error. Please check your network and try again.', 'error');
          loginBtn.disabled = false;
        }
      });
      
      // Helper function to show messages
      function showMessage(message, type) {
        messageDiv.innerHTML = message;
        messageDiv.className = `login-message ${type}`;
        
        // Auto-hide error messages after 5 seconds
        if (type === 'error') {
          setTimeout(() => {
            if (messageDiv.className === 'login-message error') {
              messageDiv.style.opacity = '0';
              setTimeout(() => {
                messageDiv.innerHTML = '';
                messageDiv.className = 'login-message';
                messageDiv.style.opacity = '1';
              }, 300);
            }
          }, 5000);
        }
      }
      
      // Add password visibility toggle (optional)
      const togglePassword = () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
      };
      
      // Add Enter key support
      passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          loginForm.dispatchEvent(new Event('submit'));
        }
      });
      
    });
  
  
  //Logo modal and fallback script -->
  
    (function() {
      const frame = document.getElementById('logoFrame');
      const existingLogo = document.getElementById('logoImg');
      
      // Load logo
      const crest = new Image();
      crest.src = 'assets/images/Ghana_Prisons_Service_GPS_logo-185x300.png';
      crest.onload = function() {
        if (frame) {
          frame.innerHTML = '';
          crest.style.width = '90%';
          crest.style.height = '90%';
          crest.style.objectFit = 'contain';
          crest.className = 'logo-img';
          crest.id = 'logoImg';
          crest.style.cursor = 'pointer';
          frame.appendChild(crest);
          attachLogoClick(crest);
        }
      };
      
      // Modal elements
      const modal = document.getElementById('logoModal');
      const modalImg = document.getElementById('modalImg');
      const modalClose = document.getElementById('modalClose');
      const modalBackdrop = document.getElementById('modalBackdrop');
      
      function openModal(src, alt) {
        if (modal && modalImg) {
          modalImg.src = src;
          modalImg.alt = alt || '';
          modal.classList.add('show');
          modal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      }
      
      function closeModal() {
        if (modal) {
          modal.classList.remove('show');
          modal.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
          if (modalImg) modalImg.src = '';
        }
      }
      
      function attachLogoClick(imgEl) {
        if (!imgEl) return;
        imgEl.style.cursor = 'pointer';
        imgEl.addEventListener('click', function() {
          openModal(imgEl.src, imgEl.alt);
        });
      }
      
      // Attach click to existing logo
      if (existingLogo) attachLogoClick(existingLogo);
      
      // Close handlers
      if (modalClose) modalClose.addEventListener('click', closeModal);
      if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
      });
      
    })();