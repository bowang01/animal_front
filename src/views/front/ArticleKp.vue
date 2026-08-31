<template>
  <div class="pet-adoption-container" style="min-height: calc(100vh - 60px); margin: 10px 0">

    <!-- Pet adoption card grid layout -->
    <div class="pet-grid-container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-for="item in tableData" :key="item.id">
          <div class="pet-card">
            <!-- Pet image -->
            <div class="pet-image-container">
              <el-image
                  :src="item.img"
                  class="pet-image"
                  :preview-src-list="[item.img]"
                  fit="cover">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <div class="pet-status-tag" v-if="item.status">
                <span class="status-dot"></span>
                {{ item.status }}
              </div>
            </div>

            <!-- Pet info -->
            <div class="pet-info">
              <div class="pet-name" @click="view(item.id, item.content)">
                {{ item.name }}
              </div>

              <div class="pet-meta">
                <div class="meta-item">
                  <i class="el-icon-view meta-icon"></i>
                  <span class="meta-text">{{ item.read1 }} views</span>
                </div>
                <div class="meta-item">
                  <i class="el-icon-time meta-icon"></i>
                  <span class="meta-text">{{ item.time }}</span>
                </div>
              </div>

              <div class="pet-actions" v-if="item.userId === user.id">
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
        :title="form.id ? 'Edit Adoption Info' : 'Publish Adoption Info'"
        :visible.sync="dialogFormVisible"
        width="80%"
        :close-on-click-modal="false"
        class="pet-dialog">
      <el-form label-width="100px" size="medium" style="width: 100%">
        <el-form-item label="Pet Name">
          <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="Enter pet name"
              style="width: 100%">
          </el-input>
        </el-form-item>

        <el-form-item label="Cover Image">
          <el-upload
              class="pet-uploader"
              :action="'http://localhost:9090/file/upload'"
              :show-file-list="false"
              :on-success="handleImgUploadSuccess"
              accept="image/*">
            <img v-if="form.img" :src="form.img" class="uploaded-image">
            <div v-else class="uploader-placeholder">
              <i class="el-icon-plus uploader-icon"></i>
              <div class="uploader-text">Upload pet photo</div>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="Description">
          <mavon-editor
              ref="md"
              v-model="form.content"
              :ishljs="true"
              @imgAdd="imgAdd"
              placeholder="Describe the pet's condition, health status, adoption requirements, etc..."
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
        title="Adoption Details"
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
  name: "PetAdoption",
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
    view(id, content) {
      this.request.get("/articleKp/" + id)
      this.content = content
      this.vis = true
    },
    // Bind @imgAdd event
    imgAdd(pos, $file) {
      let $vm = this.$refs.md
      const formData = new FormData();
      formData.append('file', $file);
      axios({
        url: 'http://localhost:9090/file/upload',
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      }).then((res) => {
        $vm.$img2Url(pos, res.data);
      })
    },
    load() {
      this.request.get("/articleKp/page", {
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
      this.request.post("/articleKp", this.form).then(res => {
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
      this.$confirm('Are you sure you want to delete this adoption listing?', 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        customClass: 'delete-confirm'
      }).then(() => {
        this.request.delete("/articleKp/" + id).then(res => {
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
      this.request.post("/articleKp/del/batch", ids).then(res => {
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
      window.open("http://localhost:9090/articleKp/export")
    },
    handleExcelImportSuccess() {
      this.$message.success("Import successful")
      this.load()
    }
  }
}
</script>

<style scoped>
.pet-adoption-container {
  background-color: #f8f9fa;
  padding: 20px;
}

/* Pet grid layout */
.pet-grid-container {
  padding: 10px;
}

.pet-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e8f4f2;
}

.pet-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(67, 160, 71, 0.15);
  border-color: #4caf50;
}

/* Pet image area */
.pet-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.pet-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.pet-card:hover .pet-image {
  transform: scale(1.05);
}

.image-slot {
  width: 100%;
  height: 100%;
  background: #f0f7f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #81c784;
  font-size: 40px;
}

.pet-status-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.95);
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
  color: #388e3c;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #c8e6c9;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #4caf50;
  border-radius: 50%;
  display: inline-block;
}

/* Pet info area */
.pet-info {
  padding: 16px;
}

.pet-name {
  font-size: 18px;
  font-weight: 600;
  color: #2e7d32;
  margin-bottom: 12px;
  cursor: pointer;
  transition: color 0.3s ease;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.pet-name:hover {
  color: #1b5e20;
}

.pet-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-icon {
  color: #81c784;
  font-size: 14px;
}

.meta-text {
  font-size: 12px;
  color: #666;
}

.pet-actions {
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
  color: #4caf50;
  border: 1px solid #c8e6c9;
  background: #f1f8e9;
}

.edit-btn:hover {
  background: #4caf50;
  color: white;
  border-color: #4caf50;
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
.pet-dialog {
  border-radius: 12px;
  overflow: hidden;
}

.pet-dialog >>> .el-dialog__header {
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  padding: 20px;
}

.pet-dialog >>> .el-dialog__title {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.pet-dialog >>> .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

/* Upload component styles */
.pet-uploader {
  width: 200px;
  height: 200px;
  border: 2px dashed #c8e6c9;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #f9fdf9;
}

.pet-uploader:hover {
  border-color: #4caf50;
  background: #f1f8e9;
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
  color: #81c784;
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
  background: #4caf50;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  transition: all 0.3s ease;
}

.save-btn:hover {
  background: #388e3c;
  transform: translateY(-1px);
}

/* View dialog styles */
.view-dialog {
  border-radius: 12px;
}

.view-dialog >>> .el-dialog__header {
  background: #4caf50;
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .pet-grid-container {
    padding: 0;
  }

  .pet-card {
    margin-bottom: 15px;
  }

  .pet-image-container {
    height: 180px;
  }

  .pet-dialog {
    width: 95% !important;
  }
}

@media (max-width: 480px) {
  .pet-adoption-container {
    padding: 10px;
  }

  .pet-image-container {
    height: 160px;
  }

  .pet-info {
    padding: 12px;
  }

  .pet-name {
    font-size: 16px;
  }
}
</style>
