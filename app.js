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
  const systemData = [
    {
      step: "01",
      title: "Prepare the base",
      copy: "Start with primer and putty so the wall reads smoother and the final finish feels more premium."
    },
    {
      step: "02",
      title: "Choose the finish",
      copy: "Select the top coat by room use, durability needs, sheen preference, and budget comfort."
    },
    {
      step: "03",
      title: "Protect the result",
      copy: "Use the right exterior system and drying rhythm so the finish holds better in real site conditions."
    }
  ];
  const colourGuideData = [
    {
      title: "Living Room",
      copy: "Balanced shades for everyday hosting spaces, feature walls, and family-first interiors.",
      swatches: ["Soft Sand", "Morning Sky", "Clay Glow"],
      heroColor: "#9c907d",
      accentColor: "#245bb2",
      code: "WK-LR-102"
    },
    {
      title: "Bedroom",
      copy: "Quieter, softer tones for rooms that should feel restful and calm at the end of the day.",
      swatches: ["Leaf Mist", "Morning Sky", "Soft Sand"],
      heroColor: "#aebda2",
      accentColor: "#245bb2",
      code: "WK-BR-208"
    },
    {
      title: "Kitchen",
      copy: "Cleaner, fresher tones that help high-use spaces feel brighter and more active.",
      swatches: ["Morning Sky", "Soft Sand", "Leaf Mist"],
      heroColor: "#d9d6c9",
      accentColor: "#245bb2",
      code: "WK-KT-316"
    },
    {
      title: "Exterior",
      copy: "Confident facade shades that hold presence from the street and pair with weather-facing systems.",
      swatches: ["Clay Glow", "Soft Sand", "Morning Sky"],
      heroColor: "#d59f69",
      accentColor: "#245bb2",
      code: "WK-EX-411"
    }
  ];
  const categoryData = [
    {
      title: "Interior Paints",
      filter: "interior",
      description: "Premium and decorative finishes for living rooms, bedrooms, and everyday walls."
    },
    {
      title: "Exterior Paints",
      filter: "exterior",
      description: "Weather-facing coatings built for stronger facade appearance and outdoor durability."
    },
    {
      title: "Waterproofing",
      filter: "waterproofing",
      description: "Protection systems for damp surfaces, terraces, and heat-reduction requirements."
    },
    {
      title: "Primers & Putties",
      filter: "preparation",
      description: "Preparation products for smoother surfaces, stronger bonding, and better final finish."
    }
  ];
  const categoryStoryData = [
    {
      title: "Interior Paints",
      filter: "interior",
      eyebrow: "Decorative finishes",
      copy: "Choose interior emulsions when the requirement is smoother walls, richer room presentation, and a more polished everyday finish.",
      linkLabel: "Explore interior range"
    },
    {
      title: "Exterior Paints",
      filter: "exterior",
      eyebrow: "Facade protection",
      copy: "Use exterior coatings for outside walls that need better visual presence and stronger performance against sun, dust, and weather exposure.",
      linkLabel: "Explore exterior range"
    },
    {
      title: "Waterproofing",
      filter: "waterproofing",
      eyebrow: "Damp and seepage care",
      copy: "Build a stronger protection story with waterproofing-led products for terraces, moisture-facing surfaces, and high-risk seepage areas.",
      linkLabel: "Explore waterproofing"
    },
    {
      title: "Primers and Preparation",
      filter: "preparation",
      eyebrow: "Surface preparation",
      copy: "Start with primers, putties, and repair products to help the final paint layer look better and hold more evenly.",
      linkLabel: "Explore preparation"
    }
  ];
  const journalData = [
    {
      tag: "Interior Guide",
      title: "Choose interior emulsions after the surface feels properly prepared.",
      copy: "Start with primer and putty, then move into an interior finish that suits the room's lighting, daily use, and cleaning needs."
    },
    {
      tag: "Exterior Guide",
      title: "Choose exterior systems that stay clearer through sun, rain, and dust.",
      copy: "For outside walls, match the base preparation and top coat properly so the finish holds colour and reads sharper from the street."
    },
    {
      tag: "Waterproofing Guide",
      title: "Choose waterproofing first when damp protection matters more than colour.",
      copy: "Use a protection-led system when terraces, seepage-prone walls, or moisture-heavy areas need stronger defense before decoration."
    }
  ];
  const heroCampaignData = {
    "elasto-shield": {
      title: "Elasto Shield Waterproofing",
      subtitle: "Protection for terraces, damp-prone surfaces, and heat-exposed areas.",
      heroBackground: "linear-gradient(90deg, #d4e8fd 0%, #d4e8fd 56%, #eaf3fe 56%, #eaf3fe 84%, #c8dcf6 84%, #c8dcf6 100%)",
      packPanel: "linear-gradient(90deg, #d4e8fd 0%, #d4e8fd 28%, #edf5ff 28%, #edf5ff 78%, #d2d2d2 78%, #d2d2d2 100%)",
      packGlow: "rgba(126, 176, 236, 0.14)"
    },
    "interior-silky-shiny": {
      title: "Silky Shiny Interior Emulsion",
      subtitle: "A smoother decorative finish for brighter, more polished interiors.",
      heroBackground: "linear-gradient(90deg, #dfeafc 0%, #dfeafc 20%, #eff5ff 20%, #eff5ff 78%, #4c74cf 78%, #4c74cf 100%)",
      packPanel: "linear-gradient(90deg, #dfeafc 0%, #dfeafc 24%, #eff5ff 24%, #eff5ff 74%, #4c74cf 74%, #4c74cf 100%)",
      packGlow: "rgba(89, 134, 214, 0.12)"
    },
    "perfect-exterior-emulsion": {
      title: "Perfect Exterior Premium Emulsion",
      subtitle: "Help outside walls hold colour and presence from the street.",
      heroBackground: "linear-gradient(90deg, #d7e7fc 0%, #d7e7fc 41%, #eef5fd 41%, #eef5fd 90%, #4677d6 90%, #4677d6 100%)",
      packPanel: "linear-gradient(90deg, #d7e7fc 0%, #d7e7fc 26%, #eef5fd 26%, #eef5fd 84%, #4677d6 84%, #4677d6 100%)",
      packGlow: "rgba(89, 134, 214, 0.12)"
    },
    "prince-primer": {
      title: "Prince Universal Primer 2 in 1",
      subtitle: "A versatile base coat for interior and exterior finishing systems.",
      heroBackground: "linear-gradient(90deg, #dff3ff 0%, #dff3ff 26%, #f3fbff 26%, #f3fbff 82%, #c5c5c5 82%, #c5c5c5 100%)",
      packPanel: "linear-gradient(90deg, #dff3ff 0%, #dff3ff 18%, #f3fbff 18%, #f3fbff 72%, #c5c5c5 72%, #c5c5c5 100%)",
      packGlow: "rgba(103, 183, 214, 0.10)"
    }
  };

  const productVisualThemes = {
    "interior-silky-shiny": {
      cardSurface: "linear-gradient(180deg, #617fd3 0%, #617fd3 70%, #5574c8 70%, #5574c8 100%)",
      railSurface: "#617fd3",
      detailSurface: "linear-gradient(180deg, #eff3fb 0%, #e7edf9 100%)",
      categoryStage: "linear-gradient(180deg, #eef3ff 0%, #e4ebfb 100%)",
      categoryVisual: "linear-gradient(180deg, rgba(97, 127, 211, 0.96) 0%, rgba(97, 127, 211, 0.96) 70%, rgba(85, 116, 200, 0.96) 70%, rgba(85, 116, 200, 0.96) 100%)",
      shadow: "rgba(48, 74, 129, 0.18)"
    },
    "perfect-exterior-emulsion": {
      cardSurface: "linear-gradient(180deg, #5d7fd1 0%, #5d7fd1 70%, #5274c7 70%, #5274c7 100%)",
      railSurface: "#5d7fd1",
      detailSurface: "linear-gradient(180deg, #edf2fb 0%, #e4ebf8 100%)",
      categoryStage: "linear-gradient(180deg, #e8eefc 0%, #dde6fb 100%)",
      categoryVisual: "linear-gradient(180deg, rgba(93, 127, 209, 0.96) 0%, rgba(93, 127, 209, 0.96) 70%, rgba(82, 116, 199, 0.96) 70%, rgba(82, 116, 199, 0.96) 100%)",
      shadow: "rgba(48, 74, 129, 0.18)"
    },
    "elasto-shield": {
      cardSurface: "linear-gradient(180deg, #efefef 0%, #efefef 74%, #dcd6cf 74%, #dcd6cf 100%)",
      railSurface: "#efefef",
      detailSurface: "linear-gradient(180deg, #f3f4f5 0%, #ece9e4 100%)",
      categoryStage: "linear-gradient(180deg, #f2f3f5 0%, #eaedf1 100%)",
      categoryVisual: "linear-gradient(180deg, rgba(239, 239, 239, 0.96) 0%, rgba(239, 239, 239, 0.96) 74%, rgba(220, 214, 207, 0.96) 74%, rgba(220, 214, 207, 0.96) 100%)",
      shadow: "rgba(104, 97, 89, 0.16)"
    },
    "prince-primer": {
      cardSurface: "linear-gradient(180deg, #d3d3d3 0%, #d3d3d3 100%)",
      railSurface: "#d3d3d3",
      detailSurface: "linear-gradient(180deg, #edf4fc 0%, #e5edf7 100%)",
      categoryStage: "linear-gradient(180deg, #eef3fb 0%, #e6edf7 100%)",
      categoryVisual: "linear-gradient(180deg, rgba(211, 211, 211, 0.96) 0%, rgba(211, 211, 211, 0.96) 100%)",
      shadow: "rgba(107, 107, 107, 0.14)"
    },
    "damp-care-putty": {
      cardSurface: "linear-gradient(180deg, #dff1ff 0%, #dff1ff 100%)",
      railSurface: "#dff1ff",
      detailSurface: "linear-gradient(180deg, #f4f8fc 0%, #edf2f7 100%)",
      shadow: "rgba(79, 123, 156, 0.12)"
    },
    "tile-adhesive": {
      cardSurface: "linear-gradient(180deg, #efefef 0%, #efefef 100%)",
      railSurface: "#efefef",
      detailSurface: "linear-gradient(180deg, #f3f4f6 0%, #eceef1 100%)",
      shadow: "rgba(113, 113, 113, 0.14)"
    },
    "prince-enamel": {
      cardSurface: "linear-gradient(180deg, #d8d8d8 0%, #d8d8d8 100%)",
      railSurface: "#d8d8d8",
      detailSurface: "linear-gradient(180deg, #f2f2f2 0%, #ebebeb 100%)",
      shadow: "rgba(113, 113, 113, 0.14)"
    },
    "latex-polymer-sbr": {
      cardSurface: "linear-gradient(180deg, #f4f4f1 0%, #f4f4f1 100%)",
      railSurface: "#f4f4f1",
      detailSurface: "linear-gradient(180deg, #f6f7f5 0%, #f0f1ef 100%)",
      shadow: "rgba(123, 118, 109, 0.12)"
    },
    "crack-filler": {
      cardSurface: "linear-gradient(180deg, #f6f1e7 0%, #f6f1e7 100%)",
      railSurface: "#f6f1e7",
      detailSurface: "linear-gradient(180deg, #f8f5ee 0%, #f2ede4 100%)",
      shadow: "rgba(146, 125, 92, 0.12)"
    }
  };

  function getProductTheme(product) {
    if (!product) {
      return {
        cardSurface: "linear-gradient(180deg, #eef3fb 0%, #eef3fb 100%)",
        railSurface: "#eef3fb",
        detailSurface: "linear-gradient(180deg, #f6f8fb 0%, #eef2f7 100%)",
        categoryStage: "linear-gradient(180deg, #eef3fb 0%, #e5ebf7 100%)",
        categoryVisual: "linear-gradient(180deg, rgba(111, 138, 197, 0.3) 0%, rgba(111, 138, 197, 0.3) 100%)",
        shadow: "rgba(48, 74, 129, 0.14)"
      };
    }

    return productVisualThemes[product.slug] || {
      cardSurface: "linear-gradient(180deg, #eef3fb 0%, #eef3fb 100%)",
      railSurface: "#eef3fb",
      detailSurface: "linear-gradient(180deg, #f6f8fb 0%, #eef2f7 100%)",
      categoryStage: "linear-gradient(180deg, #eef3fb 0%, #e5ebf7 100%)",
      categoryVisual: "linear-gradient(180deg, rgba(111, 138, 197, 0.3) 0%, rgba(111, 138, 197, 0.3) 100%)",
      shadow: "rgba(48, 74, 129, 0.14)"
    };
  }

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
    const theme = getProductTheme(product);

    return `
      <article class="${classes}">
        <a class="catalog-card__media" href="product.html?slug=${product.slug}" style="--media-surface:${theme.cardSurface}; --media-shadow:${theme.shadow};">
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
    const heroSlider = document.getElementById("heroSlider");
    const heroSliderDots = document.getElementById("heroSliderDots");
    const categoryFeature = document.getElementById("categoryFeature");
    const colourGuideTiles = document.getElementById("colourGuideTiles");
    const colourGuideTitle = document.getElementById("colourGuideTitle");
    const colourGuideCopy = document.getElementById("colourGuideCopy");
    const colourGuideName = document.getElementById("colourGuideName");
    const colourGuideCode = document.getElementById("colourGuideCode");
    const colourGuidePaletteDots = document.getElementById("colourGuidePaletteDots");
    const colourGuideSwatches = document.getElementById("colourGuideSwatches");
    const colourRoomPreview = document.getElementById("colourRoomPreview");
    const journalGrid = document.getElementById("journalGrid");
    const heroPackshot = document.getElementById("heroPackshot");
    const heroTitle = document.getElementById("heroTitle");
    const heroSubtitle = document.getElementById("heroSubtitle");
    const heroRoot = document.querySelector(".indigo-hero");
    const heroProducts = [
      "elasto-shield",
      "interior-silky-shiny",
      "perfect-exterior-emulsion",
      "prince-primer"
    ].map((slug) => productData.find((product) => product.slug === slug)).filter(Boolean);
    let activeHeroIndex = 0;

    function heroCardMarkup(product) {
      return "";
    }

    function renderHeroSlide() {
      if (!heroSlider || heroProducts.length === 0) {
        return;
      }

      heroSlider.innerHTML = heroCardMarkup(heroProducts[activeHeroIndex]);
      if (heroPackshot) {
        heroPackshot.innerHTML = `<img src="${heroProducts[activeHeroIndex].image}" alt="${heroProducts[activeHeroIndex].name}">`;
      }

      if (heroRoot) {
        const campaign = heroCampaignData[heroProducts[activeHeroIndex].slug] || {};
        heroRoot.style.setProperty("--hero-bg", campaign.heroBackground || "linear-gradient(90deg, #d8ebff 0%, #d8ebff 58%, #cfe5fb 58%, #cfe5fb 100%)");
        heroRoot.style.setProperty("--hero-pack-panel", campaign.packPanel || "linear-gradient(180deg, #eef6ff 0%, #d7e9fb 100%)");
        heroRoot.style.setProperty("--hero-pack-glow", campaign.packGlow || "rgba(126, 176, 236, 0.28)");
      }

      if (heroTitle && heroSubtitle) {
        const campaign = heroCampaignData[heroProducts[activeHeroIndex].slug] || {};
        heroTitle.textContent = campaign.title || heroProducts[activeHeroIndex].name;
        heroSubtitle.textContent = campaign.subtitle || heroProducts[activeHeroIndex].shortCopy;
      }

      if (heroSliderDots) {
        heroSliderDots.innerHTML = heroProducts.map((_, index) => `
          <button
            class="hero-dot ${index === activeHeroIndex ? "is-active" : ""}"
            type="button"
            aria-label="Show slide ${index + 1}"
            data-slide-index="${index}"
          ></button>
        `).join("");

        heroSliderDots.querySelectorAll("button").forEach((button) => {
          button.addEventListener("click", () => {
            activeHeroIndex = Number(button.dataset.slideIndex || 0);
            renderHeroSlide();
          });
        });
      }
    }

    if (heroSlider && heroProducts.length > 0) {
      renderHeroSlide();

      if (heroProducts.length > 1) {
        window.setInterval(() => {
          activeHeroIndex = (activeHeroIndex + 1) % heroProducts.length;
          renderHeroSlide();
        }, 3600);
      }
    }

    if (categoryFeature) {
      const categoryFeatureData = [
        {
          title: "Interior Emulsions",
          filter: "interior",
          subtitle: "Bring softer, cleaner room stories to life.",
          copy: "A more premium wall finish story for living rooms, bedrooms, and everyday interior spaces.",
          image: "interior-silky-shiny"
        },
        {
          title: "Exterior Emulsions",
          filter: "exterior",
          subtitle: "Shield and beautify your exteriors.",
          copy: "Stronger-looking facade finishes for weather-facing surfaces that need presence from the street.",
          image: "perfect-exterior-emulsion"
        },
        {
          title: "Waterproofing Systems",
          filter: "waterproofing",
          subtitle: "Protect roofs, terraces, and damp-prone walls.",
          copy: "Performance-led systems positioned around seepage defense, terrace care, heat reduction, and surface protection.",
          image: "elasto-shield"
        },
        {
          title: "Primers & Putties",
          filter: "preparation",
          subtitle: "Start with a stronger surface before the top coat.",
          copy: "Preparation-first products that help the final finish look smoother, cleaner, and more dependable.",
          image: "prince-primer"
        }
      ];

      let activeCategory = categoryFeatureData[1];

      function renderCategoryFeature() {
        const product = productData.find((item) => item.slug === activeCategory.image) || productData[0];
        const theme = getProductTheme(product);

        categoryFeature.innerHTML = `
          <div class="category-feature__nav">
            ${categoryFeatureData.map((item) => `
              <button class="category-feature__tab ${item.title === activeCategory.title ? "is-active" : ""}" type="button" data-category="${item.title}">
                <span>${item.title}</span>
              </button>
            `).join("")}
          </div>
          <article class="category-feature__stage" style="background:${theme.categoryStage};">
            <div class="category-feature__copy">
              <h3>${activeCategory.title}</h3>
              <p class="category-feature__subtitle">${activeCategory.subtitle}</p>
              <p class="category-feature__detail">${activeCategory.copy}</p>
              <a class="button button--ghost" href="products.html?filter=${activeCategory.filter}">Explore category</a>
            </div>
            <div class="category-feature__visual">
              <div class="category-feature__pack" style="--pack-shadow:${theme.shadow};">
                <img src="${product.image}" alt="${product.name}">
              </div>
            </div>
          </article>
        `;

        categoryFeature.querySelectorAll("[data-category]").forEach((button) => {
          button.addEventListener("click", () => {
            const next = categoryFeatureData.find((item) => item.title === button.dataset.category);
            if (!next) {
              return;
            }
            activeCategory = next;
            renderCategoryFeature();
          });
        });
      }

      renderCategoryFeature();
    }

    if (
      colourGuideTiles &&
      colourGuideTitle &&
      colourGuideCopy &&
      colourGuideSwatches &&
      colourGuidePaletteDots &&
      colourGuideName &&
      colourGuideCode &&
      colourRoomPreview
    ) {
      let activeGuide = colourGuideData[0];

      function swatchLookup(name) {
        return paletteData.find((item) => item.name === name);
      }

      function renderGuide() {
        colourGuideTitle.textContent = activeGuide.title;
        colourGuideCopy.textContent = activeGuide.copy;
        colourGuideName.textContent = activeGuide.swatches[0] || activeGuide.title;
        colourGuideCode.textContent = activeGuide.code || "WK-000";
        colourRoomPreview.style.setProperty("--guide-wall", activeGuide.heroColor || "#9c907d");
        colourRoomPreview.style.setProperty("--guide-accent", activeGuide.accentColor || "#c12674");

        colourGuidePaletteDots.innerHTML = activeGuide.swatches.map((name) => {
          const swatch = swatchLookup(name);
          if (!swatch) {
            return "";
          }

          return `<span class="palette-dot" style="background:${swatch.color};" aria-label="${swatch.name}"></span>`;
        }).join("");

        colourGuideSwatches.innerHTML = activeGuide.swatches.map((name) => {
          const swatch = swatchLookup(name);
          if (!swatch) {
            return "";
          }

          return `
            <article class="guide-swatch-card">
              <div class="guide-swatch-card__tone" style="background:${swatch.color};"></div>
              <strong>${swatch.name}</strong>
              <span>${swatch.mood}</span>
            </article>
          `;
        }).join("");

        colourGuideTiles.querySelectorAll("button").forEach((button) => {
          button.classList.toggle("is-active", button.dataset.guide === activeGuide.title);
        });
      }

      colourGuideTiles.innerHTML = colourGuideData.map((item) => `
        <button class="guide-tile" type="button" data-guide="${item.title}" style="--tile-accent:${item.accentColor}; --tile-wall:${item.heroColor};">
          <span class="guide-tile__preview"></span>
          <span class="guide-tile__label">${item.title}</span>
        </button>
      `).join("");

      colourGuideTiles.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          const nextGuide = colourGuideData.find((item) => item.title === button.dataset.guide);
          if (!nextGuide) {
            return;
          }
          activeGuide = nextGuide;
          renderGuide();
        });
      });

      renderGuide();
    }

    if (journalGrid) {
      journalGrid.innerHTML = journalData.map((item) => `
        <article class="journal-card">
          <span class="journal-card__tag">${item.tag}</span>
          <h3>${item.title}</h3>
          <p>${item.copy}</p>
          <a class="text-link" href="contact.html">Learn more</a>
        </article>
      `).join("");
    }

  }

  function renderProductsPage() {
    const productsCategoryNav = document.getElementById("productsCategoryNav");
    const productStories = document.getElementById("productStories");
    const productsGrid = document.getElementById("productsGrid");
    const productsSummary = document.getElementById("productsSummary");
    const filterButtons = document.querySelectorAll("[data-filter]");

    if (!productsCategoryNav && !productStories && !productsGrid) {
      return;
    }

    const storyData = [
      {
        id: "interior",
        title: "Interior Emulsions",
        subtitle: "Create smoother rooms with richer decorative finish.",
        copy: "Wall King interior paints are presented here the way they should be sold: as a mood, a room story, and a cleaner finish for daily living spaces.",
        heroSlug: "interior-silky-shiny",
        productSlugs: ["interior-silky-shiny", "prince-primer", "crack-filler"],
        theme: "products-story--berry"
      },
      {
        id: "exterior",
        title: "Exterior Emulsions",
        subtitle: "Shield and beautify your exteriors.",
        copy: "Exterior coatings need stronger presentation than a flat grid. This section gives Wall King a proper facade-facing story with the pack leading the category.",
        heroSlug: "perfect-exterior-emulsion",
        productSlugs: ["perfect-exterior-emulsion", "elasto-shield", "prince-primer"],
        theme: "products-story--sand"
      },
      {
        id: "waterproofing",
        title: "Waterproofing Systems",
        subtitle: "Defend roofs, terraces, and damp-prone surfaces.",
        copy: "Waterproofing now reads like a major system category, not just another product card. The category leads with protection, heat reduction, and site confidence.",
        heroSlug: "elasto-shield",
        productSlugs: ["elasto-shield", "damp-care-putty", "latex-polymer-sbr"],
        theme: "products-story--sky"
      },
      {
        id: "preparation",
        title: "Putties & Primers",
        subtitle: "Build a stronger surface before the finish coat.",
        copy: "Preparation products are showcased as the base of the full paint system, helping Wall King feel more complete and more dealer-friendly.",
        heroSlug: "prince-primer",
        productSlugs: ["prince-primer", "latex-polymer-sbr", "crack-filler"],
        theme: "products-story--mint"
      },
      {
        id: "specialty",
        title: "Specialty Products",
        subtitle: "Expand beyond wall paint with technical products.",
        copy: "Enamel and tile adhesive sit together here as a practical specialist range for builders, contractors, and higher-utility requirements.",
        heroSlug: "prince-enamel",
        productSlugs: ["prince-enamel", "tile-adhesive"],
        theme: "products-story--steel"
      }
    ];

    function storyProductMarkup(product) {
      const theme = getProductTheme(product);
      return `
        <article class="story-product-card">
          <a class="story-product-card__media" href="product.html?slug=${product.slug}" style="--story-media-surface:${theme.railSurface}; --story-media-shadow:${theme.shadow};">
            <img src="${product.image}" alt="${product.name}">
          </a>
          <div class="story-product-card__body">
            <span class="pill">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.shortCopy}</p>
            <a class="text-link" href="product.html?slug=${product.slug}">View details</a>
          </div>
        </article>
      `;
    }

    if (productsCategoryNav) {
      productsCategoryNav.innerHTML = storyData.map((item) => `
        <a class="filter-chip" href="#story-${item.id}">${item.title}</a>
      `).join("");
    }

    if (productStories) {
      productStories.innerHTML = storyData.map((item) => {
        const heroProduct = productData.find((product) => product.slug === item.heroSlug) || productData[0];
        const showcaseProducts = item.productSlugs
          .map((slug) => productData.find((product) => product.slug === slug))
          .filter(Boolean);

        return `
          <section class="products-story ${item.theme} reveal" id="story-${item.id}">
            <div class="products-story__hero">
              <div class="products-story__copy">
                <span class="products-story__tag">${item.title}</span>
                <h2>${item.title}</h2>
                <p>${item.subtitle}</p>
                <p class="products-story__detail">${item.copy}</p>
                <a class="button button--ghost" href="products.html?filter=${item.id}">Explore ${item.title}</a>
              </div>
              <div class="products-story__visual">
                <div class="products-story__pack">
                  <img src="${heroProduct.image}" alt="${heroProduct.name}">
                </div>
              </div>
            </div>
            <div class="products-story__rail">
              ${showcaseProducts.map((product) => storyProductMarkup(product)).join("")}
            </div>
          </section>
        `;
      }).join("");
    }

    if (productsGrid) {
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
          <div class="product-visual-card" style="--product-visual-surface:${getProductTheme(product).detailSurface}; --product-visual-shadow:${getProductTheme(product).shadow};">
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
