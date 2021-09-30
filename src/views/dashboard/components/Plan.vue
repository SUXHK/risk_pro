<template>
  <el-card shadow="hover" class="jihua">
    <template #header>
      <!-- <vab-icon icon="vab" /> -->

      <i class="el-icon-warning-outline" style="margin-right:5px"></i>
      进度查询
    </template>
    <el-table :data="tableData" row-key="title" height="249px">
      <el-table-column align="center" label="拖拽" width="50px">
        <template #default="{}">
          <vab-icon
            style="cursor: pointer"
            :icon="['fas', 'arrows-alt']"
          ></vab-icon>
        </template>
      </el-table-column>
      <el-table-column width="20px" />
      <el-table-column prop="title" label="目标" width="230px" />
      <el-table-column label="进度" width="220px">
        <template #default="{ row }">
          <el-progress :percentage="row.percentage" :color="row.color" />
        </template>
      </el-table-column>
      <el-table-column width="50px" />
      <el-table-column prop="endTIme" label="完成时间" />
    </el-table>
  </el-card>
</template>
<script>
import Sortable from 'sortablejs'
export default {
  data() {
    return {
      tableData: [
        {
          title: '定个小目标，赚他十个亿',
          endTIme: '2021-12-31',
          percentage: 50,
          color: '#95de64'
        },
        {
          title: '再定个小目标，赚他一百个亿',
          endTIme: '2022-12-31',
          percentage: 8,
          color: '#69c0ff'
        },
        {
          title: '任务 3 ',
          endTIme: '2021-12-31',
          percentage: 76,
          color: '#1890FF'
        },
        {
          title: '任务 4 ',
          endTIme: '2020-03-31',
          percentage: 100,
          color: '#ffc069'
        },
        {
          title: '任务 5 ',
          endTIme: '2094-12-16',
          percentage: 25,
          color: '#5cdbd3'
        },
        {
          title: '任务 6 ',
          endTIme: '2094-12-16',
          percentage: 1,
          color: '#b37feb'
        },
        {
          title: '任务 7 ',
          endTIme: '2099-12-31',
          percentage: 44,
          color: '#95de64'
        },
        {
          title: '任务 8 ',
          endTIme: '2099-12-31',
          percentage: 33,
          color: '#95de64'
        }
      ]
    }
  },
  mounted() {
    const tbody = document.querySelector('.el-table__body-wrapper tbody')
    const _this = this
    Sortable.create(tbody, {
      onEnd({ newIndex, oldIndex }) {
        const currRow = _this.tableData.splice(oldIndex, 1)[0]
        _this.tableData.splice(newIndex, 0, currRow)
      }
    })
  }
}
</script>
