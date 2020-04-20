<template>
  <div>
    <router-link to="/">返回</router-link>
    <!-- 搜搜 -->
    <form action="/">
      <van-search v-model="keyword" show-action placeholder="请输入搜索关键词" @blur="add" />
    </form>

    <ul class="lsn_search_ul">
      <li v-for="(item,index) in search_list" :key="index">{{item.title}}</li>
    </ul>
    <article class="lsn_histy">
      <h3>
        历史搜索
       <span @click="clear">🎀</span>
      </h3>
      <p>
        <span v-for="(item,index) in histy_list" :key="index">{{item}}</span>
      </p>
    </article>
  </div>
</template>

<script>
import {Cross} from "vant"
export default {
  name: "",
  data() {
    return {
      keyword: "",
      histy_list: [],
      list: []
    };
  },
  props: [],
  components: {
     
  },
  mounted() {},
  created() {
    // 取出纯数得数据
    let data = localStorage.getItem("lsn");
    if (data == null) {
      this.histy_list = [];
    } else {
      this.histy_list = JSON.parse(data);
    }
    // 获取数据
    this.$axios.get("/static/list.json").then(res => {
      // console.log(res.data.result)
      this.list = res.data.result;
    });
  },
  methods: {
    // add添加
    add() {
      this.histy_list.unshift(this.keyword);
      localStorage.setItem("lsn", JSON.stringify(this.histy_list));
      if (this.histy_list.length > 6) {
        this.histy_list.pop();
      }
 
    },
    clear(){
        localStorage.removeItem("lsn")
        this.histy_list = []
    }


  },
  watch: {},
  computed: {
    search_list() {
      let data = this.list.filter(item => {
        if (this.keyword == "") {
          return false;
        }
        if (item.title.indexOf(this.keyword) != -1) {
          return item;
        }
      });
      return data;
    }
  }
};
</script>

<style  scoped>
</style>