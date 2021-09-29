<template>
  <el-card class="card-sys-notop" :class="pageParams.full ? 'fullScreen' : ''">
    <div slot="header" class="clearfix">
      <div class="header-name">{{ pageParams.headerTitle }}</div>
      <div class="header-action">
        <el-button
          plain
          icon="el-icon-refresh"
          size="mini"
          @click="refreshTable"
        >
          刷新表格
        </el-button>
        <el-button
          size="mini"
          @click="changeFull"
          :plain="!pageParams.full"
          :icon="
            pageParams.full ? 'el-icon-switch-button' : 'el-icon-full-screen'
          "
          :type="pageParams.full ? 'primary' : ''"
        >
          {{ pageParams.full ? '退出全屏' : '表格全屏' }}
        </el-button>
      </div>
    </div>
    <el-tabs
      v-model="pageParams.activeTabs"
      @tab-click="tabsClick"
      class="tabs-role"
    >
      <el-tab-pane label="角色 - 分配设置" name="staff">
        <el-row :gutter="0">
          <el-col :span="6">
            <el-card class="tree-card clear" shadow="never">
              <div slot="header" style="padding:23px 0px 24px 0">
                <span style="font-weight: bold;">角色列表</span>

                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  icon="el-icon-refresh "
                  @click="getStaffRet"
                  >刷新</el-button
                >
                <el-button
                  v-if="staffRoleTreeList.length <= 0"
                  style="float: right; padding: 3px 10px"
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="appendNoData"
                  >添加角色</el-button
                >
              </div>
              <el-input
                style="margin-bottom:20px"
                placeholder="搜索角色"
                v-model="filterText"
                size="middle"
                prefix-icon="el-icon-search"
                clearable
              >
              </el-input>

              <el-skeleton
                :loading="treeTableLoading"
                animated
                :rows="7"
                :style="{
                  height: !pageParams.full
                    ? 'calc(100vh - 412px)'
                    : 'calc(100vh - 290px)'
                }"
              >
                <template slot="template">
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" style="width: 50%;" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" style="width: 50%;" />
                  </div>
                </template>
                <template>
                  <div style="overflow-x: hidden">
                    <el-tree
                      class="custom-tree"
                      node-key="id"
                      :current-node-key="0"
                      :expand-on-click-node="false"
                      highlight-current
                      :data="staffRoleTreeList"
                      :props="defaultProps"
                      @node-click="handleNodeClick"
                      :filter-node-method="filterNode"
                      ref="roletree"
                      default-expand-all
                      :style="{
                        height: !pageParams.full
                          ? 'calc(100vh - 412px)'
                          : 'calc(100vh - 290px)'
                      }"
                    >
                      <!-- :render-content="renderContent" -->
                      <span
                        class="custom-tree-node"
                        slot-scope="{ node, data }"
                      >
                        <span
                          class="queryForm-one-txt-cut"
                          v-if="
                            !treeControl.isEditTreeNode ||
                              node.id !== treeControl.nodeId
                          "
                          >{{ node.label | ellipsis(15) }}</span
                        >

                        <el-input
                          @keyup.enter.native="editConfirm(node, data)"
                          clearable
                          :placeholder="data.name"
                          @click.stop.native
                          v-if="
                            treeControl.isEditTreeNode &&
                              node.id === treeControl.nodeId
                          "
                          v-model.trim="treeControl.content"
                          size="medium"
                          ><i
                            slot="prefix"
                            class="el-input__icon el-icon-edit"
                          ></i
                        ></el-input>
                        <span>
                          <svg-icon
                            v-if="
                              (!treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId) &&
                                data.id !== 0
                            "
                            title="添加下级"
                            icon-class="queue_black_24dp"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => append(data)"
                          ></svg-icon>
                          <svg-icon
                            v-if="
                              (!treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId) &&
                                data.id !== 0
                            "
                            title="编辑"
                            icon-class="edit-2-fill"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => edit(node, data)"
                          ></svg-icon>

                          <svg-icon
                            v-if="
                              (!treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId) &&
                                data.id !== 0
                            "
                            title="删除"
                            @click.stop="() => remove(node, data)"
                            icon-class="delete_black_24dp"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                          ></svg-icon>

                          <svg-icon
                            v-if="
                              treeControl.isEditTreeNode &&
                                node.id === treeControl.nodeId
                            "
                            title="确定"
                            icon-class="check_circle_black_24dp"
                            class="el-button--text"
                            style="font-size:20px;color: $base-color-default;margin:0 5px 0 10px;vertical-align:text-bottom;"
                            @click.stop="() => editConfirm(node, data)"
                          ></svg-icon>

                          <svg-icon
                            v-if="
                              treeControl.isEditTreeNode &&
                                node.id === treeControl.nodeId
                            "
                            title="取消"
                            icon-class="cancel_black_24dp"
                            style="font-size:20px;color: red; margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => editCancel(node, data)"
                          ></svg-icon>
                          <!-- icon-class="close_black_24dp" -->
                          <!-- <el-button
                          type="text"
                          size="mini"
                          @click.stop="() => append(data)"
                        >
                          添加下级
                        </el-button>
                        <el-button
                          type="text"
                          size="mini"
                          @click.stop="() => edit(data)"
                        >
                          编辑
                        </el-button>
                        <el-button
                          type="text"
                          size="mini"
                          @click.stop="() => remove(node, data)"
                        >
                          删除
                        </el-button> -->
                        </span>
                      </span>
                    </el-tree>
                  </div>
                </template>
              </el-skeleton>
            </el-card>
          </el-col>
          <el-col :span="18">
            <el-card class="table-card" shadow="never">
              <div slot="header">
                <el-form
                  ref="elForm"
                  :model="formData"
                  :rules="rules"
                  size="small"
                  class="mgrform"
                  label-width="90px"
                  style="display: flex;flex-direction: row;flex-wrap: nowrap;align-content: center;justify-content: space-between;align-items: center;"
                >
                  <div style="display:flex">
                    <el-form-item label="员工名称：" prop="username">
                      <el-input
                        v-model="formData.username"
                        placeholder="请输入员工名称或账户"
                        clearable
                        :style="{ width: '100%' }"
                      >
                      </el-input>
                    </el-form-item>
                    <!-- style="width: 35%" -->
                    <!-- <el-form-item
                      label="日期："
                      prop="time"
                      label-width="90px"
                      style="width: 38%"
                    >
                      <el-date-picker
                        type="daterange"
                        v-model="formData.time"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :style="{ width: '100%' }"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="-"
                        clearable
                      >
                      </el-date-picker>
                    </el-form-item> -->
                    <el-form-item label-width="20px">
                      <el-button
                        type="primary"
                        icon="el-icon-search"
                        size="small"
                        @click="submitForm"
                      >
                        查 询
                      </el-button>
                    </el-form-item>
                    <!-- </el-col>
                  <el-col :span="4"> -->
                    <el-form-item label-width="20px">
                      <el-button
                        type="warning"
                        icon="el-icon-refresh-right"
                        size="small"
                        @click="resetForm('elForm')"
                      >
                        重 置
                      </el-button>
                    </el-form-item>
                  </div>
                  <!-- <div style="display:flex">
                    <el-form-item label-width="10px"
                      ><el-button
                        type="primary"
                        icon="el-icon-circle-plus"
                        size="small"
                        @click="userControl('add')"
                      >
                        添加员工
                      </el-button></el-form-item
                    >
                  </div> -->
                </el-form>
              </div>
              <el-table
                ref="multipleTable"
                :size="tableSettings.tableSize"
                :border="tableSettings.borderChecked"
                :stripe="tableSettings.stripeChecked"
                :data="tableData"
                :height="
                  !pageParams.full ? pageParams.normalFull : pageParams.fullFull
                "
                :header-cell-style="{
                  background: pageParams.full ? '#e7eaff' : '',
                  color: '#909399'
                }"
                v-loading="tableLoading"
                element-loading-text="表格加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="#fff"
                highlight-current-row
                tooltip-effect="dark"
                style="width: 100%"
              >
                <el-table-column type="index" label="No." width="60">
                </el-table-column>
                <el-table-column prop="account" width="150" label="账号">
                </el-table-column>
                <el-table-column prop="name" width="150" label="用户名">
                </el-table-column>

                <el-table-column prop="deptName" width="150" label="部门">
                </el-table-column>
                <!-- <af-table-column prop="deptid" label="deptid" align="center">
                </af-table-column> -->
                <el-table-column prop="sexName" width="60" label="性别">
                  <template slot-scope="scope">
                    <svg-icon
                      title="男"
                      style="color:#1890FF"
                      icon-class="men-line"
                      v-if="scope.row.sex === 1"
                    ></svg-icon>
                    <svg-icon
                      title="女"
                      style="color:#F5222D"
                      icon-class="women-line"
                      v-else-if="scope.row.sex === 2"
                    ></svg-icon>
                    <svg-icon
                      title="未知"
                      icon-class="question-mark"
                      v-else
                    ></svg-icon>
                  </template>
                </el-table-column>

                <el-table-column prop="email" width="220" label="e-Mail">
                </el-table-column>

                <el-table-column prop="phone" width="150" label="手机号">
                </el-table-column>
                <!-- <af-table-column
                  prop="roleName"
                  label="roleName"
                  align="center"
                >
                </af-table-column> -->
                <el-table-column prop="roleIds" width="150" label="roleIds">
                </el-table-column>
                <el-table-column prop="birthday" width="150" label="生日">
                </el-table-column>
                <el-table-column
                  prop="statusName"
                  label="状态"
                  width="60"
                  fixed="right"
                >
                  <template slot-scope="scope">
                    <el-tag size="small" v-if="scope.row.status === 1">{{
                      scope.row.statusName
                    }}</el-tag>
                    <el-tag
                      type="danger"
                      size="small"
                      v-if="scope.row.status === 2"
                      >{{ scope.row.statusName }}</el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right">
                  <template slot-scope="scope">
                    <!-- <el-button
                      type="text"
                      size="small"
                      @click="userControl('delete', scope.row)"
                    >
                      删除
                    </el-button> -->
                    <el-button
                      type="text"
                      size="small"
                      @click="userControl('editRole', scope.row)"
                      ><svg-icon
                        title="角色分配"
                        icon-class="how_to_reg_black_24dp"
                        style="font-size:15px"
                      ></svg-icon>
                      角色分配
                    </el-button>
                    <template v-if="scope.row.status === 1">
                      <el-divider direction="vertical"></el-divider>
                      <el-button
                        type="text"
                        size="small"
                        @click="userControl('freeze', scope.row)"
                        ><svg-icon
                          title="停用"
                          icon-class="do_disturb_on_black_24dp"
                        ></svg-icon>
                        停用
                      </el-button>
                    </template>

                    <template v-else>
                      <el-divider direction="vertical"></el-divider>
                      <el-button
                        type="text"
                        size="small"
                        @click="userControl('unfreeze', scope.row)"
                        ><svg-icon
                          title="启用"
                          style="font-size:15px"
                          icon-class="play_arrow_black_24dp"
                        ></svg-icon>
                        启用
                      </el-button>
                    </template>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="角色 - URL权限设置" name="role">
        <el-row :gutter="0">
          <el-col :span="6">
            <el-card class="tree-card clear" shadow="never">
              <div slot="header" style="padding:23px 0px 24px 0;">
                <span style="font-weight: bold;">角色列表</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  icon="el-icon-refresh "
                  @click="getRoleTree"
                  >刷新</el-button
                >
                <el-button
                  v-if="roleRoleTreeList.length <= 0"
                  style="float: right; padding: 3px 10px"
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="appendNoData"
                  >添加角色</el-button
                >
              </div>
              <el-input
                style="margin-bottom:20px"
                placeholder="搜索角色"
                v-model="filterText"
                size="middle"
                prefix-icon="el-icon-search"
                clearable
              >
              </el-input>

              <el-skeleton
                :loading="treeTableLoading"
                animated
                :rows="7"
                :style="{
                  height: !pageParams.full
                    ? 'calc(100vh - 412px)'
                    : 'calc(100vh - 290px)'
                }"
              >
                <template slot="template">
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" style="width: 50%;" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" style="width: 50%;" />
                  </div>
                </template>
                <template>
                  <div style="overflow-x: hidden">
                    <!-- <div style="overflow-x: hidden"> -->
                    <el-tree
                      class="custom-tree"
                      node-key="id"
                      :current-node-key="1"
                      :expand-on-click-node="false"
                      highlight-current
                      :data="roleRoleTreeList"
                      :props="defaultProps"
                      @node-click="roleHandleNodeClick"
                      :filter-node-method="filterNode"
                      ref="roletree"
                      default-expand-all
                      :style="{
                        height: !pageParams.full
                          ? 'calc(100vh - 412px)'
                          : 'calc(100vh - 290px)'
                      }"
                    >
                      <!-- :render-content="renderContent" -->
                      <span
                        class="custom-tree-node"
                        slot-scope="{ node, data }"
                      >
                        <span
                          class="queryForm-one-txt-cut"
                          v-if="
                            !treeControl.isEditTreeNode ||
                              node.id !== treeControl.nodeId
                          "
                          >{{ node.label | ellipsis(15) }}</span
                        >

                        <el-input
                          @keyup.enter.native="editConfirm(node, data)"
                          clearable
                          :placeholder="data.name"
                          @click.stop.native
                          v-if="
                            treeControl.isEditTreeNode &&
                              node.id === treeControl.nodeId
                          "
                          v-model.trim="treeControl.content"
                          size="medium"
                          ><i
                            slot="prefix"
                            class="el-input__icon el-icon-edit"
                          ></i
                        ></el-input>
                        <span>
                          <svg-icon
                            v-if="
                              !treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId
                            "
                            title="添加下级"
                            icon-class="queue_black_24dp"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => append(data)"
                          ></svg-icon>

                          <svg-icon
                            v-if="
                              !treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId
                            "
                            title="编辑"
                            icon-class="edit-2-fill"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => edit(node, data)"
                          ></svg-icon>
                          <svg-icon
                            v-if="
                              !treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId
                            "
                            title="删除"
                            icon-class="delete_black_24dp"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => remove(node, data)"
                          ></svg-icon>
                          <svg-icon
                            v-if="
                              treeControl.isEditTreeNode &&
                                node.id === treeControl.nodeId
                            "
                            title="确定"
                            icon-class="check_circle_black_24dp"
                            class="el-button--text"
                            style="font-size:20px;color: $base-color-default;margin:0 5px 0 10px;vertical-align:text-bottom;"
                            @click.stop="() => editConfirm(node, data)"
                          ></svg-icon>
                          <svg-icon
                            v-if="
                              treeControl.isEditTreeNode &&
                                node.id === treeControl.nodeId
                            "
                            title="取消"
                            icon-class="cancel_black_24dp"
                            style="font-size:20px;color: red; margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => editCancel(node, data)"
                          ></svg-icon>
                          <!-- icon-class="close_black_24dp" -->
                          <!-- <el-button
                          type="text"
                          size="mini"
                          @click.stop="() => append(data)"
                        >
                          添加下级
                        </el-button>
                        <el-button
                          type="text"
                          size="mini"
                          @click.stop="() => edit(data)"
                        >
                          编辑
                        </el-button>
                        <el-button
                          type="text"
                          size="mini"
                          @click.stop="() => remove(node, data)"
                        >
                          删除
                        </el-button> -->
                        </span>
                      </span>
                    </el-tree>
                  </div>
                  <!-- </el-scrollbar> -->
                </template>
              </el-skeleton>
            </el-card>
          </el-col>
          <el-col :span="18">
            <el-card class="table-card clear" shadow="never">
              <!-- style="height: calc(100vh - 247px);" -->
              <!-- 125px -->
              <div slot="header" style="height: 63px;">
                <div
                  style="display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;"
                >
                  <div>
                    <span
                      style="font-weight: bold;font-size:14px;line-height: 63px"
                      >当前角色：</span
                    >
                    <span style="line-height: 63px;margin-left:5px">{{
                      treeControl.currentRoleName
                    }}</span>
                    <el-popover
                      placement="bottom"
                      title="角色权限设置 - 帮助"
                      trigger="click"
                      width="200"
                    >
                      <br />
                      <div>
                        选中所需的权限，点击应用即可
                      </div>
                      <br />
                      <svg-icon
                        slot="reference"
                        title="角色管理 - 角色权限设置 - 帮助"
                        icon-class="question-fill"
                        class="el-button--text"
                        style="margin-left:12px;cursor: pointer;font-size:16px"
                      ></svg-icon>
                    </el-popover>
                  </div>
                  <div>
                    <el-button
                      type="primary"
                      icon="el-icon-check"
                      size="small"
                      style="margin-left: 20px;"
                      @click="useRole"
                      :loading="useBtnLoading"
                      >应 用</el-button
                    >
                    <el-button
                      type="warning"
                      icon="el-icon-refresh-right"
                      size="small"
                      style="margin-left: 20px;"
                      @click="getDefKeys(roleNodeClickId)"
                      >重 置</el-button
                    >
                  </div>
                </div>
              </div>
              <!-- 树形控件 -->
              <div
                style="display: flex;
    flex-flow: row nowrap;
    place-content: center flex-start;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-start;"
              >
                <div style="overflow-x: hidden;width:50%">
                  <el-skeleton
                    :loading="treeRoleTableLoading"
                    animated
                    :rows="7"
                    :style="{
                      height: !pageParams.full
                        ? 'calc(100vh - 312px)'
                        : 'calc(100vh - 190px)'
                    }"
                  >
                    <template slot="template">
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" style="width: 50%;" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" style="width: 50%;" />
                      </div>
                    </template>
                    <template>
                      <el-tree
                        :data="treeEditData"
                        :props="treeEditProps"
                        show-checkbox
                        node-key="id"
                        default-expand-all
                        highlight-current
                        check-on-click-node
                        check-strictly
                        icon-class="el-icon-arrow-right"
                        :default-checked-keys="defKeys"
                        ref="treeEditRef"
                        :style="{
                          height: !pageParams.full
                            ? 'calc(100vh - 312px)'
                            : 'calc(100vh - 190px)'
                        }"
                      >
                        <span
                          class="custom-tree-node"
                          slot-scope="{ node, data }"
                        >
                          <!-- <span> -->
                          <template>
                            {{ node.label }}
                            <span v-if="data.levels === 1">
                              <el-badge value="一级菜单" class="item">
                              </el-badge>
                            </span>
                            <span v-else-if="data.levels === 2">
                              <el-badge
                                value="二级菜单"
                                class="item"
                                type="primary"
                              >
                              </el-badge>
                            </span>
                            <span v-else>
                              <el-badge
                                value="按钮"
                                class="item"
                                type="success"
                              >
                              </el-badge>
                            </span>
                          </template>
                        </span>
                      </el-tree>
                    </template>
                  </el-skeleton>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="角色 - 数据查看权限" name="data">
        <el-row :gutter="0">
          <el-col :span="6">
            <el-card class="tree-card clear" shadow="never">
              <div slot="header" style="padding:23px 0px 24px 0;">
                <span style="font-weight: bold;">角色列表</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  icon="el-icon-refresh "
                  @click="getRutDataTree"
                  >刷新</el-button
                >
                <el-button
                  v-if="dataTreeList.length <= 0"
                  style="float: right; padding: 3px 10px"
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="appendNoData"
                  >添加角色</el-button
                >
              </div>
              <el-input
                style="margin-bottom:20px"
                placeholder="搜索角色"
                v-model="filterText"
                size="middle"
                prefix-icon="el-icon-search"
                clearable
              >
              </el-input>

              <el-skeleton
                :loading="dataZuoLoading"
                animated
                :rows="7"
                :style="{
                  height: !pageParams.full
                    ? 'calc(100vh - 412px)'
                    : 'calc(100vh - 290px)'
                }"
              >
                <template slot="template">
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" style="width: 50%;" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" />
                  </div>
                  <div style="padding: 15px 0;">
                    <el-skeleton-item variant="h1" style="width: 50%;" />
                  </div>
                </template>
                <template>
                  <div style="overflow-x: hidden">
                    <!-- <div style="overflow-x: hidden"> -->
                    <el-tree
                      class="custom-tree"
                      node-key="id"
                      :current-node-key="1"
                      :expand-on-click-node="false"
                      highlight-current
                      :data="dataTreeList"
                      :props="defaultProps"
                      @node-click="dataHandleNodeClick"
                      :filter-node-method="filterNode"
                      ref="roletree"
                      default-expand-all
                      :style="{
                        height: !pageParams.full
                          ? 'calc(100vh - 412px)'
                          : 'calc(100vh - 290px)'
                      }"
                    >
                      <!-- :render-content="renderContent" -->
                      <span
                        class="custom-tree-node"
                        slot-scope="{ node, data }"
                      >
                        <span
                          class="queryForm-one-txt-cut"
                          v-if="
                            !treeControl.isEditTreeNode ||
                              node.id !== treeControl.nodeId
                          "
                          >{{ node.label | ellipsis(15) }}</span
                        >

                        <el-input
                          @keyup.enter.native="editConfirm(node, data)"
                          clearable
                          :placeholder="data.name"
                          @click.stop.native
                          v-if="
                            treeControl.isEditTreeNode &&
                              node.id === treeControl.nodeId
                          "
                          v-model.trim="treeControl.content"
                          size="medium"
                          ><i
                            slot="prefix"
                            class="el-input__icon el-icon-edit"
                          ></i
                        ></el-input>
                        <span>
                          <svg-icon
                            v-if="
                              !treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId
                            "
                            title="添加下级"
                            icon-class="queue_black_24dp"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => append(data)"
                          ></svg-icon>

                          <svg-icon
                            v-if="
                              !treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId
                            "
                            title="编辑"
                            icon-class="edit-2-fill"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => edit(node, data)"
                          ></svg-icon>
                          <svg-icon
                            v-if="
                              !treeControl.isEditTreeNode ||
                                node.id !== treeControl.nodeId
                            "
                            title="删除"
                            icon-class="delete_black_24dp"
                            style="font-size:18px;margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => remove(node, data)"
                          ></svg-icon>
                          <svg-icon
                            v-if="
                              treeControl.isEditTreeNode &&
                                node.id === treeControl.nodeId
                            "
                            title="确定"
                            icon-class="check_circle_black_24dp"
                            class="el-button--text"
                            style="font-size:20px;color: $base-color-default;margin:0 5px 0 10px;vertical-align:text-bottom;"
                            @click.stop="() => editConfirm(node, data)"
                          ></svg-icon>
                          <svg-icon
                            v-if="
                              treeControl.isEditTreeNode &&
                                node.id === treeControl.nodeId
                            "
                            title="取消"
                            icon-class="cancel_black_24dp"
                            style="font-size:20px;color: red; margin:0 5px;vertical-align:text-bottom;"
                            @click.stop="() => editCancel(node, data)"
                          ></svg-icon>
                        </span>
                      </span>
                    </el-tree>
                  </div>
                  <!-- </el-scrollbar> -->
                </template>
              </el-skeleton>
            </el-card>
          </el-col>
          <el-col :span="18">
            <el-card class="table-card clear" shadow="never">
              <div slot="header" style="height: 63px;">
                <div
                  style="display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;"
                >
                  <div>
                    <span
                      style="font-weight: bold;font-size:14px;line-height: 63px"
                      >当前角色：</span
                    >
                    <span style="line-height: 63px;margin-left:5px">{{
                      treeControl.currentRoleName
                    }}</span>
                    <el-popover
                      placement="bottom"
                      title="角色权限设置 - 帮助"
                      trigger="click"
                      width="200"
                    >
                      <br />
                      <div>
                        选中所需的权限，点击应用即可
                      </div>
                      <br />
                      <svg-icon
                        slot="reference"
                        title="角色管理 - 角色权限设置 - 帮助"
                        icon-class="question-fill"
                        class="el-button--text"
                        style="margin-left:12px;cursor: pointer;font-size:16px"
                      ></svg-icon>
                    </el-popover>
                  </div>
                  <div>
                    <el-button
                      type="primary"
                      icon="el-icon-check"
                      size="small"
                      style="margin-left: 20px;"
                      @click="useData"
                      :loading="useBtnLoading"
                      :disabled="sureDisable"
                      >应 用</el-button
                    >
                    <el-button
                      type="danger"
                      icon="el-icon-refresh-right"
                      size="small"
                      style="margin-left: 20px;"
                      @click="resetData"
                      :disabled="sureDisable"
                      >清空选中</el-button
                    >
                  </div>
                </div>
              </div>

              <!-- 树形控件 -->
              <el-row :gutter="20">
                <el-col :span="12">
                  <h2 style="padding:10px 0 10px 10px">
                    业务表
                  </h2>

                  <el-skeleton :loading="dataZhongLoading" animated :rows="7">
                    <template slot="template">
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" style="width: 50%;" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" />
                      </div>
                      <div style="padding: 10px 0;">
                        <el-skeleton-item variant="text" style="width: 50%;" />
                      </div>
                    </template>
                    <template>
                      <el-table
                        @row-click="rowClick"
                        :show-header="false"
                        size="small"
                        class="role-table-data"
                        :data="dataTableData"
                        :loading="dataZhongLoading"
                        ref="dataTableData"
                        highlight-current-row
                        :height="
                          !pageParams.full
                            ? 'calc(100vh - 356px)'
                            : 'calc(100vh - 234px)'
                        "
                      >
                        <el-table-column prop="displayName" label="业务表"
                          ><template slot-scope="scope">
                            <!-- <el-badge value="点击查看详情"> -->
                            <el-link
                              :underline="false"
                              type="primary"
                              title="点击查看详情"
                            >
                              <!-- <i class="el-icon-document"></i>  -->
                              <svg-icon
                                title="查看"
                                icon-class="zoom-in-line"
                                class="el-button--text"
                                style="margin: 0 5px;cursor: pointer"
                              ></svg-icon>
                              {{ scope.row.displayName }}
                            </el-link>
                            <!-- </el-badge> -->
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-skeleton>
                </el-col>
                <el-col :span="12">
                  <h2 style="padding:10px 0 10px 20px">业务列</h2>
                  <div style="overflow-x: hidden">
                    <el-skeleton :loading="dataYouLoading" animated :rows="7">
                      <!-- :style="{ height: !pageParams.full ? 'calc(100vh - 312px)'
                      : 'calc(100vh - 190px)' }" -->
                      <template slot="template">
                        <div style="padding: 10px 0;">
                          <el-skeleton-item
                            variant="text"
                            style="width: 50%;"
                          />
                        </div>
                        <div style="padding: 10px 0;">
                          <el-skeleton-item variant="text" />
                        </div>
                        <div style="padding: 10px 0;">
                          <el-skeleton-item variant="text" />
                        </div>
                        <div style="padding: 10px 0;">
                          <el-skeleton-item variant="text" />
                        </div>
                        <div style="padding: 10px 0;">
                          <el-skeleton-item variant="text" />
                        </div>
                        <div style="padding: 10px 0;">
                          <el-skeleton-item variant="text" />
                        </div>
                        <div style="padding: 10px 0;">
                          <el-skeleton-item variant="text" />
                        </div>
                        <div style="padding: 10px 0;">
                          <el-skeleton-item variant="text" />
                        </div>
                        <div style="padding: 10px 0;">
                          <el-skeleton-item variant="text" />
                        </div>
                        <div style="padding: 10px 0;">
                          <el-skeleton-item variant="text" />
                        </div>
                        <div style="padding: 10px 0;">
                          <el-skeleton-item variant="text" />
                        </div>
                        <div style="padding: 10px 0;">
                          <el-skeleton-item variant="text" />
                        </div>
                        <div style="padding: 10px 0;">
                          <el-skeleton-item
                            variant="text"
                            style="width: 50%;"
                          />
                        </div>
                      </template>
                      <template>
                        <el-tree
                          empty-text=" 👈 点击左侧业务列获取数据"
                          :data="tableYouData"
                          :props="datadefaultProps"
                          show-checkbox
                          node-key="id"
                          highlight-current
                          default-expand-all
                          check-on-click-node
                          check-strictly
                          :default-checked-keys="dataDefaultCheckedKeys"
                          ref="dataYouTree"
                          :style="{
                            height: !pageParams.full
                              ? 'calc(100vh - 356px)'
                              : 'calc(100vh - 234px)'
                          }"
                        >
                        </el-tree>
                      </template>
                    </el-skeleton>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <app-footer class="top-footer" v-if="!pageParams.full"></app-footer>

    <Dialog ref="roledialog" @fetch="fetch" :dialogParams="dialogParams">
    </Dialog>
    <RoleDialog
      ref="roleselectdialog"
      @fetch="fetch"
      :dialogParams="dialogParams"
    >
    </RoleDialog>
    <setRoleDialog
      ref="setRoleDialog"
      @fetch="fetch"
      :dialogParams="dialogParams"
    >
    </setRoleDialog>
  </el-card>
