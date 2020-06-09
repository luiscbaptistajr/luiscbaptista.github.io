# Boilerplate & Guidelines

ABS-CBN HTML Boilerplate is a set of template files - HTML, CSS, JS - and site structure. Follow the guidelines for a standardized coding style.

## 1. Download the Template

Download the [boilerplate](https://bitbucket.org/frontenddevelopment/boilerplate/get/master.zip) and unzip. Structure should look like this:

	- template.html 
	- theme 
		- images 
		- scripts 
			-vendor
		- styles
			- sass

## 2. Coding Convention

### CSS: dash-separated, cuddle brackets

	.my-selector { 
	    positioning (coordinates); 
	    float/clear (); 
	    display/visibility; 
	    spacing (margin, padding, border); 
	    dimensions (width, height); 
	    typography-related (line-height, color, etc.); 
	    miscellaneous (list-style, cursors, etc.); 
	} 

### Javascript: camel case, cuddle brackets

You may read on Crockford's [Javascript Code Convention](http://javascript.crockford.com/code.html).

	function myFunction { 
	    // do something here 
	} 

### Nesting

Always indent (1 tab space) nested statements inside a code block.

### Commenting

Be nice to other developers by adding useful comments in the code. This is particularly useful when merging files in a specific hunk.

## 3. Images

### Alt Text
for Google Image Search 

	<img src='jpg' alt='Please give me a name!'>

### Sprite Sheet
Global UI images, icons, logo, etc. NO CONTENT! 

![Sprite Sheet](https://bitbucket.org/frontenddevelopment/boilerplate/downloads/spritesheet.jpg)

## 4. Optimization

### Minify CSS and Javascript

Download Minimus. Based on YUI JS and CSS Compressor. Make sure all statements terminate with semicolon.

### Images

Images in the sprite sheet should be laid out horizontally. Optimize the images using ImageOptim.

### Page Performance Analysis

Use PageSpeed by Google or YSlow by Yahoo!

## 5. Site Map Reference
Always check built pages against the site tree. Shade boxes that are finished.
![Site Map](https://bitbucket.org/frontenddevelopment/boilerplate/downloads/sitemap.jpg)

## 6. Git-Flow   

Always use gitflow. If you don't have git-flow use this [guide](https://github.com/nvie/gitflow/wiki/Mac-OS-X) to install it.  
Another way to get git-flow is to install the latest release of [sourcetree](http://www.sourcetreeapp.com/), they already integrated the git-flow to their app.

## 7. Commit Message

####Pattern
[PREFIX] {files/folders affected} {brief commit message}

(full commit details if able)

####Prefixes

- **NEW** for added files/folders
- **UPDATE** for updates
- **REMOVE** for deleted files/folders
- **INITIAL** for initial commit

## 8. Run the SASS using this line
sass --sourcemap=none --watch sass:. --no-cache --style compact

## Changelogs
- **1.0** - Jan. 13, 2015 by Jen Tee
- **1.1** - Jun. 11, 2015 by Jen Tee and Christian Tamayo