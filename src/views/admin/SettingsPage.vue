<template>
  <div class="settings-page">
    <h1 class="settings-page__title">설정</h1>

    <div class="settings-page__sections">
      <section class="settings-page__section">
        <h2 class="settings-page__section-title">일반 설정</h2>
        <div class="settings-page__field">
          <label>서비스 이름</label>
          <input v-model="settings.siteName" type="text" />
        </div>
        <div class="settings-page__field">
          <label>관리자 이메일</label>
          <input v-model="settings.adminEmail" type="email" />
        </div>
      </section>

      <section class="settings-page__section">
        <h2 class="settings-page__section-title">회원 가입 설정</h2>
        <div class="settings-page__toggle-field">
          <label>회원 가입 허용</label>
          <input type="checkbox" v-model="settings.allowSignup" />
        </div>
        <div class="settings-page__toggle-field">
          <label>이메일 인증 필요</label>
          <input type="checkbox" v-model="settings.requireEmailVerification" />
        </div>
      </section>
    </div>

    <button class="settings-page__save-btn" @click="handleSave">저장</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const settings = ref({
  siteName: 'Vue App',
  adminEmail: 'admin@example.com',
  allowSignup: true,
  requireEmailVerification: false
})

function handleSave() {
  // TODO: 실제 API 호출로 교체
  alert('설정이 저장되었습니다.')
}
</script>

<style scoped>
.settings-page__title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 24px;
}

.settings-page__sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}

.settings-page__section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.settings-page__section-title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

.settings-page__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 400px;
}

.settings-page__field label {
  font-size: 13px;
  font-weight: 600;
  color: #555;
}

.settings-page__field input {
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.settings-page__field input:focus {
  border-color: #1a73e8;
}

.settings-page__toggle-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 400px;
}

.settings-page__toggle-field label {
  font-size: 14px;
  color: #555;
}

.settings-page__save-btn {
  padding: 12px 32px;
  background-color: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.settings-page__save-btn:hover {
  background-color: #1558c0;
}
</style>
