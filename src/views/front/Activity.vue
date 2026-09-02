<template>
  <div class="activity-container" style="min-height: calc(100vh - 60px); margin: 10px 0">

    <!-- Activity grid layout -->
    <div class="activity-grid-container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-for="item in tableData" :key="item.id">
          <div class="activity-card">
            <!-- Activity image -->
            <div class="activity-image-container">
              <el-image
                  :src="item.img"
                  class="activity-image"
                  :preview-src-list="[item.img]"
                  fit="cover">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <div class="activity-time-badge">
                <i class="el-icon-time badge-icon"></i>
                <span class="badge-text">{{ item.time.substr(0, 16) }}</span>
              </div>
            </div>

            <!-- Activity info -->
            <div class="activity-content">
              <div class="activity-title" @click="view(item.content)">
                {{ item.name }}
              </div>

              <div class="activity-details">
                <div class="detail-item">
                  <i class="el-icon-location detail-icon"></i>
                  <span class="detail-text">{{ item.address }}</span>
                </div>

                <div class="detail-item" v-if="item.num">
                  <i class="el-icon-user detail-icon"></i>
                  <span class="detail-text">Registered: {{ item.num }} people</span>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="activity-actions" v-if="item.userId === user.id">
                <el-button
                    type="text"
                    class="action-btn edit-btn"
                    @click="handleEdit(item)">
                  <i class="el-icon-edit"></i> Edit
                </el-button>
                <el-button
                    type="text"
                    class="action-btn delete-btn"
                    @click="del(item.id)">
                  <i class="el-icon-delete"></i> Delete
                </el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Pagination -->
    <div class="pagination-container">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[8, 12, 16, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background>
      </el-pagination>
    </div>

    <!-- Edit/Add dialog -->
    <el-dialog
        :title="form.id ? 'Edit Activity' : 'Publish Activity'"
        :visible.sync="dialogFormVisible"
        width="80%"
        :close-on-click-modal="false"
        class="activity-dialog">
      <el-form label-width="100px" size="medium" style="width: 100%">
        <el-form-item label="Title">
          <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="Enter activity title"
              style="width: 100%">
          </el-input>
        </el-form-item>

        <el-form-item label="Cover Image">
          <el-upload
              class="activity-uploader"
              :action="$apiBase + '/file/upload'"
              :show-file-list="false"
              :on-success="handleImgUploadSuccess"
              accept="image/*">
            <img v-if="form.img" :src="form.img" class="uploaded-image">
            <div v-else class="uploader-placeholder">
              <i class="el-icon-plus uploader-icon"></i>
              <div class="uploader-text">Upload activity image</div>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="Time">
          <el-date-picker
              v-model="form.time"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="Select activity time"
              style="width: 100%">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Capacity">
          <el-input
              v-model="form.num"
              autocomplete="off"
              placeholder="Enter registration capacity"
              style="width: 100%">
            <template slot="append">people</template>
          </el-input>
        </el-form-item>

        <el-form-item label="Location">
          <el-input
              v-model="form.address"
              autocomplete="off"
              placeholder="Enter activity location"
              style="width: 100%">
          </el-input>
        </el-form-item>

        <el-form-item label="Details">
          <mavon-editor
              ref="md"
              v-model="form.content"
              :ishljs="true"
              @imgAdd="imgAdd"
              placeholder="Enter activity details, schedule, notes, etc..."
              style="min-height: 400px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="cancel-btn">Cancel</el-button>
        <el-button type="primary" @click="save" class="save-btn">Save</el-button>
      </div>
    </el-dialog>

    <!-- View details dialog -->
    <el-dialog
        title="Activity Details"
        :visible.sync="vis"
        width="80%"
        :close-on-click-modal="false"
        class="view-dialog">
      <mavon-editor
          class="md"
          :value="content"
          :subfield="false"
          :defaultOpen="'preview'"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
          :ishljs="true"
          style="min-height: 500px"/>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PetActivity",
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
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      vis: false,
      content: ''
    }
  },
  created() {
    this.load()
  },
  methods: {
    view(content) {
      this.content = content
      this.vis = true
    },
    // Bind @imgAdd event
    imgAdd(pos, $file) {
      let $vm = this.$refs.md
      const formData = new FormData();
      formData.append('file', $file);
      axios({
        url: this.$apiBase + '/file/upload',
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      }).then((res) => {
        $vm.$img2Url(pos, res.data);
      })
    },
    load() {
      this.request.get("/activity/page", {
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
      this.request.post("/activity", this.form).then(res => {
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
        if(this.$refs.file) {
          this.$refs.file.clearFiles();
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
        if(this.$refs.file) {
          this.$refs.file.clearFiles();
        }
      })
    },
    del(id) {
      this.$confirm('Are you sure you want to delete this activity?', 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        customClass: 'delete-confirm'
      }).then(() => {
        this.request.delete("/activity/" + id).then(res => {
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
      console.log(val)
      this.multipleSelection = val
    },
    delBatch() {
      if (!this.multipleSelection.length) {
        this.$message.error("Please select data to delete")
        return
      }
      let ids = this.multipleSelection.map(v => v.id)
      this.request.post("/activity/del/batch", ids).then(res => {
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
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
    handleFileUploadSuccess(res) {
      this.form.file = res
    },
    handleImgUploadSuccess(res) {
      this.form.img = res
    },
    download(url) {
      window.open(url)
    },
    exp() {
      window.open(this.$apiBase + "/activity/export")
    },
    handleExcelImportSuccess() {
      this.$message.success("Import successful")
      this.load()
    }
  }
}
</script>

<style scoped>
.activity-container {
  background-color: #f8f9fa;
  padding: 20px;
}

/* Activity grid layout */
.activity-grid-container {
  padding: 10px;
}

.activity-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #fff0e6;
}

.activity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(255, 124, 67, 0.15);
  border-color: #ff7c43;
}

/* Activity image area */
.activity-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.activity-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.activity-card:hover .activity-image {
  transform: scale(1.05);
}

.image-slot {
  width: 100%;
  height: 100%;
  background: #fff5f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff9c6e;
  font-size: 40px;
}

.activity-time-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 124, 67, 0.95);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.badge-icon {
  font-size: 12px;
}

.badge-text {
  font-weight: 500;
}

/* Activity content area */
.activity-content {
  padding: 16px;
}

.activity-title {
  font-size: 18px;
  font-weight: 600;
  color: #ff7c43;
  margin-bottom: 12px;
  cursor: pointer;
  transition: color 0.3s ease;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 50px;
}

.activity-title:hover {
  color: #e65100;
}

.activity-details {
  margin-bottom: 16px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-icon {
  color: #ff9c6e;
  font-size: 14px;
  min-width: 16px;
}

.detail-text {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.activity-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.action-btn {
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.edit-btn {
  color: #ff7c43;
  border: 1px solid #ffd8c2;
  background: #fff5f0;
}

.edit-btn:hover {
  background: #ff7c43;
  color: white;
  border-color: #ff7c43;
}

.delete-btn {
  color: #f44336;
  border: 1px solid #ffcdd2;
  background: #ffebee;
}

.delete-btn:hover {
  background: #f44336;
  color: white;
  border-color: #f44336;
}

/* Pagination styles */
.pagination-container {
  background: white;
  padding: 16px;
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* Dialog styles */
.activity-dialog {
  border-radius: 12px;
  overflow: hidden;
}

.activity-dialog >>> .el-dialog__header {
  background: #ff7c43;
  padding: 20px;
}

.activity-dialog >>> .el-dialog__title {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.activity-dialog >>> .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

/* Upload component styles */
.activity-uploader {
  width: 200px;
  height: 200px;
  border: 2px dashed #ffd8c2;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #fffaf5;
}

.activity-uploader:hover {
  border-color: #ff7c43;
  background: #fff5f0;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.uploader-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #ff9c6e;
}

.uploader-icon {
  font-size: 40px;
  margin-bottom: 8px;
}

.uploader-text {
  font-size: 14px;
  color: #666;
}

/* Button styles */
.cancel-btn {
  border: 1px solid #dcdfe6;
  color: #606266;
  padding: 10px 20px;
  border-radius: 6px;
}

.cancel-btn:hover {
  border-color: #c0c4cc;
  background: #f5f7fa;
}

.save-btn {
  background: #ff7c43;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  transition: all 0.3s ease;
}

.save-btn:hover {
  background: #e65100;
  transform: translateY(-1px);
}

/* View dialog styles */
.view-dialog {
  border-radius: 12px;
}

.view-dialog >>> .el-dialog__header {
  background: #ff7c43;
  padding: 20px;
  border-radius: 12px 12px 0 0;
}

.view-dialog >>> .el-dialog__title {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.view-dialog >>> .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

/* Form element styles */
.activity-dialog >>> .el-form-item__label {
  color: #666;
  font-weight: 500;
}

.activity-dialog >>> .el-input__inner {
  border: 1px solid #ffd8c2;
  border-radius: 6px;
}

.activity-dialog >>> .el-input__inner:focus {
  border-color: #ff7c43;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .activity-grid-container {
    padding: 0;
  }

  .activity-card {
    margin-bottom: 15px;
  }

  .activity-image-container {
    height: 180px;
  }

  .activity-dialog {
    width: 95% !important;
  }

  .activity-uploader {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .activity-container {
    padding: 10px;
  }

  .activity-image-container {
    height: 160px;
  }

  .activity-content {
    padding: 12px;
  }

  .activity-title {
    font-size: 16px;
    min-height: 44px;
  }

  .detail-text {
    font-size: 13px;
  }
}
</style>
