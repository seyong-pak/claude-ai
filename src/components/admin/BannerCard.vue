<template>
  <div class="banner-card">
    <!-- 헤더 -->
    <div class="banner-card__header">
      <div>
        <h3 class="banner-card__title">{{ label }}</h3>
        <p class="banner-card__desc">{{ description }}</p>
      </div>
      <div class="banner-card__header-badges">
        <span class="banner-card__count">총 {{ bannerList.length }}개</span>
        <span v-if="activeCount > 0" class="banner-card__count banner-card__count--active">게시 중 {{ activeCount }}개</span>
      </div>
    </div>

    <!-- 배너 목록 -->
    <div class="banner-card__list">
      <div v-if="bannerList.length === 0" class="banner-card__empty">등록된 배너가 없습니다.</div>

      <template v-for="(banner, idx) in bannerList" :key="banner.id">
        <!-- 배너 행 -->
        <div class="banner-card__item" :class="{ 'banner-card__item--editing': editingId === banner.id }">
          <span class="banner-card__item-num">{{ idx + 1 }}</span>

          <!-- 썸네일 -->
          <div class="banner-card__thumb" @click="openPreview(banner)">
            <img v-if="banner.image" :src="banner.image" :alt="banner.imageName" />
            <span v-else class="banner-card__thumb-empty">없음</span>
          </div>

          <!-- 파일명 -->
          <span class="banner-card__filename" :title="banner.imageName">{{ banner.imageName || '-' }}</span>

          <!-- 날짜 -->
          <span class="banner-card__date-text">
            {{ banner.startDate || '미설정' }} ~ {{ banner.endDate || '미설정' }}
          </span>

          <!-- 상태 -->
          <span class="banner-card__status" :class="`banner-card__status--${getStatus(banner)}`">
            {{ statusLabel(banner) }}
          </span>

          <!-- 액션 버튼 -->
          <div class="banner-card__item-actions">
            <button
              class="banner-card__edit-btn"
              :class="{ 'banner-card__edit-btn--active': editingId === banner.id }"
              @click="toggleEdit(banner)"
            >
              {{ editingId === banner.id ? '닫기' : '편집' }}
            </button>
            <button class="banner-card__del-btn" @click="remove(banner.id)">삭제</button>
          </div>
        </div>

        <!-- 편집 패널 (해당 행 아래 인라인 확장) -->
        <Transition name="slide-down">
          <div v-if="editingId === banner.id" class="banner-card__edit-panel">
            <div class="banner-card__edit-inner">
              <!-- 이미지 편집 -->
              <div class="banner-card__edit-section">
                <p class="banner-card__edit-label">이미지</p>
                <div
                  class="banner-card__upload banner-card__upload--has"
                  @click="triggerEditFileInput"
                  @dragover.prevent
                  @drop.prevent="onEditDrop"
                >
                  <img :src="editForm.image" alt="편집 이미지" class="banner-card__upload-preview" />
                  <div class="banner-card__upload-overlay">클릭하거나 드래그하여 이미지 변경</div>
                </div>
                <input ref="editFileInput" type="file" accept="image/*" style="display:none" @change="onEditFileChange" />
                <p v-if="editForm.imageName" class="banner-card__edit-filename">{{ editForm.imageName }}</p>
              </div>

              <!-- 날짜 편집 -->
              <div class="banner-card__edit-section">
                <p class="banner-card__edit-label">게시 기간</p>
                <div class="banner-card__edit-dates">
                  <div class="banner-card__date-field">
                    <label>시작일</label>
                    <input type="date" v-model="editForm.startDate" :max="editForm.endDate || undefined" />
                  </div>
                  <span class="banner-card__sep">~</span>
                  <div class="banner-card__date-field">
                    <label>종료일</label>
                    <input type="date" v-model="editForm.endDate" :min="editForm.startDate || undefined" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 편집 하단 버튼 -->
            <div class="banner-card__edit-footer">
              <p v-if="editError" class="banner-card__edit-error">{{ editError }}</p>
              <button class="banner-card__cancel-btn" @click="cancelEdit">취소</button>
              <button class="banner-card__save-btn" @click="saveEdit(banner.id)">저장</button>
            </div>
          </div>
        </Transition>
      </template>
    </div>

    <!-- 배너 추가 영역 -->
    <div class="banner-card__add">
      <button
        class="banner-card__add-toggle"
        :class="{ 'banner-card__add-toggle--open': showAddForm }"
        @click="toggleAddForm"
      >
        <span>+ 배너 추가</span>
        <span class="banner-card__add-arrow">{{ showAddForm ? '▲' : '▼' }}</span>
      </button>

      <Transition name="slide-down">
        <div v-if="showAddForm" class="banner-card__add-form">
          <!-- 이미지 업로드 -->
          <div
            class="banner-card__upload"
            :class="{ 'banner-card__upload--has': newBanner.image }"
            @click="triggerAddFileInput"
            @dragover.prevent
            @drop.prevent="onAddDrop"
          >
            <template v-if="newBanner.image">
              <img :src="newBanner.image" alt="미리보기" class="banner-card__upload-preview" />
              <div class="banner-card__upload-overlay">클릭하여 변경</div>
            </template>
            <template v-else>
              <div class="banner-card__upload-placeholder">
                <span class="banner-card__upload-icon">+</span>
                <p>클릭하거나 드래그하여 이미지 등록</p>
                <p class="banner-card__upload-hint">JPG, PNG, GIF, WEBP</p>
              </div>
            </template>
          </div>
          <input ref="addFileInput" type="file" accept="image/*" style="display:none" @change="onAddFileChange" />

          <!-- 날짜 + 등록 버튼 -->
          <div class="banner-card__add-bottom">
            <div class="banner-card__edit-dates">
              <div class="banner-card__date-field">
                <label>시작일</label>
                <input type="date" v-model="newBanner.startDate" :max="newBanner.endDate || undefined" />
              </div>
              <span class="banner-card__sep">~</span>
              <div class="banner-card__date-field">
                <label>종료일</label>
                <input type="date" v-model="newBanner.endDate" :min="newBanner.startDate || undefined" />
              </div>
            </div>
            <div class="banner-card__add-actions">
              <p v-if="addError" class="banner-card__edit-error">{{ addError }}</p>
              <button class="banner-card__save-btn" @click="addBanner">등록</button>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- 이미지 미리보기 모달 -->
    <Transition name="fade">
      <div v-if="previewImage" class="banner-card__preview-modal" @click="previewImage = null">
        <img :src="previewImage" alt="미리보기" class="banner-card__preview-img" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBannerStore } from '@/stores/banner'

