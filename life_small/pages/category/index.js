Page({
	data: {
		categorys: [
			{"id":1, "title": '分类1'},
			{"id":2, "title": '分类2'},
			{"id":3, "title": '分类3'},
			{"id":2, "title": '分类2'},
			{"id":3, "title": '分类3'}
		]
	},
	onLoad: function(){
		this.setData({
			categorys: function(){
				
			}
		})
	}
})