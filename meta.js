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
			"message": "Project name"
		},
		"description": {
			"type": "string",
			"required": false,
			"message": "Project description",
			"default": "A Vue.js project"
		},
		"author": {
			"type": "string",
			"message": "Author"
		},
		"VueLazyload":{
			"type": "confirm",
			"message": "Install VueLazyload?"
		},
		"fundebug":{
			"type": "confirm",
			"message": "Install fundebug to monitor javascript?"
		}
	},
	"filters": {
		"src/assets/images/lazyload/*": "VueLazyload"
	},
	"completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/ztjy-fe/scaffolding"
};
