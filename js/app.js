/*

Tasks:
- 
*/

var app = {
	"name": "HackerNewsNow",
	"version": "0.1",
	"endpoints": {
		"topStories": "https://hacker-news.firebaseio.com/v0/topstories.json",
		"story": "https://hacker-news.firebaseio.com/v0/item/"
	},
	init: function() {
		var storyUri;

		$.getJSON( app.endpoints.topStories, function(data) {
			$.each(data, function(i) {	
				storyUri = app.endpoints.story + data[i] + ".json";
				app.getStory(storyUri);
			})
		});
	},
	getStory: function(uri) {
		$.getJSON( uri, function(data) {
			headline = "<a href='" + data.url + "' target='_blank'>" + data.title + "</a>";
			headline += "<small>, score: " + data.score + ", posted " + app.convertUnixTime(data.time) + "</small>";
			app.writeHeadline(headline);
		});
	},
	writeHeadline: function(title) {
		var headlinesList = $('[data-container=headlines]');
		headlinesList.append('<li>' + title + '</li>');
	},
	convertUnixTime: function(unixTime) {
		var date = new Date(unixTime * 1000);
		return date;
	}
}

document.onload = app.init();