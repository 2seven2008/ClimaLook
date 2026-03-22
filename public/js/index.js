// ============================================
// CONSTANTES E CONFIGURAÇÕES
// ============================================

const CONFIG = {
  WEATHER_API: "https://api.open-meteo.com/v1/forecast",
  GEOCODING_API: "https://nominatim.openstreetmap.org/reverse",
  FORECAST_DAYS: 5,
  GEOLOCATION_TIMEOUT: 10000,
  RAIN_ALERT_THRESHOLD: 60,
  HIGH_TEMP_THRESHOLD: 28,
  MEDIUM_TEMP_THRESHOLD: 22,
  MILD_TEMP_THRESHOLD: 15,
};

// ============================================
// TEMAS
// ============================================

const THEMES = {
  sunny: {
    top: "#f9a825",
    bot: "#fb8c00",
    text: "rgba(255,255,255,0.92)",
    dim: "rgba(255,255,255,0.65)",
    page: "#fff8e1",
    accent: "#e65100",
    al: "rgba(230,81,0,0.09)",
  },
  clear: {
    top: "#42a5f5",
    bot: "#1976d2",
    text: "rgba(255,255,255,0.92)",
    dim: "rgba(255,255,255,0.62)",
    page: "#e3f2fd",
    accent: "#1565c0",
    al: "rgba(21,101,192,0.08)",
  },
  partcloudy: {
    top: "#b5bdc4",
    bot: "#eddd53",
    text: "rgba(255,255,255,0.88)",
    dim: "rgba(255,255,255,0.58)",
    page: "#f5f3e8",
    accent: "#7a6f2e",
    al: "rgba(122,111,46,0.08)",
  },
  cloudy: {
    top: "#90a4ae",
    bot: "#78909c",
    text: "rgba(255,255,255,0.88)",
    dim: "rgba(255,255,255,0.58)",
    page: "#f1f3f4",
    accent: "#455a64",
    al: "rgba(69,90,100,0.08)",
  },
  rainy: {
    top: "#546e7a",
    bot: "#37474f",
    text: "rgba(255,255,255,0.88)",
    dim: "rgba(255,255,255,0.55)",
    page: "#eceff1",
    accent: "#263238",
    al: "rgba(38,50,56,0.08)",
  },
  storm: {
    top: "#37474f",
    bot: "#1c1c1e",
    text: "rgba(255,255,255,0.85)",
    dim: "rgba(255,255,255,0.5)",
    page: "#e8eaf6",
    accent: "#1a237e",
    al: "rgba(26,35,126,0.08)",
  },
  snowy: {
    top: "#b3e5fc",
    bot: "#e1f5fe",
    text: "rgba(1,87,155,0.85)",
    dim: "rgba(1,87,155,0.5)",
    page: "#e1f5fe",
    accent: "#0277bd",
    al: "rgba(2,119,189,0.08)",
  },
  fog: {
    top: "#9e9e9e",
    bot: "#bdbdbd",
    text: "rgba(255,255,255,0.85)",
    dim: "rgba(255,255,255,0.55)",
    page: "#f5f5f5",
    accent: "#424242",
    al: "rgba(66,66,66,0.08)",
  },
  night: {
    top: "#1a237e",
    bot: "#283593",
    text: "rgba(255,255,255,0.88)",
    dim: "rgba(255,255,255,0.5)",
    page: "#e8eaf6",
    accent: "#3949ab",
    al: "rgba(57,73,171,0.08)",
  },
};

// ============================================
// DADOS METEOROLÓGICOS (WMO)
// ============================================