</template>

<script>
import { getUserMgrList, freezeUser, unfreezeUser } from '@/api/system/mgr'
import { defList, columnDefMgrListList } from '@/api/system/bizDef'
import {
  getRoleTree,
  roleAdd,
  roleEdit,
  roleDelete,
  getAuthMenus,
  roleAuthMenus,
  getAuthCols,
  setAuthColumns
} from '@/api/system/role'
import Dialog from './dialog.vue'
import RoleDialog from './roleDialog.vue'
import setRoleDialog from './setRoleDialog.vue'

import { menuMgrTree } from '@/api/system/menu'
export default {
  components: {
    Dialog,
    RoleDialog,
    setRoleDialog
  },
  inject: ['reload'],
  data() {
    return {
      // Dialog
      dialogParams: {
        headerTitle: '新建用户'
      },
      // 页面参数
      pageParams: {
        // 表Title
        headerTitle: this.$route.meta.title,
        // 全屏
        full: false,
        // 全屏后的table高度
        fullFull: 'calc(100vh - 190px)',
        // 正常table高度
        normalFull: 'calc(100vh - 312px)',
        // tabs标签页默认项
        activeTabs: 'staff' // staff role data
      },
      // !-----------------public-----------------

      // 搜索项
      filterText: '',

      // 左侧树配置
      defaultProps: {
        children: 'children',
        label: 'name'
      },

      // !---------------public-end---------------

      // todo-----------------staff------------------
      // 左侧树
      staffRoleTreeList: [],
      // 角色列表
      roleRoleTreeList: [],
      // 用于展示骨架屏
      treeTableLoading: true,
      // 查询表单
      formData: {
        id: '',
        username: ''
      },
      rules: {
        username: []
      },
      // 表格数据
      tableData: [],
      // 表格加载
      tableLoading: true,
      // 是否编辑
      treeControl: {
        isEditTreeNode: false,
        content: '',
        nodeId: '',
        // 添加输入框
        addSubInput: '',
        currentRoleName: '全部'
      },
      // todo---------------staff-end----------------

      // !-----------------role-------------------
      // staff右边树的loading
      treeRoleTableLoading: true,
      // 应 用
      useBtnLoading: false,
      // 点击时候的id
      roleNodeClickId: '',
      // staff右侧的树
      treeEditData: [],
      // 树形控件绑定对象
      treeEditProps: {
        label: 'name',
        children: 'children'
      },
      // 默认选中节点的id值
      defKeys: [],
      // !---------------role-end-----------------

      // !-----------------data-------------------
      dataZuoLoading: true,
      dataTreeList: [],
      // data中的
      dataZhongLoading: true,
      // data的表格
      dataTableData: [],

      // data右的
      dataYouLoading: false,
      tableYouData: [],
      // 应用
      sureDisable: true,
      dataNodeClickId: '',
      dataTableId: '',

      datadefaultProps: {
        children: null,
        label: 'displayName'
      },

      dataDefaultCheckedKeys: []
      // !---------------data-end-----------------
    }
  },
  created() {
    // this.handleNodeClick({ id: 1 })
  },
  mounted() {},
  computed: {
    tableSettings() {
      return this.$store.getters.tableSettings
    }
  },
  watch: {
    // 监视角色列表的输入框
    filterText(val) {
      // console.log(val)
      this.$refs.roletree.filter(val)
    },
    pageParams: {
      handler: function(val) {
        if (val.activeTabs === 'staff') {
          this.getStaffTree()
          this.getUserList()
        } else if (val.activeTabs === 'role') {
          this.getRoleRoleTree()
          this.roleHandleNodeClick({ id: 1, name: '超级管理员' })
          this.getMenuTree()
          // this.getDefKeys('1')
        } else if (val.activeTabs === 'data') {
          this.getDataZuoTree()
          this.getDefList({ limit: 99, offset: 1 })
          this.dataHandleNodeClick({ id: 1, name: '超级管理员' })
        } else {
          this.$message.error('请刷新后重试')
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // !-----------------public-----------------
    // 刷新表格
    refreshTable() {
      this.reload()
    },
    // 全屏
    changeFull() {
      this.pageParams.full = !this.pageParams.full
    },
    // el-tabs切换点击
    tabsClick(tab, event) {
      // if (tab.name === 'role') {
      // }
    },

    // el-tree点击项
    handleNodeClick(data) {
      console.log('handleNodeClick', data)
      this.formData.id = data.id
      // this.treeControl.currentRoleName = data.name
      this.getUserList(this.formData.username, this.formData.id)
    },
    // 搜索过滤
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    appendNoData() {
      const data = {
        id: 0
      }
      this.$prompt('添加下级角色名称', '添加角色', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        // eslint-disable-next-line no-useless-escape
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\,，]+$/,
        inputErrorMessage: '角色名称格式不正确',
        inputPlaceholder: '请输入部门名称',
        closeOnClickModal: false,
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '添加中...'
            const dataBody = {
              pid: data.id,
              name: instance.$refs.input.value
            }
            await roleAdd(dataBody)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  setTimeout(() => {
                    this.getStaffTree()
                    instance.confirmButtonLoading = false
                    done()
                  }, 500)
                } else {
                  this.$message.error(retMsg)
                  setTimeout(() => {
                    instance.confirmButtonLoading = false
                    instance.confirmButtonText = '确 定'
                  }, 500)
                }
              })
              .catch(() => {
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '确 定'
              })
          } else {
            done()
          }
        }
      })
        .then(({ value }) => {})
        .catch(() => {})
    },
    // 添加
    append(data) {
      console.log(data)
      console.log(data.pId)
      this.$prompt('添加 ' + data.name + ' 的下级角色名称', '添加角色', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        // eslint-disable-next-line no-useless-escape
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\,，]+$/,
        inputErrorMessage: '角色名称格式不正确',
        inputPlaceholder: '请输入部门名称',
        closeOnClickModal: false,
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '添加中...'
            const dataBody = {
              pid: data.id,
              name: instance.$refs.input.value
            }
            await roleAdd(dataBody)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  setTimeout(() => {
                    this.getStaffTree()
                    instance.confirmButtonLoading = false
                    done()
                  }, 500)
                } else {
                  this.$message.error(retMsg)
                  setTimeout(() => {
                    instance.confirmButtonLoading = false
                    instance.confirmButtonText = '确 定'
                  }, 500)
                }
              })
              .catch(() => {
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '确 定'
              })
          } else {
            done()
          }
        }
      })
        .then(({ value }) => {})
        .catch(() => {})
    },

    // 删除
    async remove(node, data) {
      this.$confirm('是否继续?', `删除角色 -  ${data.name}`, {
        confirmButtonText: '删 除',
        cancelButtonText: '取 消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(async () => {
          console.log(data.id)
          await roleDelete(data.id)
            .then(result => {
              console.log('🚀', result.data)
              const { retCode, retMsg } = result.data
              if (retCode === '000000') {
                this.$message.success(retMsg)
                this.getStaffTree()
              } else {
                this.$message.error(retMsg)
              }
            })
            .catch(() => {
              console.log('🛸🛸🛸🛸🛸🛸🛸')
            })
        })
        .catch(() => {})
    },
    // 编辑
    edit(node, data) {
      this.treeControl.nodeId = node.id
      this.treeControl.isEditTreeNode = true
      this.treeControl.content = data.name
    },
    // 编辑确定
    async editConfirm(node, data) {
      console.log(data)
      console.log(data.id)
      console.log(this.treeControl.content)
      if (this.treeControl.content) {
        const dataBodyEdit = {
          id: data.id,
          name: this.treeControl.content
        }
        await roleEdit(dataBodyEdit)
          .then(result => {
            console.log('🚀', result.data)
            const { retCode, retMsg } = result.data
            if (retCode === '000000') {
              this.$message.success(retMsg)
              this.editCancel(node, data)
              this.getStaffTree()
            } else {
              this.$message.error(retMsg)
            }
          })
          .catch(() => {
            console.log('🛸🛸🛸🛸🛸🛸🛸')
          })
      } else {
        this.editCancel(node, data)
      }
    },
    // 编辑取消
    editCancel(node, data) {
      this.treeControl.nodeId = ''
      this.treeControl.isEditTreeNode = false
      this.treeControl.content = ''
    },
    // 表格按钮功能
    // userControl(name, row) {
    //   if (name === 'add') {
    //     this.dialogParams.headerTitle = '新建用户'
    //     this.$refs.roledialog.showDialog(name)
    //   } else if (name === 'delete') {
    //     this.$confirm('删除此账号, 是否继续?', ` ❌ 删除 - ${row.account}`, {
    //       confirmButtonText: '重 置',
    //       cancelButtonText: '取 消',
    //       type: 'warning',
    //       closeOnClickModal: false
    //     })
    //       .then(async () => {
    //         await deleteUser(row.id)
    //           .then(result => {
    //             console.log('🚀', result.data)
    //             const { retCode, retMsg } = result.data
    //             if (retCode === '000000') {
    //               this.$message.success('删除成功！')

    //               this.getUserList()
    //             } else {
    //               this.$message.error(retMsg)
    //             }
    //           })
    //           .catch(() => {})
    //       })
    //       .catch(() => {})
    //   } else {
    //     this.$message.error('请尝试刷新后再试')
    //   }
    // },
    // 控制
    setRolesDialog(name) {
      if (name === 'PMSetFieldRole') {
        this.dialogParams.headerTitle = '设置人员管理字段权限'
        this.$refs.roleselectdialog.showDialog(name)
      } else if (name === 'PMSetQueryRole') {
        this.dialogParams.headerTitle = '设置人员管理查询字段'
        this.$refs.roleselectdialog.showDialog(name)
      } else {
        this.$message.error('调用失败')
      }
    },
    // 表格按钮功能
    userControl(name, row) {
      if (name === 'editRole') {
        this.dialogParams.headerTitle = '角色分配 - ' + row.account
        this.$refs.setRoleDialog.showDialog(name, row)
      } else if (name === 'freeze') {
        this.$confirm('停用此账号, 是否继续?', ` 🚫 停用 - ${row.account}`, {
          confirmButtonText: '停 用',
          cancelButtonText: '取 消',
          type: 'warning',
          closeOnClickModal: false
        })
          .then(async () => {
            await freezeUser(row.id)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  this.$message.success('停用成功！')
                  this.getUserList()
                } else {
                  this.$message.error(retMsg)
                }
              })
              .catch(() => {})
          })
          .catch(() => {})
      } else if (name === 'unfreeze') {
        this.$confirm('启用此账号, 是否继续?', ` ✅ 启用 - ${row.account}`, {
          confirmButtonText: '启 用',
          cancelButtonText: '取 消',
          type: 'warning',
          closeOnClickModal: false
        })
          .then(async () => {
            await unfreezeUser(row.id)
              .then(result => {
                console.log('🚀', result.data)
                const { retCode, retMsg } = result.data
                if (retCode === '000000') {
                  this.$message.success('启用成功！')

                  this.getUserList()
                } else {
                  this.$message.error(retMsg)
                }
              })
              .catch(() => {})
          })
          .catch(() => {})
      } else {
        this.$message.error('请尝试刷新后再试')
      }
    },
    // 获取Menus
    // !---------------public-end---------------

    // todo-----------------staff------------------
    // 获取公共角色树状
    async getStaffTree() {
      this.treeTableLoading = true
      await getRoleTree()
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, data, retMsg } = result.data
          if (retCode === '000000') {
            console.log(data)
            // const arrSort = []
            // data.children.forEach(item => {
            //   arrSort.push(item.id)
            // })
            // arrSort.sort()
            // this.treeControl.currentNodeKey = arrSort[0]

            this.staffRoleTreeList = data
            this.timerLoading = setTimeout(() => {
              this.treeTableLoading = false
            }, 500)
            // this.treeTableLoading = false
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // 刷新
    getStaffRet() {
      this.getStaffTree()
      this.getUserList()
    },
    // 提交搜索
    submitForm() {
      console.log(this.formData)
      this.getUserList(this.formData.username, this.formData.id)
    },
    // 重置搜索
    resetForm(formName) {
      this.formData.id = ''
      this.getStaffTree()
      this.$refs[formName].resetFields()
      this.getUserList()
    },
    // dialog点击确定传来的值
    fetch() {
      this.getUserList()
    },
    // 获取树lable
    async getMenuTree() {
      await menuMgrTree()
        .then(result => {
          console.log(result)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            this.treeEditData = data[0].children
          } else {
            this.$$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // DefKeys
    async getDefKeys(id) {
      this.treeRoleTableLoading = true
      await getAuthMenus(id)
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, retMsg, data } = result.data
          if (retCode === '000000') {
            setTimeout(() => {
              this.treeRoleTableLoading = false
            }, 500)
            this.defKeys = data
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // 获取用户列表
    async getUserList(name, id) {
      this.tableLoading = true
      await getUserMgrList(name, id)
        .then(result => {
          console.log('🚀', result.data)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            this.timerLoading = setTimeout(() => {
              this.tableLoading = false
            }, 500)
            this.tableData = data
          } else {
            this.tableLoading = false
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // todo---------------staff-end----------------

    // !-----------------role-------------------
    // 应用
    async useRole() {
      this.useBtnLoading = true
      const keys = [
        ...this.$refs.treeEditRef.getCheckedKeys(),
        ...this.$refs.treeEditRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')
      await roleAuthMenus(idStr, this.roleNodeClickId)
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, retMsg } = result.data
          if (retCode === '000000') {
            setTimeout(() => {
              this.useBtnLoading = false
            }, 500)
            this.getDefKeys(this.roleNodeClickId)
            this.$store
              .dispatch('user/getInfo')
              .then(result => {})
              .catch(() => {
                this.$notify({
                  title: '菜单资源加载错误',
                  message: '请重试',
                  type: 'error',
                  duration: 0
                })
              })
            this.$message.success('设置成功')
          } else {
            this.$message.error(retMsg)
            this.useBtnLoading = false
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
          this.useBtnLoading = false
        })
    },
    // getRoleTree
    getRoleTree() {
      this.getRoleRoleTree()
      this.roleHandleNodeClick({ id: 1, name: '超级管理员' })
      this.getMenuTree()
    },
    // 获取URl角色树状列表
    async getRoleRoleTree() {
      this.treeTableLoading = true
      await getRoleTree()
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, data, retMsg } = result.data
          if (retCode === '000000') {
            console.log(data)
            this.roleRoleTreeList = data[0].children
            this.timerLoading = setTimeout(() => {
              this.treeTableLoading = false
            }, 500)
            // this.treeTableLoading = false
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // rolehandleNodeClick
    roleHandleNodeClick(data) {
      // this.getDefKeys('1')
      this.defKeys = []
      console.log(data.id)
      this.roleNodeClickId = data.id
      this.treeControl.currentRoleName = data.name
      this.getDefKeys(data.id)
    },
    // !---------------role-end-----------------

    // !-----------------data-------------------
    // 点击角色数据中的
    async rowClick(row, column, event) {
      await this.getList({ offset: 1, limit: 99, tableId: row.id })
      console.log(row.id)
      this.dataTableId = row.id
      console.log(this.dataNodeClickId)
      await this.getCols(this.dataNodeClickId, this.dataTableId)
      this.sureDisable = false
    },

    // getDataTree
    getDataTree() {
      this.getRoleRoleTree()
    },
    // defList
    async getDefList({ limit, offset }) {
      this.dataZhongLoading = true
      await defList({ limit, offset })
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, data, retMsg } = result.data
          if (retCode === '000000') {
            setTimeout(() => {
              this.dataZhongLoading = false
            }, 500)
            this.dataTableData = data.rows
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // datahandleNodeClick
    dataHandleNodeClick(data) {
      console.log(data)
      this.sureDisable = true
      this.dataNodeClickId = data.id
      this.treeControl.currentRoleName = data.name

      if (Object.keys(data).length > 2) {
        this.$refs.dataTableData.setCurrentRow(-1)
      }
      this.tableYouData = []
    },
    // 刷新
    getRutDataTree() {
      this.getDataZuoTree()
      this.dataHandleNodeClick({ id: 1, name: '超级管理员' })
      this.getDefList({ limit: 99, offset: 1 })
    },
    // 获取URl角色树状列表
    async getDataZuoTree() {
      this.dataZuoLoading = true
      await getRoleTree()
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, data, retMsg } = result.data
          if (retCode === '000000') {
            console.log(data)
            this.dataTreeList = data[0].children
            this.timerLoading = setTimeout(() => {
              this.dataZuoLoading = false
            }, 500)
            // this.treeTableLoading = false
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // 获取表格
    async getList({ offset, limit, tableId }) {
      // this.dataYouLoading = true
      await columnDefMgrListList({ offset, limit, tableId })
        .then(result => {
          console.log('🚀', result.data)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            // this.timerLoading = setTimeout(() => {
            //   this.dataYouLoading = false
            // }, 500)
            this.tableYouData = data.rows
            // this.total = data.total
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    // 点击row选中
    openDetails(row) {
      console.log(row)
      // this.selectlist.push(row)

      // this.$refs.dataYouTableData.clearSelection()
      this.$refs.dataYouTableData.toggleRowSelection(row)
    },

    // 过去id
    async getCols(dataNodeClickId, id) {
      this.dataYouLoading = true
      await getAuthCols(dataNodeClickId, id)
        .then(result => {
          console.log('🚀', result.data)
          const { data, retCode, retMsg } = result.data
          if (retCode === '000000') {
            this.timerLoading = setTimeout(() => {
              this.dataYouLoading = false
            }, 500)
            this.dataDefaultCheckedKeys = data
          } else {
            this.$message.error(retMsg)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
        })
    },
    resetData() {
      this.$refs.dataYouTree.setCheckedKeys([])
      this.$message.warning('业务列清空成功')
    },
    async useData() {
      this.useBtnLoading = true
      const keys = [
        ...this.$refs.dataYouTree.getCheckedKeys(),
        ...this.$refs.dataYouTree.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')
      console.log(idStr)
      await setAuthColumns(idStr, this.dataNodeClickId, this.dataTableId)
        .then(result => {
          console.log('🚀', result.data)
          const { retCode, retMsg } = result.data
          if (retCode === '000000') {
            setTimeout(() => {
              this.useBtnLoading = false
            }, 500)
            this.$message.success(retMsg)
            this.getCols(this.dataNodeClickId, this.dataTableId)
          } else {
            this.$message.error(retMsg)
            setTimeout(() => {
              this.useBtnLoading = false
            }, 500)
          }
        })
        .catch(() => {
          console.log('🛸🛸🛸🛸🛸🛸🛸')
          this.useBtnLoading = false
        })
    }

    // !---------------data-end-----------------
  }
}
</script>

<style lang="scss" scoped>
.card-sys {
  width: 100%;
}
</style>
