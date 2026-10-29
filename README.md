# Repo Introduction

This is a repo for testing sslforfree certificate application. 

The application is deployed in chinabluemix.net, however, that platform is too simple to deploy https application. 

Only http domain is supported. 

After running it locally, the certificate chain looks like:

> DST Root CA X3
>> Let's Encrypt Authority X3
>>> foxfox.mychinabluemix.net

# Python Starter Overview

The Python Starter demonstrates a simple, reusable Python web application.

## Run the app locally

1. [Install Python][]
2. Download and extract the starter code from the Bluemix UI
3. cd into the app directory
4. Run `python server.py`
5. Access the running app in a browser at http://localhost:8000

[Install Python]: https://www.python.org/downloads/

## Interactive rabbit

Run `PORT=8000 python3 server-CORS.py` from the repository root. The home page
shows an original low-poly rabbit; `fox.html` preserves the original fox demo.
Move the pointer to make the animal turn toward it. Mobile devices use the
existing gentle drift animation.

`static/rabbit.js` builds an indexed 3D triangle mesh from faceted ellipsoids.
`static/bundle.js` accepts an optional model and reuses the original MetaMask
renderer: perspective projection, back-face culling, depth sorting, SVG polygons,
and smoothed pointer tracking. No new runtime dependencies or build step are
required. To adjust the rabbit, edit its centers, radii, and colors in `rabbit.js`.

Browser validation: Chromium renders the rabbit and original fox without JavaScript
exceptions; pointer movement changes projected polygons; the rabbit page fits a
390px mobile viewport. Desktop and mobile screenshots were captured for review.
