<template>
  <div v-if="categoryList.length">
		<div id="container">
			<div class="product">
				<div class="pro_line">
					<h3 v-text="this.categoryList[this.currentCate-1].cate_name"></h3>

          <!--
					<el-dropdown @command="handleCommand">
					<span class="el-dropdown-link">
					更多类别<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(cate, index) in categoryList" :key="index" :command="index+1">{{ cate.cate_name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          -->

          <router-link to="/home" class="goHome">返回首页</router-link>
        </div>
        <div class="pro_show">

          <div class="container-water-fall">
          <!--<ProductItem v-for="(goods) in recommendshoplist" :key="goods.goods_id" :pro="goods"/>-->
          <waterfall :col='col' :itemWidth="itemWidth" :gutterWidth="gutterWidth" :data="recommendshoplist" @loadmore="loadmore(activeIndex)" @scroll="scroll">
            <template>
              <div v-for="(goods) in recommendshoplist" :key="goods.goodsId">
                <ProductItemWaterfall :pro="goods"/>
              </div>
            </template>
          </waterfall>

            <div id="footer">
              <ul class="pagination">
                <li><a class="pag_back" @click="getMore(activeIndex - 1)">«</a></li>
                <li><a class="pag_a" v-for="index in catePages[this.currentCate - 1]" :key="index" :class="{pag_active: activeIndex === index}" @click="getMore(index)">{{index}}</a></li>
                <li><a class="pag_go" @click="getMore(activeIndex + 1)">»</a></li>
              </ul>
            </div>


      </div>
        </div>
      </div>




  </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  //import ProductItem from '../../components/ProductItem/ProductItem'
  import ProductItemWaterfall from "@/components/ProductItem/ProductItemWaterfall";
  //import waterfall from "vue-waterfall2";

  export default {
    data(){
      return{
        activeIndex: 1,  // 当前页码
			currentCate: 1,  // 当前分类
			pageSize: 100,
        col:5,
        showItemNum:5,
      }
    },
    components: {
      ProductItemWaterfall,
    },
    computed: {
      ...mapState(['categoryList','userInfo','recommendshoplist']),
      catePages(){
        let arr = [];
        this.categoryList.forEach((cate)=>{
					let page = Math.ceil(cate.cate_counts / this.pageSize);
					arr.push(page);
        });
        return arr;
      },

      itemWidth() {
        return (334 * 0.5 * (document.documentElement.clientWidth / 375))
      },

      gutterWidth() {
        return (36 * 0.5 * (document.documentElement.clientWidth / 375))
      },
    },
    created() {
        this.currentCate = Number(this.$route.params.id);
        this.activeIndex = Number(this.$route.params.pageNo);
        // 请求分类数据
        this.$store.dispatch('reqCategory');
        // 请求当前页码的商品
        this.$store.dispatch('reqRecommendShopList', {
            category: this.currentCate,
            pageNo: this.activeIndex,
						count: this.pageSize
        });
        // 请求当前用户信息
        this.$store.dispatch('getUserInfo');
    },
    watch:{
      $route(){
        this.currentCate = Number(this.$route.params.id);
        this.activeIndex = Number(this.$route.params.pageNo);
         this.$store.dispatch('reqRecommendShopList', {
            category: this.currentCate,
						pageNo: this.activeIndex,
						count: this.pageSize
        });
			},
    },
    methods:{
      handleCommand(command) {
        this.$store.dispatch('reqRecommendShopList', {
          category: command,
          pageNo: 1,
          count: this.pageSize
        });
        this.$router.replace('/search/' + command + "/1");
        this.currentCate = command;
        this.activeIndex = 1;
      },
      goDetail(id){
        this.$router.replace('/goods/' + id);
      },
      getMore(index){
        if(index && index <= this.catePages[this.currentCate - 1]){
          this.$store.dispatch('reqRecommendShopList', {
            category: this.currentCate,
            pageNo: index,
          });
          this.activeIndex = index;
          this.$router.replace('/search/' + this.currentCate + "/" + this.activeIndex);

        }
      },
      scroll(scrollData) {
        console.log(scrollData)
      },
      switchCol(col) {
        this.col = col
        console.log(this.col)
      },
      loadmore(index) {

        //这里是当滑动到底部时，再次请求接口，并且传page，返回的数据给dataList赋值
        console.log(index)
      },
    },
  }
</script>

<style scoped>
#container{
	position: relative;
}
.product{
  margin-top: 5%;
  margin-left: 10%;
}
.product>.pro_line{
	margin-bottom: 20px;
	height: 50px;
	line-height: 50px;
	font-size: 26px;
    font-family: sans-serif;
    font-weight: normal;
    color: #222;
}
.pro_line>h3{
	display: inline-block;
}
.el-dropdown-link {
	display: inline-block;
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.goHome{
	font-size: 14px;
	display: inline-block;
	margin-left: 20px;
	text-decoration: none;
	color: skyblue;
	cursor: pointer;
}
.goHome:hover{
	color: #ccc;
}
.product>.pro_show{
	margin: 0 auto;
	padding-left: 20px;
	height: 300px;
}
.pro_show>.pro{
	position: relative;
	float: left;
	margin-right: 20px;
	margin-bottom: 20px;
	width: 300px;
	height: 200px;
	border: 1px solid gainsboro;
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

.add_btn>a{
	display: block;
	width: 120px;
	height: 25px;
	text-align: center;
	line-height: 25px;
	background: #FF0036;
	color: white;
	cursor: pointer;
}
#footer{
	height: 50px;
	width: 100%;
	display: flex;
}
#footer>ul.pagination{
	margin: 0 auto;
}
ul.pagination li{
	float: left;
}
ul.pagination li a {
    float: left;
    padding: 8px 16px;
    text-decoration: none;
	transition: background-color .3s;
	color: black;
    border: 1px solid #ddd;
}
ul.pagination li a.pag_active {
    background-color: #c40000;
    color: white;
    border: 1px solid #c40000;
}
ul.pagination li a:hover:not(.pag_active){
	background-color: #ddd;
}
div.center{
	text-align: center;
}

.container-water-fall {

  /* // padding: 0 28px; */

  padding: 10px 3%;

  width: 100%;

  box-sizing: border-box;

  /* background: #fafafa !important; */

}

vue-waterfall-column{
  width: 25%;
}

.cell-item img {

  /*  border-radius: 12px 12px 0 0; */

  width: 100%;

  height: auto;

  display: block;

}

.tech-list-ll .tab-bottom{

  padding:10px 0 !important;

  height: 0 !important;

  background: #fafafa !important;

}
</style>