const props = defineProps({
  type: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, default: '' }
})

const bannerStore = useBannerStore()

// 파일 input refs (추가용 / 편집용 분리)
const addFileInput = ref(null)
const editFileInput = ref(null)

// 상태
const showAddForm = ref(false)
const editingId = ref(null)
const previewImage = ref(null)
const addError = ref('')
const editError = ref('')

// 폼 데이터
const newBanner = ref({ image: null, imageName: '', startDate: '', endDate: '' })
const editForm = ref({ image: null, imageName: '', startDate: '', endDate: '' })

const bannerList = computed(() => bannerStore.banners[props.type] || [])
const activeCount = computed(() => bannerStore.getActiveBanners(props.type).length)

function getStatus(b) { return bannerStore.getBannerStatus(b) }
function statusLabel(b) {
  return { active: '게시 중', pending: '게시 예정', ended: '게시 종료', 'no-image': '이미지 없음', 'no-date': '날짜 미설정' }[getStatus(b)] || '-'
}

// ─── 편집 ───────────────────────────────────
function toggleEdit(banner) {
  if (editingId.value === banner.id) {
    cancelEdit()
    return
  }
  editingId.value = banner.id
  editForm.value = { image: banner.image, imageName: banner.imageName, startDate: banner.startDate, endDate: banner.endDate }
  editError.value = ''
}

function cancelEdit() {
  editingId.value = null
  editError.value = ''
}

