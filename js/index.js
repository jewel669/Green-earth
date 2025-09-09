
let cart = [];
let total = 0;
let activeCategory = null;

// Load Categories
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => {
      displayLesson(json.categories);
    });
};

// Load Trees by Category
const loadLevelWord = (id, btn) => {
  toggleCardSpinner(true);

  if (activeCategory) activeCategory.classList.remove("bg-green-200");
  btn.classList.add("bg-green-200");
  activeCategory = btn;

  const url = https://openapi.programming-hero.com/api/category/${id};
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCard(data.plants);
      toggleCardSpinner(false);
    })
    .catch((err) => {
      console.error("Error loading data:", err);
      toggleCardSpinner(false);
    });
};

// Load All Trees (used by default)
const loadAllTrees = () => {
  toggleCardSpinner(true);

  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => {
      const allTreePromises = json.categories.map((cat) =>
        fetch(https://openapi.programming-hero.com/api/category/${cat.id}).then((res) => res.json())
      );

      Promise.all(allTreePromises).then((results) => {
        let allTrees = [];
        results.forEach((result) => {
          if (result.plants) {
            allTrees = allTrees.concat(result.plants);
          }
        });

        displayCard(allTrees);
        toggleCardSpinner(false);
      });
    });
};

// {
//     "id": 1,
//     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//     "name": "Mango Tree",
//     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//     "category": "Fruit Tree",
//     "price": 500
// }


const loadWordDetail= async(id) =>{
  const url = https://openapi.programming-hero.com/api/plant/${id};
  const res = await fetch(url);
  const details = await res.json()
  displayWordDetails(details.plants)
};

const displayWordDetails = (word) => {
  console.log(word)
  const detailsBOx = document.getElementById("details-continer");
  detailsBOx.innerHTML = `
    <h2 class="text-2xl font-bold">${word.name}</h2>
      <img class="h-55 w-full rounded-[8px]" src="${word.image}" alt="">
      <h3 class=""><span class="text-[18px] font-bold">Category:</span>${word.category}</h3>
      <h3><span class="text-[18px] font-bold">price:</span>${word.price}</h3>
      <p><span class="text-[18px] font-bold">Description:</span>${word.description}</p>
  `
  document.getElementById("my_modal_5").showModal();
}

// Display Cards
const displayCard = (trees) => {
  const wordContiner = document.getElementById("word-container");
  wordContiner.innerHTML = "";

  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white p-4 space-y-3 shadow rounded">
        <div class="flex items-center justify-center">
          <img class="h-55 w-full rounded-[8px]" src="${tree.image}" alt="">
        </div>
        <h3 onclick="loadWordDetail(${tree.id})" class="text-[14px] font-semibold">${tree.name}</h3>
        <p class="text-[#71717A] text-[12px]">${tree.description}</p>
        <div class="flex justify-between">
          <span class="py-1 px-3 bg-[#DCFCE7] text-[14px] font-medium rounded-[400px]">${tree.category}</span>
          <p class="text-[14px] font-semibold">৳${tree.price}</p>
        </div>
        <button onclick="addToCart('${tree.name}', ${tree.price})" 
          class="bg-[#15803D] text-[16px] font-medium rounded-[999px] px-5 py-3 w-full">
          Add to Cart
        </button>
      </div>
    `;
    wordContiner.append(card);
  });
};

// Add to Cart
const addToCart = (name, price) => {
  cart.push({ name, price });
  total += price;
  updateCart();
};

// Remove from Cart
const removeFromCart = (index) => {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
};

// Update Cart Display
const updateCart = () => {
  const cartContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");
  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("div");
    li.className = "flex justify-between bg-green-50 p-2 rounded mb-2";
    li.innerHTML = `
      <span class="font-medium">${item.name}</span>
      <span>৳${item.price} × 1</span>
      <button onclick="removeFromCart(${index})" class="text-red-500">❌</button>
    `;
    cartContainer.append(li);
  });

  totalContainer.innerText = ${total};
}; 

// Spinner only for Card Section (overlay on top)
const toggleCardSpinner = (isLoading) => {
  const spinner = document.getElementById("card-spinner");
  spinner.classList.toggle("hidden", !isLoading);
};

// Display Categories
const displayLesson = (lessons) => {
  const categories = document.getElementById("categories-item");
  categories.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button onclick="loadLevelWord(${lesson.id}, this)" 
        class="block w-full text-left px-3 py-2 rounded hover:bg-green-100 text-[16px] font-medium transition">
        ${lesson.category_name}
      </button>
    `;
    categories.append(btnDiv);
  }
};

// প্রথমেই সব গাছ দেখাবে
loadLessons();
loadAllTrees();