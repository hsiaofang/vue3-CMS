<template>
    <div class="tags-container" ref="scrollRef">
        <div class="tags" 
            ref="tagsRef"
            :style="{ transform: `translateX(${translateX}px)`, transition: `${transition}` }"
            >
            <el-tag
            v-for="(tag,index) in tags"
            :key="tag.name"
            :closable="tag.name !== 'home'"
            :id="`scroll-li-${index}`"
            :effect="$route.name === tag.name ? 'dark' : 'plain' "
            @click="handleMenu(tag)"
            @close="handleClose(tag, index)"
            >
            {{ tag.label }}
            </el-tag>
        </div>
    </div>
    <!-- <div class="right">
        <el-dropdown @command="closeTags">
        <el-icon class="btn">
            <ArrowDown />
        </el-icon>

        <template #dropdown>
            <el-dropdown-menu>
            <el-dropdown-item command="left">
                <span>關閉左側</span>
            </el-dropdown-item>
            <el-dropdown-item command="right">
                <span>關閉右側</span>
            </el-dropdown-item>
            <el-dropdown-item command="other">
                <span>關閉其他</span>
            </el-dropdown-item>
            <el-dropdown-item command="all">
                <span>關閉全部</span>
            </el-dropdown-item>
            </el-dropdown-menu>
        </template>
        </el-dropdown>
    </div> -->
</template>

<script setup>
    import  { ref, computed, onMounted, nextTick } from 'vue'
    import { useRoute,useRouter } from 'vue-router'
    import { useAllDateStore } from '@/stores'
    import { breadcrumbKey, ElMessage } from 'element-plus';
    const store = useAllDateStore()
    const tags = computed(()=>store.state.tags)
    const route = useRoute()
    const router = useRouter()
    const { currentRoute } = router
    const translateX = ref(0)
    const transition = ref('transform 0.3s ease')
    const scrollRef = ref(null)
    const tagsRef = ref(null)

    let isMessageShow = ref(false)
    let startX = 0
    let currentX = 0

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

    const closeTags = (command) => {
        const currentRoute = route.name
        let currentTags = [...store.state.tags]
        switch (command) {
            case 'left':
                const leftTag = currentTags.find(tag => tag.name === currentTags[0].name)
                if (leftTag) {
                    store.updateTags(leftTag)
                }
                break
            case 'right':
                const rightTag = currentTags.find(tag => tag.name === currentTags[currentTags.length -1].name)
                if (rightTag){
                    store.updateTags(rightTag)
                }
                break
            case 'other':
                currentTags.forEach(tag=>{
                    if(tag.name !== currentRoute ){
                        store.updateTags(tag)
                    }
                })
                break
            case 'all':
                currentTags.forEach(tag => store.updateTags(tag))
                break
        }
    }

    const listenerScroll = () => {
        if (tagsRef.value && scrollRef.value) {
            tagsRef.value.addEventListener('wheel', (event) => {
                event.preventDefault()
                if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
                    return
                }
                const xMin = scrollRef.value.offsetWidth - tagsRef.value.offsetWidth
                const xMax = 0
                const scale = 100
                console.log('xMin',xMin)
                console.log('tagsRef.value.offsetWidth',tagsRef.value.offsetWidth)
                console.log('scrollRef.value.offsetWidth',scrollRef.value.offsetWidth)
                if (tagsRef.value.offsetWidth > scrollRef.value.offsetWidth) {
                    translateX.value = Math.min(Math.max(translateX.value - event.deltaX * scale, xMin), xMax);
                    console.log('translateX',translateX.value)
                }
            }, { passive: false })
        }
    };


    const getCurTabIndex = () => {
        return tags.value.findIndex((tag) => tag.path === currentRoute.value.path)
    }
    const getCurTabEl = () => {
        return document.getElementById(`scroll-li-${getCurTabIndex()}`)
    }

    const worktabAutoPosition = () => {
        if (!scrollRef.value || !tagsRef.value) return

        const scrollWidth = scrollRef.value.offsetWidth
        const ulWidth = tagsRef.value.offsetWidth
        const curTabEl = getCurTabEl()

        if (!curTabEl) return

        const { offsetLeft, clientWidth } = curTabEl
        const curTabRight = offsetLeft + clientWidth
        const targetLeft = scrollWidth - curTabRight

        if (
            (offsetLeft > Math.abs(translateX.value) && curTabRight <= scrollWidth) ||
            (translateX.value < targetLeft && targetLeft < 0)
        ) return;

        requestAnimationFrame(() => {
            if (curTabRight > scrollWidth) {
                translateX.value = Math.max(targetLeft - 6, scrollWidth - ulWidth)
            } else if (offsetLeft < Math.abs(translateX.value)) {
                translateX.value = -offsetLeft
            }
        })
    }

    onMounted(() => {
        listenerScroll()
        worktabAutoPosition()
    })
</script > 
<style lang="less" scoped >
    .tags-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        overflow-x: hidden;
    }

    .tags {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        transition: transform 0.3s ease;
        width: max-content;
    }

    .el-tag {
        margin-right: 10px;
        white-space: nowrap;
    }

    .right {
        margin-left: auto;
        display: flex;
        align-items: center;
    }

</style>