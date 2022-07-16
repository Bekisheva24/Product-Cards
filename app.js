async function getProductsPost() {
	const responce = await fetch("db.json");

	const products = await responce.json();

	return products;
}

getProductsPost().then((products) => {
	let productsInner = "";

	products.forEach((element) => {
		const products = document.querySelector(".products__inner");

		const productOutput = document.createElement("article");
		productOutput.className = "products__item";
		products.append(productOutput);

		const productImg = document.createElement("img");
		productImg.className = "products__img";
		productImg.src = element.img;
		productOutput.append(productImg);

		const titleContainer = document.createElement("div");
		titleContainer.className = "products__title-container";
		productOutput.append(titleContainer);

		const title = document.createElement("h3");
		title.className = "products__tile";
		title.innerText = element.title;
		titleContainer.append(title);

		const category = document.createElement("h4");
		category.className = "category";
		category.innerText = element.category;
		productOutput.append(category);

		const price = document.createElement("span");
		price.className = "products__price";
		price.innerText = element.price + "сом";
		productOutput.append(price);

		const line = document.createElement("hr");
		productOutput.append(line);

		const desc = document.createElement("p");
		desc.className = "products__desc";
		desc.innerText = element.desc;
		productOutput.append(desc);

	});




	const filtersContainer = document.querySelector(".products__filters");

	displayFilterBtns();

	function displayFilterBtns() {
		const categories = products.reduce(
			function (values, item) {
				if (!values.includes(item.category)) {
					values.push(item.category);
				}

				return values;
			},
			["Все"]
		);

		const categoryBtns = categories.map((cat) => {
			return `
				<button class="products__filters-btn" type="button" data-cat="${cat}">
					${cat}
				</button>
			`
		})
			.join("");

		filtersContainer.innerHTML = categoryBtns;
		const filterBtns = document.querySelectorAll(".products__filters-btn");

		filterBtns.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const category = e.currentTarget.dataset.cat;
				const productCategory = products.filter((item) => {
					if (item.category === category) {
						return item;
					}
				});

				if (category === "Все") {
					displayProductsItems(products);
				} else {
					displayProductsItems(productCategory);
				}
			});
		});
	}

});


















































