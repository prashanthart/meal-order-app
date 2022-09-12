import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";
import {useEffect, useState} from 'react';

function AvailableMeals() {
  const [meals,setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [error,isError ] = useState(false);

  useEffect(()=>{
    const fetchMeals = async ()=>{
      try{

        const response = await fetch("https://react-http-987b8-default-rtdb.firebaseio.com/meals.json");
        if(!response.ok){
          throw new Error("something went wrong");
        }
      const data = await response.json();
      console.log(data);
      const transformedData = []
      for(let key in data){
        const obj = data[key];
        console.log(obj);
        transformedData.push({
          id:key,
          name:data[key].name,
          description:data[key].description,
          price:data[key].price
        })
      }
      setMeals(transformedData);

      }
      catch(err){
        console.log(err.message);
        isError(true);
      }
      
      
     
      setIsLoading(false);
    }
    fetchMeals();


  },[])

 
  if(error){
    return(
    <section className={styles.fetchError} >
        <p>something went wrong</p>
      </section>
    )
  }

  
  if(isLoading){
    return (
      <section className={styles.loading} >
        <p>Loading...</p>
      </section>
    )
  }


  const mealsList = meals.map((meal) => (
    <MealItem 
    key={meal.id} 
    id = {meal.id}
    name={meal.name} 
    description={meal.description} 
    price = {meal.price}
    />
  ));

  

  return (
    <section className={styles.meals}>
      <Card className={styles.lists}>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}
export default AvailableMeals;
