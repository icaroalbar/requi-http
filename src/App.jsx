import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch"

const url = 'http://localhost:3000/products'

function App() {
  const [products, setProducts] = useState([])
  const { data: items, httpConfig, loading, error } = useFetch(url)
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()

    const product = {
      name,
      price,
    }

    httpConfig(product, "POST")
    setName('')
    setPrice('')

  }

  const handleRemove = id => {
    httpConfig(id, "DELETE")
  }

  return (
    <>
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!loading && (
        <ul>
          {items && items.map(product => (
            <li key={product.id}>Name: {product.name} - Price: R${product.price}
            <button onClick={() => handleRemove(product.id)}>X</button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <label>Name: <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} /></label>
        <label>Price: <input type="number" name="price" value={price} onChange={e => setPrice(e.target.value)} /></label>
        {loading && <input type="submit" disabled value="Aguarde" />}
        {!loading && <input type="submit" value="Criar" />}
      </form>
    </>
  );
}

export default App;
