# New Installations
In the CS Department, user web sites are placed in the `public_html` directory. 
**Unix** users can easily clone the site and start working.
If you don't already have a `public_html`directory you can create it and set the permissions.
```
  cd
  mkdir public_html
  chmod 711 public_html
```

You may clone the entire **CS001** site to begin building your site.
This provides you with example markdown files for reference.
```
  cd ~/public_html
  cp ~davematt/public_html/cs001/csweb.tar .
  tar xpvf csweb.tar
```
The code for the site is contained in a single JavaScript file that is referenced by the `index.html` file. 
You should not remove or change the JavaScript file.


Follow these simple steps to tailor the site with your content.

1. Modify the title in the `index.html` file replacing **Computer Science** with something that describes your site, like.
   ```
     <title>CSU CS FirstName LastName</title>
   ```
   Do not make any other changes to the file.
2. Modify the `site.json` file to include only a single page such as the faculty or course template
   Modify the file to reflect your information to start.
   Then add/remove sections on the page.
   Rather than put everything on a single page, move to the next step.
3. Create additional markdown pages in the `pages` directory for your content and add them to the `site.json` file.
4. Add graphic images you use to the 'images' directory.

Be sure to set the permissions on files and images properly so your site renders correctly.
Here's a brute force method.
```
  chmod 644 ~/public_html/*/*
```


# Updating your installation

The initial installation includes all of the files on the sample site.
After the initial installation, you can update the installation by downloading files from the **CS001** site.
Updates should only require the first of these files:
* the `csweb.js` file contains the application.
* the `index.html` file loads the application.  You may alter the `<title>...</title>`.
* the `favicon.ico` file contains the site icon.
* the `pages/department.json` file contains the **Computer Science Department** header/footer information.  This may be updated from time to time.

```
  cd ~/public_html
  cp -p ~davematt/public_html/cs001/csweb.js .
  # you may also need to copy these files and reapply any changes 
  cp -p ~davematt/public_html/cs001/index.html .
  cp -p ~davematt/public_html/cs001/favicon.ico .
  cp -p ~davematt/public_html/cs001/pages/department.json .
```

# This is still a prototype

We are not done yet.
More features are coming.
We plan to host all of this in a central place in the future.


# Release notes

Please forward ideas for additional changes to the author.

| date | release | notes |
| ---- | ------- | -------- |
| 2018-07-25 | [0.1](releases/csweb.0.1.tar) | URL router, download, bundled images, text pages, error handling, markdown formatting improvements |
| 2018-06-28 | [0.0](releases/csweb.0.0.tar) | header, footer, navigation, and markdown rendering |
 
