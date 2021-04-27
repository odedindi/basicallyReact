import Button from "../../../components/CustomButtons/Button.js";

const Post = (props) => {
    const inputValues = props.inputValues;

    const prepareAndPostData = () => {
        const directionValues = Object.values(inputValues);
        const directionKeys = Object.keys(inputValues);
        const values = [];
        let iter1 = 0;
        let iter2 = 0;
        let iter3 = 0;
        for (let i of directionValues) {
          values.push({direction: directionKeys[iter1], project_identifier: props.currentIdentifier});
          for (let j in i){
            for (let q in i[j]){
              if (q === "comment"){
                values[iter1][`bemerkung${iter2 !== 0 ? iter2 : ''}`] = i[j][q];
                iter3++;
              } else if (q === "distance"){
                values[iter1][`distanz${iter2 !== 0 ? iter2 : ''}`] = i[j][q];
                iter3++;
              } else if (q === "voltage"){
                values[iter1][`spannung${iter2 !== 0 ? iter2 : ''}`] = i[j][q];
                iter3++;
              }
              if (iter3 === 3){
                iter2++;
                iter3 = 0;
              }
            }
          }
          iter2 = 0;
          iter1++;
        }
        
        for (let i of values){
            const token = localStorage.getItem('token');
            const url = 'https://axpo.propulsion-learn.ch/api/voltageprofile/new';
            const config = {
                method: 'POST',
                headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }),
                body: JSON.stringify(i)
            };
            fetch(url, config).then(res => res.json())
            .then(data => {
                console.log("data added", data);
                props.setInputValues({});
                props.setDirections([]);
                props.setData([{
                    "data": []
                }]);
            });
        }
    };

    return (
        <Button onClick={prepareAndPostData} color="danger">Save Completed Data</Button>
    )
}

export default Post;
