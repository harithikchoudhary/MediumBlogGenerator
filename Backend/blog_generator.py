import os
import json
from datetime import datetime
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def generate_formatting_instructions():
    """Generate markdown formatting instructions."""
    return """
Formatting Guidelines:
1. Use proper markdown headings (H1, H2, H3)
2. Format code blocks with triple backticks and language specification
3. Use bullet points and numbered lists for better readability
4. Include blockquotes for important points
5. Add proper spacing between sections
6. Use bold and italic text where appropriate
7. Include relevant images with proper markdown syntax
8. Use tables where data needs to be presented
9. Add horizontal rules to separate major sections"""

def generate_section_instructions():
    """Generate instructions for blog structure."""
    return """
Blog Structure:
1. Start with an engaging introduction that hooks the reader
2. Break down the main topic into clear sections
3. Include relevant examples and case studies
4. Add code snippets or technical details where appropriate
5. Include statistics and data points to support arguments
6. End with a strong conclusion and call to action
7. Add a section for further reading or resources"""

def generate_style_instructions(tone):
    """Generate style guidelines based on tone."""
    tone_instructions = {
        "Professional": "Use formal language, industry-standard terminology, and maintain a serious tone throughout.",
        "Casual": "Use conversational language, include personal anecdotes, and maintain a friendly, approachable tone.",
        "Technical": "Focus on technical accuracy, include detailed explanations, and use industry-specific terminology.",
        "Educational": "Break down complex concepts, include examples, and use clear, explanatory language.",
        "Entertaining": "Use engaging storytelling, include humor where appropriate, and maintain an engaging narrative flow."
    }
    
    return f"""
Writing Style:
{tone_instructions.get(tone, "Use clear, engaging language that matches the specified tone.")}"""

def generate_stats_instructions(include_stats):
    """Generate instructions for including statistics."""
    if not include_stats:
        return ""
    
    return """
Statistics and Data:
1. Include relevant statistics to support your points
2. Use data visualizations where appropriate
3. Cite sources for all statistics
4. Present data in an easy-to-understand format
5. Use tables or charts to display complex data"""

def generate_keyword_instructions(keywords):
    """Generate instructions for keyword usage."""
    if not keywords:
        return ""
    
    keyword_list = [k.strip() for k in keywords.split(",")]
    return f"""
Keyword Integration:
1. Naturally incorporate these keywords: {', '.join(keyword_list)}
2. Use keywords in headings and subheadings
3. Include keywords in the introduction and conclusion
4. Maintain keyword density without overuse
5. Ensure keyword placement feels natural and organic"""

def generate_blog_prompt(
    topic,
    category,
    tone,
    target_audience,
    word_count,
    keywords,
    include_stats,
    instructions=None,
):
    """Generate a prompt for the blog post."""
    prompt = f"""You are an expert technical writer and blogger. Write a detailed, engaging blog post about {topic} for {target_audience}.

Category: {category}
Tone: {tone}
Word Count: {word_count}
Keywords: {keywords}

{generate_formatting_instructions()}
{generate_section_instructions()}
{generate_style_instructions(tone)}
{generate_stats_instructions(include_stats)}
{generate_keyword_instructions(keywords)}

{generate_optional_instructions(instructions)}

Important Guidelines:
1. Write in a clear, engaging style that matches the specified tone
2. Include relevant examples and real-world applications
3. Break down complex concepts into digestible parts
4. Use proper markdown formatting for better readability
5. Include code examples where relevant
6. Add relevant statistics and data points when appropriate
7. End with a strong conclusion and call to action

Remember to:
- Use proper markdown formatting
- Include code blocks with syntax highlighting
- Add relevant images or diagrams (use markdown image syntax)
- Break up text with proper headings and subheadings
- Use bullet points and numbered lists where appropriate
- Include blockquotes for important points
- Add proper spacing between sections

Start writing the blog post now:"""

    return prompt

def generate_optional_instructions(instructions):
    """Generate instructions for any additional requirements."""
    if not instructions:
        return ""
    
    return f"""
Additional Requirements:
{instructions}

Please incorporate these specific requirements into the blog post while maintaining the overall structure and style."""

def save_metadata(metadata):
    """Save metadata to a JSON file."""
    try:
        # Create output directory if it doesn't exist
        os.makedirs("generated_blogs", exist_ok=True)
        
        # Generate filename based on topic and timestamp
        topic = metadata["topic"].lower().replace(" ", "_")
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"generated_blogs/blog_{topic}_{timestamp}_metadata.json"
        
        # Save metadata to file
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(metadata, f, indent=4)
            
        print(f"Metadata saved to {filename}")
        
    except Exception as e:
        print(f"Error saving metadata: {str(e)}")
        # Don't raise the exception as this is not critical for the main functionality

def generate_blog_content(
    topic,
    category,
    tone,
    target_audience,
    word_count,
    keywords,
    include_stats,
    instructions=None,
):
    """Generate blog content using the NVIDIA API."""
    try:
        # Get API key from environment variable
        api_key = os.getenv("NVIDIA_API_KEY")
        if not api_key:
            raise ValueError("NVIDIA_API_KEY not found in environment variables")

        # Initialize OpenAI client with NVIDIA base URL
        client = OpenAI(
            base_url="https://integrate.api.nvidia.com/v1",
            api_key=api_key
        )

        # Generate the prompt
        prompt = generate_blog_prompt(
            topic=topic,
            category=category,
            tone=tone,
            target_audience=target_audience,
            word_count=word_count,
            keywords=keywords,
            include_stats=include_stats,
            instructions=instructions,
        )

        # Generate content using the NVIDIA API
        completion = client.chat.completions.create(
            model="deepseek-ai/deepseek-r1-distill-llama-8b",
            messages=[
                {"role": "system", "content": "You are an expert technical writer and blogger who creates engaging, well-structured content. Do not include any <think> sections in your output."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            top_p=0.95,
            max_tokens=4000,
            stream=False
        )

        # Extract the generated content
        content = completion.choices[0].message.content

        # Clean up the generated content
        # Remove the prompt from the generated text if present
        if prompt in content:
            content = content[len(prompt):].strip()

        # Remove <think> section if present
        if "<think>" in content and "</think>" in content:
            start_idx = content.find("<think>")
            end_idx = content.find("</think>") + len("</think>")
            content = content[:start_idx] + content[end_idx:]
            content = content.strip()

        # Save metadata
        metadata = {
            "topic": topic,
            "category": category,
            "tone": tone,
            "target_audience": target_audience,
            "word_count": word_count,
            "keywords": keywords,
            "include_stats": include_stats,
            "instructions": instructions,
            "timestamp": datetime.now().isoformat(),
        }
        save_metadata(metadata)

        return content

    except Exception as e:
        print(f"Error generating blog content: {str(e)}")
        raise 