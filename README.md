# AI Blog Craft

A powerful AI-powered blog post generator that helps you create engaging and professional-quality content in minutes.

## Features

- 🤖 AI-powered content generation
- 🎨 Beautiful and modern UI
- 📝 Multiple tone options
- 📊 Word count customization
- 🏷️ Category selection
- 📈 Optional statistics inclusion
- 📋 Real-time preview
- 📋 Easy content copying

## Tech Stack

- Frontend: React.js with Tailwind CSS
- Backend: Python with Flask
- AI: OpenAI GPT
- Styling: Tailwind CSS, Heroicons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/medium-blog-generator.git
cd medium-blog-generator
```

2. Install Frontend Dependencies:

```bash
cd Frontend/medium-frontend
npm install
```

3. Install Backend Dependencies:

```bash
cd Backend
pip install -r requirements.txt
```

4. Set up environment variables:
   Create a `.env` file in the Backend directory with your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

### Running the Application

1. Start the Backend Server:

```bash
cd Backend
python app.py
```

2. Start the Frontend Development Server:

```bash
cd Frontend/medium-frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter your blog topic
2. Select the desired category
3. Choose the tone of your content
4. Specify your target audience
5. Set the word count
6. Add relevant keywords
7. Toggle statistics inclusion
8. Click "Generate Blog"
9. Copy the generated content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT API
- React.js and Tailwind CSS communities
- All contributors and users of this project
