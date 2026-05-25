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

function App() {

const [dashboard,setDashboard]=useState({});
const [records,setRecords]=useState([]);
const [suspicious,setSuspicious]=useState([]);
const [search,setSearch]=useState("");

const [category,setCategory]=useState("");
const [scope,setScope]=useState("");
const [quantity,setQuantity]=useState("");

useEffect(()=>{
loadData();
},[]);

const loadData=()=>{

axios.get("http://127.0.0.1:8000/api/dashboard/")
.then((response)=>{
setDashboard(response.data);
});

axios.get("http://127.0.0.1:8000/api/emissions/")
.then((response)=>{
setRecords(response.data);
});

axios.get("http://127.0.0.1:8000/api/suspicious/")
.then((response)=>{
setSuspicious(response.data);
});

};

const addRecord=()=>{

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

axios.post(
"http://127.0.0.1:8000/api/emissions/",
{
category:category,
scope:scope,
quantity:Number(quantity),
status:"Pending",

normalized_unit:"kgCO2",
original_unit:"liters",
emission_value:Number(quantity)*2
}
)

.then(()=>{

alert("Record Added Successfully");

setCategory("");
setScope("");
setQuantity("");

loadData();

})

.catch((error)=>{

console.log(error.response?.data);

alert(
JSON.stringify(error.response?.data)
);

});

};

const approveRecord=(id)=>{

axios.patch(
`http://127.0.0.1:8000/api/emissions/${id}/`,
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
`http://127.0.0.1:8000/api/emissions/${id}/`
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

<h2 style={{
textAlign:"center"
}}>
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
}}
>
Add
</button>

</div>

<button
onClick={exportData}
style={{
padding:"10px 20px",
background:"blue",
color:"white",
border:"none",
borderRadius:"5px",
display:"block",
margin:"auto"
}}
>
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

<h2 style={{
textAlign:"center"
}}>
Emission Records
</h2>

<div style={{
textAlign:"center",
marginBottom:"20px"
}}>

<input
placeholder="Search category..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

{
records
.filter(
(item)=>
item.category.toLowerCase()
.includes(search.toLowerCase())
&&
item.quantity<=1000
)

.map((item)=>(

<div
key={item.id}
style={{
border:"1px solid gray",
padding:"15px",
margin:"15px",
borderRadius:"10px",
textAlign:"center"
}}
>

<p><b>Category:</b> {item.category}</p>
<p><b>Scope:</b> {item.scope}</p>
<p><b>Quantity:</b> {item.quantity}</p>

<p>
<b>Status:</b>{" "}
<span style={{
color:item.status==="Approved"
?"lightgreen"
:"orange"
}}>
{item.status}
</span>
</p>

{item.status!=="Approved" && (

<button
onClick={()=>approveRecord(item.id)}
style={{
background:"green",
color:"white",
padding:"10px",
border:"none"
}}
>
Approve
</button>

)}

<button
onClick={()=>deleteRecord(item.id)}
style={{
background:"red",
color:"white",
padding:"10px",
border:"none",
marginLeft:"10px"
}}
>
Delete
</button>

</div>

))
}

<hr/>

<h2 style={{
textAlign:"center"
}}>
⚠ Suspicious Records
</h2>

{
suspicious.map((item)=>(

<div
key={item.id}
style={{
border:"2px solid red",
padding:"15px",
margin:"15px",
borderRadius:"10px",
textAlign:"center"
}}
>

<p><b>Category:</b> {item.category}</p>
<p><b>Quantity:</b> {item.quantity}</p>
<p><b>Status:</b> {item.status}</p>

<button
onClick={()=>deleteRecord(item.id)}
style={{
background:"red",
color:"white",
padding:"10px",
border:"none"
}}
>
Delete
</button>

</div>

))
}

<p style={{
textAlign:"center",
marginTop:"30px"
}}>
Built by Krishna Abhiram
</p>

</div>

);

}

export default App;