function saveEdit(id) {
  editError.value = ''
  if (!editForm.value.image) { editError.value = '이미지를 등록해주세요.'; return }
  if (!editForm.value.startDate || !editForm.value.endDate) { editError.value = '시작일/종료일을 입력해주세요.'; return }
  if (editForm.value.startDate > editForm.value.endDate) { editError.value = '시작일이 종료일보다 늦을 수 없습니다.'; return }
  bannerStore.updateBanner(props.type, id, { ...editForm.value })
  editingId.value = null
}

function triggerEditFileInput() { editFileInput.value?.click() }
function onEditFileChange(e) {
  const file = e.target.files?.[0]
  if (file) readFile(file, editForm.value)
  e.target.value = ''
}
function onEditDrop(e) {
  const file = e.dataTransfer.files?.[0]
  if (file?.type.startsWith('image/')) readFile(file, editForm.value)
}

// ─── 추가 ───────────────────────────────────
function toggleAddForm() {
  showAddForm.value = !showAddForm.value
  if (!showAddForm.value) {
    newBanner.value = { image: null, imageName: '', startDate: '', endDate: '' }
    addError.value = ''
  }
}

function addBanner() {
  addError.value = ''
  if (!newBanner.value.image) { addError.value = '이미지를 등록해주세요.'; return }
  if (!newBanner.value.startDate || !newBanner.value.endDate) { addError.value = '시작일/종료일을 입력해주세요.'; return }
  if (newBanner.value.startDate > newBanner.value.endDate) { addError.value = '시작일이 종료일보다 늦을 수 없습니다.'; return }
  bannerStore.addBanner(props.type, { ...newBanner.value })
  newBanner.value = { image: null, imageName: '', startDate: '', endDate: '' }
  showAddForm.value = false
}

function triggerAddFileInput() { addFileInput.value?.click() }
function onAddFileChange(e) {
  const file = e.target.files?.[0]
  if (file) readFile(file, newBanner.value)
  e.target.value = ''
}
function onAddDrop(e) {
  const file = e.dataTransfer.files?.[0]
  if (file?.type.startsWith('image/')) readFile(file, newBanner.value)
}

// ─── 공통 ───────────────────────────────────
function readFile(file, target) {
  const reader = new FileReader()
  reader.onload = (e) => { target.image = e.target.result; target.imageName = file.name }
  reader.readAsDataURL(file)
}

function remove(id) {
  if (confirm('이 배너를 삭제하시겠습니까?')) {
    if (editingId.value === id) editingId.value = null
    bannerStore.removeBanner(props.type, id)
  }
}

function openPreview(banner) {
  if (banner.image) previewImage.value = banner.image
}
</script>

<style scoped>
.banner-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

/* 헤더 */
.banner-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 24px 14px;
  border-bottom: 1px solid #f0f2f5;
}

.banner-card__title {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 4px;
}

.banner-card__desc {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.banner-card__header-badges {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
}

.banner-card__count {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  background: #f0f2f5;
  color: #888;
}

.banner-card__count--active {
  background: #e8f5e9;
  color: #2e7d32;
}

/* 목록 */
.banner-card__list {
  padding: 8px 0;
  min-height: 48px;
}

.banner-card__empty {
  text-align: center;
  padding: 20px;
  font-size: 13px;
  color: #bbb;
}

/* 배너 행 */
.banner-card__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 24px;
  border-bottom: 1px solid #f8f9fa;
  transition: background-color 0.15s;
}

.banner-card__item:hover {
  background-color: #fafbfc;
}

.banner-card__item--editing {
  background-color: #f0f7ff;
  border-bottom-color: #e0eeff;
}

.banner-card__item-num {
  font-size: 12px;
  color: #bbb;
  width: 16px;
  text-align: center;
  flex-shrink: 0;
}

.banner-card__thumb {
  width: 72px;
  height: 44px;
  border-radius: 6px;
  overflow: hidden;
  background: #f0f2f5;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
}

.banner-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-card__thumb-empty {
  font-size: 10px;
  color: #bbb;
}

