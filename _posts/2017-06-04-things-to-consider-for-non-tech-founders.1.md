---
layout: post
title:  "Things to consider for non-tech startup founders"
excerpt: "A small guide for non-tech startup founders to consider when starting an online business"
date:   2017-06-04 21:00:00 +0800
type: post
published: true
status: publish
categories: [startups]
permalink: things-to-consider-for-non-tech-startup-founders
---

The beauty of Internet businesses these days is that one can easily start without needing much investment. There are tons of resources that will help you get started in no time. However, I still see some of the non-tech founders struggle with getting their product up and running. Even if they do, there are a lot of things they don't know or they get it wrong. 

For most tech founders, if they are building an Internet business they build the prototype themselves and validate it before hiring others. But what about non-tech founders? Well, most of them end up outsourcing their development work to get started. There are a lot of development houses in India which can help you get up and running at a very low cost.

I am currently advising an e-commerce startup based in Chennai, India. Both the founders are from a non-tech background. And so, there were a lot of mistakes they made along their 4-year journey which I want to list down today. I hope it helps someone out there who is thinking of starting up :)

## Technology / Framework

What framework/technology are they going to use? Is it something that can later be picked up by your own team or if you decide to hire other company to do it for you later? When my client started their business, they got stuck with a product built using a custom framework. Later, when they decided to switch to another company, the entire codebase was useless and the new guys had to start over. Costing them a lot of money and time.

## Software Practices

1) Can they deliver something quickly for you to validate your idea? You should ask them to delivery an MVP as soon as possible. Don't allow a company to take 6 months to 1 year to build something before you can validate your idea.   
   
2) Do they do [continuous integration and delivery](https://en.wikipedia.org/wiki/Continuous_delivery)? It is key that you get to see the progress on a daily or weekly basis so that you don't get any surprises closer to your actual launch date.   
   
3) Do they check their code into a repository (you can have a free private code repository on [bitbucket](https://bitbucket.org/)). Again taking the example of my client, their first company did not do this and later (when the contract was over) one day their server crashed and they did not have the source code. We found the source code somehow from old files but it was not the latest version :(

## Unit Tests

Most of the smaller development companies in India don't write unit tests. It is a very terrible practice. Without unit tests, there is no way you can later change your code with confidence.

## Documentation

Ask the team to write detailed documentation once the work is done and before you do the final handover and payment. Like unit tests, documentation is very important as it allows you to later hire your own developers (or any other company) and they can pick up the work using the documentation. Ask them to write 

- List down the steps required for a developer to setup their working environment
- Database architecture - explain the database schema (table relationships)
- List down the deployment steps.

## Infrastructure

1) Ask them upfront on how are they planning to do deployments? Its a common thing nowadays to host your code on cloud and use something like Amazon Web Services (AWS), Google Cloud Engine (GCE) or Heroku. All of them start with a cheap price and based on your growth you can scale upwards.   
   
2) Ask them about the cost that you need to incur for the infrastructure setup they plan to use. See if they can justify the usage cost. For my client, the company used Windows server for php because the developer did not know how to work with Linux !!! They were incurring huge cost because of Windows license. I had to make them switch to Linux (because if php, you use LAMP stack where L = Linux) and that brought down the cost from $900 a month to $160.

> Tip: If you plan to use AWS, go for reserved instances, they cost 40% cheaper than on demand instances. You can choose to pay the entire term payment upfront or can pay only half and rest you pay on a monthly basis.

## Summary

Starting a company and building a product is already very hard, so its important that you don't have to invest your energy in dealing with the issues mentioned above.

If you want more nitpicks, you can get in touch with me at [hello@taher.me](mailto:hello@taher.me)
