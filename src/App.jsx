import React, { useState, useEffect, useRef } from 'react';

import './App.css';
import Store from './Store';
import LoginModal from './LoginModal';
import Profile from './Profile';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.jsx';
import Feedback from './Feedback';

import gym1 from "./assets/images/gym1.jpg";
import banner from "./assets/images/banner.jpg";
import yogaMeditation from "./assets/images/yoga-meditation.jpg";
import yoga from "./assets/images/yoga.jpg";
import cardio from "./assets/images/cardio.jpg";
import trainer from "./assets/images/trainer.jpg";
import gym2 from "./assets/images/gym2.jpg";
import dance from "./assets/images/dance.jpg";
import img1 from "./assets/images/img1.jpg";
import functionalTraining from "./assets/images/functional-training.jpg";
import img2 from "./assets/images/img2.jpg";
import img3 from "./assets/images/img3.jpg";
import img4 from "./assets/images/img4.jpg";
import user1 from "./assets/images/user1.jpg";
import user2 from "./assets/images/user2.jpg";
import user3 from "./assets/images/user3.jpg";
import img5 from "./assets/images/img5.jpg";
import img6 from "./assets/images/img6.jpg";
import img7 from "./assets/images/img7.jpg";
import img8 from "./assets/images/img8.jpg";
import img9 from "./assets/images/img9.jpg";
import user4 from "./assets/images/user4.jpg";
import user5 from "./assets/images/user5.jpg";
import user6 from "./assets/images/user6.jpg";
import user7 from "./assets/images/user7.jpg";
import trainer1 from "./assets/images/trainer1.jpg";
import trainer2 from "./assets/images/trainer2.jpg";
import trainer3 from "./assets/images/trainer3.jpg";
import trainer4 from "./assets/images/trainer4.jpg";
import img10 from "./assets/images/img10.jpg";
import img11 from "./assets/images/img11.jpg";
import img12 from "./assets/images/img12.jpg";
import img13 from "./assets/images/img13.jpg";
import img14 from "./assets/images/img14.jpg";
import img15 from "./assets/images/img15.jpg";
import img16 from "./assets/images/img16.jpg";
import img17 from "./assets/images/img17.jpg";
import img18 from "./assets/images/img18.jpg";
import img19 from "./assets/images/img19.jpg";
import img20 from "./assets/images/img20.jpg";
import img21 from "./assets/images/img21.jpg";
import card1 from "./assets/images/card1.jpg";
import card2 from "./assets/images/card2.jpg";
import card3 from "./assets/images/card3.jpg";
import member1 from "./assets/images/member1.jpg";
import member2 from "./assets/images/member2.jpg";
import member3 from "./assets/images/member3.jpg";
import review1 from "./assets/images/review1.jpg";
import review2 from "./assets/images/review2.jpg";
import review3 from "./assets/images/review3.jpg";
import review4 from "./assets/images/review4.jpg";
import review5 from "./assets/images/review5.jpg";
import coach1 from "./assets/images/coach1.avif";
import coach2 from "./assets/images/coach2.avif";
import coach3 from "./assets/images/coach3.avif";
import { img } from 'framer-motion/client';
/// ૧. મુખ્ય પ્રોડક્ટ્સ અને પ્લાન્સનો ડેટા
const servicesData = {
  "cultpass Home": {
  title: "cultpass HOME",
  price: "₹116 / month*",
  offerText: "EXTRA 1400 OFF + 3 MONTHS EXTENSION",
  features: [
    "1200+ at-home workouts across formats including strength, dance & yoga",
    "30+ goal based fitness programs",
    "Meditation sessions, health podcasts and more"
  ],
  bgImage: gym1
},
  
  "cult Transform": {
    title: "cult TRANSFORM",
    price: "₹999 / month*",
    offerText: "SAVE UP TO ₹3000 ON ANNUAL PLAN",
    features: [
      "Personalized Elite Fitness & Habit Coach via WhatsApp",
      "Tailor-made customized diet plans & macro tracking",
      "Includes complimentary unlimited cultpass HOME subscription"
    ],
    bgImage: img1
  },
  "Bootcamp": {
    title: "cult BOOTCAMP",
    price: "₹1499 / program*",
    offerText: "EARLY BIRD 15% DISCOUNT INCLUDED",
    features: [
      "Intensive 6-week weight loss group challenges",
      "Dedicated group fitness trainer & weekly nutritionist check-ins",
      "Peer accountability with daily meal photo tracking via WhatsApp"
    ],
     bgImage: img2
  },
  "Transform Plus": {
    title: "TRANSFORM PLUS",
    price: "₹2499 / month*",
    offerText: "LIMITED SLOTS AVAILABLE FOR THIS BATCH",
    features: [
      "Concierge-style team of 3 specialized expert coaches",
      "Bi-weekly adaptive nutrition plans & deep medical history analysis",
      "Direct video/call support with advanced progressive training routines"
    ],
    bgImage: img3,
  }, // <--- અહીં કોમા (,) મૂકવો ખૂબ જરૂરી છે
  
  "Luxury Gym": {
    title: "LUXURY GYM",
    price: "₹4999 / month*",
    offerText: "PREMIUM ACCESS TO ALL EQUIPMENT",
    features: [
      "Access to premium fitness centers",
      "Personal locker & shower facilities",
      "Complimentary smoothie bar & towels"
    ],
    bgImage: img4,
  } // <--- અહીં કોઈ કોમાની જરૂર નથી
};

const reviewsData = [
  { name: "Rahul Sharma", rating: 5, comment: "cult.transform is amazing! Lost 5kg in just 2 months.", img: user1, },
  { name: "Priya Patel", rating: 5, comment: "The coaches are very helpful and diet plans are easy to follow.",  img: user2, },
  { name: "Amit Shah", rating: 4, comment: "Good experience, really helped me build consistency.", img: user3, }
  
];
// બસ આ લાઈન અહીં કોપી કરીને પેસ્ટ કરી દો
const transformPricing = [
  { months: "3 MONTHS", price: "INR 4499", oldPrice: "5499", note: "1500 per month*", desc: "Only Today | Additional ₹500 off applied." },
  { months: "6 MONTHS", price: "INR 5999", oldPrice: "8499", note: "1000 per month*", desc: "Only Today | Additional ₹1500 off applied. + No cost EMI Available" },
  { months: "12 MONTHS", price: "INR 7499", oldPrice: "9999", note: "625 per month*", desc: "Only Today | Additional ₹2000 off applied. + No cost EMI Available" }
];

// ૨. લાઈવ ટ્રેનર્સ વર્કઆઉટ સ્લાઇડરનો ડેટા
const liveWorkoutsData = [
 {
  trainer: "Shwetha Rahul",
  title: "Power Yoga",
  level: "YOGA • BEGINNER • 35 Min",
  img: yoga
},
 { 
  trainer: "Gaurav C",
  title: "Vinyasa Yoga",
  level: "YOGA • INTERMEDIATE • 49 Min",
  img: trainer
},
  {
  trainer: "Sanjeet Kumar",
  title: "Cardio HIIT",
  level: "CARDIO • INTERMEDIATE • 40 Min",
  img: gym2
},
 {
  trainer: "Anjali Shah",
  title: "Dance Fitness",
  level: "DANCE • BEGINNER • 30 Min",
  img: cardio
},
  {
  trainer: "Ranveer Singh",
  title: "Strength Labs",
  level: "STRENGTH • ADVANCED • 45 Min",
  bgImage: img5
}
];

// ૩. AT-HOME કેટેગરીઝ સ્લાઇડરનો ડેટા
const atHomeCategories = [
  {
  name: "DANCE FITNESS",
  sub: "CARDIO • ENDURANCE",
  img: dance
},
  {
  name: "YOGA",
  sub: "FLEXIBILITY • MINDFULNESS",
  img: yogaMeditation
},
  {
  name: "BOXING",
  sub: "CORE STRENGTH • FAT BURN",
  img: img6
},
  { name: "EQUIPMENTS", sub: "CORE STRENGTH • STAMINA", img: img7 },
  { name: "PILATES", sub: "FLEXIBILITY • TONING",  img: img8 }
];

// ૪. બેસ્ટ ઇન ક્લાસ ટ્રેનર્સ ડેટા
const expertTrainersData = [
  { name: "ANIL", format: "YOGA", img: img9 },
  { name: "GURMEET", format: "BOXING", img: user4, },
  { name: "DIVYA", format: "YOGA", img: user5, },
  { name: "ISHITA", format: "DANCE", img: user6,}
];

// ૫. ગોલ-બેઝ્ડ પ્રોગ્રામ્સ ડેટા
const goalProgramsData = [
  { title: "SHED IT 2", coach: "with Vasudha", tag: "",  img: user7, },
  { title: "SHED IT", coach: "with Vasudha", tag: "", img:trainer1, },
  { title: "BALANCED BURN", coach: "Fat Loss Yoga with Naveen Sharma", tag: "SEASON 1", img: trainer2, },
  { title: "Face Yoga", coach: "with Mansi & Divya", tag: "", img: trainer3, },
  { title: "BELLY BURN", coach: "with Suvini & Tom", tag: "POPULAR", img: trainer4 }
];

export default function App() {
  // ૧. અહીં માત્ર એક જ વાર સ્ટેટ ડિક્લેર કરો (localStorage વાળું)
  const [user, setUser] = useState(localStorage.getItem('isLoggedIn') === 'true');
  // App.jsx ની અંદર
  const [subscribed, setSubscribed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
const [showModal, setShowModal] = useState(true); // અહીં true કરવાથી સીધું લોગિન મોડલ ખુલશે
  const [activeTab, setActiveTab] = useState("cultpass Home");
  const [activeIndex, setActiveIndex] = useState(null);
  const [transformSlide, setTransformSlide] = useState(0);
const currentData = servicesData[activeTab] || {
  title: "Fitness",
  features: [],
  price: "0",
  bgImage: ""
};
const handleBuyNow = (durationText, price) => {
  // લોગિન થયેલા યુઝરનો ઈમેલ મેળવો
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const email = loggedInUser.email;

  if (!email) {
    alert("પ્લાન ખરીદવા માટે પહેલા લોગિન કરો!");
    return;
  }

  const startDate = new Date();
  const monthCount = parseInt(durationText.split(' ')[0]) || 1; 
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + monthCount);

  const newPlan = {
    duration: durationText,
    price: price,
    startDate: startDate.toLocaleDateString('en-GB'),
    endDate: endDate.toLocaleDateString('en-GB')
  };

  // 'myPlans' ને બદલે 'myPlans_' + email વાપરો
  const existingPlans = JSON.parse(localStorage.getItem(`myPlans_${email}`) || '[]');
  const updatedPlans = [...existingPlans, newPlan];
  
  localStorage.setItem(`myPlans_${email}`, JSON.stringify(updatedPlans));
  
  alert("સફળતાપૂર્વક પ્લાન એક્ટિવેટ થયો!");
  setActiveTab("PROFILE");
};

// App.jsx માં આ useEffect ઉમેરો
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(!!currentUser); // જો યુઝર હોય તો true, ન હોય તો false
  });
  return () => unsubscribe();
}, []);
  // ૨. ટાઈમરવાળું useEffect (જે મોડલ ૧ સેકન્ડ પછી ખોલે છે)
  // આ લૂપનું કારણ છે
useEffect(() => {
  // જો યુઝર ઓલરેડી લોગિન હોય, તો કંઈ ન કરો
  if (user) return; 

  const timer = setTimeout(() => {
    setShowModal(true);
  }, 1000);
  
  return () => clearTimeout(timer);
}, [user]); // અહીં [user] ઉમેરો જેથી જ્યારે user સ્ટેટ બદલાય ત્યારે આ ચેક થાય ખાલી એરે [] હોવા છતાં, જ્યારે પણ App component રિ-રેન્ડર થાય, ત્યારે આ ફરી ટ્રિગર થઈ શકે છે
  
