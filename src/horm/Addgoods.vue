<template>
  <div>
<van-popup v-model="show" position="bottom" :style="{ height: '30%' }" >
<div class="sub">
    <div class="subheader">
        <img :src="subgoods.pic" alt="">
        <article>
            <h3>{{subgoods.title}}</h3>
            <p>{{subgoods.price}}</p>
        </article>
    </div>
    <van-button type="warning" size="large" @click="add">加入购车</van-button>
</div>
</van-popup>
  </div>
</template>

<script>
import bus from "./bus"
import {Popup,Button} from "vant"
export default {
  name: '',
  data() { 
    return {
        show:false,
        subgoods:[]
    }
  },
  props: [

  ],
  components:{
    [Popup.name]:Popup,
    [Button.name]:Button
  },
  mounted() {
    this.setgoods()
  },
  created() {
  },
  methods:{
    setgoods(){
        
        bus.$on("setgoods", data =>{
            this.show = true
            this.subgoods = data
        })
    },
    add(){
        this.show = false
        console.log(`
        加入购车车成功商品为价格是${this.subgoods.price}的${this.subgoods.title}`)
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