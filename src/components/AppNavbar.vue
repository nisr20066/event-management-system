<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const open = ref(false)
const role = computed(() => String(auth.user?.role || '').toLowerCase())
const isOrganizer = computed(() => role.value === 'organizer')
const isAdmin = computed(() => role.value === 'admin')

function closeMenu() { open.value = false }
function logout() { auth.logout(); closeMenu(); router.push('/login') }
</script>

<template>
  <header class="site-header">
    <nav class="nav-shell" aria-label="Main navigation">
      <RouterLink class="brand" to="/" @click="closeMenu"><span>EH</span> EventHub</RouterLink>
      <button class="menu-toggle" type="button" :aria-expanded="open" @click="open = !open">Menu</button>
      <div class="nav-links" :class="{ open }">
        <RouterLink to="/" @click="closeMenu">Home</RouterLink>
        <RouterLink to="/events" @click="closeMenu">Events</RouterLink>
        <template v-if="auth.isAuthenticated">
          <RouterLink to="/my-bookings" @click="closeMenu">My bookings</RouterLink>
          <RouterLink to="/my-tickets" @click="closeMenu">My tickets</RouterLink>
          <RouterLink v-if="isOrganizer" to="/organizer/dashboard" @click="closeMenu">Organizer</RouterLink>
          <RouterLink v-if="isAdmin" to="/admin" @click="closeMenu">Admin</RouterLink>
          <RouterLink to="/profile" @click="closeMenu">Profile</RouterLink>
          <button class="nav-logout" type="button" @click="logout">Log out</button>
        </template>
        <template v-else>
          <RouterLink to="/login" @click="closeMenu">Log in</RouterLink>
          <RouterLink class="nav-cta" to="/register" @click="closeMenu">Get started</RouterLink>
        </template>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.site-header { position: sticky; top: 0; z-index: 20; background: rgba(15, 23, 42, .96); border-bottom: 1px solid rgba(148,163,184,.2); backdrop-filter: blur(12px); }
.nav-shell { width: min(1180px, calc(100% - 32px)); min-height: 72px; margin: auto; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.brand { color: #fff; font-size: 1.15rem; font-weight: 800; letter-spacing: -.03em; text-decoration: none; white-space: nowrap; }.brand span { color: #fff; background: #f97316; border-radius: 8px; padding: 5px; margin-right: 7px; font-size: .75rem; }
.nav-links { display: flex; align-items: center; gap: 5px; }.nav-links a,.nav-logout { color: #cbd5e1; background: transparent; border: 0; font: inherit; padding: 9px 11px; text-decoration: none; cursor: pointer; border-radius: 7px; }.nav-links a:hover,.nav-links a.router-link-exact-active,.nav-logout:hover { color: #fff; background: rgba(249,115,22,.15); }.nav-links .nav-cta { color: #fff; background: #f97316; margin-left: 5px; }.nav-links .nav-cta:hover { background: #fb923c; }
.menu-toggle { display:none; background: none; border: 1px solid #475569; color: #fff; border-radius: 7px; padding: 7px 9px; }
@media(max-width:760px){.menu-toggle{display:block}.nav-links{display:none;position:absolute;top:72px;left:0;right:0;padding:14px 16px 18px;background:#0f172a;border-bottom:1px solid #334155;flex-direction:column;align-items:stretch}.nav-links.open{display:flex}.nav-links a,.nav-logout{text-align:left}.nav-links .nav-cta{text-align:center;margin:4px 0 0}}
</style>
