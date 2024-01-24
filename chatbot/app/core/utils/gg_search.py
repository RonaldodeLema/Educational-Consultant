from googleapiclient.discovery import build
import requests
from bs4 import BeautifulSoup
import timeout_decorator
from concurrent.futures import ProcessPoolExecutor
import time
api_key = 'AIzaSyBcKJ3dZSMvcnKeoQtNXzAzAJclkHyMDXg'

Custom_Search_Engine_ID = "4792f759aeaa049b4"

def chunks(l, n):
    for i in range(0, len(l), n):
        yield l[i:i + n]

@timeout_decorator.timeout(3)

def ggsearch(para):
    try:
        i = para[0]
        service = para[1]
        query = para[2]
        time.sleep(1)
        limit = 3
        if i == 0:
            res = service.cse().list(q=query, cx=Custom_Search_Engine_ID, gl='vn',
                                     googlehost='vn', hl='vi').execute()
        else:
            res = service.cse().list(q=query, cx=Custom_Search_Engine_ID, num=limit, start=i*limit, gl='vn',
                                     googlehost='vn', hl='vi').execute()

        return res.get('items', [])[:limit]
    except Exception as e:
        print(f"Error in ggsearch: {e}")
        return []

    
@timeout_decorator.timeout(7)
def getContent(url):
    try:
        html = requests.get(url, timeout=4)
        html.raise_for_status()  # Raise an HTTPError for bad responses
        tree = BeautifulSoup(html.text, 'html.parser')
        
        for invisible_elem in tree.find_all(['script', 'style']):
            invisible_elem.extract()

        paragraphs = [p.get_text() for p in tree.find_all("p")]

        # ... (rest of your code)

        return '\n\n'.join(paragraphs)
    except LookupError as e:
        print(f'LookupError: {str(e)} - Unable to parse content from {url}')
        return ''
    except requests.exceptions.ConnectionError as e:
        print(f'ConnectionError: {str(e)} - Unable to connect to {url}')
        return ''
    except requests.exceptions.HTTPError as e:
        print(f'HTTPError: {str(e)} - Unable to retrieve content from {url}')
        return ''
    except TimeoutError:
        print(f'Timeout reading {url}')
        return ''
    except Exception as e:
        print(f'Error reading {url}: {str(e)}')
        return ''

class GoogleSearch:
    __instance = None

    def __init__(self):
        if GoogleSearch.__instance is not None:
            return GoogleSearch.__instance
        else:
            self.executor = ProcessPoolExecutor(max_workers=4)
            GoogleSearch.__instance = self

    def search(self, question):
        service = build("customsearch", "v1", developerKey=api_key)
        pages_content = list(self.executor.map(ggsearch, [(i, service, question) for i in range(0, 2)]))
        pages_content = [j for i in pages_content for j in i]
        document_urls = set([])
        for page in pages_content:
            if 'fileFormat' in page:
                continue
            document_urls.add(page[u'link'])
        document_urls = list(document_urls)

        gg_documents = list(self.executor.map(getContent, document_urls))
        gg_documents = [d for d in gg_documents if len(d) > 20]
        return document_urls, gg_documents