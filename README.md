## spfx-stocks-extension

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp serve --nobrowser

### Sample output

![Sample output](https://github.com/peshos/spfx-stocks-extension/blob/master/assets/outputExample.JPG)

### Blog description

[Blog article](https://blog.ch.atosconsulting.com/how-to-build-spfx-extensions-with-react/)