const WMO_MAPPINGS = {
  theme: {
    0: "sunny",
    1: "clear",
    2: "partcloudy",
    3: "cloudy",
    45: "fog",
    48: "fog",
    51: "rainy",
    53: "rainy",
    55: "rainy",
    61: "rainy",
    63: "rainy",
    65: "rainy",
    71: "snowy",
    73: "snowy",
    75: "snowy",
    77: "snowy",
    80: "rainy",
    81: "rainy",
    82: "storm",
    85: "snowy",
    86: "snowy",
    95: "storm",
    96: "storm",
    99: "storm",
  },
  icon: {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌦️",
    53: "🌦️",
    55: "🌧️",
    61: "🌧️",
    63: "🌧️",
    65: "🌧️",
    71: "❄️",
    73: "❄️",
    75: "❄️",
    77: "🌨️",
    80: "🌦️",
    81: "🌧️",
    82: "⛈️",
    85: "🌨️",
    86: "🌨️",
    95: "⛈️",
    96: "⛈️",
    99: "⛈️",
  },
  text: {
    0: "Céu limpo",
    1: "Predominantemente limpo",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Névoa",
    48: "Névoa com geada",
    51: "Garoa leve",
    53: "Garoa moderada",
    55: "Garoa intensa",
    61: "Chuva leve",
    63: "Chuva moderada",
    65: "Chuva forte",
    71: "Neve leve",
    73: "Neve moderada",
    75: "Neve forte",
    80: "Chuviscos",
    81: "Chuviscos",
    82: "Temporal forte",
    95: "Tempestade",
    96: "Tempestade",
    99: "Tempestade severa",
  },
};

const STORM_CODES = [61, 63, 65, 80, 81, 82, 95, 96, 99];
const RAINY_CODES = [61, 63, 65, 80, 81, 82, 95, 96, 99];

// ============================================
// DIAS DA SEMANA
// ============================================

const DAYS = {
  short: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  full: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
};

// ============================================
// ESTADO DA APLICAÇÃO
// ============================================

let appState = {
  weatherData: null,
  currentLocation: null,
};

// ============================================
// FUNÇÕES DE UTILIDADE
// ============================================

const getWMODescription = (code, type = "text") =>
  WMO_MAPPINGS[type]?.[code] || "—";
const getWMOIcon = (code) => getWMODescription(code, "icon");
const getWMOText = (code) => getWMODescription(code, "text");

const isRaining = (wmoCode, rainProbability = 0) => {
  return rainProbability > 40 || RAINY_CODES.includes(wmoCode);
};

const formatDate = (dateString) => {
  const date = new Date(dateString + "T12:00:00");
  return {
    dayOfWeek: DAYS.full[date.getDay()],
    formattedDate: dateString.split("-").reverse().slice(0, 2).join("/"),
  };
};

const addFadeAnimation = (element) => {
  if (!element) return;
  element.classList.add("fade-update");
  setTimeout(() => element.classList.remove("fade-update"), 300);
};

// ============================================
// TEMAS E ESTILOS
// ============================================

const ThemeManager = {
  apply(wmoCode, isDay) {
    const themeKey = !isDay ? "night" : WMO_MAPPINGS.theme[wmoCode] || "cloudy";
    const theme = THEMES[themeKey];

    this._applyCSSVariables(theme);
    document.body.style.background = theme.page;
    this._updateThemeColor(theme.top);
  },

  _applyCSSVariables(theme) {
    const style = document.documentElement.style;
    style.setProperty("--sky-top", theme.top);
    style.setProperty("--sky-bot", theme.bot);
    style.setProperty("--sky-text", theme.text);
    style.setProperty("--sky-dim", theme.dim);
    style.setProperty("--page-bg", theme.page);
    style.setProperty("--accent", theme.accent);
    style.setProperty("--accent-light", theme.al);
  },

  _updateThemeColor(color) {
    const metaTheme = document.querySelector("meta[name=theme-color]");
    if (metaTheme) metaTheme.content = color;
  },
};

// ============================================
// SUGESTÕES DE ROUPA
// ============================================

