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
  * `npm run make-mac-m1` to make an M1 macOS app and redistributable zip (tested on M1 Mac)
  * `npm run make-mac` to make an Intel macOS app and redistributable zip (tested on M1 and Intel Macs)
  * `npm run make-linux` to make an Linux macOS app and redistributable zip (tested on Linux)
  * `npm run package-win32` to make a Windows app (tested on Linux)

`make-win32` should also work, but is not recommended since it may be desirable to replace the minimal copy of the CCP4/refmac monomer library `public/baby-gru/monomers` with a complete copy. Under these circumstances `make-win32` hangs. One can always zip the result of `package-win32` by hand.

The built app appears in the `out` directory:  
 * `out/Moorhen-darwin-arm64/Moorhen.app/` for M1 Mac. This can then be run with `open out/Moorhen-darwin-arm64/Moorhen.app/`, or opening `out/Moorhen-darwin-arm64/` in Finder and double clicking on `Moorhen.app`, etc. The zip file is `out/make/zip/darwin/arm64/Moorhen-darwin-arm64-0.1.0.zip`
 * `out/Moorhen-linux-x64/Moorhen` for Linux. You can simply run this executable. The zip file is `out/make/zip/linux/x64/Moorhen-linux-x64-0.1.0.zip`.
 * `out/Moorhen-win32-x64/Moorhen.exe` for Windows. Building of this has only been tested on Linux, so you will neeed to copy the whole `out/Moorhen-win32-x64/` directory to a Windows machine to test. The best way to do this is probably  
`cd out/Moorhen-win32-x64/`  
`zip -r Moorhen-win32-x64.zip out/Moorhen-win32-x64/`  
and then copy the zip file to a Windows, machine and unzip.
 
