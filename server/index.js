import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Datos de ejemplo para practicar el consumo de una API.
// Los precios son ilustrativos, no precios de una tienda real.
const sneakers = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High OG",
    model: "Jordan 1",
    color: "Shadow / Brown",
    price: 899000,
    image: "https://nikeco.vtexassets.com/arquivos/ids/1090671/DZ5485-201_A.jpg"
  },
  {
    id: 2,
    name: "Air Jordan 1 Retro High OG",
    model: "Jordan 1",
    color: "Otro estilo Jordan 1",
    price: 649000,
    image: "https://static.nike.com/a/images/t_default/3638c536-f339-41db-9533-f1b016df027e/AIR+JORDAN+1+HIGH+OG.png"
  },
  {
    id: 3,
    name: "Air Jordan 4 Black Cat",
    model: "Jordan 4",
    color: "Black Cat",
    price: 1099000,
    image: "https://sneakernews.com/wp-content/uploads/2025/06/black-cat-jordan-4s-2025-1.jpg"
  },
  {
    id: 4,
    name: "Air Jordan 3 Retro",
    model: "Jordan 3",
    color: "White / Cement",
    price: 999000,
    image: "https://nikeco.vtexassets.com/arquivos/ids/1043762/CK9246-101_A.jpg"
  }
];

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Jordan Finder API funcionando" });
});

app.get("/api/sneakers", (req, res) => {
  const search = (req.query.search || "").toString().trim().toLowerCase();

  const results = sneakers.filter((shoe) => {
    const text = `${shoe.name} ${shoe.model} ${shoe.color}`.toLowerCase();
    return text.includes(search);
  });

  res.json({
    total: results.length,
    results
  });
});

app.get("/api/sneakers/:id", (req, res) => {
  const shoe = sneakers.find((item) => item.id === Number(req.params.id));

  if (!shoe) {
    return res.status(404).json({ message: "No se encontró esa zapatilla." });
  }

  res.json(shoe);
});

app.listen(PORT, () => {
  console.log(`Jordan Finder API disponible en http://localhost:${PORT}`);
});
