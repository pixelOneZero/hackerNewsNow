/*

Tasks:
- 
*/

var app = {
	"name": "HackerNewsNow",
	"version": "0.1",
	"endpoints": {
		"headlines": {
			"uri": "https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty"
		}
	},
	init: function() {
		$.getJSON( app.endpoints.headlines.uri + "&callback=?", function(data) {
			$.each(data, function(i) {	
				console.log(data)
			})
		});
	}
}

document.onload = app.init();