## 🍽️ Food App

### 🚀 Overview
Food App is a modern and user-friendly web application built with Angular that allows users to browse, search, and manage their favorite meals. The app provides an intuitive interface, authentication features, and a seamless experience for food lovers.

---

### 🎯 Features
✅ **User Authentication** – Sign up, log in, and manage user profiles.  
✅ **Browse & Search** – Discover a variety of meals with a search functionality.  
✅ **Favorites Management** – Add and remove meals from favorites.  
✅ **Responsive Design** – Works across all devices with a sleek UI.  
✅ **Profile Management** – Update user information and profile images.  

---

### 🛠️ Tech Stack
- **Frontend:** Angular, TypeScript, SCSS  
- **State Management:** RxJS  
- **UI Framework:** Bootstrap, ngx-toastr  
- **Backend:** Node.js (Assumed), REST API  
- **Authentication:** JWT  

---

### 📂 Project Structure
```
food-app/
│── src/
│   ├── app/
│   │   ├── core/          # Core modules & services
│   │   ├── feature/       # Feature modules (e.g., auth, profile, favorites)
│   │   ├── shared/        # Shared components & utilities
│   │   ├── environments/  # Environment configurations
│── angular.json           # Angular project configuration
│── package.json           # Dependencies & scripts
│── README.md              # Project documentation like this
```

---

### 📌 Installation & Setup
#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/food-app.git
cd food-app
```

#### 2️⃣ Install Dependencies
```bash
npm install
```

#### 3️⃣ Run the Development Server
```bash
ng serve
```
Then open `http://localhost:4200/` in your browser.

#### 4️⃣ Build for Production
```bash
ng build --configuration production
```

