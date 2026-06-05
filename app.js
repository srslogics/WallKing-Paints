(function () {
  const productData = window.WALL_KING_PRODUCTS || [];
  const currentPage = document.body.dataset.page || "";
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.getElementById("siteNav");

  function setupMenu() {
    if (!menuToggle || !siteNav) {
      return;
    }

    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function highlightNav() {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === currentPage) {
        link.classList.add("is-current");
      }
    });
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function productCardMarkup(product, compact) {
    const classes = compact ? "catalog-card catalog-card--compact" : "catalog-card";
    return `
      <article class="${classes}">
        <a class="catalog-card__media" href="product.html?slug=${product.slug}">
          <img src="${product.image}" alt="${product.name}">
        </a>
        <div class="catalog-card__body">
          <span class="pill">${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.shortCopy}</p>
          <div class="catalog-meta">
            <span>${product.pack}</span>
            <span>${product.finish}</span>
          </div>
          <a class="text-link" href="product.html?slug=${product.slug}">Open product page</a>
        </div>
      </article>
    `;
  }

  function renderHomePage() {
    const heroMosaic = document.getElementById("heroMosaic");
    const featuredProducts = document.getElementById("featuredProducts");

    if (heroMosaic) {
      heroMosaic.innerHTML = productData.slice(0, 3).map((product) => `
        <article class="mosaic-card">
          <img src="${product.image}" alt="${product.name}">
          <span>${product.name}</span>
        </article>
      `).join("");
    }

    if (featuredProducts) {
      featuredProducts.innerHTML = productData.slice(0, 4).map((product) => productCardMarkup(product, true)).join("");
    }
  }

  function renderProductsPage() {
    const productsGrid = document.getElementById("productsGrid");
    const productsSummary = document.getElementById("productsSummary");
    const filterButtons = document.querySelectorAll("[data-filter]");

    if (!productsGrid) {
      return;
    }

    const requestedFilter = getQueryParam("filter");
    let activeFilter = requestedFilter || "all";

    function matchesFilter(product) {
      if (activeFilter === "all") {
        return true;
      }
      return product.family === activeFilter;
    }

    function updateProducts() {
      const filtered = productData.filter(matchesFilter);

      productsGrid.innerHTML = filtered.map((product) => productCardMarkup(product, false)).join("");

      if (productsSummary) {
        productsSummary.textContent = `${filtered.length} products shown`;
      }

      filterButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.filter === activeFilter);
      });
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        updateProducts();
      });
    });

    updateProducts();
  }

  function renderProductPage() {
    const slug = getQueryParam("slug") || "interior-emulsion";
    const product = productData.find((item) => item.slug === slug) || productData[0];
    const productRoot = document.getElementById("productPage");
    const relatedRoot = document.getElementById("relatedProducts");

    if (!productRoot) {
      return;
    }

    document.title = `${product.name} | Wall King Paints`;

    productRoot.innerHTML = `
      <section class="product-hero reveal">
        <div class="product-hero__copy">
          <p class="eyebrow">${product.category}</p>
          <h1>${product.name}</h1>
          <p class="lead">${product.longCopy}</p>
          <div class="catalog-meta">
            <span>${product.pack}</span>
            <span>${product.finish}</span>
            <span>${product.recoat}</span>
          </div>
        </div>
        <div class="product-hero__visual">
          <div class="product-visual-card">
            <img src="${product.image}" alt="${product.name}">
          </div>
        </div>
      </section>

      <section class="product-layout">
        <article class="detail-panel reveal">
          <p class="eyebrow">Application Story</p>
          <h2>Where this product fits</h2>
          <p>${product.spotlight}</p>
          <ul class="detail-list">
            ${product.features.map((feature) => `<li>${feature}</li>`).join("")}
          </ul>
        </article>

        <article class="detail-panel detail-panel--dark reveal">
          <p class="eyebrow">Key Specs</p>
          <h2>Technical snapshot</h2>
          <div class="spec-grid">
            <div><span>Pack Range</span><strong>${product.pack}</strong></div>
            <div><span>Finish</span><strong>${product.finish}</strong></div>
            <div><span>Surface Dry</span><strong>${product.surfaceDry}</strong></div>
            <div><span>Re-Coat</span><strong>${product.recoat}</strong></div>
            <div><span>Coverage</span><strong>${product.coverage}</strong></div>
            <div><span>Recommended Use</span><strong>${product.recommendedSurface}</strong></div>
          </div>
        </article>
      </section>

      <section class="section-block process-strip reveal">
        <div>
          <p class="eyebrow">Use Case</p>
          <h2>${product.processTitle}</h2>
        </div>
        <ol class="process-list">
          ${product.process.map((step) => `<li>${step}</li>`).join("")}
        </ol>
      </section>
    `;

    if (relatedRoot) {
      const related = productData.filter((item) => item.slug !== product.slug).slice(0, 3);
      relatedRoot.innerHTML = related.map((item) => productCardMarkup(item, true)).join("");
    }
  }

  setupMenu();
  highlightNav();
  renderHomePage();
  renderProductsPage();
  renderProductPage();
})();
