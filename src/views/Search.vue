<template>
  <div class="search">
    <el-dialog
      v-model="showSearchDialog"
      width="600"
      :show-close="false"
      :lock-scroll="false"
      modal-class="search-modal"
      @close="closeSearchDialog"
    >
      <el-input
        v-model.trim="searchVal"
        :placeholder="'請輸入搜尋內容'"
        @input="search"
        @blur="searchBlur"
        ref="searchInput"
        :prefix-icon="Search"
        @keydown.up.prevent="highlightPrevious"
        @keydown.down.prevent="highlightNext"
        @keydown.enter.prevent="selectHighlight"
      >
        <template #suffix>
          <div class="search-keydown">
            <span>ESC</span>
          </div>
        </template>
      </el-input>

      <div class="result" v-show="searchResult.length">
        <div class="box" v-for="(item, pIndex) in searchResult" :key="pIndex">
          <div
            v-for="(cItem, cIndex) in item.children"
            :key="cIndex"
            @click="searchGoPage(cItem)"
            @mouseenter="highlightOnHover(pIndex, cIndex)"
            :class="{ highlighted: isHighlight(pIndex, cIndex) }"
          >
            {{ getMenuTitle(cItem) }}
            <i class="selected-icon iconfont-sys" v-show="isHighlight(pIndex, cIndex)">&#xe6e6;</i>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useAllDateStore } from '@/stores'

const store = useAllDateStore()
const router = useRouter()

const showSearchDialog = ref(false)
const searchVal = ref('')
const searchResult = ref([])
const historyResult = ref([])
const historyMaxLength = 5
const searchInput = ref(null)
const currentHighlightIndex = ref([0, 0])

const closeSearchDialog = () => {
  showSearchDialog.value = false
  searchVal.value = ''
  searchResult.value = []
}

const getMenuTitle = (item) => item.label

const search = (val) => {
  if (val && typeof val === 'string') {
    const list = fuzzySearch(store.state.menuList || [], val.toLowerCase())
    searchResult.value = list.filter(item => item.children && item.children.length)
  } else {
    searchResult.value = []
  }
}

// 模糊搜索
const fuzzySearch = (arr, val) => {
  const lowerVal = val.toLowerCase()
  return arr.map(item => {
    const lowerItemTitle = item.label.toLowerCase()
    const children = item.children ? fuzzySearch(item.children, val) : []
    if (lowerItemTitle.includes(lowerVal) || children.length > 0) {
      return { ...item, children }
    }
    return null
  }).filter(item => item !== null)
}

// 鍵盤操作搜尋
const handleKeydown = (event) => {
  const isMac = navigator.userAgent.toLowerCase().includes('mac')
  const isCommandKey = isMac ? event.metaKey : event.ctrlKey

  if (isCommandKey && event.key.toLowerCase() === 'k') {
    showSearchDialog.value = true
  }
}

// 向上鍵
const highlightPrevious = () => {
  console.log('searchVal:',searchVal)
  if (searchVal.value) {
    const [parentIndex, childIndex] = currentHighlightIndex.value

    if (childIndex > 0) {
      currentHighlightIndex.value = [parentIndex, childIndex - 1]
    } else if (parentIndex > 0) {
      const previousParent = searchResult.value[parentIndex - 1]
      const newChildIndex = previousParent.children.length > 0 ? previousParent.children.length - 1 : -1
      currentHighlightIndex.value = [parentIndex - 1, newChildIndex]
    } else {
      const lastParentIndex = searchResult.value.length - 1
      const lastParent = searchResult.value[lastParentIndex]
      const newChildIndex = lastParent.children.length > 0 ? lastParent.children.length - 1 : -1
      currentHighlightIndex.value = [lastParentIndex, newChildIndex]
    }
  }
}

// 向下鍵
const highlightNext = () => {
  if (searchVal.value && searchResult.value.length > 0) {
    const [parentIndex, childIndex] = currentHighlightIndex.value
    const currentParent = searchResult.value[parentIndex]

    if (currentParent && currentParent.children) {
      const hasMoreChildren = childIndex < currentParent.children.length - 1
      if (hasMoreChildren) {
        currentHighlightIndex.value = [parentIndex, childIndex + 1]
      } else if (parentIndex < searchResult.value.length - 1) {
        currentHighlightIndex.value = [parentIndex + 1, 0]
      } else {
        currentHighlightIndex.value = [0, 0]
      }
    }
  }
}

const selectHighlight = () => {
  const [parentIndex, childIndex] = currentHighlightIndex.value

  if (parentIndex >= 0 && parentIndex < searchResult.value.length) {
    const selectedItem = childIndex === -1
      ? searchResult.value[parentIndex]
      : (searchResult.value[parentIndex].children && searchResult.value[parentIndex].children[childIndex])

    if (selectedItem) {
      searchInput.value?.blur()
      searchGoPage(selectedItem)
    }
  }
}

const isHighlight = (parentIndex, childIndex) => {
  const [highlightedParentIndex, highlightedChildIndex] = currentHighlightIndex.value
  return childIndex === undefined
    ? highlightedParentIndex === parentIndex && highlightedChildIndex === -1
    : highlightedParentIndex === parentIndex && highlightedChildIndex === childIndex
}

const searchBlur = () => {
  currentHighlightIndex.value = [0, 0]
}

const searchGoPage = (item) => {
  closeSearchDialog()
  if (item.path.startsWith('http')) {
    window.open(item.path)
    return
  }
  router.push(item.path)
  searchVal.value = ''
  searchResult.value = []
}

const highlightOnHover = (parentIndex, childIndex) => {
  currentHighlightIndex.value = [parentIndex, childIndex]
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.search {
  .search-modal {
    background-color: rgba(#000, 20%);
  }

  .el-dialog {
    padding: 0 15px;
    border-radius: 14px;
  }

  .el-input {
    height: 48px;

    .el-input__wrapper {
      background-color: rgba(var(--art-gray-200-rgb), 0.8);
      border: 1px solid var(--art-border-dashed-color);
      border-radius: 6px !important;
      box-shadow: none;
    }

    .el-input__inner {
      color: var(--art-gray-600) !important;
    }

    .search-keydown {
      display: flex;
      align-items: center;
      height: 20px;
      padding: 0 4px;
      color: var(--art-gray-500);
      background-color: var(--art-bg-color);
      border-radius: 4px;

      i {
        font-size: 12px;
      }

      span {
        margin-left: 2px;
        font-size: 12px;
      }
    }
  }

  .result {
    width: 100%;
    margin-top: 30px;
    background: var(--rt-main-bg-color);

    .box {
      margin-top: 0 !important;
      font-size: 16px;
      font-weight: 500;
      line-height: 1;
      cursor: pointer;

      .menu-icon {
        margin-right: 5px;
        font-size: 18px;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 0 16px;
        margin-top: 8px;
        font-size: 15px;
        font-weight: 400;
        color: var(--art-gray-600);

        &.highlighted {
        background-color: var(--highlight-color, #e6f7ff);
        color: var(--highlight-text-color, #1890ff);
        }
      }
    }
  }
}
</style>
