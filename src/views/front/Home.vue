<template>
  <div style="padding-bottom: 20px">
    <!-- Carousel section -->
    <div style="margin: 10px 0">
      <div style="width: 100%; display: flex">
        <div style="width:100%">
          <el-carousel height="400px" indicator-position="outside" arrow="always">
            <el-carousel-item>
              <img src="../../assets/b1.jpg" alt="" style="width: 100%;height: 100%; object-fit: cover; border-radius: 12px">
            </el-carousel-item>
            <el-carousel-item>
              <img src="../../assets/b2.jpg" alt="" style="width: 100%;height: 100%; object-fit: cover; border-radius: 12px">
            </el-carousel-item>
            <el-carousel-item>
              <img src="../../assets/b3.jpg" alt="" style="width: 100%;height: 100%; object-fit: cover; border-radius: 12px">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>

    <div style="display: flex; gap: 20px; margin-bottom: 20px">
      <!-- Notice section -->
      <div style="flex: 1; padding: 20px; background-color: #fff; border-radius: 12px; border: 1px solid #e9f4eb; box-shadow: 0 2px 8px rgba(46, 139, 87, 0.08)">
        <div style="padding: 10px 0; font-size: 22px; color: #2e8b57; border-bottom: 2px solid #2e8b57; margin-bottom: 15px; display: flex; align-items: center">
          <i class="el-icon-message-solid" style="margin-right: 10px; color: #2e8b57"></i>
          <span style="font-weight: 600">Adoption Notices</span>
        </div>
        <el-collapse v-model="active" accordion>
          <el-collapse-item :name="index + ''" v-for="(item, index) in notices" :key="index">
            <template slot="title">
              <div style="display: flex; align-items: center; width: 100%">
                <i class="el-icon-news" style="color: #2e8b57; margin-right: 10px; font-size: 16px"></i>
                <span style="font-size: 16px; color: #333; font-weight: 500; flex: 1">{{ item.name }}</span>
                <el-tag size="mini" type="success" style="margin-right: 10px">Notice</el-tag>
                <i class="el-icon-arrow-down" style="color: #999; font-size: 12px"></i>
              </div>
            </template>
            <div style="color: #555; line-height: 1.7; padding: 15px; background-color: #f9fbf9; border-radius: 8px; border-left: 4px solid #2e8b57; font-size: 14px">
              {{ item.content }}
            </div>
          </el-collapse-item>
        </el-collapse>

        <div v-if="notices.length === 0" style="text-align: center; padding: 30px; color: #999">
          <i class="el-icon-bell" style="font-size: 48px; color: #e0e0e0; margin-bottom: 10px"></i>
          <div>No notices yet</div>
        </div>
      </div>


    </div>

    <!-- Pets awaiting adoption -->
    <div style="margin: 10px 0">
      <div style="padding: 15px 20px; background-color: #fff; border-radius: 12px; color: #ff6b6b; border-bottom: 2px solid #ff6b6b; margin-bottom: 15px; display: flex; align-items: center; justify-content: space-between">
        <div style="display: flex; align-items: center; font-size: 22px">
          <i class="el-icon-star-off" style="margin-right: 10px"></i>
          <span style="font-weight: 600">Pets Awaiting Adoption</span>
        </div>
        <div style="font-size: 14px; color: #999; display: flex; align-items: center">
          <i class="el-icon-info" style="margin-right: 5px"></i>
          {{ total }} pets awaiting adoption
        </div>
      </div>

      <!-- Grid layout -->
      <div v-if="tableData.length > 0" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin-bottom: 20px">
        <el-card v-for="item in tableData" :key="item.id"
                 style="border-radius: 12px; border: 1px solid #ffe8e8; cursor: pointer; transition: all 0.3s ease"
                 @click.native="$router.push('/front/homeDetail?id=' + item.id)"
                 shadow="hover">
          <div style="position: relative;">
            <!-- Status badge -->
            <div style="position: absolute; top: 10px; left: 10px; z-index: 2">
              <el-tag size="small" type="danger" style="border-radius: 10px; font-weight: bold">
                Awaiting adoption
              </el-tag>
            </div>

            <!-- Pet image -->
            <div style="width: 100%; height: 200px; overflow: hidden; border-radius: 8px 8px 0 0; margin-bottom: 15px">
              <img :src="item.img" alt="" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease">
            </div>

            <!-- Pet basic info -->
            <div style="padding: 0 10px 15px 10px">
              <div style="display: flex; align-items: center; margin-bottom: 12px">
                <span style="font-size: 20px; color: #ff6b6b; font-weight: bold; flex: 1">{{ item.nickname }}</span>
                <div style="display: flex; gap: 8px">
                  <el-tag size="mini" :type="item.sex === 'Male' ? 'primary' : 'danger'" style="border-radius: 10px">
                    <i class="el-icon-male" v-if="item.sex === 'Male'"></i>
                    <i class="el-icon-female" v-else></i>
                    {{ item.sex }}
                  </el-tag>
                  <el-tag size="mini" type="info" style="border-radius: 10px">
                    <i class="el-icon-time"></i>
                    {{ item.age }}
                  </el-tag>
                </div>
              </div>

              <!-- Pet details -->
              <div style="background-color: #f9f9f9; border-radius: 8px; padding: 12px; margin-bottom: 15px">
                <div style="display: flex; align-items: center; margin-bottom: 8px; font-size: 13px">
                  <i class="el-icon-s-grid" style="color: #2e8b57; margin-right: 8px; width: 16px"></i>
                  <span style="color: #666; margin-right: 8px">Type:</span>
                  <span style="color: #333; font-weight: 500">{{ item.type }}</span>
                </div>

                <div style="display: flex; align-items: center; margin-bottom: 8px; font-size: 13px">
                  <i class="el-icon-location-outline" style="color: #ff9500; margin-right: 8px; width: 16px"></i>
                  <span style="color: #666; margin-right: 8px">Location:</span>
                  <span style="color: #333; font-weight: 500">{{ item.address }}</span>
                </div>

                <div style="display: flex; align-items: center; margin-bottom: 8px; font-size: 13px">
                  <i class="el-icon-first-aid-kit" style="color: #ff6b6b; margin-right: 8px; width: 16px"></i>
                  <span style="color: #666; margin-right: 8px">Status:</span>
                  <span style="color: #333; font-weight: 500">{{ item.status }}</span>
                </div>

                <div style="display: flex; align-items: flex-start; font-size: 13px">
                  <i class="el-icon-document" style="color: #1890ff; margin-right: 8px; width: 16px; margin-top: 2px"></i>
                  <div>
                    <span style="color: #666; margin-right: 8px">Description:</span>
                    <span style="color: #333; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5">
                      {{ item.information }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- View details button -->
              <el-button type="primary" size="small" style="width: 100%; border-radius: 8px; background-color: #ff6b6b; border-color: #ff6b6b">
                <i class="el-icon-view" style="margin-right: 5px"></i>
                View Details & Adopt
              </el-button>
            </div>
          </div>
        </el-card>
      </div>

      <!-- Empty state -->
      <div v-if="tableData.length === 0" style="text-align: center; padding: 60px; background-color: #fff; border-radius: 12px; margin: 10px 0; border: 1px solid #f0f0f0">
        <i class="el-icon-s-promotion" style="font-size: 60px; color: #e0e0e0; margin-bottom: 20px"></i>
        <div style="font-size: 18px; color: #999; margin-bottom: 10px">No pets awaiting adoption</div>
        <div style="color: #aaa; margin-bottom: 20px">More adorable pets are waiting for a loving home...</div>
        <el-button type="primary" size="medium" style="background-color: #ff6b6b; border-color: #ff6b6b; border-radius: 8px">
          <i class="el-icon-refresh" style="margin-right: 5px"></i>
          Refresh Page
        </el-button>
      </div>
    </div>

    <!-- Pagination -->
    <div style="padding: 20px; background-color: #fff; border-radius: 12px; margin-top: 20px; border: 1px solid #e8f4e8; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)">
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
      pageSize: 8, // Set to 8 for grid layout
      name: "",
      notices: [],
      active: '0',
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/animal/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })

      this.request.get("/notice/front").then(res => {
        this.notices = res.data
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
/* Carousel styles */
.el-carousel__item {
  border-radius: 12px;
  overflow: hidden;
}

.el-carousel__indicator {
  padding: 12px 4px;
}

.el-carousel__button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
}

.el-carousel__indicator.is-active .el-carousel__button {
  background-color: #ff6b6b;
}

/* Card hover effect */
.el-card:hover {
  transform: translateY(-5px);
  transition: all 0.3s ease;
  box-shadow: 0 6px 16px rgba(255, 107, 107, 0.15) !important;
  border-color: #ffb6b6;
}

.el-card:hover img {
  transform: scale(1.05);
}

/* Collapse panel styles */
.el-collapse {
  border: none;
}

.el-collapse-item__header {
  font-size: 16px;
  padding: 15px 10px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #e9f4eb;
  transition: all 0.3s;
}

.el-collapse-item__header:hover {
  background-color: #f9fbf9;
  border-color: #2e8b57;
}

.el-collapse-item__wrap {
  border-bottom: none;
  background-color: transparent;
}

.el-collapse-item__content {
  padding: 0;
}

/* Pagination styles */
.el-pagination {
  justify-content: center;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ff6b6b;
  border-radius: 6px;
}

.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #ff6b6b;
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev {
  background-color: #f5f5f5;
  border-radius: 6px;
  margin: 0 4px;
}

.el-pagination.is-background .btn-next:hover,
.el-pagination.is-background .btn-prev:hover {
  color: #ff6b6b;
  background-color: #ffeaea;
}

.el-pagination__total {
  color: #666;
}

.el-pagination__jump {
  color: #666;
}

/* Tag styles */
.el-tag {
  border: none;
  font-weight: 500;
}

.el-tag--primary {
  background-color: #e6f7ff;
  color: #1890ff;
}

.el-tag--danger {
  background-color: #ffeaea;
  color: #ff6b6b;
}

.el-tag--success {
  background-color: #e9f7ef;
  color: #2e8b57;
}

.el-tag--info {
  background-color: #f5f5f5;
  color: #666;
}

/* Button styles */
.el-button--primary {
  background-color: #ff6b6b;
  border-color: #ff6b6b;
}

.el-button--primary:hover {
  background-color: #ff5252;
  border-color: #ff5252;
}

.el-button--primary:active {
  background-color: #e64545;
  border-color: #e64545;
}

/* Stat card styles */
[style*="background-color: #fff5f5"]:hover,
[style*="background-color: #f0f9ff"]:hover,
[style*="background-color: #f9f9f9"]:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

/* Responsive grid layout */
@media (max-width: 1200px) {
  .el-carousel {
    height: 350px !important;
  }
}

@media (max-width: 992px) {
  .el-carousel {
    height: 300px !important;
  }

  [style*="grid-template-columns"] {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
  }
}

@media (max-width: 768px) {
  .el-carousel {
    height: 250px !important;
  }

  [style*="grid-template-columns"] {
    grid-template-columns: 1fr !important;
  }

  [style*="display: flex; gap: 20px"] {
    flex-direction: column !important;
  }

  [style*="width: 280px"] {
    width: 100% !important;
  }
}
</style>
