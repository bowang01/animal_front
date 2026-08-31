<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="Enter adopter name" suffix-icon="el-icon-search" v-model="name"></el-input>
<!--      <el-input style="width: 200px" placeholder="Please enter" suffix-icon="el-icon-message" class="ml-5" v-model="email"></el-input>-->
<!--      <el-input style="width: 200px" placeholder="Please enter" suffix-icon="el-icon-position" class="ml-5" v-model="address"></el-input>-->
      <el-button class="ml-5" type="primary" @click="load">Search</el-button>
      <el-button type="warning" @click="reset">Reset</el-button>
    </div>

    <div style="margin: 10px 0">
<!--      <el-button type="primary" @click="handleAdd">Add <i class="el-icon-circle-plus-outline"></i></el-button>-->
      <el-popconfirm
          class="ml-5"
          confirm-button-text='Confirm'
          cancel-button-text='Maybe later'
          icon="el-icon-info"
          icon-color="red"
          title="Are you sure you want to delete the selected items?"
          @confirm="delBatch"
      >
        <el-button type="danger" slot="reference">Batch Delete <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
      <!-- <el-upload action="http://localhost:9090/applcation/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
        <el-button type="primary" class="ml-5">Import <i class="el-icon-bottom"></i></el-button>
      </el-upload>
      <el-button type="primary" @click="exp" class="ml-5">Export <i class="el-icon-top"></i></el-button> -->
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
      <el-table-column prop="animal.nickname" label="Animal"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="sex" label="Gender"></el-table-column>
      <el-table-column prop="age" label="Age"></el-table-column>
      <el-table-column prop="experience" label="Pet Experience"></el-table-column>
<!--      <el-table-column prop="pet" label="Pet"></el-table-column>-->
      <el-table-column prop="phone" label="Contact"></el-table-column>
      <el-table-column prop="married" label="Marital Status"></el-table-column>
      <el-table-column prop="income" label="Income"></el-table-column>
      <el-table-column prop="profession" label="Occupation"></el-table-column>
      <el-table-column prop="address" label="Address"></el-table-column>
      <el-table-column prop="reason" label="Adoption Reason"></el-table-column>
      <el-table-column prop="state" label="Status">
        <template v-slot="scope">
          <span style="color: green" v-if="scope.row.state === 'Approved'">Approved</span>
          <span style="color: red" v-if="scope.row.state === 'Rejected'">Rejected</span>
          <span style="color: #1E90FF" v-if="scope.row.state === 'Pending review'">Pending review</span>
        </template>
      </el-table-column>


      <el-table-column label="Actions"  width="280" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="changeState(scope.row, 'Approved')" :disabled="scope.row.state !== 'Pending review'">Approve <i class="el-icon-check"></i></el-button>
          <el-button type="primary" @click="handleEdit(scope.row)"  :disabled="scope.row.state !== 'Pending review'">Edit <i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='Confirm'
              cancel-button-text='Maybe later'
              icon="el-icon-info"
              icon-color="red"
              title="Are you sure you want to delete this?"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference">Delete <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="Information" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
      <el-form label-width="100px" size="small" style="width: 90%">
        <el-form-item label="Name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Gender">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Pet Experience">
          <el-input v-model="form.experience" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Pet">
          <el-input v-model="form.pet" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Contact">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Marital Status">
          <el-input v-model="form.married" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Income">
          <el-input v-model="form.income" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Occupation">
          <el-input v-model="form.profession" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Adoption Reason">
          <el-input v-model="form.reason" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Status">
          <el-input v-model="form.state" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Animal ID">
          <el-input v-model="form.animalId" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Applcation",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      name: "",
      form: {},
      dialogFormVisible: false,
      multipleSelection: [],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    changeState(row, state) {
      this.request.post("/applcation/state/" + row.id + "/" + state).then(res => {
        this.$message.success("Operation successful")
        this.load()
      })
    },
    load() {
      this.request.get("/applcation/page", {
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
      this.request.delete("/applcation/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("Deleted successfully")
          this.load()
        } else {
          this.$message.error("Delete failed")
        }
      })
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
      let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
      this.request.post("/applcation/del/batch", ids).then(res => {
        if (res.code === '200') {
          this.$message.success("Batch deleted successfully")
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
      window.open("http://localhost:9090/applcation/export")
    },
    handleExcelImportSuccess() {
      this.$message.success("Imported successfully")
      this.load()
    }
  }
}
</script>


<style>
.headerBg {
  background: #eee!important;
}
</style>
