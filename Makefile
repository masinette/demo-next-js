# Must have `sentry-cli` installed globally
# Following variable must be passed in
SENTRY_AUTH_TOKEN=a37715787ea34016ac87cb6109e77f43471b23f729924c2397626268eab822e7

SENTRY_ORG=liv-togethr
SENTRY_PROJECT=javascript-nextjs
VERSION=`sentry-cli releases propose-version`

setup_release: create_release associate_commits upload_sourcemaps

create_release:
	sentry-cli releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(VERSION)

associate_commits:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --auto $(VERSION)

upload_sourcemaps:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files $(VERSION) upload-sourcemaps .next --rewrite --url-prefix '~/_next'