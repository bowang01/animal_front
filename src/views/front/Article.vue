<template>
  <div class="forum-container" style="min-height: calc(100vh - 60px); margin: 10px 0">

    <!-- Search bar -->
    <div class="search-bar">
      <el-input
          size="medium"
          style="width: 400px"
          placeholder="Search posts"
          suffix-icon="el-icon-search"
          v-model="name"
          class="search-input">
      </el-input>
      <el-button class="ml-5" type="primary" @click="load" size="medium" icon="el-icon-search">Search</el-button>
      <el-button type="success" class="ml-5" size="medium" @click="handleAdd" icon="el-icon-edit">New Post</el-button>
    </div>

    <!-- Post grid layout -->
    <div class="forum-grid-container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" v-for="item in tableData" :key="item.id">
          <div class="forum-card">
            <!-- Post header -->
            <div class="card-header">
              <div class="post-title" @click="view(item.id, item.content)">
                {{ item.name }}
              </div>
              <div class="user-info">
                <div class="user-avatar">
                  <i class="el-icon-user-solid"></i>
                </div>
                <div class="user-name">{{ item.user }}</div>
              </div>
            </div>

            <!-- Post content preview -->
            <div class="content-preview" @click="view(item.id, item.content)">
              <div class="preview-text">
                {{ getContentPreview(item.content) }}
              </div>
            </div>

            <!-- Post footer -->
            <div class="card-footer">
              <div class="post-meta">
                <div class="meta-item">
                  <i class="el-icon-time meta-icon"></i>
                  <span class="meta-text">{{ formatTime(item.time) }}</span>
                </div>
              </div>

              <div class="post-actions">
                <el-button
                    type="text"
                    class="action-btn comment-btn"
                    @click="handleComment(item.id)">
                  <i class="el-icon-chat-dot-round"></i> Comment
                </el-button>

                <div class="owner-actions" v-if="item.userId === user.id">
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
        :title="form.id ? 'Edit Post' : 'New Post'"
        :visible.sync="dialogFormVisible"
        width="80%"
        :close-on-click-modal="false"
        class="forum-dialog">
      <el-form label-width="80px" size="medium" style="width: 100%">
        <el-form-item label="Title">
          <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="Enter post title"
              style="width: 100%">
          </el-input>
        </el-form-item>

        <el-form-item label="Content">
          <mavon-editor
              ref="md"
              v-model="form.content"
              :ishljs="true"
              @imgAdd="imgAdd"
              placeholder="Enter post content..."
              style="min-height: 400px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="cancel-btn">Cancel</el-button>
        <el-button type="primary" @click="save" class="save-btn">Publish</el-button>
      </div>
    </el-dialog>

    <!-- View details dialog -->
    <el-dialog
        :title="contentTitle"
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
          style="min-height: 400px; margin-bottom: 30px"/>

      <!-- Comments section -->
      <div class="comments-section">
        <div class="comments-header">
          <i class="el-icon-chat-dot-round header-icon"></i>
          <span class="header-text">Comments</span>
          <span class="comments-count">({{ comments.length }})</span>
        </div>

        <!-- Comment list -->
        <div class="comments-list">
          <div v-for="item in comments" :key="item.id" class="comment-item">
            <div class="comment-avatar">
              <el-image
                  :src="item.avatar"
                  style="width: 40px; height: 40px; border-radius: 50%">
                <div slot="error" class="avatar-error">
                  <i class="el-icon-user"></i>
                </div>
              </el-image>
            </div>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-user">{{ item.user }}</span>
                <span class="comment-time">
                  <i class="el-icon-time"></i> {{ formatTime(item.time) }}
                </span>
              </div>
              <div class="comment-text">{{ item.content }}</div>
              <div class="comment-actions">
                <el-button
                    type="text"
                    @click="delComment(item.id)"
                    class="comment-delete-btn"
                    v-if="user.nickname === item.user">
                  <i class="el-icon-delete"></i> Delete
                </el-button>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="comments.length === 0" class="empty-comments">
            <i class="el-icon-chat-line-round empty-icon"></i>
            <div class="empty-text">No comments yet. Be the first to comment!</div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- Comment dialog -->
    <el-dialog
        title="Post a Comment"
        :visible.sync="commentVis"
        width="40%"
        :close-on-click-modal="false"
        class="comment-dialog">
      <el-form label-width="0" size="medium" style="width: 100%">
        <el-form-item>
          <el-input
              type="textarea"
              :rows="5"
              v-model="comment.content"
              autocomplete="off"
              placeholder="Enter your comment..."
              resize="none">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="commentVis = false" class="cancel-btn">Cancel</el-button>
        <el-button type="primary" @click="saveComment" class="save-btn">Publish</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PetForum",
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
      content: '',
      contentTitle: '',
      comment: {},
      commentVis: false,
      comments: []
    }
  },
  created() {
    if (!this.user.id) {
      this.$message.warning("Please log in")
      this.$router.push("/login")
      return
    }
    this.load()
  },
  methods: {
    getContentPreview(content) {
      if (!content) return 'No content preview'
      // Strip markdown markers
      const plainText = content.replace(/[#*`\[\]]/g, '').replace(/\n/g, ' ')
      return plainText.length > 80 ? plainText.substring(0, 80) + '...' : plainText
    },

    formatTime(time) {
      if (!time) return ''
      return time.length > 16 ? time.substr(0, 16) : time
    },

    saveComment() {
      if (!this.user.username) {
        this.$message.warning("Please log in to comment")
        return
      }
      if (!this.comment.content) {
        this.$message.warning("Please enter a comment")
        return
      }
      this.comment.type = 2
      this.request.post("/comment", this.comment).then(res => {
        if (res.code === '200') {
          this.$message.success("Comment posted successfully")
          this.commentVis = false
          this.comment = {}
          this.loadComment(this.comment.articleId)
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    delComment(id) {
      this.request.delete("/comment/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("Deleted successfully")
          this.loadComment(this.comment.articleId)
        } else {
          this.$message.error("Delete failed")
        }
      })
    },

    loadComment(id) {
      this.request.get("/comment/article/2/" + id).then(res => {
        this.comments = res.data
      })
    },

    handleComment(id) {
      this.comment.articleId = id
      this.commentVis = true
    },

    view(id, content) {
      const currentPost = this.tableData.find(item => item.id === id)
      this.contentTitle = currentPost ? currentPost.name : 'Post Details'
      this.content = content
      this.vis = true
      this.loadComment(id)
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
      this.request.get("/article/page", {
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
      if (!this.form.name) {
        this.$message.error("Title cannot be empty!")
        return
      }
      if (!this.form.content) {
        this.$message.error("Content cannot be empty!")
        return
      }
      this.request.post("/article", this.form).then(res => {
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
      this.$confirm('Are you sure you want to delete this post?', 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        customClass: 'delete-confirm'
      }).then(() => {
        this.request.delete("/article/" + id).then(res => {
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
      this.request.post("/article/del/batch", ids).then(res => {
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
      window.open(this.$apiBase + "/article/export")
    },

    handleExcelImportSuccess() {
      this.$message.success("Import successful")
      this.load()
    }
  }
}
</script>

<style scoped>
.forum-container {
  background-color: #f8f9fa;
  padding: 20px;
}

/* Search bar styles */
.search-bar {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
}

.search-input >>> .el-input__inner {
  border: 1px solid #b3e0ff;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.search-input >>> .el-input__inner:focus {
  border-color: #36a3f7;
  box-shadow: 0 0 0 2px rgba(54, 163, 247, 0.1);
}

/* Post grid layout */
.forum-grid-container {
  padding: 10px;
}

.forum-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e6f7ff;
  height: 280px;
  display: flex;
  flex-direction: column;
}

.forum-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(54, 163, 247, 0.15);
  border-color: #36a3f7;
}

/* Card header */
.card-header {
  padding: 16px 16px 12px;
  border-bottom: 1px solid #f0f0f0;
}

.post-title {
  font-size: 16px;
  font-weight: 600;
  color: #36a3f7;
  margin-bottom: 12px;
  cursor: pointer;
  transition: color 0.3s ease;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 44px;
}

.post-title:hover {
  color: #1890ff;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e6f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #36a3f7;
  font-size: 12px;
}

.user-name {
  font-size: 12px;
  color: #666;
}

/* Content preview */
.content-preview {
  flex: 1;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}

.preview-text {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

/* Card footer */
.card-footer {
  padding: 12px 16px;
}

.post-meta {
  margin-bottom: 8px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-icon {
  color: #36a3f7;
  font-size: 12px;
}

.meta-text {
  font-size: 12px;
  color: #999;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-btn {
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.comment-btn {
  color: #36a3f7;
  border: 1px solid #b3e0ff;
  background: #e6f7ff;
}

.comment-btn:hover {
  background: #36a3f7;
  color: white;
  border-color: #36a3f7;
}

.owner-actions {
  display: flex;
  gap: 4px;
}

.edit-btn {
  color: #36a3f7;
  border: 1px solid #b3e0ff;
  background: #e6f7ff;
}

.edit-btn:hover {
  background: #36a3f7;
  color: white;
  border-color: #36a3f7;
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
.forum-dialog {
  border-radius: 12px;
  overflow: hidden;
}

.forum-dialog >>> .el-dialog__header {
  background: #36a3f7;
  padding: 20px;
}

.forum-dialog >>> .el-dialog__title {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.forum-dialog >>> .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

.view-dialog {
  border-radius: 12px;
}

.view-dialog >>> .el-dialog__header {
  background: #36a3f7;
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

/* Comments section styles */
.comments-section {
  background: white;
  border-radius: 8px;
  padding: 0;
}

.comments-header {
  padding: 16px 0;
  border-bottom: 2px solid #e6f7ff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon {
  color: #36a3f7;
  font-size: 18px;
}

.header-text {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.comments-count {
  font-size: 14px;
  color: #999;
  margin-left: 4px;
}

/* Comment list styles */
.comments-list {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}

.comment-item {
  display: flex;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-avatar {
  flex-shrink: 0;
}

.avatar-error {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e6f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #36a3f7;
  font-size: 18px;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.comment-user {
  font-weight: 500;
  color: #36a3f7;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

.comment-time i {
  margin-right: 4px;
}

.comment-text {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 8px;
}

.comment-actions {
  text-align: right;
}

.comment-delete-btn {
  color: #f44336;
  font-size: 12px;
  padding: 0;
}

.comment-delete-btn:hover {
  color: #d32f2f;
}

/* Empty state styles */
.empty-comments {
  text-align: center;
  padding: 40px 0;
  color: #999;
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
  color: #b3e0ff;
}

.empty-text {
  font-size: 14px;
}

/* Comment dialog styles */
.comment-dialog {
  border-radius: 12px;
}

.comment-dialog >>> .el-dialog__header {
  background: #36a3f7;
  padding: 20px;
}

.comment-dialog >>> .el-dialog__title {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.comment-dialog >>> .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

.comment-dialog >>> .el-textarea__inner {
  border: 1px solid #b3e0ff;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.comment-dialog >>> .el-textarea__inner:focus {
  border-color: #36a3f7;
  box-shadow: 0 0 0 2px rgba(54, 163, 247, 0.1);
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
  background: #36a3f7;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  transition: all 0.3s ease;
}

.save-btn:hover {
  background: #1890ff;
  transform: translateY(-1px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .forum-grid-container {
    padding: 0;
  }

  .forum-card {
    margin-bottom: 15px;
    height: 260px;
  }

  .search-bar {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }

  .search-input {
    width: 100% !important;
  }

  .forum-dialog,
  .view-dialog {
    width: 95% !important;
  }

  .comment-dialog {
    width: 90% !important;
  }
}

@media (max-width: 480px) {
  .forum-container {
    padding: 10px;
  }

  .forum-card {
    height: 240px;
  }

  .post-title {
    font-size: 15px;
    min-height: 40px;
  }

  .preview-text {
    font-size: 13px;
    -webkit-line-clamp: 2;
  }
}
</style>
