#!/usr/bin/env python3
"""Static site generator for latice.design — rebuilt from Adobe Portfolio."""
import os, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
IMG_DIR = os.path.join(ROOT, "assets", "img")

# Resolve uuid8 -> actual filename present in assets/img
def img_exists(uuid8):
    return bool(glob.glob(os.path.join(IMG_DIR, uuid8 + ".*")))

def img(uuid8):
    hits = glob.glob(os.path.join(IMG_DIR, uuid8 + ".*"))
    if hits:
        return "/assets/img/" + os.path.basename(hits[0])
    return "/assets/img/" + uuid8 + ".png"  # fallback

def cover(p):
    """Project cover; falls back to first body image if cover file missing."""
    if img_exists(p["cover"]):
        return img(p["cover"])
    for item in p["body"]:
        if not isinstance(item, tuple) and img_exists(item):
            return img(item)
    return img(p["cover"])

PROJECTS = [
    dict(slug="hp", title="HP", year="2020", tags="UI/UX, Product Design, Interaction Design",
         cover="45253ec8", intro=None,
         body=["6ce0ddda","967aa44f","ecde324f","c80a1527","e1f75a86","6e6e7066","7aee5308","1191b4d0","81d398b8","1ed13aea"]),
    dict(slug="interprint", title="Interprint", year="2018", tags="UI/UX, Branding, Web Design",
         cover="df11ae35",
         intro="Interprint is one of the leading Printing & Packaging service providers for Multinationals who wish to achieve impeccable quality at a competitive price point. They excel in providing brilliant packaging solutions for an efficient logistical & end user experience. The printing house is well equipped with the latest industrial-scale printing & finishing technologies.\n\nWe were commissioned to build a brand extension for them and build a new website to drive in more leads and improve their web presence.",
         body=["d091654d","642ee6ec","2e9d7c8c","9bbbc666","7e3a6fc2","ee3bca04","53e5f4c0","8a1fd999","79798492","55fa1371","7659bf4e",
               ("vimeo","300165188"),("vimeo","300167136"),"5c71818f"]),
    dict(slug="zeo-vr", title="Zeo VR", year="2018", tags="UI/UX, Web Design, Interaction Design",
         cover="5910b1aa",
         intro="ZeoVR is a platform that lets you build immersive multiplayer WebVR experiences. It's built entirely out of JavaScript and plays well with NPM, with an open-source codebase for building plugins. The platform was built for developers and users alike — for users to have fun in VR with their friends without having to download an app, and for web developers to build plugins to make some extra cash on the side.\n\nThe ideal part about Zeo was the ability to run worlds on their own blockchain to build a better sharing economy.",
         body=["f9f419f3","5003f757","4e236dd4","acb6f304","9907ca56","189ff867","a3efeb4e","6420b55a","aad89ab1","04540955","68a5655a","3d7d0789","7095f4b0","3f146d03","70bf080c","16e986d1",
               ("vimeo","244638524"),("vimeo","279333630")]),
    dict(slug="interprint-erp", title="Interprint ERP", year="2018", tags="UI/UX, Information Architecture, Art Direction",
         cover="2af4d2a6",
         intro="Interprint is a leading printing and packaging unit. They used a conventional system of noting down and tallying records using Excel sheets, which were then translated to graphs — readable by anyone who wanted them. The collaborative experience was lacking, and so was accountability. All the available systems on the market provided a valid ERP system, but lacked the basic concept of collaboration and information sharing. The system has been implemented for over a year; we A/B tested and arrived at these results.",
         body=["6b79eba5","d6ebbb3c","fcca9131","836bab91","35da7e2b","b7a3987b","994994a1","41b2ff3e","9b0d5131","c20e9687","a1d344d3","0de92330","72f1f4af","a157bb49","21051ffb","7b0f8bc8"]),
    dict(slug="new-era-machines", title="New Era Machines", year="2018", tags="Art Direction, UI/UX, Web Design",
         cover="c7db1834",
         intro="NEM is a leading manufacturer of automated production lines for the biscuit industry. The challenge for the project was to revamp the web design and to build a cohesive user experience, increase the engagement and increase conversion rates for their target demographics.",
         body=["05c79a90","f820edf5","bcec2190","d32efdb1","8d800d30","6980fd44","99806090","533ec720","c3c522f1","ecf91599","10ec93de","b5dd329a","47deae12","684697bb","b78134e7"]),
    dict(slug="updesk", title="Updesk", year="2018", tags="Industrial Design, Interior Design, Motion Graphics",
         cover="588b33c3",
         intro="UpDesk is a leading brand supplying top performers with the highest quality adjustable standing desks and ergonomic accessories available.\n\nWe were commissioned to 3D model and render all their desks to fit within their new brand guidelines.",
         body=["499460da","17b3cf81","be93c3b9","d9958f73","42a00aca","5b6b3f2c","ec2a5078",("vimeo","253267139"),"0858be97","3997961e"]),
]

