"use strict"

const Horseman  = require('node-horseman');
const fs        = require('fs');
const util      = require('util');
// const request   = require('request');
// const zlib      = require('zlib');
// const gunzip    = zlib.createGzip();

// const email     = 'm2.onevegas@gmail.com';
// const password  = 'hard2pass';
const email     = 'art.litvinko@gmail.com';
const password  = 'vasia2016';
const startURL  = 'https://www.mycase.com/';
const tableURL  = 'https://mainfish.mycase.com/reporting/accounts_receivable';
const clientURL = 'https://mainfish.mycase.com/contacts/clients/8066504';

const userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0';
const headers     = {
    // 'X-Horseman-Header': 'test header',
    // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    // "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br", 
    "Accept-Language": "en-US,en;q=0.5", 
    "Connection": "keep-alive",
};
const horseman  = new Horseman({
    phantomOptions: {
        // 'injectJquery': true,
        'load-images': true,
        'ignore-ssl-errors': true,
        'ssl-protocol': 'any',
    },
    // 'phantomPath': '/usr/lib/node_modules/phantomjs/phantomjs/phantomjs-2.5.0-beta-ubuntu-trusty/bin',
    // 'phantomPath': '/home/szpaklabs/work/projects/ANT/horseman/phantom/bin/phantomjs',
    // 'phantomPath': '/home/szpaklabs/work/projects/ANT/horseman/node_modules/phantom/node_modules/phantomjs-prebuilt/bin/phantomjs',
    // 'diskCache': true,
    'webSecurity': true, 
    'cookiesEnabled': true,
    "cookiesFile": "cookies.json",
    'timeout': 20000,
    'interval': 1000,
    "debugPort": 5002
});

horseman
    // .viewport(3200,1800)
    // .headers(headers)
    .cookies([])
    // .cookies("coockies.txt")

    .userAgent(userAgent)


    .on('ConsoleMessage', function(msg) {
        console.log(msg);
    })
    .on('error', function( msg, trace ){
        console.log('!_!_!_!_!_!_!_!_!');
        console.log(msg);
        console.log(trace);
    })
    // .on('resourceRequested', (requestData, networkRequest)=>{
    //     console.log('[--с');
    //     if(requestData)
    //         console.log(requestData);
    //     console.log('|--ы');
    //     if(networkRequest)
    //         console.log(networkRequest);
    //     console.log(']--р');
    // })
    // .on('resourceReceived', (response)=>{
        // console.log('||--сыр');
        // console.log(response);
        // response.headers.forEach((obj)=>{
        //     if(obj.name == 'Set-Cookie')
        //         horseman.cookies(obj.valuel);
        // });
    // })
    .open(startURL)
    // .waitForNextPage()

    .text('.hp-text-original p')

    .log()

    .click('#navigation a.cta-login')
    .waitForNextPage()

    .type('#login_session_email', email)

    .type('#login_session_password', password)

    .click('#login-button>input')
    .waitForNextPage()

    .then(()=>{
        console.log(' < ! ! ! > we in');
    })
// ------------------ 
    .screenshot('maycase.com.0.png')
// ------------------ 

    // .open(clientURL)

    // .waitForNextPage()
// ------------------ 
    // .screenshot('maycase.com.client.png')
// ------------------ 
    // .open(tableURL)

    .click('#nav_reporting ul > li:nth-last-child(2) a')
    .waitForNextPage()
// ------------------ 
    .screenshot('maycase.com.1.png')
// ------------------ 

    // .headers(headers)

    .click('#run_report_button')


    .wait(4000)
// ------------------ 
    .screenshot('maycase.com.2.png')
    .html('', 'maycase.html')
    .pdf('maycase.pdf')
// ------------------
    .waitForSelector('#total_receivable')

    // .html('#report_content')
    // .then(function(body) {
    //     console.log(body);
    // })

    // .evaluate(function () {
    //     $ = window.$ || window.jQuery;
    //     var fullHtml = $('body').html();
    //     console.log(fullHtml);
    // })

    .catch(function (err) {
      console.log('Error getting links: ', err);
    })
    .cookies()
    .then((coockies)=>{
        fs.writeFileSync('./cookies.json', util.inspect(coockies) , 'utf-8');
        // fs.writeFile('cookies.json', coockies, ()=>{});
    })
    // .close();

    // .do(function(done){
    //     setTimeout(done,4000);
        // return horseman.close();
    // })
    // .log()

    // fs.writeFile(filePath, screenshotBase64, function (err) {
    //     if (err) {
    //       throw err;
    //     }
    //     console.log('Success! You should now have a new screenshot at: ', filePath);
    //   });


    // 'utf8=%E2%9C%93&authenticity_token=eHU%2F%2B 8hhHIJHIAdXajE7Klu%2FRQ5tXoaD0Dt1qVB4%2FqKkVZHocfEEj9FfAj6Wk0fa1g%2Fpatq%2FFwC7ekXonS5%2FFA%3D%3D
    // &format=html&existing_id=&client_search_name=&case_id=&courtcase_search_name=&selected_group=none'
    
    //  eHU/+8hhHIJHIAdXajE7Klu/RQ5tXoaD0Dt1qVB4/qKkVZHocfEEj9FfAj6Wk0fa1g/patq/FwC7ekXonS5/FA==