<template>
  <div style="min-height: calc(100vh - 60px); margin: 10px 0; padding: 20px; background-color: #f8f9fa; border-radius: 10px">

    <!-- Search and action bar -->
    <div style="padding: 20px; background-color: #fff; border-radius: 10px; margin-bottom: 20px; border: 1px solid #e8f4e8">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
        <div style="font-size: 24px; color: #2e8b57; font-weight: bold; display: flex; align-items: center">
          <i class="el-icon-first-aid-kit" style="margin-right: 10px"></i>
          Rescue Organizations
        </div>
        <div style="display: flex">
          <el-input v-model="name" placeholder="Search organization name" style="width: 200px; margin-right: 10px"
                    prefix-icon="el-icon-search" clearable @keyup.enter.native="load"></el-input>
          <el-button type="primary" @click="load" style="background-color: #2e8b57; border-color: #2e8b57">
            <i class="el-icon-search"></i> Search
          </el-button>
          <el-button @click="reset" style="margin-left: 10px">
            <i class="el-icon-refresh"></i> Reset
          </el-button>
          <el-button type="success" @click="handleAdd" style="background-color: #ff6b6b; border-color: #ff6b6b; margin-left: 10px">
            <i class="el-icon-plus"></i> Add Organization
          </el-button>
        </div>
      </div>

      <!-- Stats cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px">
        <div style="background: linear-gradient(135deg, #e8f5e9, #c8e6c9); padding: 15px; border-radius: 10px; text-align: center">
          <div style="font-size: 24px; color: #2e8b57; font-weight: bold">{{ total }}</div>
          <div style="color: #555; margin-top: 5px">Total Organizations</div>
        </div>

      </div>
    </div>

    <!-- Grid display -->
    <div v-if="tableData.length > 0" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin-bottom: 30px">
      <div v-for="item in tableData" :key="item.id"
           style="background-color: #fff; border-radius: 12px; padding: 20px;
                  border: 1px solid #e0e0e0; transition: all 0.3s; cursor: pointer"
           @click="handleEdit(item)"
           class="rescue-card">
        <div style="display: flex; align-items: flex-start; margin-bottom: 15px">
          <div style="position: relative; width: 120px; height: 120px; flex-shrink: 0">
            <el-image :src="item.img" style="width: 100%; height: 100%; border-radius: 8px; object-fit: cover; border: 2px solid #2e8b57">
              <div slot="error" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f5f5f5; border-radius: 8px">
                <i class="el-icon-picture-outline" style="font-size: 40px; color: #ccc"></i>
              </div>
            </el-image>
            <div style="position: absolute; top: 5px; right: 5px; background-color: #2e8b57; color: white;
                      padding: 2px 8px; border-radius: 10px; font-size: 12px; font-weight: bold">
              Rescue Station
            </div>
          </div>
          <div style="margin-left: 20px; flex: 1">
            <div style="font-size: 20px; color: #2e8b57; font-weight: bold; margin-bottom: 8px; display: flex; align-items: center">
              {{ item.name }}
              <i class="el-icon-office-building" style="margin-left: 8px; font-size: 18px"></i>
            </div>
            <div style="color: #666; margin-bottom: 5px; display: flex; align-items: center">
              <i class="el-icon-location" style="color: #ff6b6b; margin-right: 6px"></i>
              <span style="font-size: 14px">{{ item.addres || 'No address' }}</span>
            </div>
            <div style="color: #666; margin-bottom: 5px; display: flex; align-items: center">
              <i class="el-icon-user" style="color: #1976d2; margin-right: 6px"></i>
              <span style="font-size: 14px">{{ item.person || 'No contact person' }}</span>
            </div>
            <div style="color: #666; display: flex; align-items: center">
              <i class="el-icon-phone" style="color: #4caf50; margin-right: 6px"></i>
              <span style="font-size: 14px">{{ item.phone || 'No phone number' }}</span>
            </div>
          </div>
        </div>

        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px dashed #e0e0e0">
          <div style="font-size: 16px; color: #555; font-weight: bold; margin-bottom: 10px; display: flex; align-items: center">
            <i class="el-icon-document" style="margin-right: 8px; color: #ff9800"></i>
            Organization Description
          </div>
          <div style="color: #666; line-height: 1.5; font-size: 14px; max-height: 60px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical">
            {{ item.information || 'No description available' }}
          </div>
        </div>

        <div style="margin-top: 15px; display: flex; justify-content: space-between">
          <el-button type="primary" size="small" @click.stop="handleEdit(item)"
                     style="background-color: #2e8b57; border-color: #2e8b57">
            <i class="el-icon-edit"></i> Edit
          </el-button>
          <el-button type="danger" size="small" @click.stop="del(item.id)">
            <i class="el-icon-delete"></i> Delete
          </el-button>
          <el-button type="info" size="small" @click.stop="$router.push('/rescue/detail?id=' + item.id)">
            <i class="el-icon-view"></i> Details
          </el-button>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else style="text-align: center; padding: 60px 20px; background-color: #fff; border-radius: 10px; margin-bottom: 30px">
      <i class="el-icon-office-building" style="font-size: 80px; color: #e0e0e0; margin-bottom: 20px"></i>
      <div style="font-size: 20px; color: #999; margin-bottom: 10px">No rescue organizations yet</div>
      <div style="color: #aaa; margin-bottom: 30px">Click "Add Organization" to add the first rescue organization</div>
      <el-button type="primary" @click="handleAdd" size="large" style="background-color: #2e8b57; border-color: #2e8b57">
        <i class="el-icon-plus"></i> Add Rescue Organization
      </el-button>
    </div>

    <!-- Pagination -->
    <div style="padding: 20px; background-color: #fff; border-radius: 10px; margin-top: 20px; border: 1px solid #e8f4e8">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[4, 8, 12, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background>
      </el-pagination>
    </div>

    <!-- Dialog -->
    <el-dialog :title="form.id ? 'Edit Organization' : 'Add Organization'" :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false">
      <el-form label-width="100px" size="small" style="width: 90%">
        <el-form-item label="Name" required>
          <el-input v-model="form.name" autocomplete="off" placeholder="Enter organization name"></el-input>
        </el-form-item>
        <el-form-item label="Address" required>
          <el-input v-model="form.addres" autocomplete="off" placeholder="Enter detailed address"></el-input>
        </el-form-item>
        <el-form-item label="Photo" required>
          <el-upload
              class="avatar-uploader"
              :action="$apiBase + '/file/upload'"
              :show-file-list="false"
              :on-success="handleImgUploadSuccess"
              ref="img">
            <img v-if="form.img" :src="form.img" class="avatar" style="width: 120px; height: 120px; border-radius: 6px; object-fit: cover; border: 2px solid #2e8b57">
            <div v-else class="avatar-uploader-icon" style="width: 120px; height: 120px; line-height: 120px; text-align: center; border: 2px dashed #d9d9d9; border-radius: 6px; cursor: pointer; background-color: #fafafa">
              <i class="el-icon-plus" style="font-size: 28px; color: #8c939d"></i>
              <div style="font-size: 12px; color: #999; margin-top: 10px">Click to upload</div>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Contact" required>
          <el-input v-model="form.person" autocomplete="off" placeholder="Enter contact person name"></el-input>
        </el-form-item>
        <el-form-item label="Phone" required>
          <el-input v-model="form.phone" autocomplete="off" placeholder="Enter contact phone"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="form.information" autocomplete="off" placeholder="Enter organization description"
                    :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save" style="background-color: #2e8b57; border-color: #2e8b57">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Rescue",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 8,
      name: "",
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
    load() {
      this.request.get("/rescue/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    save() {
      if (!this.form.name || !this.form.addres || !this.form.person || !this.form.phone) {
        this.$message.error("Please fill in all required fields")
        return
      }

      this.request.post("/rescue", this.form).then(res => {
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
      this.$nextTick(() => {
        if(this.$refs.img) {
          this.$refs.img.clearFiles();
        }
      })
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
      this.$nextTick(() => {
        if(this.$refs.img) {
          this.$refs.img.clearFiles();
        }
      })
    },
    del(id) {
      this.$confirm('Are you sure you want to delete this rescue organization?', 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }).then(() => {
        this.request.delete("/rescue/" + id).then(res => {
          if (res.code === '200') {
            this.$message.success("Deleted successfully")
            this.load()
          } else {
            this.$message.error("Delete failed")
          }
        })
      }).catch(() => {
        this.$message.info('Deletion cancelled')
      })
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
      this.request.post("/rescue/del/batch", ids).then(res => {
        if (res.code === '200') {
          this.$message.success("Batch delete successful")
          this.load()
        } else {
          this.$message.error("Batch delete failed")
        }
      })
    },
    reset() {
      this.name = ""
      this.load()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    handleImgUploadSuccess(res) {
      this.form.img = res
      this.$message.success("Image uploaded successfully")
    },
  }
}
</script>

<style scoped>
.rescue-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(46, 139, 87, 0.15);
  border-color: #2e8b57;
}

.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #2e8b57;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #2e8b57;
}

.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #2e8b57;
}

.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev {
  background-color: #f5f5f5;
}

.el-pagination.is-background .btn-next:hover, .el-pagination.is-background .btn-prev:hover {
  color: #2e8b57;
}

.el-button--primary {
  background-color: #2e8b57;
  border-color: #2e8b57;
}

.el-button--primary:hover {
  background-color: #3da56d;
  border-color: #3da56d;
}

.el-button--success {
  background-color: #ff6b6b;
  border-color: #ff6b6b;
}

.el-button--success:hover {
  background-color: #ff8585;
  border-color: #ff8585;
}

::v-deep .el-dialog__header {
  background-color: #f8f9fa;
  padding: 15px 20px;
  border-bottom: 1px solid #e8f4e8;
}

::v-deep .el-dialog__title {
  color: #2e8b57;
  font-weight: bold;
}

::v-deep .el-form-item__label {
  color: #555;
  font-weight: 500;
}
</style>
