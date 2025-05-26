import React from 'react';

const DocsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">InTouchBot Documentation</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🔍 Features</h2>
        <ul className="list-disc list-inside">
          <li>🔗 Quick access to contact information (email, GitHub, LinkedIn, etc.)</li>
          <li>📁 Retrieve and showcase personal projects</li>
          <li>📌 Get key portfolio highlights</li>
          <li>📬 Supports smart queries like:
            <ul className="list-disc list-inside ml-4">
              <li>"How can I contact TheusHen?"</li>
              <li>"Show me his latest project"</li>
              <li>"Where can I find the blog?"</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🚀 Usage</h2>
        <p>Embed or run the bot on your site or app. It can be used via:</p>
        <ul className="list-disc list-inside">
          <li>Custom Web UI (already live on <a href="https://intouchbot.theushen.me" className="text-blue-500">intouchbot.theushen.me</a>)</li>
          <li>API integration (coming soon)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">⚙️ Tech Stack</h2>
        <ul className="list-disc list-inside">
          <li>Node.js / Express (Backend)</li>
          <li>JSON (Data store)</li>
          <li>React (for embedding into your portfolio)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">📬 API Examples</h2>
        <h3 className="text-xl font-semibold mb-2">Example JSON Profile</h3>
        <pre className="bg-gray-100 p-4 rounded">
          <code>
            {`{
  "profile": {
    "name": "TheusHen",
    "age": 25,
    "bio": ["Developer", "Tech Enthusiast"],
    "avatar": "https://example.com/avatar.jpg",
    "photo": "https://example.com/photo.jpg",
    "flag": "https://example.com/flag.jpg",
    "socials": [
      { "label": "GitHub", "url": "https://github.com/TheusHen" },
      { "label": "LinkedIn", "url": "https://linkedin.com/in/TheusHen" }
    ],
    "hackclub": {
      "image": "https://example.com/hackclub.jpg",
      "name": "Hack Club",
      "description": "A community of high school hackers"
    },
    "college_app_countdown": {
      "until": "2023-12-31"
    }
  },
  "featuredProjects": [
    {
      "name": "Project One",
      "description": "Description of project one",
      "url": "https://example.com/project-one",
      "image": "https://example.com/project-one.jpg",
      "type": ["Web", "Mobile"]
    }
  ],
  "githubProjects": [
    {
      "id": 123456,
      "name": "GitHub Project",
      "description": "Description of GitHub project",
      "html_url": "https://github.com/TheusHen/github-project",
      "stargazers_count": 100,
      "language": "JavaScript",
      "owner": {
        "avatar_url": "https://example.com/github-avatar.jpg"
      },
      "fork": false,
      "homepage": "https://example.com",
      "topics": ["topic1", "topic2"]
    }
  ],
  "contact": [
    {
      "icon": "email",
      "label": "Email",
      "subtitle": "theushen@example.com",
      "url": "mailto:theushen@example.com"
    }
  ],
  "images": {
    "profile": "https://example.com/profile.jpg"
  },
  "blog": {
    "url": "https://example.com/blog"
  }
}`}
          </code>
        </pre>
      </section>
    </div>
  );
};

export default DocsPage;
