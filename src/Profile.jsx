import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const Profile = ({ setUser, setActiveTab }) => {
  const [userData, setUserData] = useState({ 
    name: '', phone: '', email: '', gender: '', dob: '', height: '', weight: '', fitnessGoal: '' 
  });
  const imageUrl = userData?.imageUrl;
  const [myWorkouts, setMyWorkouts] = useState([]);
  const [myPlans, setMyPlans] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  const [activeSection, setActiveSection] = useState('profile');

 const loadUserData = () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));

    console.log("LOGGED USER:", storedUser);

    if (!storedUser?.email) {
      console.log("No user found in localStorage");
      return;
    }

    const email = storedUser.email;

    const savedProfile = JSON.parse(
      localStorage.getItem(`userProfileData_${email}`) || '{}'
    );

    setUserData({
      name: storedUser.name || '',
      email,
      phone: savedProfile.phone || '',
      gender: savedProfile.gender || '',
      dob: savedProfile.dob || '',
      height: savedProfile.height || '',
      weight: savedProfile.weight || '',
      fitnessGoal: savedProfile.fitnessGoal || '',
      imageUrl: savedProfile.imageUrl || ''
    });

    setMyWorkouts(JSON.parse(localStorage.getItem(`myWorkouts_${email}`) || '[]'));
    setMyPlans(JSON.parse(localStorage.getItem(`myPlans_${email}`) || '[]'));
    setMonthlyData(JSON.parse(localStorage.getItem(`monthlyProgress_${email}`) || '{}'));

  } catch (error) {
    console.error("Error loading user data:", error);
  }
};
useEffect(() => {
  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    setActiveTab("login"); // or home
  }
}, []);
  // Profile.jsx માં આ ફેરફાર કરો
