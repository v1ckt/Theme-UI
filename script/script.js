function getColor(imageElement, ratio) {
    const canvas = document.createElement("canvas")

    let height = canvas.height = imageElement.naturalHeight
    let width = canvas.width = imageElement.naturalWidth

    const context = canvas.getContext("2d")
    context.drawImage(imageElement, 0, 0)

    let data, length
    let i = -4, count = 0

    try {
        data = context.getImageData(0, 0, width, height)
        length = data.data.length
    } catch (err) {
        console.error(err)
        return { R: 0, G: 0, B: 0 }
    }

    let R, G, B
    R = G = B = 0

    while ((i += ratio * 4) < length) {
        ++count

        R += data.data[i]
        G += data.data[i + 1]
        B += data.data[i + 2]
    }

    R = ~~(R / count)
    G = ~~(G / count)
    B = ~~(B / count)

    return { R, G, B }
}

function hexToHue(corHex) {
    var r = parseInt(corHex.substring(1, 3), 16);
    var g = parseInt(corHex.substring(3, 5), 16);
    var b = parseInt(corHex.substring(5, 7), 16);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var hue;

    if (max === min) { hue = 0;}
    else {
        var d = max - min;
        switch (max) {
            case r: hue = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g: hue = (b - r) / d + 2;
                break;
            case b: hue = (r - g) / d + 4;
                break;
        } hue /= 6;
    }
    return Math.round(hue * 360);
}


function rgb2hsl(r, g, b) {
    // see https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation
    // convert r,g,b [0,255] range to [0,1]
    r = r / 255,
        g = g / 255,
        b = b / 255;
    // get the min and max of r,g,b
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    // lightness is the average of the largest and smallest color components
    var lum = (max + min) / 2;
    var hue;
    var sat;
    if (max == min) { // no saturation
        hue = 0;
        sat = 0;
    } else {
        var c = max - min; // chroma
        // saturation is simply the chroma scaled to fill
        // the interval [0, 1] for every combination of hue and lightness
        sat = c / (1 - Math.abs(2 * lum - 1));
        switch (max) {
            case r:
                hue = (g - b) / c;
                hue = ((g - b) / c) % 6;
                hue = (g - b) / c + (g < b ? 6 : 0);
                break;
            case g:
                hue = (b - r) / c + 2;
                break;
            case b:
                hue = (r - g) / c + 4;
                break;
        }
    }
    hue = Math.round(hue * 60); // °
    sat = Math.round(sat * 100); // %
    lum = Math.round(lum * 100); // %
    return [hue, sat, lum];
}

var x = document.getElementsByClassName("cfont")[0]
const image = x.querySelector("img")
// Get average color in RGB
const { R, G, B } = getColor(image, 4)
// Convert RGB to HSL
const [hue, sat, lum] = rgb2hsl(R, G, B)
// HSL values
document.documentElement.style.setProperty(`--extracted`, `hsl(${hue},${sat}%,${lum}%)`);
// Hue value
document.documentElement.style.setProperty(`--hue`, `${hue}`);
// Saturation value
document.documentElement.style.setProperty(`--sat`, `${sat}%`);
// Lightness value
document.documentElement.style.setProperty(`--lum`, `${lum}%`);