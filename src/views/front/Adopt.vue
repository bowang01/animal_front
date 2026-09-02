<template>
  <div style="padding-bottom: 20px; min-height: calc(100vh - 60px); background-color: #f8f9fa;">
    <!-- Search and action bar -->
    <div style="padding: 20px; background-color: #fff; border-radius: 12px; margin: 10px 0; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);">
      <div style="display: flex; align-items: center; gap: 15px;">
        <el-input
            v-model="nickname"
            style="width: 400px"
            size="medium"
            placeholder="Search pet name or breed"
            prefix-icon="el-icon-search">
        </el-input>
        <el-button type="primary" size="medium" @click="load">Search</el-button>
        <el-button type="success" style="margin-left: 30px" size="medium" @click="$router.push('/front/myAdopt')">
          <i class="el-icon-view" style="margin-right: 5px;"></i>View My Adoptions
        </el-button>
      </div>
    </div>

    <!-- Pet grid layout - 2 columns per row -->
    <div class="pet-grid-container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-for="item in tableData" :key="item.id">
          <div class="pet-card">
            <!-- Pet image on top -->
            <div class="pet-image-container" @click="viewPetDetail(item)">
              <img :src="item.img" alt="" class="pet-image">
              <div class="pet-basic-info">
                <span class="pet-name">{{ item.nickname }}</span>
                <div class="pet-tags">
                  <span class="pet-tag gender-tag">{{ item.sex }}</span>
                  <span class="pet-tag age-tag">{{ item.age }}</span>
                </div>
              </div>
              <div class="image-overlay">
                <i class="el-icon-view overlay-icon"></i>
                <span>View Details</span>
              </div>
            </div>

            <!-- Pet details below -->
            <div class="pet-details">
              <div class="details-grid">
                <div class="detail-item">
                  <i class="el-icon-first-aid-kit detail-icon"></i>
                  <div class="detail-content">
                    <div class="detail-label">Sterilization</div>
                    <div class="detail-value">{{ item.sterilization }}</div>
                  </div>
                </div>

                <div class="detail-item">
                  <i class="el-icon-first-aid-kit detail-icon"></i>
                  <div class="detail-content">
                    <div class="detail-label">Vaccination</div>
                    <div class="detail-value">{{ item.vaccine }}</div>
                  </div>
                </div>

                <div class="detail-item">
                  <i class="el-icon-sunny detail-icon"></i>
                  <div class="detail-content">
                    <div class="detail-label">Health Status</div>
                    <div class="detail-value">{{ item.status }}</div>
                  </div>
                </div>
              </div>

              <div class="pet-description">
                <i class="el-icon-document description-icon"></i>
                <div class="description-content">
                  <div class="description-label">Pet Description</div>
                  <div class="description-text">{{ item.information }}</div>
                </div>
              </div>

              <!-- Apply for adoption button -->
              <div class="adopt-action">
                <el-button
                    type="primary"
                    @click="handleApply(item.id)"
                    class="adopt-btn"
                    size="medium">
                  <i class="el-icon-s-promotion" style="margin-right: 5px;"></i>Apply for Adoption
                </el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Pagination -->
    <div style="padding: 16px; background-color: #fff; border-radius: 12px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[4, 8, 12, 16]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background>
      </el-pagination>
    </div>

    <!-- Pet detail dialog -->
    <el-dialog
        title="Pet Details"
        :visible.sync="detailDialogVisible"
        width="50%"
        :close-on-click-modal="false"
        append-to-body
        class="pet-detail-dialog">
      <div v-if="currentPet" class="pet-detail-content">
        <!-- Pet basic info -->
        <div class="detail-header">
          <div class="detail-pet-info">
            <div class="detail-pet-name">{{ currentPet.nickname }}</div>
            <div class="detail-pet-tags">
              <span class="detail-tag gender-tag">{{ currentPet.sex }}</span>
              <span class="detail-tag age-tag">{{ currentPet.age }}</span>
              <span class="detail-tag status-tag">{{ currentPet.status }}</span>
            </div>
          </div>
        </div>

        <!-- Pet image -->
        <div class="detail-image">
          <el-image
              :src="currentPet.img"
              :preview-src-list="[currentPet.img]"
              fit="cover"
              style="width: 100%; height: 300px; border-radius: 8px;">
            <div slot="error" class="detail-image-error">
              <i class="el-icon-picture-outline"></i>
              <div>Image failed to load</div>
            </div>
          </el-image>
        </div>

        <!-- Detail info grid -->
        <div class="detail-info-grid">
          <div class="info-item">
            <div class="info-label">
              <i class="el-icon-first-aid-kit"></i> Sterilization
            </div>
            <div class="info-value">{{ currentPet.sterilization }}</div>
          </div>

          <div class="info-item">
            <div class="info-label">
              <i class="el-icon-first-aid-kit"></i> Vaccination
            </div>
            <div class="info-value">{{ currentPet.vaccine }}</div>
          </div>

          <div class="info-item">
            <div class="info-label">
              <i class="el-icon-sunny"></i> Health Status
            </div>
            <div class="info-value">{{ currentPet.status }}</div>
          </div>

          <div class="info-item full-width">
            <div class="info-label">
              <i class="el-icon-date"></i> Adoption Status
            </div>
            <div class="info-value">{{ currentPet.state || 'Awaiting adoption' }}</div>
          </div>
        </div>

        <!-- Pet description -->
        <div class="detail-description">
          <div class="description-header">
            <i class="el-icon-document"></i> Pet Description
          </div>
          <div class="description-content">{{ currentPet.information }}</div>
        </div>

        <!-- Action buttons -->
        <div class="detail-actions">
          <el-button
              type="primary"
              size="medium"
              @click="handleApplyFromDetail(currentPet.id)"
              class="detail-adopt-btn">
            <i class="el-icon-s-promotion" style="margin-right: 5px;"></i>Apply for Adoption Now
          </el-button>
          <el-button
              type="info"
              size="medium"
              @click="detailDialogVisible = false"
              class="detail-close-btn">
            Close
          </el-button>
        </div>
      </div>
    </el-dialog>

    <!-- Adoption application dialog -->
    <el-dialog
        :title="form.id ? 'Edit Application' : 'Apply for Adoption'"
        :visible.sync="dialogFormVisible"
        width="45%"
        :close-on-click-modal="false"
        append-to-body
        class="adopt-dialog">
      <el-form label-width="100px" size="medium" style="width: 100%;">
        <div class="dialog-form-grid">
          <div class="form-column">
            <el-form-item label="Applicant Name" required>
              <el-input v-model="form.name" autocomplete="off" placeholder="Please enter your name"></el-input>
            </el-form-item>

            <el-form-item label="Gender" required>
              <el-radio-group v-model="form.sex">
                <el-radio label="Male">Male</el-radio>
                <el-radio label="Female">Female</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Age" required>
              <el-input v-model="form.age" autocomplete="off" placeholder="Please enter your age">
                <template slot="append">years</template>
              </el-input>
            </el-form-item>

            <el-form-item label="Marital Status" required>
              <el-radio-group v-model="form.married">
                <el-radio label="Single">Single</el-radio>
                <el-radio label="Married">Married</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Occupation" required>
              <el-input v-model="form.profession" autocomplete="off" placeholder="Please enter your occupation"></el-input>
            </el-form-item>
          </div>

          <div class="form-column">
            <el-form-item label="Monthly Income" required>
              <el-input v-model="form.income" autocomplete="off" placeholder="Please enter your monthly income">
                <template slot="append">CNY</template>
              </el-input>
            </el-form-item>

            <el-form-item label="Phone" required>
              <el-input v-model="form.phone" autocomplete="off" placeholder="Please enter your phone number" maxlength="11"></el-input>
            </el-form-item>

            <el-form-item label="Current Address" required>
              <el-input v-model="form.address" autocomplete="off" placeholder="Please enter your detailed address"></el-input>
            </el-form-item>

            <el-form-item label="Pet Experience" required>
              <el-radio-group v-model="form.experience">
                <el-radio label="No experience">No experience</el-radio>
                <el-radio label="Experienced">Experienced</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>

        <el-form-item label="Adoption Reason" required class="full-width">
          <el-input
              type="textarea"
              :rows="4"
              v-model="form.reason"
              autocomplete="off"
              placeholder="Please describe why you want to adopt and your care plan"
              maxlength="500"
              show-word-limit>
          </el-input>
        </el-form-item>

        <div class="form-tips">
          <i class="el-icon-info"></i>
          <span>We will review your application. Please ensure the information is accurate</span>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="cancel-btn">Cancel</el-button>
        <el-button type="primary" @click="save" class="submit-btn">Submit Application</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "FrontHome",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 4,
      nickname: "",
      dialogFormVisible: false,
      detailDialogVisible: false,
      currentPet: null,
      form: {},
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    }
  },
  created() {
    this.load()
  },
  methods: {
    viewPetDetail(item) {
      this.currentPet = { ...item }
      this.detailDialogVisible = true
    },

    handleApplyFromDetail(animalId) {
      this.detailDialogVisible = false
      this.form = {animalId: animalId}
      this.dialogFormVisible = true
    },

    save() {
      // Form validation
      if (!this.form.name) {
        this.$message.error("Please enter applicant name")
        return
      }
      if (!this.form.sex) {
        this.$message.error("Please select gender")
        return
      }
      if (!this.form.age) {
        this.$message.error("Please enter age")
        return
      }
      if (!this.form.phone) {
        this.$message.error("Please enter phone number")
        return
      }
      if (!this.form.address) {
        this.$message.error("Please enter current address")
        return
      }
      if (!this.form.profession) {
        this.$message.error("Please enter occupation")
        return
      }
      if (!this.form.income) {
        this.$message.error("Please enter monthly income")
        return
      }
      if (!this.form.experience) {
        this.$message.error("Please select pet experience")
        return
      }
      if (!this.form.married) {
        this.$message.error("Please select marital status")
        return
      }
      if (!this.form.reason) {
        this.$message.error("Please enter adoption reason")
        return
      }

      this.form.userId = this.user.id
      this.request.post("/applcation", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("Application submitted successfully, please wait for review")
          this.dialogFormVisible = false
        } else {
          this.$message.error("Submission failed")
        }
      })
    },

    handleApply(animalId) {
      this.form = {animalId: animalId}
      this.dialogFormVisible = true
    },

    load() {
      this.request.get("/animal/page/user", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.nickname,
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
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
  }
}
</script>

