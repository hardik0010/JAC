# 🚀 JAY AMBE CONSTRUCTION - FULL STACK DEPLOYMENT GUIDE

## 🎯 **DEPLOYMENT OVERVIEW**

**Architecture:**
- **Frontend**: Vercel (Static hosting)
- **Backend**: Render (API hosting) 
- **Database**: MongoDB Atlas (Cloud database)
- **Domain**: GoDaddy (Your existing domain)

---

## 📋 **PHASE 1: DATABASE SETUP (MongoDB Atlas)**

### **Step 1.1: Create MongoDB Atlas Account**
1. Go to https://www.mongodb.com/atlas
2. Sign up for free account
3. Create new project: "Jay Ambe Construction"

### **Step 1.2: Create Database Cluster**
1. Click "Build a Database"
2. Choose **FREE** M0 Sandbox
3. Select region closest to your users (e.g., Mumbai for India)
4. Cluster name: `jay-ambe-cluster`

### **Step 1.3: Setup Database Security**
1. **Database Access**:
   - Username: `jay-ambe-admin`
   - Password: Generate strong password (save it!)
   - Role: `Atlas admin`

2. **Network Access**:
   - Add IP: `0.0.0.0/0` (Allow from anywhere - for deployment)
   - Description: "Production Access"

### **Step 1.4: Get Connection String**
1. Click "Connect" → "Connect your application"
2. Copy connection string (looks like):
   ```
   mongodb+srv://jay-ambe-admin:<password>@jay-ambe-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
3. Replace `<password>` with your actual password

---

## 📋 **PHASE 2: BACKEND DEPLOYMENT (Render)**

### **Step 2.1: Prepare Backend for Deployment**
1. Create `backend/.env.production` with:
   ```env
   MONGODB_URI=your_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_production_2024
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://your-domain.com
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

### **Step 2.2: Deploy to Render**
1. Go to https://render.com
2. Sign up with GitHub account
3. Click "New" → "Web Service"
4. Connect your GitHub repository: `hardik0010/JAC`
5. **Settings**:
   - **Name**: `jay-ambe-construction-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### **Step 2.3: Add Environment Variables**
In Render dashboard, add all environment variables from your `.env.production`

### **Step 2.4: Deploy**
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Your API will be available at: `https://jay-ambe-construction-api.onrender.com`

---

## 📋 **PHASE 3: FRONTEND DEPLOYMENT (Vercel)**

### **Step 3.1: Prepare Frontend**
1. Update `src/config/config.js`:
   ```javascript
   const config = {
     development: {
       API_URL: 'http://localhost:5002/api',
       FRONTEND_URL: 'http://localhost:3000'
     },
     production: {
       API_URL: 'https://jay-ambe-construction-api.onrender.com/api',
       FRONTEND_URL: 'https://your-domain.com'
     }
   };
   ```

### **Step 3.2: Deploy to Vercel**
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import `hardik0010/JAC`
5. **Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### **Step 3.3: Add Environment Variables**
```env
VITE_API_URL=https://jay-ambe-construction-api.onrender.com/api
VITE_FRONTEND_URL=https://your-domain.com
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

### **Step 3.4: Deploy**
1. Click "Deploy"
2. Your site will be available at: `https://your-project.vercel.app`

---

## 📋 **PHASE 4: DOMAIN CONFIGURATION (GoDaddy)**

### **Step 4.1: Configure DNS in GoDaddy**
1. Login to GoDaddy account
2. Go to "My Products" → "DNS"
3. **Add these DNS records**:

   **For Frontend (Vercel):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 1 Hour
   
   Type: A
   Name: @
   Value: 76.76.19.61
   TTL: 1 Hour
   ```

### **Step 4.2: Configure Custom Domain in Vercel**
1. Go to Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your domain: `your-domain.com`
4. Add www subdomain: `www.your-domain.com`
5. Wait for SSL certificate (automatic)

---

## 📋 **PHASE 5: FINAL CONFIGURATION**

### **Step 5.1: Update CORS in Backend**
Update `backend/server.js` CORS configuration:
```javascript
const corsOptions = {
  origin: [
    'https://your-domain.com',
    'https://www.your-domain.com',
    'http://localhost:3000'
  ],
  credentials: true
};
```

### **Step 5.2: Create Admin User**
1. SSH into Render or use their console
2. Run: `node scripts/createAdmin.js`
3. Note down admin credentials

### **Step 5.3: Test Everything**
1. Visit your domain
2. Test contact form
3. Test admin login
4. Test all functionality

---

## 🔐 **SECURITY CHECKLIST**

- ✅ Environment variables secured
- ✅ Database access restricted
- ✅ CORS properly configured
- ✅ HTTPS enabled (automatic with Vercel)
- ✅ Rate limiting enabled
- ✅ Input validation implemented

---

## 💰 **COST BREAKDOWN**

- **MongoDB Atlas**: FREE (512MB storage)
- **Render**: FREE (750 hours/month)
- **Vercel**: FREE (100GB bandwidth)
- **GoDaddy Domain**: Already purchased
- **Total Monthly Cost**: $0 (Free tier limits apply)

---

## 🚀 **UPGRADE PATH**

When you need more resources:
- **Render Pro**: $7/month (better performance)
- **MongoDB Atlas M2**: $9/month (2GB storage)
- **Vercel Pro**: $20/month (unlimited bandwidth)

---

## 📞 **SUPPORT**

If you encounter issues:
1. Check deployment logs in Render/Vercel
2. Verify environment variables
3. Test API endpoints directly
4. Check DNS propagation (can take 24-48 hours)

---

**🎉 Your Jay Ambe Construction website will be live on your custom domain!**
