import os
try:
  from SimpleHTTPServer import SimpleHTTPRequestHandler as Handler
  from SocketServer import TCPServer as Server
except ImportError:
  from http.server import SimpleHTTPRequestHandler as Handler
  from http.server import HTTPServer as Server

import os

# Read port selected by the cloud for our application
PORT = int(os.getenv('PORT', 8000))

httpd = Server(("", PORT), Handler)

# Change current directory to avoid exposure of control files
os.chdir('static')
try:
  print("Start serving at port %i" % PORT)
  httpd.serve_forever()
except KeyboardInterrupt:
  pass
httpd.server_close()