<style scoped>
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
  border: 1px solid #e6f4ff;
}

.pet-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(64, 158, 255, 0.15);
  border-color: #409eff;
}

/* Pet image area - on top */
.pet-image-container {
  position: relative;
  height: 200px;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
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

/* Image hover overlay */
.image-overlay {
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
}

.pet-image-container:hover .image-overlay {
  opacity: 1;
}

.overlay-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.image-overlay span {
  font-size: 14px;
  font-weight: 500;
}

.pet-basic-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 15px;
  color: white;
}

.pet-name {
  font-size: 18px;
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
}

.pet-tags {
  display: flex;
  gap: 8px;
}

.pet-tag {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.gender-tag {
  background: #ff7c43;
}

.age-tag {
  background: #36a3f7;
}

/* Pet details area - below */
.pet-details {
  padding: 20px;
}

/* Details grid */
.details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: #f8fafc;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: #f0f7ff;
}

.detail-icon {
  color: #409eff;
  font-size: 16px;
  flex-shrink: 0;
}

.detail-content {
  flex: 1;
}

.detail-label {
  font-size: 11px;
  color: #666;
  margin-bottom: 2px;
}

.detail-value {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

/* Pet description area */
.pet-description {
  display: flex;
  gap: 10px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.pet-description:hover {
  background: #f0f7ff;
}

.description-icon {
  color: #409eff;
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
}

.description-content {
  flex: 1;
}

.description-label {
  font-size: 11px;
  color: #666;
  margin-bottom: 4px;
}

.description-text {
  font-size: 13px;
  color: #333;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 40px;
}

/* Adopt button */
.adopt-action {
  margin-top: 4px;
}

.adopt-btn {
  width: 100%;
  background: linear-gradient(135deg, #409eff, #337ecc);
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.adopt-btn:hover {
  background: linear-gradient(135deg, #66b1ff, #409eff);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

/* Pet detail dialog styles */
.pet-detail-dialog >>> .el-dialog {
  border-radius: 12px;
  overflow: hidden;
  margin-top: 8vh !important;
  margin-bottom: 8vh;
}

.pet-detail-dialog >>> .el-dialog__body {
  max-height: calc(100vh - 180px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.pet-detail-dialog >>> .el-dialog__header {
  background: #409eff;
  padding: 20px;
}

.pet-detail-dialog >>> .el-dialog__title {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.pet-detail-dialog >>> .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

.pet-detail-content {
  padding: 0;
}

.detail-header {
  margin-bottom: 20px;
}

.detail-pet-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-pet-name {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.detail-pet-tags {
  display: flex;
  gap: 10px;
}

.detail-tag {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
}

.status-tag {
  background: #e8f5e9;
  color: #388e3c;
  border: 1px solid #a5d6a7;
}

.detail-image {
  margin-bottom: 20px;
}

.detail-image-error {
  width: 100%;
  height: 300px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  border-radius: 8px;
}

.detail-image-error i {
  font-size: 48px;
  margin-bottom: 12px;
}

.detail-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.info-item {
  background: #f8fafc;
  padding: 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.info-item:hover {
  background: #f0f7ff;
  transform: translateY(-2px);
}

.info-item.full-width {
  grid-column: 1 / -1;
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
  color: #409eff;
}

.info-value {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.detail-description {
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.description-header {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.description-header i {
  color: #409eff;
}

.description-content {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
}

.detail-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.detail-adopt-btn {
  background: linear-gradient(135deg, #409eff, #337ecc);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.detail-adopt-btn:hover {
  background: linear-gradient(135deg, #66b1ff, #409eff);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.detail-close-btn {
  background: #f5f7fa;
  border: 1px solid #dcdfe6;
  color: #606266;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.detail-close-btn:hover {
  border-color: #c0c4cc;
  background: #f0f2f5;
  transform: translateY(-2px);
}

/* Adoption application dialog styles */
.adopt-dialog >>> .el-dialog {
  border-radius: 12px;
  overflow: hidden;
  margin-top: 8vh !important;
  margin-bottom: 8vh;
}

.adopt-dialog >>> .el-dialog__body {
  max-height: calc(100vh - 180px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.adopt-dialog >>> .el-dialog__header {
  background: #409eff;
  padding: 20px;
}

.adopt-dialog >>> .el-dialog__title {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.adopt-dialog >>> .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

/* Form grid layout */
.dialog-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.full-width {
  grid-column: 1 / -1;
}

/* Form styles */
.adopt-dialog >>> .el-form-item__label {
  color: #333;
  font-weight: 500;
}

.adopt-dialog >>> .el-input__inner,
.adopt-dialog >>> .el-textarea__inner {
  border: 1px solid #cce5ff;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.adopt-dialog >>> .el-input__inner:focus,
.adopt-dialog >>> .el-textarea__inner:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.adopt-dialog >>> .el-radio {
  margin-right: 20px;
}

/* Form tips */
.form-tips {
  background: #e6f7ff;
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-tips i {
  color: #409eff;
  font-size: 16px;
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
  background: #409eff;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #337ecc;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .details-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .pet-grid-container {
    padding: 0;
  }

  .pet-image-container {
    height: 180px;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .dialog-form-grid {
    grid-template-columns: 1fr;
  }

  .adopt-dialog >>> .el-dialog,
  .pet-detail-dialog >>> .el-dialog {
    width: 95% !important;
  }

  .detail-info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .pet-name {
    font-size: 16px;
  }

  .pet-details {
    padding: 15px;
  }

  .detail-item {
    padding: 8px;
  }

  .pet-description {
    padding: 10px;
  }

  .adopt-btn {
    padding: 10px;
  }

  .detail-pet-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .detail-pet-tags {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
