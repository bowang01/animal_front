<template>
  <div style="min-height: calc(100vh - 60px); padding: 20px; background-color: #f9f9f9">
    <!-- Page title and action buttons -->
    <div style="background-color: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <div>
          <div style="display: flex; align-items: center; margin-bottom: 8px">
            <i class="el-icon-search" style="color: #ff6b6b; font-size: 22px; margin-right: 10px"></i>
            <span style="font-size: 22px; color: #333; font-weight: bold">Lost Pet Management</span>
          </div>
          <div style="color: #666; font-size: 14px">Manage lost pet information and help pets find their way home</div>
        </div>
        <div style="display: flex; gap: 10px">
          <el-button
              type="primary"
              @click="handleAdd"
              style="background-color: #ff6b6b; border-color: #ff6b6b; border-radius: 8px"
          >
            <i class="el-icon-plus" style="margin-right: 5px"></i>
            Register Lost Pet
          </el-button>
        </div>
      </div>
    </div>

    <!-- Status filter -->
    <div style="display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap">
      <el-button
          size="medium"
          :type="currentFilter === 'all' ? 'primary' : ''"
          @click="handleFilter('all')"
          style="background-color: #f5f5f5; border: none; border-radius: 20px; padding: 8px 20px"
      >
        All <span style="color: #999; margin-left: 5px">({{ total }})</span>
      </el-button>
      <el-button
          size="medium"
          :type="currentFilter === 'lost' ? 'primary' : ''"
          @click="handleFilter('lost')"
          style="background-color: #f5f5f5; border: none; border-radius: 20px; padding: 8px 20px"
      >
        Lost
      </el-button>
      <el-button
          size="medium"
          :type="currentFilter === 'waiting' ? 'primary' : ''"
          @click="handleFilter('waiting')"
          style="background-color: #f5f5f5; border: none; border-radius: 20px; padding: 8px 20px"
      >
        Awaiting pickup
      </el-button>
      <el-button
          size="medium"
          :type="currentFilter === 'found' ? 'primary' : ''"
          @click="handleFilter('found')"
          style="background-color: #f5f5f5; border: none; border-radius: 20px; padding: 8px 20px"
      >
        Found
      </el-button>
    </div>

    <!-- Lost pet grid -->
    <div v-if="tableData.length > 0" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; margin-bottom: 20px">
      <el-card v-for="item in tableData" :key="item.id"
               style="border-radius: 12px; border: none; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); transition: all 0.3s ease">
        <div style="position: relative;">
          <!-- Status badges -->
          <div style="position: absolute; top: 15px; left: 15px; display: flex; gap: 8px; z-index: 2">
            <el-tag
                size="small"
                :type="getStatus1Type(item.status1)"
                style="border-radius: 15px; font-weight: bold; padding: 4px 12px"
            >
              {{ item.status1 }}
            </el-tag>
            <el-tag
                size="small"
                :type="getStatus2Type(item.status2)"
                style="border-radius: 15px; font-weight: bold; padding: 4px 12px"
            >
              {{ item.status2 }}
            </el-tag>
          </div>

          <!-- Action buttons -->
          <div style="position: absolute; top: 15px; right: 15px; z-index: 2; display: flex; gap: 5px">
            <el-button
                size="mini"
                type="primary"
                @click="handleEdit(item)"
                style="background-color: #2e8b57; border-color: #2e8b57; border-radius: 6px; padding: 4px 10px"
            >
              <i class="el-icon-edit" style="font-size: 12px"></i>
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="del(item.id)"
                style="border-radius: 6px; padding: 4px 10px"
            >
              <i class="el-icon-delete" style="font-size: 12px"></i>
            </el-button>
          </div>

          <!-- Pet info card -->
          <div style="padding-top: 40px">
            <!-- Pet basic info -->
            <div style="text-align: center; margin-bottom: 20px">
              <div style="width: 80px; height: 80px; background-color: #ff6b6b; border-radius: 50%; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center">
                <i class="el-icon-s-help" style="color: white; font-size: 36px"></i>
              </div>
              <div style="font-size: 20px; color: #333; font-weight: bold; margin-bottom: 5px">{{ item.nickname }}</div>
              <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 8px">
                <div style="display: flex; align-items: center; color: #666; font-size: 14px">
                  <i class="el-icon-s-grid" style="color: #2e8b57; margin-right: 5px"></i>
                  {{ item.type }}
                </div>
                <div style="display: flex; align-items: center; color: #666; font-size: 14px">
                  <i class="el-icon-male" v-if="item.sex === 'Male'" style="color: #1890ff; margin-right: 5px"></i>
                  <i class="el-icon-female" v-else style="color: #ff6b6b; margin-right: 5px"></i>
                  {{ item.sex }}
                </div>
              </div>
            </div>

            <!-- Detailed info -->
            <div style="background-color: #f9f9f9; border-radius: 10px; padding: 15px; margin-bottom: 15px">
              <!-- Contact person -->
              <div style="display: flex; align-items: center; margin-bottom: 12px">
                <div style="width: 24px; margin-right: 10px; flex-shrink: 0">
                  <i class="el-icon-user" style="color: #ff9500; font-size: 18px"></i>
                </div>
                <div style="flex: 1">
                  <div style="color: #333; font-weight: 500; margin-bottom: 4px">Contact Person</div>
                  <div style="color: #666; font-size: 15px; font-weight: 500">{{ item.person || 'Not provided' }}</div>
                </div>
              </div>

              <!-- Contact info -->
              <div style="display: flex; align-items: center; margin-bottom: 12px">
                <div style="width: 24px; margin-right: 10px; flex-shrink: 0">
                  <i class="el-icon-phone" style="color: #1890ff; font-size: 18px"></i>
                </div>
                <div style="flex: 1">
                  <div style="color: #333; font-weight: 500; margin-bottom: 4px">Contact</div>
                  <div style="color: #666; font-size: 15px; font-weight: 500">{{ item.phone || 'Not provided' }}</div>
                </div>
              </div>

              <!-- Status info -->
              <div style="display: flex; align-items: center">
                <div style="width: 24px; margin-right: 10px; flex-shrink: 0">
                  <i class="el-icon-warning-outline" style="color: #ff6b6b; font-size: 18px"></i>
                </div>
                <div style="flex: 1">
                  <div style="color: #333; font-weight: 500; margin-bottom: 4px">Current Status</div>
                  <div style="color: #666; font-size: 14px">
                    {{ item.status1 }} / {{ item.status2 }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Status timeline -->
            <div style="background-color: #f0f9ff; border-radius: 8px; padding: 12px; margin-bottom: 15px">
              <div style="display: flex; align-items: center; color: #1890ff; font-size: 13px; font-weight: 500; margin-bottom: 8px">
                <i class="el-icon-time" style="margin-right: 6px"></i>
                Status Timeline
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between">
                <div style="text-align: center; flex: 1">
                  <div style="width: 24px; height: 24px; background-color: #1890ff; border-radius: 50%; margin: 0 auto 5px; display: flex; align-items: center; justify-content: center">
                    <i class="el-icon-s-flag" style="color: white; font-size: 12px"></i>
                  </div>
                  <div style="color: #666; font-size: 12px">Registered</div>
                </div>
                <div style="flex: 1; height: 2px; background-color: #e0e0e0; margin: 0 5px"></div>
                <div style="text-align: center; flex: 1">
                  <div :style="{
                    width: '24px',
                    height: '24px',
                    backgroundColor: item.status2 === 'Found' ? '#2e8b57' : '#e0e0e0',
                    borderRadius: '50%',
                    margin: '0 auto 5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }">
                    <i class="el-icon-check" style="color: white; font-size: 12px"></i>
                  </div>
                  <div style="color: #666; font-size: 12px">In progress</div>
                </div>
                <div style="flex: 1; height: 2px; background-color: #e0e0e0; margin: 0 5px"></div>
                <div style="text-align: center; flex: 1">
                  <div :style="{
                    width: '24px',
                    height: '24px',
                    backgroundColor: item.status2 === 'Found' ? '#2e8b57' : '#e0e0e0',
                    borderRadius: '50%',
                    margin: '0 auto 5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }">
                    <i class="el-icon-s-home" style="color: white; font-size: 12px"></i>
                  </div>
                  <div style="color: #666; font-size: 12px">Home</div>
                </div>
              </div>
            </div>

            <!-- ID info -->
            <div style="text-align: center; color: #999; font-size: 12px">
              Registration No.: {{ item.id }}
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- Empty state -->
    <div v-else style="text-align: center; padding: 60px; background-color: white; border-radius: 12px; margin-bottom: 20px">
      <i class="el-icon-search" style="font-size: 60px; color: #e0e0e0; margin-bottom: 20px"></i>
      <div style="font-size: 18px; color: #999; margin-bottom: 10px">No lost pet records</div>
      <div v-if="currentFilter !== 'all'" style="color: #aaa; margin-bottom: 20px">No records found for the current filter</div>
      <div v-else style="color: #aaa; margin-bottom: 20px">Please register lost pet information to help them get home</div>
      <el-button
          type="primary"
          @click="handleAdd"
          style="background-color: #ff6b6b; border-color: #ff6b6b; border-radius: 8px"
      >
        <i class="el-icon-plus" style="margin-right: 5px"></i>
        Register Lost Pet
      </el-button>
      <el-button
          @click="handleFilter('all')"
          style="border-radius: 8px; margin-left: 10px"
      >
        <i class="el-icon-refresh" style="margin-right: 5px"></i>
        Reset
      </el-button>
    </div>

    <!-- Pagination -->
    <div style="background-color: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[6, 12, 18, 24]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next"
          :total="total"
          background
          style="justify-content: center"
      >
      </el-pagination>
    </div>

    <!-- Add/Edit dialog -->
    <el-dialog
        :title="form.id ? 'Edit Lost Pet Info' : 'Register Lost Pet'"
        :visible.sync="dialogFormVisible"
        width="500px"
        :close-on-click-modal="false"
        custom-class="lost-dialog"
    >
      <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px">
        <el-form label-width="120px" size="medium" style="width: 100%">
          <!-- Pet basic info -->
          <div style="background-color: #f9f9f9; border-radius: 8px; padding: 15px; margin-bottom: 20px">
            <div style="display: flex; align-items: center; margin-bottom: 12px">
              <i class="el-icon-s-help" style="color: #ff6b6b; font-size: 18px; margin-right: 8px"></i>
              <span style="color: #333; font-weight: 500">Pet Basic Info</span>
            </div>

            <el-form-item label="Pet Name" style="margin-bottom: 15px">
              <el-input
                  v-model="form.nickname"
                  placeholder="Please enter pet name"
                  style="width: 100%"
              ></el-input>
            </el-form-item>

            <el-form-item label="Type" style="margin-bottom: 15px">
              <el-input
                  v-model="form.type"
                  placeholder="Please enter pet type"
                  style="width: 100%"
              ></el-input>
            </el-form-item>

            <el-form-item label="Gender" style="margin-bottom: 15px">
              <el-radio-group v-model="form.sex" style="display: flex; gap: 20px">
                <el-radio label="Male" style="margin-right: 0">
                  <div style="display: flex; align-items: center">
                    <i class="el-icon-male" style="color: #1890ff; margin-right: 5px"></i>
                    <span>Male</span>
                  </div>
                </el-radio>
                <el-radio label="Female" style="margin-right: 0">
                  <div style="display: flex; align-items: center">
                    <i class="el-icon-female" style="color: #ff6b6b; margin-right: 5px"></i>
                    <span>Female</span>
                  </div>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </div>

          <!-- Contact info -->
          <div style="background-color: #f0f9ff; border-radius: 8px; padding: 15px; margin-bottom: 20px">
            <div style="display: flex; align-items: center; margin-bottom: 12px">
              <i class="el-icon-user" style="color: #1890ff; font-size: 18px; margin-right: 8px"></i>
              <span style="color: #333; font-weight: 500">Contact Info</span>
            </div>

            <el-form-item label="Contact Person" style="margin-bottom: 15px">
              <el-input
                  v-model="form.person"
                  placeholder="Please enter contact name"
                  style="width: 100%"
              ></el-input>
            </el-form-item>

            <el-form-item label="Contact" style="margin-bottom: 15px">
              <el-input
                  v-model="form.phone"
                  placeholder="Please enter phone number"
                  style="width: 100%"
              ></el-input>
            </el-form-item>
          </div>

          <!-- Status info -->
          <div style="background-color: #fff5f5; border-radius: 8px; padding: 15px">
            <div style="display: flex; align-items: center; margin-bottom: 12px">
              <i class="el-icon-warning-outline" style="color: #ff6b6b; font-size: 18px; margin-right: 8px"></i>
              <span style="color: #333; font-weight: 500">Status Info</span>
            </div>

            <el-form-item label="Lost Status" style="margin-bottom: 15px">
              <el-radio-group v-model="form.status1" style="display: flex; gap: 20px">
                <el-radio label="Lost" style="margin-right: 0">
                  <div style="display: flex; align-items: center; padding: 8px 12px; background-color: #fff5f5; border-radius: 6px">
                    <i class="el-icon-position" style="color: #ff6b6b; margin-right: 5px"></i>
                    <span>Lost</span>
                  </div>
                </el-radio>
                <el-radio label="Awaiting pickup" style="margin-right: 0">
                  <div style="display: flex; align-items: center; padding: 8px 12px; background-color: #f0f9ff; border-radius: 6px">
                    <i class="el-icon-s-home" style="color: #1890ff; margin-right: 5px"></i>
                    <span>Awaiting pickup</span>
                  </div>
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Recovery Status" style="margin-bottom: 15px">
              <el-radio-group v-model="form.status2" style="display: flex; gap: 20px">
                <el-radio label="Not found" style="margin-right: 0">
                  <div style="display: flex; align-items: center; padding: 8px 12px; background-color: #f5f5f5; border-radius: 6px">
                    <i class="el-icon-close" style="color: #666; margin-right: 5px"></i>
                    <span>Not found</span>
                  </div>
                </el-radio>
                <el-radio label="Found" style="margin-right: 0">
                  <div style="display: flex; align-items: center; padding: 8px 12px; background-color: #e9f7ef; border-radius: 6px">
                    <i class="el-icon-check" style="color: #2e8b57; margin-right: 5px"></i>
                    <span>Found</span>
                  </div>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="padding-top: 15px; border-top: 1px solid #f0f0f0">
        <el-button @click="dialogFormVisible = false" style="border-radius: 8px; padding: 10px 20px">Cancel</el-button>
        <el-button
            type="primary"
            @click="save"
            style="background-color: #ff6b6b; border-color: #ff6b6b; border-radius: 8px; padding: 10px 20px"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Lost",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 6,
      name: "", // Search keyword
      status1: "", // Lost status filter
      status2: "", // Recovery status filter
      currentFilter: "all", // Current filter type
      form: {},
      dialogFormVisible: false,
      multipleSelection: [],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    getStatus1Type(status) {
      switch(status) {
        case 'Lost': return 'danger'
        case 'Awaiting pickup': return 'primary'
        default: return 'info'
      }
    },
    getStatus2Type(status) {
      switch(status) {
        case 'Not found': return 'info'
        case 'Found': return 'success'
        default: return 'info'
      }
    },

    // Handle filter
    handleFilter(type) {
      this.currentFilter = type
      this.pageNum = 1 // Reset to first page

      // Set filter params by type
      switch(type) {
        case 'all':
          this.status1 = ""
          this.status2 = ""
          break
        case 'lost':
          this.status1 = "Lost"
          this.status2 = ""
          break
        case 'waiting':
          this.status1 = "Awaiting pickup"
          this.status2 = ""
          break
        case 'found':
          this.status1 = ""
          this.status2 = "Found"
          break
      }

      this.load()
    },

    load() {
      this.request.get("/lost/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
          status1: this.status1 || undefined, // Omit when empty
          status2: this.status2 || undefined  // Omit when empty
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total

        // If filters are set but backend returned all data, filter on the frontend
        if ((this.status1 || this.status2) && this.tableData.length > 0) {
          this.filterTableData()
        }
      })
    },

    // Frontend filter (if backend does not support it)
    filterTableData() {
      if (this.status1 || this.status2) {
        const originalData = this.tableData
        this.tableData = originalData.filter(item => {
          // Filter lost status
          if (this.status1 && item.status1 !== this.status1) {
            return false
          }
          // Filter recovery status
          if (this.status2 && item.status2 !== this.status2) {
            return false
          }
          return true
        })
        this.total = this.tableData.length
      }
    },

    save() {
      if (!this.form.nickname) {
        this.$message.warning("Please enter pet name")
        return
      }
      if (!this.form.status1) {
        this.$message.warning("Please select lost status")
        return
      }
      if (!this.form.status2) {
        this.$message.warning("Please select recovery status")
        return
      }
      this.request.post("/lost", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("Saved successfully")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("Save failed")
        }
      })
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    del(id) {
      this.$confirm('Are you sure you want to delete this lost pet record?', 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        customClass: 'custom-confirm'
      }).then(() => {
        this.request.delete("/lost/" + id).then(res => {
          if (res.code === '200') {
            this.$message.success("Deleted successfully")
            this.load()
          } else {
            this.$message.error("Delete failed")
          }
        })
      }).catch(() => {})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delBatch() {
      if (!this.multipleSelection.length) {
        this.$message.error("Please select data to delete")
        return
      }
      let ids = this.multipleSelection.map(v => v.id)
      this.$confirm(`Are you sure you want to delete the selected ${ids.length} records?`, 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.request.post("/lost/del/batch", ids).then(res => {
          if (res.code === '200') {
            this.$message.success("Batch delete succeeded")
            this.load()
          } else {
            this.$message.error("Batch delete failed")
          }
        })
      }).catch(() => {})
    },
    reset() {
      this.name = ""
      this.status1 = ""
      this.status2 = ""
      this.currentFilter = "all"
      this.load()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    }
  }
}
</script>

