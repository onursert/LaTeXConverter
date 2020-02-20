var content = "";
function showHTMLFunction() {
    content =
        "<!DOCTYPE html>\n" +
        "<html>\n" +
        "<head>\n" +
        "    <meta charset=\"utf-8\">\n" +
        "    <meta name=\"viewport\" content=\"width=device-width\">\n" +
        "    <script type=\"module\">\n" +
        "        import latexjs from \"https://cdn.jsdelivr.net/npm/latex.js/dist/latex.component.esm.js\"\n" +
        "        customElements.define('latex-js', latexjs)\n"+
        "    </script>\n" +
        "</head>\n" +
        "<body>\n" +
        "    <latex-js baseURL=\"https://cdn.jsdelivr.net/npm/latex.js@0.11.1/dist/\">\n" +
        document.getElementById("latexText").value +
        "    </latex-js>\n" +
        "</body>\n" +
        "</html>\n";
    document.getElementById("showHTMLiframeId").srcdoc = content;
}