---
layout: post
title:  "Run Angular tests in parallel on Bitbcuket Pipeline (CI)"
excerpt: "Setup karma parallel on Bitbucket CI pipeline to run Angular tests in parallel."
meta_description: "Setup karma parallel on Bitbucket CI pipeline to run Angular tests in parallel."
date:   2020-06-19 11:30:00 +0530
type: post
published: true
status: publish
categories: [continuous-integration, angular, karma, bitbucket]
permalink: run-angular-test-in-parallel-on-bitbucket-pipeline
comments: true
---
<div style="text-align:center; margin-top: 15px;">
  <img src="/assets/post-images/20200619/parallel.png" alt="Run angular tests in parallel" title="Run angular tests in parallel" />
</div>

At [Galen Data](http://galendata.com), we run out CI on Bitbucket Pipelines. We use Angular as our frontend framework. Over time, our Angular frontend app grew bigger, and so did our unit tests. As of today, we have around 4000+ unit tests. Running all the tests on our CI takes about 4-6 mins. Some would say that it's not that bad. However, we wanted to make it a bit faster.

Angular uses jasmine and karma for executing unit tests. [Karma](https://karma-runner.github.io/latest/index.html) is the executor that runs the test on an actual browser. Karma relies on a configuration file `karma.conf` that should already be present in your Angular app (if you created the project using the `ng new` command).

By default, karma runs all the tests serially. However, there is an NPM package [karma-parallel](https://www.npmjs.com/package/karma-parallel) that can run the tests in a distributed manner. In its default setting, it creates browser instances equal to `CPU core count - 1` and divided the tests equally among the instances.

Running parallel tests in your local machine is pretty straightforward. Just follow the setup instructions on the karma-parallel NPM package, and you are good to go. To run them on a CI instance  (like Bitbucket Pipeline), you have to make some changes in the configuration to get it working.

### Headless Browser
When you run an angular test with karma, it will open up a browser window and you will it running your tests on the application. In a CI, things are different as there is no UI. For that, you will have to use a headless browser. Chrome is one of the most used browsers for testing with Angular. You can set up your CI to use a docker image that has a headless chrome installed. You can use this [docker image](https://hub.docker.com/r/galencloud/node-angular-chrome) in your bitbucket pipeline yml file.

### Karma Config

Once you install the `karma-parellel` npm package, edit your `karma.conf` file to add the parallel config,

```json
frameworks: ['parallel', 'jasmine']
plugins: [
  require('karma-parallel')
],
parallelOptions: {
  // executors: 1, // Defaults to cpu-count - 1
  shardStrategy: 'round-robin'
}
```

Note: If you are running this on a CI which usually runs on a shared instance, it is best to leave out the `executors` part since it defaults to CPU count - 1.

You can find additional options on the [official NPM package page](https://www.npmjs.com/package/karma-parallel#additional-configuration).

As per the documentation, this is enough to make it work. However, when running tests with this config on bitbucket pipeline (or any headless browser environment) you will face an issue. You will most likely get a similar error

```
Nacl helper process running without a sandbox
```

To fix this, just replace the `Chrome` browser in your karma config with `ChromeHeadless`,

```json
browsers: ['ChromeHeadless']
```

Most answers on SO and other forums will suggest you to run Chrome on linux with `--no-sandbox` option. But, we tried that and it did not help.

After setting up `karma-parallel`, our testing time reduced to under 2 minutes (from 4 minutes).

Happy coding!


