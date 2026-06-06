import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import product1 from "./assets/images/product1.jpg";
import product2 from "./assets/images/product2.jpg";
import product3 from "./assets/images/product3.jpg";
import product4 from "./assets/images/product4.jpg";
import product5 from "./assets/images/product5.jpg";
import product16 from "./assets/images/product16.jpg";
import product17 from "./assets/images/product17.jpg";
import product18 from "./assets/images/product18.jpg";
import product19 from "./assets/images/product19.jpg";
import product20 from "./assets/images/product20.jpg";
import product21 from "./assets/images/product21.jpg";
import product22 from "./assets/images/product22.jpg";
import product23 from "./assets/images/product23.jpg";
import product24 from "./assets/images/product24.jpg";
import product25 from "./assets/images/product25.jpg";
import shoe1 from "./assets/images/shoe1.jpg";
import shoe2 from "./assets/images/shoe2.jpg";
import shoe3 from "./assets/images/shoe3.jpg";
import shoe4 from "./assets/images/shoe4.jpg";
import shoe5 from "./assets/images/shoe5.jpg";
import shoe6 from "./assets/images/shoe6.jpg";
import shoe7 from "./assets/images/shoe7.jpg";
import shoe8 from "./assets/images/shoe8.jpg";
import shoe9 from "./assets/images/shoe9.jpg";
import shoe10 from "./assets/images/shoe10.jpg";
import shoe11 from "./assets/images/shoe11.jpg";
import shoe12 from "./assets/images/shoe12.jpg";
import track1 from "./assets/images/track1.jpg";
import track2 from "./assets/images/track2.jpg";
import track3 from "./assets/images/track3.jpg";
import track4 from "./assets/images/track4.jpg";
import track5 from "./assets/images/track5.jpg";
import track6 from "./assets/images/track6.jpg";
import track7 from "./assets/images/track7.jpg";
import track8 from "./assets/images/track8.jpg";
import track9 from "./assets/images/track9.jpg";
import track10 from "./assets/images/track10.jpg";
import gymEq1 from "./assets/images/gym-equipment1.jpg";
import gymEq2 from "./assets/images/gym-equipment2.jpg";
import gymEq3 from "./assets/images/gym-equipment3.jpg";
import gymEq4 from "./assets/images/gym-equipment4.jpg";
import gymEq5 from "./assets/images/gym-equipment5.jpg";
import gymEq6 from "./assets/images/gym-equipment6.jpg";
import gymEq7 from "./assets/images/gym-equipment7.jpg";
import gymEq8 from "./assets/images/gym-equipment8.jpg";
import gymEq9 from "./assets/images/gym-equipment9.jpg";
import gymEq10 from "./assets/images/gym-equipment10.jpg";
import massager1 from "./assets/images/massager1.jpg";
import massager2 from "./assets/images/massager2.jpg";
import massager3 from "./assets/images/massager3.jpg";
import massager4 from "./assets/images/massager4.jpg";
import massager5 from "./assets/images/massager5.jpg";
import accessory1 from "./assets/images/accessory1.jpg";
import accessory2 from "./assets/images/accessory2.jpg";
import accessory3 from "./assets/images/accessory3.jpg";
import accessory4 from "./assets/images/accessory4.jpg";
import accessory5 from "./assets/images/accessory5.jpg";
import cycle1 from "./assets/images/cycle1.jpg";
import cycle2 from "./assets/images/cycle2.jpg";
import cycle3 from "./assets/images/cycle3.jpg";
import cycle4 from "./assets/images/cycle4.jpg";
import cycle5 from "./assets/images/cycle5.jpg";
const FitnessStore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
 

  const products = [
  { id: 101, title: "Classic Tee", category: "T-shirts", price: 499, img: product1 },
  { id: 102, title: "Gym V-Neck", category: "T-shirts", price: 599, img: product2 },
  { id: 103, title: "Compression Top", category: "T-shirts", price: 899, img: product3 },
  { id: 104, title: "Oversized Fit", category: "T-shirts", price: 750, img: product4 },

  {
  id: 105,
  title: "Sleeveless Tee",
  category: "T-shirts",
  price: 450,
 img: product5
},
  { id: 106, title: "Running Dry-Fit", category: "T-shirts", price: 699, img: product16 },
  { id: 107, title: "Graphic Print", category: "T-shirts", price: 899, img: product17 },
  { id: 108, title: "Full Sleeve Tee", category: "T-shirts", price: 950, img: product18 },
  { id: 109, title: "Polo Performance", category: "T-shirts", price: 1100, img: product19 },
  { id: 110, title: "Muscle Fit Tee", category: "T-shirts", price: 600, img: product20 },
  { id: 111, title: "Striped Gym Tee", category: "T-shirts", price: 750, img: product21 },
  { id: 112, title: "Neon Training", category: "T-shirts", price: 550, img: product22 },
  { id: 113, title: "Hooded T-shirt", category: "T-shirts", price: 1200, img: product23 },
  { id: 114, title: "Lightweight Base", category: "T-shirts", price: 400, img: product24 },
  { id: 115, title: "Limited Edition", category: "T-shirts", price: 1500, img: product25 },

    { id: 201, title: "Running Pro", category: "Shoes", price: 2999, img: shoe1 },
  { id: 202, title: "Classic Sneakers", category: "Shoes", price: 1899, img: shoe2 },
  { id: 203, title: "Turf Football", category: "Shoes", price: 2400, img: shoe3 },
  { id: 204, title: "Gym Trainers", category: "Shoes", price: 2100, img: shoe4 },
  { id: 205, title: "Badminton Pro", category: "Shoes", price: 2700, img: shoe5 },
  { id: 206, title: "Hiking Boots", category: "Shoes", price: 3500, img: shoe6 },
  { id: 207, title: "Casual Loafers", category: "Shoes", price: 1500, img: shoe7 },
  { id: 208, title: "Sprint Spikes", category: "Shoes", price: 3200, img: shoe8 },
  { id: 209, title: "Tennis Court", category: "Shoes", price: 2200, img: shoe9 },
  { id: 210, title: "Walking Shoes", category: "Shoes", price: 1200, img: shoe10 },
  { id: 211, title: "High-Top Basketball", category: "Shoes", price: 2800, img: shoe11 },
  { id: 212, title: "Yoga Barefoot", category: "Shoes", price: 900, img: shoe12 },
     { id: 401, title: "Track Pants", category: "Track", price: 1299, img: track1 },
  { id: 402, title: "Track Suit", category: "Track", price: 2499, img: track2 },
  { id: 403, title: "Joggers", category: "Track", price: 950, img: track3 },
  { id: 404, title: "Windcheater", category: "Track", price: 1500, img: track4 },
  { id: 405, title: "Slim-fit Track", category: "Track", price: 1100, img: track5 },
  { id: 406, title: "Shorts", category: "Track", price: 600, img: track6 },
  { id: 407, title: "Compression Tights", category: "Track", price: 850, img: track7 },
  { id: 408, title: "Hoodie Jacket", category: "Track", price: 1800, img: track8 },
  { id: 409, title: "Cargo Joggers", category: "Track", price: 1300, img: track9 },
  { id: 410, title: "Active Leggings", category: "Track", price: 900, img: track10 },

{ id: 301, title: "Dumbbell Set", category: "Gym Equipment", price: 3500, img: gymEq1 },
{ id: 302, title: "Yoga Mat", category: "Gym Equipment", price: 850, img: gymEq2 },
{ id: 303, title: "Resistance Band", category: "Gym Equipment", price: 400, img: gymEq3 },
{ id: 304, title: "Jump Rope", category: "Gym Equipment", price: 300, img: gymEq4 },
{ id: 305, title: "Kettlebell", category: "Gym Equipment", price: 1200, img: gymEq5 },
{ id: 306, title: "Gym Shaker", category: "Gym Equipment", price: 500, img: gymEq6 },
{ id: 307, title: "Weight Plate", category: "Gym Equipment", price: 1500, img: gymEq7 },
{ id: 308, title: "Gym Gloves", category: "Gym Equipment", price: 600, img: gymEq8 },
{ id: 309, title: "Hand Gripper", category: "Gym Equipment", price: 250, img: gymEq9 },
{ id: 310, title: "Gym Belt", category: "Gym Equipment", price: 950, img: gymEq10 },
    // Special Items
    // Massagers
{
    id: 502,
    title: "Neck Massager",
    category: "Massagers",
    price: 2500,
    img: massager1
  },
  {
    id: 503,
    title: "Foot Massager",
    category: "Massagers",
    price: 4500,
    img: massager2
  },
  {
    id: 504,
    title: "Massage Gun",
    category: "Massagers",
    price: 3500,
    img: massager3
  },
  {
    id: 505,
    title: "Back Massager",
    category: "Massagers",
    price: 2800,
    img: massager4
  },
  {
    id: 506,
    title: "Shoulder Massager",
    category: "Massagers",
    price: 3200,
    img: massager5
  },

// Accessories
{ id: 602, title: "Protein Shaker", category: "Accessories", price: 399, img: accessory1 },
{ id: 603, title: "Gym Towel", category: "Accessories", price: 299, img: accessory2 },
{ id: 604, title: "Fitness Bag", category: "Accessories", price: 999, img: accessory3 },
{ id: 605, title: "Smart Water Bottle", category: "Accessories", price: 899, img: accessory4 },
{ id: 606, title: "Wrist Band", category: "Accessories", price: 199, img: accessory5 },
// Cycle
{ id: 702, title: "Mountain Bike", category: "Cycle", price: 18000, img: cycle1 },
  { id: 703, title: "Road Bike", category: "Cycle", price: 25000, img: cycle2 },
  { id: 704, title: "Hybrid Cycle", category: "Cycle", price: 20000, img: cycle3 },
  { id: 705, title: "Kids Cycle", category: "Cycle", price: 8000, img: cycle4 },
  { id: 706, title: "Exercise Bike", category: "Cycle", price: 15000, img: cycle5 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    
    // અહીં મેસેજ ઇંગ્લિશમાં છે
    toast.success(`${product.title} has been added to your cart!`, {
      style: {
        background: '#333',
        color: '#fff',
        borderRadius: '10px',
      },
    });
  };

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);
  const categories = ["All", "T-shirts", "Shoes", "Track", "Gym Equipment", "Massagers", "Accessories", "Cycle"];

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Toaster position="top-right" />
      <h1 style={{ textAlign: 'center', color: '#ff4500' }}>ELITE FITNESS STORE</h1>

      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px', border: '1px solid #444', color: '#fff' }}>
        <h2 style={{ margin: '0', color: '#fff' }}>🛒 Total items in your cart: {cart.length}</h2>
        <h3 style={{ margin: '10px 0 0', color: '#ff4500' }}>Total Amount: ₹{totalAmount}</h3>
        
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '10px 15px', cursor: 'pointer', background: selectedCategory === cat ? '#ff4500' : '#333', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>{cat}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '1200px', margin: 'auto' }}>
        {products.filter(p => selectedCategory === "All" || p.category === selectedCategory).map(p => (
          <div key={p.id} style={{ background: '#1e1e1e', padding: '15px', borderRadius: '10px', border: '1px solid #444' }}>
         
<img 
  src={p.img || 'https://via.placeholder.com/150'} 
  alt={p.title} 
  onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // જો ઈમેજ લોડ ન થાય તો placeholder બતાવશે
  style={{ width: '100%', height: '180px', borderRadius: '5px', objectFit: 'cover' }} 
/>
            <p style={{ fontSize: '1.1rem', color: '#aaa' }}>₹{p.price}</p>
            <button onClick={() => addToCart(p)} style={{ width: '100%', padding: '10px', background: '#ff4500', border: 'none', color: '#fff', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>ADD TO CART</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FitnessStore;