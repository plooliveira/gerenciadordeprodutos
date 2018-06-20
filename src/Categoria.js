import React, {Component} from 'react'
import "./styles.css"

class Categoria extends Component {

    state = {
        id: null
    }

    loadData = (id) => {
        this.setState({id})
        this.props.readCategoria(id)
        this.props.loadProdutos(id)
    }

    removeProduct = (produto) =>{
        this.props.deleteProduto(produto)
    }

    renderProduto = (prod) => {
        
        return (
            <div className="cardProd" key={prod.id} >               
                  <p className="card">
                    <span>{prod.produto} <button onClick={() => {this.removeProduct(prod)}} className="btn btn-sm btn-style">X</button></span>
                  </p>            
                
            </div>
     )
     }

    componentDidMount(){
        const id = this.props.match.params.catId
        this.loadData(id)
        

       
    } 

    componentWillReceiveProps(newProps){
        if (newProps.match.params.catId !== this.state.id){
        this.loadData(newProps.match.params.catId)
        }
    }


    render(){
        const {categoria} = this.props

        return(
            <div>
                <h2>{categoria.categoria}</h2>
                {this.props.produtos.length == 0 &&
                <p className="alert alert-danger">Nenhum produto encontrado.</p>
                }
                {this.props.produtos.map(this.renderProduto)}
            </div>
        )
    }
}

export default Categoria