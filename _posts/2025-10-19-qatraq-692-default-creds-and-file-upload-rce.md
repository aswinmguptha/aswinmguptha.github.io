---
layout: post
title: "When Legacy Meets Risk: Unrestricted File Upload & Default Credentials in QaTraq 6.9.2"
section: blog
---

### TL;DR
While performing an internal security review of our infrastructure, I discovered an <span class="highlight">outdated instance of QaTraq 6.9.2</span>, a test management platform still used by one of our development teams. During analysis, I identified two critical vulnerabilities:

* Unrestricted file upload leading to <span class="highlight">remote code execution</span>
* Default credentials (`admin:admin`) granting <span class="highlight">full administrative access</span>

After responsibly validating the issues using a locally built environment, I reached out to the vendor but received no response. The findings were later submitted to MITRE for CVE assignment.

---

## 📖 Background

As part of a periodic internal security assessment, we review <span class="highlight">non-production systems and development tools</span> deployed across our infrastructure.
During one such review, I came across an instance of QaTraq, a test case management tool that had been <span class="highlight">set up years ago</span> for QA automation experiments.

A quick look revealed that the service was still accessible, though not externally exposed. This triggered a deeper review — primarily <span class="highlight">to ensure the system wasn’t a forgotten risk vector</span>.

---

## 🔍 Discovery Process

The version running was QaTraq 6.9.2, <span class="highlight">released roughly a decade ago</span>.
Given its age and lack of recent updates, my first step was to <span class="highlight">locate the original source code to understand the underlying implementation</span>.

I managed to find the open-source codebase rebuilt the environment in a Docker container, replicating the original deployment. This allowed me to test vulnerabilities safely and validate any findings in isolation.

---

## 🚨 The Vulnerabilities

### 1. Unrestricted File Upload → Remote Code Execution

Inside the **Test Script module**, the “Add Attachment” feature allows users to upload files without any restriction on file type or content.

By uploading a server-interpreted file (e.g., a PHP script), the file is stored in the attachments directory and can later be accessed through the “View Attachment” option.
Because the <span class="highlight">server directly executes these files</span>, an attacker with valid credentials could <span class="highlight">execute arbitrary commands</span> on the host.

**Attack Vector (PoC)**


1. Log in → Test Script → Add Attachment
2. Upload shell.php containing: `<?php system($_GET['cmd']); ?>`
3. View Attachment → shell.php?cmd=id

---

### 2. Default Credentials — `admin:admin`

QaTraq 6.9.2 ships with a <span class="highlight">default administrative account that remains active after installation</span>.
No enforcement mechanism exists to change the credentials during setup, meaning <span class="highlight">anyone with access to the login page can authenticate directly as the administrator</span>.

**Attack Vector (PoC)**

1. Visit the web login page
2. Enter `admin` / `admin` → Gain admin dashboard access

---

## 🧠 Why This Matters

Legacy applications often get <span class="highlight">repurposed or left running in internal environments</span>, especially when integrated with automation frameworks. Even when they are not directly exposed to the internet, vulnerabilities like these can:

* Become lateral movement entry points in hybrid environments.
* Be chained with other misconfigurations (e.g., default creds → file upload → RCE).
* Go unnoticed for years due to lack of vendor support or patch availability.

Interestingly, a quick check on SourceForge shows that <span class="highlight">QaTraq 6.9.2 continues to receive a significant number of active downloads</span> even this week, highlighting that <span class="highlight">legacy tools are still in use despite being obsolete and unsupported</span>. This makes understanding and mitigating their risks all the more important.

To mitigate these risks, I advised our team to <span class="highlight">avoid using outdated applications</span> whenever possible and <span class="highlight">switch to well-maintained, actively supported tools</span> to <span class="highlight">reduce inherent security risks</span>. Taking such steps not only lowers the likelihood of security issues but also ensures smoother internal operations.

---

## 🧱 Reproduction & Responsible Disclosure

To confirm the findings responsibly, I found the publicly available source code but getting it to run was far from straightforward — <span class="highlight">multiple dependency mismatches, outdated libraries, and missing configuration files</span> made the setup quite challenging.

After several iterations, I eventually built it. The process that itself highlighted <span class="highlight">how much legacy software persists unmaintained</span>.

After validating both issues:

1. I reported the findings to the vendor with detailed PoC and reproduction steps.
2. Waited for over two months — no response or acknowledgment.
3. As part of coordinated disclosure, I submitted both issues to **MITRE** for CVE assignment.

---

## 🧭 Key Takeaways

* Always <span class="highlight">change or disable default credentials</span> before deploying any service.
* Maintain <span class="highlight">asset visibility</span>; legacy tools often carry significant risk.
* Even <span class="highlight">internal tools deserve AppSec attention</span> — exposure scope doesn’t always correlate with impact.

---

## 🗓️ Disclosure Timeline

| Date             | Action                                          |
| -----------------| ----------------------------------------------- |
| June 30, 2025    | Vulnerability identified during internal review |
| July 18, 2025    | Verified in local environment                   |
| July 22, 2025    | Vendor contacted                                |
| October 13, 2025 | CVE request submitted to MITRE                  |
| November 13, 2025| CVE reserved by MITRE                           |
| November 17, 2025| CVE Published

The vulnerabilities have been published under the following CVE IDs.
- [CVE-2025-63747](https://www.cve.org/CVERecord?id=CVE-2025-63747)
- [CVE-2025-63748](https://www.cve.org/CVERecord?id=CVE-2025-63748)
  
---

## 🧩 References

1. QaTraq Project — [Archived Source Repository](https://sourceforge.net/projects/qatraq/)
2. CVE IDs — CVE-2025-63747, CVE-2025-63748

---

🧵 *Thanks for reading! I enjoy exploring how small oversights evolve into real-world risks — and how better design and security practices can prevent them. More AppSec deep dives coming soon.*

---