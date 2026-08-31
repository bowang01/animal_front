<template>
  <div class="salvation-container" style="min-height: calc(100vh - 70px)">
    <!-- Report action bar -->
    <div class="report-header">
      <el-button type="primary" @click="handleAdd" size="medium" class="add-report-btn">
        <i class="el-icon-warning-outline"></i> Report Stray Animal
      </el-button>
    </div>

    <!-- Report grid layout -->
    <div class="report-grid-container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-for="item in tableData" :key="item.id">
          <div class="report-card">
            <!-- Status badge -->
            <div class="status-badge" :class="getStatusClass(item.state)">
              {{ item.state || 'Pending' }}
            </div>

            <!-- Animal image -->
            <div class="animal-image-container">
              <el-image
                  :src="item.img"
                  class="animal-image"
                  :preview-src-list="[item.img]"
                  fit="cover">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>

            <!-- Report info -->
            <div class="report-info">
              <div class="report-description" @click="viewDetail(item)">
                {{ item.information }}
              </div>

              <div class="report-details">
                <div class="detail-item">
                  <i class="el-icon-location-information detail-icon"></i>
                  <span class="detail-text">{{ item.address }}</span>
                </div>

                <div class="detail-item">
                  <i class="el-icon-time detail-icon"></i>
                  <span class="detail-text">{{ formatTime(item.time) }}</span>
                </div>
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

    <!-- Add/Edit report dialog -->
    <el-dialog
        :title="form.id ? 'Edit Report' : 'Report Stray Animal'"
        :visible.sync="dialogFormVisible"
        width="40%"
        :close-on-click-modal="false"
        class="report-dialog">
      <el-form label-width="100px" size="medium" style="width: 100%">
        <el-form-item label="Description" prop="information" required>
          <el-input
              type="textarea"
              :rows="3"
              v-model="form.information"
              autocomplete="off"
              placeholder="Please describe the animal's condition, appearance, behavior, etc..."
              maxlength="200"
              show-word-limit>
          </el-input>
        </el-form-item>

        <el-form-item label="On-site Photo" required>
          <div class="upload-container">
            <el-upload
                action="http://localhost:9090/file/upload"
                ref="img"
                :on-success="handleImgUploadSuccess"
                :show-file-list="false"
                accept="image/*"
                class="report-upload">
              <div class="upload-area">
                <div v-if="form.img" class="upload-preview">
                  <img :src="form.img" class="preview-image">
                  <div class="preview-overlay">
                    <i class="el-icon-refresh-left"></i>
                    <div>Re-upload</div>
                  </div>
                </div>
                <div v-else class="upload-placeholder">
                  <i class="el-icon-camera-solid"></i>
                  <div class="upload-text">Click to upload photo</div>
                  <div class="upload-hint">Clear photos recommended</div>
                </div>
              </div>
            </el-upload>
          </div>
        </el-form-item>

        <el-form-item label="Found Location" prop="address" required>
          <el-input
              v-model="form.address"
              autocomplete="off"
              placeholder="Please enter detailed address">
          </el-input>
        </el-form-item>

        <el-form-item label="Found Time" prop="time" required>
          <el-date-picker
              v-model="form.time"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="Select found time"
              style="width: 100%">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Contact Person" prop="person" required>
          <el-input
              v-model="form.person"
              autocomplete="off"
              placeholder="Please enter your name">
          </el-input>
        </el-form-item>

        <el-form-item label="Phone" prop="phone" required>
          <el-input
              v-model="form.phone"
              autocomplete="off"
              placeholder="Please enter your phone number"
              maxlength="11">
          </el-input>
        </el-form-item>

        <el-form-item label="Resolution Status" v-if="form.id">
          <el-select v-model="form.state" placeholder="Please select status" style="width: 100%">
            <el-option label="Pending" value="Pending"></el-option>
            <el-option label="In progress" value="In progress"></el-option>
            <el-option label="Resolved" value="Resolved"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="medium" class="cancel-btn">Cancel</el-button>
        <el-button type="primary" @click="save" size="medium" class="submit-btn">Submit Report</el-button>
      </div>
    </el-dialog>

    <!-- Detail dialog -->
    <el-dialog
        title="Report Details"
        :visible.sync="detailVisible"
        width="45%"
        :close-on-click-modal="false"
        class="detail-dialog">
      <div class="detail-content">
        <div class="detail-header">
          <div class="detail-status" :class="getStatusClass(currentDetail.state)">
            {{ currentDetail.state || 'Pending' }}
          </div>
          <div class="detail-time">
            <i class="el-icon-time"></i> {{ formatTime(currentDetail.time) }}
          </div>
        </div>

        <div class="detail-image">
          <el-image
              :src="currentDetail.img"
              :preview-src-list="[currentDetail.img]"
              fit="cover"
              style="width: 100%; height: 250px; border-radius: 8px;">
            <div slot="error" class="detail-image-slot">
              <i class="el-icon-picture-outline"></i>
              <div>Image failed to load</div>
            </div>
          </el-image>
        </div>

        <div class="detail-section">
          <div class="section-title">
            <i class="el-icon-document section-icon"></i>
            <span>Description</span>
          </div>
          <div class="section-content">{{ currentDetail.information }}</div>
        </div>

        <div class="detail-info-grid">
          <div class="info-item">
            <div class="info-label">
              <i class="el-icon-location-information"></i> Found Location
            </div>
            <div class="info-value">{{ currentDetail.address }}</div>
          </div>

          <div class="info-item">
            <div class="info-label">
              <i class="el-icon-user"></i> Contact Person
            </div>
            <div class="info-value">{{ currentDetail.person }}</div>
          </div>

          <div class="info-item">
            <div class="info-label">
              <i class="el-icon-phone"></i> Phone
            </div>
            <div class="info-value">{{ currentDetail.phone }}</div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="detail-actions" v-if="user.id">
          <el-button
              type="primary"
              size="medium"
              @click="handleEdit(currentDetail)"
              class="edit-btn">
            <i class="el-icon-edit"></i> Edit
          </el-button>
          <el-button
              type="danger"
              size="medium"
              @click="confirmDelete(currentDetail.id)"
              class="delete-btn">
            <i class="el-icon-delete"></i> Delete
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PetSalvation",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 8,
      name: "",
      form: {},
      dialogFormVisible: false,
      detailVisible: false,
      currentDetail: {},
      multipleSelection: [],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    getStatusClass(state) {
      switch(state) {
        case 'Resolved':
          return 'status-solved'
        case 'In progress':
          return 'status-processing'
        case 'Pending':
          return 'status-pending'
        default:
          return 'status-pending'
      }
    },

    formatTime(time) {
      if (!time) return ''
      return time.length > 16 ? time.substr(0, 16) : time
    },

    viewDetail(item) {
      this.currentDetail = { ...item }
      this.detailVisible = true
    },

    confirmDelete(id) {
      this.$confirm('Are you sure you want to delete this report?', 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        customClass: 'delete-confirm'
      }).then(() => {
        this.del(id)
      }).catch(() => {})
    },

    load() {
      this.request.get("/salvation/page", {
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
      if (!this.form.information) {
        this.$message.error("Please fill in the description")
        return
      }
      if (!this.form.img) {
        this.$message.error("Please upload an on-site photo")
        return
      }
      if (!this.form.address) {
        this.$message.error("Please fill in the found location")
        return
      }
      if (!this.form.time) {
        this.$message.error("Please select the found time")
        return
      }
      if (!this.form.person) {
        this.$message.error("Please fill in the contact person")
        return
      }
      if (!this.form.phone) {
        this.$message.error("Please fill in the phone number")
        return
      }

      this.request.post("/salvation", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success(this.form.id ? "Updated successfully" : "Report submitted successfully")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("Submission failed")
        }
      })
    },

    handleAdd() {
      this.form = {}
      this.dialogFormVisible = true
      this.$nextTick(() => {
        if(this.$refs.img) {
          this.$refs.img.clearFiles();
        }
      })
    },

    handleEdit(item) {
      this.detailVisible = false
      this.form = JSON.parse(JSON.stringify(item))
      this.dialogFormVisible = true
      this.$nextTick(() => {
        if(this.$refs.img) {
          this.$refs.img.clearFiles();
        }
      })
    },

    del(id) {
      this.request.delete("/salvation/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("Deleted successfully")
          this.detailVisible = false
          this.load()
        } else {
          this.$message.error("Delete failed")
        }
      })
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
      this.request.post("/salvation/del/batch", ids).then(res => {
        if (res.code === '200') {
          this.$message.success("Batch delete succeeded")
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
      window.open("http://localhost:9090/salvation/export")
    },

    handleExcelImportSuccess() {
      this.$message.success("Import succeeded")
      this.load()
    }
  }
}
</script>

