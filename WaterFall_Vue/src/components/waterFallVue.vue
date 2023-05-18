<!-- 瀑布流实现思路 -->
<!-- 
    1.确定列数，并排满一列，同时记录每一列当前的height到heightList中
    2.第一列排满后，根据heightList记录的height找到最短的一列，并记录height以及index，
      根据父组件传来的瀑布列表在最短的瀑布下添加新瀑布
    3.循环找最短的 重复2
 -->
<template>
  <div class="wraps">
    <div
      :style="{
        height: item.height + 'px',
        background: item.background,
        top: item.top + 'px',
        left: item.left + 'px',
      }"
      v-for="item in waterList"
      :key="item"
      class="items"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
// 父组件传来的列表数据
const props = defineProps<{
  list: any[];
}>();
// 根据父组件传来的列表生成的新的瀑布列表，子组件遍历此列表并渲染
const waterList = reactive<any[]>([]);
const init = () => {
  const heightList: any[] = [];
  const width = 130;
  const x = document.body.clientWidth;
  const column = Math.floor(x / width);

  for (let i = 0; i < props.list.length; i++) {
    if (i < column) {
      // 渲染第一列
      // 父组件传来的列表长度小于上面定义的列数就
      props.list[i].top = 10;
      props.list[i].left = i * width;
      heightList.push(props.list[i].height + 10);
      waterList.push(props.list[i]);
    } else {
      // 循环找高度最小的一列，在高度最小的一列后面追加新瀑布
      let current = heightList[0];
      let index = 0;
      // 遍历heightList找到高度最小的列并存储高度以及索引值
      heightList.forEach((h, inx) => {
        if (current > h) {
          current = h;
          index = inx;
        }
      });
      // console.log(current, "c");
      props.list[i].top = current + 20;
      // console.log(props.list[i].top, "top", i);
      props.list[i].left = index * width;
      heightList[index] = heightList[index] + props.list[i].height + 20;
      waterList.push(props.list[i]);
    }
  }
  // console.log(props.list);
};

onMounted(() => {
  window.onresize = () => init();
  init();
});
</script>

<style lang="scss" scoped>
.wraps {
  position: relative;
  height: 100%;
  .items {
    position: absolute;
    width: 120px;
  }
}
</style>
