class CssObject {
    private selector: string = '';
    private styleDict: Record<string, string> = {};
    private readonly element: string;
    private dict: Record<string, string>;

    constructor(element: string, dict: Record<string, string> = {}) {
        this.element = element;
        this.dict = dict;
        this.selector = `${element} {\n`;
    }

    public set_style(pair: Record<string, string>): boolean {
        const key = Object.keys(pair)[0];
        this.styleDict[key] = Object.values(pair)[0];
        return true;
    }

    public remove_style(pair: Record<string, string>): boolean {
        const key = Object.keys(pair)[0];
        delete this.styleDict[key];
        return true;
    }

    public get_css(): string {
        let css = `${this.element} {\n`;
        for (const [key, value] of Object.entries(this.styleDict)) {
            css += `  ${key}: ${value};\n`;
        }
        css += `}\n`;
        return css;
    }

    public get_style(): Record<string, string> {
        return this.styleDict;
    }

    public get_style_count(): number {
        return Object.keys(this.styleDict).length;
    }
}

class HtmlObject {
    private readonly tag: string = '';
    private self_closing: boolean = false;
    private attributes: Record<string, string> = {};
    private inner: string = '';

    constructor(tag: string, self_closing: boolean = false) {
        this.tag = tag;
        this.self_closing = self_closing;
    }

    public set_inner(...content: (HtmlObject | string)[]): HtmlObject {
        this.inner = `    ${content
            .map(c => c instanceof HtmlObject ? c.get_html() : c)
            .join('')}`;
        return this;
    }

    public append_child(child: HtmlObject | string): void {
        if (this.self_closing) return;
        if (child instanceof HtmlObject)
            this.inner += child.get_html();
        else this.inner += child;
    }

    public set_attribute(attribute: Record<string, string>): void {
        const key = Object.keys(attribute)[0];
        this.attributes[key] = Object.values(attribute)[0];
    }

    public build_open_tag(): string {
        const attrs = Object.entries(this.attributes)
            .map(([k, v]) => `${k}="${v}"`)
            .join(' ');
        return attrs.length > 0 ? `<${this.tag} ${attrs}>` : `<${this.tag}>`;
    }

    public get_html(new_line: boolean = false): string {
        if (this.self_closing) return `<${this.tag} />`;
        const open = this.build_open_tag();
        const close = `</${this.tag}>`;
        return new_line
            ? `${open}\n${this.inner}\n${close}`
            : `${open}${this.inner}${close}`;
    }
}

class ExtendedDate extends Date {
    public to_readable_string(date: number, month: number) {
        let result: string = ''

        const day: number = date;
        if (day === 1) {
            result = result.concat('1st ');
        } else if (day === 2) {
            result = result.concat('2nd ');
        } else if (day === 3) {
            result = result.concat('3rd ');
        } else result = result.concat(`${day}th `);

        const pair: { [key: string]: string } = {
            1: "of January",
            2: "of February",
            3: "of March",
            4: "of April",
            5: "of May",
            6: "of June",
            7: "of July",
            8: "of August",
            9: "of September",
            10: "of October",
            11: "of November",
            12: "of December",
        }
        return result.concat(pair[month.toString()]);
    }

    public is_future(date: number, month: number, year: number): boolean {
        const currentDate = this.getDate();
        const currentMonth = this.getMonth() + 1;
        const currentYear = this.getFullYear();

        if (year > currentYear) return true;
        if (year < currentYear) return false;
        if (month > currentMonth) return true;
        if (month < currentMonth) return false;
        return date > currentDate;
    }

    public is_leap_year(year: number): boolean {
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    }
}


function test_css_object(): void {
    const css = new CssObject("p");
    const colorWhite = {
        position: "absolute",
        color: "white",
    };

    if (css.set_style(colorWhite)) console.log(`Style is set successfully`);
    console.log(css.get_style_count());
    // if (css.remove_style(colorWhite)) console.log(`Style is removed successfully`);
    console.log(css.get_css());
    console.log(css.get_style_count());
}

function test_html_object(): void {
    const css_wrap = new CssObject(".wrap");
    css_wrap.set_style({ display: "flex" });

    const css_block = new CssObject(".block");
    css_block.set_style({ width: "300px" });
    css_block.set_style({ margin: "10px" });

    const css_img = new CssObject(".img");
    css_img.set_style({ width: "100%" });

    const css_text = new CssObject(".text");
    css_text.set_style({ "text-align": "justify" });

    const css_result = `<style>
        ${css_wrap.get_css()}
        ${css_block.get_css()}
        ${css_img.get_css()}
        ${css_text.get_css()}
</style>`;

    function createBlock(): HtmlObject {
        const h3 = new HtmlObject("h3");
        h3.set_inner("What is Lorem Ipsum?");

        const img = new HtmlObject("img", true);
        img.set_attribute({ class: "img" });
        img.set_attribute({ src: "lipsum.jpg" });
        img.set_attribute({ alt: "Lorem Ipsum" });

        const a = new HtmlObject("a");
        a.set_attribute({ href: "https://www.lipsum.com/" });
        a.set_attribute({ target: "_blank" });
        a.set_inner("More...");

        const p = new HtmlObject("p");
        p.set_attribute({ class: "text" });
        p.set_inner(
            `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. `,
            a
        );

        const block = new HtmlObject("div");
        block.set_attribute({ class: "block" });
        block.set_inner(h3, img, p);
        return block;
    }

    const root = new HtmlObject("div");
    root.set_attribute({ id: "wrapper" });
    root.set_attribute({ class: "wrap" });

    const block1 = createBlock();
    const block2 = createBlock();

    root.set_inner(block1, block2);

    const full_html = `${css_result}\n${root.get_html(true)}`;
    document.write(full_html);
}

function test_extended_date(): void {
    const date = new ExtendedDate();
    console.log(date.to_readable_string(date.getDate(), date.getMonth()));
    console.log(date.is_future(9, 10, 2025));
    console.log(date.is_leap_year(2020));
}

(function main() {
    //test_css_object();
    test_html_object();
    //test_extended_date();
})();