useEffect(() => {
  loadUserData();
}, []);
  const handleSave = () => {
    const email = userData.email;
    if (email) {
      // ૧. માત્ર યુઝરના ઈમેલ વાળી કી માં જ ડેટા સેવ કરો
      localStorage.setItem(`userProfileData_${email}`, JSON.stringify(userData));
      
      // ૨. ગ્લોબલ કી વાળો ભાગ કાઢી નાખો (તેની જરૂર નથી)
      // const globalProfile = JSON.parse(localStorage.getItem('userProfileData') || '{}');
      // globalProfile.fitnessGoal = userData.fitnessGoal;
      // localStorage.setItem('userProfileData', JSON.stringify(globalProfile));

      alert("Profile Saved Successfully!");
    }
  };

  const saveMonthlyProgress = (month, value) => {
    const email = userData.email;
    if (email) {
      const updatedData = { ...monthlyData, [month]: value };
      setMonthlyData(updatedData);
      localStorage.setItem(`monthlyProgress_${email}`, JSON.stringify(updatedData));
    }
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed) {
      localStorage.removeItem('loggedInUser');
      setUser(false);
      setActiveTab("cultpass Home");
    }
  };

  const removeWorkout = (index) => {
    const email = userData.email;
    const updated = myWorkouts.filter((_, i) => i !== index);
    setMyWorkouts(updated);
    if (email) localStorage.setItem(`myWorkouts_${email}`, JSON.stringify(updated));
  };

  const removePlan = (indexToDelete) => {
    const email = userData.email;
    const updatedPlans = myPlans.filter((_, index) => index !== indexToDelete);
    setMyPlans(updatedPlans);
    if (email) localStorage.setItem(`myPlans_${email}`, JSON.stringify(updatedPlans));
  };

  const calculateBMI = () => {
  const h = parseFloat(userData.height); // દા.ત. 170
  const w = parseFloat(userData.weight); // દા.ત. 65
  
  // અહીં હાઈટને સેમીમાંથી મીટરમાં ફેરવવી જરૂરી છે (h / 100)
  if (h > 0 && w > 0) {
    const heightInMeters = h / 100; 
    const bmiValue = w / (heightInMeters * heightInMeters);
    return bmiValue.toFixed(1); // 23.1 જેવો આંકડો આવશે
  }
  return "0.0";
};

  const getBMIStatus = (bmi) => {
    if (bmi === "N/A") return "";
    const b = parseFloat(bmi);
    if (b < 18.5) return "Underweight";
    if (b < 25) return "Normal";
    return "Overweight";
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const inputStyle = { width: '100%', padding: '10px 0', border: 'none', borderBottom: '1px solid #ccc', background: 'transparent', fontSize: '16px', marginTop: '5px', outline: 'none' };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff', color: '#000' }}>
      <div style={{ width: '280px', backgroundColor: '#1a1a1a', padding: '40px 20px', color: '#fff', textAlign: 'center' }}>
        <div style={{
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: '#555',
  marginBottom: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '40px'
}}>
  {imageUrl ? (
    <img
      src={imageUrl}
      alt="profile"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  ) : (
    <span>👤</span>
  )}
</div>
        <h3>{userData.name || "User"}</h3>
        <p style={{ fontSize: '12px', color: '#ff4500' }}>{userData.email}</p>
        
        <div style={{ marginTop: '20px', width: '100%' }}>
            <p style={{ fontSize: '10px', color: '#aaa', marginBottom: '5px' }}>PROFILE COMPLETION</p>
            <div style={{ width: '100%', backgroundColor: '#444', height: '8px', borderRadius: '4px' }}>
                <div style={{ width: '70%', backgroundColor: '#ff4500', height: '8px', borderRadius: '4px' }}></div>
            </div>
        </div>

        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#333', borderRadius: '10px' }}>
          <p style={{ fontSize: '12px', color: '#aaa' }}>CURRENT BMI</p>
          <h2 style={{ margin: '5px 0' }}>{calculateBMI()}</h2>
          <p style={{ fontSize: '12px', color: '#ff4500', fontWeight: 'bold' }}>{getBMIStatus(calculateBMI())}</p>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'left' }}>
          <p onClick={() => setActiveSection('profile')} style={{ cursor: 'pointer', padding: '10px', backgroundColor: activeSection === 'profile' ? '#333' : 'transparent', borderRadius: '5px' }}>My Profile</p>
           
        </div>

        <p onClick={handleLogout} style={{ cursor: 'pointer', marginTop: '40px', color: '#ff4500', fontWeight: 'bold' }}>Logout</p>
      </div>

      <div style={{ flex: 1, padding: '50px 80px' }}>
  {activeSection === 'profile' ? (
    <div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}
      >
        <div>
          <h2>Hello, {userData.name || "Fitness Enthusiast"}!</h2>
          <h2>PROFILE SETTINGS</h2>
        </div>

        <button
          onClick={() => setActiveTab("cultpass Home")}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '32px',
            cursor: 'pointer',
            color: '#ff4500',
            fontWeight: 'bold'
          }}
        >
          ✕
        </button>
      </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
              <div><label style={{ fontSize: '12px', color: '#888' }}>NAME</label><input type="text" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} style={inputStyle} /></div>
              <div><label style={{ fontSize: '12px', color: '#888' }}>PHONE NUMBER</label><input type="text" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} style={inputStyle} /></div>
              <div><label style={{ fontSize: '12px', color: '#888' }}>EMAIL</label><input type="text" value={userData.email} readOnly style={inputStyle} /></div>
              <div><label style={{ fontSize: '12px', color: '#888' }}>GENDER</label>
                <select value={userData.gender} onChange={(e) => setUserData({...userData, gender: e.target.value})} style={inputStyle}>
                  <option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option>
                </select>
              </div>
              <div><label style={{ fontSize: '12px', color: '#888' }}>DATE OF BIRTH</label><input type="date" value={userData.dob} onChange={(e) => setUserData({...userData, dob: e.target.value})} style={inputStyle} /></div>
              <div><label style={{ fontSize: '12px', color: '#888' }}>HEIGHT (cm)</label><input type="number" value={userData.height} onChange={(e) => setUserData({...userData, height: e.target.value})} style={inputStyle} /></div>
              <div><label style={{ fontSize: '12px', color: '#888' }}>WEIGHT (kg)</label><input type="number" value={userData.weight} onChange={(e) => setUserData({...userData, weight: e.target.value})} style={inputStyle} /></div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '12px', color: '#888' }}>FITNESS GOAL</label>
<select 
  value={userData.fitnessGoal ? userData.fitnessGoal.trim() : ""} 
  onChange={(e) => setUserData({...userData, fitnessGoal: e.target.value})} 
  style={inputStyle}