<style scoped>
.salvation-container {
  background-color: #f8f9fa;
  padding: 20px;
}

/* Report header */
.report-header {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.add-report-btn {
  background: #ff6f61;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.add-report-btn:hover {
  background: #ff5a4a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 111, 97, 0.3);
}

/* Report grid layout */
.report-grid-container {
  padding: 10px;
}

.report-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #ffe6e6;
  position: relative;
  cursor: pointer;
}

.report-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(255, 111, 97, 0.15);
  border-color: #ff6f61;
}

/* Status badge */
.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.status-pending {
  background: #fff3e0;
  color: #f57c00;
  border: 1px solid #ffcc80;
}

.status-processing {
  background: #e3f2fd;
  color: #1976d2;
  border: 1px solid #90caf9;
}

.status-solved {
  background: #e8f5e9;
  color: #388e3c;
  border: 1px solid #a5d6a7;
}

/* Animal image area */
.animal-image-container {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.animal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.report-card:hover .animal-image {
  transform: scale(1.05);
}

.image-slot {
  width: 100%;
  height: 100%;
  background: #fff5f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff9a3c;
  font-size: 40px;
}

/* Report info area */
.report-info {
  padding: 16px;
}

.report-description {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  min-height: 68px;
}

.report-details {
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
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
  color: #ff6f61;
  font-size: 14px;
  min-width: 16px;
}

.detail-text {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

/* Pagination styles */
.pagination-container {
  background: white;
  padding: 16px;
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* Add/Edit dialog styles */
.report-dialog {
  border-radius: 12px;
  overflow: hidden;
}

.report-dialog >>> .el-dialog__header {
  background: #ff6f61;
  padding: 20px;
}

.report-dialog >>> .el-dialog__title {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.report-dialog >>> .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

/* Upload component styles */
.upload-container {
  width: 100%;
}

.report-upload {
  width: 100%;
}

.upload-area {
  width: 100%;
  height: 200px;
  border: 2px dashed #ffccbc;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #fff5f0;
}

.upload-area:hover {
  border-color: #ff6f61;
  background: #ffebee;
}

.upload-preview {
  position: relative;
  width: 100%;
  height: 100%;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 6px;
}

.upload-preview:hover .preview-overlay {
  opacity: 1;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #ff9a3c;
}

.upload-placeholder i {
  font-size: 48px;
  margin-bottom: 12px;
}

.upload-text {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
}

.upload-hint {
  font-size: 12px;
  color: #999;
}

/* Form styles */
.report-dialog >>> .el-form-item__label {
  color: #666;
  font-weight: 500;
}

.report-dialog >>> .el-form-item.is-required .el-form-item__label::before {
  color: #ff6f61;
}

.report-dialog >>> .el-input__inner,
.report-dialog >>> .el-textarea__inner {
  border: 1px solid #ffccbc;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.report-dialog >>> .el-input__inner:focus,
.report-dialog >>> .el-textarea__inner:focus {
  border-color: #ff6f61;
  box-shadow: 0 0 0 2px rgba(255, 111, 97, 0.1);
}

.report-dialog >>> .el-date-editor {
  width: 100%;
}

/* Detail dialog styles */
.detail-dialog {
  border-radius: 12px;
  overflow: hidden;
}

.detail-dialog >>> .el-dialog__header {
  background: #ff6f61;
  padding: 20px;
}

.detail-dialog >>> .el-dialog__title {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.detail-dialog >>> .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

.detail-content {
  padding: 0;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-status {
  padding: 6px 16px;
  border-radius: 15px;
  font-size: 13px;
  font-weight: 500;
}

.detail-time {
  color: #666;
  font-size: 14px;
}

.detail-time i {
  margin-right: 6px;
  color: #ff6f61;
}

.detail-image-slot {
  width: 100%;
  height: 250px;
  background: #fff5f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ff9a3c;
  border-radius: 8px;
}

.detail-image-slot i {
  font-size: 48px;
  margin-bottom: 12px;
}

.detail-section {
  margin: 20px 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.section-icon {
  color: #ff6f61;
}

.section-content {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  line-height: 1.6;
  color: #333;
  font-size: 14px;
  white-space: pre-wrap;
}

.detail-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.info-item {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
}

.info-label {
  color: #666;
  font-size: 13px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.info-label i {
  color: #ff6f61;
}

.info-value {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.edit-btn {
  background: #36a3f7;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
}

.edit-btn:hover {
  background: #1890ff;
}

.delete-btn {
  background: #f44336;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
}

.delete-btn:hover {
  background: #d32f2f;
}

/* Button styles */
.cancel-btn {
  border: 1px solid #dcdfe6;
  color: #606266;
  padding: 10px 24px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  border-color: #c0c4cc;
  background: #f5f7fa;
  transform: translateY(-1px);
}

.submit-btn {
  background: #ff6f61;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #ff5a4a;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 111, 97, 0.3);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .report-grid-container {
    padding: 0;
  }

  .report-card {
    margin-bottom: 15px;
  }

  .animal-image-container {
    height: 160px;
  }

  .report-dialog,
  .detail-dialog {
    width: 95% !important;
  }

  .upload-area {
    height: 180px;
  }

  .detail-info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .salvation-container {
    padding: 10px;
  }

  .animal-image-container {
    height: 140px;
  }

  .report-info {
    padding: 12px;
  }

  .report-description {
    font-size: 13px;
    -webkit-line-clamp: 2;
    min-height: 56px;
  }

  .detail-text {
    font-size: 12px;
  }

  .detail-actions {
    flex-direction: column;
  }

  .edit-btn,
  .delete-btn {
    width: 100%;
  }
}
</style>
