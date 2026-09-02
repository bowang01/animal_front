<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="Enter name" suffix-icon="el-icon-search" v-model="name"></el-input>
<!--      <el-input style="width: 200px" placeholder="Please enter" suffix-icon="el-icon-message" class="ml-5" v-model="email"></el-input>-->
<!--      <el-input style="width: 200px" placeholder="Please enter" suffix-icon="el-icon-position" class="ml-5" v-model="address"></el-input>-->
      <el-button class="ml-5" type="primary" @click="load">Search</el-button>
      <el-button type="warning" @click="reset">Reset</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">Add <i class="el-icon-circle-plus-outline"></i></el-button>
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
      <!-- <el-upload :action="$apiBase + '/sterilization/import'" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
        <el-button type="primary" class="ml-5">Import <i class="el-icon-bottom"></i></el-button>
      </el-upload>
      <el-button type="primary" @click="exp" class="ml-5">Export <i class="el-icon-top"></i></el-button> -->
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
<!--      <el-table-column prop="animalId" label="Stray Animal ID"></el-table-column>-->
      <el-table-column prop="animalName" label="Stray Animal"></el-table-column>
      <el-table-column prop="catch1" label="Capture Status"></el-table-column>
      <el-table-column prop="sterilization" label="Sterilization Status"></el-table-column>
      <el-table-column prop="release1" label="Release Status"></el-table-column>
      <el-table-column prop="vaccine" label="Vaccine Status"></el-table-column>

      <el-table-column label="Actions"  width="180" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">Edit <i class="el-icon-edit"></i></el-button>
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
        <el-form-item label="Stray Animal">
          <el-select clearable v-model="form.animalId" placeholder="Please select" @change="select">
            <el-option v-for="item in animals" :key="item.id" :label="item.nickname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Vaccine Status">
          <el-input v-model="form.vaccine" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="Sterilization Status">
          <el-input v-model="form.sterilization" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="Capture Status">
          <el-radio v-model="form.catch1" label="Not captured">Not captured</el-radio>
          <el-radio v-model="form.catch1" label="Captured">Captured</el-radio>
        </el-form-item>
        <el-form-item label="Release Status">
          <el-radio v-model="form.release1" label="Not released">Not released</el-radio>
          <el-radio v-model="form.release1" label="Released">Released</el-radio>
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
  name: "Sterilization",
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
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      animals: []
    }
  },
  created() {
    this.load()

    this.request.get("/animal").then(res => {
      this.animals = res.data
    })
  },
  methods: {
    select() {
      let data= this.animals.find(v => v.id === this.form.animalId)
      this.form.sterilization = data.sterilization
      this.form.vaccine = data.vaccine
      this.form.animalName = data.nickname
    },
    load() {
      this.request.get("/sterilization/page", {
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
      this.request.post("/sterilization", this.form).then(res => {
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
      this.request.delete("/sterilization/" + id).then(res => {
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
      this.request.post("/sterilization/del/batch", ids).then(res => {
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
      window.open(this.$apiBase + "/sterilization/export")
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
