/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Coffee, MapPin, Instagram, ArrowRight, Menu as MenuIcon, X, Mail, Phone, Sparkles, Zap, Globe, Smile, Heart, ThumbsUp, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

const BEVERAGES_MENU = [
  {
    category: "Coffee & Brews",
    items: [
      { name: "Pour Over", price: "250", desc: "Classic hot brew" },
      { name: "French Press", price: "250", desc: "Classic hot brew" },
      { name: "Dark Roast Cold Brew", price: "250", desc: "Steeped slowly for a smooth finish" },
      { name: "Cinnamon Cold Brew", price: "250", desc: "Infused with cinnamon" },
      { name: "Hazelnut Cold Brew", price: "250", desc: "Infused with hazelnut" },
      { name: "French Roast Cold Brew", price: "250", desc: "Bold and smooth" },
    ]
  },
  {
    category: "Cold Coffee & Frappes",
    items: [
      { name: "Classic Frappe", price: "250", desc: "Blended to perfection" },
      { name: "Mocha Frappe", price: "300", desc: "With rich chocolate" },
      { name: "Dalgona Coffee", price: "250", desc: "Whipped coffee delight" },
      { name: "Hot Chocolate", price: "290", desc: "Other Beverages" }
    ]
  },
  {
    category: "Signature Specials & Shakes",
    items: [
      { name: "Matcha Cloud", price: "350", desc: "Coconut water, matcha tea, matcha foam cloud" },
      { name: "Matcha Strawberry", price: "350", desc: "Matcha tea, coconut milk, strawberry" },
      { name: "Belgian Chocolate Shake", price: "290", desc: "Thick and rich" },
      { name: "Blueberry Cheesecake Shake", price: "290", desc: "Dessert in a glass" },
      { name: "Vanilla Matcha Shake", price: "290", desc: "Perfect harmony" },
    ]
  },
  {
    category: "Signature Mocktails",
    items: [
      { name: "Clover Club (Virgin)", price: "350", desc: "Raspberry syrup, mojito syrup, lime, fresh cream" },
      { name: "Daiquiri (Virgin)", price: "350", desc: "Pineapple juice, fresh strawberry & syrup" },
      { name: "Tamarind Twist", price: "310", desc: "Guava, tamarind paste, pineapple" },
      { name: "Jack Frost", price: "350", desc: "Blue curacao, coconut milk, pineapple juice, heavy cream" },
      { name: "Strawberry Heaven", price: "350", desc: "Blue curacao, litchi juice, strawberry syrup, apple juice, cream" },
      { name: "Pina colada with yuzu", price: "300", desc: "A tropical classic twisted" },
    ]
  },
  {
    category: "Palette Cleansers",
    items: [
      { name: "Virgin Mojito", price: "250", desc: "Mint and lime fizz" },
      { name: "Rainbow Heaven", price: "390", desc: "Mango juice, orange juice, grenadine, blue curacao" },
      { name: "Blueberry For Sal", price: "350", desc: "Fresh blueberry, soda, lime, simple syrup" },
      { name: "Sex on the Beach", price: "390", desc: "Soda, cranberry juice, orange juice" },
      { name: "Shirley Temple", price: "300", desc: "Ginger ale, grenadine syrup, orange juice" },
      { name: "Watermelon & Elderflower", price: "250", desc: "Soda: watermelon, elderflower" },
    ]
  }
];

