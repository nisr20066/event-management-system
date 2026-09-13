<template>

    <div id="app">
  
      <nav class="navbar">
  
        <div class="logo">
          EventHub
        </div>
  
        <div class="nav-links">
  
          <RouterLink to="/">
            Home
          </RouterLink>
  
          <RouterLink to="/events">
            Events
          </RouterLink>
  
        </div>
  
      </nav>
  
  
      <main>
        <RouterView />
      </main>
  
    </div>
  
  </template>
  
  
  <script setup>
  
  </script>
  
  
  <style>
  
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  .navbar {
    height: 70px;
    padding: 0 7%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .logo {
    color: #4b2e83;
    font-size: 24px;
    font-weight: bold;
  }
  
  .nav-links {
    display: flex;
    gap: 30px;
  }
  
  .nav-links a {
    text-decoration: none;
    color: #555;
    font-weight: 500;
  }
  
  .nav-links a.router-link-active {
    color: #4b2e83;
  }
  
  </style>