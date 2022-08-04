# Cutting Ninja CLI [![npm version](https://badge.fury.io/js/@mariachibear%2Fcutting-ninja-cli.svg)](https://badge.fury.io/js/@mariachibear%2Fcutting-ninja-cli)

Command line tool for shorting URL's as you copy them. Using [Cutting Ninja](https://nnjct.pw/Jqq) as URL shortener and [PM2](https://nnjct.pw/jHk) as base for monitoring constantly.

## Prerequisites

1. [Node.js](https://nnjct.pw/jgE) and [npm](https://nnjct.pw/kS5) installed.

## Installation

```shell
npm install @mariachibear/cutting-ninja-cli --location=global
```

## Usage

At the moment of the package install you can start copying URLs and they will be automatically shortened and added to your clipboard. This way you should just `Ctrl+C` and `Ctrl+V`.

### Log In

By default, user-less URLs will be unavailable after some time, so you can log in to save the future shortened URLs as yours:

```shell
nnjct login -e your@email.com -p yourpassword
```

**_You will need to have an already registered account at Cutting Ninja_**

Also, once you have logged in, you can get your user information with :

```shell
nnjct login -i
```

You can always log out with

```shell
nnjct logout
```

### Listener Management

You can initialize, stop and get information from the listener with those commands. This is useful when you don't need short URLs for a while.

```shell
nnjct init

nnjct stop

nnjct info
```

### Enabling on startup

As PM2 is used for maintaining the listener alive, it is possible to configure the listener to be started when entering the operating system. TThose commands will show you what to run to achieve it _(No compatible with Windows for the moment)_.

```shell
nnjct enable

nnjct disable
```

## Additional information

For detailed information you can always execute `nnjct -h` to get all the possible commands.

```shell
Usage: nnjct [options] [command]

Cutting Ninja CLI to short your URL's as you copy them

Options:
  -V, --version    output the version number
  -h, --help       display help for command

Commands:
  login [options]  Login into the system to save the generated URL's as yours
  logout           Logout from the system to save the generated URL's as yours
  init             Start the listener to short your URL's
  info             Get information about the listener that short your URL's
  stop             Stop the listener that short your URL's
  enable           Show configuration to enable the listener on system startup
  disable          Show configuration to disable the listener from system startup
  help [command]   display help for command
```
