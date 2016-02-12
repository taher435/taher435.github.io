---
layout: post
title: Opening Visual studio in older version after converting to a higher version
date: 2011-06-23 01:28:01.000000000 +08:00
type: post
published: true
status: publish
categories: [visual studio]
permalink: opening-visual-studio-in-older-version-after-converting-to-higher-version
id: 20110623012801
---
I have many times faced a problem of converting a Visual studio project to a higher version (say 2010) and then someone coming to me and saying that it needs to be in the older version only.

But problem with Visual studio is, once you convert from a lower to higher version, that project will not open back in the lower version. You may a error saying "The project was created using higher version and cannot be open".

Well, I have found out a quick way to overcome this problem.

Every project file (.csproj OR .vbproj) is nothing but an XML File. When you convert a project, what it does is update few values in the XML file. What you need to do is, undo the changes done by the converter in the project XML file and you are good to go. To do that, Right click on the project file and edit it with your favorite editor (like notepad++ or Sublime).

![editor](/assets/post-images/{{ page.id }}/1.png)

Once you open it, search for the line shown in below screen shot.

![line]({{ site.baseurl }}/assets/post-images/{{ page.id }}/2.png)

Notice the "**v9.0**" this what tells Visual studio which version to use to open the project. So if you have converted a Project from VS 2008 to VS 2010, then this particular value would be "**V10.0**". To open it back with VS 2008, just change it to "v9.0" and then you should be able to open it with VS 2008.

Hope this quick and handy tip helps you :)
