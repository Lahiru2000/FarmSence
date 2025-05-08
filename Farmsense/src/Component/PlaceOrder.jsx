import React, { useState , useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { ShoppingCart } from 'lucide-react';
import ShoppingCartIcon from '../icons/shopping-cart.png';


function PlaceOrder() {

    const navigate = useNavigate();
    const [quantities , setQuantities] = useState({});
    const { userId } = useParams();
    const [products, setProducts] = useState([]);
    const productsz = [
        { id: 1, name: "GreenGrow Nitrogen Plus", description: "Boosts plant growth with added nitrogen", price: "$20.99" },
    { id: 2, name: "BloomBoost Potash", description: "Enhances flowering and fruiting", price: "$18.50" },
    { id: 3, name: "SuperSoil Organic Mix", description: "All-purpose organic soil mix for healthy plants", price: "$15.00" },
    { id: 4, name: "QuickStart Growth Formula", description: "Quick-acting fertilizer for fast growth", price: "$22.00" },
    { id: 5, name: "EcoFeast Complete Fertilizer", description: "Complete nutrient blend for all plants", price: "$25.00" },
    { id: 6, name: "PowerFeed All-Purpose Fertilizer", description: "Perfect for every garden need", price: "$19.99" },
    { id: 7, name: "VitaBloom Flower Fertilizer", description: "Promotes vibrant and strong blooms", price: "$21.50" },
    { id: 8, name: "HarvestMax Soil Enrichment", description: "Improves soil fertility and structure", price: "$17.50" },
    { id: 9, name: "PlantVigor Root Stimulator", description: "Stimulates root development for stronger plants", price: "$16.00" },
    { id: 10, name: "NitroBloom High Nitrogen Fertilizer", description: "For robust plant growth and lush greens", price: "$24.99" },
      ];

      useEffect(() => {
        axios
          .get("http://localhost:8080/auth/products")
          .then((response) => {
            setProducts(response.data);
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    //copy previous quantity and add each product to value - value means quantity
    function handleQuantityChange(productId , value){
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId] : value,
        }));
    }

    function saveCart(userId, productId, quantity) {
        console.log({ userId, productId, quantity });
    
        const cartObject = {
            userId,
            productId,
            quantity,
            onCart: true,
        };
    
        axios
            .post("http://localhost:8080/api/orders/addOrder", cartObject)
            .then(() => {
                alert("Added to cart");
            })
            .catch((err) => {
                alert("Error: " + err.response?.data || "Failed to add to cart");
            });
    }

    function handleViewCartButton(){
      navigate(`/cart/${userId}`);
    }

    

  return (
    <div>
      
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 gap-6">
      

      {/* Cart Icon */}
      <div className="relative">
        <div className="absolute top-0 right-0">
         <button className="bg-gray-800 text-white flex items-center py-2 px-4 rounded-lg hover:bg-gray-900" onClick={handleViewCartButton}>
          <img src={ShoppingCartIcon} alt="Report" className="w-5 h-5 mr-2" />
            View Cart
         </button>
       </div>
     </div>
          
      <br></br>

      {products.map((product) => (
        <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>

          {/* Input for quantity */}
          <input
                            type="number"
                            min="0"
                            value={quantities[product.id] || 0}
                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                            className="border p-2 rounded mb-4"
                            placeholder="Qty"
                        />

          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-green-600">Rs. {product.price}.00</p>

          {/* Add to Cart button - disabled if quantity is 0 or empty */}
          <button
                            onClick={() => saveCart(userId, product.id, quantities[product.id])}
                            disabled={!quantities[product.id] || quantities[product.id] <= 0} // Disable if qty is 0 or undefined
                            className={`mt-4 w-full py-2 ${quantities[product.id] > 0 ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"} rounded-lg transition-colors duration-300`}
          >
                            Add to Cart
          </button>
        </div>
      ))}
    </div>
    
    </div>
  )
}

export default PlaceOrder