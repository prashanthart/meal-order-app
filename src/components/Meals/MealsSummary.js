import styles from './MealsSummary.module.css';
import Card from '../UI/Card';

function MealsSummary(){

    return(
        <Card className={styles.summary}>
            <h2>Delicious Food, Delivered To You</h2>
            <p>
                Choose your favorite meal from our brand selection of available meals
                and enjoy a delicious lunch or dinner at home.
            </p>
            <p>
                All our meals are cooked with high-quality ingredients, just-in-time and 
                of course by experienced chefs!
            </p>
        </Card>

    )

}
export default MealsSummary;