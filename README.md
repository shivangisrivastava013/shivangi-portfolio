# Shivangi Srivastava - Personal Portfolio Website

[![Portfolio CI](https://github.com/shivangisrivastava013/shivangi-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/shivangisrivastava013/shivangi-portfolio/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Professional portfolio website for **Shivangi Srivastava**, AI & Machine Learning Engineer and M.S. Candidate in Artificial Intelligence at New Jersey Institute of Technology (NJIT).

## Key Features

- **Data-Driven Architecture**: All project cards, metrics, code links, evaluation artifact URLs, and chatbot answers are driven by `data/projects.json`.
- **Interactive Portfolio Assistant**: Built-in chatbot providing answers about Shivangi's technical background, degree, published projects, and empirical benchmarks.
- **Responsive Bento Grid**: Modern visual grid showcasing engineering projects spanning Generative AI/RAG, Graph Machine Learning, ROS 2 Robotics, Vision Models, Continuous Motion Control, and NLP.
- **Privacy & Accessibility**: Sanitized public contacts, high contrast colors, and ARIA modal accessibility.

## Repository Structure

```text
.
├── index.html                  # Main portfolio single-page application
├── style.css                   # Modern CSS styling and layout
├── script.js                   # Interactive controller and dynamic renderer
├── data/
│   └── projects.json           # Single source of truth for portfolio project data
├── privacy-policy.html         # Standard privacy policy
├── terms-and-conditions.html   # Terms and conditions
└── .github/
    └── workflows/
        └── ci.yml              # W3C HTML/CSS & JSON validation workflow
```

## Local Development

To view locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/shivangisrivastava013/shivangi-portfolio.git
   cd shivangi-portfolio
   ```
2. Open `index.html` in any standard web browser or serve with a local web server:
   ```bash
   python -m http.server 8000
   ```
3. Visit `http://localhost:8000`.

## License

This repository is available under the [MIT License](LICENSE).
