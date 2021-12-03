/*

Tasks:
done - Remove Angular dependencies
done - Remove jquery dependencies
done - Use fetch for asynchronous requests
- Add local storage caching
- Add form control to sort stories by:
		- new
		- top
		- best
*/

(function () {
		var app = {
				"name": "HackerNewsNow",
				"version": "0.1",
				"endpoints": {
						"topStories": "https://hacker-news.firebaseio.com/v0/topstories.json",
						"story": "https://hacker-news.firebaseio.com/v0/item/"
				},
				init: function() {
						let storyUri;

						fetch(app.endpoints.topStories)
						  .then(response => response.json())
							.then(data => {
								for (story in data) {
									console.log(story);
									storyUri = app.endpoints.story + story + ".json";
									app.getStory(storyUri);
								}
							})
							.catch(error => {
						    console.error('There has been a problem with your fetch operation:', error);
						  });
				},
				getStory: function(uri) {
					fetch(uri)
						.then(response => response.json())
						.then(data => {
								if (data?.title) {
									headline = "<a href='" + data.url + "' target='_blank'>" + data.title + "</a>";
									headline += "<small>, score: " + data.score + ", posted " + app.convertUnixTime(data.time) + "</small>";
									app.writeHeadline(headline);
								}
						})
						.catch(error => {
							console.error('There has been a problem with your fetch operation:', error);
						});
				},
				writeHeadline: function(title) {
						const headlinesList = document.querySelector('[data-container=headlines]');
						if (headlinesList) {
							headlinesList.innerHTML += `<li>${title}</li>`;
						}
				},
				convertUnixTime: function(unixTime) {
						var date = new Date(unixTime * 1000);
						return date;
				}
		}

		document.onload = app.init();
})();
