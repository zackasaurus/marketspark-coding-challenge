Coding Challenge

Job Queue

Create a job queue in NodeJs that supports a RESTful API. The job queue should implement some type of worker(s) which “scrape" a URL's html data. This data should then be stored somewhere persistently like a database. The exposed API should support adding to the queue, checking on the status of jobs in the queue, and getting the results of each job.

Bonus: add a feature that emits a push notification when a job is completed containing the job’s results.

Completing the Challenge and Submitting Work

We need to see decisions you make over time. If you submit one or two huge commits with 90-100% of the work completed we will not be able to accept your submission. Try breaking sections of the challenge into smaller pieces, committing code as you construct the backend. Submit your work via GitHub, or zip your work including the .git/.gitignore files.

## --

Thought Process

Watch tutorial on RESTful API
worker(s) -> multithreaded?

API:

1.  Add new url to scrape
2.  Check status of job - http status codes?
3.  Retreiving the URL html data

Database -> AWS, MongoDB, Firebase?

Push-Notification -> mobile notifications?
