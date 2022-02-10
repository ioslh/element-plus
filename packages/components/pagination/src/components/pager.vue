<template>
  <ul :class="[ns.e('pager')]">
    <li v-if="showPrev">
      <span v-if="prevText">{{ prevText }}</span>
      <el-icon v-else><arrow-left /></el-icon>
    </li>
    <li
      class="number"
      :class="{ active: currentPage === 1 }"
      @click="goPage(1)"
    >
      1
    </li>
    <li v-if="showQuickPrev" class="el-icon btn-quickjump btn-quickprev">
      <d-arrow-left />
      <more-filled />
    </li>
    <li
      v-for="p in pagers"
      :key="`number-${p}`"
      class="number"
      :class="{ active: currentPage === p }"
      @click="goPage(p)"
    >
      {{ p }}
    </li>
    <li v-if="showQuickNext" class="el-icon btn-quickjump btn-quicknext">
      <d-arrow-right />
      <more-filled />
    </li>
    <li
      v-if="pageCount > 1"
      class="number"
      :class="{ active: currentPage === pageCount }"
      @click="goPage(pageCount)"
    >
      {{ pageCount }}
    </li>
    <li v-if="showNext">
      <span v-if="nextText">{{ nextText }}</span>
      <el-icon v-else><arrow-right /></el-icon>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useNamespace } from '@element-plus/hooks'
import { ElIcon } from '@element-plus/components/icon'
import {
  ArrowLeft,
  ArrowRight,
  MoreFilled,
  DArrowLeft,
  DArrowRight,
} from '@element-plus/icons-vue'

const paginationPagerProps = {
  currentPage: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  pagerCount: {
    type: Number,
    required: true,
  },
  prevText: {
    type: String,
    required: true,
  },
  nextText: {
    type: String,
    required: true,
  },
  disabled: Boolean,
} as const

export default defineComponent({
  name: 'ElPaginationPager',
  components: {
    ElIcon,
    ArrowLeft,
    ArrowRight,
    MoreFilled,
    DArrowLeft,
    DArrowRight,
  },
  props: paginationPagerProps,
  emits: ['change'],
  setup(props, { emit }) {
    const ns = useNamespace('pagination')
    const showPrev = ref(true)
    const showNext = ref(true)

    const showQuickPrev = ref(true)
    const showQuickNext = ref(true)

    const goPage = (n: number) => {
      emit('change', n)
    }

    const pagers = computed(() => {
      const ret: number[] = []
      if (props.pagerCount >= props.pageCount) {
        if (props.pageCount > 2) {
          for (let i = 2; i < props.pageCount; i++) {
            ret.push(i)
          }
        }
        return ret
      }
      return ret
    })
    return {
      ns,
      showPrev,
      showNext,
      showQuickPrev,
      showQuickNext,
      pagers,

      goPage,
    }
  },
})
</script>

<style lang="scss" scoped></style>
