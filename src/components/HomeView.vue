<template>
<div class="container-fluid">
    <div class="row">
            <div class="col-md-5">
                  <div class="panel panel-default">
                    <div class="panel-heading">Form Halaman</div>
                    <div class="panel-body">
                        <form v-on:submit.prevent="addMahasiswa"> 
                          <div class="form-group">
                              <input required class="form-control" type="text" name="nim" placeholder="Nim Mahasiswa" v-model="mahasiswa.nim">
                          </div>
                          <div class="form-group">
                              <input required class="form-control" type="text" name="name" placeholder="Nama Mahasiswa" v-model="mahasiswa.name">
                          </div>
                          <div class="form-group">
                              <input required class="form-control" type="text" name="phone" placeholder="Telepon Mahasiswa" v-model="mahasiswa.phone">
                          </div>
                          <div class="form-group">
                              <textarea required class="form-control" type="text" name="address" placeholder="Alamat Mahasiswa" v-model="mahasiswa.address"></textarea>
                          </div>
                          <button class="btn btn-primary" type="submit">Simpan</button>
                      </form>
                      <!-- <div class="text-right">
                        <button @click="test()" class="btn btn-warning">Cancel</button>
                        <button class="btn btn-info" >Update</button>
                      </div> -->
                    </div>
                </div>
            </div>
          <div class="col-md-7">
            <div class="panel panel-default">
            <div class="panel-heading">List Halaman</div>
              <div class="panel-body">
                  <div class="form-group form-float">
                        <div id="imaginary_container">
                            <div class="input-group stylish-input-group">
                                <input type="text" class="form-control"  placeholder="Search" >
                                <span class="input-group-addon">
                                    <button type="submit">
                                        <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                              </div>
                       </div>
                  </div>
                <!-- table -->
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Nim</th>
                      <th>Nama</th>
                      <th>No Telepon</th>
                      <th>Alamat</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody v-if="mahasiswas.length" class="data-ada">
                    <tr v-for="mahasiswa in mahasiswas">
                      <td>{{mahasiswa.nim}}</td>
                      <td>{{mahasiswa.name}}</td>
                      <td>{{mahasiswa.phone}}</td>
                      <td>{{mahasiswa.address}}</td>
                      <td width="130px">
                        <button class="btn btn-xs btn-warning" >EDIT</button>
                        <button class="btn btn-xs btn-danger" ></icon>DELETE</button>
                      </td>
                    </tr>
                  </tbody>
                  <tbody class="data-tidak-ada" v-else>
                    <tr>
                      <td colspan="5" class="text-center">Tidak Ada Data</td>
                    </tr>
                  </tbody>
                </table>
                  <paginate
                          :page-count="perpage"
                          :page-range="2"
                          :margin-pages="1"
                          :click-handler="getMahasiswas"
                          :prev-text="'Prev'"
                          :next-text="'Next'"
                          :container-class="'pagination'"
                          :page-class="'page-item'">
                  </paginate>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import vue from 'vue'
export default {
  data(){
    return{
      perpage:{},
      mahasiswas: [],
      mahasiswa: {}
    }
  },
  watch: {
            '$route': 'getMahasiswas'
        },
  mounted() {
      //do something after mounting vue instance
      var app = this;
      app.getMahasiswas();
  },
  methods: {
    getMahasiswas(page)
    {
      var vm = this;
      if (typeof page === 'undefined'){
            page = 1;
      }
      axios.get(`https://testing.futnet.id/api/mahasiswa`+'?page='+page)
      .then(function(response){
        vm.mahasiswas = response.data.data;
        vm.perpage = response.data.last_page
      })
      .catch(function (response){
          console.log(response);
          alert("Could not load halaman");
      });
    },
    addMahasiswa()
    {
      let uri = 'https://testing.futnet.id/api/mahasiswa';
      var vm = this;
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      axios.post(uri,vm.mahasiswa).then(function(response){
        let obj = {
            title: 'Sukses !',
            message: 'Sukses Menambahkan Mahasiswa',
            type: 'success'
        }
        console.log('open simplert with obj : ', obj)
        vm.$Simplert.open(obj)
        vm.getMahasiswas();
      })
      .catch(function (response){
          let obj = {
              title: 'Gagal !',
              message: 'Daftar Mahasiswa Tidak Bisa Ditampilkan',
              type: 'error'
          }
          console.log('open simplert with obj : ', obj)
          vm.$Simplert.open(obj)
          console.log(response);
          alert("Could not add mahasiswa");
      });
    },
  }
}
</script>
<style scoped>
  .list {
    width: 100%;
    padding: 0;
  }
</style>