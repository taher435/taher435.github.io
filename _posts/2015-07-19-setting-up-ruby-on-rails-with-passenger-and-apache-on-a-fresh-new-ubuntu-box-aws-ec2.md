---
layout: post
title: Setting up Ruby on Rails with Passenger and Apache on a fresh new Ubuntu Box
date: 2015-07-19 22:16:39.000000000 +08:00
type: post
published: true
status: publish
categories: ruby
permalink: setting-up-ruby-on-rails-with-passenger-and-apache-on-ubuntu
---
<p>I've been setting up multiple Ubuntu machines from past 1 year and so writing down the steps that I have compiled after hours of frustration and research.</p>
<p><strong>DISCLAIMER</strong> : There are steps like these on many blogs but they did not work for me (hence this list). The steps mentioned below may also not work for you.</p>

1. `gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3`
2. `=\curl -sSL https://get.rvm.io | bash -s`
3. `logout and login again (close the terminal and open it again)`
4. type this on the terminal window : `source ~/.rvm/scripts/rvm`
5. Check if RVM was installed properly, type : `rvm | head -n 1` (output should be "rvm is a function")
6. `rvm install 2.2`
7. `rvm use 2.2`
8. `sudo apt-get install nodejs`
9. `sudo apt-get install git`
10. `sudo apt-get install libmysqlclient-dev`
11. `sudo apt-get install libgmp-dev`
12. `gem install mysql2`
13. `gem install bundler`

<p>After this point, you should set up your directories with your code in the server. Once you do that then do these steps</p>

1. `bundle install` (do it in all the code directories)
2. `sudo apt-get install apache2`
3. `sudo apt-get install libcurl4-openssl-dev`
4. `sudo apt-get install apache2-threaded-dev`
5. `gem install passenger` (first try without sudo, if it  fails then prepend "sudo" and run the command again)
6. `passenger-install-apache2-module` (if you used sudo in the above step, use sudo here, else don't)

<p>Now sit back and relax or grab a cup of coffee. Passenger will take around 10-15 mins (depending on your internet connection speed) to finish.</p>
<p>Once its done, it will print a configuration on the screen. Copy that and do the below step</p>

1. `cd /etc/apache2`
2. `sudo nano apache2.conf`
3. go the bottom of the conf file and paste the lines you copied
4. Now do this : `cd /etc/apache2/sites-available`
5. `sudo nano 000-default.conf`
6. add the below lines at the end


<pre class="highlight medium">
  <code>
    &lt;VirtualHost *:80&gt;
      # Change these 3 lines to suit your project
      RailsEnv development
      ServerName dev.blah.com
      DocumentRoot /your/website/path/public # Note the 'public' directory
    &lt;/VirtualHost&gt;
  </code>
</pre>


Hope this helps!
