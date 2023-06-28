# MoorhenElectron
An Electron version of the Moorhen molecular graphics program.

[Moorhen](https://github.com/stuartjamesmcnicholas/Moorhen/)is a web browser molecular graphics program based on the Coot desktop program. This project is
an Electron App version of Moorhen.

## **Build Instructions**

1. `git clone https://github.com/stuartjamesmcnicholas/MoorhenElectron.git`
2. `cd MoorhenElectron`
3. `npm install`
4. `cp -r node_modules/moorhen/baby-gru ./public/`
5.  Build the app  
  * `npm run make-mac-m1` to make an M1 macOS app and redistributable zip (tested on M1 Mac)
  * `npm run make-mac` to make an Intel macOS app and redistributable zip (tested on M1 and Intel Macs)
  * `npm run make-linux` to make an Linux macOS app and redistributable zip (tested on Linux)
  * `npm run package-win32` to make a Windows app (tested on *Linux*)

`make-win32` should also work, but is not recommended since it may be desirable to replace the minimal copy of the CCP4/refmac monomer library `public/baby-gru/monomers` with a complete copy. Under these circumstances `make-win32` hangs. One can always zip the result of `package-win32` by hand.

The built app appears in the `out` directory:  
 * **Mac** `out/Moorhen-darwin-arm64/Moorhen.app/` for M1 Mac. This can then be run with `open out/Moorhen-darwin-arm64/Moorhen.app/`, or opening `out/Moorhen-darwin-arm64/` in Finder and double clicking on `Moorhen.app`, etc. The zip file is `out/make/zip/darwin/arm64/Moorhen-darwin-arm64-0.1.0.zip`
 * **Linux** `out/Moorhen-linux-x64/Moorhen` for Linux. You can simply run this executable. The zip file is `out/make/zip/linux/x64/Moorhen-linux-x64-0.1.0.zip`.
 * **Windows** `out/Moorhen-win32-x64/Moorhen.exe` for Windows. Building of this has only been tested on Linux, so you will neeed to copy the whole `out/Moorhen-win32-x64/` directory to a Windows machine to test. The best way to do this is probably  
`cd out/Moorhen-win32-x64/`  
`zip -r Moorhen-win32-x64.zip out/Moorhen-win32-x64/`  
and then copy the zip file to a Windows, machine and unzip.
 
## **Moving built files to other machines**
* **Mac** The Mac zip files can be copied to other machines but the unzipped `Moorhen.app` will need to be "blessed" in order for it to run. This can be done with `xattr -rc Moorhen.app` .
* **Linux** The Linux zip file can (under most circumstances) be simply copied to another machine and unzipped. The `Moorhen` executable on the unzippped directory can then be run.
* **Windows** After zipping up the Windows folder (previous section), copy to new machine and unzip. You should be able to tun `Moorhen.exe` in the unpacked directory. You may need to use the `--no-sandbox` option.

## **References**

* Coot
    * P. Emsley; B. Lohkamp; W.G. Scott; Cowtan (2010). *Features and Development of Coot*, Acta Crystallographica. **D66 (4)** p486–501.
* Moorhen
    * [Moorhen](https://github.com/stuartjamesmcnicholas/Moorhen/) a web browser molecular graphics program based on the Coot desktop program.
  