SOCIALS = [
    ("Behance","https://www.behance.net/ShivramMahendran","Be"),
    ("LinkedIn","https://www.linkedin.com/company/latice","in"),
    ("Facebook","https://www.facebook.com/Latice.Design/","f"),
    ("Instagram","https://instagram.com/latice.design/","ig"),
]

DESC = "A Visual & Product Design agency based out of Mumbai, India."

def nav(active=""):
    proj_links = "".join(f'<a href="/{p["slug"]}/">{p["title"]}</a>' for p in PROJECTS)
    socials = "".join(f'<a href="{u}" target="_blank" rel="noopener" aria-label="{n}">{abbr}</a>' for n,u,abbr in SOCIALS)
    def cls(k): return ' class="active"' if k==active else ""
    return f'''<header class="site-header">
  <a class="logo" href="/"><img src="{img('bfac9f6a')}" alt="Latice"></a>
  <input type="checkbox" id="nav-toggle" class="nav-toggle">
  <label for="nav-toggle" class="nav-toggle-label" aria-label="Menu"><span></span></label>
  <nav>
    <div class="nav-item has-sub">
      <a href="/"{cls('projects')}>Projects</a>
      <div class="subnav">{proj_links}</div>
    </div>
    <a href="/services/"{cls('services')}>Services</a>
    <a href="/about/"{cls('about')}>About</a>
    <a href="/contact/"{cls('contact')}>Contact</a>
    <div class="socials">{socials}</div>
  </nav>
</header>'''

def footer():
    return '''<footer class="site-footer">
  <a class="top" href="#top">&uarr; Back to Top</a>
  <p>&copy; 2026 Latice &nbsp;&middot;&nbsp; <a href="https://medium.com/@shivram_32916/privacy-policy-of-latice-633f606fc75b" target="_blank" rel="noopener">Privacy Policy</a></p>
</footer>'''

def page(title, desc, body, active="", canonical=""):
    return f'''<!DOCTYPE html>
<html lang="en" id="top">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="https://latice.design{img('45253ec8')}">
<link rel="canonical" href="https://latice.design{canonical}">
<link rel="icon" href="{img('bfac9f6a')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
</head>
<body>
{nav(active)}
<main>
{body}
</main>
{footer()}
</body>
</html>'''

def other_projects(current_slug):
    cards = "".join(
        f'''<a class="mini-card" href="/{p['slug']}/">
  <img src="{cover(p)}" alt="{p['title']}" loading="lazy">
  <span class="mini-title">{p['title']}</span><span class="mini-tags">{p['tags']}</span>
</a>''' for p in PROJECTS if p["slug"] != current_slug)
    return f'<section class="other-projects"><h3>other projects</h3><div class="mini-grid">{cards}</div></section>'

def write(path, html):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w") as f: f.write(html)
    print("wrote", path)

# ---------- Home ----------
cards = "".join(
    f'''<a class="card" href="/{p['slug']}/">
  <div class="card-img"><img src="{cover(p)}" alt="{p['title']}" loading="lazy"></div>
  <div class="card-meta"><span class="card-title">{p['title']}</span><span class="card-year">{p['year']}</span></div>
  <span class="card-tags">{p['tags']}</span>
</a>''' for p in PROJECTS)

home_body = f'''<section class="hero">
  <h1>We help businesses build great websites &amp; digital products that leave their users in&nbsp;Awe.</h1>
  <a class="cta" href="/contact/">Drop us a line</a>
</section>
<section class="grid">{cards}</section>'''
write("index.html", page("Latice", DESC, home_body, "projects", "/"))
write("projects/index.html", '<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/"><link rel="canonical" href="https://latice.design/"><title>Latice</title></head><body><a href="/">Latice projects</a></body></html>')

# ---------- Project pages ----------
for p in PROJECTS:
    parts = [f'<h1 class="project-title">{p["title"]}</h1>']
    if p["intro"]:
        paras = "".join(f"<p>{x}</p>" for x in p["intro"].split("\n\n"))
        parts.append(f'<div class="intro">{paras}</div>')
    for item in p["body"]:
        if isinstance(item, tuple) and item[0] == "vimeo":
            parts.append(f'<div class="video"><iframe src="https://player.vimeo.com/video/{item[1]}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy" title="{p["title"]} video"></iframe></div>')
        else:
            parts.append(f'<img class="proj-img" src="{img(item)}" alt="{p["title"]}" loading="lazy">')
    parts.append(other_projects(p["slug"]))
    write(f'{p["slug"]}/index.html', page(f'Latice - {p["title"]}', DESC, f'<article class="project">{"".join(parts)}</article>', "projects", f'/{p["slug"]}/'))

