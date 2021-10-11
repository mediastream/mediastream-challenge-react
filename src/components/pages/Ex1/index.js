
import './assets/styles.css'
import { useState, useEffect } from 'react'


export default function Exercise01 () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25
    },
    {
      m: [2, 4, 1],
      discount: 0.5
    },
    {
      m: [4, 2],
      discount: 0.1
    } 
  ]
  const [desconto, setDesconto] = useState(0)
   
  const [indexList, setIndexList] = useState([ 

  ])

  const [cart, setCart] = useState([
   
  ])

  const getTotal = () => 0
  

  const adicionarCarrinho = (o) => {
   
    let duplicate = false
    cart.map((item)=>{
      if(item.id === o.id){
        duplicate = true
      }
    })
    if(!duplicate){
      setCart([...cart, {
        id: o.id,
        name: o.name,
        price: o.price,
        quantity: 1
      }])
      setTotalPrice(totalPrice + o.price)
      setIndexList(indexList=>[...indexList, o.id]) 
    }
   
  }
useEffect(()=>{  
  console.log(indexList)
  discountRules.map((item)=>{
  if(JSON.stringify(indexList.sort())=== JSON.stringify(item.m.sort())){
    console.log("desconto")
  setDesconto(item.discount)
  }
})}, [cart])
  const decrementarQuantidade = (item) => {
    const novoCart = []
    
    cart.map(x => {
      if(x.id == item){

        if(x.quantity != 1) {
          x.quantity -= 1
          setTotalPrice(totalPrice - x.price)
          novoCart.push(x)
        }
        
      }

      else {
        novoCart.push(x)
      }
      
      })

      setCart(novoCart)
      
     
    }

    const [totalPrice, setTotalPrice] = useState(0)

    const incrementarQuantidade = (item) => {
      const novoCart = []
      
      cart.map(x => {
        
        if(x.id == item){
          x.quantity += 1
          setTotalPrice(totalPrice + x.price)
          novoCart.push(x)
        }
  
        else {
          novoCart.push(x)
        }
        
        })
  
        setCart(novoCart)
  
      }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li className="movies__list-card">
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => {adicionarCarrinho(o)}}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(x => (
            
            <li className="movies__cart-card">
              {/* {console.log(x.id)} */}
              <ul>
                <li>
                  ID: {x.id}
                </li>
                <li>
                  Name: {x.name}
                </li>
                <li>
                  Price: ${x.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrementarQuantidade(x.id)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => incrementarQuantidade(x.id)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${totalPrice * (1-desconto)}</p>
        </div>
      </div>
    </section>
  )
} 