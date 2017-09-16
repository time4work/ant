import os
import json
import sys

print(' < -o- > hallo mate, lets start!')


if len(sys.argv) < 2:
    print("Useing: python jsonpars.py param")
    sys.exit(1)

# inp, outp, outp2 = sys.argv[1:4]
param = sys.argv[1]
json_dir = 'json'
res_dir = 'result'


def formatme(nfile):
	path = os.path.join(json_dir, nfile)
	print (" < -o- > File: " + path)
	file = open(path,"r")
	data = json.load(file)
	fulltext = ''
	result = ''
	for line in data:
		result += line[param] + '\n' 

	file.close();
	file = open(os.path.join(res_dir, nfile+'.txt'), 'w+')
	file.write(result)
	file.close();

class MySentences(object):
	def __init__(self, dirname):
		self.dirname = dirname

	def format(self):
		for fname in os.listdir(self.dirname):
			formatme(fname)

sentences = MySentences( json_dir )
sentences.format();

print(' < -o- > The work is done!')

