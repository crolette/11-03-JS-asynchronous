const buttonBeCode = document.getElementById('becode');

// Method 1 - async/await

buttonBeCode.addEventListener('click', async (e) => {
	const rules = await getBeCodeRules();
	displayRules(rules);
});

async function getBeCodeRules() {
	console.log('rules');
	try {
		const response = await fetch('becode.json');
		const rules = await response.json();
		return rules;
	} catch {
		console.log('error');
	}
}

// // Method 2 - then
// buttonBeCode.addEventListener('click', (e) => {
// 	e.preventDefault();
// 	fetch('becode.json')
// 		.then((reponse) => {
// 			return reponse.json();
// 		})
// 		.then((rules) => {
// 			displayRules(rules);
// 		});
// });

// Method 3 - Promises
// buttonBeCode.addEventListener('click', async () => {
// 	new Promise((resolve, reject) => {
// 		const reponse = fetch('becode.json');
// 		resolve(reponse);
// 	})
// 		.then((fetchDatas) => {
// 			const rules = fetchDatas.json();
// 			return rules;
// 		})
// 		.then((rules) => {
// 			displayRules(rules);
// 		});
// });

function displayRules(rules) {
	const beCodeRulesList = document.getElementById('beCodeRulesList');
	if (beCodeRulesList) {
		beCodeRulesList.remove();
	} else {
		let list = document.createElement('ol');
		list.setAttribute('id', 'beCodeRulesList');
		rules.forEach((element) => {
			let listElement = document.createElement('li');
			listElement.innerText = element;
			list.append(listElement);
		});
		buttonBeCode.after(list);
	}
}
