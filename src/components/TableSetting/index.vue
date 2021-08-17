<template>
  <div class="clearfix">
    <div class="header-name" v-if="this.$store.getters.device === 'desktop'">
      {{ tableParams.headerTitle }}
    </div>

    <div style="display:flex;">
      <el-button plain icon="el-icon-refresh" size="mini" @click="refreshTable">
        刷新表格
      </el-button>
      <el-dropdown trigger="click" :hide-on-click="true" style="margin:0 10px">
        <el-button plain size="mini">
          <i class="el-icon-s-tools el-icon--left"></i>
          表格设置
        </el-button>
        <el-dropdown-menu slot="dropdown" divided>
          <el-dropdown-item
            ><el-checkbox
              :value="tableSettings.stripeChecked"
              @change="
                changeTableSettings($event, 'stripeChecked', '表格斑马纹')
              "
              >表格斑马纹</el-checkbox
            ></el-dropdown-item
          >
          <el-dropdown-item
            ><el-checkbox
              :value="tableSettings.borderChecked"
              @change="
                changeTableSettings(
                  $event,
                  'borderChecked',
                  '表格边框（可拉伸）'
                )
              "
              >表格边框（可拉伸）</el-checkbox
            ></el-dropdown-item
          >
          <el-dropdown-item
            ><el-checkbox
              :value="tableSettings.fixedChecked"
              @change="
                changeTableSettings(
                  $event,
                  'fixedChecked',
                  '表格固定列（适用于宽表格）'
                )
              "
              >表格固定列（适用于宽表格）</el-checkbox
            ></el-dropdown-item
          >

          <el-dropdown-item divided v-if="!tableParams.full">
            <!-- :value="tableSettings.normalFullFlag" -->
            <el-checkbox
              :value="tableParams.normalFullFlag"
              @change="normalFullFlagChanged($event, '表格固定高')"
              >表格固定高</el-checkbox
            ></el-dropdown-item
          >
          <el-dropdown-item divided>
            <el-radio
              @change="
                changeTableSettings('medium', 'tableSize', '表格大小 - 大')
              "
              :value="tableSettings.tableSize"
              label="medium"
              >大</el-radio
            >
            <el-radio
              @change="
                changeTableSettings('small', 'tableSize', '表格大小 - 中')
              "
              :value="tableSettings.tableSize"
              label="small"
              >中</el-radio
            ><el-radio
              @change="
                changeTableSettings('mini', 'tableSize', '表格大小 - 小')
              "
              :value="tableSettings.tableSize"
              label="mini"
              >小</el-radio
            >
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-button
        type="primary"
        plain
        class="exportquery"
        size="mini"
        @click="exportExcel"
        v-if="tableParams.queryExcel"
        :disabled="tableParams.isExportDisabled"
        ><svg-icon icon-class="Excel" class="svg el-icon--left"></svg-icon>
        导出Excel - 查询</el-button
      >

      <!-- <transition name="fade" mode="out-in" > -->
      <span style="margin-right:10px" v-else>
        <el-popconfirm
          confirm-button-text="好的"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="导出全部数据，这可能会有一段漫长的等待，是否继续？"
          @confirm="exportExcelConfirm"
        >
          <el-button
            size="mini"
            slot="reference"
            plain
            :disabled="tableParams.isExportDisabled"
            ><svg-icon icon-class="Excel" class="svg el-icon--left"></svg-icon>
            导出Excel - 全部</el-button
          >
        </el-popconfirm>
      </span>
      <!-- </transition> -->
      <el-button
        size="mini"
        @click="changeFull"
        plain
        icon="el-icon-full-screen"
      >
        {{ tableParams.full ? '退出全屏' : '表格全屏' }}
      </el-button>
    </div>
  </div>
</template>

<script>
import objToURL from '@/utils/obj-url'
export default {
  inject: ['reload'],
  name: 'tableSettings',
  props: {
    // table参数项
    tableParams: {
      type: Object,
      default() {
        return {
          // 表Title
          headerTitle: {
            type: String,
            default: '风控管理系统 - xxx业务'
          },
          // 查询后的导出按钮
          queryExcel: {
            type: Boolean,
            default: false
          },
          // 导入导出是否禁用
          isExportDisabled: {
            type: Boolean,
            default: false
          },
          // table全屏状态
          full: {
            type: Boolean,
            default: false
          },
          // 业务标识
          bizAlias: {
            type: String,
            default: ''
          },
          // 便于下载使用的表单
          exportQueryForm: Object,
          // 是否固定表格高度
          normalFullFlag: {
            type: Boolean,
            default: true
          }
        }
      }
    },
    // table设置项
    tableSettings: {
      type: Object,
      default() {
        return {
          borderChecked: {
            type: Boolean,
            default: false
          },
          stripeChecked: {
            type: Boolean,
            default: false
          },
          tableSize: {
            type: String,
            default: 'medium'
          },
          fixedChecked: {
            type: Boolean,
            default: false
          }
        }
      }
    },
    // 表格固定高
    normalFull: {
      type: String,
      default: ''
    }
  },

  methods: {
    // 表格设置
    changeTableSettings(e, n, c) {
      // console.log(e)
      this.$store.dispatch('settings/changeTableSettings', {
        key: n,
        value: e
      })
      if (e) {
        this.$message.success(c + ' 设置成功！')
      } else {
        this.$message.success(c + ' 取消设置成功！')
      }
    },
    // 刷新表格
    refreshTable() {
      // this.changeTableSettings(true, 'normalFullFlag')

      this.reload()
    },
    // 导出查询后excel
    exportExcel() {
      console.log(this.tableParams.exportQueryForm)
      console.log(
        `/rs-mgr/biz/${this.tableParams.bizAlias}/export?${objToURL.queryParams(
          this.tableParams.exportQueryForm
        )}`
      )
      window.open(
        `/rs-mgr/biz/${this.tableParams.bizAlias}/export?${objToURL.queryParams(
          this.tableParams.exportQueryForm
        )}`
      )
    },
    // 导出全部excel
    exportExcelConfirm() {
      window.open(`/rs-mgr/biz/${this.tableParams.bizAlias}/export`)
    },
    // 表格全屏切换按钮
    changeFull() {
      this.$emit('changeFull')
    },
    normalFullFlagChanged(e, c) {
      this.$emit('normalFullFlagChanged', e)
      if (e) {
        this.$message.success(c + ' 设置成功！')
      } else {
        this.$message.success(c + ' 取消设置成功！')
      }
    }
  }
}
</script>

<style lang="scss">
.el-card__header {
  padding: 0 20px !important;
  .clearfix {
    display: flex;
    height: 50px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    .header-name {
      font-size: 20px;
      font-weight: 600;
      color: #000;
      overflow: hidden;
    }
  }
}

.exportquery {
  animation: tada 1000ms both;
}

@keyframes tada {
  from {
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}
</style>