# ---------- Services ----------
services_body = '''<h1>Services</h1>
<div class="services">
  <div class="svc"><h2>Strategy</h2><ul><li>Brand Strategy</li><li>Product Strategy</li></ul></div>
  <div class="svc"><h2>Visual</h2><ul><li>Identity Design</li><li>Design Systems</li><li>Web Design &amp; Development</li></ul></div>
  <div class="svc"><h2>Product Design</h2><ul><li>User Experience</li><li>User Interface</li><li>App Development</li></ul></div>
  <div class="svc"><h2>AR/VR Visualization</h2><ul><li>3D Modeling &amp; Rendering</li></ul></div>
</div>'''
write("services/index.html", page("Latice - Services", DESC, f'<article class="text-page">{services_body}</article>', "services", "/services/"))

# ---------- About ----------
about_body = f'''<h1>About</h1>
<p class="lede">We align ourselves to be Creative, Strategic &amp; Determined.</p>
<p>Latice is a Product Design agency that specializes in Product Design for Tech Businesses.</p>
<p>You understand your business better than us, and we get that! Our process begins with understanding your business and industry in-depth. This helps us identify goals and set measurable success parameters. Once we know what we have to aim for we study your users &amp; competitors, now we know what we're up against. We then formulate a strategy that can bridge our ground-level research with the value and emotion that you want your brand/product to convey.</p>
<p>One of our key focus points along the entire discovery phase is the end customer; our strategy &amp; product design helps define the ideal customer. Our whole process has been assimilated over the years to facilitate product creation that entices &amp; attracts customers.</p>
<p>We also sell some products online — check out our <a href="https://rdbl.co/2KqN59o" target="_blank" rel="noopener">merch store</a> &amp; our <a href="https://www.turbosquid.com/Search/Artists/latice?referral=latice" target="_blank" rel="noopener">3D model catalog</a>.</p>
<p>Want to learn more about us? <a href="/contact/">Drop in a message</a> and ask for our Capabilities Deck &amp; take a look at our Case Studies.</p>
<img class="proj-img" src="{img('fe1320a9')}" alt="Latice" loading="lazy">'''
write("about/index.html", page("Latice - About", DESC, f'<article class="text-page">{about_body}</article>', "about", "/about/"))

# ---------- Contact ----------
contact_body = '''<h1>Contact</h1>
<p class="lede">Come for work, Stay for Tea!</p>
<div class="contact-cols">
  <div>
    <h2>Latice</h2>
    <p>D-28/2, TTC Industrial Area,<br>MIDC Turbhe,<br>Navi Mumbai - 400 705</p>
    <p><a href="tel:+912261560304">+91 22 6156 0304/05</a><br>
    <a href="mailto:info@latice.design">info@latice.design</a></p>
    <p><a href="https://goo.gl/maps/VCRFXaztyyC2" target="_blank" rel="noopener">View on Map &rarr;</a></p>
    <a class="cta" href="mailto:info@latice.design?subject=Hello%20Latice">Drop us a line</a>
  </div>
  <div>
    <h2>Careers</h2>
    <p>Looking for an internship or a job? We're growing rapidly and are always on the lookout for the crazies.</p>
    <p>Send us an email with your CV &amp; Portfolio at <a href="mailto:info@latice.design">info@latice.design</a>.</p>
    <p>We get tens of portfolios every day and are unable to reply to all of them. If you're a good fit we'll hit you up! Check out some of our random portfolio tips <a href="https://medium.com/@shivram_32916/how-to-portfolio-93c1e2bba81c" target="_blank" rel="noopener">here</a>.</p>
    <h2>Privacy Policy</h2>
    <p>Read our privacy policy <a href="https://medium.com/@shivram_32916/privacy-policy-of-latice-633f606fc75b" target="_blank" rel="noopener">here</a>.</p>
  </div>
</div>'''
write("contact/index.html", page("Latice - Contact", DESC, f'<article class="text-page">{contact_body}</article>', "contact", "/contact/"))

# ---------- 404 ----------
write("404.html", page("Latice - Not Found", DESC, '<article class="text-page"><h1>Page not found</h1><p><a href="/">Back to projects &rarr;</a></p></article>'))

print("done")
