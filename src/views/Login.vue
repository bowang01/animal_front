<template>
  <div class="wrapper">
    <div class="header">
      <el-button
          class="home-btn"
          size="small"
          icon="el-icon-s-home"
          @click="$router.push('/front/home')"
      >
        Back to Home
      </el-button>
      <div class="logo">
        <i class="el-icon-star-off pet-icon"></i>
        <span class="system-name">Pet Adoption Management System</span>
      </div>
      <div class="slogan">In the name of love, finding forever homes for pets</div>
    </div>

    <div class="login-container">
      <div class="login-box">
        <div class="login-title">
          <div class="title-left">
            <i class="el-icon-user-solid title-icon"></i>
            <span>User Login</span>
          </div>
          <div class="title-right">
            <span class="new-user">New user?</span>
            <el-button
                type="text"
                size="small"
                @click="$router.push('/register')"
                class="register-link"
            >
              Register now <i class="el-icon-arrow-right"></i>
            </el-button>
          </div>
        </div>

        <div class="form-container">
          <!-- Left form area -->
          <div class="form-left">
            <el-form :model="user" :rules="rules" ref="userForm" class="login-form">
              <el-form-item prop="username" class="form-item">
                <div class="form-label">
                  <i class="el-icon-user icon-label"></i>
                  <span>Username</span>
                </div>
                <el-input
                    size="medium"
                    v-model="user.username"
                    placeholder="Please enter username"
                    class="custom-input"
                ></el-input>
              </el-form-item>

              <el-form-item prop="password" class="form-item">
                <div class="form-label">
                  <i class="el-icon-lock icon-label"></i>
                  <span>Password</span>
                </div>
                <el-input
                    size="medium"
                    show-password
                    v-model="user.password"
                    placeholder="Please enter password"
                    class="custom-input"
                ></el-input>
              </el-form-item>

              <el-form-item class="remember-item">
                <el-checkbox v-model="rememberPassword" class="remember-checkbox">
                  <i class="el-icon-check"></i> Remember password
                </el-checkbox>
                <el-button
                    type="text"
                    size="small"
                    @click="handlePass"
                    class="forget-link"
                >
                  <i class="el-icon-question"></i> Forgot password?
                </el-button>
              </el-form-item>

              <el-form-item class="login-btn-item">
                <el-button
                    type="primary"
                    size="medium"
                    @click="login"
                    class="login-btn"
                >
                  <i class="el-icon-key"></i> Login now
                </el-button>
              </el-form-item>
            </el-form>

          </div>

          <!-- Right divider and system info -->
          <div class="form-divider">
            <div class="divider-line"></div>
            <div class="divider-text">or</div>
            <div class="divider-line"></div>
          </div>

          <!-- Right system info area -->
          <div class="form-right">
            <div class="system-info">
              <div class="info-title">
                <i class="el-icon-info info-icon"></i>
                <span>Featured Functions</span>
              </div>

              <div class="feature-list">

                <div class="feature-item">
                  <div class="feature-icon">
                    <i class="el-icon-document-checked"></i>
                  </div>
                  <div class="feature-content">
                    <h4>Online Application</h4>
                    <p>Submit adoption applications with one click, transparent process</p>
                  </div>
                </div>

                <div class="feature-item">
                  <div class="feature-icon">
                    <i class="el-icon-service"></i>
                  </div>
                  <div class="feature-content">
                    <h4>Professional Guidance</h4>
                    <p>Provide care advice</p>
                  </div>
                </div>

                <div class="feature-item">
                  <div class="feature-icon">
                    <i class="el-icon-date"></i>
                  </div>
                  <div class="feature-content">
                    <h4>Regular Follow-ups</h4>
                    <p>Continued care for pets after adoption</p>
                  </div>
                </div>
              </div>


              <div class="system-tips">
                <i class="el-icon-chat-line-square"></i>
                <span>After logging in, browse all pets available for adoption and apply for your preferred companion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reset password dialog -->
    <el-dialog
        title="Reset Password"
        :visible.sync="dialogFormVisible"
        width="400px"
        class="password-dialog"
    >
      <div class="dialog-header">
        <i class="el-icon-unlock dialog-icon"></i>
        <span>Please enter the following information to reset your password</span>
      </div>

      <el-form :model="pass" label-width="80px" size="medium" class="dialog-form">
        <el-form-item label="Username" prop="username">
          <el-input
              v-model="pass.username"
              autocomplete="off"
              placeholder="Enter the username used during registration"
              prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input
              v-model="pass.phone"
              autocomplete="off"
              placeholder="Enter the bound phone number"
              prefix-icon="el-icon-mobile-phone"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <div class="dialog-button-group">
          <el-button @click="dialogFormVisible = false" class="cancel-btn">
            <i class="el-icon-close"></i> Cancel
          </el-button>
          <el-button
              type="primary"
              @click="passwordBack"
              class="reset-btn"
          >
            <i class="el-icon-refresh-right"></i> Reset Password
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {resetRouter, setRoutes} from "@/router";

