<template>
 <ul class="lsn_list_ul">
    <li v-for="(item,index) in list" :key="index">
        <img :src="item.pic" alt="">
        <h3>{{item.title}}</h3>
        <article>
            <span>{{item.price}}</span>
            <van-icon name="shopping-cart-o" @click="setgoods(item)"></van-icon>
        </article>
    </li>
</ul>
</template>

<script>
import bus from "./bus"
import BScroll from "better-scroll"
export default {
  name: '',
  data() { 
    return {
    list:[],
    scroll:""
    }
  },
  props: [

  ],
  components:{
  },
  mounted() {
    this.navClick()
    this.getList("59f1e4919bfd8f3bd030eed6")
    this.sort(),
    this.top()
  },
  created() {
  },
  methods:{
    // nav切换
    navClick(){
        bus.$on("navClick",data =>{
            // console.log(data)
            this.getList(data)
        })
    },
    // getlist
    getList(id){
        this.$axios.get("/static/list.json").then(res =>{
            // console.log(res.data.result)
            
            this.list = res.data.result.filter(v =>{
               this.scrollFn()
               return v.cid == id
            })
            setTimeout(() =>{
                this.scroll.refresh()
            },1000)
        })
    },
    // 上拉下滑
     scrollFn(){
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(".lsn_list", {
                        click: true,
                        scrollY: true,
                        probeType: 3
                    });
                }else{
                    this.scroll.refresh();
                }
                this.scroll.on('scroll', (pos) => {
                    // console.log(pos.y,this.dropDown)
                    //如果下拉超过50px 就显示下拉刷新的文字
                    if(pos.y<=0){
                       bus.$emit("show",true)
                    }else{
                        bus.$emit("show",false)
                    }
                })
            })
     },
    //  排序
    sort(){
        bus.$on("sort", data =>{
            this.list.sort((a,b) =>{
                if(data){
                    return a.price-b.price
                }else{
                    return b.price-a.price
                }
            })
        })
    },
    setgoods(item){
        bus.$emit("setgoods",item)
    },
    // 回到顶部
    top(){
        bus.$on("top" , data =>{
            this.scroll.scrollTo(0,0,2000)
        })
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