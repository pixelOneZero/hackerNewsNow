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
			app.writeHeadline(data.title);
		});
	},
	writeHeadline: function(title) {
		var headlinesList = $('[data-container=headlines]');
		headlinesList.append('<li>' + title + '</li>');
	}
}

document.onload = app.init();