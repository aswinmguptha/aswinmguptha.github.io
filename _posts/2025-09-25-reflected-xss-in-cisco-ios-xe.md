---
layout: post
title: "From Hospital Pentest to Cisco Advisory: A Reflected XSS in Cisco IOS XE"
section: blog
---

### TL;DR
During a hospital security assessment, we discovered a <span class="highlight">reflected XSS vulnerability</span> in Cisco IOS XE Web UI. The issue identified as <span class="highlight">CVE-2025-20240</span> could allow attackers to <span class="highlight">steal session tokens</span> via crafted links.

We reported it to Cisco PSIRT, and after multiple meetings and environment recreations, Cisco confirmed the bug and published an official <span class="highlight">security advisory</span>.

Affected devices should be <span class="highlight">patched immediately</span>. Details are available in the [Cisco advisory](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-webui-xss-VWyDgjOU).

--- 

## 📖 The Story

Security assessments often take us into environments where technology and human lives are closely connected. During one such <span class="highlight">hospital security assessment</span>, we stumbled upon a vulnerability with far-reaching implications.

While testing the web management interface of Cisco IOS XE devices, we discovered a <span class="highlight">reflected cross-site scripting (XSS) vulnerability</span>. This meant that an attacker could trick someone into clicking a malicious link, and if successful, the attacker could <span class="highlight">steal session cookies</span> and hijack accounts of <span class="highlight">any website</span> the victim has logged into. In a hospital setting, this could even mean access to network devices <span class="highlight">critical for patient care</span>.

The vulnerability was captured in our <span class="highlight">proof-of-concept artifacts</span>, including screenshots and request/response logs, but once the assessment concluded, <span class="highlight">our access to the hospital environment ended</span>. When Cisco PSIRT later requested additional details and live reproduction steps, we no longer had the original setup to demonstrate the issue.

This could have stalled the investigation — but Cisco’s collaboration was invaluable. They held multiple meetings with us, patiently walking through every detail we could recall about the environment and its configuration. After several iterations, Cisco successfully <span class="highlight">recreated the exact environment</span> and were able to fully <span class="highlight">confirm and validate the vulnerability</span>.

---

## 🔍 The Problem: What Went Wrong

The web interface of Cisco IOS XE devices <span class="highlight">failed to sanitize user-supplied input</span>. So when a user clicked a specially crafted link, <span class="highlight">malicious script could be reflected back</span>. If a victim’s browser then executes that reflected payload, it opens room for cookie/token theft or session hijacking.

From a technical standpoint, this is a **reflected cross-site scripting (XSS)** vulnerability in Cisco IOS XE’s Web UI. The vulnerability is identified as **CVE-2025-20240**, and has a CVSS score of 6.1. Under certain configurations, attackers could trick victims into visiting a crafted URL and <span class="highlight">exfiltrate tokens or cookies of any website</span>, the victim has logged into, to a domain under their control, making this a <span class="highlight">pseudo universal xss</span>.

If exploited, the vulnerability could allow an attacker to run arbitrary scripts in the context of the Web UI, potentially stealing cookies, tokens, or session identifiers.

---

## 🗓️ The Disclosure Journey

Here’s how the journey unfolded:

| Date                   | Milestone                                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **June 28, 2024**      | Initial vulnerability report submitted to Cisco PSIRT with reproduction steps, impact, and potential fixes.                                    |
| **July 11, 2024**      | Cisco acknowledged and opened an incident ticket.                                                                                  |
| **July 2024**          | Back-and-forth clarifications, screenshot requests, and later a request for video PoC.                                                         |
| **July–August 2024**   | Multiple discussions and Webex calls to reconstruct the environment. Since we no longer had access, Cisco engineers recreated it step by step. |
| **August 28, 2024**    | Cisco successfully reproduced the issue in their environment.                                                                                          |
| **September 24, 2025** | Cisco published the official advisory and defect notice.                                                                                       |

Cisco PSIRT’s professionalism and persistence were commendable—they didn’t drop the case when evidence was limited but instead worked closely with us to validate the issue properly.

---

## 🛡️ The Solution & Mitigations

Cisco has released software updates that fully address this vulnerability. Because there are **no permanent workarounds**, upgrading to the fixed versions is strongly recommended.

For detailed instructions, affected versions, and configuration checks, please refer directly to <span class="highlight">Cisco’s official advisory</span>:

🔗 [Cisco Security Advisory – cisco-sa-webui-xss-VWyDgjOU](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-webui-xss-VWyDgjOU)

---

## 🙌 Acknowledgments

This research was carried out by me, <span class="highlight">Aswin M Guptha</span>, together with my colleague <span class="highlight">[Abhinand N](https://www.linkedin.com/in/abhinand-n/)</span> from Traboda CyberLabs.

A special thanks to the <span class="highlight">Cisco PSIRT team</span> for their patience and collaboration throughout the process. Their willingness to hold multiple discussions, rebuild the test environment, and validate the issue made this disclosure possible.

Official advisory: [Cisco Security Advisory – cisco-sa-webui-xss-VWyDgjOU](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-webui-xss-VWyDgjOU)

---

🧵 *Thanks for reading! This research underscored the importance of preserving artifacts, especially when access to the original environment is lost, and reminded us that responsible disclosure is a collaborative effort between researchers and vendors. Stay curious, stay safe, and keep exploring the world of security research!*