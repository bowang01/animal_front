<template>
  <div class="wrapper">
    <div class="header">
      <div class="logo">
        <i class="el-icon-star-off pet-icon"></i>
        <span class="system-name">Pet Adoption Management System</span>
      </div>
      <div class="slogan">In the name of love, finding forever homes for pets</div>
    </div>

    <div class="register-container">
      <div class="register-box">
        <div class="register-title">
          <div class="title-left">
            <i class="el-icon-edit-outline title-icon"></i>
            <span>User Registration</span>
          </div>
          <div class="title-right">
            <span class="existing-user">Already have an account?</span>
            <el-button
                type="text"
                size="small"
                @click="$router.push('/login')"
                class="login-link"
            >
              Login now <i class="el-icon-arrow-right"></i>
            </el-button>
          </div>
        </div>

        <div class="form-container">
          <!-- Left form area -->
          <div class="form-left">
            <el-form :model="user" :rules="rules" ref="userForm" class="register-form">
              <el-form-item prop="username" class="form-item">
                <div class="form-label">
                  <i class="el-icon-user icon-label"></i>
                  <span>Username</span>
                </div>
                <el-input
                    size="medium"
                    v-model="user.username"
                    placeholder="Please enter username (3-10 characters)"
                    class="custom-input"
                ></el-input>
                <div class="form-tips">Letters and numbers recommended</div>
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
                    placeholder="Please enter password (6-20 characters)"
                    class="custom-input"
                ></el-input>
                <div class="form-tips">Password must contain letters and numbers, 6-20 characters</div>
              </el-form-item>

              <el-form-item prop="confirmPassword" class="form-item">
                <div class="form-label">
                  <i class="el-icon-lock icon-label"></i>
                  <span>Confirm Password</span>
                </div>
                <el-input
                    size="medium"
                    show-password
                    v-model="user.confirmPassword"
                    placeholder="Please enter password again"
                    class="custom-input"
                ></el-input>
              </el-form-item>

              <el-form-item class="agreement-item">
                <el-checkbox v-model="agreementChecked" class="agreement-checkbox">
                  I have read and agree to the
                  <el-link type="primary" :underline="false" @click="showAgreement" class="agreement-link">Terms of Service</el-link>
                  and
                  <el-link type="primary" :underline="false" @click="showPrivacy" class="agreement-link">Privacy Policy</el-link>
                </el-checkbox>
              </el-form-item>

              <el-form-item class="register-btn-item">
                <el-button
                    type="primary"
                    size="medium"
                    @click="register"
                    class="register-btn"
                    :disabled="!agreementChecked"
                >
                  <i class="el-icon-check"></i> Register now
                </el-button>
              </el-form-item>
            </el-form>

          </div>

          <!-- Right divider and system info -->
          <div class="form-divider">
            <div class="divider-line"></div>
            <div class="divider-text">Benefits</div>
            <div class="divider-line"></div>
          </div>

          <!-- Right system info area -->
          <div class="form-right">
            <div class="system-info">
              <div class="info-title">
                <i class="el-icon-s-opportunity info-icon"></i>
                <span>Join the Pet Adoption Community</span>
              </div>

              <div class="feature-list">
                <div class="feature-item">
                  <div class="feature-icon">
                    <i class="el-icon-view"></i>
                  </div>
                  <div class="feature-content">
                    <h4>Browse Many Pets</h4>
                    <p>View detailed pet information and photos</p>
                  </div>
                </div>

                <div class="feature-item">
                  <div class="feature-icon">
                    <i class="el-icon-star-on"></i>
                  </div>
                  <div class="feature-content">
                    <h4>Favorite Pets</h4>
                    <p>Save your favorite pets and follow updates</p>
                  </div>
                </div>


                <div class="feature-item">
                  <div class="feature-icon">
                    <i class="el-icon-document-add"></i>
                  </div>
                  <div class="feature-content">
                    <h4>Quick Application</h4>
                    <p>Submit adoption applications with one click</p>
                  </div>
                </div>
              </div>


              <div class="success-stories">
                <div class="stories-title">
                  <i class="el-icon-medal"></i>
                  <span>Adoption Success Stories</span>
                </div>
                <div class="story-item">
                  <div class="story-avatar">
                    <i class="el-icon-user"></i>
                  </div>
                  <div class="story-content">
                    <p>"I adopted my cat through this platform, and now she's part of our family!"</p>
                    <span class="story-author">— Ms. Zhang, adopted for 1 year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Terms of Service dialog -->
    <el-dialog
        title="Terms of Service"
        :visible.sync="agreementDialogVisible"
        width="50%"
        class="agreement-dialog"
    >
      <div class="dialog-header">
        <i class="el-icon-document dialog-icon"></i>
        <span>Terms of Service</span>
      </div>
      <div class="agreement-content">
        <h3>Pet Adoption System Terms of Service</h3>
        <p>Welcome to register as a user of the Pet Adoption System! Before registering, please carefully read the following terms:</p>
        <p>1. Users shall ensure that the personal information provided is true, accurate, and complete, including but not limited to name, contact information, etc.</p>
        <p>2. Users commit to providing proper care for adopted pets and shall not abuse or abandon them.</p>
        <p>3. The system only provides information display and matching services. Specific adoption arrangements shall be negotiated between the user and the pet provider.</p>
        <p>4. Users shall comply with relevant national laws and regulations and use this system in a civil manner.</p>
        <p>5. This system reserves the right to ban users who violate the rules.</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="agreementDialogVisible = false" class="close-btn">
          <i class="el-icon-close"></i> Close
        </el-button>
      </div>
    </el-dialog>

    <!-- Privacy Policy dialog -->
    <el-dialog
        title="Privacy Policy"
        :visible.sync="privacyDialogVisible"
        width="50%"
        class="privacy-dialog"
    >
      <div class="dialog-header">
        <i class="el-icon-shield dialog-icon"></i>
        <span>Privacy Policy</span>
      </div>
      <div class="privacy-content">
        <h3>Privacy Policy</h3>
        <p>We highly value your privacy protection and commit to complying with relevant laws and regulations:</p>
        <p>1. The information we collect is used only for pet adoption service matching and system feature improvements.</p>
        <p>2. Without your consent, we will not provide your personal information to third parties.</p>
        <p>3. You may view and modify your personal information at any time.</p>
        <p>4. We will take reasonable measures to protect the security of your information.</p>
        <p>5. If you no longer use this system, you may apply to cancel your account.</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="privacyDialogVisible = false" class="close-btn">
          <i class="el-icon-close"></i> Close
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    // Custom confirm password validation rule
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter password again'))
      } else if (value !== this.user.password) {
        callback(new Error('The two passwords do not match'))
      } else {
        callback()
      }
    }

    return {
      user: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      agreementChecked: true,
      agreementDialogVisible: false,
      privacyDialogVisible: false,
      rules: {
        username: [
          { required: true, message: 'Please enter username', trigger: 'blur' },
          { min: 3, max: 10, message: 'Username length must be between 3 and 10 characters', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' },
          { min: 6, max: 20, message: 'Password length must be between 6 and 20 characters', trigger: 'blur' },
          { pattern: /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/, message: 'Password must contain letters and numbers', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: 'Please confirm password', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    register() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          if (!this.agreementChecked) {
            this.$message.warning('Please read and agree to the Terms of Service and Privacy Policy first')
            return
          }

          const registerData = {
            username: this.user.username,
            password: this.user.password
          }

          this.request.post("/user/register", registerData).then(res => {
            if(res.code === '200') {
              this.$message.success("Registration successful. Redirecting to login page")
              setTimeout(() => {
                this.$router.push('/login')
              }, 3000)
            } else {
              this.$message.error(res.msg)
            }
          }).catch(error => {
            this.$message.error("Registration failed. Please try again later")
          })
        }
      });
    },
    showAgreement() {
      this.agreementDialogVisible = true
    },
    showPrivacy() {
      this.privacyDialogVisible = true
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
  height: 100px;
  background-color: #37CE8A;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
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

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 180px);
  padding: 20px;
  min-height: 600px;
}

