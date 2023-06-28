# MoorhenElectron
An Electron version of the Moorhen molecular graphics program.

Moorhen is a web browser molecular graphics program based on the Coot desktop program (https://github.com/stuartjamesmcnicholas/Moorhen/). This project is
an Electron App version of Moorhen.

## **Instructions**

1. `git clone https://github.com/stuartjamesmcnicholas/MoorhenElectron.git`
2. `cd MoorhenElectron`
3. `npm install`
4. `cp -r node_modules/moorhen/baby-gru ./public/`
5.  Build the app 
  * `npm run make-mac-m1` to make an M1 macOS app and redistributable zip
  * `npm run make-mac` to make an Intel macOS app and redistributable zip
  * `npm run make-linux` to make an Linux macOS app and redistributable zip
  * `npm run package-win32` to make a Windows app.
