import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'
import ProdutosNovo  from './ProdutosNovo';


class Produtos extends Component {

    state = {
      editingCategora: ''
    }

    componentDidMount(){
     this.props.loadCategorias()
    }

    editCategoria = (catEdit) =>{
      this.setState({
        editingCategora: catEdit.id
      })
    }

    saveEditCategoria = (event) => {
      if(event.keyCode === 13){
        this.props.handleEditCategoria(
          {
            id:this.state.editingCategora, 
            categoria:this.refs.newCategoria.value
          })
        this.setState({editingCategora:''})
      }
    }


    renderCategoria = (cat) => {
  
      return (
      <li key={cat.id}>
        { this.state.editingCategora === cat.id &&
          <div className='input-group'>  
            <div className='input-group-btn'>
              <input ref='newCategoria' onKeyUp={this.saveEditCategoria} type='text' defaultValue={cat.categoria}/>
              <button onClick={() => 
                {this.setState({editingCategora:''})
              }} className='btn'> Cancel </button>           
            </div>
          </div>
        }  

        { this.state.editingCategora !== cat.id &&
          <div>  
            <Link to={`/produtos/categoria/${cat.id}`} > {cat.categoria.toString()} </Link>
            <button title='Editar' onClick={() => this.editCategoria(cat)} className="btn btn-sm" style={{margin: 10}}>✎</button>
            <button title='Excluir' onClick={() => this.props.removeCategoria(cat)} className="btn btn-sm">⌫</button>
      
          </div>  
        }
      </li>
   )
   }

   handleNewCategoria = (event) =>{
     if (event.keyCode === 13) {
      this.props.handleNewCategoria(this.refs.categoria.value)
      this.refs.categoria.value = ''
     }
   }

    render(){
      const {match, categorias} = this.props
            
      return(
        <div className='row'>
          <div className='col-md-3' >
            <h3>Categorias</h3>
            <ul style={{listStyle: 'none', padding: 0}}>
            {categorias.map(this.renderCategoria)}    
            </ul>      

            <div className="card">
              <input
              onKeyUp={this.handleNewCategoria}
              type="text"
              ref="categoria"
              placeholder="Nova categoria" 
              className="form-control"
              />
            </div>
            <br/>
            <Link to='/produtos/novo'> Novo Produto </Link>
            
          </div>
          <div className='col-md-9'>
            <h1>Produtos</h1>
            <Route exact path={match.url} component={ProdutosHome}/>
            <Route exact path={match.url+'/novo'} render={(props) => {
              return (
                <ProdutosNovo {...props} 
                categorias={categorias}
                createProduto={this.props.createProduto}
                />)
            }} />
            <Route path={match.url+'/categoria/:catId'}  
            render={(props) => {
                          return (
                          <Categoria {...props} 
                          loadProdutos = {this.props.loadProdutos}
                          produtos = {this.props.produtos}
                          readCategoria = {this.props.readCategoria}
                          categoria = {this.props.categoria}
                          deleteProduto = {this.props.deleteProduto}
                          />)}
                    }/>
          </div>
        </div>
      )
    }
}

export default Produtos