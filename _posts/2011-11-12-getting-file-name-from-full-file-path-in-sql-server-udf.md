---
layout: post
title: Getting file name from full file path in SQL Server - UDF
date: 2011-11-12 00:48:07.000000000 +08:00
type: post
published: true
status: publish
categories: [sql server, udf]
permalink: getting-file-name-from-full-file-path-in-sql-server-udf
---
Today at office I got a task which had a table with image URLs in one of the column. The image URLs were a network path. I had to write a script to identify the image name (file name) and then update it with a web URL for the same image. I needed a function which would give me file name when given a file path. As you must know, such type of things is very easy in C#. But in SQL Server we do not have any in built function to do this. So I wrote a function of my own. Below is what I wrote and also showing how to use it. The script is self explanatory I believe :)

<pre class="highlight medium">
  <code>
    CREATE FUNCTION [dbo].[udf_GetFileName]
    (
    	@FilePath VARCHAR(MAX),
    	@Separator CHAR(1) = ','
    )
    RETURNS VARCHAR(MAX)
    AS
    BEGIN
    	RETURN
    		SUBSTRING
    		(
    @FilePath,
    LEN(@FilePath) - CHARINDEX(@Separator, REVERSE(@FilePath),1) + 2, -- From where to start
    LEN(@FilePath) - CHARINDEX(@Separator, REVERSE(@FilePath),1) -- how many characters to take
    		)
    END
    GO

    --How to use

    DECLARE @networkpath VARCHAR(50) = '\somenetworkpath\somefolder\networkfile.txt'
    DECLARE @localpath VARCHAR(50) = 'D:\somefolder\localfile.txt'
    DECLARE @webpath VARCHAR(50) = 'http://tdtechdiary.com/somefolder/webfile.jpeg'
    SELECT
    	dbo.udf_GetFileName(@networkpath,DEFAULT) as [NetworkPath],
    	dbo.udf_GetFileName(@localpath,DEFAULT) as [LocalPath],
    	dbo.udf_GetFileName(@webpath,'/') as [WebPath]
  </code>
</pre>

The out put is as shown below

![output](/assets/post-images/20111112004807/output.png)

Hope it helps!