.banner-card__filename {
  flex: 1;
  font-size: 13px;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.banner-card__date-text {
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  flex-shrink: 0;
}

.banner-card__status {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
}

.banner-card__status--active   { background: #e8f5e9; color: #2e7d32; }
.banner-card__status--pending  { background: #fff8e1; color: #f57f17; }
.banner-card__status--ended    { background: #f5f5f5; color: #999; }
.banner-card__status--no-image,
.banner-card__status--no-date  { background: #fce4ec; color: #c62828; }

/* 행 액션 버튼 */
.banner-card__item-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.banner-card__edit-btn {
  padding: 5px 12px;
  background: #fff;
  border: 1px solid #1a73e8;
  color: #1a73e8;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}

.banner-card__edit-btn:hover,
.banner-card__edit-btn--active {
  background: #1a73e8;
  color: #fff;
}

.banner-card__del-btn {
  padding: 5px 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
  color: #e53935;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s;
}

.banner-card__del-btn:hover {
  background: #fce4ec;
  border-color: #e53935;
}

/* 편집 패널 */
.banner-card__edit-panel {
  background: #f5f8ff;
  border-bottom: 1px solid #e0eeff;
  padding: 16px 24px 18px;
}

.banner-card__edit-inner {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.banner-card__edit-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.banner-card__edit-label {
  font-size: 11px;
  font-weight: 600;
  color: #888;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.banner-card__edit-filename {
  font-size: 11px;
  color: #999;
  margin: 0;
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.banner-card__edit-dates {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

.banner-card__date-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.banner-card__date-field label {
  font-size: 11px;
  font-weight: 600;
  color: #888;
}

.banner-card__date-field input[type='date'] {
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 13px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
  background: #fff;
}

.banner-card__date-field input[type='date']:focus {
  border-color: #1a73e8;
}

.banner-card__sep {
  font-size: 14px;
  color: #aaa;
  padding-bottom: 8px;
}

.banner-card__edit-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.banner-card__edit-error {
  font-size: 12px;
  color: #e53935;
  margin: 0;
  flex: 1;
}

.banner-card__cancel-btn {
  padding: 8px 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 13px;
  color: #555;
  cursor: pointer;
  transition: background-color 0.15s;
}

.banner-card__cancel-btn:hover {
  background: #f5f5f5;
}

.banner-card__save-btn {
  padding: 8px 22px;
  background-color: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.banner-card__save-btn:hover {
  background-color: #1558c0;
}

/* 이미지 업로드 공통 */
.banner-card__upload {
  width: 260px;
  height: 130px;
  border: 2px dashed #ddd;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s;
  background: #fff;
}

.banner-card__upload:hover {
  border-color: #1a73e8;
}

.banner-card__upload--has {
  border-style: solid;
  border-color: #d0d0d0;
}

.banner-card__upload-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.banner-card__upload-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  padding: 8px;
}

.banner-card__upload--has:hover .banner-card__upload-overlay {
  opacity: 1;
}

.banner-card__upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 6px;
  color: #ccc;
}

.banner-card__upload-icon { font-size: 26px; }

.banner-card__upload-placeholder p {
  margin: 0;
  font-size: 13px;
}

.banner-card__upload-hint {
  font-size: 11px !important;
}

/* 추가 영역 */
.banner-card__add {
  border-top: 1px solid #f0f2f5;
}

.banner-card__add-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 24px;
  background: none;
  border: none;
  font-size: 13px;
  font-weight: 600;
  color: #1a73e8;
  cursor: pointer;
  transition: background-color 0.2s;
}

.banner-card__add-toggle:hover,
.banner-card__add-toggle--open {
  background-color: #f0f7ff;
}

.banner-card__add-arrow {
  font-size: 10px;
  color: #aaa;
}

.banner-card__add-form {
  padding: 16px 24px 20px;
  background: #fafbfc;
  border-top: 1px solid #f0f2f5;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.banner-card__add-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.banner-card__add-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 미리보기 모달 */
.banner-card__preview-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.banner-card__preview-img {
  max-width: 90vw;
  max-height: 85vh;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

/* 트랜지션 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
