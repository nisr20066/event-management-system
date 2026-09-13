<template>
    <div class="home">
  
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <p class="small-title">DISCOVER • EXPERIENCE • ENJOY</p>
  
          <h1>
            Find Your Next
            <span>Great Event</span>
          </h1>
  
          <p class="description">
            Discover concerts, conferences, festivals and unforgettable
            experiences all in one place.
          </p>
  
          <router-link to="/events" class="explore-btn">
            Explore Events
          </router-link>
        </div>
  
        <div class="hero-icon">
          🎟️
        </div>
      </section>
  
  
      <!-- Categories -->
      <section class="categories">
  
        <div class="section-title">
          <p>EXPLORE</p>
          <h2>Find Events You Love</h2>
        </div>
  
        <div class="category-container">
  
          <div class="category-card">
            <div class="icon">🎵</div>
            <h3>Music</h3>
            <p>Concerts & Festivals</p>
          </div>
  
          <div class="category-card">
            <div class="icon">💻</div>
            <h3>Technology</h3>
            <p>Tech Conferences</p>
          </div>
  
          <div class="category-card">
            <div class="icon">🎨</div>
            <h3>Art</h3>
            <p>Exhibitions & Shows</p>
          </div>
  
          <div class="category-card">
            <div class="icon">💼</div>
            <h3>Business</h3>
            <p>Business Events</p>
          </div>
  
        </div>
  
      </section>
  
  
      <!-- CTA -->
      <section class="cta">
  
        <h2>Ready to Find Your Next Experience?</h2>
  
        <p>
          Browse our events and book your ticket today.
        </p>
  
        <router-link to="/events" class="cta-btn">
          View All Events
        </router-link>
  
      </section>
  
    </div>
  </template>
  
  
  <style scoped>
  
  .home {
    background: #f8f6ff;
    min-height: 100vh;
  }
  
  
  /* HERO */
  
  .hero {
    min-height: 520px;
    padding: 70px 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  
    background: linear-gradient(
      135deg,
      #4b2e83,
      #7b55b5
    );
  
    color: white;
  }
  
  .hero-content {
    max-width: 650px;
  }
  
  .small-title {
    letter-spacing: 3px;
    font-size: 13px;
    margin-bottom: 20px;
    opacity: 0.8;
  }
  
  .hero h1 {
    font-size: 60px;
    line-height: 1.1;
    margin-bottom: 25px;
  }
  
  .hero h1 span {
    display: block;
    color: #e8d9ff;
  }
  
  .description {
    font-size: 18px;
    line-height: 1.7;
    max-width: 550px;
    margin-bottom: 35px;
  }
  
  .explore-btn {
    display: inline-block;
    padding: 15px 30px;
    background: white;
    color: #4b2e83;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
  }
  
  .hero-icon {
    font-size: 180px;
    margin-right: 80px;
  }
  
  
  /* CATEGORIES */
  
  .categories {
    padding: 70px 8%;
  }
  
  .section-title {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .section-title p {
    color: #7b55b5;
    font-weight: bold;
    letter-spacing: 2px;
  }
  
  .section-title h2 {
    font-size: 36px;
    color: #333;
  }
  
  .category-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  
  .category-card {
    background: white;
    padding: 30px 20px;
    text-align: center;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.07);
    transition: 0.3s;
  }
  
  .category-card:hover {
    transform: translateY(-8px);
  }
  
  .icon {
    font-size: 50px;
    margin-bottom: 15px;
  }
  
  .category-card h3 {
    color: #4b2e83;
  }
  
  .category-card p {
    color: #777;
  }
  
  
  /* CTA */
  
  .cta {
    text-align: center;
    padding: 70px 20px;
    background: #eee8f8;
  }
  
  .cta h2 {
    color: #4b2e83;
    font-size: 32px;
  }
  
  .cta p {
    color: #666;
    margin: 15px 0 25px;
  }
  
  .cta-btn {
    display: inline-block;
    background: #4b2e83;
    color: white;
    padding: 14px 28px;
    border-radius: 8px;
    text-decoration: none;
  }
  
  
  /* RESPONSIVE */
  
  @media (max-width: 900px) {
  
    .hero {
      text-align: center;
    }
  
    .hero-icon {
      display: none;
    }
  
    .category-container {
      grid-template-columns: repeat(2, 1fr);
    }
  
  }
  
  @media (max-width: 600px) {
  
    .hero h1 {
      font-size: 42px;
    }
  
    .category-container {
      grid-template-columns: 1fr;
    }
  
  }
  
  </style>