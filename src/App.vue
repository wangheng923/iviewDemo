<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App',
		mounted() {
			window.onpopstate = () => {
//				if(!this.allowBack) { //    这个allowBack 是存在vuex里面的变量
					console.log(history);
					return false;
//				}
			}
		}
	}
</script>

<style>
	* {
		margin: 0px;
		padding: 0px;
	}
	
	html,
	body {
		width: 100%;
		height: 100%;
		background: #f0f0f0;
	}
	
	#app {
		width: 100%;
		height: 100%;
	}
</style>