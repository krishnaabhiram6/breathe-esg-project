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

const API_URL="https://breathe-esg-project-r9pd.onrender.com/api";

function App(){

const [dashboard,setDashboard]=useState({});
const [records,setRecords]=useState([]);
const [suspicious,setSuspicious]=useState([]);

const [category,setCategory]=useState("");
const [scope,setScope]=useState("");
const [quantity,setQuantity]=useState("");
const [search,setSearch]=useState("");

useEffect(()=>{
loadData();
},[]);

const loadData=()=>{

axios.get(`${API_URL}/dashboard/`)
.then((response)=>{
setDashboard(response.data);
});

axios.get(`${API_URL}/emissions/`)
.then((response)=>{
setRecords(response.data);
});

axios.get(`${API_URL}/suspicious/`)
.then((response)=>{
setSuspicious(response.data);
});

};

const addRecord=async()=>{

if(
category.trim()==="" ||
scope.trim()==="" ||
quantity===""
){
alert("Fill all fields");
return;
}

try{

await axios.post(
`${API_URL}/emissions/`,
{
category:category,
scope:scope,
quantity:parseFloat(quantity),
normalized_unit:"kgCO2",
original_unit:"liters",
emission_value:parseFloat(quantity)*2,
status:"Pending"
}
);

alert("Record Added Successfully");

setCategory("");
setScope("");
setQuantity("");

loadData();

}
catch(error){

console.log(error);

alert("Error adding record");

}

};

const approveRecord=(id)=>{

axios.patch(
`${API_URL}/emissions/${id}/`,
{
status:"Approved"
}
)
.then(()=>{
loadData();
});

};

const deleteRecord=(id)=>{

axios.delete(
`${API_URL}/emissions/${id}/`
)
.then(()=>{
loadData();
});

};

const exportData=()=>{

const dataStr=
"data:text/json;charset=utf-8,"+
encodeURIComponent(
JSON.stringify(records,null,2)
);

const downloadLink=
document.createElement("a");

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

const filteredRecords=
records.filter((record)=>
record.category
.toLowerCase()
.includes(search.toLowerCase())
);

const chartData={
labels:["Pending","Approved"],
datasets:[
{
label:"Emission Records",
data:[
dashboard.pending_records||0,
dashboard.approved_records||0
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

<h1 style={{
textAlign:"center"
}}>
Breathe ESG Dashboard
</h1>

<div style={{
display:"flex",
justifyContent:"center",
gap:"60px"
}}>

<div>
<h2>Total</h2>
<h1>{dashboard.total_records||0}</h1>
</div>

<div>
<h2>Pending</h2>
<h1>{dashboard.pending_records||0}</h1>
</div>

<div>
<h2>Approved</h2>
<h1>{dashboard.approved_records||0}</h1>
</div>

</div>

<br/>

<h2 style={{
textAlign:"center"
}}>
Add New Record
</h2>

<div style={{
display:"flex",
justifyContent:"center",
gap:"10px"
}}>

<input
placeholder="Category"
value={category}
onChange={(e)=>
setCategory(e.target.value)}
/>

<input
placeholder="Scope"
value={scope}
onChange={(e)=>
setScope(e.target.value)}
/>

<input
placeholder="Quantity"
value={quantity}
onChange={(e)=>
setQuantity(e.target.value)}
/>

<button
onClick={addRecord}
style={{
background:"green",
color:"white"
}}>
Add
</button>

</div>

<br/>

<button
onClick={exportData}
style={{
background:"blue",
color:"white",
padding:"10px"
}}>
Export Report
</button>

<hr/>

<h2 style={{
textAlign:"center"
}}>
Dashboard Analytics
</h2>

<div style={{
width:"600px",
margin:"auto"
}}>
<Bar
data={chartData}
options={options}
/>
</div>

<hr/>

<h2>
Emission Records
</h2>

<input
placeholder="Search Category"
value={search}
onChange={(e)=>
setSearch(e.target.value)}
style={{
padding:"10px",
marginBottom:"20px"
}}
/>

<table
border="1"
width="100%"
style={{
background:"white",
color:"black"
}}>

<thead>

<tr>
<th>Category</th>
<th>Scope</th>
<th>Quantity</th>
<th>Status</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{filteredRecords.map((record)=>(

<tr key={record.id}>

<td>{record.category}</td>
<td>{record.scope}</td>
<td>{record.quantity}</td>
<td>{record.status}</td>

<td>

{record.status!=="Approved" && (

<button
onClick={()=>
approveRecord(record.id)
}
style={{
background:"green",
color:"white",
marginRight:"5px"
}}
>
Approve
</button>

)}

<button
onClick={()=>
deleteRecord(record.id)
}
style={{
background:"red",
color:"white"
}}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default App;