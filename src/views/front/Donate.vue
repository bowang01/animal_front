<template>
  <div style="min-height: calc(100vh - 60px); padding: 20px; background-color: #f9f9f9">
    <!-- Page title -->
    <div style="text-align: center; margin-bottom: 40px">
      <div style="display: inline-flex; align-items: center; background-color: #ff6b6b; padding: 10px 30px; border-radius: 25px; margin-bottom: 20px">
        <i class="el-icon-present" style="color: white; font-size: 24px; margin-right: 10px"></i>
        <span style="color: white; font-size: 24px; font-weight: bold">Loving Donations</span>
      </div>
      <div style="color: #666; font-size: 16px">Every donation you make is a ray of hope for stray animals</div>
    </div>

    <!-- Main donation content -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; margin-bottom: 40px">
      <!-- In-kind donations -->
      <el-card style="border-radius: 15px; border: 1px solid #e8f4e8; box-shadow: 0 4px 12px rgba(46, 139, 87, 0.1)">
        <div style="text-align: center; padding: 20px">
          <div style="width: 80px; height: 80px; background-color: #2e8b57; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center">
            <i class="el-icon-shopping-bag-1" style="color: white; font-size: 36px"></i>
          </div>
          <h3 style="color: #2e8b57; margin-bottom: 15px; font-size: 20px">In-Kind Donations</h3>
          <div style="color: #666; line-height: 1.6; margin-bottom: 20px; text-align: left">
            <div style="display: flex; align-items: center; margin-bottom: 10px">
              <i class="el-icon-check" style="color: #2e8b57; margin-right: 8px"></i>
              <span>Pet food, canned food, treats</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 10px">
              <i class="el-icon-check" style="color: #2e8b57; margin-right: 8px"></i>
              <span>Cat litter, pee pads, bedding</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 10px">
              <i class="el-icon-check" style="color: #2e8b57; margin-right: 8px"></i>
              <span>Toys, food bowls, water bowls</span>
            </div>
            <div style="display: flex; align-items: center">
              <i class="el-icon-check" style="color: #2e8b57; margin-right: 8px"></i>
              <span>Cleaning supplies, medical supplies</span>
            </div>
          </div>
          <div style="background-color: #f9fbf9; border-radius: 10px; padding: 15px; margin-top: 20px">
            <div style="color: #666; font-size: 14px; line-height: 1.6">
              <i class="el-icon-info" style="color: #2e8b57; margin-right: 5px"></i>
              Please ensure donated items are within their expiration date and in good condition
            </div>
          </div>
        </div>
      </el-card>

      <!-- Monetary donations -->
      <el-card style="border-radius: 15px; border: 1px solid #ffe8e8; box-shadow: 0 4px 12px rgba(255, 107, 107, 0.1)">
        <div style="text-align: center; padding: 20px">
          <div style="width: 80px; height: 80px; background-color: #ff6b6b; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center">
            <i class="el-icon-money" style="color: white; font-size: 36px"></i>
          </div>
          <h3 style="color: #ff6b6b; margin-bottom: 15px; font-size: 20px">Monetary Donations</h3>
          <div style="color: #666; line-height: 1.6; margin-bottom: 20px; text-align: left">
            <div style="display: flex; align-items: center; margin-bottom: 10px">
              <i class="el-icon-coin" style="color: #ff6b6b; margin-right: 8px"></i>
              <span>Medical rescue costs</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 10px">
              <i class="el-icon-coin" style="color: #ff6b6b; margin-right: 8px"></i>
              <span>Daily feeding expenses</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 10px">
              <i class="el-icon-coin" style="color: #ff6b6b; margin-right: 8px"></i>
              <span>Shelter operations and maintenance</span>
            </div>
            <div style="display: flex; align-items: center">
              <i class="el-icon-coin" style="color: #ff6b6b; margin-right: 8px"></i>
              <span>Adoption event hosting</span>
            </div>
          </div>
          <div style="background-color: #fff5f5; border-radius: 10px; padding: 15px; margin-top: 20px">
            <div style="color: #666; font-size: 14px; line-height: 1.6">
              <i class="el-icon-info" style="color: #ff6b6b; margin-right: 5px"></i>
              All donation income and expenses are published regularly for full transparency
            </div>
          </div>
        </div>
      </el-card>

      <!-- Volunteer service -->
      <el-card style="border-radius: 15px; border: 1px solid #e6f7ff; box-shadow: 0 4px 12px rgba(24, 144, 255, 0.1)">
        <div style="text-align: center; padding: 20px">
          <div style="width: 80px; height: 80px; background-color: #1890ff; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center">
            <i class="el-icon-user" style="color: white; font-size: 36px"></i>
          </div>
          <h3 style="color: #1890ff; margin-bottom: 15px; font-size: 20px">Volunteer Service</h3>
          <div style="color: #666; line-height: 1.6; margin-bottom: 20px; text-align: left">
            <div style="display: flex; align-items: center; margin-bottom: 10px">
              <i class="el-icon-s-opportunity" style="color: #1890ff; margin-right: 8px"></i>
              <span>Daily animal care</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 10px">
              <i class="el-icon-s-opportunity" style="color: #1890ff; margin-right: 8px"></i>
              <span>Facility cleaning and hygiene</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 10px">
              <i class="el-icon-s-opportunity" style="color: #1890ff; margin-right: 8px"></i>
              <span>Event promotion assistance</span>
            </div>
            <div style="display: flex; align-items: center">
              <i class="el-icon-s-opportunity" style="color: #1890ff; margin-right: 8px"></i>
              <span>Temporary foster homes</span>
            </div>
          </div>
          <div style="background-color: #f0f9ff; border-radius: 10px; padding: 15px; margin-top: 20px">
            <div style="color: #666; font-size: 14px; line-height: 1.6">
              <i class="el-icon-info" style="color: #1890ff; margin-right: 5px"></i>
              Volunteers receive regular training and service certificates
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- Contact information card -->
    <el-card style="border-radius: 15px; background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%); margin-bottom: 30px">
      <div style="text-align: center; padding: 30px">
        <div style="color: white; font-size: 28px; font-weight: bold; margin-bottom: 10px">Donation Contact Information</div>
        <div style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin-bottom: 25px">Your kindness is their warmest hope</div>

        <div style="display: inline-flex; flex-direction: column; align-items: center; background-color: white; padding: 25px 40px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1)">
          <div style="display: flex; align-items: center; margin-bottom: 20px">
            <div style="width: 60px; height: 60px; background-color: #2e8b57; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px">
              <i class="el-icon-user-solid" style="color: white; font-size: 28px"></i>
            </div>
            <div style="text-align: left">
              <div style="color: #333; font-size: 18px; font-weight: bold">Contact: Zhang San</div>
              <div style="color: #666; font-size: 14px">Pet Adoption System Donation Coordinator</div>
            </div>
          </div>

          <div style="width: 100%; border-bottom: 1px dashed #eee; margin-bottom: 20px"></div>

          <div style="display: flex; align-items: center; margin-bottom: 20px; width: 100%">
            <div style="width: 24px; margin-right: 15px">
              <i class="el-icon-phone" style="color: #ff6b6b; font-size: 20px"></i>
            </div>
            <div style="flex: 1; text-align: left">
              <div style="color: #333; font-size: 16px; font-weight: bold">Phone</div>
              <div style="color: #666; font-size: 18px; font-weight: bold; letter-spacing: 1px">010-65998877</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; width: 100%">
            <div style="width: 24px; margin-right: 15px">
              <i class="el-icon-message" style="color: #1890ff; font-size: 20px"></i>
            </div>
            <div style="flex: 1; text-align: left">
              <div style="color: #333; font-size: 16px; font-weight: bold">Email</div>
              <div style="color: #666; font-size: 16px">donate@petlove.org</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- Meaning of donations -->
    <div style="background-color: white; border-radius: 15px; padding: 30px; margin-bottom: 30px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05)">
      <div style="text-align: center; margin-bottom: 30px">
        <div style="display: inline-flex; align-items: center">
          <div style="width: 40px; height: 2px; background-color: #ff6b6b; margin-right: 15px"></div>
          <span style="color: #333; font-size: 22px; font-weight: bold">What Every Donation Means</span>
          <div style="width: 40px; height: 2px; background-color: #ff6b6b; margin-left: 15px"></div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px">
        <div style="text-align: center; padding: 20px">
          <div style="width: 60px; height: 60px; background-color: #fff5f5; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center">
            <i class="el-icon-first-aid-kit" style="color: #ff6b6b; font-size: 28px"></i>
          </div>
          <div style="color: #333; font-size: 18px; font-weight: bold; margin-bottom: 10px">Saving Lives</div>
          <div style="color: #666; line-height: 1.6">Help injured or sick stray animals receive timely medical care</div>
        </div>

        <div style="text-align: center; padding: 20px">
          <div style="width: 60px; height: 60px; background-color: #f0f9ff; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center">
            <i class="el-icon-knife-fork" style="color: #1890ff; font-size: 28px"></i>
          </div>
          <div style="color: #333; font-size: 18px; font-weight: bold; margin-bottom: 10px">Food & Care</div>
          <div style="color: #666; line-height: 1.6">Provide stray animals with enough food and water so they no longer go hungry</div>
        </div>

        <div style="text-align: center; padding: 20px">
          <div style="width: 60px; height: 60px; background-color: #e9f7ef; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center">
            <i class="el-icon-house" style="color: #2e8b57; font-size: 28px"></i>
          </div>
          <div style="color: #333; font-size: 18px; font-weight: bold; margin-bottom: 10px">Warm Shelter</div>
          <div style="color: #666; line-height: 1.6">Improve living conditions at the shelter so stray animals have a safe, warm home</div>
        </div>

        <div style="text-align: center; padding: 20px">
          <div style="width: 60px; height: 60px; background-color: #fff9f0; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center">
            <i class="el-icon-s-opportunity" style="color: #ff9500; font-size: 28px"></i>
          </div>
          <div style="color: #333; font-size: 18px; font-weight: bold; margin-bottom: 10px">Hope for the Future</div>
          <div style="color: #666; line-height: 1.6">Support adoption outreach and help more stray animals find forever homes</div>
        </div>
      </div>
    </div>

    <!-- Call to action -->
    <div style="text-align: center; padding: 40px; background-color: #2e8b57; border-radius: 15px">
      <div style="color: white; font-size: 24px; font-weight: bold; margin-bottom: 20px">Pass on the love, warm every little life</div>
      <div style="color: rgba(255, 255, 255, 0.9); font-size: 16px; line-height: 1.8; max-width: 800px; margin: 0 auto 30px">
        Every donation is a seed of love that takes root in the hearts of stray animals. Your kindness not only changes their lives, but also brings more warmth and goodness to the world. No matter how much you give, it is a gesture of respect and care for life.
      </div>
      <div style="display: inline-flex; align-items: center; background-color: white; padding: 8px 25px; border-radius: 25px">
        <i class="el-icon-heart" style="color: #ff6b6b; font-size: 18px; margin-right: 8px"></i>
        <span style="color: #2e8b57; font-size: 16px; font-weight: bold">Thank you for every loving donation</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Donate"
}
</script>

<style scoped>
/* Card hover effect */
.el-card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

/* Responsive design */
@media (max-width: 768px) {
  div[style*="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))"] {
    grid-template-columns: 1fr !important;
  }

  div[style*="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))"] {
    grid-template-columns: 1fr !important;
  }

  .el-card {
    margin-bottom: 20px;
  }

  div[style*="padding: 20px 100px"] {
    padding: 20px !important;
  }
}

/* Animation effects */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.el-card {
  animation: fadeIn 0.6s ease;
}
</style>
