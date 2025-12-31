## 🛒 Shopez – MERN Stack E-Commerce Platform

Shopez is a full-stack e-commerce web application built using the MERN stack.  
The platform allows users to browse products, manage carts, place orders, and complete payments using a dummy payment system, while admins manage products and orders through a secure dashboard.

---

## 🚀 Tech Stack

### Frontend
- React.js
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Cloudinary (Image Uploads)
- Multer

---

## 🛠 Features Implemented

### 👤 User (Customer)
- User Registration & Login (JWT Authentication)
- Browse Products with Category Filtering
- View Product Details
- Add / Remove Products from Cart
- Update Cart Quantity
- Checkout with Shipping Address
- Dummy Payment Options (COD, UPI – PhonePe, Google Pay)
- View Order History & Order Status

### 👨‍💼 Admin
- Admin Login (Role-based Access)
- Create, Edit, and Delete Products
- Upload Product Images (Cloudinary)
- View All Orders
- Update Order Status (Processing → Shipped → Delivered)
- Monitor Platform Activity

---

## 🌐 Live Portal

- **Frontend:** https://shopez-dusky.vercel.app/
- **Backend API:** https://shopez-backend-h3id.onrender.com 

---

## 📂 Project Structure

```bash
/shopez
│── /client        # React frontend
│── /server        # Node + Express backend
│── package.json
│── README.md
⚙️ Setup Instructions
1️⃣ Clone the Repository
bash
Copy code
git clone https://github.com/your-username/shopez.git
2️⃣ Install Dependencies
Backend
cd server
npm install

Frontend
cd client
npm install
3️⃣ Configure Environment Variables
Create a .env file inside server/

env
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
4️⃣ Run the Application
Backend
npm start
Frontend
npm run dev

🔐 Test Credentials
Role	Email	Password
User	user@test.com	123456
Admin	admin@test.com	123456

📌 Future Enhancements
Razorpay / Stripe Payment Integration

Product Reviews & Ratings

Order Invoice Generation (PDF)

Admin Analytics Dashboard

Wishlist Feature

Mobile App Version (React Native)

🎉 Conclusion
Shopez is a real-world MERN stack e-commerce application demonstrating end-to-end development skills including authentication, role-based access control, RESTful APIs, state management with Redux, cloud image handling, and deployment.
The project is scalable, modular, and ready for further production-level enhancements.

👨‍💻 Author
Santhosh
MERN Stack Developer