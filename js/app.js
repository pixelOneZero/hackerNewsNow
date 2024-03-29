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
					const cachedStories = localStorage.getItem('cachedStories');
					if (cachedStories === null) {
						localStorage.setItem('cachedStories', data);
					}
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
						const headline = `<a href='${data.url}' target='_blank'>${data.title}</a>, score: ${data.score}, posted ${app.convertUnixTime(data.time)}`;
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
