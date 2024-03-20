const formCategories = document.getElementById('formCategories');

formCategories.addEventListener('submit', async (e) => {
	e.preventDefault();
	const selectedCategory = document.getElementById('selectedCategory');
	let randomJoke = '';
	if (selectedCategory.value == 'none') {
		randomJoke = await getRandomJoke();
	} else {
		randomJoke = await getRandomCategoryJoke(selectedCategory.value);
	}
	displayJoke(randomJoke.value);
	saveToLocalStorage(randomJoke.value);
});

function displayJoke(randomJoke) {
	let mainElement = document.getElementById('jokes');
	let newDiv = document.createElement('div');
	newDiv.classList.add('chuckJoke');
	let paragraph = document.createElement('p');
	paragraph.innerText = randomJoke;
	newDiv.append(paragraph);
	mainElement.append(newDiv);
}

function createMain() {
	let mainElement = document.getElementById('jokes');
	if (mainElement == null) {
		mainElement = document.createElement('main');
		mainElement.setAttribute('id', 'jokes');
		document.body.append(mainElement);
		return mainElement;
	} else {
		return mainElement;
	}
}

async function getCategories() {
	try {
		const reponse = await fetch('https://api.chucknorris.io/jokes/categories');
		const categories = await reponse.json();
		return categories;
	} catch (error) {
		console.log(error);
	}
}

async function createSelect() {
	const categories = await getCategories();
	let newSelect = document.createElement('select');
	newSelect.setAttribute('name', 'categories');
	newSelect.setAttribute('id', 'selectedCategory');
	let newOption = document.createElement('option');
	newOption.setAttribute('value', 'none');
	newOption.innerText = 'none';
	newSelect.append(newOption);

	categories.forEach((category) => {
		let newOption = document.createElement('option');
		newOption.setAttribute('value', category);
		newOption.innerText = category;
		newSelect.append(newOption);
	});

	formCategories.append(newSelect);
}

async function getRandomJoke() {
	try {
		const reponse = await fetch('https://api.chucknorris.io/jokes/random');
		const jokeJSON = await reponse.json();
		return jokeJSON;
	} catch (error) {
		console.log(error);
	}
}

async function getRandomCategoryJoke(selectedCategory) {
	try {
		const reponse = await fetch(
			'https://api.chucknorris.io/jokes/random?category=' + selectedCategory
		);
		const jokeJSON = await reponse.json();

		return jokeJSON;
	} catch (error) {
		console.log(error);
	}
}

async function getLocalStorage() {
	let jokes = await JSON.parse(localStorage.getItem('jokes'));
	if (jokes == null) {
		const storedJokes = createLocalStorage();
		return storedJokes;
	} else {
		return jokes;
	}
}

async function saveToLocalStorage(randomJoke) {
	let jokesStored = await getLocalStorage();
	jokesStored.push(randomJoke);
	localStorage.setItem('jokes', JSON.stringify(jokesStored));
}

function createLocalStorage() {
	let storedJokes = [];
	localStorage.setItem('jokes', JSON.stringify(storedJokes));

	return storedJokes;
}

function clearStorage() {
	localStorage.clear();
}

document.addEventListener('DOMContentLoaded', async (e) => {
	createSelect();
	createMain();
	let jokes = await getLocalStorage();
	jokes.forEach((element) => {
		displayJoke(element);
	});
});

const deleteButton = document.getElementById('delete');

deleteButton.addEventListener('click', () => {
	localStorage.removeItem('jokes');
});