const OutfitSuggestions = {
  getByTemperature(tempMax, rainProbability, wmoCode) {
    const hasRain = isRaining(wmoCode, rainProbability);

    if (tempMax >= CONFIG.HIGH_TEMP_THRESHOLD) {
      return this._createSummerOutfit(hasRain);
    }

    if (tempMax >= CONFIG.MEDIUM_TEMP_THRESHOLD) {
      return this._createCasualOutfit(hasRain);
    }

    if (tempMax >= CONFIG.MILD_TEMP_THRESHOLD) {
      return this._createMildOutfit(hasRain);
    }

    return this._createColdOutfit(hasRain);
  },

  _createSummerOutfit(hasRain) {
    return {
      emo: "☀️",
      name: "Look de Verão",
      sub: "Leve, fresco e sem peso",
      items: [
        {
          i: "👕",
          n: "Camiseta de algodão",
          d: "Prefira cores claras e tecido leve",
        },
        {
          i: "🩳",
          n: "Shorts ou saia leve",
          d: "Bermuda, linho ou saia fluida",
        },
        {
          i: "👡",
          n: "Sandálias ou rasteirinhas",
          d: "Deixe os pés respirarem",
        },
        { i: "🕶️", n: "Óculos de sol", d: "Proteção UV essencial" },
        ...(hasRain
          ? [{ i: "☂️", n: "Guarda-chuva", d: "Pancadas podem aparecer" }]
          : []),
      ],
      qs: this._getShopeeQueries({
        categories: [
          "Camisetas",
          "Shorts & Saias",
          "Sandálias",
          "Óculos de sol",
        ],
        searchTerms: [
          "camiseta verao feminina masculina",
          "short saia leve verao",
          "sandalia rasteirinha",
          "oculos de sol",
        ],
        hasRain,
      }),
    };
  },

  _createCasualOutfit(hasRain) {
    return {
      emo: "🌤️",
      name: "Look Casual",
      sub: "Confortável para o dia",
      items: [
        { i: "👔", n: "Camisa ou blusa leve", d: "Polo, social leve ou blusa" },
        { i: "👖", n: "Calça ou bermuda", d: "Jeans leve ou alfaiataria" },
        { i: "👟", n: "Tênis ou mocassim", d: "Conforto para o dia a dia" },
        ...(hasRain
          ? [
              {
                i: "🧥",
                n: "Jaqueta leve",
                d: "Para variações de temperatura",
              },
              { i: "☂️", n: "Guarda-chuva", d: "Chuva prevista hoje" },
            ]
          : []),
      ],
      qs: this._getShopeeQueries({
        categories: ["Blusas & Camisas", "Calças & Bermudas", "Tênis"],
        searchTerms: [
          "blusa camisa casual",
          "calca jeans bermuda casual",
          "tenis casual",
        ],
        hasRain,
      }),
    };
  },

  _createMildOutfit(hasRain) {
    return {
      emo: "⛅",
      name: "Look Ameno",
      sub: "Uma camada a mais cai bem",
      items: [
        { i: "👕", n: "Camiseta base", d: "Como peça de baixo" },
        {
          i: "🧥",
          n: "Jaqueta jeans ou blazer",
          d: "Camada de transição perfeita",
        },
        { i: "👖", n: "Calça jeans ou de tecido", d: "Conforto e estilo" },
        { i: "👟", n: "Tênis ou bota", d: "Versátil para o dia" },
        ...(hasRain
          ? [{ i: "☂️", n: "Guarda-chuva", d: "Há chances de chuva" }]
          : []),
      ],
      qs: this._getShopeeQueries({
        categories: ["Jaquetas & Blazers", "Calças", "Botas & Tênis"],
        searchTerms: [
          "jaqueta blazer casual",
          "calca jeans de tecido",
          "bota tenis",
        ],
        hasRain,
      }),
    };
  },

  _createColdOutfit(hasRain) {
    return {
      emo: "🧥",
      name: "Look de Frio",
      sub: "Vista camadas e fique aquecido",
      items: [
        { i: "🧥", n: "Casaco ou sobretudo", d: "Peça principal do look" },
        { i: "🧣", n: "Cachecol e luvas", d: "Acessórios que fazem diferença" },
        {
          i: "👖",
          n: "Calça de tecido ou lã",
          d: "Mantenha as pernas aquecidas",
        },
        { i: "🥾", n: "Bota ou sapato fechado", d: "Pés quentinhos" },
        ...(hasRain
          ? [{ i: "☂️", n: "Guarda-chuva", d: "Chuva prevista" }]
          : []),
      ],
      qs: {
        categories: [
          "Casacos & Puffers",
          "Cachecóis & Gorros",
          "Botas",
          "Calças de frio",
        ],
        searchTerms: [
          "casaco puffer jaqueta inverno",
          "cachecol gorro luvas frio",
          "bota inverno fechada",
          "calca la moletom frio",
        ],
        hasRain: false,
      },
    };
  },

  _getShopeeQueries({ categories, searchTerms, hasRain }) {
    const queries = categories.map((category, index) => ({
      t: category,
      q: searchTerms[index],
    }));

    if (hasRain) {
      queries.push({ t: "Guarda-chuva", q: "guarda chuva compacto dobravel" });
    }

    return queries;
  },
};

