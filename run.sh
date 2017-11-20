#!/usr/bin/env bash
scp target/release-supporting-tool-0.1.0-SNAPSHOT.jar masuser@config.dolphin.lexisnexisrisk.com:/lexisnexis/application/release-tool

scp -r src/webui/dist masuser@config.dolphin.lexisnexisrisk.com:/lexisnexis/application/release-tool

java -Djavax.net.ssl.trustStore=./jssecacerts -jar release-supporting-tool-0.1.0-SNAPSHOT.jar org.springframework.boot.loader.PropertiesLauncher --jira.token=UGhhbVRoMDFAcmlzazpIQG5kc29tZTMxMA==

node dist/server.js
