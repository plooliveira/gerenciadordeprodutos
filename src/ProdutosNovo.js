import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class ProdutosNovo extends Component {
    state = {
        redirect: false
    }

    handleNewProduto = () => {
        const produto = {
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }
        this.props.createProduto(produto)
            .then((res) => {
              this.setState({
                  redirect: '/produtos/categoria/' + produto.categoria
              })  
            })

        
    }
    render(){
        const {categorias} = this.props

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (<div>
                    <h2> Novo Produto</h2>
                    <select ref='categoria'>
                        {categorias.map((cat) => 
                            <option key={cat.id} value={cat.id}>{cat.categoria}</option>
                        )}
                    </select>
                    <input className="form-control" placeholder="Novo produto" ref="produto"/>
                    <button onClick={this.handleNewProduto}> Salvar </button>
                </div>)
    }
}

export default ProdutosNovo