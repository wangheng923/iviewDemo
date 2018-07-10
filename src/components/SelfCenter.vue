<template>
	<div id="self-center">
		<Row>
			<Col span="8">
			<Card :style="{width:'250px',display:'inline-block'}">
				<div slot="title" class="card-title">
					<div class="card-title-ver-line"></div>
					我的头像

				</div>
				<Row>
					<Col span="12">
					<Avatar size="large" :style="{width:'100px',height:'100px','border-radius': '50px'}" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
					</Col>

					<Col span="12" :style="{padding:'34px 10px 34px 10px'}">
					<Button type="success">点击更换</Button>
					</Col>

				</Row>
			</Card>
			</Col>
			<Col span="16">
			</Col>
		</Row>
		<Row>
			<Col span="8">
			<Card :style="{width:'250px',display:'inline-block'}">
				<div slot="title" class="card-title">
					<div class="card-title-ver-line"></div>
					我的头像

				</div>
				<Row>
					<Col span="12">
					<Avatar size="large" :style="{width:'100px',height:'100px','border-radius': '50px'}" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
					</Col>

					<Col span="12" :style="{padding:'34px 10px 34px 10px'}">
					<Button type="success" @click="add">添加</Button>
					</Col>

				</Row>
			</Card>
			</Col>
			<Col span="16">
			<Tabs type="card" closable @on-tab-remove="handleTabRemove" v-model:value="currentTab">
				<TabPane v-for="tab in tabs" :key="tab.name" :label="tab.name" :name="tab.name" >
					<component :id="tab.name"  v-bind:is="getComponent(tab.name)"></component>
				</TabPane>
			</Tabs>
			</Col>

		</Row>
	</div>
</template>
<script>
	import VoiceOcr from '@/components/VoiceOcr'
	import Reg from '@/components/Reg'
	export default {
		components: {
			VoiceOcr,
			Reg
		},
		data() {
			return {
				currentTab:'a',
				tabs: [{
					name: 'a',
					component:'<VoiceOcr/>'
				}],
				tabPanel:'<VoiceOcr>afaf</VoiceOcr>'
			}
		},
		computed:{
//			getComponent(name){
//				if(name === 'a'){
//					return '<VoiceOcr/>';
//				}
//				if(name === 'b'){
//					return '<Reg/>';
//				}
//			},
		},
		methods: {
			getComponent(name){
				console.log(name);
				if(name == 'a'){
					return 'VoiceOcr';
				}
				if(name == 'b'){
					return 'Reg';
				}
			},
			handleTabRemove(name) {
				$('#'+name).parent().remove();
			},
			add(){
				this.tabs.push({name:'b'});
				this.currentTab= 'b';
			}
		}
	}
</script>

<style>
	.card-title {
		vertical-align: middle;
	}
	
	.card-title-ver-line {
		height: 43px;
		width: 2px;
		border-left: 3px solid red;
		position: absolute;
		top: 0px;
		left: 0px;
		display: inline-block;
	}
</style>