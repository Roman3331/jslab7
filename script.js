document.addEventListener('DOMContentLoaded', () => {
    loadCategories();

    document.getElementById('homeLink').addEventListener('click', (e) => {
        e.preventDefault();
        loadCategories();
    });

    document.getElementById('catalogLink').addEventListener('click', (e) => {
        e.preventDefault();
        loadCategories();
    });
});

async function loadCategories() {
    try {
        const response = await fetch('data/categories.json');
        const categoriesData = await response.json();
        const content = document.getElementById('content');
        content.innerHTML = `
            <h2 class="text-2xl font-bold mb-4 col-span-full">Каталог</h2>
        `;

        categoriesData.categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `
                <a href="#" data-shortname="${category.shortname}" class="category-link text-blue-600 hover:underline">${category.name}</a>
                <p class="text-gray-600">${category.notes || 'Немає приміток'}</p>
            `;
            content.appendChild(categoryDiv);
        });

        const specialsDiv = document.createElement('div');
        specialsDiv.innerHTML = `
            <a href="#" id="specialsLink" class="text-blue-600 hover:underline">Specials</a>
        `;
        content.appendChild(specialsDiv);

        document.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadCategory(e.target.dataset.shortname);
            });
        });

        document.getElementById('specialsLink').addEventListener('click', async (e) => {
            e.preventDefault();
            const response = await fetch('data/categories.json');
            const categoriesData = await response.json();
            const randomCategory = categoriesData.categories[Math.floor(Math.random() * categoriesData.categories.length)].shortname;
            loadCategory(randomCategory);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

async function loadCategory(shortname) {
    try {
        const response = await fetch(`data/${shortname}.json`);
        const categoryData = await response.json();
        const content = document.getElementById('content');
        content.innerHTML = `
            <h2 class="text-2xl font-bold mb-4 col-span-full">${categoryData.categoryName}</h2>
        `;

        categoryData.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'bg-white p-4 rounded shadow';
            itemDiv.innerHTML = `
                <img src="https://place-hold.it/200x200" alt="${item.name}" class="w-full h-48 object-cover mb-2">
                <h3 class="text-lg font-semibold">${item.name}</h3>
                <p class="text-gray-600">${item.description}</p>
                <p class="text-green-600 font-bold">$${item.price.toFixed(2)}</p>
            `;
            content.appendChild(itemDiv);
        });
    } catch (error) {
        console.error('Error loading category:', error);
    }
}