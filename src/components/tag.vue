<template>
	<div class="tag">
		<el-card  class="box-card">
			<div slot="header" class="d-flex align-items-center">
				<img class="card-icon" src="../assets/biaoqian.png" />
				<span>标签</span>
			</div>

      <div class="text item">
        <el-tag  size="mini" class="tag-item" type="warning"><router-link :to="`/all`"> 全部文章 </router-link></el-tag>
        <el-tag v-for="item in allClassData" v-if="item.parentId==0" size="mini" class="tag-item" type="success" @click.native="tag(item.title)">{{item.title}}</el-tag>
        <el-tag v-for="item in allClassData" v-if="item.parentId!=0" size="mini" class="tag-item" type="info" @click.native="tag(item.title)">{{item.title}}</el-tag>
      </div>
		</el-card>
	</div>
</template>

<script>
import {getAll} from '../api'
	export default {
		name: 'tag',
    data() {
      return {
        allClassData: null,
      }
    },
    created() {
		  this.getAllAllClass()
    },
    methods: {
      tag(name) {
        this.$router.push({path:`/category/${name}`})
      },
			getAllAllClass() {
        getAll().then(response=>{
          this.allClassData = response.data.data
          console.log(this.allClassData)
        })
			}
		}
	}
</script>

<style scoped>
.box-card{
  height: 400px;
}
	.box-card .item:hover {
		color: #409EFF;
		cursor: pointer;
	}

	.box-card span {
		font-weight: bold;
	}

	.card-icon {
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}

	.tag-item {
		margin-right: 10px;
	}

</style>
