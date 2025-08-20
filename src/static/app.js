window.addEventListener("DOMContentLoaded", setup);

async function setup() {
	// START HERE
	// API Endpoint: GET /products
	// Returns: Array of product objects with id, title, price (in cents), and array of images
	// [x] TODO: Fetch products from the API
	// [x] TODO: Render the products to the page in a responsive grid
	// [] TODO: Sort the products by price (low to high by default)
	// [x] TODO: Implement search functionality
	// [] BONUS: Use the refactored sorting function for dynamic sort order
	// [] BONUS: Add error handling for the fetch request
	try {
		//Fetch products from API
		const response = await fetch('/products');

		//Check if the response is successful
		if(!response.ok) {
			throw new Error('HTTP error! status: ${response.status');
		}
		
		//Convert response to JSON
		const products = await response.json();

		//Check the data
		console.log(products);

		// Test sorting function (ascending)
        //const sortedAsc = sortProductsByPrice(products, "asc");
        //console.log("Products sorted ascending:", sortedAsc);

        // Test sorting function (descending)
        //const sortedDesc = sortProductsByPrice(products, "desc");
        //console.log("Products sorted descending:", sortedDesc);

		// Sort products by price ascending before rendering
		const sortedProducts = sortProductsByPrice(products, "asc");

		//render products to grid
		renderProducts(sortedProducts);

		const searchInput = document.getElementById("search-products");
		searchInput.addEventListener("input", () => {
			const query = searchInput.value.toLowerCase();
			const filteredProducts = products.filter(product =>
				product.title.toLowerCase().includes(query)
			);
			renderProducts(filteredProducts);
		})

	} catch (error) {
		console.error('Failed to fetch proucts:', error);
	}
}
/**
 * Sorts an array of products by price in ascending or descending order.
 *
 * Your task is to refactor and improve this function:
 * - Make it clean, modern, and readable.
 * - Allow sorting in either "asc" or "desc" order using the `sortOrder` parameter.
 * - Ensure the output remains the same.
 * - A plus, but you do not need to use the messyFunction() function.
 *
 * Requirements:
 * - Refactor the code to use modern JavaScript syntax and best practices.
 * - Rename variables and functions to be more descriptive.
 * - Fill in the missing parts of the JSDoc comments.
 *
 * Feel free to leave comments explaining your thought process.
 *
 * @param {Array} products - Array of product objects, each with a `price` property.
 * @param {string} sortOrder - Either "asc" for ascending or "desc" for descending sort order.
 * @returns {Array} - A new array of products sorted by price in the specified order.
 */

function renderProducts(products) {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = ""; // clear any existing content

    products.forEach(product => { //loops through each product
        // Use the 'src' property of the first image
        const imageUrl = product.images && product.images.length ? product.images[0].src : ""; //checks if product has an image array and if its not empty, grabs src from first item in array

        const card = document.createElement("div"); //creating the new card 
        card.className = "product-card"; // assign the card a class and give it the name "product-card"

        card.innerHTML = ` 
            <img src="${imageUrl}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${(product.price / 100).toFixed(2)}</p>
        `; // create html for inner of the card img - title - price 

        grid.appendChild(card); // adds the card as a child of the grid container 
    });
}

function sortProductsByPrice(products, sortOrder = "asc") {
	return [...products].sort((a, b) => //use spread operator to get a copy of all the products 
		sortOrder === "asc" ? a.price - b.price : b.price - a.price // algorithm for asc abd desc sort defaults to asc
		// Ex:asc sort a.price = 1000, b.price = 2000 → 1000 - 2000 = -100 → a comes before b 
		// Ex:desc sort a.price = 1000, b.price = 2000 → 2000 - 1000 = 100 → b comes before a 
	);
}

function messyFunction(data1, data2) {
	let t = [];
	for (let i = 0; i < data1.length; i++) {
		t.push(data1[i]);
	}
	for (let i = 0; i < t.length; i++) {
		for (let j = i + 1; j < t.length; j++) {
			if ((data2 === "asc" && t[i].price > t[j].price) || (data2 === "desc" && t[i].price < t[j].price)) {
				let tmp = t[i];
				t[i] = t[j];
				t[j] = tmp;
			}
		}
	}
	return t;
}
