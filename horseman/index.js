"use strict"

const Horseman  = require('node-horseman');
const fs        = require('fs');
const util      = require('util');

const email     = '****@gmail.com';
const password  = '*****';

const startURL  = 'https://www.mycase.com/';
const tableURL  = 'https://mainfish.mycase.com/reporting/accounts_receivable';
const clientURL = 'https://mainfish.mycase.com/contacts/clients/8066504';

const userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0';
// const headers     = {
//     "Accept": "*/*",
//     "Accept-Encoding": "gzip, deflate, br", 
//     "Accept-Language": "en-US,en;q=0.5", 
//     "Connection": "keep-alive",
// };
const horseman  = new Horseman({
    phantomOptions: {
        // 'injectJquery': true,
        'load-images': true,
        'ignore-ssl-errors': true,
        'ssl-protocol': 'any',
    },
    // 'phantomPath': '/home/szpaklabs/work/projects/ANT/horseman/node_modules/phantomjs25-beta/bin/phantomjs',
    'cookiesEnabled': true,
    // 'diskCache': true,
    // 'webSecurity': true, 
    // "cookiesFile": "cookies.json",
    'timeout': 160000,
    'interval': 200,
    "debugPort": 5002
});

horseman
    // .viewport(3200,1800)
    // .headers(headers)
    .cookies([])

    .userAgent(userAgent)


    .on('ConsoleMessage', function(msg) {
        console.log(msg);
    })
    .on('error', function( msg, trace ){
        console.log('!_E_R_R_!');
        console.log(msg);
        // console.log(trace);
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
    //     console.log('||--сыр');
    //     console.log(response);
    //     // response.headers.forEach((obj)=>{
    //     //     if(obj.name == 'Set-Cookie')
    //     //         horseman.cookies(obj.valuel);
    //     // });
    // })
// ------------------ 
    .open(startURL)
    // .waitForNextPage()
// ------------------ 
    .text('.hp-text-original p')
    .log()
// ------------------ 
//     .click('#navigation a.cta-login')
//     .waitForNextPage()
// // ------------------ 
//     .type('#login_session_email', email)
//     .type('#login_session_password', password)
//     .screenshot('maycase.com.loging.png')
// // ------------------ 
//     .click('#login-button>input')
//     .waitForNextPage()
//     .then(()=>{
//         console.log(' < ! ! ! > we in');
//     })
// // ------------------ 
//     .screenshot('maycase.com.home.png')
// // ------------------ 
//     .open(clientURL)
//     .waitForNextPage()
// // ------------------ 
//     .screenshot('maycase.com.client.png')
// // ------------------ 
//     .open(tableURL)
//     // .click('#nav_reporting ul > li:nth-last-child(2) a')
//     .waitForNextPage()
// // ------------------ 
//     .screenshot('maycase.com.report.png')
// // ------------------ 
//     // .headers(headers)
//     .click('#run_report_button')
//     .wait(6000)
// // ------------------ 
//     .screenshot('maycase.com.run_report.png')
//     .html('', 'maycase.html')
//     .pdf('maycase.pdf')
// // ------------------
//     .waitForSelector('#total_receivable')

//     // .html('#report_content')
//     // .then(function(body) {
//     //     console.log(body);
//     // })

//     // .evaluate(function () {
//     //     $ = window.$ || window.jQuery;
//     //     var fullHtml = $('body').html();
//     //     console.log(fullHtml);
//     // })

//     .catch(function (err) {
//       console.log('Error getting links: ', err);
//     })
//     .cookies()
//     .then((coockies)=>{
//         fs.writeFileSync('./cookies.txt', util.inspect(coockies) , 'utf-8');
//     })
//     // .close();



    // 'utf8=%E2%9C%93&authenticity_token=eHU%2F%2B 8hhHIJHIAdXajE7Klu%2FRQ5tXoaD0Dt1qVB4%2FqKkVZHocfEEj9FfAj6Wk0fa1g%2Fpatq%2FFwC7ekXonS5%2FFA%3D%3D
    // &format=html&existing_id=&client_search_name=&case_id=&courtcase_search_name=&selected_group=none'
    //  eHU/+8hhHIJHIAdXajE7Klu/RQ5tXoaD0Dt1qVB4/qKkVZHocfEEj9FfAj6Wk0fa1g/patq/FwC7ekXonS5/FA==
