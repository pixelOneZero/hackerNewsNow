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

(() => {
		const app = {
				"name": "HackerNewsNow",
				"version": "0.1.1",
				"endpoints": {
						"topStories": "https://hacker-news.firebaseio.com/v0/topstories.json",
						"story": "https://hacker-news.firebaseio.com/v0/item/"
				},
				init: () => {
						let storyUri;

						fetch(app.endpoints.topStories)
						  .then(response => response.json())
							.then(data => {
								for (story in data) {
									storyUri = `${app.endpoints.story}${story}.json`;
									app.getStory(storyUri);
								}
							})
							.catch(error => {
						    console.error('Fetch error: ', error);
						  });
				},
				getStory: (uri) => {
					fetch(uri)
						.then(response => response.json())
						.then(data => {
								if (data?.title) {
									headline = `<a href='${data.url}' target='_blank'>${data.title}</a>
										<small>, score: ${data.score}, posted ${app.convertUnixTime(data.time)}</small>`;
									app.writeHeadline(headline);
								}
						})
						.catch(error => {
							console.error('Fetch error: ', error);
						});
				},
				writeHeadline: (title) => {
						const headlinesList = document.querySelector('[data-container=headlines]');
						if (headlinesList) {
							headlinesList.innerHTML += `<li>${title}</li>`;
						}
				},
				convertUnixTime: (unixTime) => {
						return new Date(unixTime * 1000);
				}
		}

		document.onload = app.init();
})();
