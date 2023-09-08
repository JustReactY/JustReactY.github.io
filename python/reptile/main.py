import requests
from bs4 import BeautifulSoup

def get_html(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        raise Exception('HTTP error {}'.format(response.status_code))

def get_title(html):
    soup = BeautifulSoup(html, 'html.parser')
    title = soup.find('title').getText()
    return title

def main():
    url = 'https://www.baidu.com'
    html = get_html(url)
    title = get_title(html)
    print(title)

if __name__ == '__main__':
    main()
