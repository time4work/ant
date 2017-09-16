import re 
import os

print(' < -o- > hallo mate, lets start!')

word_dir = 'text'
res_dir = 'result'

def formatme(nfile):
	path = os.path.join(word_dir, nfile)
	print (" < -o- > File: " + path)
	file = open(path,"r")
	fulltext = ''
	result = ''

	for line in file:
		fulltext += line

	for sent in re.split(r' *[\n{2}\.\?!;][\.\?!]*', fulltext):
		print(' <- + ->')
		print(sent)
		tmp = ''
		for pice in re.split('\n', sent):
			if pice == r'\n+' or pice == '':
				continue
			tmp += pice
		print(' < : > ' + tmp)
		r = re.compile(r'[,:-]')
		if len(tmp) > 3: 
			result += r.sub('',tmp.strip()) + '\n' 
		else:
			continue

	file.close();
	file = open(os.path.join(res_dir, nfile), 'w+')
	file.write(result)
	file.close();

class MySentences(object):
	def __init__(self, dirname):
		self.dirname = dirname

	def format(self):
		for fname in os.listdir(self.dirname):
			formatme(fname)

sentences = MySentences( word_dir )
sentences.format();

print(' < -o- > The work is done!')
