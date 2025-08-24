# Personal Portfolio & Blog - Aswin M Guptha

This repository contains the source code for my personal portfolio and blog, built using **Jekyll** and hosted with **GitHub Pages**.  
The site is live at 👉 [bitsbyamg.com](https://bitsbyamg.com)

---

## 📌 Features
- Personal portfolio sections (About, Projects, Blog)
- Blog powered by Jekyll with custom theme
- Consistent terminal-inspired UI
- Fully responsive (desktop + mobile)
- Easy to extend and customize

---

## 🛠️ Setup & Development

### 1. Clone the repo
```bash
git clone https://github.com/aswinmguptha/aswinmguptha.github.io.git
cd aswinmguptha.github.io
````

### 2. Install dependencies

Make sure you have [Ruby](https://www.ruby-lang.org/en/downloads/) and [Bundler](https://bundler.io/) installed.

```bash
bundle install
```

### 3. Run locally

```bash
bundle exec jekyll serve
```

This starts a local server at [http://localhost:4000](http://localhost:4000) where you can preview changes.

---

## ✍️ Adding a New Blog Post

1. Create a new file in the `_posts/` directory.
   The filename format must be:

   ```
   YYYY-MM-DD-title-of-the-post.md
   ```

   Example:

   ```
   2025-07-26-my-first-cve.md
   ```

2. Add front matter at the top of the file:

   ```yaml
   ---
   layout: post
   title: "My First CVE: Remote Code Execution in Backdrop CMS"
   date: 2025-07-26
   section: blog
   ---
   ```

3. Write your content in **Markdown**. You can use:

   * `**bold**` and `*italic*`
   * Code blocks (bash, python, etc.)
   * `<span class="highlight">highlighted text</span>` for emphasis

4. Save the file and run locally (`bundle exec jekyll serve`) to preview.

Once pushed to `main`, the blog post will automatically appear on [bitsbyamg.com/blog](https://bitsbyamg.com/blog).

---

## 📦 Deployment

The site is automatically built and deployed by **GitHub Pages** whenever changes are pushed to the `main` branch.
No manual steps needed 🎉

---

## 📜 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.  
You are free to use, modify, and distribute this project under the terms of the [GPL-3.0 license](https://choosealicense.com/licenses/gpl-3.0/).

---

## 🙌 Acknowledgements

* [Claude](https://claude.ai) for assistance with code development
* [ChatGPT](https://chatgpt.com) for assistance with content development
* [Jekyll](https://jekyllrb.com) for powering the blog
* [Github](https://github.com) for providing hosting