# ios-image-maker

从一张原始图片自动生成 1x,2x 和 3x 图片。

# 安装

* 你需要首先安装 NodeJS 环境：

你可以访问 [https://nodejs.org](https://nodejs.org) 网站或者通过[Homebrew](http://brew.sh/) 来安装:

```
brew install node
```

* ImageMagick 

你还需要安装 [ImageMagick](http://www.imagemagick.org/script/index.php) 组件，用来处理图片生成。 同样也可以通过 [Homebrew](http://brew.sh/) 来安装:

```
brew install imagemagick
```

* 最后，通过 **npm** 来安装 **ios-image-maker**：

```
npm install -g ios-image-maker
```
# 使用

可以在你的 iOS 项目根目录中， 创建一个名为 `image-config.json` 的配置文件：

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

它定义了如何生成图片。`type` 可以是 `assets` 或 `icon` 分别对应项目中的图片资源和图标文件。 `sourcePath` 和 `destPath` 定义了在哪里找到原始图片以及在哪里存放生成后的图片。

创建完 `image-config.json` 文件后， 你可以在同级目录中运行 `ios-image` 命令：

```
$ ios-image
```

这样，你应该可以在控制台上面看到类似这样的输出：

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

运行完毕后， 就会帮你生成 iOS 项目需要的 1x,2x 和 3x 各种尺寸的图片了：

![](https://github.com/swiftcafex/ios-image-maker/blob/master/resources/1.png)

![](https://github.com/swiftcafex/ios-image-maker/blob/master/resources/2.png)

# 示例

**example** 目录中包含了一个示例项目， 你可以作为一个使用参考。