// ============================================
// RENDERIZADORES HTML
// ============================================

const HTMLRenderer = {
  renderOutfitItems(items) {
    return items
      .map(
        (item) => `
      <div class="outfit-row">
        <div class="row-ico">${item.i}</div>
        <div>
          <div class="row-name">${item.n}</div>
          <div class="row-desc">${item.d}</div>
        </div>
      </div>
    `,
      )
      .join("");
  },

  renderShopeeLinks(queries) {
    return queries
      .map(
        (query) => `
      <a class="s-link" href="https://shopee.com.br/search?keyword=${encodeURIComponent(query.q)}" target="_blank" rel="noopener">
        <div class="s-left">
          <div class="s-ico">🛍️</div>
          <div class="s-name">${query.t}</div>
        </div>
        <div class="s-right">
          <span class="s-tag">Shopee</span>
          <span class="s-arr">›</span>
        </div>
      </a>
    `,
      )
      .join("");
  },

  renderForecast(dailyData) {
    return dailyData.time
      .map((_, index) => {
        const date = new Date(dailyData.time[index] + "T12:00:00");
        const label = index === 0 ? "Hoje" : DAYS.short[date.getDay()];
        const rainProb = dailyData.precipitation_probability_max[index];
        const tempMax = Math.round(dailyData.temperature_2m_max[index]);
        const icon = getWMOIcon(dailyData.weathercode[index]);

        return `
        <div class="fc-col${index === 0 ? " active" : ""}" data-day="${index}" role="button" tabindex="0">
          <div class="fc-lbl">${label}</div>
          <div class="fc-ico">${icon}</div>
          <div class="fc-t">${tempMax}°</div>
          <div class="fc-r${rainProb < 20 ? " lo" : ""}">🌧️ ${rainProb}%</div>
        </div>
      `;
      })
      .join("");
  },
};

// ============================================
// GERENCIADOR DE INTERFACE
// ============================================

