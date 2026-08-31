<template>
  <div style="min-height: calc(100vh - 60px); padding: 20px 0; background-color: #f9f9f9">
    <!-- Pet basic info card -->
    <div style="background-color: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); margin-bottom: 25px">
      <div style="display: flex; gap: 30px">
        <!-- Pet main image -->
        <div style="width: 350px; flex-shrink: 0">
          <div style="width: 100%; height: 350px; border-radius: 12px; overflow: hidden; border: 1px solid #f0f0f0; position: relative">
            <img style="width: 100%; height: 100%; object-fit: cover" :src="animal.img" alt="Pet photo">
            <div style="position: absolute; top: 15px; left: 15px">
              <el-tag size="medium" type="danger" style="border-radius: 15px; font-weight: bold; padding: 4px 12px">
                Awaiting adoption
              </el-tag>
            </div>
          </div>

          <!-- Like section -->
          <div style="margin-top: 20px; text-align: center">
            <div style="display: inline-flex; align-items: center; background-color: #fff5f5; padding: 8px 20px; border-radius: 25px; cursor: pointer; border: 1px solid #ffe8e8; transition: all 0.3s"
                 @click="praiseClick">
              <img src="../../assets/like.png" alt="Like" style="width: 24px; height: 24px; margin-right: 8px">
              <span style="color: #ff6b6b; font-size: 16px; font-weight: bold">{{ animal.praise || 0 }}</span>
              <span style="color: #666; margin-left: 6px; font-size: 14px">likes</span>
            </div>
            <div v-if="praise" style="color: #2e8b57; font-size: 13px; margin-top: 8px">
              <i class="el-icon-success" style="margin-right: 4px"></i>Liked
            </div>
          </div>
        </div>

        <!-- Pet info details -->
        <div style="flex: 1">
          <div style="border-bottom: 2px solid #ff6b6b; padding-bottom: 15px; margin-bottom: 25px">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px">
              <h1 style="font-size: 32px; color: #333; margin: 0; font-weight: bold">{{ animal.nickname }}</h1>
              <div style="display: flex; gap: 10px">
                <el-tag size="medium" :type="animal.sex === 'Male' ? 'primary' : 'danger'" style="border-radius: 15px; padding: 4px 15px">
                  <i class="el-icon-male" v-if="animal.sex === 'Male'"></i>
                  <i class="el-icon-female" v-else></i>
                  {{ animal.sex }}
                </el-tag>
                <el-tag size="medium" type="info" style="border-radius: 15px; padding: 4px 15px">
                  <i class="el-icon-time"></i>
                  {{ animal.age }}
                </el-tag>
              </div>
            </div>
            <div style="color: #666; font-size: 16px">A lovely little life looking for a warm home</div>
          </div>

          <!-- Info grid -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px">
            <div style="background-color: #f9fbf9; border-radius: 10px; padding: 18px; border-left: 4px solid #2e8b57">
              <div style="display: flex; align-items: center; margin-bottom: 8px">
                <i class="el-icon-s-grid" style="color: #2e8b57; font-size: 18px; margin-right: 10px"></i>
                <span style="color: #555; font-size: 15px; font-weight: 500">Type</span>
              </div>
              <div style="color: #333; font-size: 18px; font-weight: bold">{{ animal.type }}</div>
            </div>

            <div style="background-color: #f0f9ff; border-radius: 10px; padding: 18px; border-left: 4px solid #1890ff">
              <div style="display: flex; align-items: center; margin-bottom: 8px">
                <i class="el-icon-location-outline" style="color: #1890ff; font-size: 18px; margin-right: 10px"></i>
                <span style="color: #555; font-size: 15px; font-weight: 500">Activity Range</span>
              </div>
              <div style="color: #333; font-size: 18px; font-weight: bold">{{ animal.address }}</div>
            </div>

            <div style="background-color: #fff5f5; border-radius: 10px; padding: 18px; border-left: 4px solid #ff6b6b">
              <div style="display: flex; align-items: center; margin-bottom: 8px">
                <i class="el-icon-first-aid-kit" style="color: #ff6b6b; font-size: 18px; margin-right: 10px"></i>
                <span style="color: #555; font-size: 15px; font-weight: 500">Health Status</span>
              </div>
              <div style="color: #333; font-size: 18px; font-weight: bold">{{ animal.status }}</div>
            </div>

            <div style="background-color: #fff9f0; border-radius: 10px; padding: 18px; border-left: 4px solid #ff9500">
              <div style="display: flex; align-items: center; margin-bottom: 8px">
                <i class="el-icon-document" style="color: #ff9500; font-size: 18px; margin-right: 10px"></i>
                <span style="color: #555; font-size: 15px; font-weight: 500">Other Description</span>
              </div>
              <div style="color: #333; font-size: 18px; font-weight: bold">{{ animal.information }}</div>
            </div>
          </div>

          <!-- Adoption tips -->
          <div style="background-color: #f9f9f9; border-radius: 10px; padding: 20px; margin-top: 25px; border: 1px solid #e8f4e8">
            <div style="display: flex; align-items: center; margin-bottom: 10px">
              <i class="el-icon-info" style="color: #2e8b57; font-size: 20px; margin-right: 10px"></i>
              <span style="color: #333; font-size: 16px; font-weight: 500">Adoption Guidelines</span>
            </div>
            <div style="color: #666; font-size: 14px; line-height: 1.6">
              Adopting a pet means responsibility and commitment. Please make sure you have enough time, energy, and financial means to care for it for life.
              Talk with your family before adopting, and provide a safe, comfortable living environment for the pet.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comments section -->
    <div style="background-color: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05)">
      <!-- Comments title -->
      <div style="border-bottom: 2px solid #ff6b6b; padding-bottom: 15px; margin-bottom: 25px">
        <div style="display: flex; align-items: center">
          <i class="el-icon-chat-dot-round" style="color: #ff6b6b; font-size: 22px; margin-right: 10px"></i>
          <span style="font-size: 22px; color: #333; font-weight: bold">Comments</span>
          <span style="color: #666; margin-left: 10px; font-size: 15px">({{ comments.length || 0 }})</span>
        </div>
      </div>

      <!-- Post comment -->
      <div style="background-color: #f9f9f9; border-radius: 10px; padding: 20px; margin-bottom: 25px; border: 1px solid #f0f0f0">
        <div style="display: flex; align-items: flex-start; gap: 15px">
          <div v-if="user.avatar" style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; border: 2px solid #ff6b6b">
            <img :src="user.avatar" alt="User avatar" style="width: 100%; height: 100%; object-fit: cover">
          </div>
          <div v-else style="width: 50px; height: 50px; background-color: #ff6b6b; border-radius: 50%; display: flex; align-items: center; justify-content: center">
            <i class="el-icon-user-solid" style="color: white; font-size: 22px"></i>
          </div>
          <div style="flex: 1">
            <el-input
                type="textarea"
                :rows="3"
                v-model="form.content"
                placeholder="Share your thoughts about this cute little one..."
                style="margin-bottom: 15px"
            ></el-input>
            <div style="text-align: right">
              <el-button
                  type="primary"
                  size="medium"
                  @click="saveComment"
                  style="background-color: #ff6b6b; border-color: #ff6b6b; border-radius: 8px; padding: 10px 25px"
              >
                <i class="el-icon-edit" style="margin-right: 5px"></i>
                Post Comment
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comment list -->
      <div v-if="comments.length > 0">
        <div v-for="item in comments" :key="item.id" style="margin-bottom: 20px">
          <!-- Main comment -->
          <div style="background-color: white; border-radius: 10px; padding: 20px; border: 1px solid #f0f0f0">
            <div style="display: flex; gap: 15px">
              <!-- User avatar -->
              <div style="width: 50px; height: 50px; flex-shrink: 0">
                <el-image
                    :src="item.avatar"
                    style="width: 100%; height: 100%; border-radius: 50%; border: 2px solid #e8f4e8"
                ></el-image>
              </div>

              <!-- Comment content -->
              <div style="flex: 1">
                <!-- Comment header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px">
                  <div>
                    <span style="color: #ff6b6b; font-size: 16px; font-weight: bold">{{ item.user }}</span>
                    <span style="color: #999; font-size: 13px; margin-left: 10px">
                      <i class="el-icon-time" style="margin-right: 4px"></i>
                      {{ item.time }}
                    </span>
                  </div>
                  <div>
                    <el-button
                        type="text"
                        size="small"
                        @click="handleAddComment(item.id)"
                        style="color: #1890ff"
                    >
                      <i class="el-icon-chat-round" style="margin-right: 4px"></i>
                      Reply
                    </el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="delComment(item.id)"
                        style="color: #ff6b6b"
                        v-if="user.nickname === item.user"
                    >
                      <i class="el-icon-delete" style="margin-right: 4px"></i>
                      Delete
                    </el-button>
                  </div>
                </div>

                <!-- Comment body -->
                <div style="color: #333; line-height: 1.6; margin-bottom: 15px; font-size: 15px">
                  {{ item.content }}
                </div>

                <!-- Child comments -->
                <div v-if="item.children && item.children.length > 0" style="margin-top: 15px">
                  <div v-for="subitem in item.children" :key="subitem.id"
                       style="background-color: #f9fbf9; border-radius: 8px; padding: 15px; margin-bottom: 10px; border-left: 3px solid #2e8b57">
                    <div style="display: flex; gap: 12px">
                      <div style="width: 36px; height: 36px; flex-shrink: 0">
                        <div style="width: 100%; height: 100%; background-color: #2e8b57; border-radius: 50%; display: flex; align-items: center; justify-content: center">
                          <i class="el-icon-user" style="color: white; font-size: 16px"></i>
                        </div>
                      </div>
                      <div style="flex: 1">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px">
                          <div>
                            <span style="color: #2e8b57; font-size: 14px; font-weight: bold">{{ subitem.user }}</span>
                            <span style="color: #999; font-size: 12px; margin-left: 8px">
                              <i class="el-icon-time" style="margin-right: 4px"></i>
                              {{ subitem.time }}
                            </span>
                          </div>
                          <div>
                            <el-button
                                type="text"
                                size="mini"
                                @click="delComment(subitem.id)"
                                style="color: #ff6b6b"
                                v-if="user.nickname === subitem.user"
                            >
                              Delete
                            </el-button>
                          </div>
                        </div>
                        <div style="color: #555; line-height: 1.5; font-size: 14px">
                          {{ subitem.content }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty comments -->
      <div v-else style="text-align: center; padding: 50px; color: #999">
        <i class="el-icon-chat-line-round" style="font-size: 60px; color: #e0e0e0; margin-bottom: 15px"></i>
        <div style="font-size: 16px; margin-bottom: 10px">No comments yet</div>
        <div style="font-size: 14px; color: #aaa">Be the first to leave a comment</div>
      </div>
    </div>

    <!-- Reply dialog -->
    <el-dialog
        title="Reply to Comment"
        :visible.sync="dialogFormVisible"
        width="500px"
        :close-on-click-modal="false"
        custom-class="custom-dialog"
    >
      <div style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 15px">
        <div style="width: 40px; height: 40px; background-color: #2e8b57; border-radius: 50%; display: flex; align-items: center; justify-content: center">
          <i class="el-icon-edit" style="color: white; font-size: 18px"></i>
        </div>
        <div style="flex: 1">
          <div style="color: #333; margin-bottom: 8px">Please enter your reply:</div>
          <el-input
              type="textarea"
              :rows="4"
              v-model="form.contentr"
              placeholder="Write your reply..."
              style="margin-bottom: 15px"
          ></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" style="border-radius: 8px; padding: 10px 20px">Cancel</el-button>
        <el-button
            type="primary"
            @click="saveComment"
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
  name: "HomeDetail",
  data() {
    return {
      id: this.$route.query.id,
      animal: {},
      comments: [],
      form: {},
      dialogFormVisible: false,
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      praise: false
    }
  },
  created() {
    this.load()
    this.loadComment()
  },
  methods: {
    praiseClick() {
      if(this.praise) {
        return
      }
      this.animal.praise += 1
      this.request.post("/animal", this.animal).then(res => {
        this.load()
        this.praise = true
      })
    },
    load() {
      this.request.get("/animal/" + this.id).then(res => {
        this.animal = res.data
      })
    },
    loadComment() {
      this.request.get("/comment/article/1/" + this.id).then(res => {
        this.comments = res.data
      })
    },
    handleAddComment(pid) {
      this.dialogFormVisible = true
      this.form = {pid: pid}
    },
    saveComment() {
      if (!this.user.username) {
        this.$message.warning("Please log in to comment")
        return
      }
      if (this.form.contentr) {
        this.form.content = this.form.contentr
      }
      if (!this.form.content) {
        this.$message.warning("Please enter a comment")
        return
      }
      this.form.type = 1
      this.form.articleId = this.id
      this.request.post("/comment", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("Reply posted successfully")
          this.dialogFormVisible = false
          this.form = {}  // Clear data
          this.loadComment()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    delComment(id) {
      this.$confirm('Are you sure you want to delete this comment?', 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        customClass: 'custom-confirm'
      }).then(() => {
        this.request.delete("/comment/" + id).then(res => {
          if (res.code === '200') {
            this.$message.success("Deleted successfully")
            this.loadComment()
          } else {
            this.$message.error("Delete failed")
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
/* Global styles */
::v-deep .el-textarea__inner {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  color: #333;
}

::v-deep .el-textarea__inner:focus {
  border-color: #ff6b6b;
  box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.1);
}

::v-deep .el-button--primary {
  background-color: #ff6b6b;
  border-color: #ff6b6b;
}

::v-deep .el-button--primary:hover {
  background-color: #ff5252;
  border-color: #ff5252;
}

::v-deep .el-button--primary:active {
  background-color: #e64545;
  border-color: #e64545;
}

::v-deep .el-button--text {
  color: #666;
}

::v-deep .el-button--text:hover {
  color: #ff6b6b;
}

/* Card hover effect */
div[style*="background-color: white; border-radius: 10px"] {
  transition: all 0.3s ease;
}

div[style*="background-color: white; border-radius: 10px"]:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

/* Like section hover effect */
div[style*="background-color: #fff5f5"]:hover {
  background-color: #ffeaea !important;
  border-color: #ffb6b6 !important;
  transform: scale(1.05);
}

/* Dialog styles */
::v-deep .custom-dialog {
  border-radius: 12px;
  border: 1px solid #f0f0f0;
}

::v-deep .custom-dialog .el-dialog__header {
  background-color: #f9f9f9;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 12px 12px 0 0;
  padding: 15px 20px;
}

::v-deep .custom-dialog .el-dialog__title {
  color: #333;
  font-size: 18px;
  font-weight: bold;
}

::v-deep .custom-dialog .el-dialog__body {
  padding: 20px;
}

::v-deep .custom-dialog .el-dialog__footer {
  border-top: 1px solid #f0f0f0;
  padding: 15px 20px;
}

/* Confirm dialog styles */
::v-deep .custom-confirm .el-message-box {
  border-radius: 12px;
  border: 1px solid #f0f0f0;
}

::v-deep .custom-confirm .el-message-box__header {
  background-color: #f9f9f9;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 12px 12px 0 0;
  padding: 15px 20px;
}

::v-deep .custom-confirm .el-message-box__title {
  color: #333;
  font-weight: bold;
}

::v-deep .custom-confirm .el-message-box__content {
  padding: 25px 20px;
}

::v-deep .custom-confirm .el-message-box__btns {
  padding: 10px 20px 20px;
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

::v-deep .el-tag--info {
  background-color: #f5f5f5;
  color: #666;
}

/* Info card hover effect */
div[style*="background-color: #f9fbf9"]:hover,
div[style*="background-color: #f0f9ff"]:hover,
div[style*="background-color: #fff5f5"]:hover,
div[style*="background-color: #fff9f0"]:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

/* Responsive design */
@media (max-width: 992px) {
  div[style*="display: flex; gap: 30px"] {
    flex-direction: column !important;
    gap: 20px !important;
  }

  div[style*="width: 350px"] {
    width: 100% !important;
  }

  img[style*="width: 100%; height: 350px"] {
    height: 300px !important;
  }

  div[style*="grid-template-columns: repeat(2, 1fr)"] {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 768px) {
  div[style*="display: flex; gap: 15px"] {
    flex-direction: column !important;
  }

  div[style*="width: 50px"] {
    width: 40px !important;
    height: 40px !important;
  }

  ::v-deep .el-dialog {
    width: 90% !important;
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

div[style*="background-color: white; border-radius: 12px"] {
  animation: fadeIn 0.5s ease;
}
</style>
