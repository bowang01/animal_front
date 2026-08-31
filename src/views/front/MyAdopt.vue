<template>
  <div style="padding-bottom: 20px; min-height: calc(100vh - 60px)">
    <div v-if="!tableData.length" style="margin: 10px 0">
      <el-card shadow="never" style="border: none; background-color: #f9f9f9;">
        <div style="text-align: center; color: #888; padding: 40px 0;">
          <i class="el-icon-document" style="font-size: 48px; color: #ccc; margin-bottom: 10px;"></i>
          <div style="font-size: 16px; margin-top: 10px;">No adoption applications yet</div>
          <div style="font-size: 14px; color: #aaa; margin-top: 5px;">Go apply to adopt a lovely pet</div>
        </div>
      </el-card>
    </div>

    <div v-else style="margin: 10px 0">
      <el-card
          v-for="item in tableData"
          :key="item.id"
          shadow="never"
          style="margin: 10px 0; border: none; border-radius: 12px; overflow: hidden;"
          :style="{borderLeft: '4px solid ' + getStatusColor(item.state)}"
      >
        <div style="display: flex; padding: 20px;">
          <div
              style="width: 160px; cursor: pointer;"
              @click="$router.push('/front/homeDetail?id=' + item.id)"
          >
            <img
                :src="item.animal.img"
                alt=""
                style="width: 100%; height: 180px; border-radius: 12px; object-fit: cover;"
            >
          </div>
          <div style="padding-left: 30px; flex: 1;">
            <div style="padding-bottom: 15px; margin-bottom: 15px; border-bottom: 1px solid #eee">
              <span style="font-size: 22px; color: #333; font-weight: bold;">{{ item.animal.nickname }}</span>
              <span style="margin-left: 15px; padding: 2px 8px; border-radius: 4px; font-size: 13px;"
                    :style="{backgroundColor: getSexColor(item.animal.sex) + '15', color: getSexColor(item.animal.sex)}">
                {{ item.animal.sex }}
              </span>
              <span style="margin-left: 15px; padding: 2px 8px; border-radius: 4px; background-color: #e6f7ff; color: #1890ff; font-size: 13px;">
                {{ item.animal.age }}
              </span>
              <span style="float: right; padding: 4px 12px; border-radius: 6px; font-weight: bold; font-size: 14px;"
                    :style="{backgroundColor: getStatusColor(item.state) + '15', color: getStatusColor(item.state)}">
                {{ item.state }}
              </span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              <div style="display: flex; align-items: center;">
                <i class="el-icon-first-aid-kit" style="color: #ff6b6b; margin-right: 8px; font-size: 16px;"></i>
                <span style="color: #666; font-size: 14px;">Sterilized:</span>
                <span style="margin-left: 5px; color: #333; font-size: 14px;">{{ item.animal.sterilization }}</span>
              </div>
              <div style="display: flex; align-items: center;">
                <i class="el-icon-s-claim" style="color: #52c41a; margin-right: 8px; font-size: 16px;"></i>
                <span style="color: #666; font-size: 14px;">Vaccination:</span>
                <span style="margin-left: 5px; color: #333; font-size: 14px;">{{ item.animal.vaccine }}</span>
              </div>
              <div style="display: flex; align-items: center;">
                <i class="el-icon-s-check" style="color: #1890ff; margin-right: 8px; font-size: 16px;"></i>
                <span style="color: #666; font-size: 14px;">Health Status:</span>
                <span style="margin-left: 5px; color: #333; font-size: 14px;">{{ item.animal.status }}</span>
              </div>
              <div style="display: flex; align-items: center;">
                <i class="el-icon-chat-line-round" style="color: #722ed1; margin-right: 8px; font-size: 16px;"></i>
                <span style="color: #666; font-size: 14px;">Other Description:</span>
                <span style="margin-left: 5px; color: #333; font-size: 14px;">{{ item.animal.information }}</span>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px; margin: 0 20px 20px 20px;">
          <div style="font-size: 18px; color: #333; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center;">
            <i class="el-icon-document" style="margin-right: 8px; color: #ff6b6b;"></i>
            Application Details
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            <div style="display: flex; align-items: center; padding: 8px 0;">
              <div style="width: 80px; color: #666; font-size: 14px; flex-shrink: 0;">Name:</div>
              <div style="color: #333; font-size: 14px;">{{ item.name }}</div>
            </div>
            <div style="display: flex; align-items: center; padding: 8px 0;">
              <div style="width: 80px; color: #666; font-size: 14px; flex-shrink: 0;">Gender:</div>
              <div style="color: #333; font-size: 14px;">{{ item.sex }}</div>
            </div>
            <div style="display: flex; align-items: center; padding: 8px 0;">
              <div style="width: 80px; color: #666; font-size: 14px; flex-shrink: 0;">Age:</div>
              <div style="color: #333; font-size: 14px;">{{ item.age }}</div>
            </div>
            <div style="display: flex; align-items: center; padding: 8px 0;">
              <div style="width: 80px; color: #666; font-size: 14px; flex-shrink: 0;">Experience:</div>
              <div style="color: #333; font-size: 14px;">{{ item.experience }}</div>
            </div>
            <div style="display: flex; align-items: center; padding: 8px 0;">
              <div style="width: 80px; color: #666; font-size: 14px; flex-shrink: 0;">Contact:</div>
              <div style="color: #333; font-size: 14px;">{{ item.phone }}</div>
            </div>
            <div style="display: flex; align-items: center; padding: 8px 0;">
              <div style="width: 80px; color: #666; font-size: 14px; flex-shrink: 0;">Married:</div>
              <div style="color: #333; font-size: 14px;">{{ item.married }}</div>
            </div>
            <div style="display: flex; align-items: center; padding: 8px 0;">
              <div style="width: 80px; color: #666; font-size: 14px; flex-shrink: 0;">Income:</div>
              <div style="color: #333; font-size: 14px;">{{ item.income }}</div>
            </div>
            <div style="display: flex; align-items: center; padding: 8px 0;">
              <div style="width: 80px; color: #666; font-size: 14px; flex-shrink: 0;">Occupation:</div>
              <div style="color: #333; font-size: 14px;">{{ item.profession }}</div>
            </div>
            <div style="display: flex; align-items: center; padding: 8px 0; grid-column: span 2;">
              <div style="width: 80px; color: #666; font-size: 14px; flex-shrink: 0;">Address:</div>
              <div style="color: #333; font-size: 14px;">{{ item.address }}</div>
            </div>
            <div style="display: flex; align-items: flex-start; padding: 8px 0; grid-column: span 2;">
              <div style="width: 80px; color: #666; font-size: 14px; flex-shrink: 0;">Reason:</div>
              <div style="color: #333; font-size: 14px; line-height: 1.6;">{{ item.reason }}</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <el-dialog
        title="Fill Adoption Application"
        :visible.sync="dialogFormVisible"
        width="500px"
        :close-on-click-modal="false"
        custom-class="custom-dialog"
    >
      <div style="display: flex; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
        <i class="el-icon-document-add" style="color: #ff6b6b; font-size: 24px; margin-right: 10px;"></i>
        <span style="font-size: 18px; color: #333; font-weight: bold;">Adoption Information</span>
      </div>

      <el-form label-width="100px" size="medium" style="width: 100%">
        <el-form-item label="Name" required>
          <el-input
              v-model="form.name"
              placeholder="Please enter your name"
              style="width: 300px;"
          ></el-input>
        </el-form-item>

        <el-form-item label="Gender" required>
          <el-radio-group v-model="form.sex">
            <el-radio label="Male" style="margin-right: 30px;">
              <i class="el-icon-male" style="color: #1890ff; margin-right: 5px;"></i>
              Male
            </el-radio>
            <el-radio label="Female">
              <i class="el-icon-female" style="color: #ff6b6b; margin-right: 5px;"></i>
              Female
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Age" required>
          <el-input
              v-model="form.age"
              placeholder="Please enter your age"
              style="width: 300px;"
          ></el-input>
        </el-form-item>

        <el-form-item label="Pet Experience" required>
          <el-radio-group v-model="form.experience">
            <el-radio label="No experience" style="margin-right: 30px;">
              <i class="el-icon-s-opportunity" style="color: #faad14; margin-right: 5px;"></i>
              No experience
            </el-radio>
            <el-radio label="Experienced">
              <i class="el-icon-s-check" style="color: #52c41a; margin-right: 5px;"></i>
              Experienced
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Contact" required>
          <el-input
              v-model="form.phone"
              placeholder="Please enter your phone number"
              style="width: 300px;"
          ></el-input>
        </el-form-item>

        <el-form-item label="Marital Status" required>
          <el-radio-group v-model="form.married">
            <el-radio label="Single" style="margin-right: 30px;">
              <i class="el-icon-user" style="color: #722ed1; margin-right: 5px;"></i>
              Single
            </el-radio>
            <el-radio label="Married">
              <i class="el-icon-s-custom" style="color: #1890ff; margin-right: 5px;"></i>
              Married
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Monthly Income" required>
          <el-input
              v-model="form.income"
              placeholder="Please enter your monthly income"
              style="width: 300px;"
          >
            <template slot="append">CNY/month</template>
          </el-input>
        </el-form-item>

        <el-form-item label="Occupation" required>
          <el-input
              v-model="form.profession"
              placeholder="Please enter your occupation"
              style="width: 300px;"
          ></el-input>
        </el-form-item>

        <el-form-item label="Address" required>
          <el-input
              v-model="form.address"
              placeholder="Please enter your detailed address"
              type="textarea"
              :rows="2"
              style="width: 300px;"
          ></el-input>
        </el-form-item>

        <el-form-item label="Adoption Reason" required>
          <el-input
              v-model="form.reason"
              placeholder="Please describe why you want to adopt"
              type="textarea"
              :rows="3"
              style="width: 300px;"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" style="border-radius: 6px;">Cancel</el-button>
        <el-button
            type="primary"
            @click="save"
            style="border-radius: 6px; background-color: #ff6b6b; border-color: #ff6b6b;"
        >
          <i class="el-icon-check" style="margin-right: 5px;"></i>
          Submit Application
        </el-button>
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
      pageSize: 10,
      nickname: "",
      dialogFormVisible: false,
      form: {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    getStatusColor(state) {
      switch(state) {
        case 'Approved': return '#52c41a'
        case 'Rejected': return '#ff4d4f'
        default: return '#1890ff'
      }
    },
    getSexColor(sex) {
      switch(sex) {
        case 'Male': return '#1890ff'
        case 'Female': return '#ff6b6b'
        default: return '#722ed1'
      }
    },
    save() {
      this.request.post("/applcation", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("Saved successfully")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("Save failed")
        }
      })
    },
    handleApply(animalId) {
      this.form = {animalId: animalId}
      this.dialogFormVisible = true
    },
    load() {
      this.request.get("/applcation/my").then(res => {
        this.tableData = res.data
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
  }
}
</script>

<style scoped>
::v-deep .el-card {
  transition: all 0.3s ease;
  border: none !important;
}

::v-deep .el-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
}

