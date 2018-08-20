Page({
	data: {
		title: "safasdf",
		body: "<p>sfasdfasdasfasdf</p><p>第二行按时发生法发</p>"
	},
	onLoad: function(options){
		console.log(options,'options========')
		this.setData({
			tabBar: "",
			body: "<p>"+options.id+"</p>"
		})
	}
})

