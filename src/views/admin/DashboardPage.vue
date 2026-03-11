<template>
  <div class="dashboard">
    <h1 class="dashboard__title">대시보드</h1>

    <div class="dashboard__stats">
      <div class="dashboard__stat-card" v-for="stat in stats" :key="stat.label">
        <div class="dashboard__stat-icon">{{ stat.icon }}</div>
        <div class="dashboard__stat-info">
          <p class="dashboard__stat-value">{{ stat.value }}</p>
          <p class="dashboard__stat-label">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <div class="dashboard__grid">
      <div class="dashboard__section">
        <h2 class="dashboard__section-title">최근 가입 회원</h2>
        <table class="dashboard__table">
          <thead>
            <tr>
              <th>이름</th>
              <th>이메일</th>
              <th>가입일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in recentUsers" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.joinDate }}</td>
              <td>
                <span class="dashboard__badge" :class="`dashboard__badge--${user.status}`">
                  {{ user.statusLabel }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { icon: '👥', label: '전체 회원', value: '1,248' },
  { icon: '📋', label: '오늘 가입', value: '12' },
  { icon: '✅', label: '활성 회원', value: '1,100' },
  { icon: '🚫', label: '정지 회원', value: '148' }
]

const recentUsers = [
  { id: 1, name: '홍길동', email: 'hong@example.com', joinDate: '2026-03-09', status: 'active', statusLabel: '활성' },
  { id: 2, name: '김철수', email: 'kim@example.com', joinDate: '2026-03-08', status: 'active', statusLabel: '활성' },
  { id: 3, name: '이영희', email: 'lee@example.com', joinDate: '2026-03-07', status: 'inactive', statusLabel: '비활성' }
]
</script>

<style scoped>
.dashboard__title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 24px;
}

.dashboard__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.dashboard__stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.dashboard__stat-icon {
  font-size: 28px;
}

.dashboard__stat-value {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 2px;
}

.dashboard__stat-label {
  font-size: 13px;
  color: #888;
  margin: 0;
}

.dashboard__section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.dashboard__section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 16px;
}

.dashboard__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.dashboard__table th {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 2px solid #f0f2f5;
  color: #888;
  font-weight: 600;
  font-size: 13px;
}

.dashboard__table td {
  padding: 12px;
  border-bottom: 1px solid #f0f2f5;
  color: #333;
}

.dashboard__table tr:last-child td {
  border-bottom: none;
}

.dashboard__badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.dashboard__badge--active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.dashboard__badge--inactive {
  background-color: #fce4ec;
  color: #c62828;
}
</style>
