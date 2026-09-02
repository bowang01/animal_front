<template>
  <div style="background: #f9f9f9; min-height: 100vh">
    <!-- Header navigation bar -->
    <div style="background-color: white; height: 72px; line-height: 72px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05); position: sticky; top: 0; z-index: 1000">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; height: 100%; padding: 0 20px">
        <!-- Logo area -->
        <div style="min-width: 180px; display: flex; align-items: center; margin-right: 20px">
          <div style="flex: 1; min-width: 0">
            <div style="font-size: 20px; color: #ff6b6b; font-weight: bold; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">Pet Adoption System</div>
          </div>
        </div>

        <!-- Navigation menu -->
        <div style="flex: 1; overflow: hidden">
          <div ref="menuContainer" style="display: flex; overflow-x: auto; overflow-y: hidden; -webkit-overflow-scrolling: touch; scrollbar-width: thin; padding-bottom: 5px">
            <el-menu
                :default-active="activeIndex"
                ref="navMenu"
                class="el-menu-demo"
                mode="horizontal"
                router
                text-color="#666"
                active-text-color="#ff6b6b"
                style="border-bottom: none; height: 72px; display: flex; white-space: nowrap; flex-shrink: 0"
            >
              <el-menu-item index="/front/home" style="height: 72px; line-height: 72px; font-size: 14px; padding: 0 12px; flex-shrink: 0">
                <i class="el-icon-s-home" style="margin-right: 5px; font-size: 16px"></i>
                Home
              </el-menu-item>
              <el-menu-item index="/front/adopt" style="height: 72px; line-height: 72px; font-size: 14px; padding: 0 12px; flex-shrink: 0">
                <i class="el-icon-s-help" style="margin-right: 5px; font-size: 16px"></i>
                Pet Adoption
              </el-menu-item>
              <el-menu-item index="/front/salvation" style="height: 72px; line-height: 72px; font-size: 14px; padding: 0 12px; flex-shrink: 0">
                <i class="el-icon-first-aid-kit" style="margin-right: 5px; font-size: 16px"></i>
                Stray Rescue
              </el-menu-item>
              <el-menu-item index="/front/feed" style="height: 72px; line-height: 72px; font-size: 14px; padding: 0 12px; flex-shrink: 0">
                <i class="el-icon-food" style="margin-right: 5px; font-size: 16px"></i>
                Feeding Points
              </el-menu-item>
              <el-menu-item index="/front/lost" style="height: 72px; line-height: 72px; font-size: 14px; padding: 0 12px; flex-shrink: 0">
                <i class="el-icon-search" style="margin-right: 5px; font-size: 16px"></i>
                Lost Pets
              </el-menu-item>
              <el-menu-item index="/front/rescue" style="height: 72px; line-height: 72px; font-size: 14px; padding: 0 12px; flex-shrink: 0">
                <i class="el-icon-office-building" style="margin-right: 5px; font-size: 16px"></i>
                Rescue Stations
              </el-menu-item>
              <el-menu-item index="/front/article" style="height: 72px; line-height: 72px; font-size: 14px; padding: 0 12px; flex-shrink: 0">
                <i class="el-icon-chat-dot-round" style="margin-right: 5px; font-size: 16px"></i>
                Pet Forum
              </el-menu-item>
              <el-menu-item index="/front/donate" style="height: 72px; line-height: 72px; font-size: 14px; padding: 0 12px; flex-shrink: 0">
                <i class="el-icon-present" style="margin-right: 5px; font-size: 16px"></i>
                Donations
              </el-menu-item>
              <el-menu-item index="/front/articleKp" style="height: 72px; line-height: 72px; font-size: 14px; padding: 0 12px; flex-shrink: 0">
                <i class="el-icon-document" style="margin-right: 5px; font-size: 16px"></i>
                Science Articles
              </el-menu-item>
              <el-menu-item index="/front/activity" style="height: 72px; line-height: 72px; font-size: 14px; padding: 0 12px; flex-shrink: 0">
                <i class="el-icon-star-on" style="margin-right: 5px; font-size: 16px"></i>
                Popular Activities
              </el-menu-item>
            </el-menu>
          </div>
        </div>

        <!-- User action area - three independent sections -->
        <div style="min-width: auto; flex-shrink: 0; margin-left: 10px; display: flex; align-items: center; gap: 20px">
          <!-- Login/Register buttons (shown when not logged in) -->
          <div v-if="!user.username" style="text-align: right; white-space: nowrap">
            <el-button
                @click="$router.push('/login')"
                size="medium"
                style="border-radius: 20px; padding: 6px 16px; border-color: #ff6b6b; color: #ff6b6b; margin-right: 8px; font-size: 13px"
            >
              Login
            </el-button>
            <el-button
                @click="$router.push('/register')"
                type="primary"
                size="medium"
                style="background-color: #ff6b6b; border-color: #ff6b6b; border-radius: 20px; padding: 6px 16px; font-size: 13px"
            >
              Register
            </el-button>
          </div>

          <!-- Logged-in user info -->
          <div v-else style="display: flex; align-items: center; gap: 20px">
            <!-- Avatar displayed separately -->
            <div style="position: relative; cursor: pointer; flex-shrink: 0" @click="toggleUserInfo">
              <img :src="user.avatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" alt="User avatar"
                   style="width: 42px; height: 42px; border-radius: 50%; margin-top:30px; object-fit: cover; border: 2px solid #ff6b6b; transition: transform 0.3s"
                   :style="{transform: showUserInfo ? 'scale(1.1)' : 'scale(1)'}">

            </div>

            <!-- Nickname displayed separately -->
            <div style="cursor: pointer; min-width: 0; flex-shrink: 0" @click="toggleUserInfo">
              <div style="color: #333; font-size: 14px; font-weight: 600; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px">
                {{ user.nickname || user.username }}
              </div>
              <div style="color: #999; font-size: 12px; line-height: 1.2; margin-top: 2px">Settings</div>
            </div>

            <!-- Personal center dropdown displayed separately -->
            <el-dropdown
                style="cursor: pointer; flex-shrink: 0"
                trigger="click"
                @visible-change="handleDropdownVisible"
                @command="handleCommand"
            >
              <div style="display: inline-flex; align-items: center;  border-radius: 5px; background-color: #f9f9f9; transition: all 0.3s; border: 1px solid #e8e8e8"
                   @mouseenter="dropdownHover = true" @mouseleave="dropdownHover = false">
                <i class="el-icon-s-operation" style="color: #ff6b6b; font-size: 16px; margin-right: 6px"></i>
                <span style="font-size: 13px; color: #333; font-weight: 500">Personal Center</span>
                <i class="el-icon-arrow-down" style="margin-left: 4px; color: #999; transition: transform 0.3s; font-size: 12px"
                   :style="{transform: dropdownVisible ? 'rotate(180deg)' : 'none'}"></i>
              </div>

              <el-dropdown-menu slot="dropdown" style="width: 180px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); border: none; margin-top: 5px">
                <!-- User info overview -->
                <div style="padding: 15px; background: linear-gradient(135deg, #ff6b6b, #ff8e8e); border-radius: 10px 10px 0 0; color: white; margin-bottom: 5px">
                  <div style="display: flex; align-items: center; margin-bottom: 10px">
                    <img :src="user.avatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" alt="Avatar"
                         style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; margin-right: 12px">
                    <div>
                      <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px">{{ user.nickname || user.username }}</div>
                      <div style="font-size: 11px; opacity: 0.9">{{ user.email || 'Email not set' }}</div>
                    </div>
                  </div>
                  <div v-if="user.role === 'ROLE_ADMIN'" style="display: inline-flex; align-items: center; background: rgba(255, 255, 255, 0.2); padding: 3px 10px; border-radius: 20px; font-size: 11px">
                    <i class="el-icon-s-tools" style="margin-right: 4px; font-size: 10px"></i>
                    Admin
                  </div>
                </div>

                <el-dropdown-item v-if="user.role === 'ROLE_ADMIN'" command="admin" style="font-size: 13px; padding: 12px 16px">
                  <div style="display: flex; align-items: center; color: #333">
                    <div style="width: 30px; height: 30px; background-color: #2e8b57; border-radius: 6px; margin-right: 10px; display: flex; align-items: center; justify-content: center">
                      <i class="el-icon-s-tools" style="color: white; font-size: 14px"></i>
                    </div>
                    <div>
                      <div style="font-weight: 500">Admin Panel</div>
                      <div style="font-size: 11px; color: #999">System management access</div>
                    </div>
                  </div>
                </el-dropdown-item>

                <el-dropdown-item command="person" style="font-size: 13px; padding: 12px 16px">
                  <div style="display: flex; align-items: center; color: #333">
                    <div style="width: 30px; height: 30px; background-color: #1890ff; border-radius: 6px; margin-right: 10px; display: flex; align-items: center; justify-content: center">
                      <i class="el-icon-user" style="color: white; font-size: 14px"></i>
                    </div>
                    <div>
                      <div style="font-weight: 500">Personal Info</div>
                      <div style="font-size: 11px; color: #999">View and edit profile</div>
                    </div>
                  </div>
                </el-dropdown-item>

                <el-dropdown-item command="password" style="font-size: 13px; padding: 12px 16px">
                  <div style="display: flex; align-items: center; color: #333">
                    <div style="width: 30px; height: 30px; background-color: #ff9500; border-radius: 6px; margin-right: 10px; display: flex; align-items: center; justify-content: center">
                      <i class="el-icon-lock" style="color: white; font-size: 14px"></i>
                    </div>
                    <div>
                      <div style="font-weight: 500">Change Password</div>
                      <div style="font-size: 11px; color: #999">Account security settings</div>
                    </div>
                  </div>
                </el-dropdown-item>

                <div style="border-top: 1px solid #f0f0f0; margin: 8px 0"></div>

                <el-dropdown-item command="logout" style="font-size: 13px; padding: 12px 16px; border-radius: 0 0 10px 10px">
                  <div style="display: flex; align-items: center; color: #ff6b6b">
                    <div style="width: 30px; height: 30px; background-color: #fff5f5; border-radius: 6px; margin-right: 10px; display: flex; align-items: center; justify-content: center">
                      <i class="el-icon-switch-button" style="color: #ff6b6b; font-size: 14px"></i>
                    </div>
                    <div>
                      <div style="font-weight: 500">Logout</div>
                      <div style="font-size: 11px; color: #ff9999">Safely sign out</div>
                    </div>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>

      <!-- Navigation indicator bar -->
      <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; background-color: #f0f0f0">
        <div :style="{
          position: 'absolute',
          bottom: '0',
          left: indicatorLeft,
          width: indicatorWidth,
          height: '3px',
          backgroundColor: '#ff6b6b',
          transition: 'all 0.3s ease',
          borderRadius: '3px 3px 0 0'
        }"></div>
      </div>
    </div>

    <!-- User info dialog -->
    <el-dialog
        :visible.sync="showUserInfo"
        width="400px"
        title="User Info"
        :before-close="handleCloseDialog"
        custom-class="user-info-dialog"
    >
      <div style="padding: 20px">
        <div style="text-align: center; margin-bottom: 24px">
          <img :src="user.avatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" alt="Avatar"
               style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #ff6b6b; object-fit: cover; margin-bottom: 15px">
          <div style="font-size: 18px; font-weight: 600; color: #333; margin-bottom: 5px">{{ user.nickname || user.username }}</div>
          <div v-if="user.role === 'ROLE_ADMIN'" style="display: inline-flex; align-items: center; background-color: #2e8b57; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-top: 5px">
            <i class="el-icon-s-tools" style="margin-right: 5px; font-size: 11px"></i>
            Admin
          </div>
        </div>

        <div style="background-color: #f9f9f9; border-radius: 10px; padding: 20px">
          <div style="display: flex; align-items: center; margin-bottom: 15px">
            <i class="el-icon-user" style="color: #1890ff; margin-right: 12px; font-size: 16px"></i>
            <div>
              <div style="font-size: 13px; color: #999; margin-bottom: 2px">Username</div>
              <div style="font-size: 14px; color: #333; font-weight: 500">{{ user.username }}</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; margin-bottom: 15px">
            <i class="el-icon-message" style="color: #ff6b6b; margin-right: 12px; font-size: 16px"></i>
            <div>
              <div style="font-size: 13px; color: #999; margin-bottom: 2px">Email</div>
              <div style="font-size: 14px; color: #333; font-weight: 500">{{ user.email || 'Not set' }}</div>
            </div>
          </div>

          <div style="display: flex; align-items: center">
            <i class="el-icon-phone" style="color: #52c41a; margin-right: 12px; font-size: 16px"></i>
            <div>
              <div style="font-size: 13px; color: #999; margin-bottom: 2px">Phone</div>
              <div style="font-size: 14px; color: #333; font-weight: 500">{{ user.phone || 'Not set' }}</div>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; gap: 12px; margin-top: 24px">
          <el-button
              type="primary"
              style="background-color: #ff6b6b; border-color: #ff6b6b; border-radius: 20px; padding: 8px 24px"
              @click="$router.push('/front/person')"
          >
            <i class="el-icon-edit" style="margin-right: 5px"></i>
            Edit Profile
          </el-button>
          <el-button
              style="border-radius: 20px; padding: 8px 24px"
              @click="showUserInfo = false"
          >
            Close
          </el-button>
        </div>
      </div>
    </el-dialog>

    <!-- Main content area -->
    <div style="max-width: 1200px; margin: 20px auto; padding: 0 20px; min-height: calc(100vh - 300px)">
      <router-view />
    </div>

    <!-- Footer info -->
    <div style="background-color: #333; color: white; padding: 40px 0; margin-top: 40px">
      <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-bottom: 30px">
          <div>
            <div style="display: flex; align-items: center; margin-bottom: 20px">
              <div style="width: 40px; height: 40px; background-color: #ff6b6b; border-radius: 8px; margin-right: 12px; display: flex; align-items: center; justify-content: center">
                <i class="el-icon-s-help" style="color: white; font-size: 20px"></i>
              </div>
              <div style="font-size: 20px; font-weight: bold">Pet Adoption System</div>
            </div>
            <div style="color: #aaa; line-height: 1.6; font-size: 14px">
              Dedicated to finding warm homes for stray animals, providing adoption, rescue, donation and other services. So every little life can be treated with kindness.
            </div>
          </div>

          <div>
            <div style="color: white; font-size: 16px; font-weight: bold; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #444">Quick Links</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px">
              <div v-for="item in quickLinks" :key="item.path" style="font-size: 14px">
                <router-link :to="item.path" style="color: #aaa; text-decoration: none; transition: color 0.3s"
                             @mouseenter="e => e.target.style.color = '#ff6b6b'" @mouseleave="e => e.target.style.color = '#aaa'">
                  {{ item.name }}
                </router-link>
              </div>
            </div>
          </div>

          <div>
            <div style="color: white; font-size: 16px; font-weight: bold; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #444">Contact Us</div>
            <div style="color: #aaa; font-size: 14px; line-height: 1.8">
              <div style="display: flex; align-items: center; margin-bottom: 10px">
                <i class="el-icon-phone" style="margin-right: 10px; color: #ff6b6b"></i>
                <span>Hotline: 04 555 0XXX</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 10px">
                <i class="el-icon-message" style="margin-right: 10px; color: #ff6b6b"></i>
                <span>Email: support@petadoptiontest.nz</span>
              </div>
              <div style="display: flex; align-items: center">
                <i class="el-icon-location-information" style="margin-right: 10px; color: #ff6b6b"></i>
                <span>Petone, Lower Hutt Wellington 6011, New Zealand</span>
              </div>
            </div>
          </div>
        </div>

        <div style="border-top: 1px solid #444; padding-top: 20px; text-align: center; color: #888; font-size: 14px">
          <div style="margin-bottom: 10px">© Pet Adoption System. All rights reserved.</div>
          <div>NZBN 94290XXX567 | Registered Charity CC51234</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Front",
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      activeIndex: "/front/home",
      dropdownVisible: false,
      dropdownHover: false,
      showUserInfo: false,
      indicatorLeft: "0px",
      indicatorWidth: "0px",
      quickLinks: [
        { name: "Home", path: "/front/home" },
        { name: "Pet Adoption", path: "/front/adopt" },
        { name: "Stray Rescue", path: "/front/salvation" },
        { name: "Feeding Points", path: "/front/feed" },
        { name: "Lost Pets", path: "/front/lost" },
        { name: "Rescue Stations", path: "/front/rescue" },
        { name: "Pet Forum", path: "/front/article" },
        { name: "Donations", path: "/front/donate" },
      ]
    }
  },
  created() {
    this.updateActiveIndex()
    this.$router.afterEach(() => {
      this.updateActiveIndex()
      this.updateIndicator()
    })
  },
  mounted() {
    this.updateIndicator()
    setTimeout(() => {
      this.updateIndicator()
    }, 100)
  },
  methods: {
    updateActiveIndex() {
      const path = this.$route.path
      if (path.includes('/front/')) {
        this.activeIndex = path
      }
    },
    updateIndicator() {
      const activeElement = document.querySelector('.el-menu--horizontal .el-menu-item.is-active')
      if (activeElement) {
        const menuContainer = this.$refs.menuContainer
        if (menuContainer) {
          const rect = activeElement.getBoundingClientRect()
          const containerRect = menuContainer.getBoundingClientRect()
          this.indicatorLeft = (rect.left - containerRect.left + menuContainer.scrollLeft) + 'px'
          this.indicatorWidth = rect.width + 'px'
        }
      }
    },
    handleDropdownVisible(visible) {
      this.dropdownVisible = visible
    },
    handleCommand(command) {
      switch (command) {
        case 'admin':
          this.$router.push('/')
          break
        case 'person':
          this.$router.push('/front/person')
          break
        case 'password':
          this.$router.push('/front/password')
          break
        case 'logout':
          this.logout()
          break
      }
    },
    toggleUserInfo() {
      this.showUserInfo = !this.showUserInfo
    },
    handleCloseDialog(done) {
      done()
    },
    logout() {
      this.$confirm('Are you sure you want to log out?', 'Notice', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
        customClass: 'logout-confirm'
      }).then(() => {
        this.$store.commit("logout")
        this.$message.success("Logged out successfully")
        this.showUserInfo = false
        this.$router.push('/front/home')
      }).catch(() => {})
    }
  },
  watch: {
    dropdownHover(val) {
      if (val) {
        this.dropdownVisible = true
      } else {
        setTimeout(() => {
          if (!this.dropdownHover) {
            this.dropdownVisible = false
          }
        }, 200)
      }
    },
    '$route.path': {
      handler() {
        setTimeout(() => {
          this.updateIndicator()
        }, 100)
      }
    }
  }
}
</script>

