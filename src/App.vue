<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <AppNavbar />
  <main class="app-main"><router-view /></main>
  <AppFooter />
</template>

<style>
:root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#fff;background:#0f172a;font-synthesis:none}*{box-sizing:border-box}body{margin:0;min-width:320px;background:#0f172a;color:#fff}button,input,select,textarea{font:inherit}button{transition:transform .18s ease,background .18s ease,box-shadow .18s ease}button:not(:disabled):hover{transform:scale(1.02)}button:not(:disabled):active{transform:scale(.98)}button:disabled{cursor:not-allowed;opacity:.58}.app-main{min-height:calc(100vh - 72px)}
.container,.page,.p-6{width:min(1120px,calc(100% - 32px));margin:0 auto;padding:56px 0}.card,.profile-card,.auth-card,.event-card,.ticket{background:#1e293b!important;border:1px solid #334155!important;box-shadow:0 16px 38px rgba(0,0,0,.16)!important;color:#fff}.btn,button:not(.menu-toggle):not(.nav-logout){border:0;border-radius:8px;background:#f97316;color:#fff;padding:11px 16px;font-weight:700;cursor:pointer}.btn-secondary,.back-btn{background:#334155!important}.btn-success{background:#22c55e!important}.text-danger,.error{color:#fca5a5!important}.alert,.message{border:1px solid #475569;border-radius:10px;padding:18px;background:#1e293b;color:#cbd5e1}.text-center{text-align:center}input,select,textarea{width:100%;background:#0f172a!important;color:#fff!important;border:1px solid #475569!important;border-radius:8px;padding:12px}input:focus,select:focus,textarea:focus{outline:2px solid #f97316;outline-offset:1px;border-color:#f97316!important}label{color:#cbd5e1;font-weight:700}a{color:#fb923c}.rounded,.rounded-lg{border-radius:10px!important}.border{border-color:#334155!important}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}.mt-5{margin-top:2rem}.py-5{padding-top:3.5rem!important;padding-bottom:3.5rem!important}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
</style>
