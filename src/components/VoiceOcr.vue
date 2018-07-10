<template>
	<Layout>
		<div>
			<Card style="">
				<p slot="title">
					预设词
				</p>
				<Row class="row">
					<Col span="2">标准话术</Col>
					<Col span="22">
					<Tag v-for="item in speechcrafts" :key="item" :name="item" v-model="aa" closable @on-close="handleClose(item,1)" color="blue" ref="speechcraft">{{item}}</Tag>
					<Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd(1)">添加标签</Button>
					</Col>
				</Row>

				<Row class="row">
					<Col span="2">服务忌语</Col>
					<Col span="22">
					<Tag v-for="item in tabooses" :key="item" :name="item" closable @on-close="handleClose(item,2)" color="red">{{item}}</Tag>
					<Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd(2)">添加标签</Button>
					</Col>
				</Row>
				<Row class="row">
					<Col span="2">关键字</Col>
					<Col span="22">
					<Tag v-for="item in keywords" :key="item" :name="item" closable @on-close="handleClose(item,3)" color="yellow">{{item}}</Tag>
					<Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd(3)">添加标签</Button>
					</Col>
				</Row>
				<Modal v-model="modalShow" :title="modalTitle" ok-text="添加" cancel-text="取消" @on-ok="addTag" @on-cancel="tag=''">
					<Input v-model="tag" placeholder="请输入标签值，多个以空格分隔" clearable style="width: 100%" @on-enter="addTag"></Input>
				</Modal>
			</Card>
		</div>
		<div>
			<Card style="">
				<p slot="title">
					上传音频文件
				</p>
				<Row>
					<div v-if="!file">
						<Col span="3">
						<Upload :before-upload="handleUpload" type="drag" action="//jsonplaceholder.typicode.com/posts/">
							<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
							<p>点击或者拖动文件到此处</p>
						</Upload>
						</Col>
					</div>
					<div v-else>
						<Col span="3">
						<div class="selected-file-con">
							<Icon type="document" :size="50"></Icon>
							<span class="file-name">{{filename}}</span>
						</div>
						</Col>
						<Col span="2">
						<div class="opreate">
							<Button type="error" shape="circle" size="large" @click="deleteFile">删除文件</Button>
						</div>
						</Col>
					</div>

					<Col span="2">
					<div class="opreate">
						<Button type="primary" shape="circle" size="large" :disabled="!file" @click="upload">点击识别</Button>
					</div>
					</Col>
				</Row>
			</Card>
		</div>
		<div>
			<Card :style="{height:'250px'}">
				<p slot="title">
					识别结果
				</p>
				<Row>
					<Col span="16">
					<div class="result" v-html="result">
					</div>
					</Col>
					<Col span="2">
					<div class="tips">
						<Checkbox v-model="showSpeach" :style="{width:'max-content',padding:'5px','font-size':'16px'}" size="large"><span class="tip speach">
							标准话术 频率:{{speechCount}}
						</span></Checkbox>

						<Checkbox v-model="showTaboos" :style="{width:'max-content',padding:'5px','font-size':'16px'}" size="large"><span class="tip taboos">
							服务忌语 频率:{{taboosCount}}
						</span></Checkbox>
						<Checkbox v-model="showKey" :style="{width:'max-content',padding:'5px','font-size':'16px'}" size="large"><span class="tip key">
							关键字 频率:{{keyCount}}
						</span></Checkbox>
					</div>
					</Col>
				</Row>

			</Card>
		</div>
	</Layout>
</template>