<style scoped>
/* Global style adjustments */
::v-deep .el-menu--horizontal {
  border-bottom: none !important;
}

::v-deep .el-menu--horizontal > .el-menu-item {
  height: 72px;
  line-height: 72px;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

::v-deep .el-menu--horizontal > .el-menu-item:hover {
  background-color: transparent;
  border-bottom: 3px solid #ffb6b6;
  color: #ff6b6b !important;
}

::v-deep .el-menu--horizontal > .el-menu-item.is-active {
  background-color: transparent;
  border-bottom: 3px solid #ff6b6b;
  color: #ff6b6b !important;
  font-weight: 500;
}

/* Menu scroll container styles */
div[ref="menuContainer"]::-webkit-scrollbar {
  height: 4px;
}

div[ref="menuContainer"]::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

div[ref="menuContainer"]::-webkit-scrollbar-thumb {
  background: #ffb6b6;
  border-radius: 2px;
}

div[ref="menuContainer"]::-webkit-scrollbar-thumb:hover {
  background: #ff6b6b;
}

/* Dropdown menu styles */
::v-deep .el-dropdown-menu {
  border: none;
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
}

::v-deep .el-dropdown-menu__item {
  padding: 12px 16px;
  font-size: 13px;
  transition: all 0.3s;
}

::v-deep .el-dropdown-menu__item:not(:last-child) {
  border-bottom: 1px solid #f5f5f5;
}

::v-deep .el-dropdown-menu__item:hover {
  background-color: #fff5f5;
}

::v-deep .el-dropdown-menu__item:hover div {
  color: #ff6b6b;
}

/* Button styles */
::v-deep .el-button {
  border-radius: 20px;
  padding: 6px 16px;
  transition: all 0.3s;
  font-size: 13px;
}

::v-deep .el-button--primary {
  background-color: #ff6b6b;
  border-color: #ff6b6b;
}

::v-deep .el-button--primary:hover {
  background-color: #ff5252;
  border-color: #ff5252;
}

::v-deep .el-button:not(.el-button--primary):hover {
  border-color: #ff6b6b;
  color: #ff6b6b;
}

/* Footer link styles */
.router-link-active {
  color: #ff6b6b !important;
  font-weight: 500;
}

/* User info dialog styles */
::v-deep .user-info-dialog {
  border-radius: 12px;
  overflow: hidden;
}

::v-deep .user-info-dialog .el-dialog__header {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  padding: 20px;
}

::v-deep .user-info-dialog .el-dialog__title {
  color: white;
  font-weight: 600;
}

::v-deep .user-info-dialog .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

::v-deep .user-info-dialog .el-dialog__headerbtn:hover .el-dialog__close {
  color: #ffcccc;
}

::v-deep .user-info-dialog .el-dialog__body {
  padding: 0;
}

/* Confirm dialog styles */
::v-deep .logout-confirm .el-message-box {
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

::v-deep .logout-confirm .el-message-box__header {
  background-color: #f9f9f9;
  border-radius: 12px 12px 0 0;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}

::v-deep .logout-confirm .el-message-box__title {
  color: #333;
  font-weight: bold;
}

::v-deep .logout-confirm .el-message-box__content {
  padding: 25px 20px;
}

/* Responsive design */
@media (max-width: 1200px) {
  div[style*="max-width: 1200px"] {
    padding: 0 15px;
  }

  div[style*="min-width: 180px"] {
    min-width: 160px;
    margin-right: 15px;
  }

  ::v-deep .el-menu--horizontal > .el-menu-item {
    padding: 0 10px;
    font-size: 13px;
  }
}

@media (max-width: 992px) {
  div[style*="display: flex; align-items: center; height: 100%"] {
    padding: 0 10px;
  }

  div[style*="min-width: 180px"] {
    min-width: 140px;
    margin-right: 10px;
  }

  div[style*="min-width: auto"] {
    gap: 10px;
  }

  div[style*="font-size: 20px; color: #ff6b6b"] {
    font-size: 18px;
  }

  ::v-deep .el-menu--horizontal > .el-menu-item {
    padding: 0 8px;
    font-size: 12px;
  }

  ::v-deep .el-menu--horizontal > .el-menu-item .el-icon {
    margin-right: 3px;
    font-size: 14px;
  }

  /* User info area adjustments */
  div[style*="display: flex; align-items: center; gap: 20px"] {
    gap: 12px;
  }

  img[style*="width: 42px; height: 42px"] {
    width: 36px;
    height: 36px;
  }

  div[style*="font-size: 14px; font-weight: 600"] {
    font-size: 13px;
    max-width: 80px;
  }

  div[style*="font-size: 12px"] {
    font-size: 11px;
  }

  div[style*="padding: 8px 12px"] {
    padding: 6px 10px;
  }

  span[style*="font-size: 13px"] {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  div[style*="display: flex; align-items: center; height: 100%"] {
    flex-wrap: wrap;
    height: auto;
    padding: 10px;
  }

  div[style*="min-width: 180px"] {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
    justify-content: center;
  }

  div[style*="flex: 1; overflow: hidden"] {
    width: 100%;
    order: 3;
    margin-top: 10px;
  }

  div[style*="min-width: auto"] {
    width: 100%;
    justify-content: center;
    margin-left: 0;
    order: 2;
    gap: 15px;
  }

  .el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 50px;
  }

  /* Mobile user info adjustments */
  div[style*="display: flex; align-items: center; gap: 20px"] {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }

  div[style*="position: relative; cursor: pointer"] {
    order: 1;
  }

  div[style*="cursor: pointer; min-width: 0"] {
    order: 2;
    text-align: center;
  }

  .el-dropdown[style*="cursor: pointer"] {
    order: 3;
    width: 100%;
    justify-content: center;
    display: flex;
  }

  div[style*="display: inline-flex; align-items: center"] {
    width: auto;
  }
}

/* Animation effects */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.el-menu--horizontal {
  animation: fadeIn 0.5s ease;
}

/* Scrollbar styling */
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

/* User avatar hover effect */
img[style*="width: 42px; height: 42px"]:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 12px rgba(255, 107, 107, 0.3);
}

/* Personal center button hover effect */
div[style*="display: inline-flex; align-items: center; padding: 8px 12px"]:hover {
  background-color: #fff5f5 !important;
  border-color: #ffb6b6 !important;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.1);
}

/* Nickname hover effect */
div[style*="cursor: pointer; min-width: 0"]:hover > div:first-child {
  color: #ff6b6b;
}
</style>