.register-box {
  width: 900px;
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-top: 100px;
}

.register-title {
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
  color: #FF9F43;
  margin-right: 10px;
  font-size: 24px;
}

.title-right {
  display: flex;
  align-items: center;
}

.existing-user {
  color: #666;
  font-size: 14px;
  margin-right: 8px;
}

.login-link {
  color: #5D9CEC;
  font-weight: 500;
}

.login-link:hover {
  color: #4A8BDB;
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

.register-form {
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
  color: #FF9F43;
  margin-right: 8px;
  font-size: 16px;
}

.form-tips {
  margin-top: 6px;
  font-size: 12px;
  color: #97A8BE;
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

.agreement-item {
  margin: 20px 0 25px;
}

.agreement-checkbox {
  color: #666;
  font-size: 14px;
}

.agreement-checkbox >>> .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #37CE8A;
  border-color: #37CE8A;
}

.agreement-link {
  font-weight: 500;
}

.register-btn-item {
  margin-bottom: 30px;
}

.register-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
  background-color: #FF9F43;
  border-color: #FF9F43;
  border-radius: 6px;
}

.register-btn:hover {
  background-color: #FF8C1A;
  border-color: #FF8C1A;
}

.register-btn.is-disabled {
  background-color: #F5F7FA;
  border-color: #E6EBF5;
  color: #97A8BE;
}

