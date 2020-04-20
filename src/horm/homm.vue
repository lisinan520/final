<template>
  <div class="horm">
    <!-- 搜索 -->
    <van-search @focus="$router.push('/search')" placeholder="请输入内容"></van-search>
    <!-- nav导航栏部分 -->
    <van-tabs v-model="active" @click="navClick">
      <van-tab v-for="(item,index) in nav" :key="index" :name="item.id" :title="item.title"/>
    </van-tabs>
    <!-- 排序部分 -->
    <van-row type="flex">
        <van-col span="4">综合</van-col>
        <van-col span="4">数量</van-col>
        <van-col span="4">销量</van-col>
        <van-col span="5" class="lsn_icon" @click="sort">
            价格
            <article>
                <van-icon name="arrow-up" :class="{'isColor':up}"></van-icon>
                 <van-icon name="arrow-down" :class="{'isColor':down}"></van-icon>
            </article>

        </van-col>
    </van-row>
    <!-- list部分 -->
    <div class="lsn_list">
        <section>
            <List/>
        </section>
    </div>

    <!-- footer -->
    <van-tabbar v-model="navsub">
  <van-tabbar-item name="homm" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item  icon="search">搜索</van-tabbar-item>
  <van-tabbar-item  icon="shopping-cart-o" badge="5">购物车</van-tabbar-item>
  <van-tabbar-item  icon="setting-o">设置</van-tabbar-item>
</van-tabbar>

<!-- 弹出部分 -->
<Addgoods/>

<!-- 回到顶部 -->
<van-icon name="arrow-up" class="up" v-show="upShow" @click="top"></van-icon>

  </div>
</template>

<script>
// 引用scss
import "@/assets/style/reset.css"
import "@/assets/style/border.css"
import "@/assets/style/horm.css"
// 引用list组件
import List from "./List"
// 引用bus组件
import bus from "./bus"
// 引用addgoods组件
import Addgoods from "./Addgoods"
export default {
  name: '',
  data() { 
    return {
        active:"59f1e4919bfd8f3bd030eed6",
        nav:[],
        navsub:"homm",
        up:false,
        down:false,
        upShow:false
    }
  },
  props: [

  ],
  components:{
    List,
    Addgoods,
  },
  mounted() {
  },
  created() {
    // 获取nav数据
    this.$axios("/static/fenlei.json").then(res =>{
        // console.log(res.data.result)
        this.nav = res.data.result
    }),
    // shwo
    bus.$on("show", data=>{
        // console.log(data)
        this.upShow = data
    })
  },
  methods:{
    // 利用nav切换nav
    navClick(name){
        bus.$emit("navClick",this.nav[name]._id)
    },
    // 排序
    sort(){
        this.up = !this.up
        this.down = !this.down
        bus.$emit("sort",this.up)
    },
    // 回到顶部
    top(){
        bus.$emit("top")
    }
  },
  watch:{

  },
  computed:{

  },
 }
</script>

<style  scoped>
</style>