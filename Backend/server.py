from flask import Flask, request, jsonify
from flask_cors import CORS
from blog_generator import generate_blog_content
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/generate-blog', methods=['POST'])
def generate_blog():
    try:
        data = request.json
        blog_content = generate_blog_content(
            topic=data['topic'],
            category=data.get('category', 'Other'),
            tone=data.get('tone', 'Professional'),
            target_audience=data.get('target_audience', 'General Audience'),
            word_count=data.get('word_count', '1000-2000'),
            keywords=data.get('keywords', ''),
            include_stats=data.get('include_stats', True)
        )
        
        return jsonify({
            'blog': blog_content
        })
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Server is running'
    })

if __name__ == '__main__':
    # Check if NVIDIA API key is set
    if not os.getenv("NVIDIA_API_KEY"):
        print("Warning: NVIDIA_API_KEY not found in environment variables")
    app.run(debug=True) 