const UIManager = {
  updateHeroForDay(index, weatherData, location) {
    const daily = weatherData.daily;
    const current = weatherData.current;
    const isToday = index === 0;
    const isDay = isToday ? current.is_day === 1 : true;

    const wmoCode = daily.weathercode[index];
    const tempMax = Math.round(daily.temperature_2m_max[index]);
    const tempMin = Math.round(daily.temperature_2m_min[index]);
    const rainProb = daily.precipitation_probability_max[index];

    ThemeManager.apply(wmoCode, isDay);
    this._updateForecastHighlight(index);
    this._updateDayBadge(index, daily.time[index], isToday);
    this._updateHeroTemperature(tempMax);
    this._updateHeroContent(isToday, {
      wmoCode,
      tempMax,
      tempMin,
      rainProb,
      current,
    });
    this._updateRainAlert(rainProb);
    this._updateOutfitAndShopee(tempMax, rainProb, wmoCode);
  },

  _updateForecastHighlight(activeIndex) {
    document.querySelectorAll(".fc-col").forEach((el, i) => {
      el.classList.toggle("active", i === activeIndex);
    });
  },

  _updateDayBadge(index, dateString, isToday) {
    const badge = document.getElementById("heroBadge");
    if (!badge) return;

    if (isToday) {
      badge.classList.add("hidden");
    } else {
      const { dayOfWeek, formattedDate } = formatDate(dateString);
      badge.textContent = `📅 ${dayOfWeek}, ${formattedDate}`;
      badge.classList.remove("hidden");
    }
  },

  _updateHeroTemperature(tempMax) {
    const tempEl = document.getElementById("heroTemp");
    if (tempEl) {
      addFadeAnimation(tempEl);
      tempEl.innerHTML = `${tempMax}<sup class="temp-deg">°</sup>`;
    }
  },

  _updateHeroContent(isToday, data) {
    const heroRight = document.getElementById("heroRight");
    if (!heroRight) return;

    addFadeAnimation(heroRight);

    if (isToday) {
      heroRight.innerHTML = this._getTodayHeroContent(data);
    } else {
      heroRight.innerHTML = this._getForecastHeroContent(data);
    }
  },

  _getTodayHeroContent({ wmoCode, tempMax, tempMin, rainProb, current }) {
    return `
      <div class="hero-cond">${getWMOText(wmoCode)}</div>
      <div class="hero-meta">
        Máx ${tempMax}° · Mín ${tempMin}°<br>
        💨 ${Math.round(current.windspeed_10m)} km/h &nbsp;·&nbsp; 💦 ${current.relativehumidity_2m}% umidade
      </div>
      <div class="hero-pills">
        <div class="pill">
          <span class="pill-label">Agora</span>
          <span>${getWMOIcon(current.weathercode)}</span>
          <span>${Math.round(current.temperature_2m)}° · ${getWMOText(current.weathercode)}</span>
        </div>
        <div class="pill">
          <span class="pill-label">Chuva</span>
          <span>🌧️ ${rainProb}%</span>
        </div>
      </div>
    `;
  },

  _getForecastHeroContent({ wmoCode, tempMax, tempMin, rainProb }) {
    return `
      <div class="hero-cond">${getWMOText(wmoCode)}</div>
      <div class="hero-meta">Máx ${tempMax}° &nbsp;·&nbsp; Mín ${tempMin}°</div>
      <div class="hero-pills">
        <div class="pill">
          <span class="pill-label">Chuva</span>
          <span>🌧️ ${rainProb}%</span>
        </div>
      </div>
    `;
  },

  _updateRainAlert(rainProb) {
    const alertEl = document.getElementById("alertStrip");
    if (!alertEl) return;

    if (rainProb > CONFIG.RAIN_ALERT_THRESHOLD) {
      alertEl.textContent = `☔ Leve guarda-chuva — ${rainProb}% de chance de chuva!`;
      alertEl.classList.remove("hidden");
    } else {
      alertEl.classList.add("hidden");
    }
  },

  _updateOutfitAndShopee(tempMax, rainProb, wmoCode) {
    const outfit = OutfitSuggestions.getByTemperature(
      tempMax,
      rainProb,
      wmoCode,
    );

    const outfitCard = document.getElementById("outfitCard");
    if (outfitCard) {
      addFadeAnimation(outfitCard);
      outfitCard.innerHTML = `
        <div class="sec-head">
          <div class="sec-head-emo">${outfit.emo}</div>
          <div>
            <div class="sec-head-title">${outfit.name}</div>
            <div class="sec-head-sub">${outfit.sub}</div>
          </div>
        </div>
        ${HTMLRenderer.renderOutfitItems(outfit.items)}
      `;
    }

    const shopeeBody = document.getElementById("shopeeBody");
    if (shopeeBody) {
      addFadeAnimation(shopeeBody);
      shopeeBody.innerHTML = HTMLRenderer.renderShopeeLinks(outfit.qs);
    }
  },
};

// ============================================
// SERVIÇOS DE API
// ============================================

