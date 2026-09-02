<template>
  <div style="min-height: calc(100vh - 60px); padding: 20px; background-color: #f9f9f9">
    <!-- Page title and action buttons -->
    <div style="background-color: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <div>
          <div style="display: flex; align-items: center; margin-bottom: 8px">
            <i class="el-icon-house" style="color: #2e8b57; font-size: 22px; margin-right: 10px"></i>
            <span style="font-size: 22px; color: #333; font-weight: bold">Feeding Point Management</span>
          </div>
          <div style="color: #666; font-size: 14px">Manage fixed feeding points for stray animals</div>
        </div>
        <div style="display: flex; gap: 10px">
          <el-button
              type="primary"
              @click="handleAdd"
              style="background-color: #ff6b6b; border-color: #ff6b6b; border-radius: 8px"
          >
            <i class="el-icon-plus" style="margin-right: 5px"></i>
            Add Feeding Point
          </el-button>
          <el-button
              type="danger"
              @click="delBatch"
              :disabled="multipleSelection.length === 0"
              style="border-radius: 8px"
          >
            <i class="el-icon-delete" style="margin-right: 5px"></i>
            Batch Delete
          </el-button>
        </div>
      </div>
    </div>

    <!-- Feeding point grid -->
    <div v-if="tableData.length > 0" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 20px; margin-bottom: 20px">
      <el-card v-for="item in tableData" :key="item.id"
               style="border-radius: 12px; border: none; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); transition: all 0.3s ease">
        <div style="position: relative;">
          <!-- Action buttons -->
          <div style="position: absolute; top: 10px; right: 10px; z-index: 2; display: flex; gap: 5px">
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

          <!-- Image preview area -->
          <div style="margin-bottom: 15px">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px">
              <div v-for="(img, index) in [item.img, item.img2, item.img3]" :key="index"
                   style="height: 100px; border-radius: 8px; overflow: hidden; background-color: #f5f5f5">
                <el-image
                    v-if="img"
                    style="width: 100%; height: 100%; cursor: pointer"
                    :src="img"
                    :preview-src-list="[item.img, item.img2, item.img3].filter(i => i)"
                    fit="cover"
                >
                  <div slot="error" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #999">
                    <i class="el-icon-picture-outline" style="font-size: 24px"></i>
                  </div>
                </el-image>
                <div v-else style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #ccc">
                  <i class="el-icon-picture" style="font-size: 24px"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Feeding point info -->
          <div>
            <!-- Address info -->
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px">
              <div style="width: 24px; margin-right: 10px; flex-shrink: 0">
                <i class="el-icon-location-outline" style="color: #ff9500; font-size: 18px"></i>
              </div>
              <div>
                <div style="color: #333; font-weight: 500; margin-bottom: 4px">Feeding Point Address</div>
                <div style="color: #666; line-height: 1.5; font-size: 14px">{{ item.address || 'No address provided' }}</div>
              </div>
            </div>

            <!-- Description info -->
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px">
              <div style="width: 24px; margin-right: 10px; flex-shrink: 0">
                <i class="el-icon-document" style="color: #2e8b57; font-size: 18px"></i>
              </div>
              <div>
                <div style="color: #333; font-weight: 500; margin-bottom: 4px">Description</div>
                <div style="color: #666; line-height: 1.5; font-size: 14px; max-height: 80px; overflow: hidden; text-overflow: ellipsis">
                  {{ item.information || 'No description yet' }}
                </div>
              </div>
            </div>

            <!-- Image count -->
            <div style="display: flex; align-items: center; justify-content: space-between; background-color: #f9f9f9; padding: 8px 12px; border-radius: 6px">
              <div style="display: flex; align-items: center; color: #666; font-size: 13px">
                <i class="el-icon-picture" style="margin-right: 6px; color: #1890ff"></i>
                Environment photos: {{ [item.img, item.img2, item.img3].filter(img => img).length }}
              </div>
              <div style="color: #999; font-size: 12px">
                ID: {{ item.id }}
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- Empty state -->
    <div v-else style="text-align: center; padding: 60px; background-color: white; border-radius: 12px; margin-bottom: 20px">
      <i class="el-icon-place" style="font-size: 60px; color: #e0e0e0; margin-bottom: 20px"></i>
      <div style="font-size: 18px; color: #999; margin-bottom: 10px">No feeding point information</div>
      <div style="color: #aaa; margin-bottom: 20px">Please add fixed feeding points for stray animals</div>
      <el-button
          type="primary"
          @click="handleAdd"
          style="background-color: #ff6b6b; border-color: #ff6b6b; border-radius: 8px"
      >
        <i class="el-icon-plus" style="margin-right: 5px"></i>
        Add First Feeding Point
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
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
          style="justify-content: center"
      >
      </el-pagination>
    </div>

    <!-- Add/Edit dialog -->
    <el-dialog
        :title="form.id ? 'Edit Feeding Point' : 'Add Feeding Point'"
        :visible.sync="dialogFormVisible"
        width="600px"
        :close-on-click-modal="false"
        custom-class="feed-dialog"
    >
      <div style="max-height: 70vh; overflow-y: auto; padding-right: 10px">
        <el-form label-width="120px" size="medium" style="width: 100%">
          <!-- Environment photo upload -->
          <div style="margin-bottom: 20px">
            <div style="color: #333; font-weight: 500; margin-bottom: 12px; display: flex; align-items: center">
              <i class="el-icon-picture" style="color: #1890ff; margin-right: 8px"></i>
              Environment Photos
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px">
              <div v-for="(imgField, index) in ['img', 'img2', 'img3']" :key="index"
                   style="border-radius: 8px; overflow: hidden">
                <div style="margin-bottom: 8px; text-align: center; color: #666; font-size: 13px">
                  Environment Photo {{ index + 1 }}
                </div>
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="imgField === 'img' ? handleImgUploadSuccess : imgField === 'img2' ? handleImgUploadSuccess2 : handleImgUploadSuccess3"
                    :before-upload="beforeAvatarUpload"
                >
                  <div v-if="form[imgField]" style="position: relative">
                    <img :src="form[imgField]" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; border: 1px solid #f0f0f0">
                    <div style="position: absolute; top: 5px; right: 5px">
                      <el-button
                          size="mini"
                          type="danger"
                          circle
                          @click.stop="removeImage(imgField)"
                          style="background-color: rgba(255, 0, 0, 0.7); border: none"
                      >
                        <i class="el-icon-close" style="font-size: 12px"></i>
                      </el-button>
                    </div>
                  </div>
                  <div v-else style="height: 120px; border: 1px dashed #dcdfe6; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; background-color: #fafafa">
                    <div style="text-align: center">
                      <i class="el-icon-plus" style="font-size: 24px; color: #8c939d; margin-bottom: 5px"></i>
                      <div style="color: #8c939d; font-size: 12px">Upload Image</div>
                    </div>
                  </div>
                </el-upload>
              </div>
            </div>
          </div>

          <!-- Address input -->
          <el-form-item label="Feeding Point Address" style="margin-bottom: 20px">
            <div style="display: flex; align-items: center">
              <i class="el-icon-location-outline" style="color: #ff9500; margin-right: 8px"></i>
              <el-input
                  v-model="form.address"
                  placeholder="Please enter the detailed feeding point address"
                  style="flex: 1"
              ></el-input>
            </div>
          </el-form-item>

          <!-- Description input -->
          <el-form-item label="Description" style="margin-bottom: 20px">
            <div style="display: flex; align-items: flex-start">
              <i class="el-icon-document" style="color: #2e8b57; margin-right: 8px; margin-top: 8px"></i>
              <el-input
                  type="textarea"
                  :rows="4"
                  v-model="form.information"
                  placeholder="Please describe this feeding point, such as surroundings and common animals"
                  style="flex: 1"
              ></el-input>
            </div>
          </el-form-item>
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
  name: "Feed",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 6,
      name: "",
      form: {},
      dialogFormVisible: false,
      multipleSelection: [],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      uploadUrl: (process.env.VUE_APP_BASE_API || "http://localhost:9090") + "/file/upload"
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/feed/page", {
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
      if (!this.form.address) {
        this.$message.warning("Please enter the feeding point address")
        return
      }
      this.request.post("/feed", this.form).then(res => {
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
      this.$confirm('Are you sure you want to delete this feeding point?', 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        customClass: 'custom-confirm'
      }).then(() => {
        this.request.delete("/feed/" + id).then(res => {
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
      this.$confirm(`Are you sure you want to delete the selected ${ids.length} feeding points?`, 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.request.post("/feed/del/batch", ids).then(res => {
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
      this.$message.success("Photo 1 uploaded successfully")
    },
    handleImgUploadSuccess2(res) {
      this.form.img2 = res
      this.$message.success("Photo 2 uploaded successfully")
    },
    handleImgUploadSuccess3(res) {
      this.form.img3 = res
      this.$message.success("Photo 3 uploaded successfully")
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Images must be JPG/PNG format!')
      }
      if (!isLt2M) {
        this.$message.error('Image size cannot exceed 2MB!')
      }
      return isJPG && isLt2M
    },
    removeImage(field) {
      this.$set(this.form, field, '')
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

/* Image preview styles */
.el-image {
  transition: transform 0.3s ease;
}

.el-image:hover {
  transform: scale(1.02);
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
::v-deep .feed-dialog {
  border-radius: 12px;
}

::v-deep .feed-dialog .el-dialog__header {
  background-color: #f9f9f9;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 12px 12px 0 0;
  padding: 15px 20px;
}

::v-deep .feed-dialog .el-dialog__title {
  color: #333;
  font-size: 18px;
  font-weight: bold;
}

::v-deep .feed-dialog .el-dialog__body {
  padding: 20px;
}

/* Upload component styles */
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: #ff6b6b;
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

/* Form styles */
::v-deep .el-input__inner {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

::v-deep .el-input__inner:focus {
  border-color: #ff6b6b;
  box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.1);
}

::v-deep .el-textarea__inner {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

::v-deep .el-textarea__inner:focus {
  border-color: #ff6b6b;
  box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.1);
}

/* Responsive design */
@media (max-width: 992px) {
  div[style*="grid-template-columns: repeat(auto-fill, minmax(380px, 1fr))"] {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
  }

  ::v-deep .el-dialog {
    width: 90% !important;
  }
}

@media (max-width: 768px) {
  div[style*="grid-template-columns: repeat(auto-fill, minmax(380px, 1fr))"] {
    grid-template-columns: 1fr !important;
  }

  div[style*="display: grid; grid-template-columns: repeat(3, 1fr)"] {
    grid-template-columns: repeat(2, 1fr) !important;
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
