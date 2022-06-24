const fs = require("fs");
const { performance } = require('perf_hooks');
const { decode: decodeBase64, encode: encodeBase64 } = require( "./encodings/base64");
const { decode: decodeUrl, encode: encodeUrl } = require( "./encodings/url.js");
const { decode: decodeLzUrl, encode: encodeLzUrl } = require( "./encodings/lz_url.js");
const { decode: decodeLzBase64, encode: encodeLzBase64 } = require( "./encodings/lz_base64.js");
const path = require("path")

function getSamplesFilenames() {
    const samples = []
    const files = fs.readdirSync('./samples');
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        samples.push(file);
    }
    return samples;
}

function saveContent(content, filename) {
    const dirName = path.dirname(filename);
    fs.mkdirSync(dirName, { recursive: true });
    fs.writeFileSync(filename, content, 'utf8');
}

function readContent(filename) {
    return fs.readFileSync(filename, 'utf8');
}

function timeit(fn) {
    const start = performance.now();
    let result
    try {
        result = fn();
    } catch (e) {
        result = null;
    }
    const end = performance.now();
    return [result, Math.round(end - start)];
}

function testEncoding({ name, encode, decode }) {
    const samples = getSamplesFilenames();
    const results = [];
    for (const sample of samples) {
        const samplePath = `./samples/${sample}`;
        const sampleContent = fs.readFileSync(samplePath, 'utf8');
        const sampleContentSize = sampleContent.length;

        const [encoded, encodeTime] = timeit(() => encode(sampleContent));

        if (encoded == null) {
            results.push({
                filename: samplePath,
                size: sampleContentSize,
                encodeTime: encodeTime,
                decodeTime: -1,
                success: false
            });
            continue;
        }

        const encodedSize = encoded.length;

        const encodedPath = `./encoded/${name}/${sample}`;
        const decodedPath = `./decoded/${name}/${sample}`;

        saveContent(encoded, encodedPath);
        const encodedRead = readContent(encodedPath);

        const [decoded, decodeTime] = timeit(() => decode(encodedRead));
        saveContent(decoded, decodedPath);
        const decodedRead = readContent(decodedPath);

        const areEqual = decodedRead === sampleContent;

        let savingsStr = "?";
        if (sampleContentSize != null && encodedSize != null) {
            const savings = encodedSize / sampleContentSize;
            savingsStr = `${savings > 0 ? "+" : ""}${Math.round(savings * 100)}%`;
        }

        results.push({
            filename: sample,
            initialSize: sampleContentSize,
            encodedSize: encodedSize,
            savings: savingsStr,
            encodeTime,
            decodeTime,
            success: areEqual
        })
    }

    results.sort((a, b) => a.initialSize - b.initialSize);

    return results;
}

const encodings = [
    { name: 'base64', encode: encodeBase64, decode: decodeBase64 },
    { name: 'url', encode: encodeUrl, decode: decodeUrl },
    { name: 'lz_url', encode: encodeLzUrl, decode: decodeLzUrl },
    { name: 'lz_base64', encode: encodeLzBase64, decode: decodeLzBase64 }
]

function testEncodings() {
    const results = {};

    for (const encoding of encodings) {
        results[encoding.name] = testEncoding(encoding);
    }

    return results;
}

function printResults(results) {
    for (const encodingName in results) {
        const encodingResults = results[encodingName];
        console.log(`Encoding "${encodingName}":`);
        for (const result of encodingResults) {
            console.log(`\tFile: ${result.filename}`);
            console.log(`\tInitial size: ${result.initialSize}`);
            console.log(`\tEncoded size: ${result.encodedSize}`);
            console.log(`\tSavings: ${result.savings}`);
            console.log(`\tEncode time: ${result.encodeTime}ms`);
            console.log(`\tDecode time: ${result.decodeTime}ms`);
            console.log(`\tVerdict: ${result.success ? "SUCCESS" : "FAIL"}`);
            console.log(`\t-----------------------------------------------------`);
        }
        console.log(`=========================================================`);
    }
}

function main() {
    const results = testEncodings();
    printResults(results);
}

main();
