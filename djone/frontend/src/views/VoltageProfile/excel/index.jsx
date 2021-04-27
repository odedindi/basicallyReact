import Button from "../../../components/CustomButtons/Button.js";


const Excel = (props) => {
    const inputValues = props.inputValues;

    function downloadExcel(){
        if (inputValues !== {}){
        let uri = 'data:application/vnd.ms-excel;base64,';
        let htmls = "<table>";
        let template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="https://www.w3.org/TR/html40/"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'; 
        let base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        };
        let format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p];
            })
        };
    
        // let firstRow = '<tr>';
        // let secondRow = '<tr>';
        // let allRows = '';
        // const rowValues = [];
        // let iter = 0;
        // for (let index in inputValues){
        //   firstRow = firstRow + `<th colspan="3">${index}</th><th></th>`;
        //   secondRow = secondRow + '<th>distance</th><th>voltage</th><th>comment</th><th></th>';
        //   rowValues.push([]);
        //   for (let j in inputValues[index]){
        //     rowValues[iter].push([inputValues[index][j].distance, inputValues[index][j].voltage, inputValues[index][j].comment]);
        //   }
        //   iter ++;
        // }
        // console.log(rowValues);
        // const longestArr = rowValues.reduce((p, c, i, a) => a[p].length > c.length ? p : i, 0);
        // for (let i = 0; i < rowValues.length; i++){
        //   for(let j = 0; j < rowValues[longestArr].length; j++){
        //     if (i === 0){
        //       allRows = allRows + '<tr>';
        //     }
        //     allRows = allRows + `<td>${rowValues[i][j] ? rowValues[i][j][0] : ''}</td>`;
        //     allRows = allRows + `<td>${rowValues[i][j] ? rowValues[i][j][1] : ''}</td>`;
        //     allRows = allRows + `<td>${rowValues[i][j] ? rowValues[i][j][2] : ''}</td><td></td>`;
        //     if (i === rowValues.length - 1){
        //       allRows = allRows + '</tr>';
        //     }
        //   }
        // }
        
        // firstRow = firstRow + '</tr>';
        // secondRow = secondRow + '</tr>';
        // htmls = '<table>' + firstRow + secondRow + allRows + '</table>';

        for (let i in inputValues){
          htmls = htmls + `<tr><th colspan="3">${i}</th></tr><tr><th>distance</th><th>voltage</th><th>comment</th></tr>`;
          const objArr = Object.values(inputValues[i]);
          let rowValues = '';
          for (let i of objArr){
            htmls = htmls + "<tr></tr>";
            for (let j of Object.values(i)){
                rowValues = rowValues + `<td>${j}</td>`;
            }
            htmls = htmls.slice(0, -5) + rowValues + htmls.slice(-5);
            rowValues = '';
          }
          htmls = htmls + "<tr></tr>";
        }

        htmls = htmls + "</table>";
    
        let ctx = {
            worksheet : 'Worksheet',
            table : htmls
        }
    
        let link = document.createElement("a");
        link.download = "export.xls";
        link.href = uri + base64(format(template, ctx));
        link.click();
        }
    }

    return (
        <Button
            onClick={downloadExcel}
            color="primary">
            Download
      </Button>
    )
}

export default Excel;