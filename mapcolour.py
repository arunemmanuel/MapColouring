import cgi

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

def mapcolour(inpulist):
	#return inpulist
	#inpulist=[(1,2),(0,2),(1,0)]
	colors=[0,1,2,3,4,5]
	colorset=set(colors)
	final={}
	nodes=[0]*len(inpulist)
	adj=[0]*len(inpulist)
	flag=[0]*len(inpulist)
	assigncol=[0]*len(inpulist)
	colord=[0]*len(inpulist)
	i=0 
	j=0
	m=0
	while(i<len(inpulist)):
		nodes[i]=i
		flag[i]=0
		adj[i]=inpulist[i]
		i+=1
	while(j<len(inpulist)):
		for a in adj[j]:
			if flag[a] == 1 :
				colord.append(assigncol[a])
			
		colordset=set(colord)
		availset=colorset-colordset
		availlist=list(availset)
		assigncol[j]=availlist[0]
		flag[j]=1
		final[j]=assigncol[j]
		colord=[0]*len(inpulist)
		j+=1
	return final.values()
class MainPage(webapp.RequestHandler):
    def get(self):
        self.response.out.write("""
          <html>
            <body>
              heii  heloo world
              </form>
            </body>
          </html>""")


class Mapcolour(webapp.RequestHandler):
    def post(self):
	self.input_data=self.request.get('item')
	#self.input=eval(self.input_data)
	self.data=mapcolour(eval(self.input_data))
        self.response.out.write(self.data)
application = webapp.WSGIApplication(
                                     [('/', MainPage),
                                      ('/mapcolour', Mapcolour)],
                                     debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()


