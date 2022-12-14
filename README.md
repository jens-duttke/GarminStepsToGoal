# Garmin Steps-To-Goal Data Field

Custom data field to show the remaining steps to your daily steps goal.

[<img src="https://developer.garmin.com/static/available-badge-9e49ebfb7336ce47f8df66dfe45d28ae.svg" width="200">](https://apps.garmin.com/en-US/apps/fc73e2e8-1848-446b-a846-996b09ac1ea6)

[<img src="https://cdn.jsdelivr.net/gh/jens-duttke/GarminStepsToGoal@e4c8a97/screenshot-fenix-5s.png" />](https://cdn.jsdelivr.net/gh/jens-duttke/GarminStepsToGoal@e4c8a97/screenshot-fenix-5s.png)

## Project Setup

The easiest way to get started with Connect IQ is to use the Visual Studio Code Monkey C Extension that Garmin provides. Please follow the installation instructions here: https://developer.garmin.com/connect-iq/sdk/

You may also have to install the [Java Runtime Environment (JRE)](https://www.java.com/de/download/manual.jsp), to be able to run the emulator and build tools provided by the SDK.

## Running in emulator

In Visual Studio Code, press `Ctrl` + `F5`, choose your Garmin device from the list of supported devices and the emulator will start within a few seconds.

## Installing on your personal device

In Visual Studio Code, press `Ctrl` + `Shift` + `P` and choose `Monkey C: Build for Device`.

Once the application has been created for your device, a file called `GarminStepsToGoal.prg` (or whatever you've renamed the project to) is created. To install on your watch, connect your watch to your computer and copy that file to the `/GARMIN/Apps/` directory on the device.

## Building a release version for the Connect IQ Store

In the command line type:

```sh
npm run build:release
```

## Adding translations

In Visual Studio Code, press `Ctrl` + `Shift` + `P` and choose `Monkey C: Edit Languages`. Activate additional languages in the menu and click on `OK`. This adds a new language code to `./manifest.xml`.

Copy the `./resources-deu` folder and replace `deu` by the language code.

Open the `./resources-{your-language-code}/strings/strings.xml` file and add your translations. Please keep them as short as possible - use understandable abbreviations if necessary.
