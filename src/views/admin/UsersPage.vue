<template>
  <div class="users-page">
    <div class="users-page__header">
      <h1 class="users-page__title">회원 관리</h1>
      <button class="users-page__add-btn">+ 회원 추가</button>
    </div>

    <div class="users-page__filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="이름 또는 이메일 검색..."
        class="users-page__search"
      />
      <select v-model="statusFilter" class="users-page__filter">
        <option value="">전체 상태</option>
        <option value="active">활성</option>
        <option value="inactive">비활성</option>
      </select>
    </div>

    <div class="users-page__table-wrap">
      <table class="users-page__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>가입일</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.joinDate }}</td>
            <td>
              <span class="users-page__badge" :class="`users-page__badge--${user.status}`">
                {{ user.status === 'active' ? '활성' : '비활성' }}
              </span>
            </td>
            <td>
              <div class="users-page__actions">
                <button class="users-page__action-btn">편집</button>
                <button class="users-page__action-btn users-page__action-btn--danger">삭제</button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="6" class="users-page__empty">검색 결과가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const statusFilter = ref('')

const users = ref([
  { id: 1, name: '홍길동', email: 'hong@example.com', joinDate: '2026-03-09', status: 'active' },
  { id: 2, name: '김철수', email: 'kim@example.com', joinDate: '2026-03-08', status: 'active' },
  { id: 3, name: '이영희', email: 'lee@example.com', joinDate: '2026-03-07', status: 'inactive' },
  { id: 4, name: '박민수', email: 'park@example.com', joinDate: '2026-03-06', status: 'active' },
  { id: 5, name: '최지현', email: 'choi@example.com', joinDate: '2026-03-05', status: 'inactive' }
])

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch =
      !searchQuery.value ||
      user.name.includes(searchQuery.value) ||
      user.email.includes(searchQuery.value)
    const matchesStatus = !statusFilter.value || user.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})
</script>

<style scoped>
.users-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.users-page__title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.users-page__add-btn {
  padding: 10px 20px;
  background-color: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.users-page__add-btn:hover {
  background-color: #1558c0;
}

.users-page__filters {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.users-page__search {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.users-page__search:focus {
  border-color: #1a73e8;
}

.users-page__filter {
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: #fff;
  cursor: pointer;
}

.users-page__table-wrap {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.users-page__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.users-page__table th {
  text-align: left;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e8e8e8;
  color: #888;
  font-weight: 600;
  font-size: 13px;
}

.users-page__table td {
  padding: 14px 16px;
  border-bottom: 1px solid #f0f2f5;
  color: #333;
}

.users-page__table tr:last-child td {
  border-bottom: none;
}

.users-page__badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.users-page__badge--active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.users-page__badge--inactive {
  background-color: #fce4ec;
  color: #c62828;
}

.users-page__actions {
  display: flex;
  gap: 8px;
}

.users-page__action-btn {
  padding: 5px 12px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.users-page__action-btn:hover {
  background-color: #f0f2f5;
}

.users-page__action-btn--danger {
  color: #e53935;
  border-color: #e53935;
}

.users-page__action-btn--danger:hover {
  background-color: #fce4ec;
}

.users-page__empty {
  text-align: center;
  padding: 40px;
  color: #aaa;
  font-size: 14px;
}
</style>