<style scoped>
/* Card hover effect */
.el-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1) !important;
}

/* Filter button active state */
.el-button--primary {
  background-color: #ff6b6b !important;
  border-color: #ff6b6b !important;
  color: white !important;
}

/* Pagination styles */
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ff6b6b;
  border-radius: 6px;
}

::v-deep .el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #ff6b6b;
}

::v-deep .el-pagination.is-background .btn-next,
::v-deep .el-pagination.is-background .btn-prev {
  background-color: #f5f5f5;
  border-radius: 6px;
  margin: 0 4px;
}

::v-deep .el-pagination.is-background .btn-next:hover,
::v-deep .el-pagination.is-background .btn-prev:hover {
  color: #ff6b6b;
  background-color: #ffeaea;
}

/* Dialog styles */
::v-deep .lost-dialog {
  border-radius: 12px;
}

::v-deep .lost-dialog .el-dialog__header {
  background-color: #f9f9f9;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 12px 12px 0 0;
  padding: 15px 20px;
}

::v-deep .lost-dialog .el-dialog__title {
  color: #333;
  font-size: 18px;
  font-weight: bold;
}

::v-deep .lost-dialog .el-dialog__body {
  padding: 20px;
}

/* Tag styles */
::v-deep .el-tag {
  border: none;
  font-weight: 500;
}