const WeatherService = {
  async fetchForecast(lat, lon) {
    const url = `${CONFIG.WEATHER_API}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m,apparent_temperature,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=${CONFIG.FORECAST_DAYS}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data");
    return response.json();
  },

  async reverseGeocode(lat, lon) {
    try {
      const url = `${CONFIG.GEOCODING_API}?lat=${lat}&lon=${lon}&format=json&accept-language=pt`;
      const response = await fetch(url);
      const data = await response.json();

      const address = data.address || {};
      const city = (
        address.city ||
        address.town ||
        address.municipality ||
        address.county ||
        ""
      ).toUpperCase();
      const state = (address.state_code || address.state || "").toUpperCase();

      return { city, state };
    } catch {
      return { city: "SUA CIDADE", state: "" };
    }
  },
};

// ============================================
// GERENCIADOR DE LOCALIZAÇÃO
// ============================================

const LocationManager = {
  getUserPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalização não suportada"));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: CONFIG.GEOLOCATION_TIMEOUT,
      });
    });
  },

  async getLocationAndWeather() {
    try {
      const position = await this.getUserPosition();
      const { latitude, longitude } = position.coords;

      const [weatherData, location] = await Promise.all([
        WeatherService.fetchForecast(latitude, longitude),
        WeatherService.reverseGeocode(latitude, longitude),
      ]);

      return { weatherData, location };
    } catch (error) {
      throw this._handleLocationError(error);
    }
  },

  _handleLocationError(error) {
    if (error.code === 1) {
      return new Error(
        "Permissão de localização negada. Ative nas configurações do navegador.",
      );
    }
    return new Error("Não foi possível obter sua localização.");
  },
};

// ============================================
// RENDERIZADOR PRINCIPAL
// ============================================

const AppRenderer = {
  renderMain(weatherData, location) {
    appState = { weatherData, currentLocation: location };

    const current = weatherData.current;
    const daily = weatherData.daily;
    const isDay = current.is_day === 1;
    const wmoCode = daily.weathercode[0];
    const tempMax = Math.round(daily.temperature_2m_max[0]);
    const tempMin = Math.round(daily.temperature_2m_min[0]);
    const rainProb = daily.precipitation_probability_max[0];
    const locationString = `${location.city}${location.state ? ", " + location.state : ""}`;

    ThemeManager.apply(wmoCode, isDay);

    const outfit = OutfitSuggestions.getByTemperature(
      tempMax,
      rainProb,
      wmoCode,
    );
    const forecastHTML = HTMLRenderer.renderForecast(daily);

    const root = document.getElementById("root");
    if (!root) return;

    root.innerHTML = this._createMainHTML({
      locationString,
      tempMax,
      tempMin,
      current,
      rainProb,
      wmoCode,
      outfit,
      forecastHTML,
    });

    this._attachEventListeners();
    this._handleResponsiveTopbar();

    if (rainProb > CONFIG.RAIN_ALERT_THRESHOLD) {
      const alertEl = document.getElementById("alertStrip");
      if (alertEl) {
        alertEl.textContent = `☔ Leve guarda-chuva — ${rainProb}% de chance de chuva hoje!`;
        alertEl.classList.remove("hidden");
      }
    }
  },

  _createMainHTML(data) {
    return `
      <div class="topbar" id="topbar">
        <div class="topbar-logo">🌤️ ClimaLook</div>
        <div class="topbar-actions">
          <span class="topbar-loc">📍 ${data.locationString}</span>
          <button class="topbar-refresh" id="topbarRefresh">↺</button>
        </div>
      </div>

      <div class="page">
        <div class="hero">
          <div class="hero-inner">
            <div class="hero-top-mobile">
              <div>
                <div class="hero-loc-label">📍 Localização</div>
                <div class="hero-loc-city">${data.locationString}</div>
              </div>
              <button class="refresh-btn-mobile" id="mobileRefresh">↺</button>
            </div>

            <div>
              <div class="hero-desktop-loc">📍 ${data.locationString}</div>
              <div class="hero-day-badge hidden" id="heroBadge"></div>
              <div class="temp-num" id="heroTemp">${data.tempMax}<sup class="temp-deg">°</sup></div>
            </div>

            <div class="hero-right" id="heroRight">
              <div class="hero-cond">${getWMOText(data.wmoCode)}</div>
              <div class="hero-meta">
                Máx ${data.tempMax}° · Mín ${data.tempMin}°<br>
                💨 ${Math.round(data.current.windspeed_10m)} km/h &nbsp;·&nbsp; 💦 ${data.current.relativehumidity_2m}% umidade
              </div>
              <div class="hero-pills">
                <div class="pill">
                  <span class="pill-label">Agora</span>
                  <span>${getWMOIcon(data.current.weathercode)}</span>
                  <span>${Math.round(data.current.temperature_2m)}° · ${getWMOText(data.current.weathercode)}</span>
                </div>
                <div class="pill">
                  <span class="pill-label">Chuva</span>
                  <span>🌧️ ${data.rainProb}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="content">
          <div class="forecast-card">
            <div class="forecast-grid" id="forecastGrid">${data.forecastHTML}</div>
          </div>

          <div class="alert hidden" id="alertStrip"></div>

          <div class="main-grid">
            <div class="sec-card" id="outfitCard">
              <div class="sec-head">
                <div class="sec-head-emo">${data.outfit.emo}</div>
                <div>
                  <div class="sec-head-title">${data.outfit.name}</div>
                  <div class="sec-head-sub">${data.outfit.sub}</div>
                </div>
              </div>
              ${HTMLRenderer.renderOutfitItems(data.outfit.items)}
            </div>

            <div class="sec-card">
              <div class="sec-label">🛍️ &nbsp;Compre o look na Shopee</div>
              <div id="shopeeBody">${HTMLRenderer.renderShopeeLinks(data.outfit.qs)}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  _attachEventListeners() {
    const forecastGrid = document.getElementById("forecastGrid");
    if (forecastGrid) {
      forecastGrid.addEventListener("click", (e) => {
        const col = e.target.closest(".fc-col");
        if (col && appState.weatherData) {
          const dayIndex = parseInt(col.dataset.day);
          UIManager.updateHeroForDay(
            dayIndex,
            appState.weatherData,
            appState.currentLocation,
          );
        }
      });

      forecastGrid.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          const col = e.target.closest(".fc-col");
          if (col && appState.weatherData) {
            e.preventDefault();
            const dayIndex = parseInt(col.dataset.day);
            UIManager.updateHeroForDay(
              dayIndex,
              appState.weatherData,
              appState.currentLocation,
            );
          }
        }
      });
    }

    const mobileRefresh = document.getElementById("mobileRefresh");
    if (mobileRefresh) mobileRefresh.onclick = init;

    const topbarRefresh = document.getElementById("topbarRefresh");
    if (topbarRefresh) topbarRefresh.onclick = init;
  },

  _handleResponsiveTopbar() {
    const updateTopbar = () => {
      const topbar = document.getElementById("topbar");
      if (topbar) {
        topbar.style.display = window.innerWidth >= 768 ? "flex" : "none";
      }
    };

    updateTopbar();
    window.addEventListener("resize", updateTopbar);
  },

  renderError(message) {
    const root = document.getElementById("root");
    if (!root) return;

    root.innerHTML = `
      <div class="err-wrap">
        <div style="font-size:44px;margin-bottom:14px">😕</div>
        <h3>Ops, algo deu errado</h3>
        <p>${message}</p>
        <button class="retry" onclick="init()">Tentar novamente</button>
      </div>
    `;
  },

  renderLoading() {
    const root = document.getElementById("root");
    if (!root) return;

    root.innerHTML = `
      <div class="loading">
        <div class="spin"></div>
        <div class="load-txt">Buscando sua localização…</div>
      </div>
    `;
  },
};

// ============================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ============================================

async function init() {
  AppRenderer.renderLoading();

  try {
    const { weatherData, location } =
      await LocationManager.getLocationAndWeather();
    AppRenderer.renderMain(weatherData, location);
  } catch (error) {
    AppRenderer.renderError(error.message);
  }
}

// ============================================
// SERVICE WORKER
// ============================================

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

// ============================================
// INICIAR APLICAÇÃO
// ============================================

init();
