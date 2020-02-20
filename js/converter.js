var coverFile;
var frontCoverHtmlStr = "";
var frontCoverHtml;
function getCoverAndCreateFrontCoverHtml() {
    var fileToLoad = document.getElementById("getCover").files[0];
    document.getElementById("coverLoc").value = fileToLoad["name"];

    coverFile = new Blob([fileToLoad], { type: "image/*" });

    frontCoverHtmlStr += "<!DOCTYPE html>\n";
    frontCoverHtmlStr += "<html>\n";
    frontCoverHtmlStr += "<head>\n";
    frontCoverHtmlStr += "    <meta charset=\"utf-8\">\n";
    frontCoverHtmlStr += "    <meta name=\"viewport\" content=\"width=device-width\">\n";
    frontCoverHtmlStr += "</head>\n";
    frontCoverHtmlStr += "<body>\n";   
    frontCoverHtmlStr += "    <img src=\"cover.jpg\">\n";
    frontCoverHtmlStr += "</body>\n";
    frontCoverHtmlStr += "</html>\n";

    frontCoverHtml = new Blob([frontCoverHtmlStr], { type: "application/xhtml+xml" });
}

var latexToHtmlStr = "";
var latexFile;
function latexToEpub() {
    latexToHtmlStr += "<!DOCTYPE html>\n";
    latexToHtmlStr += "<html>\n";
    latexToHtmlStr += "<head>\n";
    latexToHtmlStr += "    <meta charset=\"utf-8\">\n";
    latexToHtmlStr += "    <meta name=\"viewport\" content=\"width=device-width\">\n";
    latexToHtmlStr += "    <script type=\"module\">\n";
    latexToHtmlStr += "        import latexjs from \"https://cdn.jsdelivr.net/npm/latex.js/dist/latex.component.esm.js\"\n";
    latexToHtmlStr += "        customElements.define('latex-js', latexjs)\n";
    latexToHtmlStr += "    </script>\n";
    latexToHtmlStr += "</head>\n";
    latexToHtmlStr += "<body>\n";   
    latexToHtmlStr += "    <latex-js baseURL=\"https://cdn.jsdelivr.net/npm/latex.js@0.11.1/dist/\">\n";
    latexToHtmlStr += document.getElementById("latexText").value;
    latexToHtmlStr += "    \n</latex-js>\n";
    latexToHtmlStr += "</body>\n";
    latexToHtmlStr += "</html>\n";

    latexFile = new Blob([latexToHtmlStr], { type: "application/xhtml+xml" });

    createObfFile();
}

var obfFileStr = "";
var obfFile;
function createObfFile() {
    obfFileStr += "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
    obfFileStr += "<package version=\"2.0\" xmlns=\"http://www.idpf.org/2007/opf\" unique-identifier=\"PrimaryID\">\n";

    obfFileStr += "<metadata xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:opf=\"http://www.idpf.org/2007/opf\">\n";
    obfFileStr += "    <dc:title>" + document.getElementById("title").value + "</dc:title>\n";
    obfFileStr += "    <dc:language>en</dc:language>\n";
    obfFileStr += "    <dc:creator opf:role=\"aut\">" + document.getElementById("author").value + "</dc:creator>\n";
    obfFileStr += "</metadata>\n";

    obfFileStr += "<manifest>\n";
    obfFileStr += "     <item id=\"front-cover\" href=\"front-cover.html\" media-type=\"application/xhtml+xml\" />\n";
    obfFileStr += "     <item id=\"page-latex\" href=\"page-latex.html\" media-type=\"application/xhtml+xml\" />\n";
    obfFileStr += "</manifest>\n";

    obfFileStr += "<spine toc=\"ncx\">\n";
    obfFileStr += "     <itemref idref=\"front-cover\" linear=\"no\" />\n";
    obfFileStr += "     <itemref idref=\"page-latex\" linear=\"yes\" />\n";
    obfFileStr += "</spine>\n";

    obfFileStr += "</package>\n";

    obfFile = new Blob([obfFileStr], { type: "application/oebps-package+xml" });

    convert();
}

function convert() {
    var zip = new JSZip();
    zip.file("cover.jpg", coverFile);
    zip.file("front-cover.html", frontCoverHtml);
    zip.file("page-latex.html", latexFile);
    zip.file("book.opf", obfFile);
    
    zip.generateAsync({type: "base64"}).then(function(content) {
        window.location.href = "data:application/epub+zip;base64," + content;
    });
}