.register-tips {
  margin-top: 30px;
  padding: 20px;
  background-color: #F8FAFC;
  border-radius: 8px;
}

.tips-title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.tips-title i {
  color: #37CE8A;
  margin-right: 8px;
}

.tips-list {
  margin: 0;
  padding-left: 20px;
}

.tips-list li {
  margin-bottom: 10px;
  color: #666;
  font-size: 14px;
  list-style: none;
  display: flex;
  align-items: center;
}

.tips-list li i {
  color: #37CE8A;
  margin-right: 8px;
  font-size: 14px;
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
  color: #FF9F43;
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
  color: #FF9F43;
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

.success-stories {
  margin-top: 20px;
  padding: 15px;
  background-color: #F8FAFC;
  border-radius: 8px;
}

.stories-title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.stories-title i {
  color: #37CE8A;
  margin-right: 8px;
}

.story-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.story-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  color: #5D9CEC;
  font-size: 20px;
  flex-shrink: 0;
}

.story-content {
  flex: 1;
}

.story-content p {
  margin: 0 0 5px;
  color: #666;
  font-size: 14px;
  font-style: italic;
  line-height: 1.5;
}

.story-author {
  font-size: 12px;
  color: #97A8BE;
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
.agreement-dialog, .privacy-dialog {
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

.agreement-content, .privacy-content {
  line-height: 1.8;
  color: #333;
  max-height: 400px;
  overflow-y: auto;
  padding: 0 10px;
}

.agreement-content h3, .privacy-content h3 {
  color: #FF9F43;
  text-align: center;
  margin-bottom: 20px;
}

.agreement-content p, .privacy-content p {
  margin-bottom: 12px;
  text-indent: 2em;
}

.dialog-footer {
  text-align: center;
}

.close-btn {
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-color: #F5F7FA;
  border-color: #E6EBF5;
  color: #666;
}

.close-btn:hover {
  background-color: #E6EBF5;
  border-color: #DCE3EB;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .register-box {
    width: 90%;
    max-width: 800px;
  }

  .form-container {
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .register-box {
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

  .register-btn {
    height: 42px;
    font-size: 15px;
  }

  .agreement-dialog, .privacy-dialog {
    width: 90% !important;
  }
}
</style>
