import styled from "styled-components"
import './App.css'
import { useEffect, useState } from "react"
import SearchResult from "./components/SearchResult";

export const Base_URL="http://localhost:9000";
//export const Base_URL=`{window.location.origin}`;

function App() {
  const [data,setData]= useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [filterData,setFilterData]=useState(null);
  const [selecterBtn,setSelectedBtn]=useState("all");

  useEffect(()=>{
    const fetchFoodData=async ()=>{
      setLoading(true);
   
      try{
       const response=await fetch(Base_URL);
       const json=await response.json();
       
   
       setData(json);
       setFilterData(json);
       setLoading(false);
      }catch(error){
           setError("Unable to fetch data");
      }
   
     };
     fetchFoodData();
  },[]);


  const searchFood=(e)=>{
    const searchValue=e.target.value;

    if(searchValue===""){
      setFilterData(null);
    }

    const filter=data?.filter((food)=>
    food.name.toLowerCase().includes(searchValue.toLowerCase())
     );
  setFilterData(filter);
  };
  
 const filterFood=(type)=>{
  if(type=="all"){
    setFilterData(data);
    setSelectedBtn("all");
    return;
  }
  const filter=data?.filter((food)=>
    food.type.toLowerCase().includes(type.toLowerCase())
     );
     setFilterData(filter);
     setSelectedBtn(type);
 };
 
 const filterBtns=[
  {
    name:"All",
    type:"all",
  },
  {
    name:"Breakfast",
    type:"breakfast",
  },
  {
    name:"Lunch",
    type:"lunch",
  },
  {
    name:"Dinner",
    type:"Dinner",
  }
 ]

  if(error) return <div>{error}</div>
  if(loading) return <div>loading.....</div>

  return (
    <>
      <Container>
      <TopContainer>
         <div className="logo">
          <img src="foodzone-logo-without-shadow.png" height="100px" alt="logo"/>
         </div>
         <div className="search">
          <input onChange={searchFood}
          placeholder="Search Food"/>
         </div>
      </TopContainer>
      <FilterContainer>
      {
        filterBtns.map((value)=>(
          <Button 
          isSelected={selecterBtn===value.type}
          key={value.name} onClick={()=>filterFood(value.type)}>{value.name}</Button>
        ))
      }
        {/* <Button onClick={()=>filterFood("all")}>All</Button>
        <Button onClick={()=>filterFood("breakfast")}>Breakfast</Button>
        <Button onClick={()=>filterFood("lunch")}>Lunch</Button>
        <Button onClick={()=>filterFood("dinner")}>Dinner</Button> */}
      </FilterContainer>
      
    </Container>
    <SearchResult data={filterData}/>
    </>
  )
}

export default App

export const Container=styled.div`
   /* max-width: 1200px; */
`;
const TopContainer=styled.section`
  min-height: 140px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search{
     input{
      background-color: transparent;
      border:1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder{
        color: white;
      }
     }
  }
`;

const FilterContainer=styled.section`
 display: flex;
 justify-content: center;
 gap: 18px;
 padding-bottom: 25px;
`;

export const Button=styled.button`
 background:${({isSelected}) =>(isSelected? "red" : "#ff4343")};
 outline:1px solid ${({isSelected}) =>(isSelected? "white" : "#ff4343")};
 border-radius: 5px;
 padding: 6px 12px;
 border: none;
 color: white;
 cursor: pointer;
 &:hover{
  background-color: #f22f2f;
 }
`;

