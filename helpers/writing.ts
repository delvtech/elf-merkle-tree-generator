import * as readline from "readline-sync";

export function parseFile(fileName: string) {
    const fs = require('fs');
  
    let rawdata = fs.readFileSync(fileName).toString();
    return JSON.parse(rawdata);
}

export async function updateS3Bucket(address: string, uploadData: string) {
    const bucket = (readline.question("S3 bucket path: ")).toLowerCase();

    // Load the AWS SDK for Node.js
    var AWS = require("aws-sdk");
    // Set the region
    AWS.config.update({ region: "us-east-2" });
    // Create S3 service object
    var s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  
    // call S3 to retrieve upload file to specified bucket
    var uploadParams = { Bucket: bucket, Key: address, Body: uploadData };
  
    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err: any, data:any) {
      if (err) {
        console.log("Error", err);
      }
      if (data) {
        console.log("Upload Success", data.Location);
      }
    });
}

