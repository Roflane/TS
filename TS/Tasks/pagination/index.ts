let currentPage = 1;
let totalPages = 1;
let secret: string = '';

function createPopupWindow(item: any) {
    if (document.querySelector(".window-overlay")) return;

    const overlay = document.createElement("div");
    overlay.classList.add("window-overlay");

    const windowEl = document.createElement("div");
    windowEl.classList.add("window");

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("window-close");
    closeBtn.textContent = "×";
    closeBtn.onclick = () => overlay.remove();

    const image = document.createElement("img");
    image.src = item.Poster !== "N/A" ? item.Poster : "";
    image.classList.add("window-book-image");

    const info = document.createElement("div");
    info.classList.add("window-info");

    const title = document.createElement("h2");
    title.textContent = item.Title;
    title.classList.add("window-book-title");

    const type = document.createElement("p");
    type.textContent = `Type: ${item.Type}`;
    type.classList.add("window-book-type");

    const year = document.createElement("p");
    year.textContent = `Year: ${item.Year}`;
    year.classList.add("window-book-year");

    info.append(title, type, year);
    windowEl.append(closeBtn, image, info);
    overlay.appendChild(windowEl);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
    });

    document.body.appendChild(overlay);
}
function makeBook(data: any) {
    if (!data) return;
    const wrapper = document.querySelector('.books-wrapper');
    if (!wrapper) return;

    wrapper.innerHTML = '';

    data.Search.forEach((item: any) => {
        const book_container = document.createElement("div");
        book_container.classList.add("books-container");

        const image = document.createElement("img");
        image.src = item.Poster !== "N/A" ? item.Poster : "";
        image.classList.add("book-image");

        const type = document.createElement("a");
        type.textContent = item.Type;
        type.classList.add("book-type");

        const title = document.createElement("a");
        title.textContent = item.Title;
        title.classList.add("book-title");

        const year = document.createElement("a");
        year.textContent = item.Year;
        year.classList.add("book-year");

        const details = document.createElement("button");
        details.textContent = "Details";
        details.classList.add("button-details");
        details.onclick = () => createPopupWindow(item);

        book_container.append(image, title, type, year, details);
        wrapper.appendChild(book_container);
    });
}

function getInfo(page = 1): string | null {
    const titleInput = document.querySelector<HTMLInputElement>('#title-data');
    const typeInput = document.querySelector<HTMLInputElement>('#type-data');
    if (!titleInput || !typeInput || titleInput.value.trim() === "") return null;
    return `https://www.omdbapi.com/?s=${titleInput.value}&t=${typeInput.value}&page=${page}&apikey=${secret}`;
}

function updatePaginationButtons() {
    const prevBtn = document.querySelector<HTMLButtonElement>("#prev-page");
    const nextBtn = document.querySelector<HTMLButtonElement>("#next-page");
    const pageLabel = document.querySelector<HTMLSpanElement>("#page-label");

    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
    if (pageLabel) pageLabel.textContent = `Page ${currentPage} of ${totalPages}`;
}

async function fetchData(page = 1) {
    const info = getInfo(page);
    if (!info) return;

    const res = await fetch(info);
    const jsonData = await res.json();

    if (jsonData.Response === "False") {
        alert(jsonData.Error);
        return;
    }

    totalPages = Math.ceil(jsonData.totalResults / 10);
    makeBook(jsonData);
    updatePaginationButtons();
}


(() => {
    const searchButton = document.querySelector<HTMLButtonElement>('#search-button');
    const prevBtn = document.querySelector<HTMLButtonElement>("#prev-page");
    const nextBtn = document.querySelector<HTMLButtonElement>("#next-page");

    if (!searchButton) return;

    searchButton.addEventListener("click", async () => {
        currentPage = 1;
        await fetchData(currentPage);
    });

    if (prevBtn) {
        prevBtn.addEventListener("click", async () => {
            if (currentPage > 1) {
                currentPage--;
                await fetchData(currentPage);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", async () => {
            if (currentPage < totalPages) {
                currentPage++;
                await fetchData(currentPage);
            }
        });
    }
})();