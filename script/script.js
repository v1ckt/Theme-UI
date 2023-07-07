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
        console.error(err);return { R: 0, G: 0, B: 0 }}
    let R, G, B;R = G = B = 0
    while ((i += ratio * 4) < length) {
        ++count;R += data.data[i];G += data.data[i + 1];B += data.data[i + 2]}
    R = ~~(R / count);G = ~~(G / count);B = ~~(B / count);return { R, G, B }
}

function hexToHue(corHex) {
    var r = parseInt(corHex.substring(1, 3), 16);
    var g = parseInt(corHex.substring(3, 5), 16);
    var b = parseInt(corHex.substring(5, 7), 16);
    var max = Math.max(r, g, b);var min = Math.min(r, g, b);var hue;

    if (max === min) { hue = 0; }
    else {
        var d = max - min;
        switch (max) {
            case r: hue = (g - b) / d + (g < b ? 6 : 0);break;
            case g: hue = (b - r) / d + 2;break;
            case b: hue = (r - g) / d + 4;break;
        } hue /= 6;}return Math.round(hue * 360);
}

function rgb2hsl(r, g, b) {
    // see https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation
    // convert r,g,b [0,255] range to [0,1]
    r = r / 255, g = g / 255, b = b / 255;
    // get the min and max of r,g,b
    var max = Math.max(r, g, b);var min = Math.min(r, g, b);
    // lightness is the average of the largest and smallest color components
    var lum = (max + min) / 2;var hue;var sat;
    if (max == min) {hue = 0;sat = 0;
    } else {
        var c = max - min;sat = c / (1 - Math.abs(2 * lum - 1));
        switch (max) {
            case r: hue = (g - b) / c;hue = ((g - b) / c) % 6;hue = (g - b) / c + (g < b ? 6 : 0);break;
            case g: hue = (b - r) / c + 2;break;
            case b: hue = (r - g) / c + 4;break;
        }
    }
    hue = Math.round(hue * 60);sat = Math.round(sat * 100);lum = Math.round(lum * 100);return [hue, sat, lum];
}

const updated = updateColor(".active");

function updateColor(atribute){
    const image = document.querySelector(atribute);
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
}

function CarScrollP(Name) {
    var y = document.getElementsByClassName(Name);
    for (element in y) {
        if (y[element].classList.contains("active")) {
            y[element].classList.remove("active");
            if (y[element].previousElementSibling != null) {
                y[element].previousElementSibling.classList.add("active");
            } else { y[y.length - 1].classList.add("active"); }break;}}
    updateColor(".active");
}
function CarScrollN(Name) {
    var y = document.getElementsByClassName(Name);
    for (element in y) {
        if (y[element].classList.contains("active")) {
            y[element].classList.remove("active");
            if (y[element].nextElementSibling != null) {
                y[element].nextElementSibling.classList.add("active");
            } else { y[0].classList.add("active"); }break;}}
    updateColor(".active");
}

function navExpand(Name) {
    x = document.getElementsByClassName(Name);
    x.querySelector('.nav__content').classList.add("active");
    document.getElementsByTagName("main").style.width = "calc(100% - 20rem)";
}
function navClose(Name) {
    // z = document.getElementsByClassName(Name);
    // z.querySelector('.nav__content').classList.remove("active");
    // document.getElementsByTagName("main").style.width = "100%";
    pass
}