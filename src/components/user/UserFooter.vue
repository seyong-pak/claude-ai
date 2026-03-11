<template>
  <footer class="user-footer">
    <div class="user-footer__inner">
      <p class="user-footer__copy">&copy; {{ currentYear }} Vue App. All rights reserved.</p>
      <nav class="user-footer__nav">
        <a href="#" class="user-footer__link">이용약관</a>
        <a href="#" class="user-footer__link">개인정보처리방침</a>
        <a href="#" class="user-footer__link">고객센터</a>
      </nav>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.user-footer {
  background-color: #ffffff;
  border-top: 1px solid #e8e8e8;
}

.user-footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.user-footer__copy {
  font-size: 13px;
  color: #888;
  margin: 0;
}

.user-footer__nav {
  display: flex;
  gap: 20px;
}

.user-footer__link {
  font-size: 13px;
  color: #888;
  text-decoration: none;
  transition: color 0.2s;
}

.user-footer__link:hover {
  color: #1a73e8;
}
</style>
