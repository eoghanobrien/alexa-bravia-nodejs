# Sony Bravia TV Alexa Skill - NodeJS

## Prerequisites

You need to open port 80 on your router to allow outside access to your TV's local IP address, the local IP usually defaults to `192.168.1.69` but yours may be different.

You'll need the public IP address for your router too, if you don't have a static IP address, you can look into setting up [DynDNS](https://dyn.com/dns/) to handle your public IP.

You'll also need to allow remote connections via a Pre-Shared Key (PSK) in the Network settings section. The `Pre-Shared Key` menu is located under `Settings > Network > Home Network > IP control > Pre-shared Key`. You must also allow authentication using a PSK under `Settings > Network > Home Network > IP control > Authentication > Normal and Pre-shared Key`.

## Installation

I've tried to make the installation process as simple as possible but please create a new issue if you have any trouble getting the skill to work on your Amazon Echo or Echo Dot. Any and all feedback is greatly appreciated.


### 1. Local Installation

#### Authentication
I'm not going to go into detail on how to set up an AWS account and how to create Users, Roles and Policies, there are already enough resources available via a quick Google search. Instead, the only thing you need to know about setting up your AWS account for use with this repo/library is that you need to create a local credentials file and store it in your computer user account's `$HOME` directory.

On Mac, just create a new `credentials` file with:

```mkdir ~/.aws && touch ~/.aws/credentials```

and add the following:

```yml
[default]
aws_access_key_id: <your_access_key_id>
aws_secret_access_key: <your_access_key_id>
aws_default_region: <your_default_region>
```

#### Install Node Modules

Download and install `node` and `npm` if you haven't done so already.

```
# Clone the repository
git clone git@github.com:eoghanobrien/alexa-bravia-nodejs.git

# Install the node modules
npm install # or yarn
```

#### Customize the build tool

Duplicate the `env.json.sample` file and rename it to `env.json`. Open the file in your editor and update the variables.

##### Parameters

1. `FunctionName`: The name of your Lambda function.
2. `Description`: A description for your function (optional)
3. `Role`: Your user role ARN.
4. `Timeout`: The number of seconds before Lambda should timeout and stop processing your code (e.g. `1` = `1 second`)

##### Options

1. `region`: The AWS region to host your function (e.g. us-east-1)


### 2. Lambda Installation

#### Build & Deploy

With your `env.json` file updated, you can now run the build tool. The build tool will copy all the required files into a directory called `archive`, zip up that directory and store the zip file under the `dist` directory. Note: The `/dist/archive.zip` file will be overwritten each time you run the build tool and the `/archive/` directory will be deleted.

```
# Build the zip file to send to AWS Lambda
gulp build # or npm run build
```

With your zip file built, you can now deploy it to AWS Lambda.

```
# Deploy the zip file
gulp deploy # or npm run deploy
```

#### Configure

Next, login to your [Lambda Management Console](https://console.aws.amazon.com/lambda/home) and click on the function you just created.

You'll see 3 buttons and 4 tabs. Click around and get comfortable.

Under the `Code` tab, you can add environment variables for:

1. `APP_EMIT`: You can use `:tell` or `:tellWithCard`. `:tell` will not create a card in your companion app. `:tellWithCard` will.
2. `APP_NAME`: The name you want to see on your Alexa companion app cards, if you set `APP_EMIT` to `:tellWithCard`.
3. `APP_ID`: I'll go into more detail on this later in the `Alexa Installation` section.
4. `TV_IP`: The public IP address of your router which has been set up to allow traffic on port `80`.
5. `TV_PSK`: The Pre-shared Key you've set up on your TV under `Settings > Network > Home Network > IP control > Pre-shared Key`. You must also allow authentication using a PSK under `Settings > Network > Home Network > IP control > Authentication > Normal and Pre-shared Key`.

Under the `Trigger` tab, if you haven't already created an `Alexa Skills Kit` trigger, click `Add Trigger` to do that now. It will pop a modal window up where you can click the little square-with-grey-border in order to select a trigger. In the filter box, type `Alexa Skills Kit` and click. Then click `Submit`.


### 3. Alexa Installation

In order to create an Alexa Skill, you need to go to the [Alexa Developer Console](https://developer.amazon.com/edw/home.html#/) and sign in. Once you're signed in, click the `Get Started` button under the Alexa Skills Kit. Click `Add a New Skill`.

#### Skill Information

1. Select `Custom Interaction Model` for `Skill Type`.
2. Select your language, I can verify it works with `English`.
3. Enter the `Name` of your skill, I used `Sony Bravia TV`
4. Enter your invocation name, I used `TV`.
5. Under `Global Fields`, for `Audio` I selected `No`.
6. Hit `Next` (It will save automatically).

#### Interaction Model

1. For the `Intent Schema` field, locate the file `intents.json` in the repository under `/assets/`. Open it in your editor and copy the JSON data into the textarea field.
2. For the `Custom Slot Types`, locate the file `slots.txt` in the repository under `/assets/`. Open it in your editor and go back to the Skill creation page in your browser. You need to create 4 separate slots. Click on the `Add Slot Type` button and enter the word in capital letters into the `Enter Type` field (e.g. `POWER`). Then copy the values directly underneath the type into the `Enter Values` field, each value should be on it's own line. Then hit `Save` and rinse and repeat for `APPLICATION`, `INPUT` and `BUTTON`.
3. For the `Sample Utterances`, locate the file `utterances.txt` in the repository under `/assets/`. Open it in your editor and copy the data into the textarea field.
4. Hit `Next`.

#### Configuration

1. Under `English (U.S.)` and `Service Endpoint Type`, click the radio for `AWS Lambda ARN`, select your `Location`. Go back to the `Lambda Management Console` and locate your Lambda function from earlier. Your `ARN` should be in the top right hand corner of the page. Copy that and paste it into the text field for the `Location` you selected. (e.g. North America)
2. Under `Account Linking`, leave that set to `No`.
3. Hit `Next`.

#### Test

Testing in this area is optional but if you want to try out an example Request, follow these steps.

1. Go back to the `Skill Information` section and copy your `Application Id`.
2. Go to the `Lambda Management Console` and add a new environment variable with key `APP_ID` and paste the id as the value.
3. While you're here, why not also set environment variables for `TV_IP`, `TV_PSK` and `TV_PORT`. You should have recorded that information as part of the earlier instructions.
2. Under `Service Simulator > Text > Enter Utterance`, enter  `to power on`.

#### Publishing Information

Please don't publish my work under your own name. Feel free to fill this section out to see what it looks like in the companion app. I've provided two sample images:

```
/assets/bravia-108.png
/assets/bravia-512.png
```

#### Privacy & Compliance

Again, please don't publish my work under your own name.

I'd love to make a configuration page to store the IP address and Port of the TV and also the Pre-shared Key but I haven't found a way to do that without setting up an entire separate web service and ain't nobody got time for that. It also opens up a whole myriad of issues around security, privacy, terms of use, support and certification which I really have no intention of dealing with for a fun little side project.

## Usage

### Launch

- Alexa, open|start|launch TV

### Power

- Alexa, tell|ask TV to power on|off
- Alexa, tell|ask TV to turn on|off

### Volume

- Alexa, tell|ask TV to set volume to {number}
- Alexa, tell|ask TV to change volume to {number}

### Muting

- Alexa, ask|tell TV [to] mute
- Alexa, ask|tell TV [to] turn off volume
- Alexa, ask|tell TV [to] turn off sound
- Alexa, ask|tell TV to open {application}

### Input

- Alexa, ask|tell TV to change input to {input}
- Alexa, ask|tell TV to change input to HDMI {number}

### Remote

- Alexa, ask|tell TV to hit {button}
- Alexa, ask|tell TV to press {button}

## Tools Used:

- [Alexa Skills Kit SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)
- [JSHint](https://github.com/jshint/jshint)
- [Node Pre Commit](https://github.com/dwyl/learn-pre-commit)
- [Gulp](https://github.com/gulpjs/gulp)
- [Gulp Del](https://github.com/sindresorhus/del)
- [Gulp Run Sequence](https://github.com/OverZealous/run-sequence)
- [Gulp Zip](https://github.com/sindresorhus/gulp-zip)
- [Gulp AWS Lambda](https://github.com/willyg302/gulp-awslambda)

## Resources Used:

- [Bravia HTML5 Manual Rev3](https://pro.sony.com/bbsc/assetDownloadController/FWD-Pro_Bravia_HTML5_Manual_Rev_3.pdf?path=Asset%20Hierarchy$Professional$SEL-yf-generic-153697$SEL-yf-generic-153719SEL-asset-420851.pdf&id=StepID$SEL-asset-420851$original&dimension=original)
- [Aydar Belyaev's Sample Method and Data info](https://aydbe.com/assets/uploads/2014/11/json.txt)
