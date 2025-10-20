function convert_to_css(tag: string, ...args: any[]): string {
    const str = args.pop();
    const styles = args.map(([attr, value]) => `${attr}:${value};`);
    return `<${tag} style="${styles}">${str}</${tag}>`;
}

function apply_css(tag: string, ...args: any[]) {
    let styleString = convert_to_css(tag, ...args);
    document.write(styleString);
}

function reverse_case(str: string): string {
    let result = "";

    for (let i = 0; i < str.length; ++i) {
        const ch = str[i];

        if (ch >= '0' && ch <= '9') {
            result += '_';
        } else if (ch === ch.toLowerCase()) {
            result += ch.toUpperCase();
        } else if (ch === ch.toUpperCase()) {
            result += ch.toLowerCase();
        } else {
            result += ch;
        }
    }
    return result;
}

function convert_to_camel_case(str: string) {
    let result = "";
    let upper_next = false;

    for (let i = 0; i < str.length; ++i) {
        if (str[i] === "-") {
            upper_next = true;
        }
        else {
            if (upper_next) {
                result += str[i].toUpperCase();
                upper_next = false;
            }
            else result += str[i];
        }
    }

    return result;
}

function make_abbreviation(phrase: string) {
    if (phrase.length === 0) return undefined;

    let result = "";
    let space_next = false;
    result += phrase[0];

    for (let i = 0; i < phrase.length; i++) {
        if (phrase[i] === ' ') {
            space_next = true;
        }
        else {
            if (space_next) {
                result += phrase[i];
                space_next = false;
            }
        }
    }
    return result.toUpperCase();
}

function get_url_info(url: string) {
    if (url.length < 5) return undefined;

    let proto, domain, path;

    // определить протокол
    if (url.startsWith("https://")) {
        proto = "https";
        url = url.slice(8);
    }
    else if (url.startsWith("http://")) {
        proto = "http";
        url = url.slice(7);
    }
    else proto = undefined;

    let slashIndex = url.indexOf("/");
    if (slashIndex !== -1) {
        domain = url.slice(0, slashIndex);
        path = url.slice(slashIndex);
    }
    else {
        domain = url;
        path = "/";
    }

    return {
        protocol: proto,
        domain: domain,
        path: path
    };
}

function pack_string(sentence: string, ...args: string[]) {
    let result = "";
    let argIndex = 0;

    for (let i = 0; i < sentence.length; ++i) {
        if (sentence[i] === "%" && argIndex < args.length) {
            result += args[argIndex++];
        } else {
            result += sentence[i];
        }
    }
    return result;
}


function main() {
    apply_css(
        "p",
        ["color", "magenta"],
        "XD"
    );

    // let str = convert_to_camel_case("font-size");

    // let css = "objected oriented programming";
    // let css_abbr = make_abbreviation(css);

    // let url_info = get_url_info("https://itstep.org/ua/about");

    // let test = pack_string("Today is % %.%.%","Monday", 10, 8, 2020);
}
main()