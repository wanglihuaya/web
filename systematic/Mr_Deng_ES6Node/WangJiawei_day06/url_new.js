const myURL = new URL("https://example.org:81/foo#bar");
console.log(myURL.host);
console.log(myURL.pathname);
console.log(myURL.hash);
console.log(myURL.hostname);
console.log(myURL.href);
console.log(myURL.origin);
console.log(myURL.port);
console.log(myURL.protocol);
console.log(myURL.toString());
// 打印 example.org:81

myURL.host = "example.com:82";
console.log(myURL.href);
// 打印 https://example.com:82/foo
