
<template>
    <div id="app">
  
      <!-- Navbar -->
      <nav class="navbar">
  
        <div class="logo">
          EventHub
        </div>
  
        <div class="nav-links">
  
          <router-link to="/">
            Home
          </router-link>
  
          <router-link to="/events">
            Events
          </router-link>
  
          <!-- Login belongs to the Authentication teammate -->
          <router-link to="/login" class="login-btn">
            Login
          </router-link>
  
        </div>
  
      </nav>
  
  
      <!-- Page Content -->
      <main>
        <router-view />
      </main>
  
    </div>
  </template>
  
  
  <script setup>
  // No logic needed here
  </script>
  
  
  <style scoped>
  
  * {
    box-sizing: border-box;
  }
  
  #app {
    min-height: 100vh;
    margin: 0;
  }
  
  
  /* =========================
     Navbar
  ========================= */
  
  .navbar {
  
    height: 75px;
  
    display: flex;
  
    align-items: center;
  
    justify-content: space-between;
  
    padding: 0 7%;
  
    background: #ffffff;
  
    border-bottom: 1px solid #eee;
  
    position: sticky;
  
    top: 0;
  
    z-index: 1000;
  
  }
  
  
  /* Logo */
  
  .logo {
  
    font-size: 25px;
  
    font-weight: 800;
  
    color: #4b2e83;
  
    letter-spacing: 0.5px;
  
  }
  
  
  /* Navigation */
  
  .nav-links {
  
    display: flex;
  
    align-items: center;
  
    gap: 30px;
  
  }
  
  
  .nav-links a {
  
    text-decoration: none;
  
    color: #444;
  
    font-size: 15px;
  
    font-weight: 600;
  
    transition: 0.3s;
  
  }
  
  
  .nav-links a:hover {
  
    color: #4b2e83;
  
  }
  
  
  /* Active Router Link */
  
  .nav-links a.router-link-active {
  
    color: #4b2e83;
  
  }
  
  
  /* Login Button */
  
  .login-btn {
  
    background: #4b2e83;
  
    color: white !important;
  
    padding: 10px 22px;
  
    border-radius: 8px;
  
    transition: 0.3s;
  
  }
  
  
  .login-btn:hover {
  
    background: #382060;
  
    transform: translateY(-1px);
  
  }
  
  
  /* Responsive */
  
  @media (max-width: 600px) {
  
    .navbar {
  
      padding: 0 5%;
  
    }
  
    .logo {
  
      font-size: 21px;
  
    }
  
    .nav-links {
  
      gap: 15px;
  
    }
  
    .nav-links a {
  
      font-size: 13px;
  
    }
  
    .login-btn {
  
      padding: 8px 15px;
  
    }
  
  }
  
  </style>