export default {
  name: "Login",
  data() {
    return {
      user: {},
      pass: {},
      rememberPassword: false,
      dialogFormVisible: false,
      rules: {
        username: [
          { required: true, message: 'Please enter username', trigger: 'blur' },
          { min: 3, max: 10, message: 'Length must be between 3 and 10 characters', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' },
          { min: 1, max: 20, message: 'Length must be between 1 and 20 characters', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    // Reset routes
    resetRouter()
  },
  methods: {
    login() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          this.request.post("/user/login", this.user).then(res => {
            if(res.code === '200') {
              localStorage.setItem("user", JSON.stringify(res.data))
              localStorage.setItem("menus", JSON.stringify(res.data.menus))

              setRoutes()
              this.$router.push("/front/home")
              this.$message.success("Login successful")
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      });
    },
    handlePass() {
      this.dialogFormVisible = true
      this.pass = {}
    },
    passwordBack() {
      this.request.put("/user/reset", this.pass).then(res => {
        if (res.code === '200') {
          this.$message.success("Password reset successful. New password is: 123. Please change it soon.")
          this.dialogFormVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  background-color: #f8fafc;
  overflow: hidden;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

.header {
  position: relative;
  height: 100px;
  background-color: #37CE8A;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}

.home-btn {
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.95);
  border: none;
  color: #37CE8A;
  font-weight: 600;
  border-radius: 20px;
  padding: 8px 16px;
}

.home-btn:hover,
.home-btn:focus {
  background-color: #fff;
  color: #2e8b57;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 28px;
  font-weight: bold;
}

.pet-icon {
  font-size: 32px;
  margin-right: 12px;
  color: #FF9F43;
}

.system-name {
  letter-spacing: 1px;
}

.slogan {
  margin-top: 8px;
  font-size: 16px;
  font-weight: 300;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 180px);
  padding: 20px;
  min-height: 600px;
}

.login-box {
  width: 900px;
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.login-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
}

.title-left {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

.title-icon {
  color: #5D9CEC;
  margin-right: 10px;
  font-size: 24px;
}

.title-right {
  display: flex;
  align-items: center;
}

.new-user {
  color: #666;
  font-size: 14px;
  margin-right: 8px;
}

.register-link {
  color: #37CE8A;
  font-weight: 500;
}

.register-link:hover {
  color: #2FB876;
}

.form-container {
  display: flex;
  gap: 40px;
}

.form-left {
  flex: 1;
  padding-right: 20px;
}

.form-right {
  flex: 1;
  padding-left: 20px;
}

.form-divider {
  width: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.divider-line {
  flex: 1;
  width: 1px;
  background-color: #E6EBF5;
}

.divider-text {
  padding: 10px;
  color: #97A8BE;
  font-size: 14px;
  background-color: white;
}

.login-form {
  margin-top: 10px;
}

.form-item {
  margin-bottom: 25px;
}

.form-label {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.icon-label {
  color: #5D9CEC;
  margin-right: 8px;
  font-size: 16px;
}

.custom-input {
  width: 100%;
}

.custom-input >>> .el-input__inner {
  height: 42px;
  border-color: #E6EBF5;
  border-radius: 6px;
}

.custom-input >>> .el-input__inner:focus {
  border-color: #5D9CEC;
}

.remember-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 25px;
}

.remember-checkbox {
  color: #666;
}

.remember-checkbox >>> .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #37CE8A;
  border-color: #37CE8A;
}

.forget-link {
  color: #97A8BE;
  font-size: 14px;
}

.forget-link:hover {
  color: #5D9CEC;
}

.login-btn-item {
  margin-bottom: 30px;
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
  background-color: #5D9CEC;
  border-color: #5D9CEC;
  border-radius: 6px;
}

.login-btn:hover {
  background-color: #4A8BDB;
  border-color: #4A8BDB;
}

.quick-login {
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid #F5F7FA;
}

.quick-title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #666;
  font-size: 14px;
}

.quick-title i {
  color: #97A8BE;
  margin-right: 8px;
}

.quick-buttons {
  display: flex;
  gap: 12px;
}

.quick-btn {
  flex: 1;
  height: 40px;
  color: #666;
  background-color: #F8FAFC;
  border-color: #E6EBF5;
}

.quick-btn:hover {
  background-color: #F0F4F8;
  border-color: #DCE3EB;
}

.wechat-btn i {
  color: #07C160;
}

.qq-btn i {
  color: #12B7F5;
}

.phone-btn i {
  color: #5D9CEC;
}

/* Right side system info styles */
.system-info {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.info-title {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  color: #333;
  font-size: 18px;
  font-weight: bold;
}

.info-icon {
  color: #37CE8A;
  margin-right: 10px;
  font-size: 20px;
}

.feature-list {
  flex: 1;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #F8FAFC;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background-color: #F0F9FF;
  transform: translateX(5px);
}

.feature-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  margin-right: 15px;
  color: #5D9CEC;
  font-size: 20px;
}

.feature-content h4 {
  margin: 0 0 5px;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}

.feature-content p {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.pet-statistics {
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
  padding: 20px;
  background-color: #F8FAFC;
  border-radius: 8px;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #5D9CEC;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 13px;
  color: #666;
}

.system-tips {
  padding: 15px;
  background-color: #F0F9FF;
  border-radius: 8px;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.system-tips i {
  color: #5D9CEC;
  margin-right: 8px;
  vertical-align: middle;
}

/* Footer styles */
.footer {
  height: 80px;
  background-color: #2C3E50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-content {
  text-align: center;
}

.footer-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
}

.footer-logo i {
  margin-right: 8px;
  color: #37CE8A;
}

.footer-info p {
  margin: 4px 0;
  font-size: 13px;
  opacity: 0.8;
}

/* Dialog styles */
.password-dialog {
  border-radius: 12px;
}

.dialog-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #5D9CEC;
  font-size: 16px;
  font-weight: 500;
}

.dialog-icon {
  font-size: 20px;
  margin-right: 10px;
}

.dialog-form {
  padding: 10px 0;
}

.dialog-button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.cancel-btn, .reset-btn {
  width: 48%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.cancel-btn {
  color: #666;
  background-color: #F5F7FA;
  border-color: #E6EBF5;
}

.cancel-btn:hover {
  background-color: #E6EBF5;
  border-color: #DCE3EB;
}

.reset-btn {
  background-color: #37CE8A;
  border-color: #37CE8A;
}

.reset-btn:hover {
  background-color: #2FB876;
  border-color: #2FB876;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .login-box {
    width: 90%;
    max-width: 800px;
  }

  .form-container {
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .login-box {
    width: 95%;
    padding: 20px;
  }

  .form-container {
    flex-direction: column;
    gap: 30px;
  }

  .form-left, .form-right {
    padding: 0;
  }

  .form-divider {
    width: 100%;
    height: 1px;
    flex-direction: row;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    width: auto;
  }

  .header {
    height: 90px;
    padding: 8px 0;
  }

  .logo {
    font-size: 24px;
  }

  .system-name {
    font-size: 22px;
  }

  .slogan {
    font-size: 14px;
  }

  .title-left {
    font-size: 20px;
  }

  .login-btn {
    height: 42px;
    font-size: 15px;
  }

  .quick-buttons {
    flex-wrap: wrap;
  }

  .quick-btn {
    min-width: calc(33.333% - 8px);
  }
}
</style>
