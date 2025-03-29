# Medium Blog Generator

This application uses NVIDIA's DeepSeek model to generate well-structured Medium blog posts based on user requirements.

## Features

- Interactive command-line interface
- Customizable blog parameters (topic, tone, target audience, word count)
- Real-time blog generation with streaming output
- Markdown-formatted output
- Automatic file saving in the `generated_blogs` directory

## Setup

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

2. Create a `.env` file in the project root and add your NVIDIA API key:

```
NVIDIA_API_KEY=your_api_key_here
```

## Usage

1. Run the blog generator:

```bash
python blog_generator.py
```

2. Follow the interactive prompts to specify:

   - Your blog topic
   - Desired tone (professional, casual, technical, educational, or entertaining)
   - Target audience
   - Approximate word count

3. The generated blog post will be:
   - Displayed in real-time in the terminal
   - Saved as a markdown file in the `generated_blogs` directory

## Output

The generated blog posts are saved in the `generated_blogs` directory with filenames based on the topic. Each blog post includes:

- A compelling title
- Well-structured sections with headings
- Engaging introduction and conclusion
- Relevant examples and explanations
- Call-to-action
- Proper markdown formatting

## Requirements

- Python 3.7+
- NVIDIA API key
- Required Python packages (listed in requirements.txt)