::v-deep .el-tag--primary {
  background-color: #e6f7ff;
  color: #1890ff;
}

::v-deep .el-tag--danger {
  background-color: #ffeaea;
  color: #ff6b6b;
}

::v-deep .el-tag--success {
  background-color: #e9f7ef;
  color: #2e8b57;
}

::v-deep .el-tag--info {
  background-color: #f5f5f5;
  color: #666;
}

/* Button styles */
::v-deep .el-button--primary {
  background-color: #ff6b6b;
  border-color: #ff6b6b;
}

::v-deep .el-button--primary:hover {
  background-color: #ff5252;
  border-color: #ff5252;
}

::v-deep .el-button--danger {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}

::v-deep .el-button--danger:hover {
  background-color: #ff7875;
  border-color: #ff7875;
}

/* Form styles */
::v-deep .el-input__inner {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

::v-deep .el-input__inner:focus {
  border-color: #ff6b6b;
  box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.1);
}

/* Radio styles */
::v-deep .el-radio__inner {
  border-color: #dcdfe6;
}

::v-deep .el-radio__input.is-checked .el-radio__inner {
  background-color: #ff6b6b;
  border-color: #ff6b6b;
}

::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #ff6b6b;
}

/* Confirm dialog styles */
::v-deep .custom-confirm .el-message-box {
  border-radius: 12px;
}

::v-deep .custom-confirm .el-message-box__header {
  background-color: #f9f9f9;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 12px 12px 0 0;
  padding: 15px 20px;
}

/* Responsive design */
@media (max-width: 992px) {
  div[style*="grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))"] {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
  }

  ::v-deep .el-dialog {
    width: 90% !important;
  }
}

@media (max-width: 768px) {
  div[style*="grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))"] {
    grid-template-columns: 1fr !important;
  }

  div[style*="display: flex; gap: 15px"] {
    gap: 10px !important;
  }

  div[style*="display: flex; justify-content: space-between"] {
    flex-direction: column !important;
    gap: 15px !important;
  }
}

/* Animation effects */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.el-card {
  animation: fadeIn 0.5s ease;
}
</style>
