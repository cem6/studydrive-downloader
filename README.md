# Studydrive Downloader

Browser extension for **Chrome** and **Firefox** that enables downloads from Studydrive (requires Developer Mode and manual installation)

## Installation
### 1. clone the repository
```
git clone https://github.com/cem6/studydrive-downloader.git 
```
### 2. load in Browser
#### Chrome:
1. open chrome://extensions/
2. turn Developer mode to 
3. press Load unpacked button
4. choose src folder of extension
#### Firefox:
1. open about:debugging#/runtime/this-firefox
2. press Load Temporary Add-on
3. choose src folder of extension

### -> studydrive-downloader will appear in extensions menu

## Usage
1. open any document page on Studydrive
2. press the extension icon, the file will be opened in a new tab

supported filetypes: pdf, docx, jpeg, jpg, png

## Updates
### 1. update the repository
```
cd studydrive-downloader/
git pull
```
### 2. update in Browser
#### Chrome:
1. open chrome://extensions/
2. press Update
#### Firefox:
1. open about:debugging#/runtime/this-firefox
2. press Reload

