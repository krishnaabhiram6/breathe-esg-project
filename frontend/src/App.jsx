import { useEffect, useState } from "react";
import axios from "axios";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

const API_URL = "https://breathe-esg-project-r9pd.onrender.com/api";

function App() {

const [dashboard,setDashboard]=useState({});
const [records,setRecords]=useState([]);
const [suspicious,setSuspicious]=useState([]);

const [category,setCategory]=useState("");
const [scope,setScope]=useState("");
const [quantity,setQuantity]=useState("");

useEffect(()=>{
loadData();
},[]);

const loadData=()=>{

axios.get(`${API_URL}/dashboard/`)
.then((response)=>{
setDashboard(response.data);
})
.catch((error)=>{
console.log(error);
});

axios.get(`${API_URL}/emissions/`)
.then((response)=>{
setRecords(response.data);
})
.catch((error)=>{
console.log(error);
});

axios.get(`${API_URL}/suspicious/`)
.then((response)=>{
setSuspicious(response.data);
})
.catch((error)=>{
console.log(error);
});

};

const addRecord = async ()=>{

if(
category.trim()==="" ||
scope.trim()==="" ||
quantity===""
){
alert("Fill all fields");
return;
}

if(Number(quantity)<=0){
alert("Quantity must be greater than 0");
return;
}

try{

const response = await axios.post(
`${API_URL}/emissions/`,
{
category: category,
scope: scope,
quantity: parseFloat(quantity),
normalized_unit:"kgCO2",
original_unit:"liters",
emission_value:parseFloat(quantity)*2,
status:"Pending"
},
{
headers:{
"Content-Type":"application/json"
}
}
);

console.log(response.data);

alert("Record Added Successfully");

setCategory("");
setScope("");
setQuantity("");

loadData();

}
catch(error){

console.log(error.response?.data);

alert(
JSON.stringify(
error.response?.data
)
);

}

};

const exportData=()=>{

const dataStr=
"data:text/json;charset=utf-8,"+
encodeURIComponent(
JSON.stringify(records,null,2)
);

const downloadLink=document.createElement("a");

downloadLink.setAttribute(
"href",
dataStr
);

downloadLink.setAttribute(
"download",
"emission-report.json"
);

downloadLink.click();

};

const chartData={
labels:["Pending","Approved"],
datasets:[
{
label:"Emission Records",
data:[
dashboard.pending_records || 0,
dashboard.approved_records || 0
],
backgroundColor:[
"orange",
"lightgreen"
]
}
]
};

const options={
plugins:{
legend:{
labels:{
color:"white"
}
}
},
scales:{
x:{
ticks:{
color:"white"
}
},
y:{
ticks:{
color:"white"
}
}
}
};

return(

<div style={{
padding:"30px",
background:"#0f172a",
color:"white",
minHeight:"100vh"
}}>

<h1 style={{textAlign:"center"}}>
Breathe ESG Dashboard
</h1>

<div style={{
display:"flex",
justifyContent:"center",
gap:"60px"
}}>

<div>
<h2>Total</h2>
<h1>{dashboard.total_records || 0}</h1>
</div>

<div>
<h2>Pending</h2>
<h1>{dashboard.pending_records || 0}</h1>
</div>

<div>
<h2>Approved</h2>
<h1>{dashboard.approved_records || 0}</h1>
</div>

</div>

<br/>

<h2 style={{textAlign:"center"}}>
Add New Record
</h2>

<div style={{
display:"flex",
justifyContent:"center",
gap:"10px",
marginBottom:"20px"
}}>

<input
placeholder="Category"
value={category}
onChange={(e)=>setCategory(e.target.value)}
/>

<input
placeholder="Scope"
value={scope}
onChange={(e)=>setScope(e.target.value)}
/>

<input
placeholder="Quantity"
value={quantity}
onChange={(e)=>setQuantity(e.target.value)}
/>

<button
onClick={addRecord}
style={{
background:"green",
color:"white",
padding:"10px",
border:"none"
}}>
Add
</button>

</div>

<button
onClick={exportData}
style={{
padding:"10px 20px",
background:"blue",
color:"white",
border:"none"
}}>
Export Report
</button>

<hr/>

<h2 style={{textAlign:"center"}}>
Dashboard Analytics
</h2>

<div style={{
width:"600px",
margin:"auto"
}}>
<Bar data={chartData} options={options}/>
</div>

</div>

);

}

export default App;