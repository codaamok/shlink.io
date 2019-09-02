import React, { FunctionComponent } from 'react';
import { ExternalLink } from 'react-external-link';
import Highlight from 'react-highlight';
import Documentation from '.';

const ServeWithSwoole: FunctionComponent = () => (
  <Documentation>
    <header>
      <h3>Serve Shlink using swoole</h3>
    </header>
    <p>Shlink can be served using <ExternalLink href="https://www.swoole.co.uk/">swoole</ExternalLink>.</p>
    <p>
      Swoole provides a non-blocking I/O server similar to the one used for node.js applications, which lets web apps
      to be run once and kept in memory while serving requests
    </p>
    <p>
      It is recommended to serve Shlink with swoole, since it is quite faster and has a few extra benefits (like
      running some heavy tasks immediately after a request has been served).
    </p>
    <p>
      In order to use swoole, you have to install the swoole PHP extension using
      Pecl: <code>pecl install swoole-4.3.2</code>
    </p>
    <p>You will also need to create a daemon script, in <code>/etc/init.d/shlink_swoole</code></p>
    <p>You can use this sample, replacing <code>/path/to/shlink</code> by the path to your shlink installation:</p>

    <Highlight className="bash">
      {`#!/bin/bash
### BEGIN INIT INFO
# Provides:          shlink_swoole
# Required-Start:    $local_fs $network $named $time $syslog
# Required-Stop:     $local_fs $network $named $time $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Description:       Shlink non-blocking server with swoole
### END INIT INFO

SCRIPT=/path/to/shlink/vendor/bin/zend-expressive-swoole\\ start
RUNAS=root

PIDFILE=/var/run/shlink_swoole.pid
LOGDIR=/var/log/shlink
LOGFILE=\${LOGDIR}/shlink_swoole.log

start() {
  if [[ -f "$PIDFILE" ]] && kill -0 $(cat "$PIDFILE"); then
    echo 'Shlink with swoole already running' >&2
    return 1
  fi
  echo 'Starting shlink with swoole' >&2
  mkdir -p "$LOGDIR"
  touch "$LOGFILE"
  local CMD="$SCRIPT &> \\"$LOGFILE\\" & echo \\$!"
  su -c "$CMD" $RUNAS > "$PIDFILE"
  echo 'Shlink started' >&2
}

stop() {
  if [[ ! -f "$PIDFILE" ]] || ! kill -0 $(cat "$PIDFILE"); then
    echo 'Shlink with swoole not running' >&2
    return 1
  fi
  echo 'Stopping shlink with swoole' >&2
  kill -15 $(cat "$PIDFILE") && rm -f "$PIDFILE"
  echo 'Shlink stopped' >&2
}

case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  restart)
    stop
    start
    ;;
  *)
    echo "Usage: $0 {start|stop|restart}"
esac`}
    </Highlight>

    <p>Then run these commands to enable the service and start it:</p>
    <ul>
      <li><code>sudo chmod +x /etc/init.d/shlink_swoole</code></li>
      <li><code>sudo update-rc.d shlink_swoole defaults</code></li>
      <li><code>sudo update-rc.d shlink_swoole enable</code></li>
      <li><code>/etc/init.d/shlink_swoole start</code></li>
    </ul>
    <p>
      After that, you should be able to access shlink on port 8080. The service will be automatically run at system
      start-up, and all access logs will be written in <code>/var/log/shlink/shlink_swoole.log</code>
    </p>
  </Documentation>
);

export default ServeWithSwoole;