::v-deep .custom-dialog {
  border-radius: 12px;
  border: none;
}

::v-deep .custom-dialog .el-dialog__header {
  padding: 0;
  border-bottom: none;
}

::v-deep .custom-dialog .el-dialog__title {
  display: none;
}

::v-deep .custom-dialog .el-dialog__body {
  padding: 20px;
}

::v-deep .custom-dialog .el-dialog__footer {
  padding: 20px;
  padding-top: 0;
  border-top: none;
}

::v-deep .el-form-item__label {
  color: #666;
  font-weight: normal;
}

::v-deep .el-input__inner {
  border-radius: 6px;
  border: 1px solid #dcdfe6;
}

::v-deep .el-input__inner:focus {
  border-color: #ff6b6b;
}

::v-deep .el-textarea__inner {
  border-radius: 6px;
  border: 1px solid #dcdfe6;
}

::v-deep .el-textarea__inner:focus {
  border-color: #ff6b6b;
}

::v-deep .el-radio__inner {
  border-color: #dcdfe6;
}

::v-deep .el-radio__input.is-checked .el-radio__inner {
  border-color: #ff6b6b;
  background-color: #ff6b6b;
}

::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #ff6b6b;
}

::v-deep .el-button {
  transition: all 0.3s ease;
}

::v-deep .el-button--primary:hover {
  background-color: #ff5252 !important;
  border-color: #ff5252 !important;
}

/* Scrollbar styles */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #ffb6b6;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ff6b6b;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .el-card__body > div {
    flex-direction: column;
  }

  .el-card__body > div > div:first-child {
    width: 100% !important;
    margin-bottom: 20px;
  }

  .el-card__body > div > div:last-child {
    padding-left: 0 !important;
  }

  .grid-cols-2 {
    grid-template-columns: 1fr !important;
  }

  ::v-deep .custom-dialog {
    width: 90% !important;
    margin: 0 auto;
  }

  ::v-deep .el-form-item__content {
    width: 100% !important;
  }

  ::v-deep .el-input,
  ::v-deep .el-textarea {
    width: 100% !important;
  }
}
</style>
