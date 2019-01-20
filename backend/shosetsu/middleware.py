class CORSMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_template_response(self, request, response):
        if hasattr(response, 'data'): 
            response._headers["Access-Control-Allow-Methods"] = ("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS, PATCH")
            response._headers["Name"] = ("Name", "Hello")
        return response
