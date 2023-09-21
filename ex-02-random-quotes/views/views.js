// views.js

//viewHTML(res, quoteData): undefined
export function viewHTML(res, quoteData) {
    //creates the inital html
    let data = `<!DOCTYPE html>
    <html>
        <body>
            <table>
                <tr>
                    <th>Author</th>
                    <th>Quote</th>
                </tr>
    `;

    //adds row data
    for (let i = 0; i < quoteData.length; i++) {
        data += `<tr>
                    <td>${quoteData[i].author}</td>
                    <td>${quoteData[i].quote}</td>
                </tr>`
    }

    //finalizes data
    data += "</table></body></html>";
    res.send(data);
}