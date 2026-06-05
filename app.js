(function () {
  const productData = window.WALL_KING_PRODUCTS || [];
  const currentPage = document.body.dataset.page || "";
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.getElementById("siteNav");
  const roomData = [
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Bathroom",
    "Dining Room",
    "Children's Room",
    "Hallway",
    "Home Office"
  ];
  const paletteData = [
    { name: "Soft Sand", mood: "Warm neutral comfort", color: "#ead9bf" },
    { name: "Morning Sky", mood: "Open and airy calm", color: "#bfdcf3" },
    { name: "Leaf Mist", mood: "Fresh everyday ease", color: "#cedfce" },
    { name: "Clay Glow", mood: "Inviting accent warmth", color: "#dfac81" }
  ];
  const adviceData = [
    {
      tag: "Choosing colour",
      title: "Use lighter tones to help compact rooms feel more open.",
      copy: "Soft neutrals and clear off-whites reflect light better and make everyday family spaces feel more generous."
    },
    {
      tag: "Prep first",
      title: "A better finish usually starts before the finish coat.",
      copy: "Primer and putty help walls level out, hold colour more evenly, and improve the final look of emulsion coats."
    },
    {
      tag: "Exterior care",
      title: "Match outside walls with a system that can handle weather shifts.",
      copy: "Exterior primer plus exterior emulsion gives better hold for surfaces facing sun, rain, and dust exposure."
    }
  ];

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
          <a class="text-link" href="product.html?slug=${product.slug}">View details</a>
        </div>
      </article>
    `;
  }

  function renderHomePage() {
    const heroSignatureProduct = document.getElementById("heroSignatureProduct");
    const featuredShowcase = document.getElementById("featuredShowcase");
    const roomChips = document.getElementById("roomChips");
    const swatchGrid = document.getElementById("swatchGrid");
    const adviceGrid = document.getElementById("adviceGrid");
    const signatureProduct = productData.find((product) => product.slug === "interior-emulsion") || productData[0];

    if (heroSignatureProduct && signatureProduct) {
      heroSignatureProduct.innerHTML = `
        <article class="signature-card">
          <img src="${signatureProduct.image}" alt="${signatureProduct.name}">
          <div>
            <span class="pill">${signatureProduct.category}</span>
            <h3>${signatureProduct.name}</h3>
            <p>${signatureProduct.shortCopy}</p>
          </div>
        </article>
      `;
    }

    if (roomChips) {
      roomChips.innerHTML = roomData.map((room) => `
        <a class="room-chip" href="products.html?filter=${room === "Bathroom" ? "exterior" : "interior"}">${room}</a>
      `).join("");
    }

    if (swatchGrid) {
      swatchGrid.innerHTML = paletteData.map((swatch) => `
        <article class="swatch-card">
          <div class="swatch-card__tone" style="background:${swatch.color};"></div>
          <div class="swatch-card__label">
            <strong>${swatch.name}</strong>
            <span>${swatch.mood}</span>
          </div>
        </article>
      `).join("");
    }

    if (featuredShowcase) {
      featuredShowcase.innerHTML = productData.slice(0, 3).map((product, index) => `
        <article class="showcase-card showcase-card--${index === 0 ? "primary" : "secondary"}">
          <a class="showcase-card__media" href="product.html?slug=${product.slug}">
            <img src="${product.image}" alt="${product.name}">
          </a>
          <div class="showcase-card__body">
            <span class="pill">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.shortCopy}</p>
            <div class="catalog-meta">
              <span>${product.pack}</span>
              <span>${product.finish}</span>
            </div>
            <a class="text-link" href="product.html?slug=${product.slug}">Open product profile</a>
          </div>
        </article>
      `).join("");
    }

    if (adviceGrid) {
      adviceGrid.innerHTML = adviceData.map((item) => `
        <article class="advice-card reveal">
          <span class="advice-card__tag">${item.tag}</span>
          <h3>${item.title}</h3>
          <p>${item.copy}</p>
        </article>
      `).join("");
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

    if (!productRoot || !product) {
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
          <p class="eyebrow">Best for</p>
          <h2>Where this product works best</h2>
          <p>${product.spotlight}</p>
          <ul class="detail-list">
            ${product.features.map((feature) => `<li>${feature}</li>`).join("")}
          </ul>
        </article>

        <article class="detail-panel detail-panel--dark reveal">
          <p class="eyebrow">Technical overview</p>
          <h2>Key specification details</h2>
          <div class="spec-grid">
            <div><span>Pack range</span><strong>${product.pack}</strong></div>
            <div><span>Finish</span><strong>${product.finish}</strong></div>
            <div><span>Surface dry</span><strong>${product.surfaceDry}</strong></div>
            <div><span>Re-coat</span><strong>${product.recoat}</strong></div>
            <div><span>Coverage</span><strong>${product.coverage}</strong></div>
            <div><span>Recommended use</span><strong>${product.recommendedSurface}</strong></div>
          </div>
        </article>
      </section>

      <section class="section-block process-strip reveal">
        <div>
          <p class="eyebrow">How to use it</p>
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
