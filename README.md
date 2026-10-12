# 🍳 Data-Driven Kitchen Products Retail Start-up

A college mini-project that combines **Python data analytics, revenue forecasting, Power BI visualization, and a modern dummy kitchen-products retail website** to demonstrate how data can support retail business decisions.

> **Note:** The website is a **non-functional prototype** created for academic demonstration. The payment gateway is also a **simulation only** and does not process real payments.

---

## 📌 Project Overview

The project analyzes kitchen-product retail data to identify sales trends, customer purchasing patterns, top-performing products, and business opportunities.

The project has three main components:

1. 🐍 **Python Data Analytics**
2. 📊 **Power BI Interactive Dashboard**
3. 🛒 **Dummy Kitchen Retail Website**

---

## 🎯 Objectives

- Analyze historical kitchen-product sales data.
- Identify best-selling products and categories.
- Understand customer purchasing patterns.
- Analyze monthly revenue trends.
- Forecast future revenue when sufficient data is available.
- Provide inventory and restocking recommendations when supported by the dataset.
- Create an interactive Power BI dashboard.
- Develop an attractive dummy retail website.
- Demonstrate a simulated shopping cart, checkout, and payment gateway.

---

## 🛠️ Technologies Used

| Component | Technology |
|---|---|
| Programming | Python |
| Data Analysis | Pandas, NumPy |
| Visualization | Matplotlib, Chart.js |
| Machine Learning | Scikit-learn |
| Business Intelligence | Power BI |
| Frontend | HTML, CSS, JavaScript |
| Development | VS Code / Jupyter Notebook |

---

## 📊 Analytics

The project follows four levels of analytics:

### 1. Descriptive Analytics
Analyzes what happened.

- Total revenue
- Total orders
- Units sold
- Profit and profit margin
- Average order value
- Best-selling products
- Category performance
- Monthly revenue

### 2. Diagnostic Analytics
Analyzes why sales may vary.

- Customer segment comparison
- Product performance
- Category performance
- High/low-performing products
- Monthly and seasonal patterns

### 3. Predictive Analytics
Estimates future performance.

- Monthly revenue forecasting
- Linear Regression baseline model
- MAE and RMSE evaluation
- Next 3-month forecast when sufficient historical data exists

### 4. Prescriptive Analytics
Provides business recommendations.

- Fast- and slow-moving products
- Restocking priorities
- Potential low-stock/overstock situations
- Inventory recommendations when required data is available

---

## 📈 Power BI Dashboard

The **Kitchen Retail Analytics Dashboard** includes:

- Total Revenue
- Total Orders
- Units Sold
- Total Profit
- Average Order Value
- Category-wise Sales
- Monthly Revenue Trend
- Customer Segment Analysis
- Top 5 Products
- Revenue Forecast
- Inventory Recommendations
- Interactive filters and slicers

> Dashboard calculations are based on the actual cleaned dataset, not the dummy website data.

---

## 🛒 Dummy Retail Website

The website is designed as a realistic **kitchen-products retail prototype**.

### Pages

- 🏠 Home
- 🛍️ Products
- 🛒 Cart
- 💳 Checkout
- 📊 Analytics Preview
- ℹ️ About
- 📞 Contact
- 💰 Mock Payment
- ✅ Demo Payment Success
- ❌ Demo Payment Failure

### Website Features

- Responsive design
- Product cards
- Categories
- Search/filter interface
- Dummy shopping cart
- Checkout interface
- Analytics preview
- Local JavaScript interactions
- Mock payment gateway

---

## 💳 Mock Payment Gateway

The payment section is **simulation only**.

It demonstrates:

- UPI
- Debit/Credit Card
- Net Banking
- Cash on Delivery
- Demo payment loading
- Demo success/failure screens

### ⚠️ Safety

The project does **not**:

- Process real payments
- Connect to Razorpay/Stripe/UPI APIs
- Store card details
- Store CVV or UPI PIN
- Connect to banks
- Create real orders
- Use a real payment gateway
- Use a backend/database for payments

---

## 📁 Project Structure

```text
kitchen-retail-project/
│
├── website/
│   ├── index.html
│   ├── products.html
│   ├── cart.html
│   ├── checkout.html
│   ├── payment.html
│   ├── payment-success.html
│   ├── payment-failure.html
│   ├── analytics.html
│   ├── about.html
│   ├── contact.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── products.js
│   │   └── payment-demo.js
│   │
│   └── assets/
│       └── images/
│
├── data/
│   ├── original_dataset
│   └── cleaned_dataset.csv
│
├── python/
│   ├── kitchen_retail_analysis.ipynb
│   └── kitchen_retail_analysis.py
│
├── powerbi/
│   └── Kitchen_Retail_Dashboard.pbix
│
├── report/
│   ├── project_report.docx
│   └── presentation.pptx
│
└── README.md
```

---

## 🚀 How to Run

### Python Analysis

Install the required libraries:

```bash
pip install pandas numpy matplotlib scikit-learn jupyter
```

Run Jupyter Notebook:

```bash
jupyter notebook
```

Open:

```text
python/kitchen_retail_analysis.ipynb
```

---

### Website

Open the `website` folder in **VS Code**.

You can launch `index.html` directly in a browser or use the **Live Server** extension in VS Code.

The website works as a **local demonstration prototype**.

---

### Power BI

1. Open Power BI Desktop.
2. Import `data/cleaned_dataset.csv`.
3. Set appropriate data types.
4. Create the required DAX measures.
5. Add the dashboard visuals and slicers.
6. Save the report as:

```text
powerbi/Kitchen_Retail_Dashboard.pbix
```

---

## 🔄 Project Workflow

```text
Raw Dataset
     ↓
Data Cleaning
     ↓
Exploratory Analysis
     ↓
Descriptive Analytics
     ↓
Diagnostic Analytics
     ↓
Revenue Forecasting
     ↓
Business Recommendations
     ↓
Power BI Dashboard
     ↓
Dummy Retail Website
     ↓
Mock Checkout & Payment
```

---

## 📌 Project Limitations

- Website is only a frontend prototype.
- Payment gateway is simulated.
- No real transactions are processed.
- Forecast accuracy depends on the available historical data.
- Inventory recommendations require suitable stock and demand information.
- Power BI `.pbix` must be created using Power BI Desktop.

---

## 🔮 Future Scope

The project could later be extended with:

- Real e-commerce backend
- User authentication
- Product database
- Real inventory management
- Real payment integration
- Cloud deployment
- Advanced machine-learning forecasting
- Recommendation system
- Real-time sales analytics
- AI-powered business insights

---

## 👩‍💻 Project Type

**College Mini-Project**

**Domain:** Data Analytics + Business Intelligence + Retail Technology

**Project Title:**  
**Data-Driven Kitchen Products Retail Start-up**

---

## 📜 Disclaimer

This project is developed for **educational and demonstration purposes**. The website, checkout, payment gateway, and sample website analytics are not intended for real commercial transactions.

Actual analytical results and business conclusions must be generated from the provided dataset and should not be fabricated.
