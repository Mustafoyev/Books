let elSelects = document.querySelector('.selects');
let elSelect1 = document.querySelector('.select1');
let elSelect2 = document.querySelector('.select2');
let elSelect3 = document.querySelector('.select3');
let elSelect4 = document.querySelector('.select4');
let elInp = document.querySelector('.js-search');
let elBtn = document.querySelector('.js-mode');
let elList = document.querySelector('.js-list');

let newLanguage = new Set();

function renderFunc(array, add) {
	array.forEach((item) => {
		let newItem = document.createElement('li');
		let newTitle = document.createElement('h2');
		let newImg = document.createElement('img');
		let newAuthor = document.createElement('span');
		let newCountry = document.createElement('span');
		let newLanguage = document.createElement('span');
		let newPages = document.createElement('span');
		let newYear = document.createElement('span');
		let newLink = document.createElement('a');

		newTitle.textContent = item.title.toUpperCase();
		newImg.src = `./images/${item.imageLink}`;
		newAuthor.textContent = `Author: ${item.author}`;
		newCountry.textContent = `Country: ${item.country}`;
		newLanguage.textContent = `Languange: ${item.language}`;
		newPages.textContent = `Pages: ${item.pages}`;
		newYear.textContent = `Publication date: ${item.year}`;
		newLink.href = item.link;
		newLink.text = 'learn more';

		newImg.setAttribute('alt', 'Book image');
		newImg.setAttribute('width', '300');
		newImg.setAttribute('height', '300');
		newLink.setAttribute('target', '_blank');

		newItem.appendChild(newTitle);
		newItem.appendChild(newImg);
		newItem.appendChild(newAuthor);
		newItem.appendChild(newCountry);
		newItem.appendChild(newLanguage);
		newItem.appendChild(newPages);
		newItem.appendChild(newYear);
		newItem.appendChild(newLink);

		add.appendChild(newItem);
	});
}

renderFunc(books, elList);

books.forEach((el) => {
	newLanguage.add(el.language);
});

newLanguage.forEach((el) => {
	let newOption = document.createElement('option');

	newOption.value = el;
	newOption.textContent = el;

	elSelect4.appendChild(newOption);
});

elSelects.addEventListener('change', function (evt) {
	if (evt.target.matches('.select1')) {
		let sortName = [];
		elList.innerHTML = '';
		if (elSelect1.value == 'Aa-Zz') {
			let sorted = books.sort((a, b) => {
				let sortA = a.title.toLowerCase().charCodeAt(0);
				let sortB = b.title.toLowerCase().charCodeAt(0);
				if (sortA < sortB) {
					return -1;
				} else if (sortA > sortB) {
					return 1;
				} else {
					return 0;
				}
			});
			sortName = sorted;
		}
		if (elSelect1.value == 'Zz-Aa') {
			let sorted = books.sort((a, b) => {
				let sortA = a.title.toLowerCase().charCodeAt(0);
				let sortB = b.title.toLowerCase().charCodeAt(0);
				if (sortA > sortB) {
					return -1;
				} else if (sortA < sortB) {
					return 1;
				} else {
					return 0;
				}
			});
			sortName = sorted;
		}

		renderFunc(sortName, elList);
	}

	if (evt.target.matches('.select2')) {
		let sortYear = [];
		elList.innerHTML = '';

		if (elSelect2.value == 'max') {
			let sorted = books.sort((a, b) => {
				return Math.abs(a.year) - Math.abs(b.year);
			});
			sortYear = sorted;
		}

		if (elSelect2.value == 'min') {
			let sorted = books.sort((a, b) => {
				return Math.abs(b.year) - Math.abs(a.year);
			});
			sortYear = sorted;
		}
		renderFunc(sortYear, elList);
	}

	if (evt.target.matches('.select3')) {
		let sortPages = [];
		elList.innerHTML = '';

		if (elSelect3.value == 'max') {
			let sorted = books.sort((a, b) => {
				return a.pages - b.pages;
			});
			sortPages = sorted;
		}

		if (elSelect3.value == 'min') {
			let sorted = books.sort((a, b) => {
				return b.pages - a.pages;
			});
			sortPages = sorted;
		}

		renderFunc(sortPages, elList);
	}

	if (evt.target.matches('.select4')) {
		let sortLanguage = [];
		elList.innerHTML = '';

		books.forEach((el) => {
			if (el.language.includes(elSelect4.value)) {
				sortLanguage.push(el);
			}
		});

		if (elSelect4.value == 'Aa-Zz') {
			let sorted = books.sort((a, b) => {
				let sortA = a.language.toLowerCase().charCodeAt(0);
				let sortB = b.language.toLowerCase().charCodeAt(0);
				if (sortA < sortB) {
					return -1;
				} else if (sortA > sortB) {
					return 1;
				} else {
					return 0;
				}
			});
			sortLanguage = sorted;
		}

		if (elSelect4.value == 'Zz-Aa') {
			let sorted = books.sort((a, b) => {
				let sortA = a.language.toLowerCase().charCodeAt(0);
				let sortB = b.language.toLowerCase().charCodeAt(0);
				if (sortA > sortB) {
					return -1;
				} else if (sortA < sortB) {
					return 1;
				} else {
					return 0;
				}
			});
			sortLanguage = sorted;
		}
		renderFunc(sortLanguage, elList);
	}
});

elInp.addEventListener('input', function () {
	let search = [];
	elList.innerHTML = '';

	if (
		(search = books.filter((el) =>
			el.title.toLowerCase().includes(elInp.value.toLowerCase().split(' ')),
		))
	) {
		renderFunc(search, elList);
	}

	if (
		(search = books.filter((el) =>
			el.author.toLowerCase().includes(elInp.value.toLowerCase().split(' ')),
		))
	) {
		renderFunc(search, elList);
	}

	if (
		(search = books.filter((el) =>
			el.country.toLowerCase().includes(elInp.value.toLowerCase().split(' ')),
		))
	) {
		renderFunc(search, elList);
	}
	if (
		(search = books.filter((el) =>
			el.language.toLowerCase().includes(elInp.value.toLowerCase().split(' ')),
		))
	) {
		renderFunc(search, elList);
	}
	if ((search = books.filter((el) => el.pages == elInp.value))) {
		renderFunc(search, elList);
	}
	if (
		(search = books.filter((el) => Math.abs(el.year) == Math.abs(elInp.value)))
	) {
		renderFunc(search, elList);
	}
});

let theme = false;

elBtn.addEventListener('click', function () {
	theme = !theme;
	window.localStorage.setItem('theme', theme ? 'dark' : 'light');
	changeTheme();
});

function changeTheme() {
	if (window.localStorage.getItem('theme') == 'dark') {
		document.body.classList.add('darker');
	} else {
		document.body.classList.remove('darker');
	}
}

changeTheme();