const FOOD_MENU = [
  {
    category: "Amuse Bouche",
    items: [
      { name: "Tomato Basil Bruschetta (6 pcs)", price: "390", desc: "Classic fresh tomato & basil" },
      { name: "Jalapeno Cheese Popper (6 pcs)", price: "390", desc: "Crispy cheese bites" },
      { name: "Avocado Toast (6 pcs)", price: "400", desc: "Smooth avocado on artisan bread" },
      { name: "Korean Cream Cheese Buns (5 pcs)", price: "400", desc: "Sweet and savory cream cheese" },
      { name: "Arancini Balls (6 pcs)", price: "390", desc: "Crispy Italian rice bites" },
      { name: "Dabeli Coral Tuille", price: "490", desc: "A modern Indian bite" },
    ]
  },
  {
    category: "Appetizers",
    items: [
      { name: "Falafel Hummus Platter", price: "490", desc: "Served with pita" },
      { name: "Malai Broccoli", price: "390", desc: "Cream-marinated charred broccoli" },
      { name: "Crunchy Tempura Sushi (8 pcs)", price: "650", desc: "Crispy sushi rolls" },
      { name: "Cheese Garlic Bread (4 pcs)", price: "390", desc: "Warm baked with cheese" },
      { name: "Mexican Tacos (6 pcs)", price: "490", desc: "Spiced beans, salsa, and cheese" },
      { name: "Chilli Paneer", price: "410", desc: "Indo-Chinese classic" },
    ]
  },
  {
    category: "Soups & Salads",
    items: [
      { name: "Tomato Soup", price: "320", desc: "Rich and creamy tomato" },
      { name: "Khao Suey", price: "490", desc: "Burmese coconut noodle soup" },
      { name: "Mushroom Soup", price: "350", desc: "Earthy and warm" },
      { name: "Caprese Salad", price: "590", desc: "Tomatoes, mozzarella, fresh basil" },
      { name: "Watermelon Feta Salad", price: "490", desc: "Sweet, salty, and refreshing" },
    ]
  },
  {
    category: "Main Course",
    items: [
      { name: "Barbie Pasta in Conchiglie", price: "550", desc: "Pink sauce pasta shells" },
      { name: "Gochujang Aglio Olio", price: "490", desc: "Spaghetti with a Korean twist" },
      { name: "Margherita Pizza Minnis (6 pcs)", price: "490", desc: "Fresh basil, tomato, cheese" },
      { name: "Pesto Pizza Minnis (6 pcs)", price: "510", desc: "Creamy pesto and mozzarella" },
      { name: "Burrito Bowl", price: "550", desc: "Rice, beans, fresh salsa" },
      { name: "Thai Curry with Jasmine Rice", price: "650", desc: "Green, Red, or Yellow curry" },
    ]
  },
  {
    category: "Desserts",
    items: [
      { name: "Serradura (Strawberry / Pineapple)", price: "350", desc: "Portuguese biscuit dessert" },
      { name: "Belgian Chocolate Mud Cup", price: "375", desc: "Rich and gooey chocolate" },
      { name: "Sizzling Toffee Brownie", price: "390", desc: "Served with vanilla ice cream" },
      { name: "Deconstructed Chocolate Cookie", price: "310", desc: "Warm and decadent" },
    ]
  }
];

