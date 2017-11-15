![Build Status](https://travis-ci.org/swiftcafex/ios-image-maker.svg?branch=master)
)
# ios-image-maker
Automatic generate all 1x, 2x and 3x images from one source image.

This document also has [中文版本](https://github.com/swiftcafex/ios-image-maker/blob/master/README_CN.md).

# Installation

* you need install NodeJS first. 

You can visit [https://nodejs.org](https://nodejs.org) or install it via [Homebrew](http://brew.sh/):

```
brew install node
```

* ImageMagick 

You also need install [ImageMagick](http://www.imagemagick.org/script/index.php) to generate images for iOS projects. You can also install it by [Homebrew](http://brew.sh/):

```
brew install imagemagick
```

* Finally, install **ios-image-maker** by **npm**:

```
npm install -g ios-image-maker
```
#Usage

In your iOS project folder, create a file named `image-config.json` like this:

```
{
	"items": [

		{
			"type" : "assets",
			"sourcePath": "./sourceImages/assets" ,
			"destPath" : "./image-example/Assets.xcassets"
		},
		{
			"type" : "icon",
			"sourcePath": "./sourceImages/icon" ,
			"destPath" : "./image-example/Assets.xcassets",
			"name" : "Icon"
		}
	]
}
```
It defines how to generate images. `type` can be assets or icon, which represent asset images and app icon respectively. `sourcePath` and `destPath` defines 
where the source image and the generated images.

After created this `image-config` file. you can run `ios-image` command in the same folder:

```
$ ios-image
```

then you will receive console output like this:

```
Generating: sourceImages/assets/file.jpg to image-example/Assets.xcassets/file.imageset/file@3x.jpg
Generating: sourceImages/assets/file.jpg to image-example/Assets.xcassets/file.imageset/file@2x.jpg
Generating: sourceImages/assets/file.jpg to image-example/Assets.xcassets/file.imageset/file.jpg
Generating: sourceImages/assets/cloud.jpg to image-example/Assets.xcassets/cloud.imageset/cloud@3x.jpg
Generating: sourceImages/assets/cloud.jpg to image-example/Assets.xcassets/cloud.imageset/cloud@2x.jpg
Generating: sourceImages/assets/cloud.jpg to image-example/Assets.xcassets/cloud.imageset/cloud.jpg
Generating: sourceImages/icon/icon.jpg to image-example/Assets.xcassets/Icon.appiconset/Icon-App-20x20@2x.png
Generating: sourceImages/icon/icon.jpg to image-example/Assets.xcassets/Icon.appiconset/Icon-App-20x20@3x.png
Generating: sourceImages/icon/icon.jpg to image-example/Assets.xcassets/Icon.appiconset/Icon-App-29x29@1x.png
```

finally, it help you to generate all 2x,3x images accordinglly:

![](https://github.com/swiftcafex/ios-image-maker/blob/master/resources/1.png)

![](https://github.com/swiftcafex/ios-image-maker/blob/master/resources/2.png)

# Examples

the **example** folder has an project which already configured. So you can also use it as a reference.





