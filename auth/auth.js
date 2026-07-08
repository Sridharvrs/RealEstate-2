let currentUser = null;

// LOAD MODAL INTO ALL PAGES
fetch("auth/auth.html")
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);
    initAuth();
  });

function initAuth() {

  const modal = document.getElementById("authModal");

 

  // ================= OPEN MODAL =================
  window.openAuth = () => {
  console.log("clicked");
  document.getElementById("authModal").classList.remove("hidden");
};
  // ================= CLOSE MODAL =================
  document.getElementById("authClose").onclick = () => {
    modal.classList.add("hidden");
  };

  // ================= TAB SWITCH =================
  document.querySelectorAll(".tab").forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    };
  });

  // ================= PASSWORD VALIDATION =================
  function validatePassword(p) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(p);
}

  function bindHint(inputId, hintId) {
    const input = document.getElementById(inputId);
    const hint = document.getElementById(hintId);

    if (!input || !hint) return;

    input.addEventListener("input", () => {
      if (validatePassword(input.value)) {
        hint.textContent = "Strong password ✔";
        hint.style.color = "lightgreen";
      } else {
        hint.textContent = "Min 8 chars + number + symbol";
        hint.style.color = "#ff4d4d";
      }
    });
  }

  bindHint("loginPassword", "loginHint");
  bindHint("signupPassword", "signupHint");

  // ================= EYE TOGGLE =================
  document.querySelectorAll(".eye").forEach(eye => {
    eye.addEventListener("click", () => {
      const input = document.getElementById(eye.dataset.eye);
      if (!input) return;

      input.type = input.type === "password" ? "text" : "password";
    });
  });

  // ================= SIGNUP (OPTIONAL / FAKE) =================

document.querySelector("#signup .btn-auth").addEventListener("click", () => {

    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirm").value;
    const hint = document.getElementById("signupHint");

    if (!validatePassword(password)) {
        hint.style.color = "#ff4d4d";
        hint.textContent =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special symbol.";
        return;
    }

    if (password !== confirmPassword) {
        hint.style.color = "#ff4d4d";
        hint.textContent = "Passwords do not match.";
        return;
    }

    hint.style.color = "lightgreen";
    hint.textContent = "Signup not required. You can login directly.";

    document.querySelector('[data-tab="login"]').click();
});

  // ================= LOGIN (OPEN ACCESS SYSTEM) =================
  // ================= LOGIN (OPEN ACCESS SYSTEM) =================
document.getElementById("loginBtn").addEventListener("click", () => {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const role = document.getElementById("loginRole").value;
    const hint = document.getElementById("loginHint");

    // Check empty fields
    if (!email || !password) {
        hint.textContent = "Please enter email and password";
        hint.style.color = "#ff4d4d";
        return;
    }

    // Validate password strength
    if (!validatePassword(password)) {
        hint.textContent ="Password must be 8+ chars with uppercase, lowercase, number & symbol.";
        hint.style.color = "#ff4d4d";
        return;
    }

    // CREATE SESSION
    currentUser = {
        email,
        role,
        name: email.split("@")[0] || "User"
    };

    hint.style.color = "lightgreen";
    hint.textContent = "Login successful! Redirecting...";

    modal.classList.add("hidden");

    setTimeout(() => {
        window.location.href =
            role === "admin"
                ? "admin-dashboard.html"
                : "user-dashboard.html";
    }, 500);
});
}

