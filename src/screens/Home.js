import React,{useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { BASE_URL } from './helperUrl'
export default function Home() {

  const [search,setSearch] = useState('');
  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);

  

  const loadData = async()=>{
    let response  = await fetch(`${BASE_URL}/api/foodData`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        }
    });

    response = await response.json('');
    setFoodCat(response[1]);
    setFoodItem(response[0]);
  }


  useEffect(()=>{
    loadData();
  },[])


  return (
    <div>
        <Navbar />
        <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div className =" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button> */}
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://wallpapercave.com/wp/wp1987065.jpg" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://townsquare.media/site/437/files/2016/11/GettyImages-133281966.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://assets.dmagstatic.com/wp-content/uploads/2017/04/biryani.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
        
        <div className="container">
          {
            foodCat!==[]
            ?foodCat.map((data)=>{
               return (
                  <div className="row mb-3">
                       <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
                       <hr/>
                       {
                        foodItem!==[]
                        ?foodItem.filter((item)=>item.CategoryName==data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                         .map((filterItems)=>{
                            return(
                               <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                  <Card foodItem = {filterItems}
                                        options={filterItems.options[0]}
                                  />
                               </div>
                            )
                         }):<div>No Such Data found</div>
                       }
                  </div>
               )
            }):""
          }
        </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
