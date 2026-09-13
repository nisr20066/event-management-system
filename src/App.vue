<!-- <script setup></script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

<style scoped></style> -->
<template>

  <nav class="navbar">

    <router-link to="/" class="logo">
      Eventify
    </router-link>

    <div class="links">

      <router-link to="/">
        Home
      </router-link>

      <router-link to="/events">
        Events
      </router-link>

      <router-link to="/login">
        Login
      </router-link>

    </div>

  </nav>


  <router-view />

</template>


<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

.navbar {

  height: 70px;

  padding: 0 8%;

  display: flex;

  justify-content: space-between;

  align-items: center;

  background: white;

  box-shadow: 0 2px 10px rgba(0,0,0,0.08);

}

.logo {

  color: #4b2e83;

  font-size: 25px;

  font-weight: bold;

  text-decoration: none;

}

.links {

  display: flex;

  gap: 25px;

}

.links a {

  text-decoration: none;

  color: #444;

}

.links a.router-link-active {

  color: #4b2e83;

  font-weight: bold;

}

</style>