<script>
	export default {
		data() {
			return {
				speechcrafts: ['本人', '投保', '合同'],
				tabooses: ['国寿', '利益'],
				keywords: ['投保单', '中国人寿', '两全保险万能型'],
				file: null,
				filename: '',
				loadingStatus: false,
				tag: '',
				modalShow: false,
				type: 0,
				aa: '',
				showSpeach: true,
				showTaboos: true,
				showKey: true,
				speechCount: 0,
				taboosCount: 0,
				keyCount: 0,
				resultMsg: '中国人寿，保险股份有限公司国寿瑞盈两全保险万能型条款第一条保险合同构成，国寿瑞盈两全保险万能型合同，以下简称本合同有保险单及所附条款声明批注批单以及与本合同有关的投保单健康声明书和其他书面协议工程构成，第二条投保单里还出生三十日以上六十周岁以下身体健康者均可作为被保险人由本人或对其具有保险利益的人作为投保人向中国人寿保险股份有限公司以下简称本公司投保本保险，第三条保险合同，成立生效和保险责任开始，投保人提出保险申请本公司同意承保合同成立合同成立日期在保险单上载明，日本合同成立分公司收取一次性交付保险费并签发保险单，次日零时起本合同生效本合同生效日期在保险单上载明生效对应日保单年度均以该日期计算出另约定完本合同生效的日期为本和公司开始承担保险责任的日期',
			}
		},
		computed: {
			modalTitle() {
				switch(this.type) {
					case 1:
						return "标准话术 ";
					case 2:
						return "服务忌语 ";
					case 3:
						return "关键字 ";;
				}
			},
			result() {
				var msg = this.resultMsg;
				this.speechCount = 0;
				this.taboosCount = 0;
				this.keyCount = 0;
				if(this.showSpeach) {
					for(var i = 0; i < this.speechcrafts.length; i++) {
						var regex = new RegExp(this.speechcrafts[i], 'g');
						var result = msg.match(regex);
						this.speechCount += !result ? 0 : result.length;
						msg = msg.replace(new RegExp(this.speechcrafts[i], 'g'), '<span class="speach">' + this.speechcrafts[i] + '</span>');
					}
				}
				if(this.showTaboos) {
					for(var i = 0; i < this.tabooses.length; i++) {
						var regex = new RegExp(this.tabooses[i], 'g');
						var result = msg.match(regex);
						this.taboosCount += !result ? 0 : result.length;
						msg = msg.replace(new RegExp(this.tabooses[i], 'g'), '<span class="taboos">' + this.tabooses[i] + '</span>');
					}
				}
				if(this.showKey) {
					for(var i = 0; i < this.keywords.length; i++) {
						var regex = new RegExp(this.keywords[i], 'g');
						var result = msg.match(regex);
						this.keyCount += !result ? 0 : result.length;
						msg = msg.replace(new RegExp(this.keywords[i], 'g'), '<span class="key">' + this.keywords[i] + '</span>');
					}
				}
				return msg;
			}
		},
		methods: {
			handleClose(name, type) {
				switch(type) {
					case 1:
						var index = this.speechcrafts.indexOf(name);
						this.speechcrafts.splice(index, 1);
						break;
					case 2:
						var index = this.tabooses.indexOf(name);
						this.tabooses.splice(index, 1);
						break;
					case 3:
						var index = this.keywords.indexOf(name);
						this.keywords.splice(index, 1);
						break;
				}

			},
			handleAdd(type) {
				switch(type) {
					case 1:
						this.modalShow = true;
						this.type = 1;
						break;
					case 2:
						this.modalShow = true;
						this.type = 2;
						break;
					case 3:
						this.modalShow = true;
						this.type = 3;
						break;
				}
			},
			addTag() {
				if(!this.tag || this.tag.trim().length == 0) {
					this.$Message.warn('标签不能为空');
				}
				var tags = this.tag.split(' ');
				switch(this.type) {
					case 1:
						for(var i in tags) {
							this.speechcrafts.push(tags[i]);
						}
						this.tag = '';
						break;
					case 2:
						for(var i in tags) {
							this.tabooses.push(tags[i]);
						}
						this.tag = '';
						break;
					case 3:
						for(var i in tags) {
							this.keywords.push(tags[i]);
						}
						this.tag = '';
						break;
				}
				this.modalShow = false;
			},
			handleUpload(file) {
				this.file = file;
				this.filename = file.name;
				return false;
			},
			deleteFile() {
				this.file = null;
			},
			upload() {
				this.loadingStatus = true;
				this.getToken();
			},
			getToken() {
				var self = this;
				var fd = new FormData()
				fd.append('apiKey', 'z5MqtHVFetLQjg34IVF9KNYpXnmU8V2C');
				fd.append('secretKey', '1741d46231cd0332e34b1f53896debb1d7879c21');
				this.$axios.post('/bd/auth/token', {}, {
						params: {
							'apiKey': 'z5MqtHVFetLQjg34IVF9KNYpXnmU8V2C',
							'secretKey': '1741d46231cd0332e34b1f53896debb1d7879c21'
						},
						headers: {
							//							'Content-Type': 'application/x-www-form-urlencoded'
						}
					})
					.then(function(response) {
						if(response.data.error) {
							self.$Message.error(response.data.error_description);
							return;
						}
						self.ocr(response.data.access_token);
					})
					.catch(function(error) {
						self.$Message.error('网络异常');
					})
			},
			ocr(token) {
				var fd = new FormData()
				fd.append('access_token', token);
				fd.append('image', this.file);
				this.$axios.post('/bd/rest/ocr/v1/idcard', fd)
					.then(function(response) {
						if(response.data.error_code) {
							self.$Message.error(response.data.error_msg);
							return;
						}
						console.log(response.data);
					})
					.catch(function(error) {
						console.log(error);
					})
			}
		}
	}
</script>

<style>
	.row {
		margin-bottom: 10px;
	}
	
	.selected-file-con {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}
	
	.file-name {
		overflow-wrap: break-word;
	}
	
	.opreate {
		padding: 20px;
	}
	
	.result {
		border: 1px solid lightgrey;
		width: 100%;
		min-height: 155px;
	}
	
	.tips {
		display: flex;
		flex-direction: column;
		text-align: center;
		margin: 10px 0px 0px 50px;
	}
	
	.speach {
		background-color: #2d8cf0;
		color: white;
	}
	
	.taboos {
		background-color: #ed3f14;
		color: white;
	}
	
	.key {
		background-color: #f90;
		color: white;
	}
	
	.tip {
		padding: 5px;
		margin-bottom: 10px;
	}
</style>