const selectRef = useRef(null);

const handlePinClick = () => {
  if (selectRef.current) {
    selectRef.current.focus();
  }
};

  // ... બાકીનો તમારો કોડ (transformImages, timeLeft, વગેરે) અહીં લખો ...

  // ... બાકીનો કોડ જેવો છે તેવો જ રહેવા દો ...
  // ... બાકીનો તમારો બધો કોડ અહીં જ રહેશે
  const transformImages = [
    img10,
     img11,
     img12,
    img13,
     img14,
  ];
  
  const [timeLeft, setTimeLeft] = useState({ days: 13, hours: 22, minutes: 52, seconds: 22 });
  const [currentSlide, setCurrentSlide] = useState(0); 
  const [catSlide, setCatSlide] = useState(0);         
  const [programSlide, setProgramSlide] = useState(0); 
const [selectedCity, setSelectedCity] = useState("BANGALORE");
const cities = [
  "BANGALORE", 
  "HSR LAYOUT", 
  "KORAMANGALA", 
  "INDIRANAGAR", 
  "WHITEFIELD", 
  "ELECTRONIC CITY", 
  "BELLANDUR", 
  "JAYANAGAR", 
  "MARATHAHALLI", 
  "MG ROAD", 
  "BANASHANKARI", 
  "SARJAPUR",
  "MUMBAI", 
  "PUNE"
];
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
// ૨. ટ્રાન્સફોર્મ સ્લાઇડર માટેનું નવું useEffect (અહીં મૂકો)
  useEffect(() => {
    if (activeTab === "cult Transform") {
      const timer = setInterval(() => {
        setTransformSlide((prev) => (prev === 4 ? 0 : prev + 1));
      }, 3000); 
      return () => clearInterval(timer);
    }
  }, [activeTab]);
  const nextSlide = () => { if (currentSlide < liveWorkoutsData.length - 3) setCurrentSlide(currentSlide + 1); };
  const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(currentSlide - 1); };

  const nextCat = () => { if (catSlide < atHomeCategories.length - 4) setCatSlide(catSlide + 1); };
  const prevCat = () => { if (catSlide > 0) setCatSlide(catSlide - 1); };

  const nextProgram = () => { if (programSlide < goalProgramsData.length - 4) setProgramSlide(programSlide + 1); };
  const prevProgram = () => { if (programSlide > 0) setProgramSlide(programSlide - 1); };
  const handleJoin = (workout) => {
    const newWorkout = {
    ...workout,
    scheduledTime: "10:00 AM" // અથવા અહીંથી યુઝર પાસેથી ઇનપુટ લેવાયેલ સમય
  };
  
    // ૧. લોગિન થયેલ યુઝરનો ડેટા મેળવો
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const email = loggedInUser.email;

    if (!email) {
      alert("પ્લાન જોઈન કરવા માટે પહેલા લોગિન કરો!");
      return;
    }

    // ૨. યુઝરના ઈમેલ પ્રમાણે અલગ કી બનાવો
    const key = `myWorkouts_${email}`;
    const savedWorkouts = JSON.parse(localStorage.getItem(key) || '[]');
    
    if (!savedWorkouts.find(w => w.title === workout.title)) {
      const updated = [...savedWorkouts, workout];
      localStorage.setItem(key, JSON.stringify(updated)); // નવી કી સાથે સેવ કરો
      alert(`${workout.title} તમારી પ્રોફાઇલમાં એડ થઈ ગયું છે!`);
    } else {
      alert("તમે આ વર્કઆઉટ પહેલેથી જોઈન કરી લીધું છે!");
    }
  };
 const handleGoalSelection = (goalName) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const email = loggedInUser.email;

  if (email) {
    // ૧. જૂનો ડેટા મેળવો (જો ન હોય તો ખાલી ઓબ્જેક્ટ)
    const existingProfile = JSON.parse(localStorage.getItem(`userProfileData_${email}`) || '{}');
    
    // ૨. માત્ર ગોલ અપડેટ કરો, બાકીનો ડેટા અકબંધ રાખો
    const updatedProfile = {
      ...existingProfile,
      fitnessGoal: goalName
    };
    
    // ૩. અપડેટેડ પ્રોફાઇલ સેવ કરો
    localStorage.setItem(`userProfileData_${email}`, JSON.stringify(updatedProfile));
    
    alert(`તમારો ગોલ ${goalName} સેટ થઈ ગયો છે!`);
    setActiveTab("PROFILE");
  } else {
    alert("પ્લીઝ પહેલા લોગિન કરો!");
  }
};
// લિંક માટે ઇન્ટરેક્ટિવ કોમ્પોનન્ટ
const FitnessLink = ({ children, url }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      style={{ color: isHovered ? '#ff4a86' : '#fff', textDecoration: 'none', display: 'block', margin: '10px 0', transition: '0.3s', transform: isHovered ? 'scale(1.05)' : 'scale(1)', fontWeight: isHovered ? 'bold' : 'normal' }}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
    </a>
  );
};
const JoinButton = () => {
  return (
    <button 
      onClick={() => window.open('https://wa.me/919106047691', '_blank')}
      style={{
        background: '#ff4500',
        padding: '15px 30px',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: '0.3s',
        marginTop: '10px'
      }}
      onMouseOver={(e) => e.target.style.background = '#e63e00'}
      onMouseOut={(e) => e.target.style.background = '#ff4500'}
    >
      JOIN NOW VIA WHATSAPP
    </button>
  );
};
 return (
  
  <div>
   {showModal && <LoginModal onClose={() => setShowModal(false)} setUser={setUser} />}
    <nav className="navbar">
  <div className="logo">cult.fit</div>
  {/* એક જ Hamburger Button રાખ્યું છે */}
  <button className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
    ☰
  </button>
  
  {/* ડાયનેમિકલી active ક્લાસ ઉમેર્યો છે */}
    <div className={`nav-links ${showMenu ? 'active' : ''}`}>
   <span
  className="nav-link"
  onClick={() => setShowMenu(!showMenu)}
>
  FITNESS ▼
</span>
      
    <span 
      className={`nav-link ${activeTab === "STORE" ? 'active' : 'inactive'}`} 
      onClick={() => { setActiveTab("STORE"); setShowMenu(false); }}
      style={{ cursor: 'pointer', margin: '0 15px' }}
    >
      STORE
    </span>

  </div>
<div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
  <span>📍</span>
  <select 
    value={selectedCity} 
    onChange={(e) => setSelectedCity(e.target.value)} 
    style={{ 
      border: 'none', 
      background: 'transparent', 
      fontWeight: 'bold', 
      textTransform: 'uppercase',
     
      cursor: 'pointer'
      
    }}
  >
    {cities.map((city) => (
      <option key={city} value={city}>{city}</option>
    ))}
  </select>
</div>

  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <button 
  className="get-app-btn" 
  onClick={() => window.open("https://www.cult.fit/app", "_blank")}
>
  GET APP
</button>
    
<div 
  onClick={() => {
    // અહિયાં સીધું PROFILE ટેબ સેટ કરો
    setActiveTab("PROFILE");
  }} 
  style={{ cursor: 'pointer', fontSize: '24px', margincenter: '5px' }}
>
  👤
</div>
  </div>
</nav>
    {/* અહીં મેં શરત મૂકી છે: જો STORE ન હોય તો જ ટેબ્સ બતાવવા */}
    
{showMenu && (
  <div className="mobile-tabs">
    {Object.keys(servicesData).map((tab) => (
      <button
        key={tab}
        onClick={() => {
          setActiveTab(tab);
          setShowMenu(false);
        }}
      >
        {tab}
      </button>
    ))}
  </div>
)}
    {/* STORE સેક્શન - માત્ર ત્યારે જ દેખાશે જ્યારે STORE પર ક્લિક કરશો */}
    {activeTab === "STORE" && <Store />}
{/* આ રહી તમારી પ્રોફાઇલ પેજની લાઈન: */}
  {/* આ લાઇન શોધો અને તેને આ રીતે અપડેટ કરો */}

{activeTab === "PROFILE" && (
  <Profile 
    key="profile-component" 
    setUser={setUser} 
    setActiveTab={setActiveTab} 
  />
)}

      {/* ૩. મેઇન હીરો ડિસ્પ્લે સેક્શન - માત્ર HOME માટે */}
{activeTab === "cultpass Home" && (
  <main className="main-content">
    <div className="left-section">
      <h1 className="main-title">
        {currentData.title.split(' ')[0]}{' '}
        <span className="highlight-text">{currentData.title.split(' ').slice(1).join(' ')}</span>
      </h1>
      <ul className="features-list">
        {currentData.features.map((f, i) => (
          <li key={i} className="feature-item">
            <span className="bullet-dot">◈</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="price-text">
        Starting at <span className="price-bold">{currentData.price}</span>
      </div>
      <button className="trial-btn">TAKE 7 DAYS FREE TRIAL</button>
    </div>
    <div className="right-section" style={{ backgroundImage: `url(${currentData.bgImage})` }}></div>
  </main>
)}
{/* નવું સ્લાઇડર સેક્શન અહીં મૂકો */}
      {activeTab === "cult Transform" && (
        <section className="transform-slider-section" style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden', marginBottom: '30px' }}>
          <div className="transform-slider-track" style={{ display: 'flex', transition: '0.5s', transform: `translateX(-${transformSlide * 100}%)`, height: '100%' }}>
            {transformImages.map((img, index) => (
              <div key={index} style={{ minWidth: '100%', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            ))}
          </div>
          {/* નેવિગેશન બટન્સ */}
          <button style={{ position: 'absolute', top: '45%', left: '10px' }} onClick={() => setTransformSlide(prev => (prev === 0 ? 4 : prev - 1))}>❮</button>
          <button style={{ position: 'absolute', top: '45%', right: '10px' }} onClick={() => setTransformSlide(prev => (prev === 4 ? 0 : prev + 1))}>❯</button>
        </section>
      )}
      {/* Transform સેક્શન અને તેની નીચેના ૪ બોક્સ */}
{activeTab === "cult Transform" && (
  <>
    {/* હીરો સેક્શન */}
    <section style={{ padding: '40px', textAlign: 'center', backgroundColor: '#0f2430', color: '#fff' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Lose weight for good with</h2>
      
      {/* અહીં આપણે div ના બદલે img ટેગનો ઉપયોગ કર્યો છે */}
      <div style={{ position: 'relative', margin: '0 auto', maxWidth: '800px', borderRadius: '20px', overflow: 'hidden' }}>
        <img 
          src={img15}
          alt="cult Transform" 
          style={{ width: '100%', height: '300px', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <h1 style={{ fontSize: '48px', margin: 0, color: '#fff' }}>cult TRANSFORM</h1>
          <p style={{ color: '#fff' }}>India's no. 1 online sustainable weight loss program</p>
        </div>
      </div>
    </section>

    {/* ૪ બોક્સ વાળું ફીચર સેક્શન */}
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '20px', 
      padding: '40px 20px',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      {/* બોક્સ ૧ */}
      <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '15px', textAlign: 'center', color: '#fff', border: '1px solid #333' }}>
        <h3 style={{ margin: '0 0 10px', color: '#ffcc00' }}>~6KG</h3>
        <p style={{ margin: 0 }}>Weight Loss</p>
      </div>
      {/* બોક્સ ૨ */}
      <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '15px', textAlign: 'center', color: '#fff', border: '1px solid #333' }}>
        <h3 style={{ margin: '0 0 10px', color: '#ffcc00' }}>3</h3>
        <p style={{ margin: 0 }}>Habit Building</p>
      </div>
      {/* બોક્સ ૩ */}
      <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '15px', textAlign: 'center', color: '#fff', border: '1px solid #333' }}>
        <h3 style={{ margin: '0 0 10px', color: '#ffcc00' }}>90%+</h3>
        <p style={{ margin: 0 }}>Consistency</p>
      </div>
      {/* બોક્સ ૪ */}
      <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '15px', textAlign: 'center', color: '#fff', border: '1px solid #333' }}>
        <h3 style={{ margin: '0 0 10px', color: '#ffcc00' }}>92%+</h3>
        <p style={{ margin: 0 }}>Satisfaction</p>
      </div>
    </div>
  </>
)}

  {activeTab === "cult Transform" && (
  <>
    {/* Get access to સેક્શન */}
    <section style={{ padding: '40px', backgroundColor: '#0f2430', color: '#fff' }}>
      <h2 style={{ textAlign: 'center' }}>Get access to</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '10px' }}>
          <h3>Custom Workout Plans</h3>
          <p>Your coach creates a routine that fits your travel plans, schedule, and goals.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '10px' }}>
          <h3>Transform Coach</h3>
          <p>Your coach checks in daily to keep you accountable and track your progress.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '10px' }}>
          <h3>Tailored Meals</h3>
          <p>Scientific approach to nutrition with options to satisfy your taste buds.</p>
        </div>
      </div>
    </section>

    {/* 24/7 Chat Support સેક્શન */}
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#0f2430', color: '#fff' }}>
      <p>And much more, including 24/7 chat support!</p>
    </div>
  </>
)}
      {/* ૪. ઓફર કાઉન્ટડાઉન ટાઈમર બેનર - માત્ર Home માટે */}
{activeTab === "cultpass Home" && (
  <section className="timer-banner">
    <div className="banner-left">
      <h2>{currentData.title}</h2>
      <p>{currentData.offerText}</p>
    </div>
    <div className="timer-container">
      <div className="time-segment">
        <span className="time-number">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="time-label">Days</span>
      </div>
      <span className="timer-separator">:</span>
      <div className="time-segment">
        <span className="time-number">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="time-label">Hrs</span>
      </div>
      <span className="timer-separator">:</span>
      <div className="time-segment">
        <span className="time-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="time-label">Mins</span>
      </div>
      <span className="timer-separator">:</span>
      <div className="time-segment">
        <span className="time-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="time-label">Sec</span>
      </div>
    </div>
  </section>
)}
{activeTab === "Bootcamp" && (
  <section style={{ 
    padding: '80px 40px', 
    backgroundColor: '#000', 
    color: '#fff', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px'
  }}>
    
    {/* ડાબી બાજુનું લખાણ */}
    <div style={{ maxWidth: '500px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px', lineHeight: '1.1' }}>
        A 6-WEEK WEIGHT LOSS PROGRAM
      </h1>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: '20px', lineHeight: '2' }}>
        <li>➤ Small batch workouts at center</li>
        <li>➤ 1:1 Nutritionist & personalised meal plans</li>
        <li>➤ Lifestyle coach to help you with healthy habits</li>
      </ul>

      {/* બટન (a tag ને સ્ટાઈલ કરીને) */}
      <a 
        href="https://wa.me/919106047691?text=Hi, I am interested in the Bootcamp program." 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '15px 40px',
          backgroundColor: '#fff', 
          color: '#000',          
          textDecoration: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          fontSize: '16px',
          marginTop: '30px',
          cursor: 'pointer',
          textAlign: 'center',
          transition: '0.3s',
          border: 'none'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
      >
        TALK TO EXPERT
      </a>
    </div>

    {/* જમણી બાજુ ફોટો */}
    <div style={{ width: '400px', flexShrink: 0 }}>
      <img 
        src={img16}
        alt="Bootcamp" 
        style={{ width: '100%', borderRadius: '15px' }} 
      />
    </div>
  </section>
)}
{activeTab === "Bootcamp" && (
  <section style={{ padding: '60px 40px', backgroundColor: '#000', color: '#fff' }}>
    <h3 style={{ fontSize: '18px', color: '#aaa', marginBottom: '10px' }}>How it works</h3>
    <h1 style={{ fontSize: '42px', marginBottom: '50px', maxWidth: '500px' }}>Weight loss made simple, fun & permanent!</h1>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
  
  {/* પોઈન્ટ ૧ */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <div style={{ border: '1px solid #fff', borderRadius: '50%', padding: '15px' }}>📍</div>
    <div>
      <h3 style={{ margin: '0' }}>Small group workouts with personalised trainer attention</h3>
    </div>
  </div>
      
  {/* પોઈન્ટ ૨ */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <div style={{ border: '1px solid #fff', borderRadius: '50%', padding: '15px' }}>🍎</div>
    <div>
      <h3 style={{ margin: '0' }}>1:1 Nutrition coach & personalised meal plans</h3>
    </div>
  </div>

  {/* પોઈન્ટ ૩ */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <div style={{ border: '1px solid #fff', borderRadius: '50%', padding: '15px' }}>💪</div>
    <div>
      <h3 style={{ margin: '0' }}>Coaches will help you build discipline & healthy habits</h3>
    </div>
  </div>

</div>
  </section>
)}
{activeTab === "Bootcamp" && (
  <section style={{ padding: '60px 20px', backgroundColor: '#000', color: '#fff' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Features</h2>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '25px', 
      maxWidth: '1200px', 
      margin: 'auto' 
    }}>
      
      {/* કાર્ડ ૧: Weekly Masterclasses */}
      <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '15px' }}>
        <div style={{ fontSize: '40px', marginBottom: '20px' }}>🥗</div>
        <h3>Weekly masterclasses</h3>
        <p style={{ color: '#aaa' }}>Workshops by experts on various aspects of weight loss</p>
      </div>

      {/* કાર્ડ ૨: Community */}
      <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '15px' }}>
        <div style={{ fontSize: '40px', marginBottom: '20px' }}>👥</div>
        <h3>Community</h3>
        <p style={{ color: '#aaa' }}>Strong and accountable community with a singular vision</p>
      </div>

      {/* કાર્ડ ૩: Sustain the weight loss */}
      <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '15px' }}>
        <div style={{ fontSize: '40px', marginBottom: '20px' }}>📊</div>
        <h3>Sustain the weight loss</h3>
        <p style={{ color: '#aaa' }}>A plan that ensures you don't gain the weight back</p>
      </div>

    </div>
  </section>
)}
{activeTab === "Bootcamp" && (
  <section style={{ padding: '60px 20px', backgroundColor: '#000', color: '#fff' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>What our members say</h2>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '25px', 
      maxWidth: '1200px', 
      margin: 'auto' 
    }}>
      
      {/* રિવ્યૂ કાર્ડ ૧ */}
      <div style={{ background: '#1a1a1a', padding: '25px', borderRadius: '15px' }}>
        <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"The personalized meal plans really helped me stay on track. Lost 5kg in a month!"</p>
        <h4 style={{ margin: '0' }}>— Priya Sharma</h4>
      </div>

      {/* રિવ્યૂ કાર્ડ ૨ */}
      <div style={{ background: '#1a1a1a', padding: '25px', borderRadius: '15px' }}>
        <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"The coaches are extremely supportive. It's not just a program, it's a lifestyle change."</p>
        <h4 style={{ margin: '0' }}>— Amit Verma</h4>
      </div>

      {/* રિવ્યૂ કાર્ડ ૩ */}
      <div style={{ background: '#1a1a1a', padding: '25px', borderRadius: '15px' }}>
        <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"Consistent guidance and regular check-ins kept me motivated throughout the journey."</p>
        <h4 style={{ margin: '0' }}>— Sneha Kulkarni</h4>
      </div>

    </div>
  </section>
)}
{activeTab === "Bootcamp" && (
  <section style={{ 
    padding: '60px 20px', 
    backgroundColor: '#000', 
    color: '#fff',
    maxWidth: '800px',
    margin: 'auto'
  }}>
    {/* ઉપરનું લખાણ */}
    <div style={{ marginBottom: '40px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '15px' }}>Snapshot of your week</h1>
      <p style={{ fontSize: '18px', color: '#ccc' }}>
        ✓ Weekly Catchups with the nutritionist
      </p>
      <p style={{ fontSize: '18px', color: '#ccc' }}>
        ✓ On demand 1:1 calls as per your chosen slot
      </p>
    </div>
    
    {/* સાપ્તાહિક પ્લાન (Weekly Schedule) */}
    {[
      { day: 'M', title: 'Partner + Station + Games', type: 'AT-CENTER WORKOUT' },
      { day: 'T', title: 'Workouts recorded by trainers', type: 'HOME WORKOUT' },
      { day: 'W', title: 'Full body + Team workouts + Games', type: 'AT-CENTER WORKOUT' },
      { day: 'T', title: 'Hatha Yoga + Step count challenge', type: 'HOME WORKOUT' },
      { day: 'F', title: 'Strength Circuit & Stability', type: 'AT-CENTER WORKOUT' },
      { day: 'S', title: 'Active Recovery & Stretching', type: 'WEEKEND SPECIAL' },
      { day: 'S', title: 'Rest & Mindfulness Session', type: 'WEEKEND SPECIAL' }
    ].map((item, index) => (
      <div key={index} style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px', 
        marginBottom: '15px',
        padding: '20px',
        background: '#1a1a1a',
        borderRadius: '12px',
        borderLeft: '5px solid #00d2d3' 
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', width: '50px', textAlign: 'center' }}>
          {item.day}
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#00d2d3', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
            {item.type}
          </div>
          <div style={{ fontSize: '18px', fontWeight: '500' }}>{item.title}</div>
        </div>
      </div>
    ))}
  </section>
)}
{activeTab === "Bootcamp" && (
  <section style={{ padding: '60px 20px', backgroundColor: '#000', color: '#fff' }}>
    <h2 style={{ marginBottom: '40px' }}>Sneak peek of our last Bootcamp</h2>
    <div style={{ marginBottom: '40px' }}>
      <h3 style={{ color: '#00d2d3', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
       our Bootcamp pictures
      </h3>
      <h1 style={{ fontSize: '36px', margin: '0' }}>Sneak peek of our last Bootcamp</h1>
    </div>
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
      gap: '20px' 
    }}>
      {/* અહિંયા કામ કરતી લિંક્સ છે */}
      {[
        img17,
        
        
       img18,
        img19,
         img20,
      ].map((imgUrl, index) => (
        <div key={index} style={{ 
          height: '250px', 
          backgroundColor: '#333', 
          borderRadius: '15px', 
          overflow: 'hidden' 
        }}>
          <img 
            src={imgUrl} 
            alt="Bootcamp workout" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      ))}
    </div>
  </section>
)}
{activeTab === "Bootcamp" && (
  <section style={{ padding: '60px 20px', backgroundColor: '#000', color: '#fff' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>FAQ</h2>
    <h4 style={{ color: '#aaa', marginBottom: '20px', textTransform: 'uppercase', textAlign: 'center' }}>
      FAQS
    </h4>
    
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      {[
        {
          q: "How is Cult Bootcamp different from Cultpass Elite?",
          a: "Bootcamp is a 6-week intensive program with personalized attention, while Elite is a general access membership."
        },
        {
          q: "What happens if I miss some class(es) because of travel?",
          a: "You can coordinate with your coach to get home workout alternatives to keep your consistency."
        },
        {
          q: "Can I cancel / refund my Bootcamp memberships?",
          a: "Yes, you can request a cancellation as per our refund policy within the first few days."
        },
        {
          q: "Can I be a part of bootcamp if I have any medical issues?",
          a: "Please consult your doctor first and inform your coach about your condition so they can modify your plan."
        }
      ].map((item, index) => (
        <div key={index} style={{ borderBottom: '1px solid #333' }}>
          {/* પ્રશ્ન વાળો ભાગ */}
          <div 
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            style={{ 
              padding: '20px 0', 
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.q}</span>
            <span style={{ fontSize: '20px', color: '#00d2d3' }}>
              {activeIndex === index ? '-' : '+'}
            </span>
          </div>

          {/* જવાબ વાળો ભાગ (જ્યારે ક્લિક કરો ત્યારે દેખાશે) */}
          {activeIndex === index && (
            <div style={{ padding: '0 0 20px 0', color: '#aaa', lineHeight: '1.6' }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  </section>
)}
{/* --- અહીં ઉમેરો --- */}
<button 
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  style={{ 
    position: 'fixed', 
    bottom: '20px', 
    right: '20px', 
    padding: '10px 15px',
    backgroundColor: '#ff4a86', // cult.fit ની થીમ મુજબ કલર
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    zIndex: '1000',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
  }}
>
  ↑ Top
</button>
{/* Transform Plus સેક્શન */}
{activeTab === "Transform Plus" && (
  <section style={{ backgroundColor: '#003a4d', color: '#fff', padding: '60px 20px', borderRadius: '15px', marginTop: '20px' }}>
    <div style={{ maxWidth: '1000px', margin: 'auto', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
      
      {/* લખાણ વાળો ભાગ */}
      <div style={{ flex: '1', minWidth: '300px' }}>
        <h3 style={{ color: '#00d2d3', marginBottom: '10px' }}>cult transform PLUS</h3>
        <h1 style={{ fontSize: '40px', marginBottom: '20px' }}>Loose weight without loosing yourself</h1>
        
        <div style={{ fontSize: '18px', lineHeight: '1.8' }}>
          <p>✓ Fitness, Nutrition and Mindset expert for you</p>
          <p>✓ 1:1 personalised fitness & Nutrition plans</p>
          <p>✓ Sleep, Stress & Mindset Coaching</p>
        </div>
        
        <button style={{ 
          marginTop: '30px', padding: '15px 30px', backgroundColor: '#fff', 
          color: '#000', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' 
        }}>
          <a 
  href="https://wa.me/919106047691?text=Hi, I am interested in the Transform Plus program." 
  target="_blank" 
  rel="noopener noreferrer"
  style={{
    display: 'inline-block',
    padding: '12px 30px',
    backgroundColor: '#fff', 
    color: '#000',           
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '20px',
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px solid #ddd',
    transition: '0.3s' // હોવર ઇફેક્ટ માટે
  }}
  onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
  onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
>
  TALK TO AN EXPERT
</a>
        </button>
      </div>

      {/* ફોટા વાળો ભાગ */}
      <div style={{ flex: '1', minWidth: '300px' }}>
        <img 
          src={img21}
          alt="Transform Plus" 
          style={{ width: '100%', borderRadius: '15px' }} 
        />
      </div>
    </div>
  </section>
)}
{activeTab === "Transform Plus" && (
  <section style={{ padding: '60px 20px', backgroundColor: '#002633', color: '#fff' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Lose weight for good with</h2>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '20px', 
      maxWidth: '1000px', 
      margin: 'auto' 
    }}>
      {/* કાર્ડ ૧ */}
      <div style={{ background: '#003a4d', padding: '30px 20px', borderRadius: '15px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '40px', margin: '0 0 10px 0' }}>~6KG</h2>
        <p style={{ color: '#aaa', fontSize: '14px' }}>average weight lost in 3 months</p>
      </div>

      {/* કાર્ડ ૨ */}
      <div style={{ background: '#003a4d', padding: '30px 20px', borderRadius: '15px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '40px', margin: '0 0 10px 0' }}>{'>'}3</h2>
        <p style={{ color: '#aaa', fontSize: '14px' }}>avg. inches lost around waistline</p>
      </div>

      {/* કાર્ડ ૩ */}
      <div style={{ background: '#003a4d', padding: '30px 20px', borderRadius: '15px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '40px', margin: '0 0 10px 0' }}>90%+</h2>
        <p style={{ color: '#aaa', fontSize: '14px' }}>have seen rise in energy & stamina</p>
      </div>

      {/* કાર્ડ ૪ */}
      <div style={{ background: '#003a4d', padding: '30px 20px', borderRadius: '15px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '40px', margin: '0 0 10px 0' }}>92%+</h2>
        <p style={{ color: '#aaa', fontSize: '14px' }}>have improved their sleep cycles</p>
      </div>
    </div>
  </section>
)}
{activeTab === "Transform Plus" && (
  <section style={{ padding: '60px 20px', backgroundColor: '#002633', color: '#fff' }}>
    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
      <p style={{ color: '#00d2d3', letterSpacing: '2px' }}>HERE'S HOW WE HELP YOU ACHIEVE YOUR GOALS</p>
      <h2 style={{ fontSize: '40px' }}>How it works</h2>
    </div>

    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '25px', 
      maxWidth: '1200px', 
      margin: 'auto' 
    }}>
      {/* કાર્ડ 1: Expert Coaches */}
      <div style={{ background: '#003a4d', padding: '30px', borderRadius: '20px' }}>
        <img src={card1} alt="Card 1"  style={{ width: '100%', borderRadius: '15px' }} />
        <h3 style={{ marginTop: '20px' }}>3 experts who personalize your weight loss journey</h3>
      </div>

      {/* કાર્ડ 2: Customised Plans */}
      <div style={{ background: '#003a4d', padding: '30px', borderRadius: '20px' }}>
        <img src={card2} alt="Card 2" style={{ width: '100%', borderRadius: '15px' }} />
        <h3 style={{ marginTop: '20px' }}>Customised fitness & nutrition plans to reach your goals</h3>
      </div>

      {/* કાર્ડ 3: Track Progress */}
      <div style={{ background: '#003a4d', padding: '30px', borderRadius: '20px' }}>
         <img src={card3} alt="Card 3" style={{ width: '100%', borderRadius: '15px' }} />
        <h3 style={{ marginTop: '20px' }}>Track your progress & keep up to it</h3>
      </div>
    </div>
  </section>
)}
{activeTab === "Transform Plus" && (
  <section style={{ padding: '60px 20px', backgroundColor: '#002633', color: '#fff' }}>
    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <p style={{ color: '#00d2d3', letterSpacing: '2px', marginBottom: '10px' }}>PEOPLE LOVE US!</p>
      <h2 style={{ fontSize: '40px' }}>Real Members, Real Results!</h2>
    </div>

    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '20px', 
      maxWidth: '1200px', 
      margin: 'auto' 
    }}>
      {[
        { name: "Sanchita", stat: "9 KGS LOST FOR GOOD", info: "100 Days Transformation",  img: member1 },
        { name: "Shivalik", stat: "11 KGS LOST FOR GOOD", info: "90 Days Transformation",  img: member2 },
        { name: "Harshit", stat: "9 KGS LOST FOR GOOD", info: "90 Days Transformation",  img: member3 }
      ].map((member, index) => (
        <div key={index} style={{ 
          background: '#003a4d', 
          padding: '20px', 
          borderRadius: '20px', 
          textAlign: 'center' 
        }}>
          <img src={member.img} alt={member.name} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '15px', marginBottom: '20px' }} />
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{member.stat}</h2>
          <p style={{ color: '#aaa' }}>– {member.name} –</p>
          <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{member.info}</p>
        </div>
      ))}
    </div>
  </section>
)}
{activeTab === "Transform Plus" && (
  <section style={{ padding: '60px 20px', backgroundColor: '#002633', color: '#fff' }}>
    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <p style={{ color: '#00d2d3', letterSpacing: '2px' }}>FEATURES</p>
      <h2 style={{ fontSize: '36px' }}>And you'll also get</h2>
    </div>

    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '20px', 
      maxWidth: '1100px', 
      margin: 'auto' 
    }}>
      {[
        { title: "Weekly masterclasses", desc: "Workshops by experts on various aspects of weight loss", icon: "✨" },
        { title: "Community", desc: "Strong and accountable community with a singular vision", icon: "📑" },
        { title: "Sustain the weight loss", desc: "A plan that ensures you don't gain the weight back", icon: "▶️" }
      ].map((feat, index) => (
        <div key={index} style={{ 
          background: 'linear-gradient(135deg, #004d66, #002633)', 
          padding: '30px', 
          borderRadius: '20px', 
          textAlign: 'center',
          border: '1px solid #005a75'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '15px' }}>{feat.icon}</div>
          <h3 style={{ marginBottom: '10px' }}>{feat.title}</h3>
          <p style={{ color: '#aaa', fontSize: '15px', lineHeight: '1.6' }}>{feat.desc}</p>
        </div>
      ))}
    </div>
  </section>
)}
{activeTab === "Transform Plus" && (
  <section style={{ padding: '60px 20px', backgroundColor: '#002633', color: '#fff' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Explore plans</h2>
    
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {[
        { title: "Weight Management", sub: "For lasting results", price: "₹1480 / month* onwards" },
        { title: "Disease Management", sub: "PCOS | Thyroid", price: "₹1855 / month* onwards" }
      ].map((plan, i) => (
        <div key={i} style={{ 
          background: '#003a4d', 
          padding: '30px', 
          borderRadius: '20px', 
          width: '350px' 
        }}>
          <h3>{plan.title} </h3>
          <p style={{ color: '#aaa', fontSize: '14px' }}>{plan.sub}</p>
          <hr style={{ border: '0.5px solid #005a75', margin: '20px 0' }} />
          <p style={{ fontWeight: 'bold' }}>{plan.price}</p>
        </div>
      ))}
    </div>
  </section>
)}
{activeTab === "Transform Plus" && (
  <section style={{ padding: '60px 20px', backgroundColor: '#002633', color: '#fff' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Hear from our members</h2>
    
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      {[
        { name: "Rohini Sethi", text: "I joined Cult Transform end of August this year and got Vaishnavi as coach. She has been a great support...",  img: review1 },
        { name: "Amit Sharma", text: "The personalized nutrition plans really helped me manage my busy office schedule effectively.", img: review2 },
        { name: "Priya Das", text: "My sleep cycle and energy levels have improved significantly in just 3 months. Highly recommend!", img: review3 },
        { name: "Vikram Singh", text: "Expert guidance for my PCOS and workout modifications made it very easy for me.", img: review4 },
        { name: "Sneha Iyer", text: "The accountability community kept me on track even during my travel days. Fantastic experience.", img: review5 }
      ].map((rev, index) => (
        <div key={index} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '30px', 
          marginBottom: '50px',
          borderBottom: '1px solid #005a75',
          paddingBottom: '30px'
        }}>
          <img src={rev.img} alt={rev.name} style={{ width: '120px', height: '120px', borderRadius: '15px', objectFit: 'cover' }} />
          <div>
            <p style={{ fontStyle: 'italic', fontSize: '18px', marginBottom: '10px' }}>"{rev.text}"</p>
            <p style={{ fontWeight: 'bold', color: '#00d2d3' }}>- {rev.name}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
)}
{activeTab === "Transform Plus" && (
  <section style={{ padding: '60px 20px', backgroundColor: '#000', color: '#fff' }}>
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      
      {/* અહીં કલર 'white' આપ્યો છે જેથી તે સ્પષ્ટ દેખાય */}
      <h2 style={{ 
        fontSize: '32px', 
        marginBottom: '10px', 
        color: '#ffffff' // સફેદ કલર
      }}>
        FAQS
      </h2>
      
      {[
        { q: "Is the Membership Transferable?", a: "No, Transform memberships are strictly non-transferable." },
        { q: "Do I get gym access with a Transform pack?", a: "No, Transform Plus is a digital coaching program focused on personalized home-based plans." },
        { q: "What do I get if I buy Cult Transform?", a: "You get 1:1 access to 3 experts (Fitness, Nutrition, Mindset), custom plans, and habit tracking." },
        { q: "Can I still achieve my fitness goals without gym access?", a: "Yes, our plans are specifically designed to be effective at home without any gym equipment." },
        { q: "Is there any eligibility criteria for registering for Transform Plus?", a: "Anyone above 18 years looking to improve their health can join. Medical consultation is advised for chronic conditions." },
        { q: "Are my personal details safe?", a: "Yes, we use advanced encryption to ensure all your personal and medical data remains private." },
        { q: "Can I pause my membership?", a: "Yes, you can request a pause for valid medical or personal reasons through our support team." },
        { q: "Can I cancel/refund my Transform Plus Pack?", a: "Cancellations and refunds are processed based on our policy within the first few days of purchase." },
        { q: "How Many Consults Do I Get With Each Expert?", a: "You get scheduled bi-weekly video consults with your Fitness, Nutrition, and Mindset coaches." },
        { q: "Will I have the same coaches throughout the weight loss program?", a: "Yes, to ensure consistency and track your progress effectively, you will be assigned the same expert team." },
        { q: "Can I ask for a coach change?", a: "Yes, if you feel there is a mismatch in communication or style, you can request a change through support." },
        { q: "Does Transform Plus guarantee weight loss?", a: "While we provide the best science-backed plans, results depend on your consistency and adherence to the program." },
        { q: "How do I ensure maximum results?", a: "Consistency, logging your meals accurately, following the habit plans, and being honest with your coaches are key." }
      ].map((item, index) => (
        <div key={index} style={{ borderBottom: '1px solid #333' }}>
          <div 
            onClick={() => setActiveIndex(activeIndex === index ? null : index)} 
            style={{ 
              padding: '20px 0', cursor: 'pointer', display: 'flex', 
              justifyContent: 'space-between', alignItems: 'center' 
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.q}</span>
            <span style={{ fontSize: '20px', color: '#00d2d3' }}>{activeIndex === index ? '-' : '+'}</span>
          </div>
          {activeIndex === index && (
            <div style={{ paddingBottom: '20px', color: '#aaa', lineHeight: '1.6' }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  </section>
)}
{activeTab === "Luxury Gym" && (
  <section style={{ 
    padding: '60px 20px', 
    backgroundColor: '#000', 
    color: '#fff',
    minHeight: '100vh' 
  }}>
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <h2 style={{ fontSize: '36px', marginBottom: '40px' }}>Luxury Gyms in your city</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '25px' 
      }}>
        {[
          { name: "PILATES CIRCLE", loc: "HSR Layout" },
          { name: "GOLD'S GYM", loc: "Sarjapur" },
          { name: "FITNESS FIRST", loc: "Koramangala" },
          { name: "VIVA FIT", loc: "Indiranagar" },
          { name: "ULTRA CORE", loc: "Whitefield" },
          { name: "STEEL BODY", loc: "Electronic City" },
          { name: "ZEN FITNESS", loc: "Bellandur" },
          { name: "ELITE GYM", loc: "Jayanagar" },
          { name: "PRO STRENGTH", loc: "Marathahalli" },
          { name: "AURA GYM", loc: "HSR Sector 6" },
          { name: "POWERHOUSE", loc: "MG Road" },
          { name: "TITAN GYM", loc: "Banashankari" }
        ].map((gym, i) => (
          <div key={i} style={{ 
            background: '#1a1a1a', 
            borderRadius: '15px', 
            padding: '25px',
            border: '1px solid #333',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3 style={{ marginBottom: '5px', color: '#fff' }}>{gym.name}</h3>
            <p style={{ color: '#aaa', fontSize: '14px', margin: 0 }}>{gym.loc} • Gym</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)}

      {/* FEATURES સેક્શન ટાઈટલ */}
<div className="features-header"></div>

{/* ૫. મેન્સનરી સ્ટાઇલ ગ્રીડ ઇન્ફોગ્રાફિક્સ સેક્શન - માત્ર HOME માટે */}
{activeTab === "cultpass Home" && (
  <section className="features-grid-container">
    <div className="grid-column">
      <div className="feature-card standard-card">
        <div className="pink-bolt">⚡</div>
        <div className="energy-meter-bar">
          <div className="meter-block"></div><div className="meter-block"></div>
          <div className="meter-block"></div><div className="meter-block"></div>
          <div className="meter-block"></div><div className="meter-block"></div>
          <div className="meter-block off"></div><div className="meter-block off"></div>
        </div>
        <div className="card-desc-text">Track calorie burn with energy meter</div>
      </div>
      <div className="feature-card standard-card meditation-bg-card">
        <div className="card-desc-text" style={{fontWeight: 800}}>Meditation Content & practice</div>
      </div>
    </div>

    <div className="grid-column">
      <div className="feature-card center-large-card">
        <div className="bubbles-grid">
          <div className="format-bubble">🧘 YOGA</div>
          <div className="format-bubble">🏃 HIIT</div>
          <div className="format-bubble">🥊 BOXING</div>
          <div className="format-bubble">👟 HRX</div>
          <div className="format-bubble">🕺 DANCE</div>
        </div>
        <div className="center-hero-text">
          <div className="big-sub">Access to</div>
          <div className="big-number">5K+</div>
          <div className="big-sub">Online Workout</div>
        </div>
      </div>
    </div>

    <div className="grid-column">
      <div className="feature-card standard-card">
        <div className="fire-icon">🔥</div>
        <div className="cal-number">7400 Cal</div>
        <div className="card-desc-text">Track your Progress</div>
      </div>
      <div className="feature-card standard-card">
        <div className="pink-list-wrapper">
          <div className="pink-list-title">Programs</div>
          <div className="program-name-item">Belly Burn</div>
          <div className="program-name-item blue-text">Weight Loss</div>
          <div className="program-name-item purple-text">Strength</div>
        </div>
      </div>
      
    </div>
  </section>
)}

      {/* ૬. લાઇવ ટ્રેનર્સ વર્કઆઉટ સ્લાઇડર સેક્શન - માત્ર HOME માટે */}
{activeTab === "cultpass Home" && (
  <section className="live-workout-section">
    <div className="live-video-banner"></div>
    <div className="carousel-container">
      {currentSlide > 0 && <button className="slider-arrow-btn arrow-left" onClick={prevSlide}>⟨</button>}
      <div className="carousel-window">
        <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}>
          {liveWorkoutsData.map((item, i) => (
            <div className="trainer-card" key={i}>
              <div className="trainer-img-box" style={{ backgroundImage: `url(${item.img})` }}></div>
              <div className="trainer-details">
                <div className="trainer-name">{item.trainer}</div>
                <h3 className="workout-type-title">{item.title}</h3>
                <div className="workout-meta-info">{item.level}</div>
                <button className="join-live-btn" onClick={() => handleJoin(item)}>JOIN</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {currentSlide < liveWorkoutsData.length - 3 && <button className="slider-arrow-btn arrow-right" onClick={nextSlide}>⟩</button>}
    </div>
  </section>
)}
{/* આ લાઇન તમારો જે ટેબ વાળો ભાગ છે ત્યાં મૂકો */}
{activeTab === "Feedback" && <Feedback setActiveTab={setActiveTab} />}
      {/* ૭. AT-HOME કન્ટેન્ટ ફોર્મેટ્સ સ્લાઇડર સેક્શન */}
      {/* ૭. AT-HOME કેટેગરીઝ સેક્શન - માત્ર HOME માટે */}
{activeTab === "cultpass Home" && (
  <section className="athome-section">
    <div className="athome-header">AT-HOME</div>
    <div className="athome-frame">
      <div className="athome-main-display"></div>
      <div className="categories-slider-wrapper">
        {catSlide > 0 && <button className="cat-arrow-btn cat-arrow-left" onClick={prevCat}>⟨</button>}
        <div className="categories-window">
          <div className="categories-track" style={{ transform: `translateX(-${catSlide * 25}%)` }}>
            {atHomeCategories.map((cat, index) => (
  <div 
    className="category-item-card" 
    key={index} 
    style={{ 
      backgroundImage: `url(${cat.img})`, 
      cursor: 'pointer' 
    }}
    // --- આટલો ભાગ બદલવાનો છે ---
    onClick={() => {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      const email = loggedInUser.email;

      if (email) {
        const key = `userProfileData_${email}`;
        const profile = JSON.parse(localStorage.getItem(key) || '{}');
        profile.fitnessGoal = cat.name;
        localStorage.setItem(key, JSON.stringify(profile));
        
        setActiveTab("PROFILE");
        alert(`Your goal set to: ${cat.name}`);
      } else {
        alert("પ્લીઝ પહેલા લોગિન કરો!");
      }
    }}
    // ---------------------------
  >
    <div className="category-card-info">
      <h4 className="category-card-title">{cat.name}</h4>
      <div className="category-card-sub">{cat.sub}</div>
    </div>
  </div>
))}
            
          </div>
        </div>
        {catSlide < atHomeCategories.length - 4 && <button className="cat-arrow-btn cat-arrow-right" onClick={nextCat}>⟩</button>}
      </div>
    </div>
  </section>
)}

      {/* ૮. BEST IN CLASS TRAINERS સેક્શન - માત્ર HOME માટે */}
{activeTab === "cultpass Home" && (
  <section className="expert-trainers-section">
    <div className="expert-content-box">
      <div className="expert-left-heading">
        <span className="expert-sub">BEST IN CLASS</span>
        <h2 className="expert-main-title">Trainers</h2>
      </div>
      <div className="expert-right-grid-frame">
        <div className="expert-grid">
          {expertTrainersData.map((trainer, idx) => (
            <div className="expert-item-card" key={idx}>
              <div className="expert-img-placeholder" style={{ backgroundImage: `url(${trainer.img})` }}></div>
              <div className="expert-text-layer">
                <h4 className="expert-name-text">{trainer.name}</h4>
                <p className="expert-format-text">{trainer.format}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)}

      {activeTab === "cultpass Home" && (
  <section className="goal-programs-section">
    <div className="goal-section-header">
      <span className="goal-sub-title">AT-HOME</span>
      <h2 className="goal-main-title">Explore goal-based programs</h2>
    </div>
    
    <div className="goal-slider-outer">
      {programSlide > 0 && (
        <button className="goal-arrow-btn goal-left-arrow" onClick={prevProgram}>⟨</button>
      )}
      
      <div className="goal-slider-window">
        <div className="goal-slider-track" style={{ transform: `translateX(-${programSlide * 25}%)` }}>
          {goalProgramsData.map((prog, index) => (
            <div 
              className="goal-program-card" 
              key={index}
              onClick={() => {
                // ૧. પ્રોફાઇલ ડેટા અપડેટ કરો
                const profile = JSON.parse(localStorage.getItem('userProfileData') || '{}');
                profile.fitnessGoal = prog.title; // પ્રોગ્રામનું નામ સેવ કરો
                localStorage.setItem('userProfileData', JSON.stringify(profile));
                
                // ૨. પ્રોફાઇલ પેજ પર રીડાયરેક્ટ કરો
                setActiveTab("PROFILE");
                alert(`Successfully joined: ${prog.title}`);
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="goal-card-img" style={{ backgroundImage: `url(${prog.img})` }}>
                {prog.tag && <span className="goal-card-tag">{prog.tag}</span>}
              </div>
              <div className="goal-card-body">
                <h3 className="goal-card-title">{prog.title}</h3>
                <p className="goal-card-coach">{prog.coach}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {programSlide < goalProgramsData.length - 4 && (
        <button className="goal-arrow-btn goal-right-arrow" onClick={nextProgram}>⟩</button>
      )}
    </div>
  </section>
)}
{/* HOW IT WORKS SECTION */}
<section style={{ padding: '80px 20px', backgroundColor: '#fff', color: '#000', textAlign: 'center' }}>
  <h2 style={{ fontSize: '36px', marginBottom: '50px' }}>How It Works</h2>
  
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    flexWrap: 'wrap', 
    gap: '30px', 
    maxWidth: '1000px', 
    margin: 'auto' 
  }}>
    {[
      { step: "01", title: "Sign Up", desc: "Create your account in seconds." },
      { step: "02", title: "Get Your Coach", desc: "Connect with certified experts." },
      { step: "03", title: "Personalized Plan", desc: "Custom routines for your body." },
      { step: "04", title: "Achieve Results", desc: "Track your progress and succeed." }
    ].map((item, index) => (
      <div key={index} style={{ 
        flex: '1 1 200px', 
        padding: '30px', 
        border: '1px solid #eee', 
        borderRadius: '15px',
        transition: '0.3s',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }} onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'}
         onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)'}>
        <h3 style={{ color: '#ff4500', fontSize: '28px', margin: '0 0 10px' }}>{item.step}</h3>
        <h4 style={{ margin: '10px 0', fontSize: '18px' }}>{item.title}</h4>
        <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>{item.desc}</p>
      </div>
    ))}
  </div>
</section>
 {activeTab === "cult Transform" && (
  <>
    {/* તમારું અગાઉનું ટ્રાન્સફોર્મ કન્ટેન્ટ અહીં હશે */}
    
    {/* હવે અહીં રિવ્યૂ સેક્શન ઉમેરો */}
    <section style={{ padding: '60px 20px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px' }}>What our members say</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1000px', margin: 'auto' }}>
        {reviewsData.map((rev, index) => (
          <div key={index} style={{ padding: '25px', border: '1px solid #eee', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <img src={rev.img} alt={rev.name} style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '15px' }} />
            <h4 style={{ margin: '0 0 5px 0' }}>{rev.name}</h4>
            <div style={{ color: '#ff4a86', marginBottom: '15px' }}>{"★".repeat(rev.rating)}</div>
            <p style={{ fontSize: '15px', color: '#666', fontStyle: 'italic' }}>"{rev.comment}"</p>
          </div>
        ))}
      </div>
    </section>
  </>
)}
{/* બાય નાઉ અને EMI બટન્સ સેક્શન - માત્ર Transform માટે */}
{activeTab === "cult Transform" && (
  <section style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '40px', 
    padding: '40px 20px', 
    
    marginTop: '20px' 
  }}>
    
    {/* 1. Buy Now બટન */}
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        width: '80px', height: '80px', borderRadius: '50%', 
        backgroundColor: '#000', // બ્લેક કલર
        color: '#fff', // આઇકોન માટે સફેદ કલર
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        fontSize: '30px', margin: '0 auto 10px', cursor: 'pointer'
      }}>
        ▶
      </div>
      <div style={{ fontWeight: 'bold' }}>Buy Now</div>
      <div style={{ fontSize: '12px', color: '#666' }}>limited time offers</div>
    </div>

    {/* 2. EMI બટન */}
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        width: '80px', height: '80px', borderRadius: '50%', 
        backgroundColor: '#0056b3', // અલગ બ્લુ કલર
        color: '#fff', // અંદરનું લખાણ સફેદ
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        fontSize: '18px', margin: '0 auto 10px', fontWeight: 'bold', cursor: 'pointer'
      }}>
        EMI
      </div>
      <div style={{ fontWeight: 'bold' }}>No-Cost</div>
      <div style={{ fontSize: '12px', color: '#666' }}>EMI available</div>
    </div>

  </section>
)}
{activeTab === "cult Transform" && (
  <section style={{ padding: '40px 20px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '1000px', margin: 'auto' }}>
      {transformPricing.map((item, index) => (
        <div key={index} style={{ background: '#004a55', color: '#fff', borderRadius: '15px', padding: '20px' }}>
          <h3>{item.months}</h3>
          <h2 style={{ margin: '10px 0' }}>{item.price} <span style={{ textDecoration: 'line-through', fontSize: '16px', opacity: '0.7' }}>{item.oldPrice}</span></h2>
          <p style={{ fontSize: '14px', marginBottom: '15px' }}>{item.note}</p>
          <hr style={{ opacity: '0.2' }} />
          <p style={{ fontSize: '13px', marginTop: '15px' }}>{item.desc}</p>
          
          {/* અહીં મેં onClick ઉમેર્યું છે */}
          <button 
  onClick={() => handleBuyNow("cult TRANSFORM - " + item.months, item.price)}
            style={{ 
              width: '100%', 
              padding: '10px', 
              marginTop: '15px', 
              borderRadius: '5px', 
              border: 'none', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              backgroundColor: '#fff',
              color: '#004a55'
            }}
          >
            BUY NOW
          </button>
        </div>
      ))}
    </div>
  </section>
)}
{activeTab === "cult Transform" && (
  <section style={{ padding: '40px 20px',  }}>
    <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px' }}>Meet our Transform Coaches</h2>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '20px', 
      maxWidth: '1200px', 
      margin: 'auto' 
    }}>
      {/* કોચનો ડેટા મેપિંગ */}
      {[
        // કોચ સેક્શનમાં ઉદાહરણ:
{ name: "chandni", title: "ACE certified Trainer", count: "70+", img: coach1 },
        { name: "Pooja", title: "M.Sc in Health Psychology", count: "50+",  img: coach2 },
        { name: "varsha", title: "M.Sc in Nutrition + Foodscience", count: "100+",  img: coach3 }
      ].map((coach, index) => (
        <div key={index} style={{ textAlign: 'center', padding: '20px', border: '1px solid #f0f0f0', borderRadius: '15px' }}>
          <img 
            src={coach.img} 
            alt={coach.name} 
            style={{ width: '100%', borderRadius: '15px', height: '300px', objectFit: 'cover' }} 
          />
          <h3 style={{ marginTop: '15px', marginBottom: '5px' }}>{coach.name}</h3>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>{coach.title}</p>
          <div style={{ 
            background: '#000', 
            color: '#fff', 
            padding: '10px', 
            borderRadius: '5px', 
            fontWeight: 'bold' 
          }}>
            {coach.count} TRANSFORMATIONS
          </div>
        </div>
      ))}
    </div>
  </section>
)}
{activeTab === "cult Transform" && (
  <section style={{ padding: '60px 20px', backgroundColor: '#003d46', color: '#fff' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>
      cult Transform weight loss <br />
      <span style={{ fontSize: '20px', opacity: '0.8' }}>vs other weight loss programs</span>
    </h2>

    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      {[
        "Lasting weight loss",
        "Unlimited whatsapp chat & calls",
        "Scheduled video consults",
        "Progress workout plans",
         "Tailored meal plans",
         "calorie counting"
      ].map((item, index) => (
        <div key={index} style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '20px 0',
          borderBottom: '1px solid rgba(255,255,255,0.2)' 
        }}>
          <span style={{ fontSize: '18px' }}>{item}</span>
          <div style={{ 
            width: '30px', 
            height: '30px', 
            borderRadius: '50%', 
            border: '2px solid #ffcc00', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#ffcc00'
          }}>
            ✓
          </div>
        </div>
      ))}
    </div>
  </section>
)}
     {/* ૧૦. ૩ સર્કલ ફીચર આઇકન્સ સેક્શન - માત્ર Home માટે */}
{activeTab === "cultpass Home" && (
  <section className="three-icons-section">
    <div className="icons-wrapper-row">
      <div className="single-icon-box">
        <div className="circle-avatar-bg"><span className="icon-symbol-text">▶</span></div>
        <p className="icon-desc-label">Fresh workout everyday</p>
      </div>
      <div className="single-icon-box">
        <div className="circle-avatar-bg"><span className="icon-symbol-text" style={{color: '#ff4a86'}}>⚡</span></div>
        <p className="icon-desc-label">Energy meter to track calories</p>
      </div>
      <div className="single-icon-box">
        <div className="circle-avatar-bg"><span className="icon-symbol-text">📈</span></div>
        <p className="icon-desc-label">Track progress with weekly reports</p>
      </div>
    </div>
  </section>
)}

      {activeTab === "cultpass Home" && (
  <section className="pricing-grid-section">
    <div className="pricing-cards-container">
      
      {/* 3 MONTHS */}
      <div className="price-package-card">
        <div className="pack-big-number">3</div>
        <div className="pack-duration-title">MONTHS</div>
        <div className="pack-price-container">
          <span className="original-strike-price">₹1499</span>
          <span className="actual-discounted-price">₹747</span>
        </div>
        <button className="pack-action-btn" onClick={() => handleBuyNow("3 MONTHS", "₹747")}>BUY NOW</button>
      </div>

      {/* 6 MONTHS */}
      <div className="price-package-card">
        <div className="pack-big-number">6</div>
        <div className="pack-duration-title">MONTHS</div>
        <div className="pack-price-container">
          <span className="original-strike-price">₹2499</span>
          <span className="actual-discounted-price">₹1194</span>
        </div>
        <button className="pack-action-btn" onClick={() => handleBuyNow("6 MONTHS", "₹1194")}>BUY NOW</button>
      </div>

      {/* 12 MONTHS */}
      <div className="price-package-card">
        <div className="pack-big-number">12</div>
        <div className="pack-duration-title">MONTHS</div>
        <div className="pack-price-container">
          <span className="original-strike-price">₹3999</span>
          <span className="actual-discounted-price">₹1860</span>
        </div>
        <button className="pack-action-btn" onClick={() => handleBuyNow("12 MONTHS", "₹1860")}>BUY NOW</button>
      </div>

      {/* 24 MONTHS */}
      <div className="price-package-card">
        <div className="pack-big-number">24</div>
        <div className="pack-duration-title">MONTHS</div>
        <div className="pack-price-container">
          <span className="original-strike-price">₹6399</span>
          <span className="actual-discounted-price">₹2779</span>
        </div>
        <button className="pack-action-btn" onClick={() => handleBuyNow("24 MONTHS", "₹2779")}>BUY NOW</button>
      </div>

    </div>
  </section>
)}
<div className="comparison-container">
      <h1 className="main-heading">Choose your cultpass</h1>
      <p className="sub-heading"></p>

      <div className="table-grid">
        {/* હેડર રો */}
        {activeTab === "cultpass Home" && (
  <section className="comparison-table-section" style={{ padding: '40px 20px', maxWidth: '800px', margin: 'auto' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Compare Plans</h2>
    
    <div className="table-container">
      {/* Header Row */}
      <div className="row header-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', fontWeight: 'bold' }}>
        <div className="cell"></div>
        <div className="cell col-title gold">ELITE</div>
        <div className="cell col-title silver">PRO</div>
        <div className="cell col-title pink">HOME</div>
      </div>

      {/* Feature Row 1 */}
      <div className="row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
        <div className="cell label">ELITE Gyms & At Centre Group Classes</div>
        <div className="cell">✔<br/>Unlimited</div>
        <div className="cell">02 Sessions/<br/>month</div>
        <div className="cell">✖</div>
      </div>

      {/* Feature Row 2 */}
      <div className="row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
        <div className="cell label">PRO Gyms</div>
        <div className="cell">✔<br/>Unlimited</div>
        <div className="cell">✔<br/>Unlimited</div>
        <div className="cell">✖</div>
      </div>

      {/* Feature Row 3 */}
      <div className="row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
        <div className="cell label">Smart workout plan</div>
        <div className="cell">✔<br/>Unlimited</div>
        <div className="cell">✔<br/>Unlimited</div>
        <div className="cell">✖</div>
      </div>

      {/* Feature Row 4 */}
      <div className="row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
        <div className="cell label">At home workouts</div>
        <div className="cell">✔<br/>Unlimited</div>
        <div className="cell">✔<br/>Unlimited</div>
        <div className="cell">✔<br/>Unlimited</div>
      </div>
    </div>
  </section>
)}
       
        {/* FAQ સેક્શન - તમામ 14 પ્રશ્નો સાથે */}
        {activeTab === "cultpass Home" && (
      <div className="faq-section" style={{ padding: '40px', backgroundColor: '#000', color: '#fff', maxWidth: '800px', margin: 'auto', marginTop: '50px' }}>
        <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '30px', paddingBottom: '10px', borderBottom: '2px solid #ff4a86' }}>
          Frequently Asked Questions
        </h2>
        
        {[
          { q: "What are At-home workouts?", a: "At-home workouts let you experience group fitness led by star trainers at home. Formats include strength, cardio, HRX, and yoga. Most are bodyweight-based and safe for all levels. Use the Energy Meter for real-time feedback." },
          { q: "What is a cultpass Home?", a: "It is a digital subscription providing unlimited access to fitness, dance, yoga, and meditation sessions from home." },
          { q: "Are there any trial sessions for cultpass Home? Where can I check my eligibility?", a: "Yes, you can check your eligibility and start a free trial session directly on the cult.fit app or website under the 'Subscription' section." },
          { q: "If I buy the cultpass Home on one device, can I use it on another device?", a: "Yes, your subscription is linked to your cult.fit account. You can log in on any device." },
          { q: "What are the different options available with cultpass Home?", a: "It offers a wide variety of formats including strength, cardio, HRX, yoga, and dance fitness, along with celebrity masterclasses." },
          { q: "What are the services accessible to a cultpass Home member?", a: "Members get unlimited access to live fitness sessions, recorded DIY workouts, and progress tracking." },
          { q: "Can I cancel cultpass Home subscription after purchase?", a: "Cancellation policies vary. Please check the 'My Subscriptions' section in your app for specific options." },
          { q: "Can I transfer or pause cultpass Home?", a: "No, currently, cultpass Home subscriptions cannot be paused or transferred to another account." },
          { q: "What services does the cultpass Home not include?", a: "cultpass Home does not include offline access to cult.fit centers (gyms) or online therapy/consultation services." },
          { q: "What are At-Home Classes?", a: "These are guided, high-energy fitness sessions that you can join live or on-demand from your home." },
          { q: "I’m new to working out, are At-home classes safe for beginners like me?", a: "Yes, classes are designed for all levels. If you have an injury or medical condition, consult a medical expert first." },
          { q: "Do I need equipment to attend At-home Classes?", a: "Most classes are bodyweight-based and require no equipment. A few specific sessions might require basic home items." },
          { q: "What are the types of workouts featured in At-home classes?", a: "Formats include Yoga, Dance Fitness, Strength Training, Cardio, HRX, and Meditation." },
          { q: "Can I download an At-home class that I’ve subscribed to in advance?", a: "At-home classes are designed for streaming (live or on-demand); offline downloading is not supported." }
        ].map((item, index) => (
          <div key={index} style={{ borderBottom: '1px solid #333', padding: '15px 0' }}>
            <div 
              onClick={(e) => {
                const content = e.currentTarget.nextElementSibling;
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
              }}
              style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', display: 'flex', justifyContent: 'space-between', padding: '10px 0', color: '#fff' }}
            >
              {item.q}
              <span>+</span>
            </div>
            
            <div style={{ display: 'none', marginTop: '10px', color: '#ccc', lineHeight: '1.6', paddingLeft: '10px' }}>
              {item.a}
              
              {/* ફીડબેક સેક્શન */}
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#888' }}>
                Do you find this helpful? 
                <span 
                  onClick={(e) => { e.target.parentElement.innerHTML = "Thank you for the feedback!"; }}
                  style={{ marginLeft: '10px', cursor: 'pointer', color: '#ff4a86', fontWeight: 'bold' }}>YES</span> 
                
                {/* NO પર ક્લિક કરવાથી કાંઈ નહીં થાય (ખાલી રાખ્યું છે) */}
                <span 
                  onClick={(e) => { /* અહીં કંઈ જ નથી લખ્યું, એટલે કંઈ જ નહીં થાય */ }}
                  style={{ marginLeft: '10px', cursor: 'pointer', color: '#ff4a86', fontWeight: 'bold' }}>NO</span>
              </div>
              
            </div>
          </div>
        ))}
        {/* Fitness Meaning Section - Centered */}
<section style={{ 
  padding: '40px', 
  backgroundColor: '#000', 
  color: '#fff', 
  textAlign: 'center', 
  maxWidth: '800px', 
  margin: '0 auto' 
}}>
  <h2 style={{ color: '#ff4a86', marginBottom: '15px' }}>What does Fitness Mean?</h2>
  <p style={{ lineHeight: '1.6', color: '#ccc', fontSize: '18px' }}>
    Fitness is a form of good health of the body where an individual is physically and mentally fit. 
    The main objective of fitness is to provide ample energy with less fatigue and the resilience 
    to efficiently perform tasks in our regular routines.
  </p>
</section>

{/* Exercise Section - Centered */}
<section style={{ 
  padding: '40px', 
  backgroundColor: '#000', 
  color: '#fff', 
  textAlign: 'center', 
  maxWidth: '800px', 
  margin: '0 auto' 
}}>
  <h2 style={{ color: '#ff4a86', marginBottom: '15px' }}>Exercises</h2>
  <p style={{ lineHeight: '1.6', color: '#ccc', fontSize: '18px' }}>
    Exercise enhances or maintains the overall wellness of the body. 
    It supports physical fitness and health. People perform home exercise 
    to improve strength, develop muscles, lose weight, aid growth, and 
    prevent ageing. One should always keep in mind that spending some 
    time on daily fitness is better than not doing anything.
  </p>
</section>
<section style={{ padding: '40px', backgroundColor: '#000', color: '#fff', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
  <h2 style={{ color: '#ff4a86', marginBottom: '25px' }}>What are the Different Types of Exercise?</h2>
  
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
    
    {[
      { title: "Endurance", desc: "Builds heart & lung capacity and muscle stamina to workout longer." },
      { title: "Strength", desc: "Working against resistance to increase muscle mass and bone density." },
      { title: "Balance", desc: "Controls body coordination and movement stability to prevent falls." },
      { title: "Flexibility", desc: "Stretches muscles and joints to improve range of motion and reduce pain." }
    ].map((item, index) => (
      <div key={index} style={{ padding: '20px', border: '1px solid #333', borderRadius: '10px' }}>
        <h3 style={{ color: '#fff' }}>{item.title}</h3>
        <p style={{ color: '#ccc', fontSize: '14px' }}>{item.desc}</p>
      </div>
    ))}
  </div>
</section>
<section style={{ padding: '40px', backgroundColor: '#000', color: '#fff', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
  <h2 style={{ color: '#ff4a86', marginBottom: '30px' }}>10 Best Exercises to be Fit</h2>
  
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
    {[
      "Lunges", "Pushups", "Squats", "Burpees", "Side Planks", 
      "Planks", "Glute Bridge", "Dumbbell Exercises", "Walking", "Yoga/Stretching"
    ].map((exercise, index) => (
      <div key={index} style={{ padding: '20px', border: '1px solid #333', borderRadius: '12px', backgroundColor: '#1a1a1a' }}>
        <h3 style={{ color: '#ff4a86' }}>{exercise}</h3>
        <p style={{ color: '#ccc', fontSize: '14px' }}>Essential for building {exercise === 'Walking' ? 'cardio' : 'strength & flexibility'}.</p>
      </div>
    ))}
  </div>
</section>
<section style={{ padding: '40px', backgroundColor: '#000', color: '#fff', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
  <h2 style={{ color: '#ff4a86', marginBottom: '30px' }}>Benefits of Exercise</h2>
  
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', textAlign: 'left' }}>
    {[
      { title: "Prevents Cardiovascular Disease", desc: "Lowers risks of heart disease, stroke, manages blood pressure and cholesterol." },
      { title: "Treats Type 2 Diabetes", desc: "Helps manage insulin levels and reduces the risk of developing diabetes." },
      { title: "Prevents Metabolic Syndrome", desc: "Fights high blood pressure, high sugar, and excess belly fat effectively." },
      { title: "Reduces Risk of Cancer", desc: "Physically active individuals have lower cancer risks and improved recovery." },
      { title: "Strengthens Bones & Muscles", desc: "Protects joints, improves core strength, and slows down age-related weakness." }
    ].map((benefit, index) => (
      <div key={index} style={{ padding: '20px', border: '1px solid #333', borderRadius: '10px', backgroundColor: '#121212' }}>
        <h3 style={{ color: '#ff4a86', fontSize: '18px', marginBottom: '10px' }}>{benefit.title}</h3>
        <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.5' }}>{benefit.desc}</p>
      </div>
    ))}
  </div>
</section>
<section style={{ padding: '40px', backgroundColor: '#000', color: '#fff', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
  <h2 style={{ color: '#ff4a86', marginBottom: '20px' }}>Disadvantages of Excessive Exercise</h2>
  <div style={{ padding: '20px', border: '1px solid #ff4a86', borderRadius: '10px', backgroundColor: '#1a0b10' }}>
    <p style={{ lineHeight: '1.6', color: '#ddd' }}>
      While exercise is vital, it must be done in moderation. Excessive training can lead to:
    </p>
    <ul style={{ textAlign: 'left', display: 'inline-block', lineHeight: '2' }}>
      <li><strong>Addiction:</strong> Can lead to psychological distress and family neglect.</li>
      <li><strong>Physical Injuries:</strong> Overtraining can damage joints and soft tissues.</li>
      <li><strong>Systemic Stress:</strong> In rare cases, extreme exhaustion causes premature ageing of the system.</li>
    </ul>
  </div>
</section>
<section style={{ padding: '40px', backgroundColor: '#000', color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
  <h2 style={{ textAlign: 'center', color: '#ff4a86', marginBottom: '30px' }}>Do's & Don'ts for Fitness</h2>
  
  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
    {/* DO'S */}
    <div style={{ flex: 1, minWidth: '300px', padding: '20px', border: '1px solid #28a745', borderRadius: '10px' }}>
      <h3 style={{ color: '#28a745' }}>✅ DO'S</h3>
      <ul style={{ lineHeight: '1.8', color: '#ccc' }}>
        <li>Perform regular training & be consistent.</li>
        <li>Make nutrition a priority.</li>
        <li>Stay hydrated (include energy fluids).</li>
        <li>Incorporate movement into daily routine.</li>
      </ul>
    </div>

    {/* DON'TS */}
    <div style={{ flex: 1, minWidth: '300px', padding: '20px', border: '1px solid #dc3545', borderRadius: '10px' }}>
      <h3 style={{ color: '#dc3545' }}>❌ DON'TS</h3>
      <ul style={{ lineHeight: '1.8', color: '#ccc' }}>
        <li>Don't repeat the same exercises monotonously.</li>
        <li>Don't overdo any exercise.</li>
        <li>Don't drink water immediately after workouts.</li>
        <li>Don't lose hope if results take time.</li>
        <li>Consult experts before starting if you have health issues.</li>
      </ul>
    </div>
  </div>
</section>
<section style={{ padding: '40px', backgroundColor: '#000', color: '#fff', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
  <h2 style={{ color: '#ff4a86', marginBottom: '20px' }}>What to Eat After a Workout?</h2>
  <p style={{ lineHeight: '1.6', color: '#ccc', marginBottom: '20px' }}>
    Recovery is just as important as the workout itself. To build muscle and restore energy, focus on a balanced intake:
  </p>
  
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
    {[
      { title: "Proteins", desc: "Builds and repairs muscle tissue." },
      { title: "Carbohydrates", desc: "Replenishes glycogen stores for energy." },
      { title: "Healthy Fats", desc: "Supports hormone balance." },
      { title: "Hydration", desc: "Water-rich foods/fluids for recovery." }
    ].map((item, index) => (
      <div key={index} style={{ padding: '15px', border: '1px solid #444', borderRadius: '8px' }}>
        <h4 style={{ color: '#fff', margin: '0 0 10px 0' }}>{item.title}</h4>
        <p style={{ color: '#aaa', fontSize: '12px' }}>{item.desc}</p>
      </div>
    ))}
  </div>
</section>
<section style={{ 
  padding: '40px', 
  backgroundColor: '#1a1a1a', 
  color: '#fff', 
  textAlign: 'center', 
  margin: '40px 20px',
  borderRadius: '15px',
  border: '1px solid #ff4a86' 
}}>
  <h2 style={{ color: '#ff4a86', marginBottom: '20px' }}>Is it Effective to Workout at Home?</h2>
  <p style={{ lineHeight: '1.8', color: '#eee', fontSize: '18px', maxWidth: '800px', margin: '0 auto' }}>
    The answer is a big <strong>YES</strong>. Online workout classes at home are just as effective as a gym, 
    saving you valuable time on travel and reducing gym membership expenses. 
    In today's fast-paced world, staying fit from the comfort of your home is the most convenient 
    and sustainable way to achieve your fitness goals.
  </p>
</section>
<section style={{ 
  padding: '40px', 
  backgroundColor: '#000', 
  color: '#fff', 
  textAlign: 'center', 
  maxWidth: '800px', 
  margin: '0 auto' 
}}>
  <h2 style={{ color: '#ff4a86', marginBottom: '20px' }}>What to do Post-Workout?</h2>
  <p style={{ lineHeight: '1.6', color: '#ccc', marginBottom: '20px' }}>
    Your post-workout routine is critical for preventing injury and maximizing results. Follow these simple steps:
  </p>
  
  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
    <div style={{ padding: '15px', width: '100%', borderLeft: '4px solid #ff4a86', backgroundColor: '#1a1a1a', textAlign: 'left' }}>
      <h4 style={{ margin: '0 0 5px 0', color: '#fff' }}>1. Cool Down & Stretch</h4>
      <p style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>Stretching is essential to minimize muscle strain and improve flexibility after a rigorous session.</p>
    </div>
    
    <div style={{ padding: '15px', width: '100%', borderLeft: '4px solid #ff4a86', backgroundColor: '#1a1a1a', textAlign: 'left' }}>
      <h4 style={{ margin: '0 0 5px 0', color: '#fff' }}>2. Rest and Recover</h4>
      <p style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>Give your body enough time to recover; this is when your muscles actually grow and strengthen.</p>
    </div>
  </div>
</section>
<section style={{ 
  padding: '40px', 
  backgroundColor: '#000', 
  color: '#fff', 
  textAlign: 'center', 
  maxWidth: '800px', 
  margin: '0 auto' 
}}>
  <h2 style={{ color: '#ff4a86', marginBottom: '25px' }}>What is the Right Age to Exercise?</h2>
  
  <div style={{ padding: '25px', border: '1px solid #ff4a86', borderRadius: '15px', backgroundColor: '#111' }}>
    <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#ccc' }}>
      It's never too early or too late to start!
    </p>
    <ul style={{ textAlign: 'left', display: 'inline-block', lineHeight: '2', color: '#fff' }}>
      <li><strong>12-14 Years & Above:</strong> Ideal age to start proper strengthening workouts.</li>
      <li><strong>Childhood Habits:</strong> Starting young builds a lifelong habit of fitness.</li>
      <li><strong>After 50+:</strong> Never too late! Just ensure you seek expert guidance before starting.</li>
    </ul>
    <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#ff4a86' }}>
      "Consistency is the key to fitness, regardless of your age."
    </p>
  </div>
</section>
<section style={{ 
  padding: '40px', 
  backgroundColor: '#000', 
  color: '#fff', 
  textAlign: 'center', 
  maxWidth: '800px', 
  margin: '0 auto' 
}}>
  <h2 style={{ color: '#ff4a86', marginBottom: '25px' }}>Equipment & Accessories</h2>
  
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
    {/* Equipment */}
    <div style={{ padding: '20px', border: '1px solid #444', borderRadius: '10px' }}>
      <h3 style={{ color: '#fff', fontSize: '18px' }}>Essential Equipment</h3>
      <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>
        Training bench, dumbbells, treadmill, elliptical, and stationary bicycle. 
        <br/><br/>
        <em>Note: You can also tone your body with bodyweight exercises without any gear!</em>
      </p>
    </div>

    {/* Accessories */}
    <div style={{ padding: '20px', border: '1px solid #444', borderRadius: '10px' }}>
      <h3 style={{ color: '#fff', fontSize: '18px' }}>Handy Accessories</h3>
      <ul style={{ textAlign: 'left', color: '#ccc', fontSize: '14px', lineHeight: '1.8' }}>
        <li>Activity tracker</li>
        <li>Health drink shakers</li>
        <li>Weight lifting gloves</li>
        <li>Moisturizers & Sanitizers</li>
      </ul>
    </div>
  </div>
</section>
<section style={{ padding: '40px', backgroundColor: '#111', color: '#fff', textAlign: 'center' }}>
  <h2 style={{ color: '#ff4a86', marginBottom: '30px' }}>Explore Fitness & Mindfulness</h2>
  
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
    
    {/* ટોપ સર્ચિસ */}
    <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '10px' }}>
      <h3 style={{ color: '#ff4a86' }}>Top Searches</h3>
      <a href="https://www.youtube.com/results?search_query=workout+at+home" target="_blank" style={{ color: '#fff', textDecoration: 'none', display: 'block', margin: '10px 0' }}>Workout at Home</a>
      <a href="https://www.youtube.com/results?search_query=weight+loss+exercise" target="_blank" style={{ color: '#fff', textDecoration: 'none', display: 'block', margin: '10px 0' }}>Weight Loss Exercise</a>
      <a href="https://www.youtube.com/results?search_query=abs+workout" target="_blank" style={{ color: '#fff', textDecoration: 'none', display: 'block', margin: '10px 0' }}>Abs Workout</a>
    </div>

    {/* માઇન્ડફુલનેસ */}
    <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '10px' }}>
      <h3 style={{ color: '#ff4a86' }}>Mindfulness</h3>
      <a href="https://www.youtube.com/results?search_query=yoga+poses" target="_blank" style={{ color: '#fff', textDecoration: 'none', display: 'block', margin: '10px 0' }}>Yoga Poses</a>
      <a href="https://www.youtube.com/results?search_query=meditation+for+sleep" target="_blank" style={{ color: '#fff', textDecoration: 'none', display: 'block', margin: '10px 0' }}>Sleep Meditation</a>
      <a href="https://www.youtube.com/results?search_query=mindfulness+meditation" target="_blank" style={{ color: '#fff', textDecoration: 'none', display: 'block', margin: '10px 0' }}>Mindfulness</a>
    </div>

    {/* હેલ્ધી રેસિપી */}
    <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '10px' }}>
      <h3 style={{ color: '#ff4a86' }}>Healthy Recipes</h3>
      <a href="https://www.youtube.com/results?search_query=sambar+recipe" target="_blank" style={{ color: '#fff', textDecoration: 'none', display: 'block', margin: '10px 0' }}>Sambar Recipe</a>
      <a href="https://www.youtube.com/results?search_query=healthy+paneer+recipes" target="_blank" style={{ color: '#fff', textDecoration: 'none', display: 'block', margin: '10px 0' }}>Paneer Recipes</a>
      <a href="https://www.youtube.com/results?search_query=homemade+protein+powder" target="_blank" style={{ color: '#fff', textDecoration: 'none', display: 'block', margin: '10px 0' }}>Protein Powder</a>
    </div>

  </div>
  
</section>

      </div>
      )}
      </div>
    </div>

    <footer style={{ 
  padding: '40px 20px', 
  textAlign: 'center', 
  backgroundColor: '#000', 
  color: '#888', 
  borderTop: '1px solid #333', 
  marginTop: '50px',
  fontSize: '14px' 
}}>
  {/* લોકેશન લિંક્સ */}
  <div style={{ marginBottom: '30px' }}>
    <h4 style={{ color: '#fff', marginBottom: '15px' }}>OUR LOCATIONS</h4>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', maxWidth: '800px', margin: '0 auto' }}>
      {[
        "BANGALORE", "HSR LAYOUT", "KORAMANGALA", "INDIRANAGAR", "WHITEFIELD", 
        "ELECTRONIC CITY", "BELLANDUR", "JAYANAGAR", "MARATHAHALLI", "MG ROAD", 
        "BANASHANKARI", "SARJAPUR", "MUMBAI", "PUNE"
      ].map((loc) => (
        <a 
          key={loc} 
          href={`https://www.google.com/maps/search/cult.fit+${loc.replace(/ /g, '+')}`} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#ff5a1f', textDecoration: 'none', fontSize: '12px' }}
        >
          {loc}
        </a>
      ))}
    </div>
  </div>

  {/* બાકીનું ફૂટર */}
  <div style={{ marginBottom: '20px' }}>
    <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#fff' }}>cult.fit - Bengaluru HQ</p>
    <p style={{ margin: '5px 0' }}>1st Floor, 12th Main Road, HSR Layout, Bengaluru, Karnataka - 560102</p>
    <p style={{ margin: '5px 0' }}><b> Contact Us</b> </p>
    <p style={{ margin: '5px 0' }}><b></b> 📞 +91 91060 47691</p>
    <p style={{ margin: '5px 0' }}><b>Hours:</b> Monday - Sunday | 06:00 AM - 10:00 PM</p>
  </div>
  
  <div>
    <a href="#" style={{ color: '#ff5a1f', textDecoration: 'none', margin: '0 10px' }}>Terms & Conditions</a>
    <span style={{ color: '#444' }}> | </span>
    <a href="#" style={{ color: '#ff5a1f', textDecoration: 'none', margin: '0 10px' }}>Privacy Policy</a>
  </div>
<div
  style={{
    textAlign: "center",
    padding: "40px 20px",
    background: "#000",
    color: "#fff",
  }}
>
  <h2 style={{ color: "white" }}>
  📩 Stay Updated
</h2>
  <p>Get fitness tips and exclusive offers.</p>

  <input
    type="email"
    placeholder="Enter Email"
    style={{
      padding: "10px",
      width: "250px",
      borderRadius: "5px",
      border: "1px solid #444",
      marginRight: "10px",
    }}
  />

  <button
  onClick={() => setSubscribed(true)}
  style={{
    background: "#ff5a1f",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Subscribe
</button>
{subscribed && (
  <p
    style={{
      color: "#4CAF50",
      marginTop: "15px",
      fontWeight: "bold",
    }}
  >
    ✅ Successfully Subscribed!
  </p>
)}
</div>
  <p style={{ marginTop: '20px' }}>© 2026 cult.fit | Built with passion for fitness.</p>
</footer>
<button 
  onClick={() => setActiveTab("Feedback")} 
  style={{ background: '#333', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
>
  Give Feedback
</button>
    
    <div style={{ textAlign: 'center', marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '25px', paddingBottom: '20px' }}>
  
  {/* Instagram */}
  <a href="https://www.instagram.com/cultfitofficial/" target="_blank" rel="noopener noreferrer" style={{ color: '#E1306C' }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  </a>

  {/* Facebook */}
  <a href="https://www.facebook.com/cultfitofficial" target="_blank" rel="noopener noreferrer" style={{ color: '#4267B2' }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
  </a>

  {/* Twitter/X */}
  <a href="https://twitter.com/cultfitofficial" target="_blank" rel="noopener noreferrer" style={{ color: '#1DA1F2' }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
  </a>

  {/* YouTube */}
  <a href="https://www.youtube.com/c/cultfit" target="_blank" rel="noopener noreferrer" style={{ color: '#FF0000' }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
  </a>

</div>
    </div>
    
  );
}