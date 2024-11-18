<template>
    <div class="tags">
        <el-tag
            v-for="(tag,index) in tags"
            :key="tag.name"
            :closable="tag.name !== 'home'"
            :effect="$route.name === tag.name ? 'dark' : 'plain' "
            @click="handleMenu(tag)"
            @close="handleClose(tag, index)"
        >
        {{ tag.label  }}
        </el-tag>
    </div>
</template>
<script setup>
import  {ref,computed} from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useAllDateStore } from '@/stores'
const store = useAllDateStore()
const tags = computed(()=>store.state.tags)
const route = useRoute()
const router = useRouter()

const handleMenu = (tag) => {
    router.push(tag.name)
    store.selectMenu()
}
const handleClose = (tag, index) => {
    // 通過pinia管理
    store.updateTags(tag)
    // 如果要關閉的tag不是當前頁面的tag
    if(tag.name !== route.name) return

    if(index === store.state.tags.length){
        store.selectMenu(tags.value[index-1])
        router.push(tags.value[index-1].name)
    }else {
        store.selectMenu(tags.value[index])
        router.push(tags.value[index].name)
    }

}
</script > 
<style lang="less" scoped >
// .tags{
//     margin:20px 0 0 20px; 
// }
// .el-tag{
//     margin-right: 10px
// }
.tags .el-tag {
    font-weight: 500;

    &.el-tag--dark {
        background-color: #666;       // 修改背景顏色
        color: #fff;                  // 修改文字顏色
        border-color: #666;           // 修改邊框顏色
        font-weight: bold;            // 加粗文字
    }

    &.el-tag--plain {
        border-color: var(--primary-color);  // plain 模式邊框顏色
        color: var(--primary-color);         // plain 模式文字顏色
    }

    .el-tag__close {
        color: #666 !important;         // 修改叉叉顏色，並確保它覆蓋默認顏色
    }

    &.el-tag--dark .el-tag__close {
        color: #666 !important;         // 確保在暗色模式下叉叉也顯示為 #666
    }

    &:hover .el-tag__close {
        color: #666 !important;         // 在 hover 時確保叉叉顏色不變
    }
}




</style>