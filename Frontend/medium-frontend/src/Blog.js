import React, { useState } from "react";
import axios from "axios";
import {
  SparklesIcon,
  DocumentTextIcon,
  ClipboardIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";

const Blog = () => {
  const [formData, setFormData] = useState({
    topic: "",
    category: "Other",
    tone: "Professional",
    target_audience: "General Audience",
    word_count: "1000-2000",
    keywords: "",
    include_stats: true,
  });

  const [generatedBlog, setGeneratedBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const categories = [
    "Technology",
    "Health & Wellness",
    "Business & Finance",
    "Science",
    "Education",
    "Lifestyle",
    "Arts & Culture",
    "Sports",
    "Politics",
    "Other",
  ];

  const tones = [
    "Professional",
    "Casual",
    "Technical",
    "Educational",
    "Entertaining",
  ];
  const wordCounts = ["500-1000", "1000-2000", "2000-3000", "3000+"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedBlog("");

    try {
      const response = await axios.post(
        "http://localhost:5000/generate-blog",
        formData
      );
      setGeneratedBlog(response.data.blog);
    } catch (error) {
      console.error("Error generating blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const previewElement = document.querySelector(".prose");
    if (!previewElement) return;

    const range = document.createRange();
    range.selectNodeContents(previewElement);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
            <div className="w-96 h-96 bg-pink-100 rounded-full filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
          </div>
          <div className="relative">
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-6 animate-gradient tracking-tight">
              AI Blog Craft
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Transform your ideas into compelling blog posts with our
              AI-powered content generator. Create professional-quality articles
              in minutes.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blog Settings */}
          <div className="glass-effect rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-white/50">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                <SparklesIcon className="h-7 w-7 text-indigo-600 mr-2" />
                Blog Settings
              </h2>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white/30"
            >
              <div className="space-y-6">
                {/* Topic Input */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Topic
                  </label>
                  <input
                    type="text"
                    name="topic"
                    id="topic"
                    required
                    value={formData.topic}
                    onChange={handleChange}
                    placeholder="Enter your blog topic..."
                    className="w-full px-4 py-2.5 text-gray-700 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200"
                  />
                </div>

                {/* Category Select */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-gray-700 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tone Select */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label
                    htmlFor="tone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tone
                  </label>
                  <select
                    name="tone"
                    id="tone"
                    value={formData.tone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-gray-700 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200"
                  >
                    {tones.map((tone) => (
                      <option key={tone} value={tone}>
                        {tone}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Audience Input */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label
                    htmlFor="target_audience"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Target Audience
                  </label>
                  <input
                    type="text"
                    name="target_audience"
                    id="target_audience"
                    value={formData.target_audience}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-gray-700 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200"
                  />
                </div>

                {/* Word Count Select */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label
                    htmlFor="word_count"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Word Count
                  </label>
                  <select
                    name="word_count"
                    id="word_count"
                    value={formData.word_count}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-gray-700 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200"
                  >
                    {wordCounts.map((count) => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Keywords Input */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label
                    htmlFor="keywords"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    id="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-gray-700 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200"
                    placeholder="e.g., technology, innovation, future"
                  />
                </div>

                {/* Include Stats Checkbox */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="include_stats"
                      id="include_stats"
                      checked={formData.include_stats}
                      onChange={handleChange}
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-all duration-200"
                    />
                    <label
                      htmlFor="include_stats"
                      className="ml-3 block text-sm text-gray-700"
                    >
                      Include statistics and data points
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Generating...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        Generate Blog
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="flex-1 flex flex-col glass-effect rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/50">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                <DocumentTextIcon className="h-7 w-7 text-indigo-600 mr-2" />
                Preview
              </h2>
              <button
                onClick={handleCopy}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                title="Select and copy all content"
              >
                {copied ? (
                  <>
                    <CheckIcon className="h-5 w-5 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="h-5 w-5 mr-2" />
                    Copy Content
                  </>
                )}
              </button>
            </div>
            <div
              className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white/30"
              style={{ maxHeight: "calc(100vh - 300px)" }}
            >
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              ) : generatedBlog ? (
                <div className="prose prose-indigo max-w-none">
                  <div className="markdown-content">
                    <ReactMarkdown>{generatedBlog}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <DocumentTextIcon className="h-16 w-16 mb-4 text-indigo-200" />
                  <p className="text-lg font-medium">
                    Your blog preview will appear here
                  </p>
                  <p className="text-sm mt-2">
                    Fill in the details and click Generate Blog
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
