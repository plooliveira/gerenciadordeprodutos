import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})

const apis = {
    loadCategorias: () => api.get('categorias'),
    readCategoria: (id) => api.get(`categorias/${id}`),
    deleteCategoria: (id) => api.delete(`categorias/${id}`),
    postCategoria: (categoria) => api.post('categorias', 
    {
      categoria: categoria
    }),
    postProduto: (produto) => api.post('produtos', produto),
    deleteProduto: (produto) => api.delete(`produtos/${produto.id}`),
    editCategoria: (categoria) => api.put(`categorias/${categoria.id}`, categoria),
    loadProdutos: (id) => api.get(`produtos?categoria=${id}`)
}

export default apis