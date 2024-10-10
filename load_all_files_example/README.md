## **Creating an Electron App that can load files from the file system (Advanced)**

**This is an example of extending Moorhen Electron. Most users will not want to be doing this!**
This example in `load_all_files_example` shows how the server may browse the file system and then send files
back to Moorhen to be loaded. The important aspect of this is that files can be loaded that have not explicitly
been selected by the user in the Electron browser.

To try this example:
1. `cp load_all_files_example/App.tsx src`
2. `cp load_all_files_example/electron.js public`
3. Build, e.g. `npm run make-mac-m1`

