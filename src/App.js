import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

import Home from './Home'
import Sobre from './Sobre'
import Produtos from './Produtos'

class App extends Component {

  state = {
    categorias: [],
    categoria: {},
    produtos: []

  }

  loadCategorias = () => {
    this.props.api.loadCategorias()
    .then(res => {
        this.setState({
            categorias: res.data
        })
    })
  }
  readCategoria = (id) => {
    this.props.api.readCategoria(id)
    .then(res => {
        this.setState({
            categoria: res.data
        })
    })
  }

  createProduto = (produto) => {
      
      return this.props.api.postProduto(produto)
      
         
  }
  handleNewCategoria = (categoria) => {
      
    this.props.api.postCategoria(categoria)
    .then(res => {
      this.loadCategorias()
    })
       
}
  handleEditCategoria = (categoria) => {
      
    this.props.api.editCategoria(categoria)
    .then(res => {
      this.loadCategorias()
    })
       
}

  removeCategoria = (categoria) => {
    this.props.api.deleteCategoria(categoria.id)
    .then((res) => this.loadCategorias())
  }

  loadProdutos = (id) => {
    this.props.api.loadProdutos(id)
    .then(res => {
      this.setState({
          produtos: res.data
      })
  }) 
  }

  deleteProduto = (produto) => {
    this.props.api.deleteProduto(produto)
    .then(res => {
      this.loadProdutos(this.state.categoria.id)
    })
  }

  render() {
    return (
      <Router>
        <div >
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container '>
              <div className='navbar-header'>
                <a href='/' className='navbar-brand'>
                  Gerenciador de produtos
                </a>
              </div>
              <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
                <li className='nav-item'><Link className='nav-link' to='/'>Home</Link></li>
                <li className='nav-item'><Link className='nav-link' to='/produtos'>Produtos</Link></li>
                <li className='nav-item'><Link className='nav-link' to='/sobre'>Sobre</Link></li>
              </ul>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/sobre' component={Sobre} />
            <Route path='/produtos' render={(props) => {
                return (<Produtos {...props} loadCategorias={this.loadCategorias} 
                readCategoria = {this.readCategoria}  
                categorias={this.state.categorias}
                categoria={this.state.categoria}
                handleNewCategoria={this.handleNewCategoria}
                removeCategoria={this.removeCategoria}
                handleEditCategoria = {this.handleEditCategoria}
                loadProdutos = {this.loadProdutos}
                produtos = {this.state.produtos}
                createProduto = {this.createProduto}
                deleteProduto = {this.deleteProduto}
                />)
              }
            }/>

          </div>
        </div>
      </Router>
    )
  }
}

export default App
