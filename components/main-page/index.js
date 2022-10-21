const newsSection = document.querySelector(".news");
const tabsContainer = newsSection.querySelector(".news__years");
const yearTabs = newsSection.querySelectorAll(".news__tab");
const newsPosts = newsSection.querySelector(".news__posts");
const yearsCardsContainers = newsSection.querySelectorAll(".news__years-cards");
const yearsArrows = newsSection.querySelectorAll(".news__arrow_years");
const yearsMobileSlider = newsSection.querySelector(".news__years_slider");
const currentYear = "2022";
let currentActiveGroup = 0;

initialTab();

function initialTab() {
	yearTabs.forEach((tab) => {
		tab.dataset.year === currentYear ? tab.classList.add("news__tab_active") : false;
	});
	yearsCardsContainers.forEach((container) => {
		container.dataset.year === currentYear ? (container.classList.add("news__years-cards_active"), paginationInit(container)) : false;
	});
	setEventListeners();
}

function setEventListeners() {
	yearTabs.forEach((tab) => {
		const tabYear = tab.dataset.year;
		tab.addEventListener("click", () => {
			changeTab(tab);
			changeNews(tabYear);
		});
	});
}

function changeTab(tab) {
	tabsContainer.querySelector(".news__tab_active").classList.remove("news__tab_active");
	tab.classList.add("news__tab_active");
}

function changeNews(tabYear) {
	newsPosts.querySelector(".news__years-cards_active").classList.remove("news__years-cards_active");
	yearsCardsContainers.forEach((container) => {
		container.dataset.year !== tabYear ? true : (container.classList.add("news__years-cards_active"), paginationInit(container));
	});
}

function paginationInit(container) {
	if (container.dataset.paginationInit === "true") {
		return;
	}
	const pagination = container.querySelector(".news__pagination");
	const paginationPages = pagination.querySelector(".news__pages");
	const containerNews = container.querySelectorAll(".news__card");
	const nextBtn = pagination.querySelector(".news__arrow_right");
	const prevBtn = pagination.querySelector(".news__arrow_left");
	let maxNewsPerPage = 0;

	container.querySelector(".news__cards_horizontal") ? (maxNewsPerPage = 10) : (maxNewsPerPage = 6);

	if (containerNews.length > maxNewsPerPage) {
		pagination.classList.add("news__pagination_visible");
		paginationPages.textContent = "";
		let group = 1;
		let i = 0;
		let counter = 0;
		while (containerNews.length) {
			containerNews[i].classList.remove("news__card_visible");
			containerNews[i].dataset.group = `${group}`;
			counter++;
			i++;

			if (counter > maxNewsPerPage - 1) {
				const paginationPageLayout = `<button class="news__page-btn news__page-btn-${group}" data-group=${group}>${group}</button>`;
				paginationPages.insertAdjacentHTML("beforeEnd", paginationPageLayout);
				group++;
				counter = 0;
			}
			if (i === containerNews.length) {
				if (!paginationPages.querySelector(`.news__page-btn-${group}`)) {
					const paginationPageLayout = `<button class="news__page-btn news__page-btn-${group}" data-group=${group}>${group}</button>`;
					paginationPages.insertAdjacentHTML("beforeEnd", paginationPageLayout);
				}
				break;
			}
		}

		const pages = paginationPages.querySelectorAll(".news__page-btn");
		pages.forEach((btn) => {
			btn.addEventListener("click", () => {
				changePage(btn);
			});
		});
		prevBtn.addEventListener("click", () => {
			changePage(prevBtn);
		});
		nextBtn.addEventListener("click", () => {
			changePage(nextBtn);
		});

		function changePage(btn) {
			const btnGroup = btn.dataset.group;
			containerNews.forEach((card) => {
				card.dataset.group === btnGroup ? card.classList.add("news__card_visible") : card.classList.remove("news__card_visible");
			});

			currentActiveGroup = btnGroup;

			changePageBtn(btn);

			prevBtn.dataset.group = `${Number(btnGroup) - 1}`;
			nextBtn.dataset.group = `${Number(btnGroup) + 1}`;
			prevBtn.classList.remove("news__arrow_disabled");
			nextBtn.classList.remove("news__arrow_disabled");
			if (prevBtn.dataset.group < 1) {
				prevBtn.classList.add("news__arrow_disabled");
			}
			if (nextBtn.dataset.group > group) {
				nextBtn.classList.add("news__arrow_disabled");
			}
		}

		function changePageBtn(btn) {
			const btnGroup = btn.dataset.group;
			pages.forEach((button) => {
				button.dataset.group === btnGroup ? button.classList.add("news__page-btn_active") : button.classList.remove("news__page-btn_active");
			});
		}

		changePage(pages[0]);
		container.dataset.paginationInit = "true";
	} else {
		containerNews.forEach((card) => {
			card.classList.add("news__card_visible");
		});
	}
}

const yearsSlider = new Swiper(".swiper", {
	direction: "horizontal",
	navigation: {
		nextEl: ".years__arrow_right",
		prevEl: ".years__arrow_left",
	},
	loop: false,
	slideToClickedSlide: true,
	preventClicks: true,
	breakpoints: {
		320: {
			slidesPerView: 3,
			spaceBetween: 12,
		},
		769: {
			spaceBetween: 24,
		},
		870: {
			spaceBetween: 24,
		},
		1007: {
			spaceBetween: 24,
			slidesPerView: 3,
		},
	},
});
