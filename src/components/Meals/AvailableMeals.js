import {useEffect,useState} from 'react';
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const[meals,setmeals] = useState([]);
  const[isLoading,setIsLoading] = useState(true);
  const[httpsError,setHttpError] = useState();

  useEffect(()=>{
    const fetchMeals = async () =>{
      const response = await fetch('https://thefoodmelody-26fa9-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();
      if(!response.ok){
        throw new  Error('something went wrong!');
      }

      const loadedMeals=[];

      for(const key in responseData ){
        loadedMeals.push(
          {
            id: key,
            name: responseData[key].name ,
            decription: responseData[key].description ,
            price: responseData[key].price
          }
        );
      }
      setmeals(loadedMeals);
      setIsLoading(false);
    };
    
      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  
    
  },[]);
  
  if(isLoading){
    return( <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>);
  }

  if(httpsError){
    return( <section className={classes.MealsError}>
      <p>{httpsError}</p>
    </section>);

  }

  const mealsList =  meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
