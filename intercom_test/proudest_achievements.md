##Proudest Achievements

1. ###Project : Performance optimization for sync services.   
   ###Company : DeltaX   
   
   ####Summary (TL;DR):   
   Optimized the performance of services to process **6+ million records in under 20 minutes**. Before optimization it **used to take more than 6 hours (that is 1800% performance gain)** and some services used to fail because of deadlocks. I was given the task to re-architect all services from grounds up. I introduced a rotation table (just like rotation log files in linux) methodology along with a producer-consumer architecture to reduce deadlocks and improve the speed of individual services by making them independent of each other.
   
   ####Brief Introduction of the Project:   
   At DeltaX - we built a suit of sync services which pulled data from Google Adwords, Facebook Ads and Bing Ads via their respective APIs. Our users (clients - Digital Agencies) used our portal to manage their ad campaigns across all the 3 channels. Once they create a campaign and push it to these channels, our sync services pull performance data (clicks, impressions etc.) from them using API.
   
   ####Challenges :   
   We had more than 20,000 ad campaigns which had millions of keywords. In total, the performance data was more than 6 million. Our clients required this data to be updated hourly so that they can quickly learn from the data and optimize their ad campaigns on the go. But as the amount of data started growing, our services became slower. As a result, data was updated only once in 6 hours. A lot of clients were frustrated since it was affecting their business. As most of them were into e-commerce, hourly data update was a dying need. Since we were a start-up, we had few early clients and if they had left us, the company would not survive.
   
   ####Solution:
   - Re structured services from entity level to engine level (ex: keyword_service, ad_service are entity level, which we changed to google_service, bing_service etc.)
   - Introduced rotation tables which has data only for past 1 hour. Each services (producers) inserts data into the current rotation table (which is different from the actual data table which is used by the application for reporting)
   - After every hour, a consumer service picks up the rotation table for the past hour and updates the main data table.
   - Since consumer and producer are working on different tables, there are no dead locks. And because of rotation table, data was updated every hour. If something failed, we quickly knew (thanks to our Oracle status services) and re-processed the last hour data.
   
   
2. ###Project : Get A Plan (for SAT) - [getaplan.sitforsat.com](http://getaplan.sitforsat.com)
   ###Company : Cialfo
   
   ####Summary:
   Was the sole developer for this project which was built in 3 months. We build web and mobile optimized version along with HTML5 word games. This project is one of my favourite because it was used by school students in various African countries, Pakistan, Nepal, Singapore, India, Bhutan, USA and few other countries in the Europe. After it was live, we got lot of emails from users thanking us for this tool and stories of how it helped them learn english and also helped them score more in their SAT test. It was not a complex engineering problem to solve but it makes me happy to build something that solves people problems and makes their life easy :)
   