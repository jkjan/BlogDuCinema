# from bs4 import BeautifulSoup
# import urllib.request
#
# url = "F:/BlogDuCinema/201611110진교준/ㄱ.html"
# soup = BeautifulSoup(urllib.request.urlopen(url).read(), 'html.parser')
# pkg_list = soup.findAll("div", "words")
#
# count = 1
# for i in pkg_list:
# 	title = i.findAll('a')
# 	print(count, "위: ", str(title)[str(title).find('title="')+7:str(title).find('">')])
# 	count += 1
#

alpha = "ㅎ"
sql = open("../dictionaryqueries.sql", "a", encoding="UTF8")
file = open(alpha+".txt", encoding="UTF8")
cnt = 0
for line in file.readlines():
	if cnt%3 == 0:
		sql.write("(\"" + alpha + "\", \"" + line[:-1] + "\", \"")
	elif (cnt-2)%3 == 0:
		sql.write(line[:-1] + "\"),")
		sql.write("\n")
	cnt += 1
sql.write("\n")
sql.close()