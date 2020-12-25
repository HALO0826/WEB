<template>
  <div class="pro">
    <img v-lazy="pro.thumb_url" class="pro_img">
    <div class="pro_text">
      <p><em>{{ pro.price / 100 | moneyFormat }}</em></p>
      <p>{{ pro.short_name }}</p>
    </div>
    <div class="add_btn">
      <a @click="goDetail(pro.goods_id)"><el-button type="danger">查看详情</el-button></a>
    </div>
  </div>
</template>

<script>

export default {
  name: "ProductItemWaterfall",
  props: {
    pro: {
      type: Object,
      required: true
    }
  },
  methods: {
    goDetail(id){
      this.$router.replace('/goods/' + id);
    },
  }
}
</script>

<style scoped>
.pro{
  float: left;
  position: relative;
  margin-right: 20px;
  margin-top: 20px;
  height: 100%;
  border-style: outset;
  border-width: 2px;
  border-color: gray;
  padding: 30px;
  display: block;
}
.pro>.pro_img{
  margin: 20px;
  max-width: 100px;
  max-height: 100px;
  display: flex;
}
.pro>.pro_text{
  margin-top: 30px;
  max-height: 130px;
  max-width: 200px;
  line-height: 25px;
}
.pro_text>p{
  margin-bottom: 10px;
}
.pro_text>p:first-child{
  color: red;
  font-weight: 900;
}
.pro_text>p:nth-child(2){
  font-size: 13px;
}
.pro_text>p:nth-child(3){
  font-size: 12px;
  color: #999;
}
.pro>.add_btn{
  bottom: 15px;
  right: 20px;
}
.add_btn>a button{
  padding: 0;
  width: 90px;
  height: 30px;
  outline: none;

  justify-content: center;
  align-items: center;
}
</style>
