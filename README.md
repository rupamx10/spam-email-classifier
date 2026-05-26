# 📧 Spam Email Classifier

এটা একটি ML-based Email Spam Detection System যা Machine Learning ব্যবহার করে email spam কিনা বলে দেয়।

---

## 🎯 Project Overview

```
User Email Input
        ↓
    Website
        ↓
   Backend API (Flask)
        ↓
   ML Model (Naive Bayes)
        ↓
   Result: SPAM / NOT SPAM ✅
```

---

## 🗂️ Project Structure

```
spam-email-classifier/
│
├── backend/
│   ├── train.py          ← Model training script
│   ├── app.py            ← Flask server
│   ├── model.pkl         ← Trained model (auto-generated)
│   └── dataset.csv       ← Download from Kaggle
│
├── frontend/
│   ├── index.html        ← Main website
│   ├── style.css         ← CSS styling
│   └── script.js         ← JavaScript (API calls)
│
├── requirements.txt      ← Python dependencies
└── README.md            ← এই file
```

---

## 📥 Installation & Setup

### Step 1: Clone Repository
```bash
git clone https://github.com/rupamx10/spam-email-classifier.git
cd spam-email-classifier
```

### Step 2: Install Python Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Download Dataset
1. Kaggle থেকে download করো: https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset
2. `spam.csv` ফাইল `backend/` folder-এ রাখো

### Step 4: Train the Model
```bash
cd backend
python train.py
```

### Step 5: Run Flask Server
```bash
python app.py
```
Server চলবে: `http://localhost:5000`

### Step 6: Open Website
Browser-এ খোলো: `http://localhost:5000`

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| **Backend** | Python, Flask |
| **ML Model** | scikit-learn (Naive Bayes) |
| **Frontend** | HTML, CSS, JavaScript |
| **Data Processing** | pandas, numpy |

---

## 📊 কীভাবে কাজ করে?

### Model Training Process:
1. Dataset পড়ে (SMS messages)
2. Text preprocessing করে (lowercase, remove special chars)
3. TF-IDF vectorization করে
4. Naive Bayes classifier train করে
5. Model save করে `model.pkl` file-এ

### Prediction Process:
1. User email text input দেয়
2. Backend-এ API call যায়
3. Text preprocessing হয়
4. ML Model দিয়ে check করা হয়
5. Result: SPAM বা NOT SPAM (confidence % সহ)

---

## 🧪 Testing

### Spam Example:
```
Win FREE iPhone! Click here now!! Limited offer
```
Expected: 🔴 SPAM (95%+)

### Not Spam Example:
```
Hi, how are you doing? Let's meet tomorrow
```
Expected: 🟢 NOT SPAM (95%+)

---

## 📝 API Endpoint

### POST `/predict`

**Request:**
```json
{
  "email": "Your email text here"
}
```

**Response (Spam):**
```json
{
  "prediction": "SPAM",
  "confidence": 0.95,
  "message": "This is likely SPAM"
}
```

**Response (Not Spam):**
```json
{
  "prediction": "NOT SPAM",
  "confidence": 0.92,
  "message": "This appears to be legitimate"
}
```

---

## 🎓 Learning Points

✅ Machine Learning basics (Classification)
✅ Text preprocessing & NLP
✅ Flask API development
✅ Frontend-Backend integration
✅ Model training & persistence

---

## 📚 Resources

- [Kaggle SMS Spam Dataset](https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset)
- [scikit-learn Documentation](https://scikit-learn.org/)
- [Flask Tutorial](https://flask.palletsprojects.com/)

---

## 🤝 Contributing

Feel free to fork, modify, and improve! 🚀

---

**Made with ❤️ by Rupam**
