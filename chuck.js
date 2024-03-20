const randomButton = document.getElementById('randomChuck');

randomButton.addEventListener('click', async () => {
	const randomJoke = await getRandomJoke();
	displayJoke(randomJoke);
});

async function getRandomJoke() {
	try {
		const reponse = await fetch('https://api.chucknorris.io/jokes/random');
		const jokeJSON = await reponse.json();
		return jokeJSON;
	} catch (error) {
		console.log(error);
	}
}

function displayJoke(randomJoke) {
	console.log(randomJoke);
	createMain();
}

function createMain() {
	console.log('create');
	let mainElement = document.getElementsByName('main');
	console.log(mainElement == []);
	if (mainElement == []) {
		return mainElement;
	} else {
		mainElement = document.createElement('main');
		document.body.prepend(mainElement);
		return mainElement;
	}
}