const TESTIMONIALS = [
  {
    name: "Aisha S.",
    review: "The aesthetic here is just soothing. Absolutely in love with the Rose Water Croissant. It's my go-to weekend spot now.",
    rating: 5,
  },
  {
    name: "Rohan M.",
    review: "Incredible coffee and such a calm vibe. The baristas are super friendly and the pour overs are perfectly brewed.",
    rating: 5,
  },
  {
    name: "Meera D.",
    review: "The Lavender Latte is out of this world! Perfect place to unwind after a long day.",
    rating: 5,
  },
  {
    name: "Priya K.",
    review: "A hidden gem! It feels like a little piece of artisan heaven right in the middle of Jaipur. Fantastic service.",
    rating: 5,
  },
  {
    name: "Vikram S.",
    review: "Excellent ambiance and a great selection of pastries. The perfect aesthetic for my Instagram feed.",
    rating: 5,
  },
  {
    name: "Karan V.",
    review: "Love the minimalist decor. I come here to work often, great WiFi, comfortable seating, and the dark roast is refreshing.",
    rating: 4,
  },
  {
    name: "Neha R.",
    review: "Absolutely love the matcha here. It's authentic and perfectly balanced. Five stars all the way!",
    rating: 5,
  },
  {
    name: "Aryan T.",
    review: "Cozy vibes, fast WiFi, and the cold brew hits the spot. Highly recommend for remote workers.",
    rating: 4,
  }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'beverages' | 'food'>('beverages');

  return (
    <div className="min-h-screen font-sans selection:bg-pastel-pink-darker selection:text-cafe-brown relative overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-pastel-pink-darker rounded-full blur-3xl opacity-60 -z-10"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-[400px] h-[400px] bg-pastel-green rounded-full blur-3xl opacity-60 -z-10"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-pastel-pink/80 backdrop-blur-md border-b border-pastel-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex flex-col items-center justify-center pt-2">
              <div className="relative w-8 h-8 mb-1.5 text-cafe-brown">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="absolute inset-0 w-full h-full">
                  <rect x="25" y="25" width="50" height="50" />
                  <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
                  <rect x="28" y="28" width="44" height="44" transform="rotate(22.5 50 50)" />
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-serif text-[16px] font-medium text-cafe-brown tracking-[0.15em] uppercase leading-none mb-1">Pastellia</span>
                <span className="text-[6px] uppercase tracking-[0.3em] text-cafe-dark leading-none">An Artisan's Crease</span>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-12 items-center text-xs uppercase tracking-widest font-semibold text-cafe-dark">
              <a href="#menu" className="hover:text-cafe-brown transition-colors">Menu</a>
              <a href="#about" className="hover:text-cafe-brown transition-colors">Our Story</a>
              <a href="#visit" className="hover:text-cafe-brown transition-colors">Visit</a>
              <a href="https://www.zomato.com/jaipur/pastellia-an-artisans-crease-1-shastri-nagar" target="_blank" rel="noopener noreferrer" className="text-cafe-accent hover:text-cafe-brown transition-all">
                Order Online
              </a>
            </div>

            <button 
              className="md:hidden p-2 text-cafe-brown"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-pastel-pink-darker p-4 space-y-4"
          >
            <a href="#menu" className="block text-center py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Menu</a>
            <a href="#about" className="block text-center py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Our Story</a>
            <a href="#visit" className="block text-center py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Visit</a>
            <a href="https://www.zomato.com/jaipur/pastellia-an-artisans-crease-1-shastri-nagar" target="_blank" rel="noopener noreferrer" className="block text-center w-full bg-cafe-brown text-white px-5 py-3 rounded-full font-medium">Order Online</a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-8 text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-bold text-cafe-accent mb-4">
              <span className="w-2 h-2 rounded-full bg-cafe-accent" />
              Now serving spring seasonal menu
            </div>
            <h1 className="text-[60px] sm:text-[90px] lg:text-[110px] leading-[0.9] font-serif mb-8 text-cafe-brown">
              Sip slowly. <br className="hidden lg:block"/>
              <span className="italic ml-8 lg:ml-16 text-cafe-accent">Savor softly.</span>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-cafe-dark mb-10 mx-auto lg:mx-0">
              We bake memories and brew moments. Welcome to your cozy pastel sanctuary in the heart of the city.
            </p>
            <div className="flex items-center gap-6 justify-center lg:justify-start">
              <a href="#menu" className="px-10 py-4 bg-cafe-brown text-white text-sm uppercase tracking-widest font-bold rounded-full hover:bg-cafe-brown/90 transition-all flex items-center gap-2">
                Explore Menu
              </a>
              <div className="hidden sm:block w-12 h-[1px] bg-cafe-brown"></div>
              <a href="#visit" className="hidden sm:block text-xs uppercase tracking-widest font-bold text-cafe-dark/60 hover:text-cafe-brown transition-all">
                Find Us
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex-1 w-full max-w-2xl lg:max-w-none relative h-full flex items-center justify-center p-8"
          >
            {/* Soft decorative blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-md bg-gradient-to-tr from-pastel-pink-darker to-pastel-lavender rounded-full blur-3xl opacity-50 -z-10" />
            
            <div className="relative rounded-[160px] overflow-hidden aspect-[4/5] sm:aspect-square lg:aspect-[4/5] shadow-xl border-[12px] border-white rotate-3 bg-pastel-yellow z-10 w-full max-w-[320px]">
              <img 
                src="https://res.cloudinary.com/dqtj9xtfw/image/upload/v1780658523/IMG_20260605_164827_koii32.jpg" 
                alt="Pastellia Cafe interior"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute bottom-12 left-0 md:left-12 w-[240px] bg-white p-8 shadow-lg rounded-2xl -rotate-6 z-20">
              <span className="text-[10px] uppercase tracking-[0.2em] text-cafe-accent font-bold block mb-2 italic">Signature</span>
              <h3 className="text-xl font-serif mb-3 text-cafe-brown">Sip slowly</h3>
              <p className="text-xs text-cafe-dark leading-normal mb-4">Crafted with ethically sourced beans and fresh local ingredients.</p>
            </div>
            
            <div className="absolute top-1/4 right-0 md:right-12 w-16 h-16 bg-pastel-blue rounded-full flex items-center justify-center text-white font-serif text-2xl shadow-lg z-20">
              &amp;
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full Menu Section */}
      <section id="menu" className="py-24 bg-white/50 px-4 border-t border-pastel-yellow relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pastel-lavender rounded-full blur-3xl opacity-30 -z-10 mix-blend-multiply flex-shrink-0" />
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-[50px] font-serif text-cafe-brown leading-tight">The Menu</h2>
            <p className="text-cafe-dark max-w-2xl mx-auto text-sm tracking-widest uppercase mb-10">
              Hand-crafted pour overs, signature mocktails, and decadent bites.
            </p>
          </motion.div>

          {/* Menu Toggles */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-4 mb-20"
          >
            <button 
              onClick={() => setActiveMenu('beverages')}
              className={`px-8 py-3 text-xs uppercase tracking-widest font-bold rounded-full transition-all ${
                activeMenu === 'beverages' ? 'bg-cafe-brown text-white' : 'bg-transparent text-cafe-brown border border-cafe-brown hover:bg-cafe-brown/10'
              }`}
            >
              Beverages
            </button>
            <button 
              onClick={() => setActiveMenu('food')}
              className={`px-8 py-3 text-xs uppercase tracking-widest font-bold rounded-full transition-all ${
                activeMenu === 'food' ? 'bg-cafe-brown text-white' : 'bg-transparent text-cafe-brown border border-cafe-brown hover:bg-cafe-brown/10'
              }`}
            >
              Food
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 gap-y-24">
            {(activeMenu === 'beverages' ? BEVERAGES_MENU : FOOD_MENU).map((category, idx) => (
              <motion.div 
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col space-y-8 relative"
              >
                {/* Section Header */}
                <div className="border-b border-cafe-brown/20 pb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-cafe-accent font-bold block mb-1 italic">Chapter 0{idx + 1}</span>
                  <h3 className="font-serif text-2xl text-cafe-brown">{category.category}</h3>
                </div>

                {/* Items List */}
                <div className="space-y-6 flex-1">
                  {category.items.map((item) => (
                    <div key={item.name} className="group relative">
                      <div className="flex justify-between items-baseline gap-4 mb-1">
                        <h4 className="font-serif text-lg text-cafe-brown group-hover:text-cafe-accent transition-colors">
                          {item.name}
                        </h4>
                        <div className="flex-1 border-b border-dotted border-cafe-brown/20 relative -top-1 opacity-50"></div>
                        <span className="text-[11px] uppercase tracking-widest text-cafe-dark font-medium">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-cafe-dark/70 uppercase tracking-widest leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white px-4 border-t border-pastel-yellow overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-[40px] font-serif text-cafe-brown leading-tight tracking-tight">Word on the Street</h2>
            <p className="text-cafe-dark max-w-2xl mx-auto text-sm tracking-widest uppercase">
              What our lovely patrons are saying.
            </p>
          </motion.div>

          <div className="relative w-full overflow-hidden py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex w-max animate-scroll-ltr hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-6 px-3">
                  {TESTIMONIALS.map((testimonial, idx) => (
                    <div
                      key={`${i}-${idx}`}
                      className="w-[300px] md:w-[350px] whitespace-normal bg-pastel-pink/30 p-8 rounded-3xl border border-pastel-yellow/50 flex flex-col justify-between hover:bg-pastel-pink/50 transition-colors shrink-0"
                    >
                      <div>
                        <Quote className="w-8 h-8 text-cafe-accent mb-4 opacity-50" />
                        <p className="text-cafe-dark leading-relaxed mb-6">"{testimonial.review}"</p>
                      </div>
                      <div>
                        <div className="flex gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-cafe-accent text-cafe-accent' : 'text-cafe-brown/20'}`} />
                          ))}
                        </div>
                        <p className="font-serif text-cafe-brown font-bold tracking-wide">{testimonial.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Gradient overlays for aesthetic horizontal scroll fading */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white via-white to-transparent pointer-events-none hidden sm:block"></div>
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white via-white to-transparent pointer-events-none hidden sm:block"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-pastel-yellow/30 px-4 border-t border-pastel-yellow">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="aspect-[3/4] max-w-md mx-auto rounded-[100px] overflow-hidden border-[12px] border-white shadow-xl rotate-[-2deg] bg-pastel-pink/20">
               <img 
                src="https://res.cloudinary.com/dqtj9xtfw/image/upload/v1780659893/1000049760-removebg-preview_ynsoik.png" 
                alt="Chef Palak Agarwal, Founder of Pastellia"
                className="w-full h-full object-cover object-bottom"
              />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
          >
            <h2 className="text-[50px] font-serif text-cafe-brown leading-[1.1]">More than just <br/><span className="text-cafe-accent italic">coffee.</span></h2>
            <p className="text-lg text-cafe-dark leading-relaxed max-w-md">
              Founded in 2026 by Chef Palak Agarwal, Pastellia was born out of a desire for a softer, kinder space in the bustling city. A place where you can pause, breathe, and enjoy the little sweet things in life.
            </p>
            <p className="text-lg text-cafe-dark/80 font-light leading-relaxed">
              We believe in the power of aesthetics to elevate mood. Every pastry is hand-crafted, and every cup is poured with intention. Whether you're here to work, meet a friend, or simply read a book, our doors are open.
            </p>
            <div className="pt-4">
               <span className="font-serif text-2xl italic text-cafe-brown leading-loose tracking-wide">~ Chef Palak Agarwal, Owner & Founder</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Order Online Section */}
      <section className="pt-24 pb-16 bg-pastel-pink relative z-10 border-t border-pastel-yellow flex flex-col items-center mt-12 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center w-full"
        >
          <div className="w-16 h-16 bg-pastel-lavender rounded-2xl flex items-center justify-center text-cafe-brown mb-6 rotate-3 shadow-sm">
            <ThumbsUp className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-cafe-brown mb-2 tracking-tight">Order Online</h3>
          <p className="text-cafe-dark mb-10 text-base">Get your favourites delivered fast.</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 px-4">
            <a href="https://www.zomato.com/jaipur/pastellia-an-artisans-crease-1-shastri-nagar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-white border border-pastel-yellow rounded-2xl shadow-sm hover:shadow-md transition-all text-[#E23744] min-w-[200px] justify-center hover:scale-[1.02]">
              <span className="font-bold text-4xl italic tracking-tighter leading-none pt-1">zomato</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Marquee Container */}
      <div className="w-full bg-pastel-yellow/60 py-4 border-y border-pastel-yellow flex overflow-hidden whitespace-nowrap relative z-10">
        <div className="animate-scroll inline-flex items-center gap-12 px-6 w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="flex items-center gap-3 text-cafe-brown font-bold text-sm tracking-widest uppercase"><Sparkles className="w-5 h-5 text-cafe-accent"/> Cozy Space</span>
              <span className="flex items-center gap-3 text-cafe-brown font-bold text-sm tracking-widest uppercase"><Coffee className="w-5 h-5 text-cafe-accent"/> Handcrafted Drinks</span>
              <span className="flex items-center gap-3 text-cafe-brown font-bold text-sm tracking-widest uppercase"><Zap className="w-5 h-5 text-cafe-accent"/> Local Roasts</span>
              <span className="flex items-center gap-3 text-cafe-brown font-bold text-sm tracking-widest uppercase"><Globe className="w-5 h-5 text-cafe-accent"/> Global Flavor</span>
              <span className="flex items-center gap-3 text-cafe-brown font-bold text-sm tracking-widest uppercase"><Smile className="w-5 h-5 text-cafe-accent"/> Friendly Baristas</span>
              <span className="flex items-center gap-3 text-cafe-brown font-bold text-sm tracking-widest uppercase"><Heart className="w-5 h-5 text-cafe-accent"/> Great Coffee</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Visit */}
      <footer id="visit" className="bg-pastel-pink text-cafe-brown py-20 px-4 relative z-10 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          
          {/* Col 1: Logo & Socials */}
          <div className="flex flex-col items-start space-y-6">
            <div className="flex flex-col items-start mb-2">
              <div className="relative w-16 h-16 mb-4 text-cafe-brown">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute inset-0 w-full h-full">
                  <rect x="25" y="25" width="50" height="50" />
                  <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
                  <rect x="28" y="28" width="44" height="44" transform="rotate(22.5 50 50)" />
                </svg>
              </div>
              <span className="font-serif text-3xl font-medium text-cafe-brown tracking-[0.15em] uppercase leading-none mb-3">Pastellia</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-cafe-brown/80 leading-none">An Artisan's Crease</span>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/pastellia.cafe?igsh=MTQwd2Z3dHF5dmNzYQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white hover:scale-110 transition-transform shadow-md">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/919521047710" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-[#25D366] text-white hover:scale-110 transition-transform shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-bold text-cafe-brown uppercase tracking-widest text-sm mb-2">Quick Links</h4>
            <a href="#about" className="text-sm font-medium text-cafe-dark hover:text-cafe-accent transition-colors w-fit">About us</a>
            <a href="#menu" className="text-sm font-medium text-cafe-dark hover:text-cafe-accent transition-colors w-fit">Menu</a>
            <a href="#visit" className="text-sm font-medium text-cafe-dark hover:text-cafe-accent transition-colors w-fit">Contact</a>
            <a href="https://www.zomato.com/jaipur/pastellia-an-artisans-crease-1-shastri-nagar" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-cafe-dark hover:text-cafe-accent transition-colors w-fit">Zomato</a>
            <a href="#" className="text-sm font-medium text-cafe-dark hover:text-cafe-accent transition-colors w-fit">Privacy Policy</a>
            <a href="#" className="text-sm font-medium text-cafe-dark hover:text-cafe-accent transition-colors w-fit">Terms & Condition</a>
          </div>

          {/* Col 3: Reach Us On */}
          <div className="flex flex-col space-y-5">
            <h4 className="font-bold text-cafe-brown uppercase tracking-widest text-sm mb-1">Reach Us On</h4>
            <a href="mailto:info@pastellia.co" className="flex items-center gap-3 text-sm font-medium text-cafe-dark hover:text-cafe-accent transition-colors w-fit">
              <Mail className="w-5 h-5 shrink-0 text-cafe-brown" />
              <span>info@pastellia.co</span>
            </a>
            <a href="tel:+9109521047710" className="flex items-center gap-3 text-sm font-medium text-cafe-dark hover:text-cafe-accent transition-colors w-fit">
              <Phone className="w-5 h-5 shrink-0 text-cafe-brown" />
              <span>095210 47710</span>
            </a>
            <a href="https://maps.app.goo.gl/V4Y2gS9GAHg9hAz47" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm font-medium text-cafe-dark hover:text-cafe-accent transition-colors w-fit">
              <MapPin className="w-5 h-5 shrink-0 mt-1 text-cafe-brown" />
              <span className="leading-relaxed">Shastri Nagar, <br />Jaipur, RJ</span>
            </a>
          </div>

          {/* Col 4: Map Location */}
          <div className="w-full h-full min-h-[200px] h-[250px] bg-pastel-yellow rounded-2xl overflow-hidden shadow-sm border border-pastel-yellow relative">
            {/* Embedded Google Map pointing to Shastri Nagar, Jaipur */}
            <iframe
              src="https://maps.google.com/maps?q=Shastri%20Nagar,%20Jaipur&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pastellia Cafe Map Location"
              className="absolute inset-0"
            ></iframe>
          </div>

        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-7xl mx-auto mt-16 pt-8 border-t border-cafe-brown/10 text-cafe-dark text-xs flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="font-medium">Pastellia Cafe 2026, All rights reserved.</p>
          <p className="opacity-70">Design & Development fitting the Artisanal theme.</p>
        </motion.div>
      </footer>
    </div>
  );
}

