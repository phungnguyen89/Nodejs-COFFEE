let s1 = "abcbcs";
let s2 = "a,csdasd,dsa";
let s3 = ",dsadsa,dsadas";
let s = s2;
console.log("indexof", s.includes(","));
console.log("mattch", s.match(","));
console.log("search", s.search(","));
if (s.search(",")) console.log("we got here");
