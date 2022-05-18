import $ from 'jquery'
import {TextDecoder, TextEncoder} from "util"
global.$ = global.jQuery = $


global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

const {JSDOM} = require("jsdom")
export const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
 <head>
 </head>
<body>
</body>
</html>`
)