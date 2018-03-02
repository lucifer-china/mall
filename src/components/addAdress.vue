<template>
  <div>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">管理收货地址</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-xs-12 mb10">
              <input type="text" class="form-control" placeholder="收货人姓名" v-model="userAdress.name">
            </div>
            <div class="col-xs-12 mb10">
              <input type="text" class="form-control" placeholder="手机号" v-model="userAdress.phone">
            </div>
            <div class="col-xs-3 mb10">
              <input type="text" class="form-control" placeholder="区号（可选）" v-model="userAdress.areaCode">
            </div>
            <div class="col-xs-9 mb10">
              <input type="text" class="form-control" placeholder="固定电话（可选）" v-model="userAdress.landLine">
            </div>
            <div class="col-xs-12 mb10">
              <select class="form-control" v-model="userAdress.provinceId">
                <option v-for="province,index in provinceList" :value="province.area_id">{{province.area_name}}</option>
              </select>
            </div>
            <div class="col-xs-6 mb10">
              <select class="form-control" v-model="userAdress.cityId">
                <option v-for="city,index in citychoose" :value="city.area_id">{{city.area_name}}</option>
              </select>
            </div>
            <div class="col-xs-6 mb10">
              <select class="form-control" v-model="userAdress.countyId">
                <option v-for="county,index in countyChoose" :value="county.area_id">{{county.area_name}}</option>
              </select>
            </div>
            <div class="col-xs-12 mb10">
              <input type="text" class="form-control" placeholder="请填写详细地址" v-model="userAdress.add">
            </div>
            <div class="col-xs-12 mb10">
              <label class="checkbox-inline" >
                <b class="de-check" :class="{on:userAdress.default}" @click="changedefault()"></b> 设置为默认地址
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" @click="submit()">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import provinceList from '../lib/addList'
  export default {
    data () {
      return {
        // 获取存储省份城市数据
        provinceList,
        userAdress: {
          'name': '',
          'phone': '',
          'areaCode': '',
          'landLine': '',
          'provinceId': '',
          'province': '',
          'cityId': '',
          'city': '',
          'countyId': '',
          'county': '',
          'add': '',
          'default': true
        }
      }
    },
    watch: {
      'userAdress.countyId' () {
        this.countyChoose.forEach((item, index) => {
          if (item.area_id === this.userAdress.cityId) {
            this.userAdress.county = item.area_name
            return false
          }
        })
      }
    },
    computed: {
      // 根据省份联动选择城市
      citychoose () {
        let cityList = []
        this.provinceList.forEach((item, index) => {
          if (item.area_id === this.userAdress.provinceId) {
            this.userAdress.province = item.area_name
            cityList = item.city_list
            return false
          }
        })
        return cityList
      },
      // 根据城市联动选择区县
      countyChoose () {
        let countychoose = []
        this.citychoose.forEach((item, index) => {
          if (item.area_id === this.userAdress.cityId) {
            countychoose = item.county_list
            this.userAdress.city = item.area_name
            return false
          }
        })
        return countychoose
      }
    },
    methods: {
      // 是否设置默认地址
      changedefault () {
        this.userAdress.default = !this.userAdress.default
      },
      // 保存数据
      submit () {
        this.$store.commit('submitUser', this.userAdress)
      }
    }
  }
</script>

<style>

</style>
