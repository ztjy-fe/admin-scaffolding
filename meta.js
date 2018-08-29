module.exports = {

	"helpers": {
		"if_or": function (v1, v2, options) {
			if (v1 || v2) {
				return options.fn(this);
			}

			return options.inverse(this);
		}
	},
	"prompts": {
		"name": {
			"type": "string",
			"required": true,
			"message": "项目名称"
		},
		"description": {
			"type": "string",
			"required": false,
			"message": "项目描述信息",
			"default": "A Vue.js project"
		},
		"author": {
			"type": "string",
			"message": "作者"
		},
		"VueLazyload":{
			"type": "confirm",
			"message": "是否安装图片延迟加载插件VueLazyload？"
		},
		"tabs":{
			"type": "confirm",
			"message": "是否采用tabs形式加载路由组件？"
		}
	},
	"filters": {
		"src/assets/images/lazyload/*": "VueLazyload",
		"src/store/modules/tabs.js": "tabs",
		"src/views/layout/components/Tabs.vue": "tabs"
	},
	"completeMessage": "请按步骤运行以下命令:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev\n\n文档说明见https://github.com/ztjy-fe/admin-scaffolding"
};
