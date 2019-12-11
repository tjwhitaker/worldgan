
This tool helps you build a mobile and responsive web site for course, faculty, or other pages within a department.
You focus on the content for your audience, the tool handles the web stuff for you.
Students and others can view the content on their phone or tablet as easily as a laptop or desktop.
View this site on a phone or tablet to see an example.

The site will conform to the the current CSU Web Guidelines and new releases can track changes to the guidelines with no changes to your content.
GitHub Flavored Markdown (GFM) is used to format the content.
No HTML or scripting knowledge is required to build a page or site.

The content is defined by a set of simple text files in JSON (`.json`) and Markdown (`.md`) formats.
* **Site** shows the [`site.json`](#/site) file used to define this site.  
* **Dept** shows the [`department.json`](#/dept) file that defines  information for the header and footer.
* **Text** shows the [`markdown.md`](#/markdown) source file rendered on the [**Page**](./#/Page) and [**Card**](./#/Card) pages.
* **Page** shows [`markdown.md`](#/markdown) rendered in a single column.
* **Card** shows [`markdown.md`](#/markdown) rendered in multiple columns using the same markdown headings.
* **Faculty** shows a template page rendered from [`faculty.md`](#/faculty).
* **Course** shows a template  page rendered from [`course.md`](#/course).
* **Download** provides instructions for creating or updating a site using this tool. 

In addition to "**Know your audience!**", the keys to writing mobile content are "**Mobile First!**" and "**Less is More!**".
Design and write your content for a mobile environment, not for a desktop.
Brevity is your friend on a site people read on their mobile devices.

***This tool is evolving. Check back for updates.***


# JSON files
The [`department.json`](#/dept) file configures the header and footer - you should not need to change it.

The [`site.json`](#/site) file configures your site content and navigation.
It contains:
* name of the site.
* a list of markdown pages and links to render and create navigation.

The `pages` element of the [`site.json`](#/site) file is a `[list]` of `{objects}`.
Objects contain `name:value` pairs providing the information needed to create the navigation and render the file content.
* **type** is `page`, `card`, `text`, or `link`.
* **title** is placed in the gray bar at the top of rendered page, card, and text items as well as the vertical menu.
* **menu** is placed in the horizontal menu bar and is much shorter than the title, usually a single word.
* **file** is the location of the file containing markdown content to render for `page`, `card`, and `text` items.
* **url** is the URL associated with the menu for `link` items, no page is rendered.

You can learn more about this file type at [JSON Introduction](https://www.w3schools.com/js/js_json_intro.asp).
You can verify the format of the file with [JSON Lint](http://jsonlint.com) if you are having problems.

# Markdown files 
All page content is written in markdown format and given the `.md` extension.
Compare the [**Page**](#/page) and [**Card**](#/card) pages with the [**Text**](#/text) page or the [`markdown.md`](#/markdown) file to learn more about how markdown is rendered differently on this site based on the [`site.json`](#/site) type settings.
Compare the [**Faculty**](#/faculty) and [**Course**](#/course) pages with the [`faculty.md`](#/faculty) and [`course.md`](#/course) files for more examples.

Good markdown tutorials include:
* [Basic writing and formatting syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax/)
* [Mastering Markdown](http://guides.github.com)
* [Markdown Syntax](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
* [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

