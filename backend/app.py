from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import joblib
import os
from pathlib import Path

# ========================
# Flask App Setup
# ========================
app = Flask(__name__, 
            static_folder='../frontend',
            static_url_path='',
            template_folder='../frontend')

# Enable CORS (Cross-Origin Resource Sharing)
CORS(app)

# ========================
# Model Loading
# ========================
MODEL_PATH = 'model.pkl'

print("🚀 Loading ML Model...")

if not os.path.exists(MODEL_PATH):
    print(f"❌ Error: {MODEL_PATH} not found!")
    print("📝 Please run 'python train.py' first to train the model")
    exit(1)

try:
    model = joblib.load(MODEL_PATH)
    print(f"✅ Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    exit(1)

# ========================
# Routes
# ========================

@app.route('/')
def home():
    """Home page - serve index.html"""
    return render_template('index.html')

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    API endpoint for spam prediction
    
    Request JSON:
    {
        "email": "email text here"
    }
    
    Response JSON:
    {
        "prediction": "SPAM" or "NOT SPAM",
        "confidence": 0.95,
        "message": "Description"
    }
    """
    try:
        # Request থেকে email নাও
        data = request.get_json()
        
        if not data or 'email' not in data:
            return jsonify({
                'error': 'Missing email field',
                'message': 'Please provide email text'
            }), 400
        
        email_text = data['email'].strip()
        
        if not email_text:
            return jsonify({
                'error': 'Empty email',
                'message': 'Please enter some email text'
            }), 400
        
        # Model দিয়ে prediction করো
        prediction = model.predict([email_text])[0]
        confidence = max(model.predict_proba([email_text])[0]) * 100
        
        # Result prepare করো
        if prediction == 1:
            result = "SPAM"
            description = "⚠️ এই email likely spam। সাবধানে থাকুন!"
        else:
            result = "NOT SPAM"
            description = "✅ এই email legitimate বলে মনে হচ্ছে।"
        
        return jsonify({
            'success': True,
            'prediction': result,
            'confidence': round(confidence, 2),
            'message': description,
            'email_preview': email_text[:100] + ('...' if len(email_text) > 100 else '')
        })
    
    except Exception as e:
        print(f"❌ Error in prediction: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Spam Classifier API is running',
        'version': '1.0'
    })

# ========================
# Error Handlers
# ========================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not Found', 'message': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal Error', 'message': 'Server error occurred'}), 500

# ========================
# Main
# ========================

if __name__ == '__main__':
    print("\n" + "="*50)
    print("📧 Spam Email Classifier - Backend API")
    print("="*50)
    print("\n🌐 Server running at:")
    print("   http://localhost:5000")
    print("\n📝 Available endpoints:")
    print("   GET  /              - Main page")
    print("   POST /api/predict   - Spam prediction")
    print("   GET  /api/health    - Health check")
    print("\n🛑 Press CTRL+C to stop the server")
    print("="*50 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
