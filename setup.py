# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

version = '0.0.2'

setup(
	name='title_links',
	version=version,
	description='Links using DocType title instead of name as Description',
	author='Himanshu',
	author_email='himanshuwarekar@yahoo.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True
)