>
                  <option value="">Select Goal</option>
  <option value="DANCE FITNESS">DANCE FITNESS</option>
  <option value="YOGA">YOGA</option>
  <option value="BOXING">BOXING</option>
  <option value="EQUIPMENTS">EQUIPMENTS</option>
  <option value="PILATES">PILATES</option>
  <option value="SHED IT 2">SHED IT 2</option>
  <option value="SHED IT">SHED IT</option>
  <option value="SEASON 1">SEASON 1</option>
  <option value="FAT LOSS YOGA">FAT LOSS YOGA</option>
  <option value="FACE YOGA">FACE YOGA</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '50px' }}>
              <h2>MY SUBSCRIPTIONS</h2>
              <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
                {myPlans.length > 0 ? myPlans.map((plan, index) => (
                  <div key={index} style={{ padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px', borderLeft: '5px solid #ff4500', position: 'relative' }}>
                    <button onClick={() => removePlan(index)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'red', fontWeight: 'bold' }}>✕</button>
                    <h4 style={{ margin: '0', color: '#ff4500' }}>{plan.duration} Membership</h4>
                    <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{plan.price}</p>
                    <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#333', marginTop: '10px' }}>
                      <span>📅 <b>Join Date:</b> {formatDate(plan.startDate)}</span>
                      <span>⏳ <b>End Date:</b> {formatDate(plan.endDate)}</span>
                    </div>
                  </div>
                )) : <p>No active subscriptions.</p>}
              </div>
            </div>

            <div style={{ marginTop: '50px', borderTop: '2px solid #eee', paddingTop: '30px' }}>
  <h2>MY BOOKED WORKOUTS</h2>
  {myWorkouts.length > 0 ? myWorkouts.map((w, index) => (
    <div key={`workout-${index}-${w.title}`} style={{ padding: '15px', border: '1px solid #ddd', marginTop: '10px', borderRadius: '8px' }}>
      <h4>{w.title}</h4>
      <p style={{ margin: '0', color: '#666' }}>{w.trainer} • {w.level}</p>
      
      <button 
        onClick={() => removeWorkout(index)} 
        style={{ marginTop: '15px', background: '#ff4500', color: '#fff', border: 'none', padding: '8px 20px', cursor: 'pointer', borderRadius: '4px' }}
      >
        REMOVE
      </button>
    </div>
  )) : <p>You haven't joined any workouts yet.</p>}
</div>

<div style={{ marginTop: "50px" }}>
  <h2>WEEKLY SCHEDULE</h2>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      border: "1px solid #ddd",
    }}
  >
    <thead>
      <tr style={{ background: "#ff4500", color: "#fff" }}>
        <th style={{ padding: "12px", border: "1px solid #ddd" }}>Day</th>
        <th style={{ padding: "12px", border: "1px solid #ddd" }}>Workout</th>
        <th style={{ padding: "12px", border: "1px solid #ddd" }}>Trainer</th>
        <th style={{ padding: "12px", border: "1px solid #ddd" }}>Time</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Monday</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Power Yoga</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Shwetha Rahul</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>07:00 AM</td>
      </tr>

      <tr>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Tuesday</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Vinyasa Yoga</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Gaurav C</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>06:30 AM</td>
      </tr>

      <tr>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Wednesday</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Cardio HIIT</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Sanjeet Kumar</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>07:30 AM</td>
      </tr>

      <tr>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Thursday</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Dance Fitness</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Anjali Shah</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>06:00 AM</td>
      </tr>

      <tr>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Friday</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Strength Labs</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Ranveer Singh</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>07:00 AM</td>
      </tr>

      <tr>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Saturday</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Fat Loss Yoga</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Naveen Sharma</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>08:00 AM</td>
      </tr>

      <tr>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Sunday</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Face Yoga</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>Mansi & Divya</td>
        <td style={{ padding: "10px", border: "1px solid #ddd" }}>09:00 AM</td>
      </tr>
    </tbody>
  </table>
</div>

            <button onClick={handleSave} style={{ marginTop: '40px', padding: '15px 40px', background: '#ff4500', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
              SAVE CHANGES
            </button>
          </div>
        ) : (
          <div>
            
            <h2>MONTHLY ACTIVITY SUMMARY</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '15px', marginTop: '30px' }}>
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
                <div key={month} style={{ padding: '15px', border: '1px solid #ff4500', borderRadius: '10px', textAlign: 'center', backgroundColor: '#fffaf5' }}>
                  <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#ff4500' }}>{month}</label>
                  <input type="number" value={monthlyData[month] || ''} placeholder="0" style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', marginTop: '5px' }} onChange={(e) => saveMonthlyProgress(month, e.target.value)} />
                </div>
                
              ))}
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;