# InTouchBot
[![TheusHen](.github/assets/img.png)](https://theushen.me)

InTouchBot is a lightweight assistant built to integrate seamlessly with [my portfolio](https://theushen.me). It helps users find what they need quickly — from contact methods to featured projects — all in one place.

## 🔍 Features

- 🔗 Quick access to contact information (email, GitHub, LinkedIn, etc.)
- 📁 Retrieve and showcase personal projects
- 📌 Get key portfolio highlights
- 📬 Supports smart queries like:
    - "How can I contact TheusHen?"
    - "Show me his latest project"
    - "Where can I find the blog?"

## 🚀 Usage

Embed or run the bot on your site or app. It can be used via:
- Custom Web UI (already live on [intouchbot.theushen.me](https://intouchbot.theushen.me))
- API integration (coming soon)

Note: InTouchBot can be integrated into any project, but the other project needs to provide the profile. If the request is not from `theushen.me`, the profile must be provided; otherwise, the profile will be empty.

## Example JSON Profile

```json
{
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
}
```

Note: The Scrawler adapts automatically to the JSON provided by the user, so the profile does not need to be exactly like the example above.

## ⚙️ Tech Stack

- Node.js / Express (Backend)
- LLM (*Coming soon*)
- JSON (Data store)
- React (for embedding into your portfolio)
