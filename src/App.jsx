import { useEffect, useState } from "react";
import "./App.css";

function formatPrice(price) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(price);
}

export default function App() {
  const [search, setSearch] = useState("");
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function searchSneakers(value = search) {
    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const response = await fetch(`/api/sneakers?search=${encodeURIComponent(value)}`);

      if (!response.ok) {
        throw new Error("No fue posible consultar la API.");
      }

      const data = await response.json();
      setSneakers(data.results);
    } catch (err) {
      setError("No se pudo conectar con la API. Revisa que el servidor esté iniciado.");
      setSneakers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchSneakers("");
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    searchSneakers();
  }

  function clearSearch() {
    setSearch("");
    searchSneakers("");
  }

  return (
    <div className="page">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Jordan Finder inicio">
          <span className="brand-icon">J</span>
          <span>JORDAN FINDER</span>
        </a>
        <span className="top-note">SNEAKER SEARCH</span>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">ENCUENTRA TU PRÓXIMO PAR</p>
          <h1>Encuentra tus <span>Jordan</span></h1>
          <p className="subtitle">Busca tus zapatillas Jordan favoritas en un solo lugar.</p>

          <form className="search-form" onSubmit={handleSubmit}>
            <label htmlFor="shoe-search">Busca por modelo o color</label>
            <div className="search-row">
              <input
                id="shoe-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Ej. Jordan 1, Jordan 4, Chicago..."
              />
              <button type="submit" disabled={loading}>
                {loading ? "Buscando..." : "Buscar"}
              </button>
            </div>
            <div className="quick-searches">
              <span>Prueba:</span>
              {["Jordan 1", "Jordan 4", "Jordan 11"].map((model) => (
                <button
                  className="chip"
                  type="button"
                  key={model}
                  onClick={() => {
                    setSearch(model);
                    searchSneakers(model);
                  }}
                >
                  {model}
                </button>
              ))}
              <button className="clear-button" type="button" onClick={clearSearch}>
                Ver todos
              </button>
            </div>
          </form>
        </section>

        <section className="results-section">
          <div className="results-heading">
            <div>
              <h2>Resultados</h2>
              <p>
                {searched
                  ? `${sneakers.length} ${sneakers.length === 1 ? "modelo encontrado" : "modelos encontrados"}`
                  : "Escribe un modelo para comenzar la búsqueda."}
              </p>
            </div>
            <span className="api-status"><span className="status-dot"></span> API conectada</span>
          </div>

          {loading && <p className="message">Buscando zapatillas...</p>}
          {error && <p className="message error">{error}</p>}
          {!loading && !error && sneakers.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">⌕</span>
              <h3>No encontramos resultados</h3>
              <p>Prueba con “Jordan 1”, “Jordan 4” o pulsa Ver todos.</p>
            </div>
          )}

          {!loading && !error && sneakers.length > 0 && (
            <div className="sneaker-grid">
              {sneakers.map((shoe) => (
                <article className="sneaker-card" key={shoe.id}>
                  <div className="shoe-image-wrap">
                    <img
                      src={shoe.image}
                      alt={shoe.name}
                      onError={(event) => {
                        event.currentTarget.src = "https://placehold.co/600x450/1b1725/f3eaff?text=Jordan+Sneaker";
                      }}
                    />
                    <span className="model-tag">{shoe.model}</span>
                  </div>
                  <div className="shoe-info">
                    <p className="shoe-color">{shoe.color}</p>
                    <h3>{shoe.name}</h3>
                    <div className="shoe-bottom">
                      <strong>{formatPrice(shoe.price)}</strong>
                      <span className="arrow">↗</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          <p className="disclaimer">Proyecto académico. Los precios son de ejemplo y no representan una oferta de venta.</p>
        </section>
      </main>

      <footer>JORDAN FINDER <span>·</span> Proyecto de React + API REST</footer>
    </div>
  );
}
